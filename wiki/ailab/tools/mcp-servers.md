---
title: MCP Servers（外部工具整合）
domain: ailab
updated: 2026-05-11
---

# MCP Servers

> **MCP（Model Context Protocol）**：讓 Claude 直接呼叫外部服務（Gmail / Drive / Calendar / Canva / Gamma...）的標準介面。
> **Jacky 用法**：把日常行政與素材操作整合進 IDE 對話，不用切視窗。

---

## 當前已啟用的 MCP

| MCP | 主場景 | 取代了 | 心得 |
|---|---|---|---|
| **Gmail** | 寫信草稿、找信、貼標籤 | Gmail 網頁 | 找信很順、寫信草稿穩 |
| **Drive**（Google）| 檔案搜尋、metadata、權限查 | Drive 網頁 | 列最近檔案、找文件 metadata |
| **Calendar** | 排程、查看、回應邀約 | Google Calendar | suggest_time 找空檔 |
| **Canva** | 圖像／設計檔案 | Canva 網頁 | 還在實驗階段 |
| **Gamma** | AI 簡報生成 | Gamma 網頁 | 還在實驗階段 |

---

## Gmail MCP

### 主要工具
| 工具 | 用途 |
|---|---|
| `search_threads` | 找特定主題／寄件人的對話 |
| `get_thread` | 讀完整對話 |
| `create_draft` | 寫信草稿 |
| `list_drafts` / `list_labels` | 列草稿／標籤 |
| `create_label` / `label_message` / `label_thread` | 標籤管理 |

### 典型用法
```
1. search_threads "TBSA 第三次理事會"
2. get_thread <thread_id>
3. create_draft（讀完上下文後直接寫回信）
```

### 沒用在的場景
- 即時收發（直接看 Gmail 網頁）
- 大量批次（用 Gmail API 寫腳本更穩）

---

## Drive MCP（Google）

### 主要工具
| 工具 | 用途 |
|---|---|
| `search_files` | 找檔案 |
| `list_recent_files` | 最近檔 |
| `get_file_metadata` / `get_file_permissions` | 檔案資訊 |
| `read_file_content` / `download_file_content` | 讀內容 |
| `create_file` / `copy_file` | 新建／複製 |

### 典型用法
- 對話中需要某份 Google Doc → 直接 `search_files` + `read_file_content`
- 找 OneDrive 對應的 Google Drive 同步檔

### 注意
- Drive MCP 是 **Google Drive**，不是 OneDrive
- OneDrive 直接走 Windows 本機檔案系統（`C:\Users\gjj22\OneDrive\`）

---

## Calendar MCP

### 主要工具
| 工具 | 用途 |
|---|---|
| `list_calendars` / `list_events` | 列行事曆／事件 |
| `get_event` | 看事件細節 |
| `create_event` / `update_event` / `delete_event` | CRUD |
| `respond_to_event` | 接受／拒絕邀約 |
| `suggest_time` | 找空檔（**最有用**）|

### 典型用法
- 「下週可以跟某客戶聊嗎？」→ `suggest_time` 找空檔 → `create_event`
- 「我這週會議多嗎？」→ `list_events`

---

## Canva / Gamma MCP（實驗階段）

兩者都需要 `authenticate` 走 OAuth。

| MCP | 預期用途 | 目前狀態 |
|---|---|---|
| Canva | 從 Claude Code 直接生圖／編設計 | 待跑 1 個真實案子驗證 |
| Gamma | AI 簡報生成 | 待跑 1 個真實簡報驗證 |

→ 升格條件：跑 ≥ 2 個 Jwood 或双云實際案子，比手動 Canva/Gamma 順 → 寫進 [模型選擇心法](模型選擇心法.md)。

---

## Twinkle Hub MCP

> **台灣工具箱 + 政府開放資料**：不需 OAuth，開啟 Claude Code 即可用。
> 工具以 **deferred tools** 形式存在（system-reminder 有名稱但 schema 未預載）——**必須先 ToolSearch 才能呼叫**。

### 接入流程（4 步驟）

#### Step 1：ToolSearch 載入 schema（每次對話必做）

```
ToolSearch(
  query="select:mcp__twinkle-hub__opendata-search_datasets,mcp__twinkle-hub__opendata-list_domains,mcp__twinkle-hub__opendata-get_dataset,mcp__twinkle-hub__opendata-query_rows",
  max_results=4
)
```

- 多個工具用逗號串在同一個 `select:` 內，一次載完
- twtools 系列視需要另外 `select:`

#### Step 2：search_datasets 找資料集

```python
search_datasets(
  query="PM2.5",        # 1-2 個短關鍵詞最佳
  domain="environment", # 用 list_domains 確認 19 個域 key
  agency="環境部",       # 機關子字串過濾（ILIKE）
  limit=10
)
```

回傳含：`dataset_id`、`quality_tier`（白金>金>銀>銅）、`update_freq`、`is_normalised`

#### Step 3：get_dataset 看 schema 和樣本

```python
get_dataset(dataset_id="91090", sample_rows=3)
```

確認 `schema.columns`（欄位名含特殊字元）與 `sample.rows`（資料格式）再下查詢。

#### Step 4：query_rows 撈資料（DuckDB SQL）

```python
query_rows(
  dataset_id="91090",
  where="county = '臺北市' AND monitordate >= '2026-04-11'",
  columns=["sitename", "monitordate", "concentration"],
  limit=200
)
```

---

### opendata 工具（台灣政府開放資料 data.gov.tw）

| 工具 | 用途 |
|------|------|
| `opendata-list_domains` | 列 19 個領域 key（決定 domain 參數）|
| `opendata-search_datasets` | 依 keyword/domain/agency/quality 搜資料集 |
| `opendata-get_dataset` | 完整 metadata + 樣本列 |
| `opendata-materialize_dataset` | 強制正規化尚未 normalise 的資料集 |
| `opendata-query_rows` | SQL 查詢（主力）|

### twtools 工具（台灣工具箱）

| 類別 | 代表工具 |
|------|---------|
| 地址 | `normalize_taiwan_address`、`address_to_postal_code`、`address_zh_to_en` |
| 行政區 | `lookup_administrative_district`、`list_districts_in_county` |
| 農曆/節氣 | `solar_to_lunar`、`lunar_to_solar`、`lookup_24_solar_terms` |
| 假日 | `is_taiwan_business_day`、`lookup_holidays` |
| 身分驗證 | `validate_taiwan_id_number`、`validate_tax_id_number`、`validate_phone` |
| 公司/銀行 | `lookup_company_by_tax_id`、`lookup_bank_code` |
| 字串轉換 | `simplified_to_traditional`、`format_chinese_numerals` |
| PDF | `extract_pdf_text`、`extract_pdf_pages` |
| URL | `fetch_url_as_markdown` |

### 雷區與注意

| 雷 | 解法 |
|----|------|
| 忘記 ToolSearch 直接呼叫 | InputValidationError → 先跑 ToolSearch |
| `columns` 含 `[公頃]`、`/` 特殊字元 | 改 SELECT *，人工過濾欄位 |
| WHERE 台/臺字元 | 用資料內實際值（`'臺北市'` 非 `'台北市'`），search 自動展開但 WHERE 不行 |
| 資料集 API 限 1000 筆 | 加 WHERE 縮範圍，無法分頁拿全量 |
| `is_normalised=false` 的資料集 | query_rows 前先 materialize，或直接 `normalised_only=True` 過濾 |
| 縣市分欄資料 | data.gov.tw 並非每個主題都有縣市分欄統計，找不到時需查個別縣市資料集或官方 PDF 年報 |

### 心得（2026-05-11 首次使用）

- 白金級資料集 `cost_usd = 0`，cache 命中率高，速度快
- 適合：政策研究、環境監測、人口統計、地理行政區查詢等台灣本地數據分析
- 不適合：需要即時資料（部分資料集有延遲）、需要全量大資料（API 限 1000 筆）

---

## MCP 觀察中（尚未啟用）

| MCP | 何時可能啟用 |
|---|---|
| Notion MCP | 不會（已用 wiki repo）|
| Slack MCP | 双云有 Slack 時可能 |
| Linear MCP | 有專案需求時 |
| GitHub MCP | 已用 gh CLI 取代 |

---

## MCP 設計原則（個人選擇）

### 該啟用的訊號
- ✅ 解決「切視窗」的瓶頸（如：找信、查行事曆）
- ✅ 整合進 Claude Code workflow（不只是個獨立 chat 工具）
- ✅ 至少跑過 1 個真實任務

### 不啟用的訊號
- ❌ 「聽說有」（純實驗驅動，沒明確需求）
- ❌ 跟既有工具棧重疊（如 Notion vs wiki）
- ❌ 認證流程複雜但用例少（cost > benefit）

---

## MCP 與 wiki ingest 的協作

典型工作流：

```
1. 對話中說「整理 OneDrive/双云AI轉型/X 進 wiki」
2. 主對話用本機檔案系統讀（不需 MCP）
3. 但若需要查相關 Gmail 對話：用 Gmail MCP `search_threads`
4. 若需要查 Calendar 看「這次討論是哪天的」：用 Calendar MCP
5. 整合進 wiki/<域>/ 頁面
```

---

## 限制與雷區

| 雷 | 解 |
|---|---|
| MCP 認證 token 過期 | 重跑 authenticate（Claude Code 會提示）|
| MCP server 速度慢 | 並行多 MCP call、避免序列等待 |
| MCP 結果太大 | 先用 search 縮範圍，不要一次抓全部 |
| 跨帳號（私 vs 公司）| 每個帳號獨立 authenticate |

---

## 相關連結

- 域首頁 → [AI實踐索引](../AI實踐索引.md)
- 工具棧 → [工具棧索引](工具棧索引.md)
- Claude Code → [claude-code](claude-code.md)
