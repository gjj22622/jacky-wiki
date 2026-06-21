---
title: Wiki 操作日誌
domain: root
updated: 2026-06-20
---

# Wiki 操作日誌

> 記錄 wiki 整理過程的關鍵操作。**只記下「做了什麼、為什麼這樣做、留下什麼決策」**——不重複頁面內容本身。

---

## 2026-06-21（深掘鐵則 + 三大專案家族 — 挖出 4 個漏掉的已部署產品）

**背景**：Jacky 指出我只掃表層。**新鐵則**：資料夾越豐富越值得記；**>5 子夾 或 >3 層 → 派專屬 agent 深掘**。TBSA*、双云AI轉型教育訓練 內容極豐富。

**做法**：量測後 3 個夾達標，各派專屬 agent + 1 綜合 agent 深掘：
- 双云AI轉型教育訓練（16 子夾/8 層/18975 檔）→ 11 子作品
- TBSA開課流程自動化（11 子夾/10 層/2941 檔）→ 7 子作品
- 建立TBSA口說知識體系 SPEAKS（14 子夾/14 層/67604 檔）→ 10 子作品

**重大發現（之前漏掉的已部署線上產品）**：
| 產品 | 網址 |
|---|---|
| SPEAKS Coach App（生產 SaaS）| speaks-coach.zeabur.app + backend |
| TBSA AI 教學樞紐（自有網域）| agents.tbsa.tw（4 子 agent）|
| 双云 Agent 平台（腦+手）| shuangyun-agent-platform.zeabur.app |
| 18 週課程產生器 | tbsa-18week.zeabur.app |

**新增完整頁（3）**：speaks-coach、tbsa-ai-教學樞紐、双云agent平台。已部署作品 6→9。

**作品索引**：新增「🏛 三大專案家族」section，把各家族多個子作品（KOL/Claude教學平台/V2/双云AI School/AGENTS架構圖/五張表單工作坊/助教後台/SPEAKS skills/導覽頁/簡報…）+ TBSA財務儀表板 全納入。

**金庫**：+speaks-coach/tbsa-agents/shuangyun-agent 憑證指標。

**索引更新**：portfolio 14→17 頁；總頁 220→223。鐵則已存記憶 [[feedback-portfolio-definition]]。

---

## 2026-06-21（作品域 OneDrive 掃描 + 定義放寬 + 分類目錄重構）

**背景**：Jacky 指出 OneDrive 還有一堆專案，且**放寬作品定義**：AI 生成簡報/素材、有導覽頁、有 HTML 檔，都算作品（不限已部署）。

**做法**：再派 6 個 Explore agent（兩波）掃 OneDrive ~17 個夾。依新定義重分類，作品索引從「兩張表」重構成 **A-E 五分類目錄**：
- A 線上產品（有網址）/ B 互動成品(HTML/遊戲) / C 客戶競賽機構交付 / D 課程方法論知識體系 / E 工具開發中 / 排除區。

**新增完整頁（4，互動成品）**：前導生物(AI小說+閱讀器+Docker)、餐廳經營遊戲(HTML5 v1+v2)、鍾氏族譜(git 全端)、skill-meeting(Next.js Zeabur-ready)。

**新納入（單行條目）**：致理AI行銷(67頁簡報+問卷儀表板)、宜蘭博愛醫院(AI簡報+4 HTML)、全國高中競賽(評分儀表板)、竹北林啟賢競選、AI教育年會、双云AI轉型(入口導覽HTML+5週)、數位行銷AI逆向工程(7 PDF)、優派CLOSES、TBSA品牌視覺、各類簡報(243檔)、SOSTAC孿生、小廚神大冒險、OpenClawAI 等。

**交叉比對**：OneDrive 的 muzopet/Jwood/佛學 = 已歸檔 A 類的工作源，不重複。⚠️ **OneDrive\Jwood 是 jwood 內部系統唯一源、無 git**（含 client_secret/yt_token），已標備份風險入金庫。

**金庫**：+鍾氏族譜/skill-meeting/jwood 憑證指標（路徑，不貼值）。

**排除**：OpenClaw 研究文件、問券系統空夾、越南(隱私)、工作區雜物、空夾。

**索引更新**：portfolio 10→14 頁；總頁 216→220。

---

## 2026-06-21（作品域大掃描 — agent team 盤點 C:\Users\gjj22 全部專案）

**背景**：Jacky 嫌 /作品 內容匱乏，授權掃描 C:\Users\gjj22 所有專案資料夾，把所有「作品（專案成果 / 部署後網址；Jwood 類為實體木藝）」歸檔。

**做法**：派 4 個 Explore agent 並行調查 ~19 個資料夾（read-only，寫入集中由主控做以守金鑰紅線）。每 agent 回報結構化座標（定位/remote/網址/admin/平台/狀態/憑證檔存在性，不貼值）。

**新增作品頁（4，已部署/營運）**：
| 頁 | 作品 | 平台/網址 |
|---|---|---|
| agentflow-airun | AgentFlow Solutions | airun.tw（自有網域，藍新金流已開）🟢 |
| muzopet-dashboard | 木酢寵物達人數據看板 | muzopet-dashboard.zeabur.app 🟢 |
| 一念清涼-每日佛學故事 | A-day-A-Story | github.io/A-day-A-Story（Firebase+Actions）🟢 |
| 回憶錄系統 | jacky-memoir | jacky-memoir.zeabur.app（佈建中）🟡 |

**索引次表（開發中/未部署）**：tw-opendata-mcp / mingnow / mingcha / 墨流網站 / 節稅專案 / Rewood。

**金庫**：agentflow/muzopet/a-day-a-story/回憶錄 四筆，憑證採**指標式**（記憑證檔路徑+admin網址，值待 Jacky 補；絕不貼 token）。

**排除（非作品）**：TBSA 治理文件、双云_TBSA 合作、AgentcrewAcademy 教材、母親節/伴手禮草稿、Projects meta、文字轉音訊/_deckprev 暫存、2026暑假_越南（隱私）、TBSA 兩空夾。

**索引更新**：portfolio 6→10 頁；總頁數 212→216；wiki主索引 + CLAUDE.md。

---

## 2026-06-21（歸檔 jwood + jos 多機升級）

**背景**：Jacky 要把 jwood 歸檔；並提出多機需求——確認 Windows ↔ Linux(G2 mini) 環境是否一致、把 Linux 的工具/設定/skill/作品也同步上 github。

**決策**：
- **jwood 作品頁**：第三方平台官網（jwood.tw 自有網域）、無自有程式碼（平台運營）。頁面記公開座標+社群，平台後台帳密進金庫（佔位待補）。
- **jos 升級為多機架構**（關鍵）：`manifest.md` 改為**分機器區段**（Windows 主機 / G2 mini 各一段），`/移機 capture` 偵測 OS **只寫本機段、不覆蓋別台**——否則 Linux capture 會清掉 Windows 快照。
- **新增 `migration/環境一致性.md`** + `/移機 diff` 子指令：各機 capture+push → 任一台 pull + diff → 列差異與補齊動作。
- Linux 同步走「各機自己跑 capture」模式（這台 Windows 無法遠端抓 Linux 狀態）；Linux 端需先 `git pull` + 裝今天新建的 /移機 /作品 skill。

**新增頁面**：portfolio/projects/jwood.md（+1→6）；jos/migration/環境一致性.md（+1→15）。manifest 重寫為多機。總頁數 210→212。

---

## 2026-06-21（新建 jos 作業系統域 + portfolio 作品域 + /移機 /作品 雙 skill）

**背景**：Jacky 在双云 AI School 提出「AI 使用應像新世代作業系統」。三個痛點：① 換電腦得從零重裝靠回憶；② 16 支個人 skill 只有 ailab 在 wiki 有主版，其餘換機就丟；③ 作品部署資訊散落，每次示範要回想網址/token。

**決策**：
- **環境域 + skill 域合併成 1 個 `jos`（AI 作業系統）域**（使用者拍板），底下 environment/ + skills/ + migration/。與 `ailab/tools/` 明確分工：ailab = 工具觀（為什麼），jos = 機械清單（怎麼裝回來），互連不重複。
- **作品 token 走分離金庫**（使用者拍板）：`wiki/portfolio/.vault/` 進 `.gitignore`，頁面只記非機密，守住「token 不進 wiki」紅線。已用 `git check-ignore` 驗證金庫不被 commit。
- **轉移先做純 runbook 後進化腳本**（使用者拍板）：`migration/換電腦SOP.md` 寫到電腦/AI 新手能逐行複製貼上（0→10 步、三平台並列），腳本化列為日後升級。
- skill 還原快照：用實檔 `cp` 把 `~/.claude/skills/` 18 支 SKILL.md 複製進 `jos/skills/個人skills/`（即 `/移機 sync` 的動作），避免重打、避免漂移（快照非編輯主版）。

**新增頁面**：jos 14 頁 + 18 還原快照；portfolio 5 頁 + gitignored 金庫。兩支 canonical skill 主版（`/移機`、`/作品`）+ 各機執行版已裝 `~/.claude/skills/`。

**索引更新**：總頁數 191→210；wiki主索引 + CLAUDE.md 域表/拓樸/目錄樹；ailab/tools/工具棧索引頂部加 jos 連結；~/.claude/CLAUDE.md 加 /移機 /作品 觸發。

---

## 2026-06-20（多機分歧救援：補回本機未推送的 4 頁）

**背景**：本機工作樹卡了一批未提交變更，但其中索引檔（AI實踐索引、wiki主索引）是 6/15、136 頁的**舊快照**，而 GitHub 已被別台機器推到 187 頁。直接 pull 會衝突。

**決策**：
- 先 `git stash -u` 保全全部本機變更 → `git pull --rebase` 拉到最新 `436d235`（187 頁）。
- 不整包 pop（會把舊索引內容帶回）。改**外科式取出**：只還原 4 個真正新增、GitHub 沒有的檔，索引引用手動疊回最新版。

**新增頁面（4 個）**：

| 路徑 | 角色 |
|---|---|
| `ailab/concepts/AI作業系統觀.md` | 結晶：AI 是新世代作業系統（工具觀的上位） |
| `ailab/inbox/2026-06-04-簡報視覺三分工-gptimage2插畫工作流.md` | inbox：捕手草稿 |
| `ailab/inbox/2026-06-08-新人角色模擬反推教材缺口.md` | inbox：捕手草稿 |
| `nchu/concepts/工具評估_ForestForTrees.md` | 評估任務：黃老師建議的 R 套件，FDT 資料層/模型層候選組件 |

**索引更新**：ailab 21→24、nchu 12→13、總頁數 187→191；ForestForTrees 引用疊回 nchu 三索引（博論總導覽／文獻追蹤／下一步候選池）。

---

## 2026-06-20（Jcheck × Jdong 鷹眼到執行交接 SOP）

**主題**：把 AIRUN 的 Jcheck 監察機制，延伸成一條可交接、可驗收、可分享的 AI 營運治理工作流。核心分工是：Jcheck 只動眼監控與驗收，Jdong 讀工作書並協調執行，Work AI 或團隊實際處理，最後由 Jcheck 產生品質報告給 Jacky。

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `ailab/inbox/2026-06-20-session-jcheck-jdong-handoff-workflow.md` | Mode B session 封存：記錄從 AIRUN 監察、Telegram 通知、local-only 試跑，到 Jcheck/Jdong 檔案交接與 skill 入口的決策脈絡 |
| `education/playbooks/jcheck-jdong鷹眼到執行交接SOP.md` | 可分享 SOP：給內部團隊、AI 工作流設計者與客戶端理解 WO → plan → RR → QR 的治理流程 |

### 留下的決策

- Jcheck 是鷹眼：可監控、產工作書、驗收與回報；不修 code、不排程、不指派團隊。
- Jdong 是營運協調者：讀工作書、拆任務、排程、整合成果；不改 Jcheck 工作書，不在缺證據時宣稱完成。
- skill 是入口，檔案契約才是真相來源：`WO-*`、`*-plan.md`、`RR-*`、`QR-*` 保留完整審計鏈。
- 因 `jacky-wiki` 已有既有 dirty worktree，本次只新增文件與補索引，未執行 pull / commit / push。

---

## 2026-06-19（AIRUN 營運風險監察 + 團隊/客戶分享素材）

**主題**：把 AIRUN 的營運風險監察從想法落成 Jcheck 工具與可對內、對外說明的教材。核心不是只看 uptime，而是把服務健康、資源效率、程式碼風險、資安基線、異常流量、LLM 模型依賴與通知分級一起納入低成本監察報告。

### 新增頁面（4 個）

| 路徑 | 角色 |
|---|---|
| `ailab/inbox/2026-06-19-airun-risk-watch.md` | 原始實踐捕手紀錄：AIRUN 低成本營運風險監察機制 |
| `education/workshops/2026-06-19-airun營運風險監察/README.md` | 主教材：20 分鐘 workshop，給內部團隊與客戶端/非工程師 |
| `education/workshops/2026-06-19-airun營運風險監察/slides-outline.md` | 14 張簡報大綱 |
| `education/workshops/2026-06-19-airun營運風險監察/團隊與客戶分享文案.md` | 可直接複製給團隊與客戶的分享文案 |

### 為什麼這樣分

- `ailab/inbox` 保留原始事件與決策脈絡：從 Jacky 提出營運風險監察需求，到實作 `airun-risk-watch`、email + Telegram 通知與 LLM 依賴治理。
- `education/workshops` 產出對外可分享版本：把技術細節轉成「AI 服務如何被治理」的說法，方便給團隊、客戶理解。
- 簡報大綱與分享文案分開放，後續可直接丟給 Canva / huashu 做 deck，或貼進群組、客戶提案。

### 留下的決策

- 第一版監控用 deterministic checks，不用 LLM 直接判斷警報。
- Jcheck 作為 AIRUN 的本地營運監察區；若要團隊共同維護，再決定是否移入正式 repo 或獨立 repo。
- 通知分 Green / Yellow / Red / Black，Red 以上 email + Telegram，避免 notification spam。
- 因 `jacky-wiki` 已有既有 dirty worktree，本次只新增與索引補記，未執行 pull / commit / push。

---

## 2026-06-15（更新）Gmail 量寄採坑點 #6 成真 + 補 #7–#10

**主題**：當天實際寄 6/13 跟進信，昨天 #6「免費 Gmail 量寄會被擋」的**預測成真**——batch1 第 17 封被 Google 封鎖（support 69585）、最後 5 封退信。把實戰與解方回灌採坑點檔。

**更新頁面（1 個，無新增）**：`education/pitfalls/gmail量寄與跨客戶洩漏掃描-採坑點.md` 6 雷→**10 雷**：
- #6 解法標註「事後證明不足」（分批間隔只降速、沒解帳號信譽本質）。
- #7 免費 Gmail 連發同主旨第 17 封被擋 → 改**品牌網域 Resend（airun.tw 已驗 SPF/DKIM/DMARC）**。
- #8 寄送器回成功≠真寄達（退信非同步，查 `from:mailer-daemon`）。
- #9 品牌信回信去向靠 `reply_to`，不是 Resend 帳號 owner（airun.tw 無 MX，須帶 replyTo=J董 gmail）。
- #10 降主旨重複用「分眾＋輪換句型＋品牌」，不塞收件人名字（名字進主旨＝垃圾指紋）。

**為什麼這樣記**：採坑點檔的價值在「預測 vs 實際」的落差——#6 是事前研究、#7 是事後真相，兩者並存最有教育意義（別人能看到「以為夠了其實不夠」）。頁數不變（更新非新增），不動主索引計數。

---

## 2026-06-15（演講到業務開發全鏈 + 跟進信寄送 SOP + Gmail 量寄採坑點）

**主題**：把 6/13 彰師大演講後「處理 69 封跟進信」這一仗，從演講前建站到演講後業務開發的完整打法整理成可傳承教材。

### 新增頁面（5 個）

| 路徑 | 角色 |
|---|---|
| education/workshops/2026-06-15-演講到業務開發全鏈/README.md | 主文：四階段全鏈知識文件（傳承用） |
| education/workshops/2026-06-15-演講到業務開發全鏈/slides-outline.md | 13 張簡報大綱（餵 huashu 出 deck） |
| education/workshops/2026-06-15-演講到業務開發全鏈/內部分享文案.md | 群組/週會用 3 分鐘分享文案 |
| education/playbooks/演講後跟進信-人工審核分批寄送SOP.md | 操作 SOP（人工四軸審核 + 合規分批） |
| education/pitfalls/gmail量寄與跨客戶洩漏掃描-採坑點.md | 6 個採坑（觀測管道/空頭承諾/import誤觸/leak誤判/同公司/Gmail量寄） |

**為什麼這樣分**：主題二（全鏈打法）有傳承價值的方法論 → workshop（含簡報+文案）；主題一（寄信流程）步驟導向 → playbook；過程踩的雷獨立成 pitfalls（最珍貴反面教材）。引用 ailab 既有結晶用連結不複製。education 21→26、主索引 128→133。

---


## 2026-06-03（黃仁勳 Computex 2026 AI Agent 架構入庫，供 6/13 彰師大演講開場）

**主題**：6/13 演講要框死「AI Agent 是什麼」（現況各自解讀很混亂），上網抓黃仁勳 2026-06-01 Computex keynote 的兩層架構入 reading。

### 新增頁面（1 個）
| 路徑 | 角色 |
|---|---|
| `ailab/reading/2026-06-01-黃仁勳computex2026-aiagent定義與架構.md` | 兩層架構（大腦 LLM＋作業系統編排引擎）、「操作主體從人變成 AI」、AI 搶工作論打臉、商模論述（賣成果不賣座位）。標好哪段給演講承幕①、哪段給收幕 |

### 關鍵決策
- **wiki 原本沒這筆**：使用者以為有，實查 jacky-wiki + jdong-wiki 皆無「架構定義」；jdong-wiki 只有黃仁勳的**商模角度**（`products/airun-new-business-models-2026-06.md`，賣成果/100:1）。架構定義是上網抓的（aiposthub 全紀錄）。
- **為何上網**：Computex 2026（6/1）在知識截止後，不可憑記憶重建——查證附來源，避免幻覺（呼應演講風險治理段主題）。
- **守線**：只取黃仁勳公開論述；jdong-wiki 商模 doc 的內部紅線（cron/cache/twinkle-hub/corpus/客戶名）不入演講、不外流。
- 同步更新 `ailab/reading/閱讀索引.md`「AI 工具觀／模型認知」欄。

---

## 2026-06-01（用 Claude Code 把文獻知識庫變成會自我更新的公開內容產品）

**主題**：把「一段對話內升級森林數位孿生文獻庫為公開內容產品」整段沉澱成 workshop

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `education/workshops/2026-06-01-文獻知識庫公開內容產品/README.md` | 25 分鐘 workshop：plan+`/goal` 近全自動、多 Agent 並行全文入庫（書目逐字抓 PDF 首頁根除作者幻覺）、全文規則當資料體檢、**即時新聞用確定性 Python（Crossref/arXiv/OpenAlex/Google News RSS/data.gov.tw）+ _seen 去重 + GitHub Actions 雲端 cron 全程不經 LLM 才零幻覺**、工程慣例 + 10 採坑點 |
| `education/workshops/2026-06-01-文獻知識庫公開內容產品/slides-outline.md` | 22 張投影片大綱 |

### 為什麼這樣分

- **核心教學差異化**：本篇最大價值不是「做網站」，而是兩個觀念——① 大專案用「plan 鎖方向 → goal 放手」兩段式；② **即時／新聞類內容必須用確定性程式抓取、不經 LLM 才零幻覺**（過去叫 AI「整理今天新聞」是幻覺溫床）。
- **連結既有結晶不複製**：多 Agent 並行連到 ailab/patterns 與 cross-domain/Commander+Executor；`/goal` 連到 ailab/inbox 2026-05-31 事件；反幻覺連到 5/23 篇 workshop。
- **與 5/20、5/23 篇配對**：那兩篇是「多 Agent 寫／查學術論文」；本篇是「多 Agent 建內容產品 + 確定性自動化管線」，互補不重疊。

### 留下的決策
- 本案資產頁在 `nchu/cases/文獻知識庫網站.md`（網站定位與架構）；education 這篇講「怎麼做出來的方法」，兩者分工。
- 採坑點直接寫進 workshop README（10 點皆與本案綁定），不另開 pitfall 檔。

---

## 2026-05-23（AI 撰寫嚴謹科學論文 — 三層查核與 J博 skill）

**主題**：把 2026-05-22~23 跨日 TJFS 投稿衝刺「反幻覺」實戰沉澱成 workshop（接 5/20 篇延伸）

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `education/workshops/2026-05-23-ai撰寫嚴謹科學論文-三層查核與J博skill/README.md` | 30 分鐘 workshop：4 階段 SOP（三層查核並行 → 整合修補單一 → 輕量驗收 → 重生交付）+ 5 大典型幻覺（N 篇高估／Sasaki 級檔名擴散／Qiu 級數字搬家／整串作者錯／Initial 錯）+ `/jbo` skill 4 mode + 8 採坑點 |
| `education/workshops/2026-05-23-ai撰寫嚴謹科學論文-三層查核與J博skill/slides-outline.md` | 25 張投影片大綱 |

### 為什麼這樣分

- **延伸 5/20 篇而非取代**：5/20 講「多 Agent 並行**寫**」，5/23 講「多 Agent 並行**查核**」。兩篇配對 — 寫完了用 5/23 篇查、查完發現問題用 5/20 篇 SOP 修。
- **沒有獨立 playbook**：J博 skill (`~/.claude/skills/j-bo/`) 內部已含完整 references（三層查核工作流 / 五大典型幻覺 / 紅線清單）—— 在 wiki 寫 playbook 會重複。Workshop README 連結到 skill references 即可。
- **沒有 pitfall 獨立檔**：8 個採坑點直接寫進 workshop README，不另開 pitfall 檔——因為這些坑都跟「AI 學術寫作」綁定，獨立檔反而失去脈絡。

### 留下的決策

- **未來「AI 寫學術論文」相關採坑** → 持續加進這份 workshop 而非另開檔
- **J博 skill 是真相之源**：workshop README 連結而非複製 skill 內容
- **配對 ailab 升格**：5 大典型幻覺 + 三層查核工作流可未來升 `ailab/patterns/`（驗證 2-3 個學術投稿後）

---


## 2026-05-22（品牌短網址 + UTM 系統 workshop）

**主題**：把今日實作的 airun-site 短網址系統整理成內部訓練教材，讓團隊能夠幫自己的品牌複製一套（Node.js + links.json + CRUD API + Admin UI，不加 npm 依賴）

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `education/workshops/2026-05-22-品牌短網址UTM系統/README.md` | 30 分鐘 workshop 主教材：6 步驟（links.json 設計 → 重新導向路由 → CRUD API → Admin UI → Zeabur 部署 → 發行第一批短網址） + 5 採坑點 |
| `education/workshops/2026-05-22-品牌短網址UTM系統/slides-outline.md` | 17 張投影片大綱：含架構圖、UTM 五參數、code 範例、完整驗收清單 |

### 關鍵設計決策

- links.json 作為資料庫（無新 npm 依賴）vs SQLite → 選 JSON，因為 CLAUDE.md 規定「不加新 npm 依賴」且低流量足夠安全
- slug 不換只換 URL → 這是 Lihi.io 最核心的設計，社群上已發連結永遠有效
- 301 + Cache-Control: no-cache → 允許換目標網址同時避免瀏覽器永久快取

---

## 2026-05-22（LLM Wiki + Obsidian 關聯圖實戰 workshop）

**主題**：把 wiki 知識圖譜建置手冊 + Obsidian graph 整理成可分享內訓 workshop，給內部團隊（同事、夥伴、AI 新手皆可）走完帶著「跑得動的 wiki 骨架 + Obsidian graph 畫面」回家

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `education/workshops/2026-05-22-llm-wiki-obsidian-graph/README.md` | 60 分鐘 workshop 主教材：8 步驟 step-by-step（為什麼是 wiki → 定義 5-8 域 → 建 repo → CLAUDE.md → 第 1 頁 → 裝 Obsidian → 連結密度 → graph 配色） + 5 採坑點 + 講師備課 checklist |
| `education/workshops/2026-05-22-llm-wiki-obsidian-graph/slides-outline.md` | 15 張投影片大綱：60 分鐘節奏 = 概念 15 分（Slide 1-5）+ 動手 30 分（Slide 6-10）+ 採坑/延伸/QA/收尾 15 分（Slide 11-15） |

### 引用既有結晶（連結而非複製）

- `ailab/concepts/實踐捕手協定.md`（跨對話/跨模型事件收進來的標準格式）
- `ailab/concepts/三層萃取漏斗.md`（inbox → experiments → patterns/tools 的升格機制）
- `ailab/concepts/AI工具觀.md`（為什麼選 Markdown + git 這套而不選 Notion）
- `ailab/concepts/跨機與跨模型部署.md`（多機/多模型怎麼同步 wiki）
- `wiki知識圖譜建置手冊.md` §1-2 §STEP 1-6（整套 schema 完整版）
- `wiki知識圖譜建置簡報.md`（給管理層/客戶看的版本）
- `cross-domain/visualizations/jackywiki-3d-knowledge-graph.html`（3D 圖譜可視化，wow factor demo）

### 關鍵設計決策

1. **aha moment 集中在 Step 6**：學員裝完 Obsidian 開 graph view 看到第一張圖譜亮起 — 整個 workshop 的價值點在這 30 秒
2. **白紙手寫 Step 2**：講師備課 checklist 強制印白紙給學員，防止過早 over-engineer（直接打字會跳過「想清楚」這步）
3. **採坑 #5「不要每天 review」**：明確寫進採坑點，避免別人誤以為要設 calendar reminder — 知識管理最大殺手是儀式感過重
4. **3D 圖譜當對比 demo**：講師示範「成熟版本長什麼樣」用 Jacky Wiki 自己的 3D 可視化，wow factor 收尾
5. **QA 預備兩個高頻問題**：「Notion 不就好了嗎？」「VS Code 也可以嗎？」直接寫進 Slide 14，講師不用現場想

### 為什麼這樣分

- **workshop 而非 playbook**：8 步驟有講師現場示範價值（特別是 Obsidian graph 亮起那一刻），不只是步驟手冊
- **README + slides 雙檔**：README 給講師完整備課、slides-outline 給講師現場節奏控制
- **沒寫進 ailab**：這是對外成品（教別人），不是個人事件 capture — 符合 education vs ailab 分工

---

## 2026-05-21（Jwood Shorts EP41 完播率斷點診斷）

**主題**：從 strategy.json 數據發現 EP41 是觀看崩跌的斷點，診斷 product 場景是根因，建立數據驅動製作決策 SOP

### 新增頁面（1 個）

| 路徑 | 角色 |
|---|---|
| `education/playbooks/jwood-shorts-數據驅動製作決策.md` | 排程 AI / 接手 Claude 的製作決策 SOP |

### 關鍵決策

1. **Series A 永遠不加 product 場景**：EP40（30s 純教學）→ EP41（40s）是明確斷點，12s product 場景在第 23 秒讓完播率斷崖，停止推送連帶壓制後續影片。
2. **教材格式選 playbook**：目標讀者是排程 AI 實例，需要可執行步驟而非投影片大綱。
3. **65+ 男性語言規則成文**：「老花眼」「頸椎退化」比「疲勞」「痠痛」對這個受眾的 hook 效果更強，本次正式寫進 SOP。

### 為什麼這樣分

product 場景採坑點屬於「另一個 AI 需要知道才能不重蹈覆轍」，符合 education 對外成品定位。

---

## 2026-05-20（J博Team TJFS 投稿衝刺一日工作流）

**主題**：把 J博Team TJFS Review Paper 一日投稿衝刺對話沉澱成兩份對外教材 + 一份個人 capture

### 新增頁面（3 個）

| 路徑 | 角色 |
|---|---|
| `ailab/inbox/2026-05-20-tjfs投稿前scope與前例查證.md` | Mode A 個人事件 capture：三層搜尋找到 2 篇 TJFS 前例逆轉 desk reject 風險評估，maturity=已驗證，待第 2 個學術投稿驗證後升 patterns |
| `education/workshops/2026-05-20-tjfs投稿衝刺-多agent並行工作流/README.md` | 25 分鐘 workshop：5 Phase 流程地圖 + 8 個採坑點 + Jacky 4 個關鍵拍板對應 AI 4 個盲點 |
| `education/workshops/2026-05-20-tjfs投稿衝刺-多agent並行工作流/slides-outline.md` | 25 張投影片大綱 |
| `education/playbooks/多agent並行學術精修SOP.md` | 可獨立復用的 SOP：7 步驟 + Agent brief 模板 + 5 種異常分支 + 6 項驗收標準 |

### 為什麼這樣分

- **ailab inbox**：個人原始事件（三層 scope 查證模式），未來第 2 個學術投稿驗證後升 ailab/patterns/
- **workshop README**：對外完整故事（含 Jacky 拍板的具體形態），給內部團隊與 AI 學術投稿學習者
- **playbook**：技術 SOP 抽離出來獨立，不限學術論文——可用於任何 8K+ 字長文壓縮（whitepaper、技術報告、書稿章節）

### 關鍵設計決策

1. **workshop + playbook 雙檔**：workshop 講故事+示範+採坑點、playbook 講可復用步驟，分檔以利不同對象切入
2. **Agent brief 模板**：寫進 playbook 章 5.3 含「學術嚴謹優先於壓縮幅度」紅線——這是本案例 5 個 Agent 全部保住錨點的關鍵設計
3. **三層 scope 查證流程**：寫進 workshop 章 7.3 含具體 query 模板（Google Scholar / 期刊官網 / 學科資料庫 site:filter）
4. **跨對話資產化清單**：workshop 章 10 列出本工作流產出的 6 個可跨期刊復用資產

### 連結到既有結晶

- ailab/concepts/實踐捕手協定.md（Mode A 9 欄位）
- ailab/concepts/AI工具觀.md（整合鏈完整 > 單點最強）
- ailab/concepts/三層萃取漏斗.md（升格機制）
- nchu/concepts/零幻覺與文獻查證SOP.md（零幻覺 protocol）

---

## 2026-05-19（J董 Labor APP 案 1 日從規格到客戶簽認 MVP）

**主題**：education 域新增 **客製 APP 接案的雙層 playbook**——技術 SOP + 商業方法論

### 新增頁面（2 個）

| 路徑 | 角色 |
|---|---|
| `education/playbooks/APP原型快速產出SOP.md` | 技術執行 SOP：7 階段、HTML 模擬手機 APP 不寫 RN、三路平行 agent、會議回填表單、MVP 互動原型、客戶交付包打包，7 個採坑點 |
| `education/playbooks/客製APP接案服務化方法論.md` | 商業/服務化方法論：7 階段顧問流程、7 大關鍵設計決策、跟双云/AGENTS/TBSA/AI 諮詢的整合切點、cross-sell 推演、兩階段商模（自家→SaaS） |

### 為什麼這樣分

- **雙層拆解**：J董明確要求兩份——一份「APP 原型開發流程」（技術 SOP），一份「服務化方法論」（給其他客戶複製或整合進現有服務）。兩份互相引用、語氣分明（前者給技術執行者、後者給服務團隊與決策層）。
- **走 playbooks 不走 workshops**：兩份都是步驟導向、可重複套用，沒有教學單元的「學習目標 / 快速回顧」結構需求。
- **引用既有 wiki**：`Commander+Executor 單人多 Agent 模式`（三路平行 agent 理論）、`入口導覽頁 SOP`、`AGENTS 知識體系`（双云整合切點）、`TBSA 索引`——不複製內容只連結。
- **預算金額由 J董處理**：本次新教材明文規範 AI 出範圍/時程/工時但不出金額——這是 J董本案明確下的指示，沉澱成方法論層級的規範。

### 同步更新

- `教育訓練索引.md` — Playbooks 區塊加 2 條、pages 12→14、updated 2026-05-17→2026-05-19
- `wiki主索引.md` — education 頁數 12→14、🆕 描述更新為 APP 原型 SOP + 服務化方法論、總頁數 120→122

### 源頭對話脈絡

- 工作目錄：`C:\Users\gjj22\Jdongcompany\projects\Labor`
- 客戶：台灣人力仲介公司（移工管理，主力家庭看護工）
- 從紙本基礎規格 .txt 進駐 → 三路平行 agent → 寫導覽頁+回填表單 → 客戶會議拍板 → MVP 原型 → 拍照開案 OCR → 真實案例建檔 → 主體歸屬規則校正 → 教育訓練+交付清單 → 客戶簽認 ✓
- auto memory 寫於 `C:\Users\gjj22\.claude\projects\C--Users-gjj22-Jdongcompany-projects-Labor\memory\`

---

## 2026-05-17（課後）

**主題**：education 域新增 **五張表單工作坊實戰採坑點**（台中科大首場課後檢討萃取）

### 新增頁面（1 個）

| 路徑 | 角色 |
|---|---|
| `education/pitfalls/五張表單工作坊-實戰採坑點.md` | 首個 pitfalls 條目：7 則實戰教訓（STP Demo 不足 / Dataroom 順序 / 非本科系 / 教≠教怎麼做 / 頁碼殘留 / 中文路徑 / Form 5 時間） |

### 為什麼這樣分

- **走 pitfalls 不走 workshop**：這次產出的核心價值是「哪裡炸了」而非「怎麼教」。備課流程的 workshop 已存在（2026-05-14），本次是補上「實戰驗證後的反面教材」。
- **引用 ailab**：連結 `SOSTAC順序鐵規` 和 `claude-code` 兩篇，不複製。
- **數據基礎**：5 組 docx + 17 份問卷 xlsx + 41 頁簡報 pptx + 課前模擬報告 v3。

### 同步更新

- `教育訓練索引.md` — Pitfalls 區塊從「尚無」改為有 1 條、pages 11→12
- `wiki主索引.md` — education 頁數 11→12、🆕 更新描述、總頁數 119→120

---

## 2026-05-14（上午）

**主題**：education 域新增 **TBSA 五張表單工作坊備課流程**（內訓 + SOP + AI 餵食檔）

### 新增頁面（4 個）

| 路徑 | 角色 |
|---|---|
| `wiki/education/workshops/2026-05-14-五張表單工作坊備課流程/README.md` | 主教材（5 大產出 × 5 階段 × 7 關鍵決策 × 5 採坑點）|
| `wiki/education/workshops/2026-05-14-五張表單工作坊備課流程/slides-outline.md` | 內訓簡報大綱 20 張（可餵 huashu-design 變 .pptx）|
| `wiki/education/workshops/2026-05-14-五張表單工作坊備課流程/AI餵食檔-備課助手.md` | 給團隊 AI（ChatGPT/Gemini/Claude）的設定檔，讓 AI 也能扮演備課助手 |
| `wiki/education/playbooks/五張表單工作坊備課SOP.md` | A→B→C→D→E 五階段詳細 SOP，含驗收 checklist + 5 種異常情況分支 |

### 索引同步

- `wiki/education/教育訓練索引.md`（pages 7 → 11，workshops 區 +1 條、playbooks 區 +1 條）
- `wiki/wiki主索引.md`（總頁數 115 → 119、education 域 7 → 11）

### 為什麼整理這份教材

來源：2026-05-04 ~ 2026-05-14 台中科大 5/17 工作坊備課對話（Claude Opus 4.7）。整輪做完後 Jacky 認為這套備課流程值得固化給團隊：

1. **產出散落痛點**：每場備課 5 大產出（規劃／主辦文件／簡報／AI 設定／範例）分散，下次找不到對應檔
2. **品質不穩痛點**：第一場想得細的設計（如 SMART 原則、Persona 具體化、SOSTAC 對應），第二場想不起來
3. **教學模式漂移**：「三選一」「全雲端」「四段式」「Checkpoint = Demo 預演」這些核心 framing 沒寫下來就會自己改

→ 把這套流程固化成 education 域 4 個檔，下次新案進來直接照 SOP 跑、貼 AI 餵食檔給團隊 AI，第二場備課時間能砍掉一半。

### 設計重點

- **教材分三層**：主教材（教思維）／簡報大綱（教給更多人）／SOP（教操作）／AI 餵食檔（教 AI）— 對應 4 種閱讀情境
- **AI 餵食檔是新型 artifact**：之前的 workshops 都只給人看；本次首次產出「給 AI 看的」設定檔
- **與 ailab 分工守住**：個人事件（如台中科大現場踩到的坑）走 ailab；對外可分享教材（本次 4 檔）走 education
- **去重原則**：簡報品牌規範引用 `07-TBSA_品牌視覺系統/BRAND_BRIEF.md`（不複製）；ailab/concepts 用相對路徑連結

---

## 2026-05-12（深夜）

**主題**：nchu 域啟動 **AI Co-Researcher 文獻吸收系統**（D0 種子建立）

### 新增頁面（5 個）

| 路徑 | 角色 |
|---|---|
| `wiki/nchu/博論研究狀態.md` | AI 的「腦」 — 5 軸 × insight × gap × trend |
| `wiki/nchu/文獻追蹤總導覽.md` | AI 的「書架」 — 14 篇 D0 種子論文清單 |
| `wiki/nchu/log/每日學習日誌.md` | AI 的「日記」 — 每天一筆狀態演化 |
| `wiki/nchu/log/下一步候選池.md` | AI 的「to-read 清單」 — 12 個 D0 候選方向 |
| `wiki/nchu/concepts/AI_Co-Researcher工作流.md` | 方法論本身 — 4 動作日常迴圈（學/選/更新/教） |

### 索引同步

- `wiki/nchu/中興博士索引.md`（新增 concepts + 文獻吸收系統兩個 block）
- `wiki/wiki主索引.md`（總頁數 109 → 114、nchu 域 6 → 11）

### 為什麼啟動這套系統

Jacky 博二第二學期，預計持續 3-4 年博論寫作。傳統「人類每天搜文獻」會卡：
1. 疲勞（每天 3-5 篇一週就吃不下）
2. 方向死板（人類設的關鍵字不太動）
3. 看完就忘（沒有持續吸收 + 教學回饋的閉環）

新框架：把 AI 從「文獻搜尋助手」升格成「博論共同研究者」 — AI 自己學、自己挑、自己教，Jacky 只負責收成與糾偏。

### 4 個持久檔的設計理念

- **狀態檔**（腦）：AI 對博論的當前理解，每天讀完 paper 後自動更新
- **總導覽**（書架）：已讀清單，標 hot/cold
- **學習日誌**（日記）：狀態怎麼演化，可追溯「為什麼選這篇」
- **候選池**（to-read）：AI 自主維護的下一步建議

### 配套本機儲存

- 路徑：`Desktop\中興大學生科所\博士論文方向思考\文獻吸收_daily\{YYYY}\{MM}\{MMDD}_{軸}_{Author}_{Year}\`
- 每個資料夾 5-6 檔：原文 PDF、中文翻譯、圖表說明、主軸對應、教學包、教學 mp3
- 原則：PDF + 翻譯太肥不上 wiki；wiki 只放「腦」（狀態、導覽、log）

### 對應 Plan

詳細設計見 `C:\Users\gjj22\.claude\plans\reflective-whistling-gray.md`

---

## 2026-05-12（晚間）

**主題**：education 域新增 Edge TTS 台灣中文配音工作流教材（內部團隊向）

### 新增頁面

| 路徑 | 用途 |
|---|---|
| `wiki/education/workshops/2026-05-12-edge-tts-台灣中文配音/README.md` | 主檔（15 分鐘看完、30-60 分鐘照做完）— 三層輸出策略 + 5 個採坑點 |
| `wiki/education/workshops/2026-05-12-edge-tts-台灣中文配音/slides-outline.md` | 19 張簡報大綱（可餵 huashu-design 產 .pptx）|

### 索引同步

- `wiki/education/教育訓練索引.md` 頁數 5 → 7
- `wiki/wiki主索引.md` 總頁數 107 → 109、education 域 5 → 7

### 為什麼放 education 而非 ailab

- **對象明確是「別人」**（內部團隊分享用）— 符合 education 域定位
- **內容已穩定**：edge-tts 工作流走過完整實戰、5 個採坑點都已歸納
- **去個人脈絡**：原始事件來自演講配音場景，但教材抽離成「.md 講稿 → 台灣中文 mp3」的通用工作流，無特定領域綁定

### 採坑點摘要（教材精華）

1. Windows cp950 編碼 → stdout 強制 utf-8
2. NoAudioReceived 隨機罷工 → Semaphore(3) + 指數退避 + return_exceptions
3. 半寫檔污染 → tmp 寫檔 + 50KB 大小門檻 + rename
4. 檔案鎖（mp3 被播放器開著）→ atomic write
5. 補生成判斷不能用 `exists()` → 加大小門檻

---

## 2026-05-12

**主題**：TBSA 域衍生工作產物 — 大專 + 技職教育市場滲透策略（在 wiki 外）

### 衍生工作產物（不在 wiki 內，引用 wiki 為基底）

| 檔案位置 | 說明 |
|---|---|
| `C:\Users\gjj22\Documents\taiwan-education-data\TBSA認證商務拓展策略_v1.md` | 用 SOSTAC 框架擬定 5 年 TBSA 認證滲透計畫；含 Top 30 大專 + Top 30 高職目標清單、三方法論×科系對應矩陣、90 天試點行動方案、KPI Dashboard |

### 引用的 wiki 頁面（用連結，不複製）

- `wiki/tbsa/TBSA索引.md`（核心定位、三大方法論概覽）
- `wiki/tbsa/concepts/三大方法論體系.md`（SOSTAC × SPEAKS × AGENTS 整合）
- `wiki/tbsa/concepts/与双云的人才循環.md`（4 階段循環為策略 Layer 3 入口）
- `wiki/tbsa/concepts/初階知識體系_找方向找對象找方法.md`（L0 入門設計依據）

### 為什麼放 wiki 外

- 是「應用層產物」（針對特定外部資料集做策略文件），不是方法論本身
- 引用 wiki 為知識底層，但不適合進 wiki（避免 wiki 變成具體 case 倉庫）
- 遵守 wiki 鐵律：方法論只存一份，wiki 外文件用連結回指

### 資料基礎

- 高職：Dataset 9617 → 114 學年 22 縣市 428 筆科系記錄（商管 295 / 外語 91 / 設計多媒體 42）
- 大專：教育部 `students.csv`（19,281 筆 / 含進修部）+ `113_graduates.csv`（911 KB）直下載聚合
- 規模：大專商管+外語+視傳 **174K 在學 / 47.7K 畢業/年**

### 留下的決策

1. **TBSA 5 年雙倍增長**可行：每年潛在新會員池 5 萬+，滲透 1-2% 即達標
2. **三方法論 × 科系分工**：SOSTAC（4131/4143/4141）/ SPEAKS（2311）/ AGENTS（2112）
3. **三大旗艦校**：文藻外語大學（SPEAKS）/ 嶺東科技大學（AGENTS）/ 致理科技大學（綜合）
4. **第一波試點 5 校**：Top 5 大專 + Top 5 高職共 10 校簽 MOU 為 90 天 KPI

---

## 2026-05-11

**主題**：education 域首份 Playbook — 多平台數據匯流 Dashboard Pipeline SOP

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 多平台數據匯流 Dashboard Pipeline SOP | `education/playbooks/多平台數據匯流到dashboard-pipeline.md` | 內部團隊向，20 分鐘讀完。GA4 API / Meta Ads API / 蝦皮 Excel / WACA Excel 四路數據匯流到 Google Sheet + JSON → Dashboard 的完整 SOP，含5個採坑點 + 驗收 checklist |

### 更新頁面

| 頁面 | 變動 |
|---|---|
| `education/教育訓練索引.md` | Playbooks 區塊加首篇連結；pages 4 → 5；updated 2026-05-11 |
| `wiki/wiki主索引.md` | education 4 → 5 頁；總頁數 106 → 107 |

### 為什麼這樣分

- 走 **Playbook 模式**（Mode B）：「接入流程/步驟/思維」是 SOP 型知識，可重複套用，適合 playbook 結構
- 有 API 的平台（GA4 / Meta）自動拉，沒有 API 的（蝦皮 / 官網 WACA）人工月底下載 Excel 上傳 Drive → GitHub Actions 統一讀取——這個「雙軌策略」是核心思維
- 中央 Google Sheet（ID: 1KfT4uBgBaNuhucEg5cyP3P6zis9DLT2au4xqmlMcHb8）是人工複查層，JSON 是機器讀取層，兩者角色不同
- 5 個採坑點萃取自 muzopet dashboard 實際踩過的坑（data-seed 忘更新 / 蝦皮週切片重複計算 / SA 未授權 / Meta token 過期 / server.js method 未定義 502）

### 採坑點（首次寫 playbook 型教材）

- 技術細節太多，決定「流程清楚 + 採坑點獨立區塊」，不分拆成多個 playbook（太碎片化反而難用）
- data-seed 陷阱是本系統最不直觀的地方，特別用警示框強調

---

## 2026-05-08（下午）

**主題**：education 域首篇教材 — Claude Code 三 skill 鐵三角設計

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 三 skill 鐵三角教材 | `education/workshops/2026-05-08-claude-code-三skill鐵三角/README.md` | 內部團隊向，15 分鐘讀完，含 7 章節 + 6 個採坑點 + 自己設計 skill 的 5 大要點 |
| 三 skill 鐵三角簡報大綱 | `education/workshops/2026-05-08-claude-code-三skill鐵三角/slides-outline.md` | 15 張 slide 純文字大綱，後續可餵 huashu-design 做 .pptx |

### 更新頁面

| 頁面 | 變動 |
|---|---|
| `education/教育訓練索引.md` | Workshops 區塊加首篇教材連結 |
| `wiki/wiki主索引.md` | education 2→4 頁、總頁數 104→106、域結構小節補完整路徑 |

### 為什麼這樣分

這是 internal-training skill 的**首次自我驗證**——把今天上午設計三 skill 的對話本身整理成教材，proof of concept。

- 寫到 `workshops/`（完整教學單元，非 SOP 也非單一採坑點）
- 對象「內部團隊」（同事都看得懂的 Claude Code 使用者）
- 引用 ailab 4 個既有檔（連結而非複製，遵守去重原則）

### 採坑點（首次跑 internal-training）

教材結構自然落到：學習目標 → 先備知識 → 7 章節 → 採坑點 → 延伸閱讀 → 快速回顧。整理採坑點時最珍貴：6 個採坑包含設計分歧（為何 education 不要 inbox）、技術陷阱（git add -A）、跨機協作（pull --rebase）。

> 驗證 SKILL.md 的「拒寫機制」也運作正常：對話內容已經是「設計完成 + 驗證 push」的成熟階段，不是實驗中，可入 education。

---

## 2026-05-08

**主題**：新增 education 域骨架（內部教育訓練分享）+ 對應 internal-training skill

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 教育訓練索引 | `education/教育訓練索引.md` | 域首頁。明確跟 ailab 分工：原始事件→ailab、對外成品→education |
| education README | `education/README.md` | 內部結構（concepts/workshops/playbooks/pitfalls）+ frontmatter 範本 |

### 更新頁面

| 頁面 | 變動 |
|---|---|
| `wiki/wiki主索引.md` | 加 education 域（102→104 頁、6 內容域→7 內容域）+ education 域結構小節 |

### 為什麼這樣分

新增第三條輸入線：把對話／實踐**教給別人**的對外成品。

- **ailab**：個人 AI 實踐的活知識（捕事件、可未成熟、私）→ inbox 漏斗
- **education**：對外成品（學員視角、step-by-step、可分享、要 push）→ 沒有 inbox
- **shuangyun**：方法論結晶（已穩定，商務應用）

> 三者分工原則：捕原始事件走 ailab；做對外教材走 education；商業方法論在 shuangyun。

### 同步產出（在 ~/.claude/skills 內，非 wiki）

| 檔案 | 用途 |
|---|---|
| `~/.claude/skills/internal-training/SKILL.md` | 觸發機制（「整理成教材／SOP／採坑點／內訓」）+ 寫教材流程 + git pull --rebase / push |
| `~/.claude/skills/wrap-up/SKILL.md` | 收工儀式（cwd 寫 todolist.md） |
| `~/.claude/skills/kickoff/SKILL.md` | 開工儀式（讀 todolist.md brief） |

三 skill 鐵三角：wrap-up（個人收工）/ kickoff（個人開工）/ internal-training（對外分享）。後續可考慮整理一份 workshops/<日期>-claude-code-三skill鐵三角/ 教材作為 education 域的首篇實證。

---

## 2026-05-07

**主題**：木酢寵物達人 v2.0 平台上線 + Tool Use 升級紀錄

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 數據儀表板平台建置指南 | `cross-domain/數據儀表板平台建置指南.md` | 7 大架構決策 + 5 個採坑 + 可複用結構，適用任何客戶後續做類似平台 |
| 平台建置與 Tool Use 升級 | `ailab/log/2026-05-07_平台建置與Tool_Use升級.md` | Jacky 工具觀的兩個突破：Tool Use 取代 Context Injection、「生成指令」翻轉產品定位 |

### 更新頁面

| 頁面 | 變動 |
|---|---|
| `shuangyun/cases/木酢寵物達人.md` | 加 v2.0 平台章節（網址、五個入口、技術棧、AI Agent 架構）；frontmatter tags 補 `平台/AI-agent/GA4/Meta-Ads` |
| `cross-domain/跨域索引.md` | 加數據儀表板平台建置指南到清單 |
| `wiki/wiki主索引.md` | ailab 19→20、cross-domain 5→6、總頁數 100→102 |

### 為什麼這樣分

- **shuangyun/cases/木酢寵物達人.md**：客戶專屬內容（這個品牌的數字、UI、團隊）
- **cross-domain/數據儀表板平台建置指南.md**：去個人化 SOP，下次幫別的客戶做平台直接複用
- **ailab/log/2026-05-07**：Jacky 工具觀的活知識（Tool Use 升級的決策過程、產品定位翻轉的洞察）

> **三層分流**符合 wiki schema：客戶（shuangyun）= 專屬、跨域（cross-domain）= 去個人化、ailab = 個人實踐視角。

### 同步產出（在 muzopet-dashboard 專案內，非 wiki）

- `muzopet-dashboard/USAGE.md`：團隊使用簡要說明（給非技術團隊成員）
- `muzopet-dashboard/CLAUDE.md`：補上 v2.0 上線狀態 + Zeabur 部署資訊

### 不入 wiki

- 程式碼細節（已在 GitHub repo）
- README.md（已在 muzopet-dashboard 內，重複了）
- 環境變數值（敏感）

---

## 2026-05-05

**主題**：木酢寵物達人客戶案例 ingest + Q1 2026 P&L 修正

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 木酢寵物達人 | `wiki/shuangyun/cases/木酢寵物達人.md` | 双云客戶案例：SOSTAC 框架、Q1 P&L、GA 流量 ROI、會員漏斗、50 萬月目標策略 |

### 決策

- **歸域**：`shuangyun/cases/`——是双云行銷客戶，以 SOSTAC 框架分析，符合 cases 定義
- **内容取捨**：完整收錄 SOSTAC 六層、Q1 三個月 P&L 表（含官網/蝦皮收益拆分）、GA sessions/收益 ROI 對比、會員四層漏斗、TOP 10 商品排名、TOP 5 LINE 活動。試算表原始公式修正細節不入 wiki（技術操作不屬知識體）
- **P&L 公式透明**：保留計算公式（`((U−X)×0.4＋2萬)/1.05−S`），方便日後複用
- **文件路徑連結**：保留 OneDrive 資料夾路徑與 dashboard.html 路徑，作為追源索引
- **不入 wiki**：Excel 逐格修正細節、每日收益原始數字（→ 留在 OneDrive 試算表）

### 同步修正

- 2026 日收益表 xlsx：修正 1-3 月共 10 個公式 bug（SUM 範圍差一、3月漏 10,725 TWD）
- Dashboard `dashboard.html`：新增 `#pl2026` 區段（Q1 P&L 表、費用/利潤雙長條圖、6 KPI 卡）

### 頁數更新

99 → 100（shuangyun cases 2 → 3）

---

## 2026-05-04

**主題**：建立知識圖譜建置教育訓練材料（手冊 + HTML 簡報）

### 新增頁面

| 頁面 | 路徑 | 說明 |
|---|---|---|
| 知識圖譜建置手冊 | `wiki/wiki知識圖譜建置手冊.md` | 完整建置方法論文件（6 步驟 + 行動路徑 + 常見陷阱）|
| 知識圖譜建置簡報 | `wiki/wiki知識圖譜建置簡報.html` | 13 頁互動式 HTML 簡報（支援鍵盤左右鍵）|

### 決策

- **內容焦點**：以 Jacky Wiki 為案例，教「如何建立自己的知識圖譜 wiki」（方法論）——而非介紹 Jacky Wiki 本身（那是 `團隊分享.md` 的工作）
- **簡報格式**：HTML 互動式（支援鍵盤導航），不需要 Marp 或 PowerPoint，可直接用瀏覽器打開做教育訓練
- **手冊格式**：Markdown 知識文件，可入 wiki，也可貼給任何 AI 當參考素材
- **核心訊息**：三層萃取漏斗 + 實踐捕手協定 + 前傳↔現況雙向連結三個核心概念

### 頁數更新

97 → 99（新增 2 頁）

---

## 2026-05-02

**主題**：建立 jacky-omnimind Skill——全人統整層，位於 jackybraincommander 之上。

### 決策

新建 Cowork Skill `jacky-omnimind`（.skill 檔案存於 wiki 根目錄），定位為 Jacky AI 生態系的「靈魂層」：

- **層級**：soul layer，高於 jackybraincommander（路由層）
- **功能**：不只路由，而是能跨域合成洞察、回答「Jacky 是誰」、導覽 wiki 全域結構、處理跨三域以上的複雜問題
- **觸發條件**：跨域整合視角、jlife 人生敘事、wiki 更新、問 Skill 生態系、問全人觀

### 架構

```
SKILL.md（主體）
└── references/
    ├── knowledge-graph.md   ← 完整域拓樸（92頁、7域、目錄結構、雙向關聯）
    ├── jacky-identity.md    ← 六個身分階段、六句回望、隱私邊界
    ├── domain-summaries.md  ← 各域摘要（在做什麼、核心邏輯、域間連結）
    └── skill-ecosystem.md   ← 完整 Skill 生態系地圖（含路由仲裁規則）
```

### 判斷理由

- jackybraincommander 只做路由，無法回答「Jacky 的全貌是什麼」這類跨域整合問題
- wiki 有 92 頁跨 7 個域，需要一個「知道所有域、能合成洞察」的頂層 Skill
- reference 分四個文件、按需讀取，避免每次全讀 92 頁的 token 浪費

### 當前用法

| 觸發情境 | 典型提示詞 |
|---|---|
| 問 Jacky 身分與人生觀 | 「Jacky 是誰」「六個身分階段」「幫我回顧全貌」 |
| 跨域整合問答 | 「双云跟 TBSA 有什麼關係」「ailab 怎麼跟 jwood 連」 |
| Wiki 導覽與更新 | 「wiki 裡有什麼」「這個要放哪個域」「幫我更新 wiki」 |
| Skill 生態系查詢 | 「有哪些 Skill」「某個 Skill 做什麼」「路由邏輯是什麼」 |
| 全局性決策 | 「我下一步應該怎麼做」（涉及多個身分） |

### 與 jackybraincommander 的邊界

| | jacky-omnimind | jackybraincommander |
|---|---|---|
| 定位 | 靈魂層（理解整體） | 路由層（分派任務） |
| 知識 | 完整 wiki 知識圖譜 | 路由表 + 業務域背景 |
| 能做 | 跨域洞察、身分整合、wiki 更新 | 模糊需求釐清、單一路由 |
| 路由 | 任務明確時直接到 Skill | 任務模糊時到自己再分派 |

### 同步

- `jacky-omnimind.skill` 已建立於 wiki 根目錄（17K）
- ailab/log 同步新增里程碑：`2026-05-02_jacky-omnimind.md`

---

## 2026-05-01

**主題**：双云 AI 行銷部平台架構決策——多品牌獨立應用 + 中控台。

### 決策

新增 `shuangyun/concepts/多品牌獨立應用架構.md`，記錄 Jacky 對 2clouds-agents 平台的上位架構要求：

- 双云 AI 行銷部是 Command Center，不是把所有品牌資料塞在一起的大工作區。
- 每個甲方品牌都應是可獨立運作的 Brand App。
- 每個 Brand App 需要獨立品牌腦、任務、review、trace、營收訊號、品牌 skill / prompt context。
- 每個成員需要自己的獨立工作環境與權限範圍。
- 品牌間要維持機密隔離，但能透過双云中控進行協作、調度與品管。

### 判斷理由

這個決策延伸自 `AI行銷部定義.md` 的「每個客戶一套 4 Agent 委員會」；平台化後必須進一步明確 `brandId`、member scope、skill / prompt boundary，避免品牌資料互相污染。

### 同步

- 更新 `shuangyun/双云索引.md`，加入新概念頁。
- 更新 `wiki主索引.md` 的 shuangyun 頁面數與 concepts 頁面數。
- 專案 `2clouds-agents` 同步新增 `docs/multi-brand-app-architecture.md`，作為工程實作方向。

## 2026-04-29

**主題**：双云域首次大規模 ingest——把 OneDrive `双云AI轉型教育訓練/` 的核心素材搬進 wiki。

### 背景

在此之前，wiki 只有 7 個頁面（[wiki主索引.md](wiki主索引.md)、5 個域的索引頁、跨域 賣點命名理論、shuangyun 兩個 cases 與 1 個 sop）。今天決定優先處理 ⭐ 双云域，因為它是最高優先域且素材最豐富。

OneDrive `双云AI轉型教育訓練/` 共約 2000 多個檔案，無法全部搬入。先掃 inventory（[第一次 ls](#)），再分批處理：選擇「方法論密度高、可長期使用」的頁面進 wiki，「進度追蹤、ephemeral 任務狀態」留在 OneDrive。

---

### 批次 1｜首批 ingest（commit d458aac）

| 來源 | 處理結果 |
|---|---|
| `AGENTS.md`（OneDrive 根目錄，原 Codex Instructions） | → `concepts/AGENTS方法論落地.md`（双云專案落地總覽，採 SOSTAC 結構重組） |
| `03_團隊操作指南/`（2 個檔） | → `concepts/AI行銷部定義.md`（合併「定義文件 v1」+「操作全指南 v1.0」，分為 11 個 Part） |
| `02_課程架構與教案/`（10 個檔） | → `courses/{week2,week3,week4,week5}.md` + `courses/課程總覽.md` + `concepts/AI備課流程.md`（meta 備課流程獨立） |

**版本選擇**

- Week 3：v1/v2/v3 並存 → 採 v3（新增交叉測試 + 醫美加碼）
- Week 4：v1/v2/v3 並存 → 採 v3（新增 Skill 管理系統 + 架構師認同）
- Week 5：v1（API 串接版）+ v2（AI 行銷部 v3）→ **採 AI 行銷部 v3**，並在頁面注記為何放棄 v1 技術路線
- Week 1：OneDrive 沒有獨立教案，標為「尚未整理」

**設計決策**：每個 Week 頁面只放教案核心，方法論細節（流程拆解 6 維度、9 區塊、3 色情境、3 種協作）一律連回 `AGENTS方法論落地.md`，不重複。

---

### 批次 2｜AGENTS 知識體系（commit bd65e13 含）

| 來源 | 處理結果 |
|---|---|
| `11_AGENTS_知識體系/01_AGENTS方法論_知識體系全書.md`（v1.0 / 731 行） | → `concepts/AGENTS知識體系.md`（六字訣 / 三級認證 / 三場景部署 / 與 SOSTAC + SPEAKS 整合圖） |
| `11_AGENTS_知識體系/02_AGENTS認證考核手冊.md`（v1.0 / 392 行） | → `concepts/AGENTS認證手冊.md`（L1/L2/L3 評分表，濃縮為緊湊表格） |

**處理 namespace 衝突**：原 `AGENTS方法論落地.md`（從 OneDrive 根 AGENTS.md 整理）容易跟「AGENTS® 方法論」混淆。處理方式：不改檔名、不破壞既有連結，在原頁頂加分流註記，明確指向兩個新頁。

**未搬入**（原始素材保留 OneDrive）：

- `03_AGENTS方法論內部提案簡報.pptx`（14 張）
- `AGENTS_知識體系架構圖.html`（互動式視覺化）
- `AGENTS知識體系_通用版/`（對外授課版本）— 與內部版同源，wiki 用內部版，通用版的存在在 `AGENTS知識體系.md` 底部註記

---

### 批次 3｜Skills 層（commit bd65e13）

| 來源 | 處理結果 |
|---|---|
| `06_Skills/`（22 個 Skill，含 7 個頂層 + Skill OS 8 個 + 双云技能包 14 個） | → `skills/`（13 頁涵蓋全部適合放 wiki 的 Skill） |

**判斷標準（用戶要求 judge）**

| 決策 | 對象 | 理由 |
|---|---|---|
| ✅ 獨立頁（8 個） | 5 助教（scoring/completion-coach/config-converter/wisdom-merger/progress-tracker）+ api-gateway + jacky-agent + jie-an-liu-cheng + cruelty-test | 課程／業務核心，每個都有獨立教學價值 |
| ✅ 集成頁（3 個） | Skill OS 8 個 → `SkillOS系統.md`；自動化 4 個 → `自動化流程.md`；客戶模板 3 個 → `品牌模板.md` | 緊密耦合的子系統，個別檔案太薄、合在一頁更好用 |
| ❌ 不放 wiki/shuangyun/ | jackybraincommander/control、jacky-question-master、tbsa-jacky-agent、tbsa-sostac-planner | 跨域或他域，僅在 `skills/双云技能索引.md` 註記 + 觸發區分原則 |
| ❌ 不重複放 | `agents-methodology.skill`（11_AGENTS_知識體系/） | 方法論本身已在 `concepts/AGENTS知識體系.md` |

**設計決策**

- 每頁結構統一：定位 → 觸發條件 → 執行流程 → 判斷邏輯 → 邊界 → KPI → 相關連結
- 雙向交叉連結：上下游 Skill 互相 link、連回 `concepts/`、連回 `courses/`
- 5 助教頁特別保留 SKILL.md 裡的關鍵警語（例 scoring-agent 的 Word 表格雙軌讀取血淚教訓）
- 三段式命名（`{domain}.{layer}.{verb-output}`）和三層架構（Brain / Hand / Infra）作為索引主軸

---

### 今日成果統計

| 類別 | 數量 |
|---|---|
| 新增頁面 | 20 個（concepts +5、courses +5、skills +13、courses/index +1，扣除 cross-counted） |
| 修改頁面 | 2 個（`shuangyun/双云索引.md`、`AGENTS方法論落地.md` 加分流註記） |
| 涵蓋原始 Skill 數 | 22 個 |
| 累計文字量 | ~181 KB Markdown |
| Commits | 2（`d458aac`、`bd65e13`） |

### Wiki 整體頁面數變化

| 時間點 | 頁面數 |
|---|---|
| 初始（2026-04-28 init） | 7 頁 |
| 批次 1 後 | 15 頁 |
| 批次 2-3 後（今日結束） | **30 頁** |

---

### 待處理（OneDrive 已掃過但未搬入 wiki）

按 [批次 0 評估](#) 順序：

1. **04_助教Agent設定檔/**（5 個 md）— 助教 Agent 課堂用設定，可選擇性整合
2. **05_實作上傳/**（172 檔）— 學員作業，主要是 ephemeral 不適合進 wiki
3. **07_殘酷測試素材/**（623 檔）— 三色題庫，方法論層面已在 `個人化殘酷測試.md` 提及，題庫本身不進 wiki
4. **08_Agent工廠API互控_落地執行手冊.docx**（待解析評估）
5. **09_双云Agent應用 / 12_KOL_AI_AGENT / V2_AI_AGENT_2lcouds**（程式碼專案，不進 wiki，必要時摘設計理念）
6. **13_客戶Agents_20260421/母親節貼文_8品牌_v1.md**（客戶實戰素材）
7. **14_入口網頁工作坊/**（HTML + 截圖，視覺類）

---

### 工作準則確認（從本次 ingest 提煉）

1. **方法論集中於 `concepts/`，課程教案在 `courses/`，可呼叫單元在 `skills/`** — 三者不重複，靠交叉連結串接
2. **版本選擇取最新**（v3 > v2 > v1），但保留 v1/v2 的設計演進注記在頁面內
3. **Ephemeral 內容（待辦清單、進度勾選、團隊個別狀態）不進 wiki**——這些屬專案管理而非知識體
4. **個人隱私 / 家人細節不放 wiki**（CLAUDE.md 既有規則，本次無觸發）
5. **跨域 Skill 不放 shuangyun，只在 index 註記**——避免域邊界模糊
6. **原始素材路徑（OneDrive 完整路徑）保留在每頁 frontmatter 下方**——便於日後追源

---

## 2026-04-30

**主題**：方法論敘事大修正 + TBSA 5 大表單建立 + 內部團隊分享文件

### 批次 1｜方法論敘事三輪修正

| 輪 | 修正 | commit |
|---|---|---|
| 1 | SPEAKS / AGENTS 創作敘事（從「Jacky × Claude 共創」「Jacky × Zoe 共建」「双云首創」改為「Jacky 主筆」） | a79d43c |
| 2 | SOSTAC 「14 年弧線／整合者」改為 **20 年三段身分**（學習者 → 實踐者 → 倡議者） | af36987 |
| 3 | IP 治理結構（方法論內核 vs 商標品牌分開）：SOSTAC 國際 / SPEAKS Zoe 公司 / AGENTS 双云行銷；TBSA 都是被授權方 | （在 1+2 中） |

> 此次修正源於 Jacky 對敘事精確性的高要求——已寫入 [memory/feedback-narrative-precision.md](../../.claude/projects/C--Users-gjj22-jacky-wiki/memory/feedback-narrative-precision.md)。

### 批次 2｜TBSA 5 大表單（commit 56f3b0e）

| 來源 | 處理結果 |
|---|---|
| `OneDrive/TBSA知識體系/TBSA企劃工具表單欄位說明_2025.pptx` | → `tbsa/templates/` 6 頁 |
| 兩本 TBSA 教材（初階洪敏莉 / 進階鄭沂珊） | 已在 4-29 整理完，本次補上附錄三的 5 大表單實作工具 |

**新增頁面**

- 五大表單總覽（流程圖 + 依賴關係 + SOSTAC 對應 + SPEAKS 對應）
- 表單 1：企劃情報／概念分析（PESTEL + 產業 + 競爭 + 消費者 + 內部）
- 表單 2：現況分析與策略目標設定（SWOT 矩陣 + SMART 目標 + 對策）
- 表單 3：STP 市場策略設計（區隔 → 目標 → 定位）
- 表單 4：行銷戰術及溝通活動設計（7Ps + AIDAS）
- 表單 5：一頁企劃書（全 SOSTAC 收束）

### 批次 3｜內部團隊分享文件 + 簡報

- `wiki/團隊分享.md`：給双云夥伴／TBSA 學員的 wiki 介紹文件
- `wiki/團隊分享簡報.md`：Marp 格式簡報（可直接 export PPTX）

### 批次 4｜Memory 系統建立

從零建立 6 份 memory + 1 份索引，涵蓋：
- 用戶身分（jacky-profile）
- 三套方法論 IP 治理（methodology-ip）
- wiki 結構（wiki-structure）
- 敘事精確性偏好（feedback-narrative-precision）
- 直接行動偏好（feedback-direct-action）
- OneDrive 來源路徑（reference-onedrive-paths）

> 目的：未來新對話可從 memory 快速 onboarding，不需重新解釋背景。

### 今日成果統計

| 項目 | 數量 |
|---|---|
| 新增頁面 | 8 個（5 表單 + 總覽 + 團隊分享 + 簡報） |
| 修改頁面 | 約 12 個（敘事修正涉及多檔） |
| 總頁面數變化 | 61 → **69**（含團隊分享 2 頁） |
| Memory 檔案 | 7 個（含索引） |
| Commits | 3 個（a79d43c / af36987 / 56f3b0e） |

### Wiki 整體頁面數變化

| 時間點 | 頁面數 |
|---|---|
| 2026-04-29 結束 | 61 頁 |
| 2026-04-30（早） | 69 頁 |
| **2026-04-30（晚 — NCHU + cross-domain 升版第一批） | **74 頁** |

### 已建立的呼叫機制（待補強）

- ✅ Claude Code 對話自動讀 CLAUDE.md（已運作）
- ✅ Memory 持久化（本次新增）
- 🔲 快查表（情境 → 路由）— 待建
- 🔲 `jacky-wiki-router` Skill — 最強的呼叫方式，待建
- 🔲 對外部署（Zeabur 給夥伴／客戶看）— 待評估

---

## 2026-04-30（晚）

**主題**：NCHU 博士班場景倒灌進 wiki + AGENTS v1.1 升版第一批（cross-domain 三新頁）

### 觸發

Jacky 提出「把中興博士班加入 wiki，你可能會更完整理解我的 AGENT 用法」。派 4 路 Explore subagent 偵察後發現，wiki 的 nchu 域 3 頁是骨架，**真實實踐遠超記錄**：

1. 博二（不是博一）；研究主題已定（森林數位孿生 / 葉綠素螢光 / 衛星遙測 / AI）
2. 共指朱彥煒老師（基資所，演算法／ML）
3. 第三次專討題目定案（2026-04-28）：**森林數位孿生作為下一世代地上生物量與碳儲量估算技術**，2026-05-13 上場
4. 6 個規劃 Skill 中**只有 1 個（seminar-helper）真正實作**——wiki 寫得過度樂觀
5. 73% 作者名幻覺事故（2026-03-12，26 檔 19 錯）已用 script_viewer + 人工修正
6. **入口導覽頁 + script_viewer + 工作方法筆記**三個跨域工具——之前 wiki 完全沒收

### 批次 1｜cross-domain 三新頁（這次）

| 新頁 | 用途 | 萃取自 |
|---|---|---|
| [入口導覽頁 SOP](cross-domain/入口導覽頁SOP.md) | 每個專案完成後產 `index.html` 收束分散產出 | 6 實例（双云架構圖 / 通用版 / 教育訓練入口 / Jwood Brand 3 份 / NCHU 博二專討 / 3D 知識圖）|
| [來源控制與 script_viewer 模式](cross-domain/來源控制與script_viewer模式.md) | AGENTS E 階段事前品管雙軌 | NCHU 博二 `script_viewer.html`（左講稿 70% + 右文獻 30%，14 篇白名單，cite tooltip）|
| [Commander+Executor 單人多 Agent 模式](cross-domain/Commander+Executor單人多Agent模式.md) | AGENTS N 階段三協作模式的單人 CLI 版 | NCHU 博二 `工作方法筆記.md`（2026-04-22）|

### 批次 2｜nchu 修訂兩頁

| 頁面 | 修正 |
|---|---|
| [中興博士索引](nchu/中興博士索引.md) | 博一 → 博二；補朱彥煒共指；補研究方向；補 2026-04-28 題目定案；隱私邊界（中庸版）；新增「跨域貢獻」表 |
| [學術 Skill 體系](nchu/concepts/學術Skill體系.md) | 誠實版：6 規劃 + 1 已實作（seminar-helper）；補實作優先順序；建議新增 `nchu-advisor-zhu` |

### 批次 3｜索引同步

- `wiki主索引.md`：69 → 74，補 cross-domain 5 頁清單
- `cross-domain/跨域索引.md`：補三新頁 + 視覺化專案區（3D 知識圖）

### 對 AGENTS v1.1 的衝擊（待動筆）

NCHU 場景貢獻 6 個 v1.0 沒涵蓋的維度：

1. 入口導覽頁範式（→ N 階段「Agent 產出視覺化整合」章節）
2. script_viewer 來源控制（→ E 階段「事前品管 vs 事後測試」雙軌）
3. Commander+Executor（→ N 階段三協作模式補單人 CLI 版）
4. 9 階段倒推時程（→ T 階段「倒推 vs 排程」雙模式）
5. 零幻覺 + 單一資料來源（→ E 階段紀律章節）
6. Brain 層代理人模型（→ N 階段「代理人型 Agent」獨立分類）

### 第二批｜nchu 三新頁（接續完成）

| 新頁 | 用途 | 萃取自 |
|---|---|---|
| [9 階段專討工作流](nchu/concepts/9階段專討工作流.md) | seminar-helper 方法論升格、AGENTS 學術版（D-60 → D-day 倒推時程）| `~/.claude/skills/seminar-helper/SKILL.md` |
| [零幻覺與文獻查證 SOP](nchu/concepts/零幻覺與文獻查證SOP.md) | 73% 作者名幻覺事故 + 八項紀律 + 雙軌品管 | 2026-03-12 真實事故 |
| [第三次專討 — 森林數位孿生](nchu/cases/第三次專討.md) | 結構摘要（隱私邊界 B 中庸版）| 博二專討資料夾完整成品集 |

### 第二批｜雙向連結

- `jlife/AI與博士_2023-2026.md` 補：博二、共指朱彥煒、第三次專討題目定案、73% 幻覺事故、Commander+Executor 模式
- `wiki主索引.md`：nchu 域 3 → 6 頁，補完整目錄結構（concepts 4 + cases 1）
- 總頁數 74 → **77**（含本批增加的 nchu 三頁）

### 隱私邊界決策（這次拍板）

採 **B 中庸版**：
- ✅ 可入：研究方向、專討題目、研究主題、跨域工具鏈、9 階段工作流方法論、73% 幻覺事故修正流程
- ❌ 不入：未發表研究結果、實驗數據、論文初稿、與老師私下討論、農業部科專計畫（該案沒有進行）

### 對 AGENTS v1.1 的衝擊（待動筆 v1.1 升版）

NCHU 場景貢獻 6 個 v1.0 沒涵蓋的維度（已記錄在新增頁面中，待整合進 AGENTS 知識體系 v1.1）：

1. **入口導覽頁範式** → N 階段「Agent 產出視覺化整合」章節（[入口導覽頁 SOP](cross-domain/入口導覽頁SOP.md)）
2. **script_viewer 來源控制** → E 階段「事前品管 vs 事後測試」雙軌（[來源控制 viewer](cross-domain/來源控制與script_viewer模式.md)）
3. **Commander+Executor** → N 階段三協作模式補單人 CLI 版（[Commander+Executor](cross-domain/Commander+Executor單人多Agent模式.md)）
4. **9 階段倒推時程** → T 階段「倒推 vs 排程」雙模式（[9 階段專討工作流](nchu/concepts/9階段專討工作流.md)）
5. **零幻覺 + 單一資料來源** → E 階段紀律章節（[零幻覺與文獻查證 SOP](nchu/concepts/零幻覺與文獻查證SOP.md)）
6. **Brain 層代理人模型**（模擬指導教授）→ N 階段「代理人型 Agent」獨立分類（[學術 Skill 體系](nchu/concepts/學術Skill體系.md)）

### 第三批｜AGENTS v1.1 草案產出 + **方法論修正：草案不入 wiki**

接續第二批 NCHU 升版後，把三實踐場（双云団隊 / Jwood 多模態 / NCHU 單人深度）反推的 12 個新元素整合進 AGENTS 方法論本身。

#### 📌 重要方法論教訓（這次學到）

最初將 `AGENTS知識體系_v1.1草案.md` 直接寫入 `wiki/shuangyun/concepts/`。Jacky 即時更正：

> **wiki 是已確認知識的整理；草案／進行中／未拍板的版本應在 OneDrive 等待，等穩定後才 ingest 進 wiki。**

**修正動作**：
- v1.1 草案檔案移至 OneDrive：`双云AI轉型教育訓練/11_AGENTS_知識體系/04_AGENTS方法論_v1.1草案.md`
- 撤回 wiki 中 `双云索引.md` 與 `wiki主索引.md` 對草案的引用（草案不算 wiki 頁面）
- 此原則寫入 memory `feedback-wiki-stable-only.md`，避免再犯

#### v1.1 草案內容（在 OneDrive，568 行）

**v1.0 → v1.1 12 個新元素整合位置**：

| # | 新元素 | 來源 | 整合位置 |
|---|---|---|---|
| 1 | 訪談式拆解（人物 → Brain Skill）| NCHU + 双云 | A 階段補章節 |
| 2 | 多模態 Agent 設計（圖／音／影 + 設定檔即劇本）| Jwood | G 階段補章節 |
| 3 | 單一資料來源紀律 | NCHU 73% 幻覺 | G 階段補章節 |
| 4 | 產出固化原則 | NCHU 導讀 PPTX | G 階段補章節 |
| 5 | 雙軌品管（事前可追溯性 + 事後殘酷測試）| NCHU 73% 幻覺 | **E 階段重大改動** |
| 6 | 第 4 協作模式：Brain 共享 + Series 並行 | Jwood Series A/B/C/D | N 階段第 4 模式 |
| 7 | AI 行銷部四角色組織模型 | 双云 Week 5 v2 | N 階段升格章節 |
| 8 | 入口導覽頁範式 | 6 實例 | N 階段補章節 |
| 9 | Brain 層代理人模型 | NCHU + 双云 | N 階段補章節 |
| 10 | Commander + Executor（單人 CLI）| NCHU 工作方法筆記 | N 階段補單人 CLI 版 |
| 11 | 倒推時程編排（vs 排程）| NCHU 9 階段 | T 階段補章節 |
| 12 | 金錢型 KPI（vs 數量型）| Jwood NT$10 萬/月 | T 階段補章節 |

**結構變動**：
- 三場景 → 四場景（補 Brand Agent 工廠交付）+ 潛在第五場景（學術研究者）
- 新章節 §7 Skill 治理分層（Brain / OS / Apps / Templates / Customer 五層）
- 第四個不變原則：「可追溯先於可生成」
- 名詞速查補 11 個術語

**草案 vs 正式版策略（修正後）**：
- v1.0 完整保留在 wiki（避免破壞現有連結）
- v1.1 草案在 **OneDrive** `11_AGENTS_知識體系/04_AGENTS方法論_v1.1草案.md`
- review 通過後才覆寫 v1.0（屆時 ingest 進 wiki + 更新所有 backlinks）
- wiki 內只在 `双云索引.md` concepts 段落加 🚧 註記指向 OneDrive 草案

### 第一+二+三批 今日合計

| 項目 | 數量 |
|---|---|
| Wiki 新增頁面 | 6（cross-domain 3 + nchu 3）|
| Wiki 修訂頁面 | 6（含双云索引 🚧 註記、wiki主索引、log）|
| Wiki 頁面數 | 69 → **77** |
| OneDrive 新增 | 1 份 v1.1 草案（不算 wiki 頁）|
| Commits | 第一+二批已 commit（68f25f1, de072d4）；第三批 wiki 修正待 commit |
| Push | hook 阻擋，等 Jacky 處理 |

### 今日成果統計（晚批）

| 項目 | 數量 |
|---|---|
| 新增頁面 | 3 個（cross-domain）|
| 修訂頁面 | 4 個（中興博士索引 / 學術 Skill 體系 / 跨域索引 / wiki主索引）|
| 涉及 commit | 待提交 |

## 2026-04-30｜2clouds-agents 專案啟動：双云 AI 行銷部訓練與營運平台

### 背景

Jacky 提出：因應新一批新人即將入職，原本「先教育訓練、再上手服務」的方式過時。新的導入邏輯應改為：

> 平台本身就是新人訓練系統。新人透過操作平台，使用 Jacky 的腦、成員的腦、客戶品牌腦與品管回饋，在可控範圍內成為 60 分以上的數位行銷服務者。

後續補充拍板：方法論仍然必要，但不應只放在課程裡，而是要散布到各個工作節點。當成員不知道如何決策或回應客戶時，Jacky 可以透過 wiki 知識圖譜與思考模型跳出來，引導成員做出最佳決策與反應。

### 專案建立

| 項目 | 內容 |
|---|---|
| 專案資料夾 | `/home/jacky/2clouds-agents` |
| GitHub repo | `https://github.com/gjj22622/2clouds-agents` |
| 初始 commit | `247bc8e docs: initialize 2clouds agents platform spec` |
| repo visibility | Public |
| 預設分支 | `main` |

### 已整理文件

| 檔案 | 用途 |
|---|---|
| `README.md` | 專案定位、核心公式、文件入口 |
| `docs/platform-spec.md` | 平台總規格：新人 cockpit、營運模式、角色、路由 |
| `docs/onboarding-training-system.md` | 新人導入訓練系統與 60 分數位行銷服務者標準 |
| `docs/jacky-decision-layer.md` | Jacky 知識圖譜、決策層、方法論節點與 Decision Panel |
| `docs/modules.md` | 功能模組：腦袋資料庫、品牌工作台、內容工廠、品管、Skill OS 等 |
| `docs/mvp-roadmap.md` | Phase 1-4 MVP 路線圖 |
| `docs/source-context.md` | 本 Spec 依據的 jacky-wiki 双云來源頁 |

### 產品定位決策

本專案不是一般 CRM，也不是單純 LMS，而是三合一：

1. 新人導入訓練系統
2. 双云營運管理平台
3. AI 行銷服務交付系統

核心公式：

```text
新人能力
+ Jacky 知識圖譜
+ 成員腦
+ 品牌腦
+ 方法論節點
+ 品管回饋
= 可交付的 60 分數位行銷服務者
```

### 方法論嵌入原則

- 方法論不能被拿掉；要從「課程內容」變成「平台判斷引擎」。
- Jacky 知識體系要散布在客戶導入、品牌工作台、內容工廠、品管中心、新人訓練場、Skill OS 等節點。
- 成員卡住時可呼叫 `問 Jacky` / `用 Jacky 模型判斷`。
- Jacky Decision Layer 回應時不只給答案，而要提供：問題重述、對應知識節點、思考模型、建議決策、可直接使用的回應草稿。
- 新人的訓練重點不是背知識，而是會查腦、會用腦、會被品管修正、會升級問題。

### Wiki 更新判斷

- 本次建立的是外部產品專案 repo，未新增 wiki 知識頁，因此不更新 `wiki/wiki主索引.md` 頁面數。
- 本次屬於双云域方法論與產品化延伸，先記錄在 `wiki/log.md`；後續若專案規格穩定，可再整理成 `shuangyun/concepts/` 或 `cross-domain/` 的正式頁。

---

## 2026-05-02

**主題**：新建 ailab 域（AI 實踐）+ 跨模型實踐捕手協定 + `/ailab` Skill

### 觸發

Jacky 提出「在 wiki 裡新增『AI 學習路徑』域，內容來自各專案知識文件 + 每次 session 對話 + 每天 AI 嘗試」。

### 規劃階段拍板

| 拍板項 | 結果 |
|---|---|
| 域代碼 | `ailab` |
| 中文名 | **AI 實踐**（不是「學習路徑」——強調動手而非時間軸）|
| 優先級 | ⭐ 優先域（與 shuangyun、jwood 同級）|
| 升格機制 | **無時間門檻、依事件升格**（Jacky 偏好，反機械化）|
| session 萃取頻率 | **有事件就升格**（不固定每月 review）|
| 執行方式 | 一次到位（4 波 + Skill）|

### 域定位（劃清邊界）

| 域 | 處理什麼 |
|---|---|
| jlife/AI與博士 | **歷程**——時間軸、心境變化、跨域影響 |
| shuangyun/AGENTS | **結晶方法論**——已固化、可教學、可認證 |
| cross-domain | **共用模式**——多場景重複出現的規律（去個人化）|
| **ailab（新）** | **活知識**——個人視角的工具觀／方法觀／演化觀，每天累積 |

### 批次 1｜骨架（Wave 1）

- 建 `wiki/ailab/` 7 個子目錄（concepts / tools / patterns / experiments / log / reading / inbox）
- 寫 `wiki/ailab/AI實踐索引.md`（域首頁，含跨域連結 5 條、輸入規則、工具棧速查）
- 更新 `CLAUDE.md`：域表 +1（**6 個域 + 1 跨域 + 1 待建**）、拓樸圖 +4 條 ailab 線、新增「ailab 域寫作原則」段
- 更新 `wiki/wiki主索引.md`：域表 +1、拓樸圖 +4 條、新增 ailab 結構樹

### 批次 2｜首批 15 + 1 頁內容（Wave 2）

| 子目錄 | 頁面 | 重點 |
|---|---|---|
| concepts/ | 實踐捕手協定.md | ⭐ **跨模型協定 v1.0**（9 欄位 / 6 type / 4 maturity）|
| concepts/ | 三層萃取漏斗.md | inbox → experiments → patterns/tools/concepts，依事件升格 |
| concepts/ | 演化元方法.md | 從 v1.0→v1.1 萃取的四條元規則 |
| concepts/ | AI工具觀.md | 三條工具選擇原則 + 當前工具棧 + 換工具邏輯 |
| concepts/ | 學習方法.md | 學新模型/新工具的 48h-2w-1m 三階段 SOP |
| tools/ | 工具棧索引.md | 主表 15 項 + 角色分層 + 月度健康檢查 |
| tools/ | claude-code.md | Skills/Hooks/Plugins/Subagents/Auto-memory 用法 |
| tools/ | codex-cli.md | 跟 Claude Code 互補的場景 |
| tools/ | mcp-servers.md | Gmail/Drive/Calendar/Canva/Gamma 心得 |
| tools/ | 模型選擇心法.md | 任務 → 模型主對照表 + 1M ctx 正確用法 |
| tools/ | auto-memory系統.md | 4 類型 memory + 何時 save / 不 save |
| patterns/ | 模式索引.md | 連結到 cross-domain / nchu / jwood，**不複製內容** |
| experiments/ | 2026-Q2實驗清單.md | 5 個進行中 + 4 個候選 |
| log/ | 2026-04_AGENTS_v1.0→v1.1.md | 12 元素 + 4 次 Jacky 介入 + v1.2 候選 |
| reading/ | 閱讀索引.md | 模板（待補實際內容）|
| inbox/ | README.md | inbox 規則與升格邏輯 |

### 批次 3｜反向連結（Wave 3）

4 個既有頁加 ailab 連結段：
- `jlife/stages/AI與博士_2023-2026.md`：補「對應 ailab 域」表（歷程→方法）
- `shuangyun/concepts/AGENTS知識體系.md`：補「ailab 域：方法論的活知識前台」段（結晶 ↔ 活知識）
- `nchu/concepts/AI重組學術根基.md`：補「對應 ailab 域」表（學術應用 ↔ 工具心得）
- `cross-domain/跨域索引.md`：補「與 ailab 域的關係」段（廚房 ↔ 菜譜）

### 批次 4｜跨模型實踐捕手協定 + `/ailab` Skill（Wave 4）

#### 設計核心：協定 + Skill 雙生

> **協定本身模型無關**——不管 Claude Code / Codex CLI / ChatGPT / Gemini / 未來模型，都能輸出符合 9 欄位的事件紀錄。
> Claude Code 內 `/ailab` Skill 自動讀協定，無縫整合。

#### 三種使用情境

| 情境 | 落點 | 進入門檻 |
|---|---|---|
| Claude Code 內 | `/ailab capture <一句話>` → `wiki/ailab/inbox/` | 最低 |
| 其他 AI（含手機）| 複製協定 prompt → AI 輸出 → 貼到 OneDrive/ailab-inbox/ | 中 |
| 極簡手機記 | 三行格式 → `OneDrive/ailab-inbox/raw.md` → 之後 `/ailab sync` 補完 | 最低 |

#### Skill 子指令

`/ailab capture` `/ailab inbox` `/ailab promote` `/ailab tools` `/ailab patterns` `/ailab log` `/ailab sync`

#### 檔案

- `~/.claude/skills/ailab/SKILL.md`（Claude Code Skill 定義）
- `wiki/ailab/concepts/實踐捕手協定.md`（協定本體，模型無關）
- `wiki/ailab/inbox/README.md`（inbox 規則）
- OneDrive 中繼站：`C:\Users\gjj22\OneDrive\ailab-inbox\`（首次使用時建立）

### 設計決策（這次學到 / 確立）

| 決策 | 為什麼 |
|---|---|
| 域名「AI 實踐」非「AI 學習路徑」| 強調動手結晶層，避免變日記／時間軸 |
| ⭐ 優先域而非次要 | 是工作核心面、每天更新、跟 shuangyun/jwood 同級 |
| 無時間門檻、依事件升格 | Jacky 偏好「不機械化」、事件本身會說話 |
| patterns/ 只放連結 | 共用 SOP 在 cross-domain，個人視角才在 ailab |
| 協定模型無關 | 解決「跨模型／跨對話」的記錄痛點 |
| Skill + 協定雙生 | 不綁死 Claude Code，未來換工具也能搬 |
| inbox 在 wiki 內 | 方便 commit；OneDrive inbox 處理「Claude Code 不在身邊」場景 |
| 不寫機械化 30 天閘門 | 不同實驗節奏不同（Series A/B/C/D 跑半年都正常）|

### 跨域連結網路（最終狀態）

```
新增 4 條 ailab 雙向連結：
  ailab ↔ shuangyun（活知識 ↔ 結晶方法論）
  ailab ↔ jwood（工具 ↔ 多模態工作流）
  ailab ↔ nchu（工具心得 ↔ 學術應用）
  ailab ↔ cross-domain（個人實踐 ↔ 共用模式）

新增 1 條前傳→現況雙向：
  jlife/AI與博士 ↔ ailab（歷程 ↔ 方法）
```

### 今日成果統計

| 項目 | 數量 |
|---|---|
| 新增頁面 | 16（ailab 域 16 頁，含 inbox README）|
| 修訂頁面 | 5（CLAUDE.md / wiki主索引 / jlife/AI與博士 / shuangyun/AGENTS知識體系 / nchu/AI重組學術根基 / cross-domain/跨域索引）|
| 新增 Skill | 1（`~/.claude/skills/ailab/SKILL.md`）|
| Wiki 頁面數變化 | 78 → **94** |
| Commits | 待提交（一次性 ingest）|

### 待補（不入本次）

- [ ] OneDrive `ailab-inbox/` 資料夾首次使用時建立
- [ ] update memory：`wiki-structure.md` 加入 ailab 域
- [ ] update memory：考慮新增 reference 指向 ailab/concepts/實踐捕手協定.md
- [ ] reading/ 補實際心得（目前是模板）
- [ ] EXP-2026-Q2-04 Claude Code Hooks 自動化（commit / stop hook）

### 隱私邊界（這次拍板）

ailab 域與既有規範一致：
- ✅ 可入：工具棧、方法觀、演化邏輯、跨模型對比、失敗案例（去隱私化）
- ❌ 不入：客戶機密、家人細節、未發表研究、書稿全文、具體 prompt 含私資料

---

### 補批｜協定 v1.1（Mode A + Mode B）

**觸發**：Jacky 接著問「對話結尾／中間斷點怎麼記」。v1.0 只設計了 Mode A 單一事件，無法處理「多事件混合 + 繞路 + 錯誤」的對話結尾場景。

**改動**：

| 項目 | v1.0 | v1.1 |
|---|---|---|
| 捕捉模式 | 1 種（單一事件 9 欄位）| 2 種（Mode A 9 欄位 + Mode B 5 區塊）|
| Mode B 5 區塊 | — | 最終做法 / 繞路 / 錯誤 / 升格候選 / 待延伸 |
| Skill 子指令 | `/ailab capture` | `+ /ailab session [<主題>]` |
| 跨 AI prompt | 1 份（Mode A）| 2 份（Mode A + Mode B）|

**為什麼分兩 Mode**：對話結尾累積的不是「一個事件」，是**最終做法 + 繞路 + 錯誤**的對照組。如果硬拆 5 個獨立 Mode A 會失去對照脈絡——繞路與錯誤的價值在於跟最終做法的對照。

**Mode B 範例（首份真實 session）**：寫到 `wiki/ailab/inbox/2026-05-02-session-建ailab域與實踐捕手協定.md`——本次對話的元範例。內含：
- 最終做法 6 條（規劃三段式 / 雙生設計 / 雙路徑 inbox / 無門檻升格 / Mode A+B / 跨域 5 連結）
- 繞路 3 條（Bash 路徑 bug → PowerShell / 30 天門檻 → 無門檻 / stash pop conflict 手解）
- 失敗 3 條（域名訂正 / 頁數誤算 / v1.0 漏對話結尾）
- 升格候選 4 條 + 待延伸 5 條

**修改檔**：
- `wiki/ailab/concepts/實踐捕手協定.md`（v1.0 → v1.1，加 Mode B 段、5 區塊定義、跨 AI Mode B prompt、範例 4）
- `~/.claude/skills/ailab/SKILL.md`（加 `/ailab session` 子指令、Mode A vs Mode B 選擇表）
- `wiki/ailab/inbox/2026-05-02-session-建ailab域與實踐捕手協定.md`（新增，首份 Mode B）

---

### 補批｜跨機與跨模型部署擴充

**觸發**：Jacky 接著問「ailab 指令在 G2 mini Claude Code、Codex、Gemini 怎麼用？」——v1.1 只解決了協定多模式，但沒解決「Skill 多機部署」與「Codex / Gemini / Web AI 的具體部署方式」。

**新增**：

| 檔案 | 用途 |
|---|---|
| `wiki/ailab/skill/SKILL.md` | ⭐ **canonical 主版**——多機共用源頭，路徑用 `<jacky-wiki>` 變數不寫死 Windows |
| `wiki/ailab/skill/INSTALL.md` | Windows / Ubuntu / WSL2 / macOS 各平台安裝步驟（symlink vs copy 兩種策略）|
| `wiki/ailab/concepts/跨機與跨模型部署.md` | ⭐ **5 種環境完整部署矩陣**：Claude Code 多機 + Codex AGENTS.md + Gemini Gem instructions + Web AI prompt + 手機極簡 |

**設計核心**：
- **Skill 主版只有一處**：`wiki/ailab/skill/SKILL.md`（git 管理），各機 `~/.claude/skills/ailab/SKILL.md` 是 symlink/copy
- **路徑跨平台**：SKILL.md 用 `<jacky-wiki>` 變數，由 Claude 觸發時依環境變數 `$JACKY_WIKI_HOME` 或 fallback 路徑解析
- **Codex / Gemini / Web AI 的部署也版控**：放 `wiki/ailab/skill/` 內的 prompt 模板，多機共用

**G2 mini Ubuntu 安裝指令**（已寫進 INSTALL.md）：
```bash
mkdir -p ~/.claude/skills/ailab
ln -sf ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md
```

**ailab 域頁數**：16 → 19（+ 跨機部署、SKILL 主版、INSTALL）。
**Wiki 總頁數**：94 → 97。

---

## 2026-06-20 — AI 作業系統觀入庫（ailab concept + education workshop）

**做了什麼**：把 Jacky 原創洞察「AI 是新世代的工作作業系統」入庫兩處：
- `ailab/concepts/AI作業系統觀.md`（原始論述，定位為 [AI工具觀] 的上位：工具觀=選工具、作業系統觀=把工具組成個人 OS）。
- `education/workshops/2026-06-20-ai作業系統觀/`（README + slides-outline 16 張，對外內訓，重點「用 OS 邏輯帶新人」）。

**為什麼**：團隊與新人帶領需要一個可遷移的心智模型——逐個教工具會過時，OS 邏輯不會。配合双云 AI School 線上平台新增「AI 作業系統」概念頁。

**留下決策**：
- 用網路研究佐證（Karpathy Software 3.0 / Copilot OS / Cursor CLI 四介面 / AIOS Agent=行程 / MCP=syscall），支持度約 8.5/10。
- 不固定品牌名；對外用「視角／作業系統邏輯」框架。
- ailab 概念頁不自動 push（個人水庫慣例）；education 教材自動 push。

**頁數**：ailab concepts +1；education 28 → 30（README + slides）。
