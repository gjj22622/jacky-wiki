---
title: 多平台數據匯流 Dashboard Pipeline SOP
domain: education
visibility: team
min_tier: L2
updated: 2026-05-11
audience: 內部團隊（木酢寵物達人 + 双云行銷）
prerequisite: 基本 Google 帳號操作、知道什麼是 GitHub Actions
duration: 20 分鐘
tags: ETL, GA4, Meta Ads, 蝦皮, Google Drive, Google Sheet, Dashboard, 數據管道
source_chat: 2026-05-11 muzopet dashboard session — AI 建議系統上線後，整理數據接入流程
---

# 多平台數據匯流 Dashboard Pipeline SOP

> **核心思維**：有 API 的平台（GA4、Meta Ads）讓機器自動拉；沒有 API 的平台（蝦皮、官網 WACA）由人工月底下載 Excel 上傳到 Google Drive，讓 GitHub Actions 統一讀取。
>
> 所有數據最終匯流到**兩個地方**：
> 1. [中央 Google Sheet](https://docs.google.com/spreadsheets/d/1KfT4uBgBaNuhucEg5cyP3P6zis9DLT2au4xqmlMcHb8/edit)（供人工複查 + 歷史追蹤）
> 2. Repo 內的 JSON 快照（dashboard server 讀取，低延遲）

---

## 架構總覽

```
【有 API 的平台】
GA4 Data API ─────────────────────┐
Meta Graph API ────────────────────┤
                                   ├→ Python scripts → Google Sheet tab + data/xxx.json
【無 API 的平台】                   │
蝦皮後台 Excel（人工月底下載）──→ Google Drive ─→ auto_sync_gdrive.py ─┘
官網 WACA Excel（人工月底下載）──→ Google Drive ─→ auto_sync_gdrive.py ─┘

                    GitHub Actions（weekly-sync.yml）統一編排
                    ↓ commit timeline-offline.json + data-seed/
                    GitHub Repo → Zeabur webhook → 自動重部署
```

---

## 第一部分：各平台接入方式

### 1. GA4（有 API）— 自動

**工具**：Python `google-analytics-data` SDK + Service Account JWT

**取得方式**：
1. Google Cloud Console → 建立 Service Account
2. 下載 JSON 金鑰 → `base64 encode` → 存入 GitHub Secret：`GA_SA_KEY_B64`
3. GA4 管理介面 → 「帳戶存取管理」→ 將 SA email 加為「檢視者」
4. 環境變數：`GA_PROPERTY_ID=251264299`

**script 做什麼**（`scripts/fetch_ga_daily.py`）：
- 抓過去 400 天的日維度數據（渠道來源、裝置、到達頁 sessions/revenue）
- 寫入 Google Sheet「GA4-daily」tab
- dump 成 `data/ga-daily.json`（約 3.8MB，server 啟動時讀入記憶體）

---

### 2. Meta Ads（有 API）— 自動

**工具**：Meta Graph API（無第三方 SDK，用 Python urllib 直接呼叫）

**取得方式**：
1. Meta Business Manager → 系統用戶 → 產生長效 Token
2. 授權需要：`ads_read` + `ads_management`（最少權限）
3. 存入 `system/config.json` 的 `meta_access_token` 欄位（本機）或 GitHub Secret：`META_ACCESS_TOKEN`
4. 環境變數：`META_AD_ACCOUNT_ID=act_2164944420430248`

**script 做什麼**（`scripts/fetch_meta_daily.py`）：
- 抓過去 120 天帳戶層日指標（spend, impressions, clicks, purchase events）
- 抓過去 90 天廣告活動（campaign）層日指標（ROAS 計算用）
- 寫入 Google Sheet「Meta-daily」tab
- dump 成 `data/meta-daily.json`

---

### 3. 蝦皮（無 API）— 人工月底上傳

蝦皮目前無公開 API，需要**賣家後台手動匯出**。

**每月底操作步驟**：
1. 登入蝦皮賣場後台 → 「數據中心」→「廣告報表」
2. 下載格式：`蝦皮廣告-總體-數據-YYYY_MM_01-YYYY_MM_31.csv`（整月範圍）
   - ⚠️ **只下載整月檔**，不要週切片（GitHub Actions 會自動跳過週切片）
3. 另下載訂單明細：蝦皮後台「訂單管理」→ 匯出整月
4. 上傳到 Google Drive 指定資料夾（Folder ID 存在 Secret `GDRIVE_SHOPEE_FOLDER_ID`）

**自動處理**：GitHub Actions 讀取後，`scripts/shopee_agent.py` 解析 CSV → 月收/月廣告費/ROAS。

---

### 4. 官網 WACA（無 API）— 人工月底上傳

WACA 為台灣本土電商平台，API 不對外開放，需手動匯出。

**每月底操作步驟**：
1. 登入 WACA 後台 → 「報表」→「訂單報表」
2. 選整月範圍，匯出 Excel（`.xlsx`）
3. 上傳到 Google Drive 指定資料夾（Folder ID 存在 Secret `GDRIVE_WACA_FOLDER_ID`）

**自動處理**：GitHub Actions 讀取後，`generate_timeline.py` 解析 Excel → 月收/訂單數。

---

## 第二部分：自動化編排（GitHub Actions）

### `weekly-sync.yml` 執行流程

觸發時機：**每週一 10:00（台北）自動觸發 + 可手動在 Actions 頁面按「Run workflow」**

```
步驟 1：auto_sync_gdrive.py
  → 用 SA 金鑰連 Google Drive API
  → 下載最新蝦皮/WACA Excel 到 scripts/tmp_excel/（暫存，不 commit）

步驟 2：generate_timeline.py
  → 解析 tmp_excel 裡的 Excel
  → 彙總蝦皮月收、WACA 月收、Meta 廣告花費
  → 更新 Google Sheet 的 shopee/waca/ads tab
  → 產生 data/timeline-offline.json（月度彙總，dashboard 首頁用）

步驟 3：data_validator.py
  → 跨來源一致性驗證（允許失敗，不阻擋 commit）

步驟 4：cp data/timeline-offline.json data-seed/timeline-offline.json
  → ⚠️ 關鍵步驟（見下方「data-seed 陷阱」）

步驟 5：git commit + push → Zeabur webhook → 自動重部署
```

**manual trigger**：每次月底上傳完 Excel 後，到 GitHub → Actions → `Weekly Data Sync` → `Run workflow`

---

### `daily-snapshot.yml` — 每日快照

每天 00:30（台北）自動跑，不從 Drive 拉 Excel（那是月底才需要的），只跑：
- `fetch_ga_daily.py`（GA4 最新數據）
- `fetch_meta_daily.py`（Meta 廣告最新數據）

→ 更新 `data/ga-daily.json` + `data/meta-daily.json` + Google Sheet 對應 tab → commit push。

---

## 第三部分：Dashboard 如何讀取數據

### Server 端（Node.js）

```
Zeabur 部署時：
  1. server.js 啟動 → 從 data-seed/ 複製 JSON 到 data/（覆蓋舊版）
  2. 把 ga-daily.json / meta-daily.json / timeline-offline.json 讀入記憶體
  3. 各 /api/xxx 端點直接回傳記憶體中的 JSON
```

### 為什麼要有 data-seed/ 目錄？

Zeabur volume 每次重部署**不會清除**，但 Git 追蹤的 `data/` 在 container 重建時會被覆蓋。
`data-seed/` 是解法：它是 Git 追蹤的「數據種子」，server.js 啟動時自動 `cp data-seed/* data/`。

> **最常忘記的操作**：手動更新 `data/*.json` 之後，一定要 `cp data/xxx.json data-seed/xxx.json` 再 commit，否則下次重部署會倒退回舊數據。

---

## 第四部分：中央 Google Sheet 是什麼

[中央 Google Sheet](https://docs.google.com/spreadsheets/d/1KfT4uBgBaNuhucEg5cyP3P6zis9DLT2au4xqmlMcHb8/edit) 扮演**人工可讀的數據中台**：

| Tab | 寫入來源 | 更新頻率 | 用途 |
|---|---|---|---|
| GA4-daily | `fetch_ga_daily.py` | 每日 | 網站流量、渠道收益歷史 |
| Meta-daily | `fetch_meta_daily.py` | 每日 | 廣告花費、campaign ROAS 歷史 |
| shopee | `generate_timeline.py` | 每週一（月底後） | 蝦皮月收彙總 |
| waca | `generate_timeline.py` | 每週一（月底後） | 官網月收彙總 |

> Dashboard **直接讀 JSON**（低延遲），Sheet 是供**人工複查 + 跨月對帳**用。
> 兩邊數據應吻合；若有差異，以 Sheet 為準（GA4/Meta API 是原始來源）。

---

## 第五部分：環境變數一覽

| 變數名 | 用途 | 存放位置 |
|---|---|---|
| `GA_SA_KEY_B64` 或 `GDRIVE_SA_KEY_B64` | SA JSON base64（GA4 + Google Drive + Sheet 共用） | GitHub Secret + Zeabur 環境變數 |
| `GA_PROPERTY_ID` | GA4 property ID（`251264299`） | GitHub Actions env / Zeabur |
| `META_ACCESS_TOKEN` | Meta 系統用戶長效 token | GitHub Secret + `system/config.json`（本機） |
| `META_AD_ACCOUNT_ID` | Meta 廣告帳戶 ID（`act_2164944420430248`） | GitHub Actions env / Zeabur |
| `SHEET_ID` | 中央 Google Sheet ID | GitHub Secret |
| `GDRIVE_SHOPEE_FOLDER_ID` | Drive 蝦皮 Excel 資料夾 ID | GitHub Secret |
| `GDRIVE_WACA_FOLDER_ID` | Drive 官網 Excel 資料夾 ID | GitHub Secret |
| `ANTHROPIC_API_KEY` | Claude AI 建議系統 | Zeabur 環境變數 |

---

## 採坑點

### 坑 #1：蝦皮下載週切片會重複計算

**症狀**：`generate_timeline.py` 跑出來的月收是實際的 4–5 倍。

**原因**：蝦皮可以下載多種範圍（整月、每週切片）。`shopee_agent.py` 掃資料夾，如果同時有整月 + 週切片，會全部加總 → 重複計算。

**解法**：Drive 資料夾只放「整月 CSV」（`YYYY_MM_01-YYYY_MM_31` 格式）。週切片直接刪掉。

---

### 坑 #2：data-seed/ 忘記更新 → 重部署後數據倒退

**症狀**：月底手動更新了數據，但隔天 Zeabur 重部署後網頁顯示舊數據。

**原因**：server.js 啟動時從 `data-seed/` 覆蓋 `data/`，而 `data-seed/` 沒有跟著更新。

**解法**：每次更新 `data/*.json` 後，執行：
```bash
cp data/timeline-offline.json data-seed/timeline-offline.json
git add data-seed/timeline-offline.json
git commit -m "chore: sync data-seed"
git push
```

---

### 坑 #3：SA 金鑰未授權 GA4 Property

**症狀**：`fetch_ga_daily.py` 跑出 `403 Permission denied`。

**解法**：
1. GA4 管理介面 → 帳戶 → 帳戶存取管理
2. 新增 Service Account 的 email（格式：`xxx@project.iam.gserviceaccount.com`）
3. 給「檢視者」權限即可

---

### 坑 #4：Meta token 過期

**症狀**：`fetch_meta_daily.py` 跑出 `OAuthException: Session has expired`。

**原因**：系統用戶 token 雖然是「長效」，但 Meta 帳號密碼變更、2FA 變更或長時間未使用都可能過期。

**解法**：Business Manager → 系統用戶 → 重新產生 token → 更新 GitHub Secret `META_ACCESS_TOKEN` + `system/config.json`。

---

### 坑 #5：server.js 端點用未定義的 `method` 變數

**症狀**：Zeabur 回 502，console 看到 `ReferenceError: method is not defined`。

**原因**：server.js 整份都用 `req.method`，沒有宣告裸 `method` 變數。新加端點時不小心寫成 `if (method === 'GET')` 就會崩潰。

**解法**：加新端點前，統一用 `req.method`，加完後跑 `node --check server.js` 驗語法。

---

## 驗收 checklist

- [ ] GA4：`fetch_ga_daily.py` 跑完，Sheet「GA4-daily」tab 有今日數據
- [ ] Meta：`fetch_meta_daily.py` 跑完，Sheet「Meta-daily」tab 有今日數據
- [ ] 月底蝦皮：上傳整月 Excel 到 Drive → 手動觸發 `Weekly Data Sync` → timeline 月份正確
- [ ] 月底 WACA：同上
- [ ] Zeabur 重部署後：`/api/timeline-offline` 回傳的最新月份數據不倒退
- [ ] Dashboard overview 頁的月收進度條數字 = GA4 Sheet + shopee/waca Sheet 合計

---

## 延伸閱讀

- 架構決策：`cross-domain/跨域索引.md`（數據儀表板平台建置）
- AI 建議系統：`memory/project_recommend_system.md`（muzopet project memory）
- Server.js req.method 採坑點：同上（recommend system memory）
