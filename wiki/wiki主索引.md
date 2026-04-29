---
title: Jacky Wiki 總覽
domain: root
updated: 2026-04-29
---

# Jacky Wiki

**擁有者**：鐘基啟（Jacky）
**核心框架**：SOSTAC + AI First
**目前頁面數**：54（不含本頁）

## 知識域導航（5 個內容域 + 1 個跨域 + 1 個待建）

| 域 | 說明 | 頁面數 | 連結 |
|---|---|:---:|---|
| ⭐ shuangyun | 双云行銷——品牌、行銷策略、客戶專案、AI Agent 體系 | 28 | [進入](shuangyun/双云索引.md) |
| ⭐ jwood | 基的木藝——綠檀穴道按摩棒、YouTube 內容自動化 | 9 | [進入](jwood/木作索引.md) |
| jlife | 鐘基啟的人生回憶錄——成長脈絡、六個身分階段、跨域對應 | 9 | [進入](jlife/人生索引.md) |
| tbsa | TBSA 商務企劃協會——三大方法論、与双云人才循環 | 3 | [進入](tbsa/TBSA索引.md) |
| nchu | 中興大學博士研究——學術 Skill 體系、AI 重組學術根基 | 3 | [進入](nchu/中興博士索引.md) |
| cross-domain | 跨域素材——共用模板、框架、可複用 | 2 | [進入](cross-domain/跨域索引.md) |
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
shuangyun/  (28 頁)
├── 双云索引.md                # 域首頁（含起源前傳、TBSA 共生關係）
├── concepts/  (5 頁)
│   ├── AGENTS知識體系.md      # 六字訣 / 三級認證 / 三場景部署
│   ├── AGENTS認證手冊.md      # L1/L2/L3 評分表
│   ├── AGENTS方法論落地.md    # 双云專案落地狀態
│   ├── AI行銷部定義.md        # 4 Agent 委員會 / 老闆 1-4 / AI 5-8
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
tbsa/  (3 頁)
├── TBSA索引.md                # 域首頁（14 年弧線、与双云人才循環）
└── concepts/  (2 頁)
    ├── 三大方法論體系.md      # SOSTAC × SPEAKS × AGENTS
    └── 与双云的人才循環.md
```

## nchu 域結構

```
nchu/  (3 頁)
├── 中興博士索引.md            # 域首頁（入學時間軸、學術 Skill 概要）
└── concepts/  (2 頁)
    ├── 學術Skill體系.md       # 6 個學術 Skill 一覽
    └── AI重組學術根基.md      # 博士班 × AI 工作的雙線敘事
```

---

## 跨域素材

- [跨域索引](cross-domain/跨域索引.md)
- [賣點命名理論](cross-domain/賣點命名理論.md)

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

## 操作日誌

→ [log.md](log.md)：記錄 wiki 整理過程的關鍵操作與決策。
→ [log-2026-04-29-launch.md](log-2026-04-29-launch.md)：啟動日完整進度報告。

## 隱私邊界

> **個人隱私、家人細節不放入此 wiki。**
> 跨域 Skill（jacky.brain.*、tbsa.*、nchu-*）只在 [`shuangyun/skills/双云技能索引.md`](shuangyun/skills/双云技能索引.md) 註記，不為它們建獨立頁。
