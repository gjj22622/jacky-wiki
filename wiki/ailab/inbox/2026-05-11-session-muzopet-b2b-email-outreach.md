---
session_date: 2026-05-11
session_topic: 木酢寵物達人 B2B Email 搜尋失敗 → 轉向多管道開發工具箱
model: claude-sonnet-4.6
context: Muzopet 寵物產業分析（products/muzopet-twinkle-hub）
duration: ~1.5h
type: session-summary
tags: b2b, email-scraping, twinkle-hub, taiwan-market, outreach, webfetch, mcp
---

## 最終做法（What Worked）

- **Web search + WebFetch 批量查縣市官網**：確認 3 個可直接使用的政府機關 email
  - 宜蘭縣動植物防疫所：animal@mail.e-land.gov.tw
  - 基隆市動物保護防疫所：kl24280677@mail.klcg.gov.tw
  - 桃園市政府動物保護處：tyadcc@mail.tycg.gov.tw
- **換策略框架**：「找 email」→「找所有可用聯絡管道」，依機構類型選最有效管道：
  - 政府機關：電話先問採購窗口 email（比爬網快），六大直轄市用官方表單
  - 動物醫院：Facebook Messenger（台灣診所 FB 回覆率 > email）
  - 寵物美容/旅館：LINE 直訊
- **寫三版可直接用開發信模板**（Email/FB Messenger/LINE），內嵌到 B2B 名單文件
- **Google Maps Scraper SOP**：Apify 免費試用，輸出含 email 的 CSV，是台灣診所資料最完整來源
- **上傳 Drive**：`gog drive upload ... --parent 1dfD4HogUQHyqWiAYw5cyx00ZbRQpa38M --convert` 到 Muzopet 資料夾

## 繞路紀錄（Detours）

- 試 `twtools-fetch_url_as_markdown` 批量爬官網 email → 完全失敗（政府用 JS 混淆，診所 DNS 無法解析）→ 改用 WebFetch + WebSearch 逐個查
- 試用 WebSearch 找「site:gov.tw 動物保護 email」→ 只找到宜蘭縣作範例，其餘無 → 改為直接 WebFetch 各縣市官網聯絡頁
- 上傳 Drive 時用了前一個資料夾 ID（`1sFLnG5...`，404 not found）→ 查 memory/project_drive.md 找到正確的 Muzopet 資料夾 ID

## 錯誤與失敗（What Failed）

- **初始假設錯誤**：假設台灣機構有公開 email 可爬 → 錯。台灣（尤其政府機關）幾乎不公開直接 email，六大直轄市動保機關全部用「意見信箱表單」
- **fetch_url_as_markdown 限制**：
  - 政府網站 email 藏在 JavaScript 中，markdown 抓不到
  - 私人診所網站 DNS 解析失敗（伺服器端 ConnectError，非工具問題）
- **email 在台灣 B2B 的地位**：與 LINE/FB Messenger 相比，email 在台灣 B2B（特別是中小型寵物服務業）開封率極低，把 email 當主要開發管道本身就是策略誤判

## 升格候選

- ⭐ **「台灣 B2B: LINE/FB > Email」** → 模式發現，值得升格 `ailab/patterns/台灣市場B2B聯絡管道.md`（跨客戶可重用）
- **fetch_url_as_markdown 使用限制**：JS-obfuscated email + 小型網域 DNS error → 補到 `ailab/tools/twinkle-hub-mcp.md` 雷區段
- **WebSearch + WebFetch 組合驗證政府 email**：成功找到 3 個，是可重用 pattern → 留 inbox 再觀察
- B2B 開發信三版模板（Email/FB/LINE）→ 客戶交付文件，不入 ailab，已在 Muzopet Drive

## 待延伸（Next）

- 實際寄開發信給確認的 3 個政府機關（Muzopet 品牌端行動）
- Facebook Messenger 批量私訊台北 270 家動物醫院（前 50 家大安/中山優先）
- Apify Google Maps Scraper 試用，看能否批量抓到 email + LINE 連結
- OpenClaw 移除計畫（plans/declarative-noodling-karp.md）還掛著，下次優先處理
