---
title: Jwood 待辦清單
domain: jwood
updated: 2026-04-29
---

# Jwood 待辦清單

> 來源：`OneDrive/Jwood/todolist.md`（2026-04-23 + 2026-04-24 更新）
> 本頁是知識體版本——**只記下「現在處於什麼狀態 + 阻擋點是什麼」**。每日任務追蹤直接在 OneDrive 原檔。

---

## 🔴 唯一阻擋點

> **這兩件事不解，整套 Agent 系統跑不了。**

| # | 阻擋 | 處理方式 |
|:--:|---|---|
| 1 | `.env` 填入 `ANTHROPIC_API_KEY=sk-ant-xxxxx` | TypeScript agents 用 |
| 2 | `data/products/green_sandalwood/green_sandalwood_stick.json` 填入**實際售價**（`pricing.price_twd`） | 影響廣告 ROAS 計算 + LINE OA 自動報價回覆 |

---

## ✅ 已完成（2026-04-23 → 2026-04-24）

### 品牌運營團隊重組（2026-04-23）

- 設計完整 11+2 Agent 品牌運營團隊（13 個 Agent，[詳見](concepts/agent-team.md)）
- `main.ts` 重寫，整合全部 agents，支援 12 種執行模式
- `package.json` 更新所有 npm scripts
- 全部 agents 加入 prompt caching（節省約 90% token）
- 並行執行 ScriptWriter + SEOOptimizer

### 4 系列 EP01 影片 + 視覺資產（2026-04-24）

| Series | 主題 | 影片 | 縮圖 | IG 貼文 | SEO |
|:---:|---|:---:|:---:|:---:|:---:|
| A | 合谷穴（4.7 分鐘） | ✅ | ✅ | ✅ | ✅ |
| B | 木頭含水率（5.1 分鐘） | ✅ | ✅ | ✅ | ✅ |
| C | 選料眼光（3.0 分鐘） | ✅ | ✅ | ✅ | ✅ |
| D | 創辦人故事（6.8 分鐘） | ✅ | ✅ | ✅ | ✅ |

### 基礎建設

- 品牌資料庫 `data/brand_info.json`
- 產品資料庫 `data/products/green_sandalwood_stick.json`（售價未填）
- `crontab.txt`、`.env.example`、`CLAUDE.md`

---

## 🔲 待完成（按優先順序）

### 第一優先：上傳到 YouTube（**創辦人手動執行**）

- [ ] 上傳 Series A EP01（合谷穴）+ 縮圖 + SEO 文案（從 `output/seo/series_A_ep01.json`）
- [ ] 上傳 Series B EP01（木頭含水率）+ 縮圖 + SEO 文案
- [ ] 上傳 Series C EP01（選料眼光）+ 縮圖 + SEO 文案
- [ ] 上傳 Series D EP01（創辦人故事）+ 縮圖 + SEO 文案
- [ ] YouTube 頻道：更新「關於」頁面（穴道教學 + 木藝品牌定位）

### 第二優先：IG / LINE 發文

- [ ] 發 Series A/B/C/D IG 貼文（從 `output/ig_posts/series_*_ep01.png`）
- [ ] 加 IG caption（從各 SEO JSON 的 description 段落改編）
- [ ] LINE OA 廣播：新影片上線通知

### 第三優先：讓 TypeScript agents 跑起來

- [ ] **建立 `.env` 填入 `ANTHROPIC_API_KEY`**（唯一阻擋點，見上）
- [ ] `npm run director` — 先跑總監週報，確認下一批內容方向
- [ ] `npm run customer_service` — 建立客服知識庫
- [ ] `npm start` — 完整跑一遍所有 agents

### 第四優先：EP02 製作

- [ ] 為 4 個系列各寫 EP02 場景設定（`scene_config_{A/B/C/D}_ep02.py`）
- [ ] `npm run video_A`（改為 ep02 版本）生成 EP02 影片
- [ ] `npm run thumbnails` 重生成 EP02 縮圖

### 第五優先：數據回饋

- [ ] 拿到第一批 YouTube 數據（上傳後 1 週）
- [ ] `npm run analyse` — 分析哪個系列效果最好
- [ ] **依數據集中火力**製作效果最好的系列

---

## 🚀 未來擴充

- [ ] 串接 YouTube Data API 自動上傳影片描述與標籤
- [ ] 串接 GA4 + YouTube Analytics（讓 PerformanceAnalyst 直接抓真實數據）
- [ ] LINE OA 完整串接（購買問詢 → 自動回覆 + 跟進）
- [ ] 多語系擴充（日文 → 日本市場）

---

## 進度節奏判讀

| 時間點 | 應達成 | 訊號 |
|---|---|---|
| 第 1 週 | 4 支 EP01 上線、IG/LINE 同步 | YouTube 訂閱開始累積 |
| 第 2 週 | TypeScript agents 全部跑通、EP02 開拍 | npm start 不報錯 |
| 第 4 週 | 第一批數據回饋 → 集中火力 | analyse 報告產出 |
| 第 8 週 | 達月營收 NT$10 萬目標 | 40 單／月 |

---

## 相關連結

- 域首頁 → [木作索引.md](木作索引.md)
- Agent 團隊架構 → [concepts/agent-team.md](concepts/agent-team.md)
- 4 系列影片策略 → [concepts/content-strategy.md](concepts/content-strategy.md)
- 週排程 SOP → [sop/weekly-operations.md](sop/weekly-operations.md)
