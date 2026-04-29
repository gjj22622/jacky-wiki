---
title: Jwood 基的木藝
domain: jwood
updated: 2026-04-29
---

# Jwood 基的木藝

> **核心產品**：綠檀穴道按摩棒
> **月營收目標**：NT$10 萬（≈ 40 單 × NT$2,500）
> **流量策略**：YouTube 穴道按摩教學 → 自然帶入產品銷售
> **信任點**：郭台銘收藏品牌、經濟日報報導
> **官網**：[jwood.tw](https://jwood.tw)｜FB/IG @TWJwood｜YouTube @jwood7770

---

## 一句話定位

> **用穴道按摩教學吸引 YouTube 流量，把流量轉成綠檀按摩棒的銷售。**
>
> 不是賣木工品，是賣「解決痠痛的工具 + 收藏級木藝品」雙重價值。

---

## 子主題

- `concepts/`：品牌與系統定義
  - [品牌總覽](concepts/brand-overview.md) — 識別、創辦人、視覺 DNA、信任點
  - [Agent 團隊架構](concepts/agent-team.md) — 11+2 個品牌運營 Agent
  - [4 系列影片策略](concepts/content-strategy.md) — Series A/B/C/D 並行 + 月度日曆
- `sop/`：標準流程
  - [週排程 SOP](sop/weekly-operations.md) — 週一腳本 / 週五企劃自動化
- [todolist](todolist.md) — 目前待辦狀態與阻塞點

---

## 商業模式

| 環節 | 載體 | 工具 |
|---|---|---|
| 流量入口 | YouTube 穴道教學影片 | 4 系列並行（穴道 / 木藝 / 選料 / 創辦人） |
| 中繼點 | YouTube 描述 + IG + LINE OA | SEO 套件、IG 貼文、LINE 廣播 |
| 轉換 | jwood.tw 商品頁 + LINE OA 客詢 | Landing Page + FAQ + 關鍵字觸發 |
| 留存 | LINE OA + EDM | EmailMarketer Agent 廣播 |
| 數據回饋 | YouTube Analytics + GA4 | PerformanceAnalyst Agent |

---

## 系統現況（2026-04-29）

- ✅ 4 個 Series EP01 影片 + 縮圖 + IG 貼文 + SEO 文案 全部完成
- ✅ 11+2 個品牌運營 Agent 全部開發完畢
- ✅ Landing Page、IG 貼文、LINE 文案視覺資產備齊
- 🔲 **唯一阻擋點**：`.env` 填入 `ANTHROPIC_API_KEY` + 商品實際售價
- 🔲 **第一優先**：上傳 4 支 EP01 到 YouTube（創辦人手動執行）

> 詳細待辦見 [todolist](todolist.md)。

---

## 技術棧

- **TypeScript + Node 24** + Anthropic SDK（`claude-sonnet-4-6`）
- **Python**：Pillow + gTTS + ffmpeg（影片生產）
- **中文字體**：WenQuanYi Zen Hei
- **影片規格**：1920×1080，`libx264` + `aac`，gTTS `zh-TW`
- **Prompt caching**：節省 ~90% token 成本
- **排程**：crontab（週一 / 週五自動觸發）

---

## Jwood 的起源（前傳）

> **本域記錄的是「現在正在營運的品牌邏輯」**——產品、Agent 團隊、內容策略、商業模式。
> **Jwood 從 0 開始的歷程**（2017-2026 的 9 年演化：學木工 → 車床破百 → 華山參展 → 漆藝修煉 → 藏家社群 → 綠檀按摩棒商業化）記錄在：
>
> → **[jlife / 作品線 卷四](../jlife/stages/作品線_2015-2026.md)** — 「作品不說謊」
>
> 兩頁對應關係：
>
> | 本域（jwood）| jlife / 作品線 |
> |---|---|
> | 現在正在營運的品牌邏輯 | 從 0 變成這個品牌的演化歷程 |
> | 綠檀按摩棒商業模式（NT$10 萬/月目標）| 2019 學木工 → 2020 車床破百 → 2026 規模化 |
> | 11+2 Agent 自動化系統 | 「45 歲之後的修煉就決定是這個了」 |
> | 4 系列 YouTube 內容策略 | 從個人興趣 → 收藏級作品 → 商業品牌 |

---

## 域邊界

- **本域**：Jwood 品牌的所有經營議題（產品、內容、行銷、客服、數據）
- **與 jlife 的關係**：本域 = **現在的樣子**；jlife/作品線 = **如何長成現在這個樣子**
- **與双云的關係**：双云的 Agent 工廠方法論可借鑑，但 Jwood 是 Jacky 自己的木藝品牌，獨立經營
- **與 nchu 的關係**：創辦人有中興生科背景，無重疊
