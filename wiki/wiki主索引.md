---
title: Jacky Wiki 總覽
domain: root
updated: 2026-06-28
---

# Jacky Wiki

**擁有者**：鐘基啟（Jacky）
**核心框架**：SOSTAC + AI First
**目前頁面數**：246（不含本頁）

## 知識域導航（10 個內容域 + 1 個跨域 + 1 個待建）

| 域 | 說明 | 頁面數 | 連結 |
|---|---|:---:|---|
| ⭐ shuangyun | 双云行銷——品牌、行銷策略、客戶專案、AI Agent 體系｜🆕 SOSTAC 迴圈與逆推除錯（AI School L6 核心方法論）＋ `/監察`、`/迴圈` skill | 31 | [進入](shuangyun/双云索引.md) |
| ⭐ jwood | 基的木藝——綠檀穴道按摩棒、YouTube 內容自動化 | 9 | [進入](jwood/木作索引.md) |
| ⭐ **ailab** | **AI 實踐——Jacky 工具觀／方法觀／演化觀（活知識結晶層）｜🆕 AI 作業系統觀（工具觀的上位）；黃仁勳 Computex 2026 AI Agent 兩層架構（6/13 演講開場定義錨）** | **24** | [進入](ailab/AI實踐索引.md) |
| jlife | 鐘基啟的人生回憶錄——成長脈絡、六個身分階段、跨域對應 | 9 | [進入](jlife/人生索引.md) |
| tbsa | TBSA 商務企劃協會——學習行銷起點、SOSTAC、SPEAKS、5 大表單、与双云人才循環 | 14 | [進入](tbsa/TBSA索引.md) |
| nchu | 中興大學博士研究——博二、9 階段專討工作流、零幻覺 SOP、AGENTS 第三實踐場、**AI Co-Researcher 文獻吸收系統 + 博論總導覽**、**工具評估 ForestForTrees 🆕** | 13 | [進入](nchu/中興博士索引.md) |
| cross-domain | 跨域素材——入口導覽頁 SOP、來源控制 script_viewer、Commander+Executor、賣點命名、數據儀表板平台建置 | 6 | [進入](cross-domain/跨域索引.md) |
| **education** | **教育訓練——把實踐／方法論教給別人的對外成品（與 ailab 分工：個人事件→ailab、對外教材→education）｜🆕 通用備課 LOOP（六類課程路由＋十階段 Gate＋跨場升格）；Jcheck × Jdong 鷹眼到執行交接 SOP；AIRUN 營運風險監察 workshop；從演講到業務開發全鏈 workshop；Zeabur CLI 部署；一念清涼每日 FB 自動發文；L6 Agent 迴圈設計** | 45 | [進入](education/教育訓練索引.md) |
| ⭐ **jos** | **AI 作業系統——Jacky 的 AI 工作環境機械化清單，🆕 換電腦無痛轉移（environment 環境/工具/CLI/MCP/環境變數 + skills 全 18 支 skill 單一真相 + migration 新手友善換電腦 SOP + 多機一致性比對）；對應 `/移機`（capture/restore/sync/diff）；與 ailab/tools 分工：那邊工具觀、這邊怎麼裝回來** | 15 | [進入](jos/作業系統索引.md) |
| **portfolio** | **作品域——分類目錄（A 線上產品／B 互動成品／C 客戶交付／D 課程方法論／E 工具 + 三大專案家族深掘）；含本機+OneDrive 全掃。已部署 9 個：airun.tw/muzopet/一念清涼/回憶錄/AI大腦/jwood/**speaks-coach/agents.tbsa.tw/双云Agent平台**；token 走 gitignored 金庫。定義：已部署 OR AI 簡報素材 OR 導覽頁/HTML** | 17 | [進入](portfolio/作品索引.md) |
| **aischool** | **双云 AI Agent School 線上平台——L0-L6 全 43 課章節全文（拆/建/修/串通/迴圈）＋平台架構（5 權限分區/token後台/影片管線/部署/監察）＋課程↔Skill 連動＋三工具軌(Claude/Codex/Antigravity)；🆕 Plan 模式與自動化工作流（三工具都有 Plan Mode × Auto × Goal）；內容方法論連回 shuangyun 不複製** | 13 | [進入](aischool/AI School索引.md) |
| yinian | 一念清涼——身心靈、冥想、修行紀錄 | 0 | _尚未建立_ |

## 域的拓樸（前傳 ↔ 現況雙向關聯）

```
            ┌──── jlife（從 0 開始的歷程）────┐
            │                                │
            │  jlife/自己搭場 ←──→ shuangyun  │
            │  jlife/AI與博士 ←──→ shuangyun  │
            │  jlife/AI與博士 ←──→ ailab      │  ← 2026-05-02
            │  jlife/作品線   ←──→ jwood      │
            │  jlife/作品線   ←──→ tbsa       │
            │  jlife/AI與博士 ←──→ nchu       │
            │                                │
            │  shuangyun ←─人才循環─→ tbsa    │
            │  shuangyun ←─AI 體系─→ nchu     │
            │  ailab ←─結晶 ↔ 活知識─→ shuangyun │
            │  ailab ←─工具 ↔ 工作流─→ jwood    │
            │  ailab ←─工具心得 ↔ 學術─→ nchu   │
            │  ailab ←─個人 ↔ 共用模式─→ cross-domain │
            │  jos ←─工具觀 ↔ 機械清單─→ ailab  │  ← 2026-06-21
            │  portfolio ←─作品 ↔ 部署環境─→ jos │  ← 2026-06-21
            │  aischool ←─課程 ↔ 方法論母源─→ shuangyun │ ← 2026-06-23
            │  aischool ←─線上平台 ↔ 部署速查─→ portfolio │ ← 2026-06-23
            └────────────────────────────────┘
```

> **規範**：每條線都是雙向（jlife 連到事業／學術域 + 對方反向連回 jlife）。詳見 [CLAUDE.md §跨域寫作原則](../CLAUDE.md)。

---

## ⭐ shuangyun 域結構（最大域）

```
shuangyun/  (30 頁)
├── 双云索引.md                # 域首頁（含起源前傳、TBSA 共生關係）
├── concepts/  (6 頁)
│   ├── AGENTS知識體系.md      # 六字訣 / 三級認證 / 三場景部署
│   ├── AGENTS認證手冊.md      # L1/L2/L3 評分表
│   ├── AGENTS方法論落地.md    # 双云專案落地狀態
│   ├── AI行銷部定義.md        # 4 Agent 委員會 / 老闆 1-4 / AI 5-8
│   ├── 多品牌獨立應用架構.md   # Command Center + isolated Brand Apps
│   └── AI備課流程.md          # 7 階段人機協作
├── courses/   (6 頁)
│   └── 課程總覽.md, Week1拆.md, Week2建.md, Week3修.md, Week4串.md, Week5通.md
├── skills/    (13 頁)
│   ├── 双云技能索引.md
│   └── ... (12 個 Skill 頁含集成頁)
├── cases/     (3 頁)
│   └── 濂直火割烹.md, 晟光建設.md, 木酢寵物達人.md
└── sop/       (1 頁)
    └── 找賣點SOP.md
```

## ⭐ jwood 域結構

```
jwood/  (9 頁)
├── 木作索引.md                # 域首頁（含 Jwood 的起源 → jlife/作品線）
├── todolist.md
├── ai-workflow.md             # AI 圖片生成（Codex CLI + gpt-image-2）
├── yt-video-sop.md            # YouTube 影片 SOP
├── ig-post-sop.md             # IG 每日貼文 SOP
├── concepts/  (3 頁)
│   ├── brand-overview.md
│   ├── agent-team.md          # 11+2 Agent 團隊
│   └── content-strategy.md    # Series A/B/C/D 並行
└── sop/       (1 頁)
    └── weekly-operations.md
```

## jlife 域結構

```
jlife/  (9 頁)
├── 人生索引.md                # 成長脈絡導覽
├── concepts/  (2 頁)
│   ├── 書的結構.md            # D 版五卷 + E 版六卷
│   └── 跨域對應.md            # 5 個域的雙向關聯總圖
└── stages/  (6 頁，E 版骨架)
    ├── 受僱練功_2008-2010.md     # E 卷一
    ├── 佳醫三年半_2010-2013.md   # E 卷二
    ├── 自己搭場_2014-2020.md     # E 卷三 → shuangyun 起源
    ├── 作品線_2015-2026.md       # E 卷四 → jwood + tbsa 起源
    ├── AI與博士_2023-2026.md     # E 卷五 → nchu 起源
    └── 家庭線_2009-2026.md       # E 卷六（穿越收束）
```

## tbsa 域結構

```
tbsa/  (14 頁)
├── TBSA索引.md                            # 域首頁（20 年三段身分弧線、学習行銷起點）
├── concepts/  (7 頁)
│   ├── 初階知識體系_找方向找對象找方法.md   # 洪敏莉初階教材（**學習起點**）
│   ├── SOSTAC方法論.md                    # 鄭沂珊進階教材（6 階段 + 5 表單）
│   ├── 三大方法論體系.md                   # SOSTAC × SPEAKS × AGENTS 整合圖
│   ├── SPEAKS方法論總覽.md                # 雙軌品牌、IP 治理
│   ├── SPEAKS六步驟詳解.md                # S/P/E/A/K/S 操作
│   ├── SPEAKS體系建設.md                  # 22 份文件、三級認證、教學
│   └── 与双云的人才循環.md                 # TBSA ↔ 双云
└── templates/  (6 頁)                     # 5 大企劃表單（進階檢定核心）
    ├── 五大表單總覽.md                     # 索引 + 流程圖 + 依賴關係
    ├── 表單1_企劃情報概念分析.md
    ├── 表單2_現況分析與策略目標設定.md      # SWOT
    ├── 表單3_STP市場策略設計.md
    ├── 表單4_行銷戰術及溝通活動設計.md      # 7Ps + AIDAS
    └── 表單5_一頁企劃書.md                 # 全 SOSTAC 收束
```

## nchu 域結構

```
nchu/  (6 頁)
├── 中興博士索引.md            # 域首頁（博二、共指朱彥煒、研究方向、跨域貢獻）
├── concepts/  (4 頁)
│   ├── 學術Skill體系.md       # 6 規劃 + 1 已實作（seminar-helper）
│   ├── AI重組學術根基.md      # 博士班 × AI 工作的雙線敘事
│   ├── 9階段專討工作流.md     # seminar-helper 萃取，AGENTS 學術版
│   └── 零幻覺與文獻查證SOP.md # 73% 幻覺事故與雙軌品管
└── cases/  (1 頁)
    └── 第三次專討.md          # 森林數位孿生（2026-05-13 上場）
```

## ⭐ ailab 域結構（2026-05-02 新建 + 跨機部署擴充）

```
ailab/  (20 頁 + inbox/)
├── AI實踐索引.md              # 域首頁（含跨域連結、輸入規則、工具棧速查）
├── concepts/  (6 頁)
│   ├── 演化元方法.md          # 從實踐反推方法論
│   ├── AI工具觀.md            # 為什麼選這套工具棧
│   ├── 學習方法.md            # 學新模型／新工具的 SOP
│   ├── 三層萃取漏斗.md        # inbox → experiments → patterns/tools
│   ├── 實踐捕手協定.md        # ⭐ 跨模型／跨對話標準記錄格式（v1.1：Mode A + B）
│   └── 跨機與跨模型部署.md    # ⭐ Claude Code 多機 + Codex + Gemini Gem + Web AI
├── tools/     (6 頁)
│   ├── 工具棧索引.md
│   ├── claude-code.md
│   ├── codex-cli.md
│   ├── mcp-servers.md
│   ├── 模型選擇心法.md        # Opus/Sonnet/Haiku 何時用哪個
│   └── auto-memory系統.md
├── patterns/  (1 頁)
│   └── 模式索引.md            # 連結到 cross-domain / nchu / jwood
├── experiments/ (1 頁)
│   └── 2026-Q2實驗清單.md
├── log/       (1 頁)
│   └── 2026-04_AGENTS_v1.0→v1.1.md
├── reading/   (2 頁)
│   ├── 閱讀索引.md
│   └── 2026-06-01-黃仁勳computex2026-aiagent定義與架構.md  # 🆕 6/13 演講開場定義錨
├── inbox/                     # 未升格事件暫存（不算頁，由 /ailab capture 寫入）
│   ├── README.md
│   └── 2026-05-02-session-建ailab域與實踐捕手協定.md  # 第一份 Mode B 範例
└── skill/     (2 頁)          # ⭐ canonical SKILL 主版（多機共用）
    ├── SKILL.md               # ailab Skill 跨平台主版
    └── INSTALL.md             # Windows / Ubuntu / WSL2 / macOS 安裝
```

**對應 Skill**：canonical 主版 `wiki/ailab/skill/SKILL.md`（git 管理）；
各機執行版 `~/.claude/skills/ailab/SKILL.md`（symlink 或 copy）。
觸發指令 `/ailab capture` / `/ailab session` / `/ailab promote` / `/ailab sync`。

---

## education 域結構（2026-05-08 新建）

```
education/  (4 頁)
├── 教育訓練索引.md          # 域首頁（含跟 ailab 的分工、三層素材來源）
├── README.md                 # 內部結構與寫作範本
├── concepts/                 # 教學哲學、原則
├── workshops/                # 完整教學單元
│   └── 2026-05-08-claude-code-三skill鐵三角/
│       ├── README.md          # 主教材（內部團隊向，15 分鐘）
│       └── slides-outline.md  # 簡報大綱（15 張 slide）
├── playbooks/                # SOP / 操作手冊
└── pitfalls/                 # 採坑點集合
```

**對應 Skill**：執行版 `~/.claude/skills/internal-training/SKILL.md`。
觸發指令 `/internal-training` 或自然語言「整理成教材／SOP／採坑點／內訓」。
**沒有 inbox**——原始事件走 ailab，education 只接成品。

---

## ⭐ jos 域結構（2026-06-21 新建 — AI 作業系統 / 換電腦無痛轉移）

```
jos/  (14 頁 + 18 skill 還原快照)
├── 作業系統索引.md            # 域首頁：四層架構、轉移入口、與 ailab/tools 分工
├── environment/  (6 頁)       # 環境清單
│   ├── 硬體與作業系統.md
│   ├── 軟體清單.md            # GUI 應用 + 官方下載 + winget 一鍵
│   ├── CLI工具清單.md         # 每項含安裝+驗證指令（本機實測版本）
│   ├── MCP伺服器清單.md
│   ├── 環境變數清單.md        # 只記名稱+來源，★不記值
│   └── 自建程式清單.md
├── skills/  (2 頁 + 個人skills/ 快照)
│   ├── skill總索引.md         # 全 18 支 skill 單一真相 + 一鍵還原
│   ├── plugin與市集.md
│   └── 個人skills/            # 18 支 SKILL.md 還原快照（/移機 sync 維護）
├── migration/  (4 頁)
│   ├── 換電腦SOP.md           # ⭐ 新手友善逐步 runbook（0→10 步）
│   ├── 還原檢查清單.md
│   ├── manifest.md            # 機器狀態快照（分機器，/移機 capture 維護）
│   └── 環境一致性.md          # 多機比對（Windows ↔ Linux），/移機 diff 維護
└── skill/  (2 頁)             # canonical 主版
    ├── SKILL.md               # /移機 skill
    └── INSTALL.md
```

**對應 Skill**：`/移機`（capture 更新清單 / restore 新機還原 / sync 同步 skill）。
canonical `wiki/jos/skill/SKILL.md`；執行版 `~/.claude/skills/移機/SKILL.md`。

## portfolio 域結構（2026-06-21 新建 — 作品速查）

```
portfolio/  (5 頁 + gitignored 金庫)
├── 作品索引.md               # ⭐ 主表：專案/狀態/資料夾/repo/前端/admin/DNS/部署日
├── README.md                 # 金庫機制、頁面規範、隱私紅線
├── projects/  (10 頁)
│   ├── agentflow-airun.md   # AgentFlow airun.tw（線上主站，金流已開）🟢
│   ├── muzopet-dashboard.md # 木酢寵物達人數據看板（Zeabur）🟢
│   ├── 一念清涼-每日佛學故事.md # A-day-A-Story（GitHub Pages+Firebase）🟢
│   ├── 回憶錄系統.md         # jacky-memoir（Zeabur 佈建中）🟡
│   ├── ai大腦.md             # 履約問答系統（本機 beta）🟡
│   ├── jwood.md             # 基的木藝（平台運營，jwood.tw）🟢
│   ├── 前導生物-AI小說.md    # AI 科幻小說 + HTML 閱讀器 + Docker 🟢
│   ├── 餐廳經營遊戲.md       # HTML5 模擬遊戲 v1+v2 ⚪dev
│   ├── 鍾氏族譜.md          # 族譜網站（git, 全端）⚪dev
│   ├── skill-meeting.md     # 多角色 AI 圓桌（Next.js, Zeabur-ready）⚪dev
│   ├── speaks-coach.md      # SPEAKS 口說評分 SaaS（speaks-coach.zeabur.app）🟢
│   ├── tbsa-ai-教學樞紐.md  # agents.tbsa.tw（自有網域，4 子 agent）🟢
│   └── 双云agent平台.md     # shuangyun-agent-platform（腦+手，20 品牌）🟢
│   # 三大專案家族(双云AI轉型/TBSA開課/SPEAKS)子作品 + B-E 類為作品索引條目
├── .vault/                   # 🔒 gitignored 金庫（token/密碼，絕不進 git）
│   └── 作品金鑰.local.json
└── skill/  (2 頁)            # canonical 主版
    ├── SKILL.md               # /作品 skill
    └── INSTALL.md
```

**對應 Skill**：`/作品`（add 歸檔 / `<名稱>` 查示範 / list 總表）。
**金鑰紅線**：非機密進 wiki 頁；token/密碼進 `.vault/`（gitignore，不 push）。

## ⭐ aischool 域結構（2026-06-23 新建 — 双云 AI Agent School 線上平台）

```
aischool/  (13 頁)
├── AI School索引.md              # 域首頁：課程一覽 + 跨域分工
├── curriculum/  (8 頁)
│   ├── 課程地圖.md               # L0-L6 全 43 課總表 + Level↔Week 對應
│   ├── L0_入門環境起手式.md       # 7 課
│   ├── L1_拆_三工具與好問題.md    # 4 課（Week1）
│   ├── L2_建_SOSTAC決策架構.md    # 4 課（Week2 前）
│   ├── L3_建_最小Agent.md         # 4 課（Week2 後）
│   ├── L4_修_Skill與殘酷測試.md   # 7 課（Week3）
│   ├── L5_串通_協作與部署.md      # 10 課（Week4+5）
│   └── L6_迴圈_Agent自動迴圈.md   # 7 課（新增，對應 /迴圈）
├── platform/  (2 頁)
│   ├── 平台架構.md               # 5 權限分區/token後台/影片管線/部署/監察
│   └── 課程Skill連動.md          # skills.json → 每課 practice 機制
└── concepts/  (2 頁)
    ├── 教學定位與AGENTS對應.md    # 三件事/三工具軌/AGENTS/AI Agent 定義
    └── Plan模式與自動化工作流.md   # Plan Mode（三工具都有）× Auto × Goal；互鎖雷區
```

**去重原則**：AGENTS 六字訣、SOSTAC、殘酷測試等方法論只存一份在 shuangyun/tbsa，本域連結回去不複製。
**對應平台**：repo `gjj22622/shuangyun-claude-code-training` → Zeabur `2clouds-claude-code-training.zeabur.app`。

---

## 跨域素材

- [跨域索引](cross-domain/跨域索引.md)
- [賣點命名理論](cross-domain/賣點命名理論.md)
- [入口導覽頁 SOP](cross-domain/入口導覽頁SOP.md)
- [來源控制與 script_viewer 模式](cross-domain/來源控制與script_viewer模式.md)
- [Commander+Executor 單人多 Agent 模式](cross-domain/Commander+Executor單人多Agent模式.md)
- 視覺化實驗 → `cross-domain/visualizations/`（3D 知識圖等）

---

## 工作流程

```
inbox/  →  整理分類  →  wiki/<domain>/  →  raw/（原始備存）
```

**整理階段識別**

| 階段 | 動作 |
|---|---|
| Ingest | 從 OneDrive / 對話 / 文件抽取素材 |
| Categorize | 判斷屬於哪個域（concepts / courses / skills / cases / sop / stages） |
| Cross-link | 建立**雙向連結**（CLAUDE.md §前傳↔現況雙向關聯）|
| Log | 在 [log.md](log.md) 記錄關鍵決策 |

### 通用備課 LOOP（2026-06-28）

- [Jacky 課程與備課系統總覽](education/concepts/Jacky課程與備課系統總覽.md)：六類課程、16 個專案、現行流程、資產與缺口。
- [通用備課 LOOP 工作流](education/playbooks/通用備課LOOP工作流.md)：單場十階段＋跨場升格閉環。
- [`jacky-course-prep-loop` canonical skill](education/skill/jacky-course-prep-loop/SKILL.md)：`/備課`、盤點、找前例、驗收、復盤與升格入口。

## 對外分享

→ [團隊分享簡報.md](團隊分享簡報.md)：給双云夥伴／TBSA 學員／合作對象的最新版分享稿，Marp 格式，可 export PPTX/PDF

## 操作日誌

→ [log.md](log.md)：記錄 wiki 整理過程的關鍵操作與決策。
→ [log-2026-04-29-launch.md](log-2026-04-29-launch.md)：啟動日完整進度報告。

## 隱私邊界

> **個人隱私、家人細節不放入此 wiki。**
> 跨域 Skill（jacky.brain.*、tbsa.*、nchu-*）只在 [`shuangyun/skills/双云技能索引.md`](shuangyun/skills/双云技能索引.md) 註記，不為它們建獨立頁。
