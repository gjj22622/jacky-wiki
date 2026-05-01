---
title: Jacky Wiki 總覽
domain: root
updated: 2026-05-01
---

# Jacky Wiki

**擁有者**：鐘基啟（Jacky）
**核心框架**：SOSTAC + AI First
**目前頁面數**：78（不含本頁）

## 知識域導航（5 個內容域 + 1 個跨域 + 1 個待建）

| 域 | 說明 | 頁面數 | 連結 |
|---|---|:---:|---|
| ⭐ shuangyun | 双云行銷——品牌、行銷策略、客戶專案、AI Agent 體系 | 29 | [進入](shuangyun/双云索引.md) |
| ⭐ jwood | 基的木藝——綠檀穴道按摩棒、YouTube 內容自動化 | 9 | [進入](jwood/木作索引.md) |
| jlife | 鐘基啟的人生回憶錄——成長脈絡、六個身分階段、跨域對應 | 9 | [進入](jlife/人生索引.md) |
| tbsa | TBSA 商務企劃協會——學習行銷起點、SOSTAC、SPEAKS、5 大表單、与双云人才循環 | 14 | [進入](tbsa/TBSA索引.md) |
| nchu | 中興大學博士研究——博二、9 階段專討工作流、零幻覺 SOP、AGENTS 第三實踐場 | 6 | [進入](nchu/中興博士索引.md) |
| cross-domain | 跨域素材——入口導覽頁 SOP、來源控制 script_viewer、Commander+Executor、賣點命名 | 5 | [進入](cross-domain/跨域索引.md) |
| yinian | 一念清涼——身心靈、冥想、修行紀錄 | 0 | _尚未建立_ |

## 域的拓樸（前傳 ↔ 現況雙向關聯）

```
            ┌──── jlife（從 0 開始的歷程）────┐
            │                                │
            │  jlife/自己搭場 ←──→ shuangyun  │
            │  jlife/AI與博士 ←──→ shuangyun  │
            │  jlife/作品線   ←──→ jwood      │
            │  jlife/作品線   ←──→ tbsa       │
            │  jlife/AI與博士 ←──→ nchu       │
            │                                │
            │  shuangyun ←─人才循環─→ tbsa    │
            │  shuangyun ←─AI 體系─→ nchu     │
            └────────────────────────────────┘
```

> **規範**：每條線都是雙向（jlife 連到事業／學術域 + 對方反向連回 jlife）。詳見 [CLAUDE.md §跨域寫作原則](../CLAUDE.md)。

---

## ⭐ shuangyun 域結構（最大域）

```
shuangyun/  (29 頁)
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
├── cases/     (2 頁)
│   └── 濂直火割烹.md, 晟光建設.md
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

## 對外分享

→ [團隊分享.md](團隊分享.md)：給双云夥伴／TBSA 學員／合作對象的 wiki 介紹文件
→ [團隊分享簡報.md](團隊分享簡報.md)：Marp 格式簡報（可 export PPTX/PDF）

## 操作日誌

→ [log.md](log.md)：記錄 wiki 整理過程的關鍵操作與決策。
→ [log-2026-04-29-launch.md](log-2026-04-29-launch.md)：啟動日完整進度報告。

## 隱私邊界

> **個人隱私、家人細節不放入此 wiki。**
> 跨域 Skill（jacky.brain.*、tbsa.*、nchu-*）只在 [`shuangyun/skills/双云技能索引.md`](shuangyun/skills/双云技能索引.md) 註記，不為它們建獨立頁。
