---
event: 多品牌 dashboard 平台架構設計（10 品牌路線圖）
date: 2026-05-09
model: claude-opus-4.7
context: 双云行銷 - 預計 10 個客戶品牌複製 muzopet 模式
type: 模式發現
maturity: 想法
tags: platform, multi-brand, scaffold, onboarding, parameterization
---

## 發生了什麼

Jacky 完成 muzopet（第一個品牌）dashboard v2 架構升級後，宣告下一階段要做 10 個品牌。
要從「single-brand bespoke」演化成「**parameterized platform**」— 同個 codebase 服務多品牌，每個品牌一個 Zeabur service + 一個 Google Sheet + 獨立 token。

## 為什麼重要

如果照「複製 muzopet repo + fork 改」做 10 次：
- 共用更新（如 server.js 修 bug）要 cherry-pick 到 10 個 fork 上 → 維護地獄
- 10 個 GitHub Secrets 群、10 個 Zeabur service 配置 → 容易跑錯品牌
- 客戶 onboarding 沒 SOP → 每次靠記憶

平台化後：
- ✅ 一個 codebase 改一次 → 10 個品牌同步生效
- ✅ 一份 onboarding checklist → 新品牌 1-2 小時上線
- ✅ 跨品牌洞察成為可能（10 個品牌的數字一起看）

## 怎麼做的（建議架構 — 待 Jacky 拍板）

### 整體：「一個 repo + 多個 Zeabur service + GitHub Environments」

```
brand-dashboard-platform repo (現有 muzopet_Agent 改名 / 衍生)
├── server.js              ← 讀 process.env.BRAND_ID 載入對應配置
├── brand-configs/
│   ├── muzopet.json       ← UI 顏色 / logo / 字型 / 文案 / GA4 property / Meta account
│   ├── brand-2.json
│   └── ... (10 brands)
├── scripts/               ← Python ETL 共用，從 env 讀品牌特定值
├── data/<brand>/          ← Zeabur volume 內，每品牌獨立子資料夾
└── .github/workflows/
    └── daily-snapshot.yml ← strategy matrix 跑 10 個品牌
```

### Brand-specific 走 env，UI 走 config 檔

| 走 env（敏感 / 常變）| 走 brand-configs/<brand>.json（公開 / 不變）|
|---|---|
| `BRAND_ID` | 顏色色票（蝦皮 / WACA 顏色） |
| `SHEET_ID` | logo 路徑 |
| `GA_PROPERTY_ID` | 字型 |
| `META_ACCESS_TOKEN` | 預設區間 / Insight 文案 |
| `META_AD_ACCOUNT_ID` | 啟用哪些 channel（蝦皮 / WACA / Meta / GA4 / FB Page） |
| `ADMIN_SECRET` | Sheet tab 命名前綴 |
| `GDRIVE_SHOPEE_FOLDER_ID` | UI 顯示用品牌名稱 |
| `GDRIVE_WACA_FOLDER_ID` | |
| `ANTHROPIC_API_KEY`（共用 OK 或品牌獨立）| |

### GitHub Actions matrix 跑多品牌

```yaml
jobs:
  snapshot:
    strategy:
      matrix:
        brand: [muzopet, brand-2, brand-3, ...]
    environment: ${{ matrix.brand }}   # 每個 brand 一個 GitHub Environment
    env:
      SHEET_ID: ${{ secrets.SHEET_ID }}
      GA_PROPERTY_ID: ${{ secrets.GA_PROPERTY_ID }}
      META_ACCESS_TOKEN: ${{ secrets.META_ACCESS_TOKEN }}
      ...
    steps:
      - run: python scripts/fetch_ga_daily.py
      - run: python scripts/data_validator.py
      ...
```

每個 GitHub Environment 有自己的 secrets。Workflow 跑 10 次，每次帶不同 brand 的 secrets。

### Zeabur 部署：1 repo → N 個 service

每個品牌一個 Zeabur service（同一個 repo 不同 deployment），各自 env：
- `muzopet-dashboard.zeabur.app`：env BRAND_ID=muzopet
- `brand2-dashboard.zeabur.app`：env BRAND_ID=brand-2
- ...

Zeabur git auto-deploy 設定每個 service 都連 main branch → push 觸發 N 個 service 重 deploy（耗時但乾淨）。

### Onboarding checklist（每個新品牌 1-2 小時）

#### 客戶端（30 分鐘）
1. **GA4**：Property ID 給 Jacky；GA4 後台 admin → 服務帳戶 → 加 SA `muzopet-analytics@apt-retina-400104.iam.gserviceaccount.com` 為 viewer
2. **Meta**：Business Manager → 系統用戶 muzopet-api → 新增資產：Ad Account（給 read insights）+ Page（給 Insights）
3. **Drive**：把蝦皮 Excel + 官網 Excel 共用給 SA reader

#### Jacky 端（30-40 分鐘）
1. **建中央 Sheet**「<品牌>數據中心」→ 加 SA editor → 拿 Sheet ID
2. **建 Drive 父資料夾**「<品牌>資料」+ 子資料夾「蝦皮」「官網」（如有）→ 拿 folder IDs
3. **建 brand-configs/<brand>.json**（從 muzopet.json 複製改顏色 / logo / 啟用 channel）
4. **開 GitHub Environment `<brand>`** → 設 secrets：SHEET_ID / GA_PROPERTY_ID / META_ACCESS_TOKEN / META_AD_ACCOUNT_ID / GDRIVE_*_FOLDER_ID / ADMIN_SECRET
5. **加進 daily-snapshot.yml matrix** 一行
6. **Zeabur 建 service** 連 repo + 設 env BRAND_ID + ADMIN_SECRET + ANTHROPIC_API_KEY
7. **DNS**（如要自訂 domain）/ 或用 zeabur.app subdomain

#### 驗證（10 分鐘）
1. `gh workflow run daily-snapshot.yml --ref main` 手動觸發
2. 看 Sheet 8-10 個 tab 寫入
3. open `<brand>-dashboard.zeabur.app/login.html` 拿 admin 設 token
4. 進 dashboard 看數字 OK

## 對比與替代

| 方案 | 優 | 缺 |
|---|---|---|
| **A. 一個 repo + 多 Zeabur service**（推薦）| 共用更新即時、配置走 env、matrix workflow | Zeabur 要設 N 個 service（小麻煩） |
| **B. 每品牌一個 fork repo** | 獨立完全乾淨 | 共用更新 cherry-pick 地獄、10 個 repo 維護 |
| **C. mono-repo sub-folder（brands/muzopet/）** | 程式碼整齊 | 部署複雜（每個 sub-build） |

選 A 在「平台化」與「實作簡單」之間最 balance。

## 連結與出處

- 第一個品牌實作：[shuangyun/cases/木酢寵物達人](../../shuangyun/cases/木酢寵物達人.md)
- v1 平台建置指南：[cross-domain/數據儀表板平台建置指南](../../cross-domain/數據儀表板平台建置指南.md)
- v2 升級 session：[2026-05-08-session-muzopet-v2-架構升級](2026-05-08-session-muzopet-v2-架構升級.md)
- 模式：[Commander+Executor 單人多 Agent 模式](../../cross-domain/Commander+Executor單人多Agent模式.md)（多品牌時 Jacky 是 Commander）

## 升格目標

**已驗證後**升格 `cross-domain/數據儀表板平台建置指南.md` v3：
- 加「多品牌 platform 化」章節（onboarding checklist + matrix workflow + brand-config 抽象）

實作驗證後（第 2-3 個品牌跑通），同時更新：
- `shuangyun/AGENTS知識體系/` 補「品牌 dashboard onboarding SOP」
- `ailab/patterns/多品牌資料平台.md`（新建模式）

**先留 inbox** — 等 Jacky 拍板架構選擇 + 第 2 個品牌實作完成才升格。
