---
title: AI 撰寫嚴謹科學論文 — 三層查核與 J博 skill
domain: education
updated: 2026-05-23
audience: 內部團隊 / 學術 AI 使用者 / 研究生
prerequisite: Claude Code 基本操作、學術投稿認識（基礎）、知道什麼是 reference list / DOI / 同儕審查
duration: 30 分鐘看完、本身教學 + 案例研讀 90 分鐘
tags: AI, 學術論文, 反幻覺, Crossref, PDF, 查核工作流, J博 skill, sub-agent
source_chat: 2026-05-22~23 跨日 TJFS Review Paper 三輪查核 + 第四五輪精修 + J博 skill 建立全程
---

# AI 撰寫嚴謹科學論文 — 三層查核與 J博 skill

> **一句話**：AI 寫的學術稿件**不是「之前 reviewer 沒抓到 = OK」**，必須在送件前用三層 audit 把書目幻覺、引述漂移、檔名擴散一次抓出。本工作坊把 2026-05-22~23 TJFS 投稿衝刺實戰整理成可重複套用的方法論 + 一個 `/jbo` skill。

---

## 🎯 學習目標

1. 理解 AI 寫學術內容的 **5 大典型幻覺** 與抓法
2. 學會用 **`/jbo` skill** 的 4 個 mode（sanity / full / fix / verify）
3. 能在自己的學術寫作中執行 **三層查核 → 整合修補 → 驗收 → 重生交付** 完整 SOP
4. 知道**何時主動觸發查核**（不等別人提醒）

---

## 📦 先備知識

| 項目 | 必要嗎 | 備註 |
|---|---|---|
| Claude Code 操作 | ✅ 必要 | 會派 sub-agent、會用 Skill |
| 學術投稿認識 | ✅ 必要 | 知道 DOI / volume / issue / pages / Crossref |
| Python（基礎）| 🟡 建議 | Crossref API 用 requests 而已 |
| 同儕審查經驗 | ⚪ 加分 | 知道 reviewer 怎麼想最好 |
| reference manager（EndNote / Zotero）| ❌ 不需 | 我們用純 markdown + Crossref API |

---

## 🚨 為什麼學術 AI 寫作必須跑三層查核？

### 核心邏輯

AI 寫作（包括 Claude 自己）的本質：**statistical language model 會在「合理性」與「真實性」之間偏向合理性**。當你問它「Lin 2025 RMSE 是多少」，它會生成「14.06」這個「對的」數字；但當你問「Qiu 2023 的 GPP / AGB / NPP R²」，如果 PDF 沒這些論點，它可能把 PDF 真實存在的「視覺辨識率 91.3%」+「DBH accuracy 94.70%」+「H accuracy 91.9%」三個數字**搬到錯誤的論點**上。

**Reviewer 一翻 PDF 即抓到，directly 質疑作者誠信。**

### 真實風險案例（2026-05-22 TJFS 投稿衝刺實證）

| 事件 | 嚴重度 |
|---|---|
| Sasaki 題目幻覺（ref list 寫的是錯誤論文題目）| 🔴🔴🔴 |
| Qiu §7.5 數字搬家幻覺（真實數字搬到錯誤論點）| 🔴🔴🔴 |
| 3 處整串作者錯（Krause / Jiang F / Chen — 沒一個對的）| 🔴🔴 |
| 6 處首作者 initial 錯（Lin D ≠ E、Pan H-L ≠ T-Y 等）| 🔴 |
| 「90 篇 reference」記憶高估，實際 57 條 | 🟡 |

**全部 11 處致命錯，第三輪精修當時稿件「形式 91% 完成度」，三輪查核後真實只有 65%。**

---

## 🛠 完整 SOP（4 階段）

### 階段 1：三層查核（4-6 小時 agent 並行）

派**三個獨立 sub-agent** 並行跑。每個都有明確 brief + 紅線：

```
派 agent A → Crossref 全篇 ref 驗證（每條送 API 比對 7 欄位）
派 agent B → PDF 引用句逐筆比對（深讀文獻每處 in-text 對 PDF）
派 agent C → 檔名 vs 真實題目 audit（防 Sasaki 級擴散）
```

每個 agent 完成後產出獨立 markdown 報告，內含：
- 7 數字（致命 / 嚴重 / 中等 / 小錯字 / 無法驗證 / API 失敗 / 一句判斷）
- 完整比對矩陣 CSV
- 修補建議按 P0 / P1 / P2 優先序

### 階段 2：整合修補（1 個 agent，2-3 小時）

**不可並行！**修補必須一個 agent 一次處理，避免 merge conflict。

```
派 agent D → 整合三份 audit 報告，一次修完所有 P0 + P1
  紅線：不新增 ref、不動核心 anchor、不重生 docx / 音檔
  找到第 N+1 處新致命錯 → 只記錄不修
```

修完產出 `第N輪內容精修_modification_log_YYYY-MM-DD.md`，每處改有 line range + before/after。

### 階段 3：驗收（1 個 agent，30-60 分鐘）

**輕量驗收 agent — 只驗剛修過的部分**：

```
派 agent E → 驗收
  1. Crossref 重跑被修的 N 條 ref
  2. 核心 anchor + 紅線全 PASS 確認
  3. PDF 重跑被修的 in-text 引用句
  4. 副作用 spot check（沒新引入錯誤、markdown 沒破壞）
```

驗收 PASS → 進階段 4；FAIL → 補救或新一輪精修。

### 階段 4：重生交付（python-docx，10 分鐘）

```
派 agent F → 重生 Word docx
  TJFS 規格嚴格：A4 / 3cm 邊距 / Times New Roman + 細明體 12pt / double-spaced
  Table → Word real table（不是文字）、Figure caption 純 text
  輸出新檔名（不覆蓋舊版，保留軌跡）
```

音檔重生視情況決定（投稿前不急可暫不跑）。

---

## 🔮 5 大典型幻覺（J博必查）

### 1. 「N 篇」記憶高估

**症狀**：作者印象「90 篇 reference」，實際主稿 57 條。

**機制**：人對「努力量」的記憶高於「實際交付量」，PDF 收集 ≠ 文獻引用 ≠ ref list 條目。

**抓法**：用 Python 數**三方真實數**（主稿 ref list、Excel 文獻總表、PDF 資料夾），不問人。

### 2. 檔名擴散幻覺（Sasaki 級）

**症狀**：ref list 條目題目寫的論文與真實 DOI 對應的論文**完全不同**。

**機制**：資料夾藏兩份相同 DOI 的 PDF — 一份檔名正確、一份檔名錯誤。LLM 寫作引用了錯誤檔名版本，題目幻覺擴散到 ref list。R1 修正當時只比 DOI 沒比題目，所以漏抓。

**抓法**：階 3 audit — 用 pdftotext 抽 PDF 第一頁與 ref list 題目比對字串。

### 3. 數字搬家幻覺（Qiu 級）

**症狀**：主稿引用某論文「GPP / AGB / NPP R²」，但 PDF 完全沒這些論點 — 實際是 FDT 視辨識/DBH/H accuracy 三數字被「搬到」錯誤論點。

**機制**：LLM 寫作時看到 PDF 有真實數字，把數字搬到「自己覺得需要的論點」上，但這個論點不在 PDF 中。**比「數字錯」更危險 — 因為數字對得上時 reviewer 第一眼會 PASS、第二眼翻 PDF 才發現論點全錯。**

**抓法**：階 2 PDF 引用句逐筆比對 — 對每處數字引用，必須在 PDF 同一段或同一表格找到「該數字 + 該論點」**雙重對應**。

### 4. 整串作者錯

**症狀**：ref list 寫的作者群「Krause, S.; Sanders, T.G.M.; Mund, J.-P.; Greve, K.」全部錯誤，真實作者「Krause, P.; Forbes, B.; Barajas-Ritchie, A.; Clark, M.; Disney, M.; Wilkes, P.; Bentley, L.P.」**沒一個對的**。

**機制**：LLM 寫 ref list 時憑想像生成「合理感」的作者名（常見姓 + 幾個 plausible co-authors），不查 Crossref / PDF。

**抓法**：階 1 Crossref API 全欄位比對作者陣列。

### 5. Initial 錯（首作者 initial 不對）

**症狀**：Lin **E.** 真實是 Lin **D.**、Pan **T.-Y.** 真實是 Pan **H.-L.**、Li **X.** 真實是 Li **H.**。

**機制**：LLM 對中文姓作者的 initial 容易猜錯，特別是常見姓（Lin / Li / Pan / Chen / Wang）+ 多重組合。

**抓法**：階 3 audit — Read PDF 抽 author full name，對應 Crossref initial 雙重驗證。

---

## 📦 工具棧

| 工具 | 用途 | 取得 |
|---|---|---|
| **Crossref API** | DOI 解析、書目反查、欄位驗證 | https://api.crossref.org (免費，無 API key) |
| **Read PDF**（Claude Code 內建）| 讀 PDF 前 N 頁、引用段落比對 | Read tool 直接支援 PDF（大檔分頁 `pages: "1-5"`）|
| **Python + requests** | 包 Crossref API 呼叫、生成比對矩陣 CSV | python-3.10+ + pip install requests |
| **Python + openpyxl** | 讀 Excel 文獻總表（如有）| pip install openpyxl |
| **python-docx** | markdown → TJFS 規格 docx 轉檔 | pip install python-docx |
| **Edge TTS**（可選）| 主稿全文音檔（給作者反覆聽校對）| pip install edge-tts，免費 |
| **`/jbo` skill** | 整合 4 mode 一鍵觸發三層查核 | 內建於 ~/.claude/skills/j-bo/ |

---

## 🔍 `/jbo` skill 4 個 mode

| Mode | 用法 | 時機 |
|---|---|---|
| `/jbo sanity` | 5-10 個 anchor 快速 PASS/FAIL | 寫作中段健檢、修補後立刻跑 |
| `/jbo full <主稿>` | 完整三輪查核（階 1+2+3）| 投稿前必跑、接手別人稿件必跑 |
| `/jbo fix` | 整合修補（修完所有 P0+P1）| 三輪查核後 |
| `/jbo verify` | 輕量驗收（只驗剛修過的）| 整合修補後立刻跑 |

**主動觸發規則**（J博 skill 內建提醒）：
- 累積 ≥ 5 個新 ref → Claude 主動建議跑
- 寫作 ≥ 3 小時 → Claude 主動建議跑
- 投稿衝刺最後 7 天 → Claude 主動提醒
- 任何時候作者說「真實嗎」「對嗎」「查一下」 → Claude 必觸發

完整 SOP 與紅線清單見 `~/.claude/skills/j-bo/`。

---

## 🪤 採坑點（實戰最珍貴一段）

### 採坑 #1：R1 修正只比 DOI 沒比題目 → Sasaki 幻覺漏抓 5 輪

**症狀**：R1（第一次精修）跑 Crossref 確認 Sasaki DOI 是 10.3390/fi17090421 正確，title 沒比就放過 → 第五輪三層查核才抓到題目根本是另一篇論文。

**真實原因**：「DOI 對 = ref 對」是錯誤推論。同一 DOI 可能配錯題目（檔名擴散源頭）。

**解法**：Crossref API 必比 7 欄位（含 title），少一個都不行。

**預防**：每次新增 ref 後立刻跑 `/jbo sanity` 限該 ref。

---

### 採坑 #2：派並行 agent 一起修主稿 → merge conflict

**症狀**：試過派 3 個 agent 並行修「Lu 卷期 / Sasaki 題目 / Qiu 數字」，3 個都動到同個 ref list 區段 → 最後 merge 兩處衝突手動處理半小時。

**真實原因**：修補不是查核，修補會動同個檔案。並行只在「讀」與「審」階段有效。

**解法**：修補階段**一個 agent 一次到位**，14 處 P0+4 處 P1 一起處理。

**預防**：在 skill 規範中標註「修補不可並行」紅線。

---

### 採坑 #3：「找到第 N+1 處致命錯」想順手修 → 任務蔓延到第六輪

**症狀**：第四輪修補時，agent 在修 Qiu §7.5 過程中發現「Khan §7.2 七組件命名也是拼湊的」，順手改了 — 但這項不在原始 14 處清單中，後來第四輪驗收時被打回說「超出 brief 範圍」，整段又要重審。

**真實原因**：agent 想「順手做好事」，但這破壞了「修補清單 = 真相之源」的契約。

**解法**：所有 brief 明確寫「找到第 N+1 處新致命錯 → 只記錄不修」。

**預防**：在 J博 skill SKILL.md 寫死這條紅線。

---

### 採坑 #4：MDPI / Wiley 等出版社網頁 403 阻擋 WebFetch

**症狀**：要 verify Sasaki 真實題目，WebFetch `https://www.mdpi.com/...` 直接 403 Forbidden。

**真實原因**：MDPI 用 Cloudflare 擋 web crawler，連 WebFetch 也擋。

**解法**：改打 Crossref API `https://api.crossref.org/works/<DOI>` — 免費、無 key、不擋 crawler，回傳完整 metadata。

**預防**：建立 fallback 鏈：本機 PDF → Crossref API → Semantic Scholar API → Google Scholar → 最後才 Cloudflare-protected 出版社網頁。

---

### 採坑 #5：本機 PDF 可能藏「Just a moment... Cloudflare」HTML 假檔

**症狀**：階 3 audit 跑到 Krause 2023 PDF，Read 完發現 706 KB 但內容是 Cloudflare 驗證頁面 — 從前下載時被攔截、檔案是 HTML 不是 PDF。

**真實原因**：下載當下沒驗證檔案完整性，HTML 偽裝成 PDF 保留在資料夾。

**解法**：Read 前先用 file size + magic bytes 驗證（`pdf` 應該以 `%PDF-` 開頭）。

**預防**：定期跑「PDF 檔案完整性 audit」— 大小 < 50 KB、內容含 "Just a moment" / "Cloudflare" 即標壞檔。

---

### 採坑 #6：Tsai 2021 vs 2020、Lu 2014 vs 2016 — print year vs OnlineFirst 年份爭議

**症狀**：Crossref 顯示 Tsai 2020-12-29 published online，但 issue 是 9(1) = 2021 年 1 月實體刊號。Lu 印 issue 是 2016 但檔名/DOI 卡 2014（OnlineFirst）。

**真實原因**：學術界對「引用年份」有兩派：
- A 派：以 Crossref published-online date 為準（早期 indexing 友善）
- B 派：以 issue print year 為準（傳統慣例、引用統一）

**解法**：選 B 派（issue print year），全篇統一：
- Tsai 維持 2021（issue 9(1) = 2021 年 1 月）
- Lu 改 2016（issue print year）

**預防**：在每篇論文寫作前確立「year 標準」，寫進紅線清單。

---

### 採坑 #7：投稿前 docx 重生覆蓋舊版 → 軌跡消失

**症狀**：第五輪重生 docx 想覆蓋 v3_figures_tables.docx，但發現 v3 是 5/21 版本、現在是 5/23 — 覆蓋會丟失 5/21 的軌跡，後續若 reviewer 問「之前哪版」沒得查。

**真實原因**：學術稿件版本管理需要保留每輪 milestone。

**解法**：每輪重生用新檔名（含日期 + 版本號）：`V3_TJFS_投稿版_2026-05-23_v5_final.docx`，舊版**不覆蓋**保留作軌跡。

**預防**：寫 docx 重生 agent brief 時明確「不可覆蓋既有版本」紅線。

---

### 採坑 #8：忘記更新 cross-domain memory → 下次對話又從頭

**症狀**：5/22 第一輪查核做完，5/23 開新對話 Claude 又問「要怎麼做三層查核」— 因為這套 SOP 沒進 memory，每次都要重講。

**真實原因**：高價值 workflow 沒結晶成 skill 或 memory，跨對話失憶。

**解法**：
1. 跑完工作流第一輪 → 立刻 `/internal-training` 進 jacky-wiki/education
2. 寫成 skill（如 `/jbo`）放 `~/.claude/skills/`
3. 加 feedback memory（如 `feedback_academic_audit_workflow.md`）

**預防**：在 wrap-up 時自問「這次學到的東西進 memory / skill 了嗎？」

---

## 🔗 延伸閱讀

- [TJFS 投稿衝刺一日工作流](../2026-05-20-tjfs投稿衝刺-多agent並行工作流/README.md)（5/20 篇 — 多 Agent 並行寫作）
- [多 Agent 並行學術精修 SOP](../../playbooks/多agent並行學術精修SOP.md)（5/20 篇 — 並行修補 SOP）
- [J博 skill](file:///C:/Users/gjj22/.claude/skills/j-bo/SKILL.md)（執行版 skill，內含 4 mode 完整觸發機制）
- [J博三層查核工作流](file:///C:/Users/gjj22/.claude/skills/j-bo/references/三層查核工作流.md)（agent brief 範本）
- [J博 5 大典型幻覺](file:///C:/Users/gjj22/.claude/skills/j-bo/references/五大典型幻覺.md)
- [實踐捕手協定](../../ailab/concepts/實踐捕手協定.md)（跨域 pattern 升格）
- [Edge TTS 台灣中文配音](../2026-05-12-edge-tts-台灣中文配音/README.md)（音檔校對工具）

---

## 📋 快速回顧

把 AI 寫的學術稿件變成可投稿狀態，三件事：

1. **跑三層查核**（Crossref / PDF / 檔名 audit）— 抓 5 大典型幻覺
2. **派一個 agent 一次修完 P0+P1**（不可並行修補）+ 派輕量驗收 agent 確認
3. **裝 `/jbo` skill** 跨對話可一鍵觸發 — Claude 會主動提醒查核時機

最大教訓：**「之前 reviewer 沒抓到 = OK」是錯誤心態**。AI 寫作的幻覺是 statistical 本性、不是訓練不足 — 必須靠**逐筆查證工具**而非「更好的 prompt」來解。

選擇 `/jbo` 工具：sanity（快查）/ full（投稿前）/ fix（一次修完）/ verify（驗收）。

---

*Jacky × Claude · 2026-05-23 · TJFS 投稿衝刺實證*
