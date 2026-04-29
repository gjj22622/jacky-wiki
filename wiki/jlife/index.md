---
title: jlife — Jacky 的人生回憶錄專案
domain: jlife
updated: 2026-04-29
---

# jlife — Jacky 的人生回憶錄專案

> **專案定位**：以數位足跡為底稿、以人生階段為骨架的個人回憶錄。
> **本機路徑**：`C:\Users\gjj22\老的好-回憶錄撰寫AI\`
> **GitHub**：[gjj22622/jacky-memoir](https://github.com/gjj22622/jacky-memoir)（private）
> **線上網址**：[jacky-memoir.zeabur.app](https://jacky-memoir.zeabur.app)
> **書名沿革**：「老的好」→「鐘基啟的回憶錄」（2026 改名）

---

## 一句話定位

> **一本：以數位足跡為底稿、以人生階段為骨架、以回望視角重組因果、讓「當時不知道、後來才知道」成為敘事核心的個人回憶錄。**

不是 Facebook 貼文彙編，不是成功學，不是企業家語錄集。

主要讀者：作者自己、家人、親友、團隊夥伴。

---

## 核心敘事角度

> **「一個人是怎麼被一路做出來的」**——不是先知道自己是什麼人才去做那些事，而是那些事先把你做成那個樣子。

### 兩個聲音（持續交替）

| 聲音 | 視角 | 內容 |
|---|---|---|
| **現場聲音** | 當時的我 | 貼近當時貼文與事件現場，保留原始語氣、情緒、幽默與狼狽 |
| **回望聲音** | 現在的我 | 補上背景與理解，說明當時沒有明講但今天看得出來的事 |

> **編輯原則**：先有事，再有想法。不能只有反思沒有事件。

---

## 子主題導航

### `concepts/`：核心概念

- [書的結構](concepts/書的結構.md) — D 版五卷 + E 版六卷職業身分版
- [旅行儀表板系統](concepts/旅行儀表板系統.md) — 7 旅行儀表板 + 林小眼人物儀表板 + 技術架構
- [facebook 資料架構](concepts/facebook資料架構.md) — JSON 匯出 28,715 筆 events 的解析

### `sop/`：標準流程

- [新增儀表板](sop/新增儀表板.md) — 從 extract 到 Zeabur 部署 + 10 條已知陷阱
- [書稿編寫規範](sop/書稿編寫規範.md) — Markdown 格式 / fb:YYYY-MM-DD / author:pending

---

## 系統三大組件

```
書稿                        互動式儀表板               Facebook 資料源
─────────                  ─────────────             ──────────────────
docs/manuscript/           旅行儀表板/                data/processed/
├── volumes/   (D 版)      ├── 2019-2025 旅行  (7)   facebook/
├── volumes-e/ (E 版)      ├── Jwood 品牌旅程         facebook_events_json_v2
└── archive/               └── 林小眼人物儀表板        .json (28,715 筆)

           ↓                      ↓                          ↓
                      好讀版閱讀器（Python serve.py / Zeabur Flask app.py）
                          雙版本切換（D / E）+ 三頁籤（卷目錄 / 儀表板 / 原始素材）
```

---

## AI 分工

| 角色 | 負責範圍 |
|---|---|
| **Codex** | 書稿內容編寫（持續更新 `docs/manuscript/volumes/`） |
| **Cowork** | 工具、閱讀器、輔助功能（serve.py、儀表板生成） |
| **Skills** | `autobiography-memoir-editor`、`travel-longstay-dashboard`、`jin-yong-wuxia` |

---

## 部署架構

```
本機                        GitHub                      Zeabur
老的好-回憶錄撰寫AI/         gjj22622/jacky-memoir       jacky-memoir.zeabur.app
├── 人物儀表板/    ──→      dashboards/people/    ──→   /people/<folder>/
├── 旅行儀表板/    ──→      dashboards/travel/    ──→   /travel/<folder>/
└── 同步到線上.bat          app.py (Flask)              自動部署 (3-5 min)
```

> 觸發方式：當 Jacky 說「**幫我部署**」，由 [新增儀表板 SOP](sop/新增儀表板.md) 執行。

---

## 域邊界

- **本域**：個人回憶錄、生命敘事、儀表板系統、Facebook 資料解析
- **與 jwood 的關係**：Jwood 品牌旅程是其中一個儀表板（2017-2026），但品牌經營議題在 [jwood 域](../jwood/index.md)
- **與 shuangyun 的關係**：双云行銷會出現在卷五「AI 不是工具而已，它把我整個重組了」中，但商業議題在 [shuangyun 域](../shuangyun/index.md)
- **隱私邊界**：本 wiki 只記錄專案結構與技術系統，**不複製書稿內容**。家人、親密關係細節僅在源專案，不放 wiki
