---
title: Edge TTS 台灣中文配音工作流 — 把 .md 講稿變成可循環播放的 mp3
domain: education
updated: 2026-05-12
audience: 內部團隊
prerequisite: Python 3.10+、pip 基礎、會用 terminal
duration: 15 分鐘看完、30-60 分鐘照做完
tags: TTS, 配音, edge-tts, 台灣中文, mp3, 演練, 工作流
source_chat: 2026-05-12 為一份 25 分鐘 .md 講稿生成完整版 + 6 章分段 + 32 張分頁 mp3 的全套配音流程
---

# Edge TTS 台灣中文配音工作流

> **一句話**：把任何 `.md` 講稿 → 30 分鐘內變成可循環播放、可分段、可逐頁練習的台灣中文 mp3，**完全免費**。

---

## 🎯 學習目標

1. 認識 Microsoft Edge TTS 三個可用的台灣中文聲音（一男兩女）並會選擇
2. 寫 Python 腳本把 markdown 講稿 → 朗讀文字 → mp3
3. 三層輸出：**完整版單檔**、**分章節 mp3**、**逐張投影片 mp3**
4. 避開 5 個常見採坑（Unicode 編碼、伺服器斷流、檔案鎖、半寫檔、跨檔殘留）

---

## 📦 先備知識

| 項目 | 需要嗎 | 備註 |
|---|---|---|
| Python 3.10+ | ✅ 必要 | 用 asyncio 並行加速 |
| 會用 pip | ✅ 必要 | 安裝套件 |
| 會 markdown | ✅ 必要 | 講稿來源格式 |
| 會用 terminal | ✅ 必要 | PowerShell / bash 都行 |
| Azure 帳號 | ❌ **不用** | Edge TTS 走免費 endpoint |
| GPU | ❌ 不用 | 雲端合成 |

---

## 🎙 第 0 步｜認識台灣中文的三個聲音

Microsoft Edge TTS 提供的台灣中文（zh-TW）Neural 聲音：

| 語音 ID | 中文名 | 性別 | 風格描述 |
|---|---|:---:|---|
| `zh-TW-YunJheNeural` | 雲哲 | 男 | 自然、新聞主播感、節奏穩 |
| `zh-TW-HsiaoChenNeural` | 曉辰 | 女 | 年輕、輕快、口語感強 |
| `zh-TW-HsiaoYuNeural` | 曉雨 | 女 | 沉穩、知性、適合長篇 |

> **判斷建議**：
> - 教學／簡報朗讀 → 雲哲（不會搶戲）
> - 廣告／短影音字卡 → 曉辰（吸引注意）
> - 有聲書／長 podcast → 曉雨（耐聽）

---

## 🛠 第 1 步｜安裝環境（一次到位）

```bash
# 安裝 Python 套件
pip install edge-tts

# 驗證
python -c "import edge_tts; print(edge_tts.__version__)"
# 預期輸出：7.x.x 或更新
```

完整列出所有可用聲音（會吐 JSON）：

```bash
edge-tts --list-voices | grep "zh-TW"
```

---

## 🛠 第 2 步｜最小可行範例（10 行）

把這個存成 `tts_hello.py`：

```python
import asyncio
import edge_tts

VOICE = "zh-TW-YunJheNeural"
TEXT = "大家好，我是雲哲，這是一段測試語音。"

async def main():
    communicate = edge_tts.Communicate(TEXT, VOICE)
    await communicate.save("hello.mp3")

if __name__ == "__main__":
    asyncio.run(main())
```

執行：

```bash
python tts_hello.py
# 生出 hello.mp3
```

**就這樣。** 沒 API key、沒帳號、不用排隊。

---

## 🛠 第 3 步｜把 markdown 講稿變成朗讀文字

直接餵 markdown 給 TTS 會聽到一堆 `星號`、`井號`、`大括號`。所以中間要加一道清理層。

### 清理規則（依重要性排序）

| 原始 | 改成 | 原因 |
|---|---|---|
| `**粗體**` | 粗體 | 移除星號 |
| `### 【Slide 3：標題】` | `。投影片 3：標題。` | 轉成口語自然停頓 |
| `\| 表格 \|` | 整列跳過 | TTS 念表格會災難 |
| `[文字](連結)` | 文字 | 移除連結 |
| `R²` | `R 平方` | 上標符號 TTS 念不對 |
| `×` | `乘` | 符號轉口語 |
| `→` | `接下來` | 箭頭轉口語 |
| `①②③④` | `第一/第二/...` | 圈號 TTS 不會念 |
| `★ ⏱ 🎯 ✅ 🆕` | （刪除） | emoji 念出來尷尬 |
| `Mg/ha` | `公噸 每公頃` | 單位口語化 |
| `USD` | `美金` | 縮寫展開 |
| ``` ```code``` ``` | （刪除） | 程式碼念出來無意義 |

範例腳本核心片段：

```python
import re

def md_to_speech_text(md: str) -> str:
    lines = md.splitlines()
    out = []
    in_code = False
    for line in lines:
        line = line.rstrip()
        if line.startswith("```"):
            in_code = not in_code; continue
        if in_code: continue
        if line.strip().startswith("|"): continue  # 表格
        if re.match(r"^-{3,}$", line.strip()): continue  # 分隔線

        # blockquote 是講稿正文
        if line.startswith("> "): text = line[2:].strip()
        else: text = line.strip()

        if not text:
            if out and out[-1] != "": out.append("")
            continue

        # 拔粗體 / 斜體 / 連結
        text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
        text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
        text = re.sub(r"`([^`]+)`", r"\1", text)

        # 符號口語化
        text = text.replace("×", "乘").replace("→", " 接下來 ")
        text = text.replace("R²", "R 平方").replace("²", " 平方")
        text = text.replace("Mg/ha", " 公噸 每公頃").replace("USD", "美金")
        for ch in "✅🆕★⏱🎯⚠️📌": text = text.replace(ch, "")

        text = re.sub(r"\s+", " ", text).strip()
        if text: out.append(text)

    return "\n".join(out).strip()
```

---

## 🛠 第 4 步｜三層輸出策略

實戰中發現「**一個完整版 mp3 不夠用**」，需要三種粒度：

| 用途 | 粒度 | 檔名範例 |
|---|---|---|
| 一氣呵成練節奏 | **完整版** | `完整朗讀.mp3` |
| 跑通勤、shadow 跟讀 | **章節分段** | `01_Part_1.mp3` ~ `05_Part_5.mp3` |
| 死記某張投影片 / 金句 | **逐頁** | `slide_01.mp3` ~ `slide_32.mp3` |

切段邏輯：

```python
def split_by_chapters(speech: str) -> dict:
    """依 '。Part X' 或 '。開場' 切段。"""
    chunks = {}
    current_key = None
    buf = []
    patterns = [
        ("00_開場", re.compile(r"^。開場")),
        ("01_Part_1", re.compile(r"^。Part 1")),
        # ...
    ]
    for line in speech.split("\n"):
        for key, pat in patterns:
            if pat.match(line):
                if current_key:
                    chunks[current_key] = "\n".join(buf).strip()
                current_key = key
                buf = [line]
                break
        else:
            if current_key: buf.append(line)
    if current_key:
        chunks[current_key] = "\n".join(buf).strip()
    return chunks
```

並行生成（最重要的工程細節）：

```python
SEM = asyncio.Semaphore(3)  # 最多 3 個並發，超過會被伺服器擋

async def tts_one(text: str, output: Path, max_retries: int = 4):
    async with SEM:
        for attempt in range(1, max_retries + 1):
            try:
                communicate = edge_tts.Communicate(text, VOICE)
                tmp = output.with_suffix(".mp3.tmp")
                await communicate.save(str(tmp))
                if tmp.stat().st_size > 5000:   # 至少 5KB 才算成功
                    tmp.replace(output)
                    return
                tmp.unlink(missing_ok=True)
            except Exception as e:
                await asyncio.sleep(2 * attempt)  # backoff

async def main():
    tasks = [tts_one(text, out_path) for text, out_path in batch]
    await asyncio.gather(*tasks, return_exceptions=True)
```

---

## 🪤 採坑點（最珍貴的一段）

### 採坑 #1：Windows cp950 編碼炸裂

**症狀**：`print("✓ 完成")` 拋 `UnicodeEncodeError: 'cp950' codec can't encode character`，整個並行 task 連鎖崩潰。

**原因**：Windows 預設 console 編碼 cp950 不認識 `✓` `→` 等 unicode 符號。

**解法**（腳本第一行）：

```python
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
```

**預防**：log 內不要放 emoji；如果要放，先強制 stdout 改 utf-8。

---

### 採坑 #2：`NoAudioReceived` — 伺服器隨機罷工

**症狀**：跑到一半某個 mp3 突然 `edge_tts.exceptions.NoAudioReceived`，後面所有任務跟著 cancel。

**原因**：Microsoft 免費 endpoint 偶爾抽風，並發太多更容易遇到。

**解法**：
1. **限制並發**到 3（用 `asyncio.Semaphore(3)`）
2. **指數退避重試**（attempt × 2 秒）
3. **`asyncio.gather(*tasks, return_exceptions=True)`**——一個失敗不會牽連別人

```python
SEM = asyncio.Semaphore(3)  # 不要設 6 以上
```

---

### 採坑 #3：半寫檔污染下次執行

**症狀**：第一輪 crash，留下幾個 0 byte 或 100KB 的不完整 mp3。第二次跑時不知道哪些是好的。

**解法**：**先寫 tmp、寫完才 rename + 大小檢查**

```python
tmp = output.with_suffix(".mp3.tmp")
await communicate.save(str(tmp))
if tmp.stat().st_size > 50_000:  # 50KB 門檻
    tmp.replace(output)
else:
    tmp.unlink(missing_ok=True)
```

**預防**：永遠假設網路 / 服務會中斷；重要輸出都 atomic write。

---

### 採坑 #4：檔案被別的程式鎖住

**症狀**：跑腳本噴 `PermissionError: [Errno 13] Permission denied: 'xxx.mp3'`。

**原因**：mp3 在 Windows Media Player / 瀏覽器 / Foobar 還開著。

**解法**：
- 寫腳本前先把播放器關掉
- 或寫到 tmp 後 rename（系統會排隊處理）

**預防**：把輸出資料夾跟「正在練習聽的」資料夾分開。

---

### 採坑 #5：「補生成」邏輯沒抓到部分寫入

**症狀**：第一次跑死了一些檔案是 100KB（不是 0），重跑時 skip 邏輯只擋 0 byte，繼續使用壞檔。

**原因**：用 `not file.exists()` 判斷不夠細。

**解法**：**用實際大小門檻**判斷是否需要重生

```python
# ❌ 太寬鬆
if not out_file.exists(): need_regen = True

# ✅ 加大小門檻
if not out_file.exists() or out_file.stat().st_size < 50_000:
    need_regen = True
```

50KB 大致對應一個 30 字句子的 mp3——少於這個一定是壞檔。

---

## 🧪 預期結果（讓自己有信心）

跑完整套：

| 輸出 | 預期 |
|---|---|
| 完整版 mp3 | 1 MB / 分鐘左右（25 分講稿 → ~14 MB） |
| 章節 mp3 | 各約 0.5-4 MB |
| 逐頁 mp3 | 各約 100-700 KB（取決於該頁字數） |
| 生成時間 | 並發 3 → 30 張 ~3-5 分鐘（含網路傳輸） |
| 失敗率 | < 10%（有重試 → 重試後幾乎 0） |

---

## 🔗 延伸閱讀

- 工具棧整體脈絡：[ailab 工具棧索引](../../../ailab/tools/工具棧索引.md)
- 模型選擇邏輯：[ailab 模型選擇心法](../../../ailab/tools/模型選擇心法.md)
- jwood YouTube 自動化用的是另一套（gTTS + Pillow + ffmpeg）：[jwood YT 影片 SOP](../../../jwood/yt-video-sop.md)

---

## 📋 快速回顧

把 .md 講稿變成台灣中文 mp3 就三件事：
1. **裝 edge-tts**（一行 pip）
2. **寫個清理層**把 markdown 轉成口語朗讀文字
3. **三層輸出 + Semaphore(3) + 重試 + tmp 寫檔** — 整個工作流就穩了

選聲音記三個：**雲哲（男）／曉辰（女年輕）／曉雨（女沉穩）**。
換聲音只改 `VOICE` 常數一行。

---

*Jacky × Claude · 2026-05-12*
