---
title: Edge TTS 台灣中文配音工作流 — 簡報大綱
domain: education
visibility: team
min_tier: L2
updated: 2026-05-12
audience: 內部團隊
duration: 15-20 分鐘簡報
tags: TTS, edge-tts, 配音, 簡報大綱
---

# Edge TTS 台灣中文配音工作流（15-20 min 簡報）

> 配對主檔：[README.md](README.md)

---

## Slide 1 — 封面

- **標題**：把 .md 講稿變成可循環的台灣中文 mp3（30 分鐘工作流）
- **副標**：免費、不用 API key、雲端合成
- **講者**：（自填）
- **配套資料夾**：`workshops/2026-05-12-edge-tts-台灣中文配音/`

---

## Slide 2 — 為什麼要做這件事？

- 演講 / 簡報 / 教學影片 → 都需要「**可循環播放練習用**」的中文配音
- 找配音員：貴、慢、改一個字要重錄
- 自己錄：累、口條不穩、難快速迭代
- **Edge TTS**：免費 + 即時 + 改詞就重生

---

## Slide 3 — Edge TTS 是什麼？

- Microsoft Edge 瀏覽器內建的「朗讀」服務後端
- 走免費 endpoint（不需要 Azure 帳號 / 不刷信用卡）
- Python 套件：`pip install edge-tts`
- **限制**：偶爾抽風（解法後面會講）

---

## Slide 4 — 三個台灣中文聲音

| ID | 中文名 | 性別 | 風格 |
|---|---|:---:|---|
| `zh-TW-YunJheNeural` | 雲哲 | 男 | 新聞主播感 |
| `zh-TW-HsiaoChenNeural` | 曉辰 | 女 | 年輕輕快 |
| `zh-TW-HsiaoYuNeural` | 曉雨 | 女 | 沉穩知性 |

**選聲音判斷**：教學選雲哲、短影音選曉辰、長篇 podcast 選曉雨

---

## Slide 5 — 最小可行範例（10 行）

```python
import asyncio, edge_tts
VOICE = "zh-TW-YunJheNeural"
TEXT = "大家好，這是一段測試語音。"

async def main():
    await edge_tts.Communicate(TEXT, VOICE).save("hello.mp3")

asyncio.run(main())
```

- 沒 API key、沒帳號、不用排隊
- **跑完直接出 mp3**

---

## Slide 6 — 但 .md 餵進去會聽到星號和井號

- TTS 會把 `**粗體**` 念成「星號星號粗體星號星號」
- 把 `### 標題` 念成「井號井號井號 標題」
- 表格、emoji、上下標符號 → 全部會出狀況

**解法**：中間插一道**markdown → 朗讀文字**清理層

---

## Slide 7 — 清理規則表（最關鍵的設計）

| 原始 | 改成 | 為什麼 |
|---|---|---|
| `**bold**` | bold | 拔星號 |
| `R²` | R 平方 | 上標不會念 |
| `×` | 乘 | 符號口語化 |
| `→` | 接下來 | 箭頭轉口語 |
| `①②③` | 第一/第二/第三 | 圈號念不出 |
| `Mg/ha` | 公噸 每公頃 | 單位展開 |
| emoji | （刪除） | 念出來尷尬 |
| 表格 `\|` | （整列跳過） | TTS 念表格災難 |

---

## Slide 8 — 三層輸出策略（核心 insight）

| 用途 | 粒度 | 場景 |
|---|---|---|
| 一氣呵成練節奏 | **完整版**（1 個檔）| 每天通勤 1 輪 |
| 跑步、洗澡 shadow 跟讀 | **章節分段**（6 個檔）| 不熟的 Part 反覆 |
| 死記某張投影片 / 金句 | **逐頁**（32 個檔）| 上場前 1 小時走場 |

**重點**：同樣的清理層 + 不同的切段邏輯 → 三層輸出

---

## Slide 9 — 並行加速（不要一張一張等）

```python
SEM = asyncio.Semaphore(3)   # 最多 3 個並發

async def tts_one(text, output):
    async with SEM:
        await edge_tts.Communicate(text, VOICE).save(output)

tasks = [tts_one(t, p) for t, p in batch]
await asyncio.gather(*tasks, return_exceptions=True)
```

- 30 張並發 = 3-5 分鐘搞定（單線會跑 30+ 分鐘）
- **`Semaphore(3)` 不要設更高** — 設 6+ 開始噴 NoAudioReceived

---

## Slide 10 — 採坑 #1：Windows cp950 編碼

- **症狀**：`print("✓")` 噴 UnicodeEncodeError，整批崩潰
- **原因**：Windows console cp950 不認 unicode 符號
- **解法**（一行）：

```python
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
```

- **預防**：log 不要放 emoji，要放就先改 stdout 編碼

---

## Slide 11 — 採坑 #2：NoAudioReceived 隨機罷工

- **症狀**：跑到一半 `edge_tts.exceptions.NoAudioReceived`
- **原因**：免費 endpoint 偶爾抽風，並發太高更容易
- **解法**三招組合拳：
  1. `Semaphore(3)` 限並發
  2. 指數退避重試（`sleep(2 * attempt)`）
  3. `gather(*, return_exceptions=True)` 一個失敗不牽連別人

---

## Slide 12 — 採坑 #3：半寫檔污染下次執行

- **症狀**：第一輪 crash，留下 0 byte / 100 KB 不完整 mp3
- **解法**：**tmp 寫檔 + 大小檢查 + rename**

```python
tmp = output.with_suffix(".mp3.tmp")
await communicate.save(str(tmp))
if tmp.stat().st_size > 50_000:
    tmp.replace(output)
else:
    tmp.unlink(missing_ok=True)
```

- **原則**：所有可能中斷的網路輸出 → atomic write

---

## Slide 13 — 採坑 #4 & #5：檔案鎖、補生成邏輯

**採坑 #4**：mp3 在播放器開著 → `PermissionError`
- 解：先關播放器、或寫 tmp 再 rename

**採坑 #5**：第一輪殘留 100KB 壞檔，第二輪 skip 邏輯沒抓到
- 錯：`if not file.exists()`
- 對：`if not file.exists() or file.size < 50_000`

---

## Slide 14 — 完整工作流程圖

```
 .md 講稿
    │
    │  md_to_speech_text()
    ▼
 朗讀純文字
    │
    ├─→ 直接 TTS ──→ 完整版.mp3
    │
    ├─→ split_by_chapters() ─→ TTS × N ─→ 01_Part_1.mp3 ... 05_Part_5.mp3
    │
    └─→ split_by_slide() ──→ TTS × M ─→ slide_01.mp3 ... slide_32.mp3
```

**所有切段都用同一份清理後的朗讀文字** → 三層內容一致

---

## Slide 15 — 預期成本與效益

| 項目 | 數字 |
|---|---|
| 套件安裝 | 1 行 pip |
| 帳號 | 0 |
| 金錢成本 | 0 元 |
| 25 分講稿生成時間 | 完整版約 1-2 分鐘 |
| 32 張逐頁並發生成 | 3-5 分鐘 |
| mp3 體積 | 完整版約 14 MB |
| 失敗率（含重試）| < 5% |

---

## Slide 16 — 快速回顧

把 .md 變成台灣中文 mp3 = **三件事**：

1. **`pip install edge-tts`**
2. **寫一個清理層**（markdown → 朗讀文字）
3. **三層輸出**（完整／章節／逐頁）+ Semaphore(3) + 重試 + tmp 寫檔

選聲音記 3 個：**雲哲、曉辰、曉雨**

---

## Slide 17 — Q&A 預備題

| 問題 | 安全答案 |
|---|---|
| 可商用嗎？ | Microsoft 條款偏向「個人使用」；商用要查 Azure TTS 條款 |
| 能調語速嗎？ | `Communicate(text, voice, rate="-10%")` 慢 10% |
| 能換情緒嗎？ | Edge TTS 免費版不支援；要走 Azure SSML |
| 能做英文嗎？ | 換 `en-US-AriaNeural` 等英文聲音即可 |
| 能跨多語言混雜？ | 可，但建議分段不同聲音再合成 |

---

## Slide 18 — 延伸資源

- **本教材主檔**：`workshops/2026-05-12-edge-tts-台灣中文配音/README.md`
- **完整聲音清單**：`edge-tts --list-voices`
- **官方 repo**：[github.com/rany2/edge-tts](https://github.com/rany2/edge-tts)
- **相關工具棧**：ailab 工具棧索引

---

## Slide 19 — Thank You

- 把講稿變音檔，從此**演練不靠別人**
- 改一個字 → 重生 30 秒 → 繼續聽
- 問題：（Q&A 時間）

---

*Jacky × Claude · 2026-05-12*
