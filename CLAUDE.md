# Jacky Wiki — CLAUDE.md

## Wiki Schema

### 擁有者
鐘基啟（Jacky）— gjj22622@gmail.com

### 核心框架
SOSTAC + AI First

### 知識域（優先順序）
| 域代碼       | 名稱         | 類型             | 優先級   |
| --------- | ---------- | -------------- | ----- |
| shuangyun | 双云行銷       | 事業（客戶服務）       | ⭐ 優先域 |
| jwood     | Jwood 基的木藝 | 事業（Jacky 自有品牌） | ⭐ 優先域 |
| jlife     | 鐘基啟的人生回憶錄  | 個人成長脈絡         | 次要    |
| tbsa      | TBSA 協會    | 社會職務           | 待建    |
| nchu      | 中興大學博士研究   | 學術             | 待建    |
| yinian    | 一念清涼       | 個人修行           | 待建    |

### 目錄結構（實際）
```
wiki/
├── wiki主索引.md                  # 總覽（含各域頁面數）
├── log.md                      # 操作日誌（記錄 ingest 決策）
├── log-2026-04-29-launch.md    # 啟動日進度報告
├── cross-domain/               # 跨域素材（賣點命名理論…）
│   └── 跨域索引.md
├── shuangyun/                  # ⭐ 双云行銷
│   ├── 双云索引.md
│   ├── concepts/               # 方法論（AGENTS®、AI 行銷部、備課流程）
│   ├── courses/                # Week 1-5 教案（拆/建/修/串/通）
│   ├── skills/                 # 22 個 Skill 頁面（含 Skill OS、客戶模板等集成頁）
│   │   └── 双云技能索引.md
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
├── jlife/                      # 鐘基啟的人生回憶錄（**從 0 開始的歷程**）
│   ├── 人生索引.md
│   ├── concepts/               # 書的結構（D 版五卷 + E 版六卷）/ 跨域對應
│   └── stages/                 # 6 個身分階段（E 版骨架）
├── tbsa/                       # 待建
├── nchu/                       # 待建
└── yinian/                     # 待建

inbox/                          # 未分類輸入
raw/                            # 原始素材存檔
```

### 頁面規範
- 語言：繁體中文
- 每頁頂部必須有 YAML frontmatter（`title`、`domain`、`updated`）
- 檔名：中文為主（已將原英文檔名全部中文化；新增頁也用中文）
- 隱私邊界：**個人隱私、家人細節不放入 wiki**；jlife 域只到結構層次（章節主題、時間段、跨域連結），不複製書稿全文

### 跨域寫作原則

#### 前傳 ↔ 現況 雙向關聯
- **jlife 記錄成長脈絡**（怎麼變成的）；**事業域記錄當下邏輯**（現在的樣子）
- 兩邊互為前後傳，必須雙向連結。例：
  - `jlife/stages/作品線_2015-2026.md` ↔ `jwood/index.md`
  - `jlife/stages/自己搭場_2014-2020.md` ↔ `shuangyun/index.md`
  - `jlife/stages/AI與博士_2023-2026.md` ↔ `shuangyun/concepts/AGENTS知識體系.md`

#### 去重
同一方法論只存一份，其他頁面用連結指向（例：6 維度拆解表只在 `concepts/AGENTS知識體系.md` 完整定義，其他 Week 頁、Skill 頁都連回去）。

#### 版本選最新
多版本並存時採 v3，舊版本標記「歷史參考」並說明差異（例：Week 5 v1 API 串接版被 v3 AI 行銷部版取代，但 v1 的設計哲學在 Week 5 頁底注記）。

#### 每次 ingest 後
- 更新 `wiki/index.md` 頁面數
- 在 `wiki/log.md` 記錄關鍵決策（哪些素材入、哪些不入、判斷理由）

### AI 協作規範
- 不問，直接做；需確認的事項一次集中提問
- 新頁面組織方式：
  - 事業域（shuangyun / jwood）：依 SOSTAC 框架（情況／目標／策略／戰術／行動／管控）
  - 個人域（jlife）：依時間軸 / 身分軸（D 版五卷 / E 版六卷）
- commit 格式：`feat(wiki): 描述` + Co-Authored-By
- 多機協作（G2 mini Ubuntu / WSL2 / Windows）：push 前先 `git pull --rebase origin main`，避免 fast-forward 衝突
