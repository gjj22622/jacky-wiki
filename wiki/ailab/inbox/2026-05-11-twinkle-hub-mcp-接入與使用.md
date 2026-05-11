---
event: Twinkle Hub MCP 接入並用 opendata 工具查詢台灣政府開放資料
date: 2026-05-11
model: claude-sonnet-4.6
context: 個人實驗（台北市 PM2.5 日均值、台灣森林面積查詢）
type: 工具發現
maturity: 已驗證
tags: mcp, twinkle-hub, opendata, taiwan, data.gov.tw, deferred-tools, sql
---

## 發生了什麼

Twinkle Hub MCP 以 **deferred tools** 形式存在 Claude Code，工具清單雖在 system-reminder 出現，
但 schema 不預載——必須先 ToolSearch 才能實際呼叫，否則直接 InputValidationError。
本次成功查詢台北市過去 30 天 PM2.5 日均值（7 測站 / dataset 91090）及台灣森林面積開放資料（dataset 136727）。

## 為什麼重要

台灣政府開放資料（data.gov.tw）的 6,000+ 資料集可在 Claude Code 對話中直接 SQL 查詢，
不需要自己寫爬蟲或下載 CSV 再本地處理。白金級白金資料集 `cost_usd = 0`，速度快，有 cache。
查詢後直接在對話中分析、製表，可整合進 wiki、報告、或 session 分析。

## 怎麼做的

### 接入方式
Twinkle Hub MCP 已在 Claude Code 設定（`settings.json` 或 Anthropic 雲端 MCP 整合），
不需要額外認證（不像 Gmail / Canva 需 OAuth），開啟 Claude Code 即可用。
驗證方式：看 system-reminder 是否出現 `mcp__twinkle-hub__*` 工具名稱。

---

### 使用流程（4 步驟）

#### Step 1：ToolSearch 載入 schema（**必做**，否則 InputValidationError）

```
ToolSearch(
  query="select:mcp__twinkle-hub__opendata-search_datasets,mcp__twinkle-hub__opendata-list_domains,mcp__twinkle-hub__opendata-get_dataset,mcp__twinkle-hub__opendata-query_rows",
  max_results=4
)
```

- 可同時 `select:A,B,C,D` 一次載多個，不需分次
- twtools 系列另外 select（視需要再載）

#### Step 2：search_datasets 找資料集

```python
search_datasets(
  query="PM2.5",            # 1-2 個短關鍵詞最佳（jieba 切詞 AND match）
  domain="environment",     # 19 個域之一（用 list_domains 查完整清單）
  agency="環境部",           # 限定機關（ILIKE 子字串比對）
  limit=10
)
```

回傳每筆含：`dataset_id`、`name`、`quality_tier`（白金>金>銀>銅）、`update_freq`、`is_normalised`

**搜尋技巧**：
- 台/臺 異體字自動展開，打「台北」也能 match「臺北」的資料集
- 0 hits 先縮短 query（1-2 詞）再加 domain/agency 結構化過濾
- `normalised_only=True` 可篩掉無法 query_rows 的資料集

#### Step 3：get_dataset 看 schema 和樣本

```python
get_dataset(dataset_id="91090", sample_rows=3)
```

重點看：
- `schema.columns`：實際欄位名稱（可能含 `[公頃]`、`/` 等特殊字元）
- `sample.rows`：資料格式（如日期是 `"2026-05-08 "` 帶尾空格）
- `schema.row_count`：總筆數（通常 API 限 1000 筆）

#### Step 4：query_rows 撈資料

```python
query_rows(
  dataset_id="91090",
  where="county = '臺北市' AND monitordate >= '2026-04-11'",
  columns=["sitename", "monitordate", "concentration", "itemunit"],
  limit=200
)
```

- WHERE 使用原生 SQL（DuckDB 方言）
- 欄位名含 `[公頃]`、`/` 等特殊字元時，`columns` 陣列傳遞有時失敗 → 改 SELECT * 再人工過濾
- WHERE 字串值要用資料內的實際字元（如 `'臺北市'` 不是 `'台北市'`）
- `offset` 參數在本次測試中似乎未按預期分頁，需注意

---

### Twinkle Hub 完整工具清單

#### opendata 系列（台灣政府開放資料 data.gov.tw）

| 工具 | 用途 |
|------|------|
| `opendata-list_domains` | 列 19 個領域 key（決定 domain 參數用哪個）|
| `opendata-search_datasets` | 依 keyword/domain/agency/quality 搜資料集 |
| `opendata-get_dataset` | 取完整 metadata + 樣本列（先看 schema 再 query）|
| `opendata-materialize_dataset` | 強制下載並正規化尚未 normalise 的資料集 |
| `opendata-query_rows` | SQL 查詢正規化後的資料列（主力工具）|

#### twtools 系列（台灣工具箱，各取所需）

| 工具群 | 代表工具 |
|--------|---------|
| 地址 | `address_zh_to_en`、`normalize_taiwan_address`、`address_to_postal_code` |
| 行政區 | `lookup_administrative_district`、`list_districts_in_county`、`align_legacy_county` |
| 農曆/節氣 | `solar_to_lunar`、`lunar_to_solar`、`lookup_24_solar_terms` |
| 時間/假日 | `is_taiwan_business_day`、`lookup_holidays`、`current_time_in` |
| 身分驗證 | `validate_taiwan_id_number`、`validate_tax_id_number`、`validate_phone` |
| 公司/銀行 | `lookup_company_by_tax_id`、`lookup_bank_code` |
| 字串 | `simplified_to_traditional`、`traditional_to_simplified`、`format_chinese_numerals` |
| PDF | `extract_pdf_text`、`extract_pdf_metadata`、`extract_pdf_pages` |
| URL | `fetch_url_as_markdown` |

## 對比與替代

- **之前**：下載 data.gov.tw CSV → 本地 Python/pandas 分析（費時、需切視窗、要寫程式）
- **現在**：Claude Code 內 search → query → 分析製表，一條鞭，不寫程式

## 連結與出處

- 本次查詢到的資料集：
  - `91090`：PM2.5 日均值（環境部，每日更新，白金）
  - `34827`：細懸浮微粒資料-小時值（環境部，每小時更新，白金）
  - `136727`：臺北市森林面積（臺北市主計處，每年更新，白金）
- Tool schema 說明：ToolSearch 後 tool description 內有完整參數定義

## 升格目標

直接升格 → `ailab/tools/mcp-servers.md` 新增「Twinkle Hub MCP」段落（本次已驗證，品質穩定）
