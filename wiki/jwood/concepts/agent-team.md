---
title: Jwood Agent 團隊架構（11 + 2）
domain: jwood
updated: 2026-04-29
---

# Jwood Agent 團隊架構（11 + 2）

> **2026-04-23 重組**：完整 11-Agent 品牌運營團隊；加上 Director（總監）和 PerformanceAnalyst（數據回饋），實際運作為 13 個 Agent。
> 來源：`OneDrive/Jwood/CLAUDE.md` + `OneDrive/Jwood/todolist.md`

---

## 一張圖看懂

```
                 Director（總監 / 收益優先）
                        │
                        ▼
              ┌─── 週策略簡報 ───┐
              │  KPI = NT$10萬/月 │
              └──────┬──────────┘
                     │ 任務分配
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
   研究/規劃       生產層           銷售/行銷
   ─────────      ─────────         ─────────
   BrandResearcher ScriptWriter    SalesCopywriter
   ContentStrategist SEOOptimizer  AdCopywriter
                  ThumbnailCopywriter EmailMarketer
                  ShortFormAdapter
                              │
                              ▼
                     互動 / 客服層
                     ─────────
                     CommunityManager
                     CustomerService
                              │
                              ▼
                     PerformanceAnalyst
                     （數據回饋 → 餵回 Director）
```

---

## 完整 Agent 清單（13 個）

| # | Agent | 指令 | 功能 |
|:--:|---|---|---|
| 1 | **Director** | `npm run director` | 週策略簡報，分配各部門任務（KPI = NT$10萬/月，**收益優先**） |
| 2 | BrandResearcher | `npm run research` | 競品追蹤、市場情報 |
| 3 | ContentStrategist | `npm run content` | 4 週 8 支影片內容日曆 |
| 4 | ScriptWriter | `npm run script` | 5-8 分鐘穴道教學腳本 |
| 5 | SEOOptimizer | `npm run seo` | YouTube 標題／描述／標籤優化 |
| 6 | ThumbnailCopywriter | `npm run thumbnail` | 縮圖文字 A/B/C 測試 |
| 7 | ShortFormAdapter | `npm run shorts` | 長片 → Shorts/Reels 改編 |
| 8 | SalesCopywriter | `npm run sales` | 商品頁／FB／IG 銷售文案 |
| 9 | AdCopywriter | `npm run ads` | 付費廣告文案（FB/IG） |
| 10 | EmailMarketer | `npm run email` | LINE 廣播 + EDM |
| 11 | CommunityManager | `npm run community` | 留言策略 + 週互動計畫 |
| 12 | CustomerService | `npm run cs` | FAQ + LINE OA 關鍵字觸發 |
| 13 | **PerformanceAnalyst** | `npm run analyse` | 數據分析 + 優化建議報告 |

> **+ Sub Agent**：`videoDirector`（用 Claude API 生成場景設定 → 執行 Python 影片生產器）。

---

## 運作流程（一週一輪）

```
週一 09:00
  Director 產週策略簡報
       │
       ├─→ ContentStrategist 補完月度日曆
       ├─→ ScriptWriter 寫腳本
       └─→ SEOOptimizer + ThumbnailCopywriter 並行（共用 cache）

→ 創辦人拍攝（3-7 天）

→ 創辦人手動上傳 YouTube
       │
       ├─→ ShortFormAdapter 產 Shorts
       ├─→ SalesCopywriter 同步商品頁
       └─→ AdCopywriter 產 FB/IG 廣告文案

→ 影片上線後
       │
       ├─→ EmailMarketer LINE 廣播 + EDM
       ├─→ CommunityManager 留言策略上線
       └─→ CustomerService FAQ 觸發即時回覆

→ 上線 1 週後
       └─→ PerformanceAnalyst 數據回饋 → Director 下週調整
```

---

## 設計原則

### 收益優先（Director 的 KPI）

> Director 不是寫漂亮的策略，是**緊盯 NT$10 萬/月**這條紅線。每週的策略簡報都要回答「這週做什麼能讓我們更接近 40 單」。

### 並行執行（節省時間）

`main.ts` 並行跑 ScriptWriter + SEOOptimizer，因為兩者都從相同的 brandContext 讀資料，可以共用 cache。

### Prompt Caching（節省 ~90% token）

所有 Agent 都使用 `cache_control: { type: "ephemeral" }`——重複的品牌脈絡（brandContext、產品資料）只算一次費用。

### 共享 brandContext

`src/brandContext.ts` 是所有 agents 都 import 的共享資料。改一次，所有 Agent 同步。

---

## 12 種 npm 執行模式

```
npm start              # 完整執行所有 agents
npm run director       # 總監週報
npm run research       # 品牌市場研究
npm run content        # 內容日曆
npm run script         # 影片腳本
npm run seo            # SEO 優化
npm run thumbnail      # 縮圖文字 A/B/C
npm run shorts         # Shorts/Reels 改編
npm run sales          # 銷售文案
npm run ads            # 廣告文案
npm run email          # LINE 廣播 + EDM
npm run community      # 留言策略
npm run cs             # FAQ + LINE OA
npm run analyse        # 績效分析
```

---

## 觸發前提

| 條件 | 狀態 |
|---|---|
| `.env` 填入 `ANTHROPIC_API_KEY=sk-ant-xxxxx` | 🔲 **阻擋中** |
| `data/products/green_sandalwood/green_sandalwood_stick.json` 填入實際售價 | 🔲 **阻擋中** |
| Node v22.22.2（建議升 v24） | ✅ |
| `--experimental-strip-types`（不需編譯） | ✅ |

> 兩個阻擋點解決後，`npm start` 即可一次跑完全部 13 個 Agent。

---

## 相關連結

- 4 系列影片策略 → [content-strategy.md](content-strategy.md)
- 週排程 SOP → [../sop/weekly-operations.md](../sop/weekly-operations.md)
- 待辦狀態 → [../todolist.md](../todolist.md)
