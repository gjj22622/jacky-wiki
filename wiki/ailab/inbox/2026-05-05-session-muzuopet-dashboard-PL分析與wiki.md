---
session_date: 2026-05-05
session_topic: 木酢寵物達人 Dashboard 製作、Excel P&L 公式修正、Wiki Ingest
model: claude-sonnet-4.6
context: 双云客戶 muzuopet（木酢寵物達人）
duration: ~3h
type: session-summary
tags: dashboard, excel, openpyxl, P&L, wiki-ingest, vanilla-js, SOSTAC
---

## 最終做法（What Worked）

**Excel 公式修正**
- 用 `openpyxl data_only=False` 讀公式文字、驗邏輯，再 `data_only=False` 寫入正確公式
- 不直接信 cached value（save 後全變 None），改查備份檔取正確數字
- `wb.calculation.fullCalcOnLoad = True` 解決 2026年度總覽 #REF! stale cache，完全不需碰那個 sheet 的公式
- 3 月 X2 中的 `#REF!`（欄刪除遺留）對照其他月份的 pattern 直接改成 `=(X4/$A$2)*count(A5:A1000)`
- 每個月 `AK4` 除法加 `IFERROR(...,0)` 防 #DIV/0!

**P&L 分析原則**
- 收益來源以平台下載為準（蝦皮用「可出貨訂單」GMV；官網用修正後 U 欄日收合計）
- 試算表公式只管費用欄（S欄、X欄），收益欄不靠公式推算
- Q1 P&L 公式完整保留在 wiki：`官網收益=((U-X)×0.4+2萬)/1.05-S`；`蝦皮收益=GMV/2/1.05-廣告`

**Dashboard 新增 #pl2026 區段**
- 純 vanilla JS + inline SVG 長條圖，不引外部庫
- 資料陣列分離（`plMonthly`、`expenseBreakdown`），renderXxx() 函式各自獨立
- 費用分解圖（4 色堆疊 bar）＋ 收益對比圖（官網/蝦皮雙 bar）＋ 6 KPI 卡＋ P&L 明細表

**Wiki Ingest**
- 歸 `shuangyun/cases/`，SOSTAC 六層完整寫，Q1 P&L 三月表保留公式方便複用
- Ingest 後三步必做：更新 cases 索引 → 更新主索引頁數 → 寫 log.md 決策記錄 → commit

## 繞路紀錄（Detours）

- `openpyxl data_only=True` save 後所有 formula cell 變 None → 改用備份檔抓真實數字，寫入時改用 `data_only=False` 版本
- 一開始想在 2026年度總覽直接修 `='3月'!N4` 之類的公式 → 發現公式本身正確，是 stale cache，`fullCalcOnLoad=True` 一行搞定
- Dashboard JS 有全形括號 `（` 夾在 template literal 裡 → `node -e "new Function(...)"` 語法驗證找到，Edit 精確替換

## 錯誤與失敗（What Failed）

- 3月 U4 第一次修成 `=sum(U5:U33)`（誤以為3月33行）→ 應是 `U5:U35`（31天從第5行），漏了 3/30+3/31 共 10,725 TWD，後來比對原始日資料才發現
- 官網收益首版公式漏了最外層括號，導致先除 1.05 再乘 0.4，跑出錯誤數字，逐欄比對才修正

## 升格候選

- ⭐ `openpyxl fullCalcOnLoad=True` 解決 stale formula cache → 升 `ailab/tools/` 或 `patterns/`（跨任何 Excel 修正場景通用）
- 「Revenue 以平台下載為準，spreadsheet 只管費用」→ 候選 `patterns/`（商業分析原則，可跨客戶複用）
- 暫留 inbox：Dashboard SVG bar chart vanilla JS 做法（已穩定但太客戶特定）

## 待延伸（Next）

- 木酢 50 萬月目標追蹤（LINE 推播加頻 + 蝦皮流量診斷）
- muzuopet dashboard 下一版：加 Q2 月份滾動更新機制
- 蝦皮 Q1 YoY −40% 診斷：關鍵字競爭 or 廣告預算 or 演算法排名（需蝦皮後台廣告報表）
