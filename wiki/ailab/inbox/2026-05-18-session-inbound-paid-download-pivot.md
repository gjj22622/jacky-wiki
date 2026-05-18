---
session_date: 2026-05-18
session_topic: email outreach 策略終止 → inbound 付費下載模型完整落地
model: claude-sonnet-4.6
context: AgentFlow Solutions — 明察行銷產品線
duration: ~4h（跨夜，Jacky 收工後自主執行）
type: session-summary
tags: mingcha, inbound, paywall, purchase, sprint5, moa-pet-food, ir-email, outreach
---

## 最終做法（What Worked）

### 策略轉向決策路徑

Jacky 宣告 Gmail 被封、主動叫 J董「做做功課」→ J董研究 CB Insights/Statista/Morning Consult 模式 → 提出三層漏斗方案 → Jacky 確認。

決策邏輯：
- 台灣情報公司全走「詢價 → 人工流程」→ 透明定價 + 自助付費是空缺
- Email outreach 可規模性差 + 封鎖風險；內容 SEO 一篇無限次觸達
- 免費預覽必須「真實有料」（空洞 teaser 轉換率趨近 0）

### 付費下載三層漏斗

```
Layer 1：AEO 備忘錄 + /reports → SEO/Google/AI 搜尋流入
    ↓
Layer 2：樣本報告免費預覽（執行摘要 + 2-3 個數字亮點 + 1 張表格）
    ↓
Layer 3：/purchase 自助付費（銀行轉帳 → 人工確認 → 24hr PDF）
```

### 技術落地清單

1. `public/purchase.html` — 三步驟流程、5 份報告卡片定價、玉山808連城帳號、LINE Pay 預告、動態備注 JS（`selectReport()` 自動填寫轉帳備注）
2. 三份報告 CTA 統一改版（building-materials / food / medical）：
   - sample-banner 連結 → `/purchase`（附 NT$3,800 文字）
   - 第一層 paywall → `NT$3,800 · 立即下載完整版`
   - 第二層 paywall → `NT$3,800 · 立即下載完整版`
3. sitemap 加入 /purchase + building-materials-sample-zh
4. 定價確認：NT$3,800/份（中文）、USD$149（英文）；銀行：玉山銀行808連城 0808-940-030038 双云行銷有限公司

### tw-opendata-mcp Sprint 5

moa-pet-food（農業部 moa-93834）：
- 8,212 筆（3,128 商業登記 + 5,084 個人業者）
- 新北 1,528 / 台中 1,275 / 台北 1,169 / 高雄 1,078
- PR#3 feat→dev→main merged
- Muzopet 競爭分析 + B2G 交叉比對直接可用

---

## 繞路紀錄（Detours）

### 建材業 IR 信箱全部猜錯（三封）

| 公司 | 猜測（錯） | 實際（正確） | 查詢方式 |
|---|---|---|---|
| 豐興鋼鐵 | ir@fengshinsteel.com.tw | fha20@ms22.hinet.net | MOPS 重大訊息 → spokesperson 成德懿 |
| 永記造漆 | ir@yungchi.com.tw | vickyhchen@mail.rainbowpaint.com.tw | 品牌 domain 是 rainbowpaint.com.tw（虹牌）|
| 台灣玻璃 | ir@taiwanglass.com.tw | tgi@taiwanglass.com | Domain 是 .com 非 .com.tw；spokesperson 林嘉明 |

教訓：**先查 MOPS 重大訊息公告「重要訊息之聯繫人員及電話」欄位，不要猜 IR domain**。

### Sprint 5 第一次選錯資料集

先嘗試 dataset-8938（食品業者460K筆）→ 原始檔 ZIP 壓縮 CSV → Parquet 欄位亂碼/二進制殘留 → 無法 query。
改用 moa-93834（moa-pet-food JSON 格式）→ 成功。
教訓：**優先選 JSON 格式 dataset，ZIP壓縮 CSV 要先手動解壓確認格式再寫 adapter**。

---

## 錯誤與失敗（What Failed）

- **台玻 stock code 抄錯**：一度寫 2327（是國巨），實為 1802。TWSE 代碼查驗是 outreach 草稿必做步驟，不能憑印象。
- **Google Drive 自動上傳持續失敗**：agentflowjdong@gmail.com OAuth client 整個停用（不只 Gmail），Drive 也包含。上傳全部 fallback 到手動。
- **`/api/info` 短暫 404**：site-monitor 曾報 404，但直接 curl 確認是 200。可能是 Zeabur 容器冷啟動期間暫時。route 邏輯本身無問題。

---

## 升格候選

1. **「IR 信箱查驗 SOP」** → `ailab/patterns/` 或 `mingcha/ops/`：MOPS → 重大訊息 → 聯繫人員欄位，比猜 domain 快且準（已驗證，3家100%命中）；maturity: 已驗證
2. **「Taiwan inbound 付費情報模型」** → `ailab/patterns/` 或 `cross-domain/`：透明定價 + 銀行轉帳先行 + 自助付費 + AEO 驅流 的組合，在台灣市場目前是空缺；maturity: 實驗中（還未有第一筆付費）
3. **「ZIP壓縮 CSV 在 Parquet pipeline 的雷」** → `ailab/patterns/tw-opendata-mcp Sprint 注意事項` 或 memory 補充；maturity: 已驗證

---

## 待延伸（Next）

- [ ] LINE Pay for Business 申請 / TapPay NT$990/月 決策（需 Jacky）
- [ ] Google Search Console meta tag 驗證（需 Jacky 加到 Zeabur env 或 HTML）
- [ ] LinkedIn 帳號開通後：ld-001~010 發布（建材/餐飲/醫療/寵物 B2G 備忘錄）
- [ ] tw-opendata-mcp Sprint 6：待下一個客戶資料需求確認
- [ ] 第一筆 NT$3,800 報告款入帳後 → 確認流程完整性 → 考慮升 TapPay
- [ ] Resend DNS（Cloudmax 3 個記錄）→ email 交付自動化
