---
name: tts-script
description: 文字轉語音口稿 — 把 .md 講稿/論文/任何文字內容用 Edge TTS（免費 + 微軟雲哲台灣男聲）轉成完整版 + 分章節 mp3，含 markdown 清理層、學術引用括號自動砍除、符號口語化、5 大採坑防範。源自博二專討第三次講稿 V7 + TJFS 投稿全文音檔實戰。觸發：「/tts」「/語音」「/音檔」「/口稿」「製作音檔」「文字轉語音」「講稿轉 mp3」「edge-tts」「tts 跑一遍」「逐字稿做成音檔」。
trigger: /tts
---

# /tts — 文字轉語音口稿 Skill

把任何 `.md` 講稿/論文/逐字稿 → **30 分鐘內**變成可循環播放、可分段、可逐頁練習的台灣中文 mp3，**完全免費**。

源自 Jacky 兩個實戰：
- **博二第三次專討**（2026-05-12）— 25 min 講稿產 完整版 + 6 章節 + 32 張逐頁 mp3
- **TJFS 投稿全文音檔**（2026-05-21）— 中英混合 review paper 產 11 支 mp3（摘要 + S1-S9）

---

## ⚠ 必讀順序（每次觸發必走）

1. **本 SKILL.md**（你正在讀）
2. `references/cleanup_rules.md` — markdown → 口稿清理規則（學術引用括號、符號口語化、emoji、學名）
3. `references/voice_selection.md` — 雲哲男 / 曉辰女年輕 / 曉雨女沉穩，何時選哪個
4. `references/5大採坑.md` — Windows cp950 / NoAudioReceived / 半寫檔 / 檔案鎖 / 補生成判斷
5. `references/script_template.py` — 可直接套用的 Python 腳本範本（複製改 SCRIPT_PATH + VOICE）

---

## 🎯 4 個 Mode

### Mode 1：`/tts gen <md_path> [voice]` — 主指令（最常用）

從 `.md` 講稿生成 **完整版 + 章節分段** mp3。

**voice 預設**：`zh-TW-YunJheNeural`（雲哲男聲），可改 `HsiaoChenNeural` 或 `HsiaoYuNeural`。

**輸出位置**：與來源 .md 同層的 `audio_<md_basename>/` 資料夾。

**輸出內容**：
- `<basename>_完整朗讀.mp3` — 整篇一氣呵成
- `<basename>_01_<section>.mp3` ~ `<basename>_NN_<section>.mp3` — 各章節
- `_<basename>_朗讀稿純文字.txt` — 清理後文字，給你校對

**切段策略**：
- 依 `^# ` / `^## ` markdown heading 自動切段
- 也支援自訂正則（如博二專討用 `^## ▌Part (\d+)` 切 5 個 Part）

### Mode 2：`/tts clean <md_path>` — 只跑清理（不生 mp3）

只輸出清理後的純文字 `_<basename>_朗讀稿純文字.txt`，給你**校對**「念出來會是什麼樣子」，避免跑完一輪 mp3 才發現有問題。

特別有用：
- 你寫的 .md 含很多 in-text 引用 `(Author 2025, Vol(1):pp)` 怕被亂念
- 你寫的 .md 有 emoji 怕被念出來
- 你想先估算字數 / 預估時長

### Mode 3：`/tts setup` — 環境準備

檢查 + 安裝：
- Python 3.10+ 已裝（`python --version`）
- `pip install edge-tts` 已裝（`python -c "import edge_tts; print(edge_tts.__version__)"`）
- 列出 3 個台灣中文語音（zh-TW）+ 選擇建議
- 設定 `$env:PYTHONIOENCODING = "utf-8"`（防 cp950 編碼坑）

### Mode 4：`/tts review <audio_dir>` — 音檔品質檢核（可選）

對已生成的 mp3 跑檢核：
- 每個 mp3 檔案大小（< 50 KB 可能是壞檔）
- 總字數 vs 總時長合理性
- 列出失敗的 mp3（從 tmp 檔判斷）
- 提示哪些可以重生（用 `_補生成` 邏輯）

---

## 🗣 語音選擇心法（速查）

| 語音 ID | 中文名 | 性別 | 風格 | 用途 |
|---|---|:---:|---|---|
| `zh-TW-YunJheNeural` | 雲哲 | 男 | 自然、新聞主播感、節奏穩 | **教學 / 簡報朗讀 / 學術論文 / 演講練習**（預設）|
| `zh-TW-HsiaoChenNeural` | 曉辰 | 女 | 年輕、輕快、口語感強 | 廣告 / 短影音字卡 / IG reel |
| `zh-TW-HsiaoYuNeural` | 曉雨 | 女 | 沉穩、知性、適合長篇 | 有聲書 / 長 podcast / 紀錄片 |

換語音只改 `VOICE` 常數一行。詳見 `references/voice_selection.md`。

---

## 🧹 Markdown → 口稿清理規則（核心差異化）

**直接餵 markdown 給 TTS 會聽到一堆「星號井號斜體」**。skill 內建清理層處理：

| 原始 | 改成 | 理由 |
|---|---|---|
| `**粗體**` `_斜體_` `` `code` `` `[link](url)` | 純文字 | 移除 markdown 標記 |
| `### 【Slide 3：標題】` | `。投影片 3：標題。` | 轉口語自然停頓 |
| `\| 表格 \|` | 整列跳過 | TTS 念表格災難 |
| `(Author et al. 2025, Vol(1): pp)` | （刪除） | **學術 in-text 引用括號自動砍** |
| `(Khan 2025, pp.5-6, §2.3-2.8)` | （刪除） | 同上，泛用正則 |
| `R²` `m²` `km²` | `R 平方` `平方公尺` `平方公里` | 上標 TTS 念不對 |
| `×` `·` `→` `≈` `≤` `≥` `∼` `~` | `乘` `、` `接下來` `約等於` `小於等於` `大於等於` `到` `到` | 符號口語化 |
| `①②③④⑤` | `第一第二第三第四第五` | 圈號 TTS 不會念 |
| `✅🆕★⏱🎯⚠️📌` 等 emoji | （刪除） | emoji 念出來尷尬 |
| `Mg/ha` `USD` `gC/m²/yr` | `公噸每公頃` `美金` `gC 每平方公尺 每年` | 單位口語化 |
| ``` ```code block``` ``` | 整段跳過 | 程式碼念出來無意義 |
| 學名 `*Calocedrus formosana*` | 保留斜體標記**前後刪除**，純文字 `Calocedrus formosana` | TTS 自動拉丁文發音 |
| 行內 LaTeX `$x^2$` | `x 平方` | LaTeX 念不對 |

完整規則 + Python regex 實作見 `references/cleanup_rules.md`。

---

## 🪤 5 大採坑（最珍貴）

1. **Windows cp950 編碼炸裂**：`print("✓ 完成")` 拋 `UnicodeEncodeError` → 解法 `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")` 或 `$env:PYTHONIOENCODING = "utf-8"`
2. **`NoAudioReceived` 伺服器隨機罷工** → `Semaphore(3)` 並發 + 指數退避重試 + `asyncio.gather(*tasks, return_exceptions=True)`
3. **半寫檔污染** → 先寫 `.tmp` 後 size check (>5KB) 才 `replace()` atomic
4. **檔案鎖** → 寫前先關 Windows Media Player / Foobar / 瀏覽器；輸出 dir 跟「正在聽的」dir 分開
5. **「補生成」邏輯沒抓部分寫入** → `if not exists OR size < 50_000` 雙條件判斷，不能只看 exists

完整含 Python 範例見 `references/5大採坑.md`。

---

## 🎬 三層輸出策略（實戰精華）

**「一個完整版 mp3 不夠用」** — 實戰需要三種粒度：

| 粒度 | 用途 | 檔名範例 |
|---|---|---|
| **完整版** | 一氣呵成練節奏 / 開車通勤聽 | `<basename>_完整朗讀.mp3` |
| **章節分段** | shadow 跟讀 / 找弱章反覆練 | `<basename>_01_Introduction.mp3` |
| **逐頁逐張**（可選）| 死記某張投影片 / 金句 | `<basename>_slide_01.mp3` |

skill 預設產「完整版 + 章節分段」。逐頁要的話用 `--per-slide` flag。

---

## 📦 工作流程

### 第 0 步：環境（一次設定）

```bash
pip install edge-tts
$env:PYTHONIOENCODING = "utf-8"  # PowerShell
```

### 第 1 步：跑 `/tts gen <md>` 主指令

skill 自動：
1. 讀 .md
2. 跑清理層 → 純文字
3. 切段（依 heading 或自訂正則）
4. 輸出 `audio_<basename>/` 含完整版 + 章節 mp3
5. 同時輸出 `_<basename>_朗讀稿純文字.txt` 供校對
6. 同時輸出 `README_開車聽指南.md`（音檔清單 + 預估時長 + 開車聽建議）

### 第 2 步：校對純文字（5 分鐘）

開 `_朗讀稿純文字.txt`，掃看：
- 有沒有念得怪的詞（如縮寫沒展開、特殊符號殘留）
- 章節分段是否正確
- 學名是否保留正確

### 第 3 步：聽 mp3 確認

開幾個關鍵段聽（不必每個都聽），確認 voice / 速度 / 斷句自然。

### 第 4 步：如需重生

修 .md → 重跑 `/tts gen <md>`（會 overwrite 既有 audio_/）。

---

## 🛡 紅線

- ❌ 不可改原始 .md（清理只在記憶體中，輸出 .txt 另存）
- ❌ 不可重生既存 mp3（除非 `--force`）— 防覆蓋還在用的檔
- ❌ 不可跳過 PYTHONIOENCODING=utf-8（Windows cp950 必踩）
- ❌ Semaphore 不可 > 5（NoAudioReceived 必爆）
- ❌ 不寫 atomic（tmp + replace）→ 半寫檔污染下次補生成判斷
- ❌ 不可建議 paid TTS（edge-tts 免費已夠，沒理由付費）
- ✅ 學術論文預設用雲哲男（中性、不搶戲）
- ✅ 不確定就先跑 `/tts clean` 校對純文字再決定要不要 `/tts gen`

---

## ⏰ 主動觸發時機

| 場景 | 主動建議跑 |
|---|---|
| 你寫完一份 .md 講稿（≥ 1000 字）| 「要不要跑 `/tts gen` 產音檔開車聽？」 |
| 你完成一輪論文精修（如 TJFS v9）| 「主稿大改後音檔過時了，要不要 `/tts gen` 重生？」 |
| 你準備專題討論 / 演講 | 「上場前要不要 `/tts gen` 多聽幾次抓節奏？」 |
| 你發現 .md 有 emoji / 學術引用括號 | 「跑 `/tts clean` 預覽清理後文字，避免 mp3 念出來怪」|

---

## 🤝 跟其他 skill 的協作

| Skill | 關係 |
|---|---|
| `seminar-helper` (`/seminar`) | 專討 9 階段第 8 階段（演練）= /tts gen 講稿 → 反覆聽 |
| `j-bo` (`/jbo`) | J博先驗內容真實性 → 通過後再用 /tts 產音檔 |
| `journal-chinese-forestry` (`/tjfs`) | TJFS 投稿前用 /tts gen 主稿全文校對「念出來合不合理」（catch 流暢度問題）|
| `wrap-up` / `kickoff` | wrap-up 時記得 .md 改了 → 下次 /tts gen 重生 |

---

## 📚 延伸閱讀

- 完整工作流（30-60 分鐘照做完）：[jacky-wiki Edge TTS workshop](file:///C:/Users/gjj22/jacky-wiki/wiki/education/workshops/Jacky_2026-05-12-edge-tts-台灣中文配音/README.md)
- 博二第三次專討範本：`C:\Users\gjj22\Desktop\中興大學生科所\專題討論\114下學期專討-博二\B_專討準備階段\03_講稿與演練\media_audio_Final\_gen_v7_audio.py`
- TJFS 投稿全文範本：`C:\Users\gjj22\Desktop\中興大學生科所\J博Team_Review投稿\06_投稿管理\audio_TJFS_投稿全文\_gen_tjfs_full_audio.py`

---

## 🎓 為何這 skill 存在

**Jacky 的痛點**：每次寫完 .md 講稿 / 論文，要開車反覆聽抓節奏 / 找邏輯漏洞 / 練流暢度。手動跑 TTS 每次都要重寫腳本、踩同樣的 5 大採坑。

**這 skill 解決**：一個 `/tts gen <md>` 全自動處理 — 清理 / 切段 / 並發 / 重試 / atomic 寫入 / 三層輸出，30 分鐘搞定。

**全域可用**：不限專討、不限論文 — **任何 .md 都可** 變音檔。
