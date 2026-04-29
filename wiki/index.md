---
title: Jacky Wiki 總覽
domain: root
updated: 2026-04-29
---

# Jacky Wiki

**擁有者**：鐘基啟（Jacky）
**核心框架**：SOSTAC + AI First
**目前頁面數**：43（不含本頁）

## 知識域導航

| 域 | 說明 | 頁面數 | 連結 |
|---|---|:---:|---|
| ⭐ shuangyun | 双云行銷——品牌、行銷策略、客戶專案、AI Agent 體系 | 28 | [進入](shuangyun/index.md) |
| jwood | 基的木藝——綠檀穴道按摩棒、YouTube 內容自動化 | 6 | [進入](jwood/index.md) |
| jlife | Jacky 人生回憶錄——五卷書稿、儀表板、Facebook 28,715 events | 6 | [進入](jlife/index.md) |
| cross-domain | 跨域素材——共用模板、框架、可複用 | 2 | [進入](cross-domain/) |
| tbsa | TBSA 協會——活動、會員、倡議 | 0 | _尚未建立_ |
| nchu | 中興大學博士研究——論文、研究方法、文獻 | 0 | _尚未建立_ |
| yinian | 一念清涼——身心靈、冥想、修行紀錄 | 0 | _尚未建立_ |

## ⭐ shuangyun 域結構（最大域）

```
shuangyun/
├── index.md                   # 域首頁
├── concepts/  (5 頁)          # 方法論與框架定義
│   ├── AGENTS知識體系.md   # AGENTS® 六字訣 / 三級認證 / 三場景部署
│   ├── AGENTS認證手冊.md      # L1/L2/L3 評分表
│   ├── AGENTS方法論落地.md        # 双云專案落地狀態（API 路由、工廠藍圖 v2）
│   ├── AI行銷部定義.md         # AI 行銷部模型（4 Agent 委員會 / 老闆 1-4 / AI 5-8）
│   └── AI備課流程.md      # Jacky 的 AI 備課 7 階段流程
├── courses/   (6 頁)          # 双云 AI Agent 實戰課程教案
│   ├── 課程總覽.md, Week1拆.md, Week2建.md, Week3修.md, Week4串.md, Week5通.md
├── skills/    (13 頁)         # 双云域 Skill 集（涵蓋 22 個 Skill）
│   ├── index.md
│   ├── API調度總機.md, 評分Agent.md, 補完教練.md,
│   │   設定檔轉換.md, 集體智慧合併.md, 進度追蹤.md,
│   │   個人化殘酷測試.md, Jacky分身Agent.md, 客戶導入.md
│   └── 集成頁: SkillOS系統.md, 自動化流程.md, 品牌模板.md
├── cases/     (2 頁)          # 客戶專案紀錄
│   ├── 濂直火割烹.md, 晟光建設.md
└── sop/       (1 頁)          # 標準流程
    └── 找賣點SOP.md
```

## jwood 域結構

```
jwood/  (6 頁)
├── index.md                                 # 域首頁
├── todolist.md                              # 待辦狀態（含 2 個阻擋點）
├── concepts/  (3 頁)
│   ├── brand-overview.md                    # 品牌識別 / 創辦人 / 視覺 DNA
│   ├── agent-team.md                        # 11+2 Agent 團隊架構
│   └── content-strategy.md                  # Series A/B/C/D 並行 + 月度日曆
└── sop/       (1 頁)
    └── weekly-operations.md                 # 週一/週五自動排程 SOP
```

## jlife 域結構

```
jlife/  (6 頁)
├── index.md                                 # 域首頁
├── concepts/  (3 頁)
│   ├── 書的結構.md                          # D 版五卷 + E 版六卷職業身分版
│   ├── 旅行儀表板系統.md                    # 7 旅行儀表板 + 林小眼人物儀表板 + 技術架構
│   └── facebook資料架構.md                  # JSON 28,715 筆 events 解析
└── sop/       (2 頁)
    ├── 新增儀表板.md                        # extract → day_meta → build → Zeabur 部署
    └── 書稿編寫規範.md                      # Markdown / fb:標記 / author:pending
```

## 跨域素材

- [cross-domain/index.md](cross-domain/index.md)
- [cross-domain/賣點命名理論.md](cross-domain/賣點命名理論.md)

## 工作流程

```
inbox/  →  整理分類  →  wiki/<domain>/  →  raw/（原始備存）
```

**整理階段識別**

| 階段 | 動作 |
|---|---|
| Ingest | 從 OneDrive / 對話 / 文件抽取素材 |
| Categorize | 判斷屬於哪個域（concepts / courses / skills / cases / sop） |
| Cross-link | 建立雙向連結，避免內容重複 |
| Log | 在 [log.md](log.md) 記錄關鍵決策 |

## 操作日誌

→ [log.md](log.md)：記錄 wiki 整理過程的關鍵操作與決策。

## 隱私邊界

> **個人隱私、家人細節不放入此 wiki。**
> 跨域 Skill（jacky.brain.*、tbsa.*）只在 `skills/index.md` 註記，不為它們建獨立頁。
