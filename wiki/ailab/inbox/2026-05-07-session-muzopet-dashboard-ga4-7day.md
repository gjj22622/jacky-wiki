---
session_date: 2026-05-07
session_topic: muzopet-dashboard GA4 7天即時看板設計與實作
model: claude-sonnet-4.6
context: 木酢寵物達人 muzopet-dashboard
duration: ~2h
type: session-summary
tags: ga4, dashboard, node-js, vanilla-js, svg-chart, 7-day-rolling, wow-comparison, zeabur
---

## 最終做法（What Worked）

**server.js — 5 並行 GA4 查詢，30 分鐘 cache**
- `13daysAgo` to `today` 撈 14 天 daily，`slice(-7)` 取最近 7 天；前 7 天作 WoW 基準
- 2 個 dateRanges（無 dimension）對比 KPI：rows[0] = 當週，rows[1] = 上週
- GA4 date string 格式 `YYYYMMDD`，用 `new Date(+ds.slice(0,4), +ds.slice(4,6)-1, +ds.slice(6,8))` 解析取星期幾
- 裝置分布為第 5 條 query，totalDev 加總後各設備計算 pct
- Node.js 24 zero-dependency（`node:crypto` RSA-SHA256 JWT + 原生 `fetch`）

**dashboard.html — 純 SVG 7 日趨勢圖**
- `viewBox="0 0 560 165" width="100%"` 自動響應寬度
- Session 用琥珀矩形，Revenue 用較窄綠色矩形疊加（opacity 0.72），視覺上形成雙層深度
- 最後一天（今天）用深色強調，前 6 天淺色
- SVG 字串 + HTML legend div 塞進同一個 `el.innerHTML`，不需 DOM 操作

**Skeleton KPI cards → live replace 載入模式**
- 頁面載入時先顯示 6 張「…」的同樣 CSS cards（無閃爍感）
- `fetch('/api/ga')` 成功後整個 `row.innerHTML` 一次替換
- WoW delta 用 `▲/▼ + .up/.down class` CSS 顯示顏色，delta 為 null 時不渲染

**裝置分布 segmented bar**
- `flex:${d.pct}` 讓 segmented bar 自動按比例，3 個 stat card 並排展示

**動態 insight box**
- 從 sources 陣列自動找最高 ROI 通路生成分析文字
- `display:none` 起始，只有 ROI > 1.2× 才顯示，避免 7 天無推播時出現誤導

## 繞路紀錄（Detours）

- 先對舊的「YoY KPI cards + 全年 2025 架構」做了增量加法（加第 4 個 query、加 KPI row），user 接著說「重新設計成 7 天」→ 全廢重寫更乾淨
- `Edit tool` 試圖 match 大段中文 server.js 失敗（context summary 壓縮後與磁碟實際內容有細微差異）→ 改 `Read + Write` 全覆寫才通
- 初版 daily trend 設計為 CSS flex bars，後改 SVG 讓 value label / 日期 / 星期標籤定位更精準，也避免 overflow clipping 問題

## 錯誤與失敗（What Failed）

- **`Edit tool` 大段中文 match 失敗**：old_string 含連續多行中文時，context 壓縮可能改變空白或字符，導致 match 失敗。解法：改用 Read 確認實際內容後 Write 全覆寫
- **GA4 WoW 防衛缺口**：「2 dateRanges + 無 dimension」假設 rows[0]/rows[1] 各對應一個 dateRange；若某週完全無資料（如長假），rows 可能少於 2 筆，`kpiPrev` 為 undefined，`wow()` 返回 null — 目前前端顯示空白不崩潰，但尚未補充服務端防衛

## 升格候選

- ⭐ **「GA4 WoW 對比：2 dateRanges 無 dimension → rows[0]/rows[1]」** → `ailab/patterns/模式索引.md` 補一條（已驗證）
- ⭐ **「Edit tool 大段中文匹配失敗 → 改 Write 全覆寫」** → `ailab/tools/claude-code.md` 雷區段補一條（已驗證，可立即升格）
- 「Skeleton KPI cards → fetch replace 載入模式」 → 留 inbox 觀察（多個專案驗證後升 patterns）
- 「SVG inline chart in vanilla JS dashboard」 → 留 inbox，Zeabur 上線後看實際效果再決定

## 待延伸（Next）

- **Zeabur 部署**：`base64` encode `ga4_service_account.json` → 設 `GOOGLE_SA_KEY_B64` 環境變數 → `docker compose up -d --build`（或 Zeabur Node.js service）
- 補全 GA4 `rows.length < 2` 的防衛處理（kpiPrev 為 undefined 時 wow 全回 null）
- 考慮 date range selector（7天 / 30天 / 本月）讓 user 動態切換
- GA4 rate limit 觀察（30min cache + 多人並用 Zeabur 場景）
- 更新 `muzopet-dashboard/CLAUDE.md`（已在此對話完成）
