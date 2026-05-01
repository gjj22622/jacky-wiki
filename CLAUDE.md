# Jacky Wiki — CLAUDE.md

## Wiki Schema

### 擁有者
鐘基啟（Jacky）— gjj22622@gmail.com

### 核心框架
SOSTAC + AI First

### 知識域（優先順序）
| 域代碼 | 名稱 | 類型 | 優先級 | 狀態 |
|---|---|---|---|---|
| shuangyun | 双云行銷 | 事業（客戶服務） | ⭐ 優先域 | ✅ 已建（29 頁）|
| jwood | Jwood 基的木藝 | 事業（Jacky 自有品牌） | ⭐ 優先域 | ✅ 已建（9 頁）|
| **ailab** | **AI 實踐**（Jacky 工具觀／方法觀／演化觀）| 方法／工具（新類別）| ⭐ **優先域** | ✅ 已建（19 頁）|
| jlife | 鐘基啟的人生回憶錄 | 個人成長脈絡 | 次要 | ✅ 已建（9 頁）|
| tbsa | TBSA 商務企劃協會 | 社會職務 | 次要 | ✅ 已建（14 頁）|
| nchu | 中興大學博士研究 | 學術 | 次要 | ✅ 已建（6 頁）|
| yinian | 一念清涼 | 個人修行 | 次要 | 🔲 待建 |
| cross-domain | 跨域素材 | 共用框架 | — | ✅ 已建（5 頁）|

### 域的拓樸（前傳 ↔ 現況雙向關聯）

```
                  ┌──── jlife（成長脈絡 / 從 0 開始的歷程）────┐
                  │                                          │
                  │ jlife/自己搭場 ←──────→ shuangyun        │
                  │ jlife/AI與博士 ←──────→ shuangyun        │
                  │ jlife/AI與博士 ←──────→ ailab            │  ← 新增
                  │ jlife/作品線   ←──────→ jwood            │
                  │ jlife/作品線   ←──────→ tbsa             │
                  │ jlife/AI與博士 ←──────→ nchu             │
                  │                                          │
                  │ shuangyun ←──共生人才循環──→ tbsa         │
                  │ shuangyun ←──AI 體系互通──→ nchu         │
                  │ ailab ←──結晶 ↔ 活知識──→ shuangyun       │  ← 新增
                  │ ailab ←──工具與工作流──→ jwood            │  ← 新增
                  │ ailab ←──實踐心得──→ nchu                │  ← 新增
                  │ ailab ←──模式 ↔ 個人實踐──→ cross-domain  │  ← 新增
                  └──────────────────────────────────────────┘
```

### 目錄結構（實際）
```
wiki/
├── wiki主索引.md               # 總覽（含各域頁面數）
├── log.md                      # 操作日誌（記錄 ingest 決策）
├── log-2026-04-29-launch.md    # 啟動日進度報告
├── cross-domain/               # 跨域素材
│   ├── 跨域索引.md
│   └── 賣點命名理論.md
├── shuangyun/                  # ⭐ 双云行銷
│   ├── 双云索引.md
│   ├── concepts/               # 方法論（AGENTS®、AI 行銷部、備課流程）
│   ├── courses/                # Week 1-5 教案（含 課程總覽.md）
│   ├── skills/                 # 22 個 Skill（含 双云技能索引.md）
│   ├── cases/                  # 客戶案例
│   └── sop/                    # 標準流程
├── jwood/                      # ⭐ 基的木藝（**現在的營運邏輯**）
│   ├── 木作索引.md
│   ├── concepts/               # 品牌總覽 / Agent 團隊 / 內容策略
│   ├── sop/                    # 週排程
│   ├── ai-workflow.md          # AI 圖片生成工作流
│   ├── yt-video-sop.md         # YouTube 影片 SOP
│   ├── ig-post-sop.md          # IG 每日貼文 SOP
│   └── todolist.md
├── jlife/                      # 鐘基啟的人生（**從 0 開始的歷程**）
│   ├── 人生索引.md
│   ├── concepts/               # 書的結構 / 跨域對應
│   └── stages/                 # 6 個身分階段（E 版骨架）
├── tbsa/                       # 商務企劃協會（**三大方法論教學體系**）
│   ├── TBSA索引.md
│   └── concepts/
│       ├── 三大方法論體系.md   # SOSTAC × SPEAKS × AGENTS
│       └── 与双云的人才循環.md
├── nchu/                       # 中興博士（**學術根基**）
│   ├── 中興博士索引.md
│   └── concepts/
│       ├── 學術Skill體系.md    # 6 個學術 Skill
│       └── AI重組學術根基.md
├── ailab/                      # ⭐ AI 實踐（**Jacky 工具觀／方法觀／演化觀**）
│   ├── AI實踐索引.md
│   ├── concepts/               # 演化元方法 / 工具觀 / 學習方法 / 三層萃取漏斗 / 實踐捕手協定
│   ├── tools/                  # 工具棧索引 / claude-code / codex-cli / mcp / 模型選擇 / auto-memory
│   ├── patterns/               # 模式索引（連結到 cross-domain / nchu / jwood）
│   ├── experiments/            # 實驗中（依事件升格／關檔，無時間門檻）
│   ├── log/                    # 重大里程碑（精選，不是日記）
│   └── reading/                # 教材／文獻／影片心得
└── yinian/                     # 待建

inbox/                          # 未分類輸入
raw/                            # 原始素材存檔
```

### 頁面規範
- 語言：繁體中文
- 每頁頂部必須有 YAML frontmatter（`title`、`domain`、`updated`）
- **檔名：中文為主**——所有 `index.md` 已重命名為域中文名（例：`双云索引.md`、`木作索引.md`、`TBSA索引.md`、`中興博士索引.md`、`人生索引.md`）
- 隱私邊界：**個人隱私、家人細節不放入 wiki**；jlife 域只到結構層次（章節主題、時間段、跨域連結），不複製書稿全文

### 跨域寫作原則

#### 前傳 ↔ 現況 雙向關聯（**強制**）
- **jlife 記錄成長脈絡**（怎麼變成的）；**事業／學術域記錄當下邏輯**（現在的樣子）
- 兩邊互為前後傳，必須**雙向連結**：
  - `jlife/stages/作品線` ↔ `jwood/木作索引` + `tbsa/TBSA索引`
  - `jlife/stages/自己搭場` ↔ `shuangyun/双云索引`
  - `jlife/stages/AI與博士` ↔ `shuangyun/AGENTS知識體系` + `nchu/中興博士索引` + `ailab/AI實踐索引`
- **同層域之間共生關係**：
  - `shuangyun ↔ tbsa`（人才循環）
  - `shuangyun ↔ nchu`（AI x 學術整合）
  - `ailab ↔ shuangyun`（活知識 ↔ 結晶方法論）
  - `ailab ↔ jwood`（工具 ↔ 多模態工作流）
  - `ailab ↔ nchu`（工具心得 ↔ 學術應用）
  - `ailab ↔ cross-domain`（個人實踐 ↔ 共用模式）

#### ailab 域寫作原則（**特別**）
- **無時間門檻、依事件升格**：不機械化用 30 天 / 3 個月閘門，由「事件成熟度」判斷
- **三條輸入線**：既有專案文件（一次性整合）/ session 對話（有事件就升格）/ 每天嘗試（先進 inbox 不入 wiki）
- **跨模型統一格式**：所有事件用 [實踐捕手協定](wiki/ailab/concepts/實踐捕手協定.md) 記錄，不管是 Claude Code / Codex / ChatGPT / Gemini
- **patterns/ 只放連結**：已穩定模式連回 cross-domain / nchu / jwood，不複製內容

#### 去重
同一方法論只存一份，其他頁面用連結指向（例：6 維度拆解表只在 `shuangyun/concepts/AGENTS知識體系.md` 完整定義；TBSA 三大方法論的圖在 `tbsa/concepts/三大方法論體系.md`，shuangyun 連回去）。

#### 版本選最新
多版本並存時採 v3，舊版本標記「歷史參考」並說明差異。

#### 每次 ingest 後
- 更新 `wiki/wiki主索引.md` 頁面數與域結構
- 在 `wiki/log.md` 記錄關鍵決策（哪些素材入、哪些不入、判斷理由）
- 確認雙向連結都建立（前傳 ↔ 現況）

### AI 協作規範
- 不問，直接做；需確認的事項一次集中提問
- 新頁面組織方式：
  - 事業域（shuangyun / jwood）：依 SOSTAC 框架（情況／目標／策略／戰術／行動／管控）
  - 個人域（jlife）：依時間軸 / 身分軸（D 版五卷 / E 版六卷）
  - 學術／教育域（tbsa / nchu）：依方法論體系與時間軸雙軌
- commit 格式：`feat(wiki): 描述` + Co-Authored-By
- 多機協作（G2 mini Ubuntu / WSL2 / Windows）：push 前先 `git pull --rebase origin main`，避免 fast-forward 衝突
