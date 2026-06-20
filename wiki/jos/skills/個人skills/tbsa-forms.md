---
name: tbsa-forms
description: 生成 TBSA 五張企劃工具表單範例 .docx，依指定品牌與目標填寫 STEP 1-5 全部欄位
trigger: /tbsa-forms
---

# /tbsa-forms — TBSA 五張表單填寫 Skill

**用途**：依指定品牌與目標，生成 TBSA 五張企劃工具表單範例 `.docx`。

---

## 觸發後立即執行的步驟

1. **確認三件事**（不確定就問，禁止留白或用佔位符）：
   - 品牌名稱、核心商品／服務
   - 企劃核心目標（數字化，例：月營業額從 X 萬成長至 Y 萬）
   - 任何不確定的關鍵數字（月營業額基準、會員數、ROAS 目標等）

2. **複製空白模板**：
   ```
   SRC = r"C:\Users\gjj22\OneDrive\TBSA開課流程自動化\05-課程總覽\00_共用素材\TBSA企劃工具表單_2026.docx"
   DST = r"<目標資料夾>\<品牌名稱>_五張表單範例.docx"
   shutil.copy2(SRC, DST)
   ```

3. **建立 fill_forms.py** 於 DST 同目錄，參照：
   - `ref_欄位說明.md` — 每格欄位說明與內容方向
   - `ref_程式碼與錯誤.md` — 正確的 helper 函式、欄位索引、禁止重蹈的錯誤

4. **執行**：`python fill_forms.py`，確認無 `[WARN]` 訊息，開啟 `.docx` 目視確認五個 STEP 均有內容。

---

## 模板對應（Word 內部 STEP vs 課程 Form 編號）

| python-docx | Word 內標籤 | 課程稱呼 |
|-------------|-----------|---------|
| `doc.tables[0]` | STEP 1 企劃情報/概念分析表 | Form 2 |
| `doc.tables[1]` | STEP 2 現況分析與策略目標設定表（SWOT+TOWS） | Form 1 |
| `doc.tables[2]` | STEP 3 STP 市場區隔（Segmentation） | Form 3 |
| `doc.tables[3]` | STEP 3 目標市場+市場定位（Targeting+Positioning） | Form 3 |
| `doc.tables[4]` | STEP 4 行銷戰術設計（7Ps+AIDAS） | Form 4 |
| `doc.tables[5]` | STEP 5 一頁企劃書（標準 Word table） | Form 5 |

---

## 參考檔案

- `ref_欄位說明.md` — 五張表單每格欄位名稱、說明、寫作技巧
- `ref_程式碼與錯誤.md` — helper 函式、正確欄位索引、禁止重蹈錯誤
