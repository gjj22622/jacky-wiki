---
session_date: 2026-05-08
session_topic: muzopet dashboard v2 架構升級（即時 API → 中央 Sheet + JSON snapshot + 全自動部署）
model: claude-opus-4.7
context: 双云行銷 - 木酢寵物達人案例
duration: ~12h（接續 2026-05-04→07 的 v1，2026-05-08 整天密集 v2 升級）
type: session-summary
tags: dashboard, etl, google-sheet, zeabur, cron, validator, multi-brand-precursor
---

# Muzopet Dashboard v2 架構升級

> 接續 [2026-05-07_平台建置與Tool_Use升級](../log/2026-05-07_平台建置與Tool_Use升級.md) v1。本次 v2 把「dashboard 即時打 API」改成「ETL 每日 cron 落地 + 中央 Sheet + dashboard 讀本機 JSON」。同時建立全自動部署管線。

---

## 最終做法（What Worked）

### 1. 中央資料庫架構：Google Sheet 當 source-of-truth + JSON 當 server mirror

```
[GA4 + Meta API + Drive Excel]
      │
      ↓ Python ETL（GitHub Actions cron）
      │
      ├──→ Google Sheet「木酢數據中心」 (10+ tab)  ← 給 Jacky / 夥伴 / 客戶看
      │
      └──→ data/*.json (commit 進 git)
                ↓
          Zeabur webhook 自動 redeploy
                ↓
          server.js 讀本機 JSON（毫秒回應）
                ↓
          dashboard fetch /api/*
```

- **Sheet 是「人類後台」**：Jacky 直接打開做樞紐分析、跟客戶分享連結
- **JSON 是「server 用 mirror」**：dashboard 不讀 Sheet（Sheet API 200ms+ 慢），讀本機 JSON < 1ms
- **同個 Python ETL 雙寫**：保證 Sheet 跟 JSON 內容一致
- **Sheet 唯讀**（cron 每次覆蓋），不要在 Sheet 上手工編輯

### 2. 兩條 cron 自動化（GitHub Actions）

| Workflow | 排程 | 內容 |
|---|---|---|
| `daily-snapshot.yml` | 每天 04:00 UTC = 12:00 TPE | GA4/Meta/FB Page → Sheet + JSON + validator |
| `weekly-sync.yml` | 週一 02:00 UTC = 10:00 TPE | Drive Excel → timeline-offline.json + Sheet 月度 tab |

cron 跑完 commit 進 main → Zeabur git auto-deploy webhook 自動 redeploy → dashboard 立刻拿到新數字。**完全無人介入**。

### 3. Zeabur git auto-deploy webhook

設定一次後，main branch 任何新 commit 自動觸發 Zeabur redeploy。**deploy.ps1 從此不再是日常 SOP**（留作應急工具）。驗證方式：trivial commit push + 90 秒後 deployment ID 自動更新。

### 4. 各個 agent 模組化（Python）

| Script | 職責 |
|---|---|
| `sheet_writer.py` | Sheets API helper（clear + batch update） |
| `fetch_ga_daily.py` | GA4 拉 daily metrics + sources/devices/landing |
| `fetch_meta_daily.py` | Meta 拉 daily account + campaigns |
| `fetch_facebook_page.py` | FB Page Insights（依賴 Business Manager grant page） |
| `shopee_agent.py` | 蝦皮廣告 csv 解析（自動 skip 週切片只取整月） |
| `generate_timeline.py` | Excel → 月度 timeline + 寫 Sheet |
| `data_validator.py` | 7 項跨來源校驗 → validation_report tab |
| `auto_sync_gdrive.py` | Drive 同步（也抓 .csv） |

### 5. data_validator.py — 7 項跨來源校驗 agent ⭐

寫了一個獨立 agent 跑：
1. 月度全店收益對齊（GA4 + 蝦皮）
2. WACA vs GA4 比例（attribution 校準）
3. Meta spend / GA4 meta_paid sessions 一致性
4. 蝦皮補貼比例 < 10%
5. 蝦皮直接歸因 ≤ 全店實收（基本邏輯）
6. 缺月份檢查
7. 異常 spike（> 3× 平均）

寫 `validation_report` tab + stdout summary。**第一次跑就抓到既有 bug**：蝦皮 2026-04 直接歸因 24,328 > 全店實收 4,400（parse_shopee 對「按日 detail」shop-stats 檔誤判）。

### 6. server.js 從「打 API + cache」改成「讀 JSON」

- `fetchGAData / fetchMetaData / fetchTimeline` 三個函式全部重寫成讀本機 JSON
- 拿掉 `_gaCache / _metaCache / _tlCache` + startup warmup（不需要了）
- 所有 endpoint hot 80ms 級
- `/api/ga` `/api/meta` response 加 `dataRange: { min, max }` 給前端 picker 動態 set min/max
- admin api-status 改用 `statSync` mtime（不 parse 1.16MB JSON），1.2s → 80ms

### 7. dashboard UX 補完

- shopee.html / waca.html 獨立配色（橘 #FF6633 / 棕 #8C5A35）
- 7 link nav 全頁同步（首頁 / 官網 / 蝦皮 / GA4 / Meta / AI 顧問 / 工廠）
- date picker 加「昨天」+「自訂…」+ min/max 動態
- overview.html 加「📦 月度資料新鮮度」面板
- meta.html 加「📘 粉絲團」section（待 Jacky grant page asset 才有資料）

### 8. GA4 fetch 範圍延伸到 400 天

從 120 天改 400 天，涵蓋 WACA earliest 2025-04 → 2026-05-07。
ga-daily.json 從 1.16MB → 4.1MB。透過 `GA_FETCH_DAYS` env override 可調。

---

## 繞路紀錄（Detours）

### 1. 「dashboard 直接讀 Sheet」→ 改「讀本機 JSON」
原想 dashboard 直接讀 Sheet（最直接的「Sheet 當 DB」），但 Sheets API 200-500ms / call 比讀檔慢 100x +依賴外部 token。改成「ETL 雙寫 Sheet + JSON，server 讀 JSON」。

### 2. 「server-side warmup」→ 「直接拿掉 cache」
為解決 cold cache 1.2s 卡頁，第一版加 startup warmup（boot 後 prefetch 三大 cache）。後來發現「改用 JSON 讀檔毫秒回應」根本不需要 cache 跟 warmup —— 直接砍 200 行 cache code 跟 warmup logic。

### 3. fetchTimeline 也想打 GA4 monthly
原本 fetchTimeline 內部跑 GA4 monthly query + Meta monthly + offline JSON 三個 promise。後來統一從「daily JSON 內已預先 aggregate 過的 monthlyAggregate」讀，省掉 6 個 GA4 query。

### 4. GA4 fetch 120 天 → 400 天
第一版只抓 120 天（涵蓋常用 90d 比較區間）。Jacky 後來說「往前抓到 WACA earliest」 → 改 400 天 涵蓋 2025-04。

### 5. 「Sheet 由 Python 自動建」→ 「Jacky 自己建給我 ID」
原本想 SA 自動在 Drive 建 Sheet，後來改 Jacky 自己建（Sheet 名字 / 位置 / 共用設定他控制），把 ID 給我設成 GitHub Secret。

### 6. PowerShell `cd` 失效 → `deploy.ps1 帶 $PSScriptRoot`
PowerShell 每個 tool call 是獨立 session，前一條 `cd` 不會延續到下一條。導致 `npx zeabur deploy` 在錯誤 cwd 跑、抓到上次 image cache（看似成功實際舊版）。建 `deploy.ps1` 用 `$PSScriptRoot` 自動切到 script 所在目錄。

### 7. force push master:main 同步分歧
muzopet_Agent repo 的 main（GitHub default branch）跟 master（本機開發 branch）完全分歧（main 只有一個 GitHub 自動 Initial commit）。導致 GitHub Actions `workflow_dispatch` 找不到 workflow（必須在 default branch）。force push master:main 一次同步。之後 SOP 改成每次 push 兩條 branch。

### 8. Zeabur volume 蓋掉打包資料 v2
volume mount `/src/data` 把 image 內 data/ 蓋掉。即使 commit 新 timeline-offline.json + zeabur deploy，線上版仍是初版 seed。修法：
- server.js seed loop 對「衍生資料」（4 個 .json 檔）改成 always overwrite
- workflow auto-commit 同步寫 data-seed/（讓 image build 帶上最新 seed）
- token (users.json) 不在 seed 白名單裡 → 不會被誤蓋

---

## 錯誤與失敗（What Failed）

### 1. parse_shopee 對「按日 detail」shop-stats 檔誤判（驗證器抓到）
`muzuopet.shopee-shop-stats.20260401-20260430.xlsx`（184KB 異常大）是「按日 row」格式，不是按月。regex 抓 ym 後反覆覆蓋成最後一日 4/30 的 4,400 → 整個 4 月 revenueNet 變 4,400。validator agent 在跨來源 check「直接歸因 ≤ 全店」抓出 24,328 > 4,400 異常。**待修**（下次優先）。

### 2. 第一次 ExitPlanMode 被 Jacky 連續 reject 兩次
Jacky 連續中斷我兩次 ExitPlanMode（auto-deploy 設定前 + Sheet 中央 DB 設計後），表示他不想看 modal、想直接動手。學到：plan 完才 ExitPlanMode 是過程；如果 plan 已被 AskUser 確認過，後續可以更直接 ExitPlanMode 或乾脆動手不問。

### 3. Sheets API 沒先在 GCP project 啟用
第一次 fetch_ga_daily.py 跑到 Sheet 寫入 step 時 403 — Sheets API 沒在 apt-retina-400104 project 啟用。Jacky 點啟用按鈕後解。**模式**：每用一個新 GCP service 都要先在 project 啟用對應 API。

### 4. 第一個 fetch_ga_daily.py edit 留下重複 else block 導致 SyntaxError
我用 Edit 工具改 try/except 邏輯時沒清乾淨，留下兩個 `else:` 導致 GitHub Actions 第一次跑 SyntaxError fail。修一行刪 4 行就好。教訓：大段 Edit 後 `python -c "ast.parse(...)"` 驗 syntax 再 commit。

### 5. fetchTimeline 改寫初版 cache 變數沒設 expiry
舊版 `_tlCache` 有 expiry check 但沒設 expiry 值（永遠失效），導致每次 hit 都重新跑 GA4 monthly query。後來改成讀 JSON 後這 bug 自動消失。

### 6. PowerShell 讀含中文 JSON ConvertFrom-Json 編碼壞掉
`Get-Content C:\...\config.json -Raw | ConvertFrom-Json` 中文字元解析失敗。改 hardcode 該值或從別的方式讀。教訓：PowerShell 處理中文 file 慎用 `ConvertFrom-Json`。

---

## 升格候選

### ⭐ 升格 cross-domain/數據儀表板平台建置指南.md → v2

把這次 v2 大改寫進 v1 既有指南：
- 「即時 API」→「ETL + Sheet + JSON snapshot」架構升級段
- daily-snapshot + weekly-sync 兩條 cron 設計
- Zeabur git auto-deploy webhook 機制
- data_validator agent 7 項校驗（新增章節）
- 多品牌 onboarding 預備章節（見下方獨立 inbox）

### ⭐⭐ 升格 ailab/patterns/「資料校驗 agent 設計模式」（新建）

跨來源 + 跨期間的資料一致性 check 是個獨立模式：
- 7 種典型 check 類型（對齊 / 比例 / 一致性 / 邏輯 / 缺漏 / 異常 spike / 補貼）
- 寫 Sheet validation_report 給人類 review
- 加進 cron 流程當品保關卡
- exit code 控制（fail 不擋 commit 但會 flag）
**這是可重用的模式，10 個品牌都用得到。**

### ailab/tools/claude-code.md 雷區段補
- PowerShell tool call 是獨立 session，cd 不持續（用 $PSScriptRoot）
- Edit 大段後要 syntax check 再 commit

### ailab/tools/zeabur.md（如有）補
- Volume mount 蓋掉打包資料的 always-overwrite seed loop 策略
- git auto-deploy webhook 設定
- 啟用 webhook 後 deploy.ps1 不再日常用

### 不升格的（留 inbox）
- master/main 雙 branch 同步策略 — 太 specific 給某一 repo，已寫進 muzopet-dashboard memory 即可
- shopee_agent 整月 vs 週切片邏輯 — 蝦皮特化，不通用

---

## 待延伸（Next）

### 立即優先
- **第二個品牌 dashboard onboarding** — Jacky 開始做下一個品牌（預計總共 10 個），要設計平台化 scaffold
- **HP 24/7 Linux 機器 setup** — 本機解放後接續開發
- **FB 粉絲團** — Jacky grant page asset 後手動 trigger workflow 補資料
- **修 parse_shopee「按日 detail」誤判** — validator 抓到的蝦皮 2026-04 4,400 異常

### 中期觀察
- 觀察 daily-snapshot cron 連續 1 個月穩定運作
- Validator 跨月跑下來會發現多少資料 anomaly（評估 7 項 check 是不是夠 / 要加哪些）
- 多品牌部署後，Sheet 中央資料庫的 query 模式需不需要做「跨品牌總覽」

### 長期規劃
- 多品牌 platform 化（見 [2026-05-09-多品牌dashboard平台架構設計](2026-05-09-多品牌dashboard平台架構設計.md)）
- AI 顧問頁的「跨品牌洞察」（如有 10 個品牌 → 比對表現）

---

## 連結與出處

- v1 log：[2026-05-07_平台建置與Tool_Use升級](../log/2026-05-07_平台建置與Tool_Use升級.md)
- 客戶案例：[shuangyun/cases/木酢寵物達人](../../shuangyun/cases/木酢寵物達人.md)
- 平台建置指南：[cross-domain/數據儀表板平台建置指南](../../cross-domain/數據儀表板平台建置指南.md) ← 待升格 v2
- 線上：https://muzopet-dashboard.zeabur.app
- repo：https://github.com/gjj22622/muzopet_Agent
- 中央 Sheet：https://docs.google.com/spreadsheets/d/1KfT4uBgBaNuhucEg5cyP3P6zis9DLT2au4xqmlMcHb8

### 今日 commits（master = main 同步）
`8715c4d` admin api-status 加速 → `966ba25` GA/Meta JSON 架構大改 → `f916a6a` syntax fix → `ae54414` (bot daily snapshot) → `f6361fd` 4 需求 + Sheet 補完 + validator + FB Page → `606f7c3` (auto-deploy 測試) → `(2026-05-08 後續)`
