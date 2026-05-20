---
title: TJFS 投稿衝刺一日工作流 — 簡報大綱（25 張）
domain: education
updated: 2026-05-20
parent: README.md
---

# 簡報大綱（25 張）

> 把 [README.md](README.md) 萃取成可投影的 25 張大綱。每張 3-5 個 bullet。配對 huashu-design 可一次出 .pptx。

---

## Slide 1 — 封面

- 標題：學術投稿一日衝刺
- 副標：5 Agent 並行 + 查核-撰寫-Scope 三重閘門
- 案例：J博Team TJFS Review Paper（森林數位孿生）
- 講者：鐘基啟 × Claude Opus 4.7
- 日期：2026-05-20

## Slide 2 — Why this matters

- 散裝 AI 寫作的兩個結構性問題
- Problem 1：context 重 → AI 自動偏保守（砍幅 11% vs 目標 42%）
- Problem 2：寫稿者自評 → 盲點漏抓
- 本案例規模：6 小時、5 並行 agent、28,841 字壓縮、2 個跨對話交接

## Slide 3 — 整體流程 5 Phase

- Phase 1 查核 AI 跨對話審查
- Phase 2 R1 引用修復
- Phase 3 5 Agent 並行精修
- Phase 4 合併 + 學術嚴謹閘門
- Phase 5 Word 排版 + Scope 查證
- 每 phase 有獨立驗收標準

## Slide 4 — Phase 1：查核 AI 跨對話

- 為什麼分對話：避免自評偏誤
- 三件 input：主稿 / 守門員 Agent 角色檔 / V3 reference list
- 三件 output：回饋報告 / Crossref CSV / 撰寫 AI 開工指令
- 查核 AI 不能改稿——只標問題

## Slide 5 — 查核 AI 8 大任務

- 字數獨立驗證
- 引用 hallucination 抽查 15 條
- Taiwan 政府數字一致性
- V3 三方向錨點呼應
- 引用句型與冒號禁令
- 每章可整段刪除候選 + 不可動清單
- 章節間銜接邏輯
- TJFS 30 點 checklist
- ⚠️ 漏掉的第 9：同期刊前例查證

## Slide 6 — 採坑：查核 AI 自己也會 hallucinate

- Zheng 2024 *JRS* 在必查清單但實際不存在
- 教訓：所有 AI 都會 hallucinate
- 解法：撰寫 AI 用 Crossref / Airiti DB 二次驗證

## Slide 7 — Phase 2：R1 引用修復

- R1 = 投稿前必修等級
- 本案例三件：
  - Sasaki 期別錯 17(10) → 17(9)
  - Tian 50%/85% 數字無 PDF 佐證
  - Zheng JRS 編造引用 → 換 Mohammed RSE
- 修 DOI 時順手砍 MRV 列舉（一次解兩個風險）

## Slide 8 — Phase 3：5 Agent 並行精修

- 為什麼用 sub-agent：避開 context 飽和
- 5 Agent 分章：A Taiwan / B AI / C Ground / D RS+FDT / E Intro+Methods+Conclusions
- 每 Agent 寫自己的獨立檔 → race-free
- 主對話用 PowerShell 合併腳本組裝

## Slide 9 — Agent brief 模板（可複製）

- 任務：原 X 字 → 目標 Y 字
- 不可動清單（從查核 AI §七）
- 可大刀刪除清單
- 硬性紅線 6 條（zero hallucination 含 4 條）
- 回報格式 7 欄位
- ⭐ **末尾必加「學術嚴謹優先於壓縮幅度」**

## Slide 10 — 為什麼「嚴謹優先」要寫進每個 brief

- 沒寫的話 Agent 為達標會整段砍不可動內容
- 本案例 5 個 Agent 都觸到紅線、全選擇略超目標
- 略超字數可後續再壓；漏錨點 reviewer 會抓

## Slide 11 — Phase 4：合併 + 閘門

- 合併腳本三件事：抽前段 / 組主文 / 抽後段
- 採坑：PS 5.1 hashtable in array 不相容（用並列陣列）
- 採坑：reference list regex 抓不到（單井號 vs 雙井號）
- 7 項閘門紅旗：字數 / MRV / 口語引用 / Sasaki / Taiwan 數字 / 中式句型 / 標題冒號

## Slide 12 — Phase 5：Word 排版

- Pandoc 失敗（exit 255）→ 立刻切 Python + python-docx
- TJFS 規範：A4 / 雙倍行距 / 四邊 3 cm / Times New Roman + 細明體 12pt
- python-docx 直接生成 .docx（170 行腳本）
- 採坑：Windows cp950 print emoji → `$env:PYTHONIOENCODING = "utf-8"`

## Slide 13 — Scope 查證三層搜尋（**本案例最大教訓**）

- 第一層：Google Scholar / WebSearch 廣搜
- 第二層：期刊官網 + 編輯平台（Aim & Scope）
- 第三層：學科資料庫 site:filter（Airiti / Scopus / WoS）
- 本案例 4 輪 WebSearch + 2 次 WebFetch
- 找到 2 篇 TJFS 前例（Wei 2014 + Sung 2022）

## Slide 14 — Scope 風險翻轉案例

- 投稿前評估：scope mismatch desk reject 高風險
- 三層查證後：TJFS 已接受光達+ML 主題
- 風險翻轉：高 → 低
- 但新風險：必須補引這 2 篇前例避免「漏引同期刊」

## Slide 15 — 找到前例後的 4 件後續分析

- 風險再評估（高/中/低）
- 必補引用清單（哪個 section 補哪幾篇）
- 潛在審稿人推測（前例作者）
- Cover letter 「為何投本刊」段強化

## Slide 16 — Jacky 拍板 1：暫停寫稿改派審稿

- 觸發點：AI 處於可繼續寫狀態
- Jacky 喊停的時機 AI 沒有自我察覺
- 意義：AI 沒有「該停了」的內在判斷

## Slide 17 — Jacky 拍板 2：今天必出 .docx + 拆平行分支

- 時程壓縮：D-day 從 7/13 拉到「今天」
- 明確紅線：嚴謹性不可犧牲
- AI 需立刻切策略到並行多 Agent

## Slide 18 — Jacky 拍板 3：問期刊前例

- 投稿前一刻自己想到
- 查核 AI 8 大任務漏掉的第 9 項
- 意義：人類拍板權的價值在於「AI 沒問的問題」

## Slide 19 — Jacky 拍板 4：值得記錄做分享

- 把今天的實踐沉澱為跨對話可重用資產
- ailab + education 雙軌：個人捕事件 + 對外做教材
- 觸發 /internal-training skill

## Slide 20 — 採坑點集合 8 件

1. context 過長 → 精修保守化
2. 查核 AI 自己 hallucinate
3. PS 5.1 hashtable 多行語法
4. merge regex 抓不到 reference list
5. Pandoc 安裝失敗
6. Python cp950 print emoji
7. 「許多研究」漏中文摘要
8. 中文姓名 romanization 不能猜

## Slide 21 — 跨對話資產化清單

- 查核 AI 指令模板
- 5 Agent brief 模板
- 學術嚴謹閘門腳本
- md → docx Python 腳本
- ailab capture（待升 patterns）
- TJFS scope 前例分析（含潛在審稿人）
- ⭐ 設計原則：每個資產都應跨期刊復用

## Slide 22 — 責任分離 vs 自主性

- 散裝模式：一個 AI 寫稿 + 自評 + 修稿
- 工作流模式：查核 / 撰寫 / 拍板三責任分離
- 本案例證據：Jacky 4 個拍板對應 AI 4 個盲點
- 結論：人類拍板權設計進工作流 > 追求 AI 自主性

## Slide 23 — 數字總結

- 主文字數變化：38,834 → 28,402（-27%）
- 5 Agent 完成時間：每個 5-15 分鐘並行
- R1 修復：3 處
- Scope 查證找到前例：0 → 2 篇
- 學術嚴謹閘門：6/7 全綠（剩字數）
- 產出檔案：13 個（.docx + 分章檔 + 分析報告）

## Slide 24 — 跨期刊復用清單

- 換期刊只要改：scope 描述 / 前例搜尋關鍵詞 / cover letter 「為何投本刊」段
- 不用換：5 Agent brief 模板 / 閘門腳本 / md→docx 腳本 / 三層搜尋方法論
- 結論：本工作流是 portable 的學術投稿 AI 流程

## Slide 25 — Q&A + Next

- 你想試什麼樣的論文壓縮？
- 你的目標期刊 scope 查證做完了嗎？
- 你的查核 AI 跟撰寫 AI 是同對話還是分開的？
- Next：把本工作流 patterns 化升格到 ailab/patterns/

---

## 後續產 .pptx

直接餵這份 outline 給 huashu-design skill，會自動產 .pptx + 講者註記。
