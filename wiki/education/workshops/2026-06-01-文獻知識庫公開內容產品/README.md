---
title: 用 Claude Code 把文獻知識庫變成會自我更新的公開內容產品
domain: education
updated: 2026-06-01
audience: 內部團隊（含 AI 實踐新手）
prerequisite: 會用 Claude Code 基本操作、知道 git/GitHub、看得懂一點 Python 與 Node
duration: 25 分鐘
tags: AI, Claude Code, 多Agent, 零幻覺, goal模式, 確定性管線, GitHub Actions, Zeabur
source_chat: 2026-06-01 一段對話內把森林數位孿生文獻庫升級成公開內容產品（主編 skill + 72 篇全文入庫 + 每日新聞管線）
---

# 用 Claude Code 把文獻知識庫變成會自我更新的公開內容產品

> 一段對話內，把一個只有 5 篇卡片的私人文獻資料夾，變成一個**上線、有品牌、72 篇全文文獻、跨產業分類、科技報、每天自動長新內容**的公開網站（forest-lit.zeabur.app）。
>
> 這份教材教的不是「做網站」，而是**怎麼指揮 AI 做完一個大專案而且不出幻覺**。

---

## 學習目標

1. 用 **plan mode + `/goal`** 把大型開發切成「先確認方向、再放手自動執行」兩段，逼近全自動。
2. 用**多 Agent 並行批次**處理大量文獻，並用「**書目逐字抓自 PDF 首頁**」這條鐵則根除作者幻覺。
3. 理解「**全文規則**」的隱藏價值——它會順手把資料庫裡的重複、壞檔、舊幻覺照出來。
4. 學會一個關鍵判斷：**即時／新聞類內容必須用確定性程式抓取、全程不經 LLM，才可能零幻覺**。
5. 內化幾個工程慣例：雙站互連、Zeabur 自動部署、不加新依賴、JSON 當單一事實來源。

---

## 先備知識

- Claude Code 的 plan mode、`/goal`、skill、Agent（sub-agent）概念。
- git 分支（dev 開發 / main 上線）、GitHub、GitHub Actions cron。
- 大概看得懂 Python（urllib/標準庫）與 Node（靜態產生器）。

---

## 步驟

### 步驟 1 — 先用 plan mode 把計畫寫死，再用 /goal 放手

**為什麼**：大專案直接叫 AI 做，會中途亂發揮或做一半停下來問。正解是切兩段——plan mode 先把「鎖定決策、步驟、鐵則、驗收方式」寫進計畫檔，**你確認方向後**，再用 `/goal` 把計畫濃縮成起始指令，讓 AI 自走。

**怎麼做**：
1. 進 plan mode，讓 AI 探索 + 寫計畫檔，**在計畫裡明列「已鎖定決策（不要重問）」**（例：森林為主品牌、付費先放著、不加新依賴）。
2. 計畫核准後，用 `/goal <把計畫濃縮成的起始指令>` 啟動。指令內含：目標、工作目錄、完整計畫檔路徑、已鎖定決策、依序步驟、鐵則。
3. AI 接著自走，只在「真正屬於你的決策點」停下來問（站名、整合架構），其餘全自動。

**預期結果**：一條指令貼下去，AI 自己跑完多階段（建置→多 Agent→驗證→commit→push→部署），你只做關鍵拍板。

### 步驟 2 — 多 Agent 並行批次，每篇全文 + 書目逐字抓首頁

**為什麼**：72 篇文獻一篇篇做太慢；但並行又怕作者幻覺（這是本專案最痛的歷史傷）。

**怎麼做**：
1. 每批派 ~10 個 sub-agent，**一個 agent 只負責一篇**。
2. 每個 agent 的鐵則寫死：用 `pdftotext` 從**本機真實 PDF** 抽全文 → 讀全文 → **書目（標題/全部作者/期刊/年/卷期頁/DOI）一律逐字抄自 PDF 首頁，絕不憑檔名或記憶猜作者**；抓不到才標「待查」。
3. 全文層級才填得出真實數字（附章節）、真實短引用（附頁碼）——`read_depth=FULL_TEXT_CHECKED`。
4. 主程式循序跑產生器寫回 CSV（避免並行寫檔競態），再 build。

**預期結果**：每批 10 篇高品質全文卡，書目零幻覺、數字可追溯。並行把 8 批做完只花數輪。

### 步驟 3 — 把「全文規則」當資料體檢，揪出三類問題

**為什麼**：堅持讀全文不只是品質，它會**逼出資料庫裡本來看不到的錯**。

實際揪出的三類（教學重點）：
- **重複**：編號檔（`Ch1_01_…`）其實是既有論文（=Xu/Zhang/Mo）→ 用 DOI/標題比對後刪除不收。
- **壞檔／錯檔**：下載到的「PDF」其實是 Cloudflare 攔截頁、ScienceDirect HTML 殼、403 假頁，或抓錯成不相關論文（雷達 DOA、植被趨勢）→ 先檢查檔頭 `%PDF` magic bytes，壞檔不產卡、列「到校重抓」。
- **既有幻覺**：讀全文才發現既有卡的標題（Sasaki 篇被掛錯標題）與數字（TianX 投影片版 RMSE 寫錯）是幻覺 → 當場修正。

**預期結果**：資料庫越做越乾淨；錯誤被照出來而不是被掩蓋。

### 步驟 4 — 即時／新聞內容用確定性 Python，全程不經 LLM

**為什麼（本教材核心觀念）**：新聞／全球動態這種「每天要新、要真」的內容，**最不能讓 LLM 生成**——它會編造假新聞、把舊的當新的。正解是寫一支**確定性程式**，只抓真實來源的真實欄位。

**怎麼做**：
1. 純 Python 標準庫（urllib/xml.etree）抓**免費無金鑰**來源：Crossref / arXiv / OpenAlex（新文獻）、Google News RSS（新聞）、data.gov.tw（政府開放資料）。
2. 每則只存來源**逐字**的標題/連結/日期/來源，點標題外連原始出處——**沒有任何模型參與，所以零幻覺**。
3. 「不是新的」用 `_seen.json` 去重集合 + 日期窗（近 N 天）解決——只收從沒見過且近期的。
4. 相關性用**原子關鍵字命中**（不是 LLM 判斷），太嚴或太鬆都不對，取「命中任一即留」。
5. 排程交給 **GitHub Actions 雲端 cron**（每日跑）：抓取 → commit `data/news` → push → Zeabur 自動部署。**不用開電腦**。

**預期結果**：網站每天自動長出真實、可追溯、零幻覺的新動態。LLM 只在「寫這支程式」時用一次，之後永遠不碰。

### 步驟 5 — 守住工程慣例

- **雙站互連**：成果站（FDT 展示）與方法論站（文獻庫）各一個 repo / 各一個 Zeabur 服務、同一專案、互相加外連，不硬合併。
- **Zeabur git-deploy**：push main 自動 build+部署；前台維持**零 npm 依賴**（純靜態產生器 + Python 標準庫）。
- **JSON 為單一事實來源**：`data/*.json` → 產生器 → 靜態 HTML 單向流，git 可追溯。
- **dev 開發 / main 上線**、commit 用 `feat(scope): 描述` + Co-Authored-By。

---

## 採坑點（最珍貴）

- **plan mode × `/goal` Stop hook 互鎖**：goal 的 Stop hook 會「沒做完就把你推回去做」；若此時又在 plan mode（不能執行非唯讀動作），就卡成死結（hook 要執行、plan mode 禁執行）。解法：給 AI 一個明確出口（回「直接做」或貼新 `/goal`），或讓它 ExitPlanMode。
- **下載的 PDF 是假的**：很多「.pdf」其實是反爬攔截頁或網頁存檔。**先驗 `%PDF` 檔頭**，否則 pdftotext 出垃圾或 AI 對著空白編造。壞檔一律不產卡、列清單到校重抓。
- **編號檔 ≠ 新論文**：`Ch?_0N_*.pdf` 常與作者檔是同一篇。處理前用 DOI/標題對既有去重，否則網站長出重複。
- **arXiv 429 限流**：連續打太快會被擋。每次間隔約 3 秒 + 429/逾時退避重試；擋掉就優雅略過（其他來源仍夠用）。
- **Windows cp950 編碼崩潰**：印外文標題（俄文/烏克蘭文）時 `print` 會炸。腳本開頭 `sys.stdout.reconfigure(encoding="utf-8", errors="replace")`。
- **相關性閘的拿捏**：用「整句查詢」去比對標題幾乎都不中（學術 29→1）；改用**原子詞命中任一**（forest/biomass/carbon/digital twin/碳匯…）才合理。這是「保證零幻覺」換來的取捨——偶爾混進命中關鍵字但稍離題的真實論文，可接受。
- **既有資料的幻覺只有讀全文才現形**：標題、數字的舊幻覺平常看不出來，全文一比對就露餡。值得定期用全文回頭體檢。
- **here-string 在 Bash 工具下會把 `@` 混進 commit 訊息**：commit 多行訊息改用 `git commit -F 訊息檔`，別用 `@'...'@`（那是 PowerShell 語法）。
- **大量 sub-agent 會觸發 session 額度**：分批做、每批做完立刻 commit+push，並把批次計畫與去重清單寫進 `data/_ingest_plan.md` 當「續跑依據」，RESET 後接得回來。
- **LLM 生成新聞＝幻覺溫床**：這是最大的觀念坑。即時內容一律走確定性抓取，不要叫 AI「幫我整理今天的新聞」。

---

## 延伸閱讀

- 多 Agent 並行的個人方法觀 → [ailab/patterns/AI 團隊三線並行開發模式](../../ailab/patterns/AI團隊三線並行開發模式.md)
- 單人指揮多 Agent 的共用模式 → [cross-domain/Commander+Executor 單人多 Agent 模式](../../cross-domain/Commander+Executor單人多Agent模式.md)
- `/goal` 近全自動開發的原始事件 → [ailab/inbox/2026-05-31 第一次用 /goal](../../ailab/inbox/2026-05-31-goal-mode-99pct-automation.md)
- Claude Code 工具觀 → [ailab/tools/claude-code](../../ailab/tools/claude-code.md)
- 反幻覺學術寫作的姊妹教材 → [AI 撰寫嚴謹科學論文 — 三層查核與 J博 skill](../2026-05-23-ai撰寫嚴謹科學論文-三層查核與J博skill/README.md)
- 多 Agent 並行的 SOP → [多 Agent 並行學術精修 SOP](../playbooks/多agent並行學術精修SOP.md)
- 本案資產頁（網站本身） → [nchu/cases/文獻知識庫網站](../../nchu/cases/文獻知識庫網站.md)
- 簡報大綱 → [slides-outline.md](slides-outline.md)

---

## 快速回顧

把大專案交給 AI 的心法是「**先鎖方向（plan）、再放手（goal）、能並行就並行、能確定性就別用 LLM**」。文獻入庫用多 Agent 並行 + 書目逐字抓首頁根除幻覺；即時新聞用純 Python 抓真實來源 + 去重 + 雲端 cron，全程不碰 LLM 才能每天長真內容。AI 負責一次把系統建好，之後系統自己跑。
