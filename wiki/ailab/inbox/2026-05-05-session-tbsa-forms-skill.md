---
session_date: 2026-05-05
session_topic: 用 python-docx 填寫 TBSA 五張表單 Word 檔，並封裝成可複用 /tbsa-forms skill
model: claude-sonnet-4-6
context: TBSA 台中科大五張表單工作坊（05-課程總覽/06_20260517）備課
duration: ~3h（跨兩段對話）
type: session-summary
tags: python-docx, word, vml, skill-design, tbsa, merged-cells
---

## 最終做法（What Worked）

**填表腳本（fill_forms.py）**
- 複製空白模板後，用 `python-docx` 寫入 `doc.tables[0-3]`（STEP 1-4）
- helper `wc(table, row, col, text)` 先清空再寫，`al()` 附加多行
- 7Ps 正確欄位（已驗證）：Product/Price → col1，Promotion/Place → col4，People/PhysEvid/Process → col9
- AIDAS 正確欄位：行動方案 → col2，成果目標 → col5，負責人 → col6，所需物件 → col8，經費 → col10，備註 → col11；col0+col1 標籤絕不碰
- STEP 5（一頁企劃書）是 VML text box，不是 Word table，必須直接操作 `doc.element.body[29]` 的 `txbxContent` XML
- 目的/效益兩個框用 `append=True` 保留原有標頭；其他框用 `append=False`
- 4.實施方式（`_x0000_s2203`）在 `body[31]`（獨立 v:group），需單獨迴圈處理

**skill 封裝**
- `~/.claude/skills/tbsa-forms/SKILL.md`（YAML frontmatter + 5 步驟 + 模板對應表）
- `ref_欄位說明.md`（五張表單所有欄位 row/col 座標 + 寫作技巧）
- `ref_程式碼與錯誤.md`（helper 函式全文 + 欄位索引 + 6 條禁止重蹈錯誤）
- `/tbsa-forms` 已登錄 `~/.claude/CLAUDE.md`

## 繞路紀錄（Detours）

- 7Ps Promotion 一開始寫 col3（直覺「標籤後一格」）→ 實際 col3 是 Promotion 的標籤欄，內容在 col4；People 系列以為在 col5，實際是 col9（中間有多欄合併）。需要 gridSpan XML 分析才能確認。
- AIDAS 行動方案一開始寫 col1 → col0+col1 是 AIDAS 階段標籤的 merged cell，寫了就覆蓋標籤。
- AIDAS 成果目標/負責人/所需物件寫 col2/col3/col4 → 三格是同一個 merged cell，最後寫入的才有效，前面的全被覆蓋。最終才釐清要寫 col5/col6/col8。
- STEP 5 一開始用 `doc.paragraphs` 搜尋「目的：」關鍵字來定位欄位 → VML 的標頭文字不在 `doc.paragraphs` 裡，內容全部跑到文件末尾空白段落。切換成直接操作 XML `txbxContent` 才解決。
- 4.實施方式一開始以為在 `body[29]`（跟其他框同一個元素）→ 找不到 `_x0000_s2203`，最後用 `lxml.etree.tostring()` 把 body element 逐個印出才發現它在 `body[31]` 的獨立 v:group。

## 錯誤與失敗（What Failed）

- 初版嚴重低估 Word merged cell 的複雜度：直接數「視覺上第幾欄」在 python-docx 完全無效，merged cell 會在 `row.cells` 裡重複出現，最終 col 數目比視覺欄多很多。唯一可靠的方法是看 XML 的 `gridSpan`。
- STEP 5 完全沒料到是 VML text box 而非 Word table；第一版程式碼對 STEP 5 沒有任何作用，所有內容都寫到文件末尾。
- SKILL.md 第一版沒有 YAML frontmatter → cowork 拋出「SKILL.md must start with YAML frontmatter」，補上後解決。

## 升格候選

- ⭐ **升格 → `ailab/concepts/word-docx操作心法.md`（新建）**：merged cell 只能靠 XML gridSpan、VML text box 的存取方式、body element index 定位法——這套踩坑心法下次遇到 Word 填表必用
- **留 inbox**：fill_forms.py 本身只是此任務的範例腳本，不具通用性
- **留 inbox**：/tbsa-forms skill 是課程備課工具，太 context-specific，不升格 cross-domain

## 待延伸（Next）

- 下次新品牌（如台中科大學生的比賽題目）直接 `/tbsa-forms` 觸發，驗證 skill 是否能引導完整流程
- 若有第二次填表任務，觀察 ref_程式碼與錯誤.md 是否足夠引導、有沒有缺口
- 台中科大工作坊主講 PPTX 還沒做（`project_taichung_0517.md` 標記 ⚠️ 待做）
