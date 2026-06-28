---
title: Jacky 課程與備課系統總覽
domain: education
updated: 2026-06-28
audience: Jacky、双云與 TBSA 課程協作者
prerequisite: 無
duration: 15 分鐘
tags: 備課, 課程總覽, LOOP, workflow, skill
source_chat: 2026-06-28 TBSA 開課流程自動化全資料夾盤點
---

# Jacky 課程與備課系統總覽

> 來源：`OneDrive/TBSA開課流程自動化` 約 2,500 個檔案的結構盤點，並細讀課程根目錄、工作流程記錄、覆盤、SOP、todolist、簡報索引與 skill 套件。圖片、音檔、程式依賴和重複備份列入資產數量，但不當成獨立流程證據。

## 一、課程產品線

| 類型 | 代表案例 | 核心交付 | 備課重點 |
|---|---|---|---|
| 演講／論壇 | 華視食品展、彰師大高階經理人 | 大綱、敘事簡報、口稿／音檔、行動鉤子 | 單一記憶錨點、案例可信度、節奏、收束 |
| 短期實作工作坊 | 德明／大葉教師研習、台中科大五張表單、醫院 PEST | 簡報、實作檔、DataRoom、助教 SOP、收件／問卷 | Demo—實作—Checkpoint、工具權限、成果保存 |
| 說明會／招募 | 跨領域 AI 教學說明會、双云 TBSA 實習說明會 | 承諾對照、Demo、QA、會後交付／索取 | 唯一轉化目標、承諾兌現、後續承接 |
| 企業內訓／客製 | 宜蘭博愛醫院 PEST、双云實習生課 | 情境教材、部門任務、行動方案、KPI | 組織限制、可落地情報、工作移轉 |
| 學期型課程 | 18 週 AI Agent、跨領域 AI 商務企劃 | 週次、作業、評量、期中／期末成果 | 縱向鷹架、評量一致性、學期節奏 |
| 課程產品化 | AI 課程菜單、18 週產生器、種子教師複製包 | 型錄、生成器、模板、操作卡、交接包 | 輸入 schema、可重生、版本與維護 |

### 課程資料夾對照

| 編號 | 專案 | 判定 |
|---|---|---|
| 01 | 工程師商務企劃課 | 專業受眾課程，資料不足，待補 brief |
| 02 | 德明教師研習營 | 6 小時受邀教師工作坊；流程與踩坑最完整 |
| 03 | 大葉 AI 教師研習營 | 7 小時雙日教師工作坊；問卷驅動與導覽頁成熟 |
| 04 | 彰師大高階企業經理人 | 3 小時演講／獲客鏈；不可套工作坊結構 |
| 05 | TBSA 暑假教師研習 | 初階／進階雙版本多日工作坊 |
| 06 | 台中科大五張表單 | 7 小時分組實作工作坊；助教與成果收件重要 |
| 07 | 華視食品展廠商訓練 | 85 分鐘線上演講；敘事、案例、口稿與音檔 |
| 08 | 双云 TBSA 實習生說明會 | 招募說明會 |
| 09 | AI 課程菜單 | 課程型錄產品 |
| 10 | 18 週 AI 課程教學計畫 | 學期課程母本 |
| 11 | 實踐大學 ESG＋五張表單＋考證 | 學期／工作坊／認證混合型 |
| 12 | TBSA 跨領域 AI 教學實戰說明會 | 一小時線上說明會；Demo、QA、會後交付 |
| 13 | 18 週跨領域 AI 商務企劃 | 學期課程 |
| 14 | TBSA 18 週課程產生器 | 課程生成產品／Web 工具 |
| 15 | 双云宜蘭博愛醫院 PEST | 4 小時企業實作工作坊 |
| 16 | 2026 双云實習生課程 | 內部人才培訓，資料仍在形成 |

## 二、目前實際備課方式

現行流程有兩套命名，但可合併：

1. A–F 記錄協議：建檔啟動 → 課程設計 → 問卷工程 → 教材製作 → 文件收尾 → 問卷回收微調。
2. `jacky-teacher-workshop v2.2`：Scan → Index Lookup → Architect → Pre-Survey → DataRoom → Post-Survey → Handoff。

實務上的完整順序是：

`收案 → 判斷場合／商業性質 → 查前例 → 多版大綱 → 主辦或問卷校正 → 製作簡報與工具 → 全程串讀／預演 → 上場 → 問卷與復盤 → 打包複用`。

### 已成熟做法

- 不從零開始：先用 Jacky 簡報索引找 1–3 個前例。
- 問卷驅動定版：教師工作坊已有 75–100% 回收案例。
- 先母後子：先 Master／主結構，再量產練習檔與 DataRoom。
- 資料夾分成課前、課中、課後，並保留歷史版本。
- 課程導覽頁、Google Apps Script、生成腳本與 Edge TTS 已形成可重用工具鏈。
- todolist、CLAUDE、工作流程記錄、wrap-up／kickoff 支援跨 session 接續。

### 反覆出現的問題

- 單一教師工作坊 skill 被擴成所有課型，底層規則仍偏教師與實作課。
- 問卷、DataRoom、少講多做被誤當成所有場合必需。
- 大綱與簡報過早製作，方法論或記憶錨點變更後造成大量白工。
- 課前一天甚至上場日改視覺；重大修改後未全程串讀。
- Apps Script 增量修補累積 bug；生成腳本可能覆蓋人工修改。
- Live Demo 缺導航卡、工具權限或失敗備援。
- 課程根目錄結構與記錄完整度不一致，部分新案只有 todolist。

## 三、現有 Skill 與資產

### 實體可用

- `jacky-teacher-workshop v2.2`：包含 Phase 1.5 前例查詢與 13 條紅線；應降回教師工作坊參考模組。
- `ai-course-practicum-designer`：14 類實作與練習 PPTX 設計。
- `/迴圈`：SOSTAC LOOP、終止條件、評審與逆推除錯的母方法。
- TBSA 分析 skills 與 `tbsa-forms`：五張表單及策略分析。
- `presentations`、`documents`、`spreadsheets`：交付物產製。
- `kickoff`、`wrap-up`、`ailab`、`internal-training`、`jacky-wiki`：狀態接續、事件捕捉與知識升格。

### 只有規劃、不可視為已安裝

`03-建置計畫/建置優先順序與行動計畫.md` 宣稱 31 個 `tbsa-class-*` skills 已完成，但目前 `02-Skill大軍` 是空資料夾。這些名稱只能作需求清單，直到找到實體 SKILL.md 並驗證。

## 四、目標架構

- 通用核心：[`jacky-course-prep-loop`](../skill/jacky-course-prep-loop/SKILL.md)，只管理課型路由、Gate、LOOP 與資產回寫。
- 母方法：[SOSTAC 迴圈與逆推除錯](../../shuangyun/concepts/SOSTAC迴圈與逆推除錯.md)。
- 課型模組：[五張表單工作坊備課 SOP](../playbooks/五張表單工作坊備課SOP.md) 等既有 playbooks。
- 真正產製：交給簡報、文件、試算表、TBSA 等專門 skills。
- 單場產出留在課程專案；跨場規則、模板與復盤升格才進 Wiki。
- 十階段是外層 workflow；內層 LOOP 固定為「工作 AI 產出 → 監察 AI 驗收 → 退件修正 → 再驗收 → 通過後人工 Gate／交付」。
- 監察 AI 與工作 AI 必須角色分離；沒有 `PASS` 證據的 AI 產出不得直接交付。

## 五、全域視覺文字規範

- 中文一律使用微軟正黑體；英文、數字、日期、網址與 Email 一律使用 Arial。
- 中英混排必須分 run／span 指定字型。
- 所有可見文字硬下限 16pt；一般內文以 20–24pt 為目標。
- 不再以 Noto Serif TC、Noto Sans TC、Inter 或 Cormorant Garamond 作為備課預設字型。
- 完整規格見 [`visual-copy-standards.md`](../skill/jacky-course-prep-loop/references/visual-copy-standards.md)。

