# /問卷分析 — 問卷回覆三件套（分析 md + Dashboard + 簡報）

把一份問卷回覆檔（Google Forms 匯出的 .xlsx／.csv）一次做成三個交付物：
1. **分析報告 md**（給 Jacky 上場前 30 秒掃完的版本＋完整版）
2. **單檔 HTML Dashboard**（TBSA 視覺、零外部依賴、可離線開）
3. **TBSA 風格分析簡報 pptx**（python-pptx 原生文字、可上台直接放）

> 實戰範例：`04_彰師大高階企業經理人培訓\02_課前問卷\`（課前問卷v2_分析_0613-0813.md / 課前問卷v2_Dashboard_0613.html / build_survey_deck.py）

---

## 觸發

`/問卷分析 <回覆檔路徑>`，或自然語言「做 XX 問卷的分析」。

## 流程（五步）

### 1. 讀檔盤點結構
- `.xlsx` 用 openpyxl（系統 Python 3.12 已裝）；`.csv` 直接 pandas/csv
- 先印出：工作表名、欄位標題（含題號）、回覆數
- ⚠ cp950 紅線：console 印中文會炸，一律 `PYTHONIOENCODING=utf-8` ＋ `io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')`

### 2. 全量倒出原始回覆
- 逐筆逐題寫進 `%TEMP%\survey_dump.txt`（UTF-8，`io.open(..., encoding='utf-8')`），再用 Read 整檔讀
- 為什麼不抽樣：自由填答題（許願、真心話）的價值在**個句**，量化題才看分布

### 3. 統計與分類（人腦判讀，不寫死規則）
- **單選題**：直接計數，算百分比
- **複選題**：注意 Google Forms 用 `, ` 分隔，但選項文字本身可能含頓號（例：「客戶／客訴經營・開會／待辦／文書」是一個選項）——先比對選項全文再切，不要無腦 split
- **自由填答**：歸類成 3-5 個主題（例：急單/插單、投資/轉型、用人/傳承、其他），保留原句＋姓名公司，金句要可以「點名」
- **交叉洞察**：找一個反差數字當主軸（例：74% 個人天天用 vs 63% 公司停在第 0-1 層 →「人會用，公司不會用」）
- **商機盤點**：課後意向複選 3 項以上的列高意向名單

### 4. 產出三件套
- **md**：存在回覆檔同資料夾，檔名帶日期時間（不覆蓋）。結構：班級組成→成熟度→痛點排行→自由題分類（含可點名金句＋⚠敏感回覆提醒）→點菜/許願→商機→「上場前 30 秒摘要」
- **Dashboard html**：單檔、無 CDN、無 JS 依賴；TBSA 色票（緋紅 A20018／金 A37A0F／金亮 C9A23C／墨 1F1B16／石 6B6357／米底 F8F4EC／卡片 FFFEFB／框線 E6DFD0／紅底 FBEFEF）；bar chart 用 div 寬度百分比；字體 Microsoft JhengHei；頂部統計大數卡＋紅 band 一句話結論
- **pptx**：寫 build 腳本存同資料夾，輸出檔名帶 `_{MMDD-HHMM}` 時間戳（重跑絕不覆蓋）；版型複用 demo 渲染器手法（style/t/rrect/pill/band/new_slide，rPr a:ea 設 JhengHei）；約 6 頁：封面→組成→反差大數→痛點排行→自由題三卡→意向；收尾跑最小 16pt 保險迴圈

### 5. 驗收
- COM 出 JPG（PowerShell `New-Object -ComObject PowerPoint.Application`，**只 Close 自己開的 presentation，不 Quit**——Jacky 的簡報可能開著）＋ PIL 拼縮圖格自檢
- 檢查：頁碼 n/N、無「不是…是…」句式、最小 16pt、複選題票數加總合理

## 紅線

- 重跑必出新檔名（時間戳），原始回覆檔唯讀不動
- 個資只進內部交付物，不進要投影給全班看的簡報（簡報上可寫產業＋職稱，不寫全名）
- 敏感回覆（例：「公司要不要繼續經營下去」）要在 md 標 ⚠ 提醒講師溫柔處理，不放簡報
- 簡報文字全原生可編輯，不烤圖
