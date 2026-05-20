---
event: 投稿前用三層搜尋找出 TJFS 已發表光達+ML 前例，逆轉 desk reject 風險評估
date: 2026-05-20
model: claude-opus-4.7
context: NCHU J博Team TJFS Review Paper 投稿（線 B，森林數位孿生）
type: 突破
maturity: 已驗證
tags: academic-submission, scope-check, citation-precedent, tjfs, taiwan-journal-forest-science, web-search, desk-reject-risk, ailab-pattern
---

## 發生了什麼

J博Team 為 7/13 D-day 衝刺 TJFS 投稿，已產出 .docx v0。Jacky 在投稿前最後問了關鍵問題「這本期刊之前沒有類似森林數位孿生的論文嗎？」——這是查核 AI 在 8 大任務裡漏掉的盲點。AI 用三層搜尋策略（4 輪並行 WebSearch + 2 次 Airiti Library WebFetch）查證後找到 2 篇直接相關的 TJFS 前例：

- **Wei et al. 2014** *TJFS* 29(3): 169-178「應用地面光達資料於紅檜人工林立木測計」（DOI 10.7075/TJFS.201409_29(3).0001）
- **Sung et al. 2022** *TJFS* 37(2): 121-143「運用空載高光譜及光達資料建立森林覆蓋分類判釋模型」（DOI 10.7075/TJFS.202206_37(2).0003，用 SVM + Random Forest）

這把原本被視為「TJFS 沒有 FDT 前例 = scope mismatch desk reject 高風險」的判斷，逆轉成「TJFS 已接受光達+ML 主題 = 低 desk reject 風險，但必須在本文補引這 2 篇避免漏引同期刊先前研究」。

## 為什麼重要

1. **避免 desk reject**：scope mismatch 是 desk reject 的頭號原因之一；查證後從「高風險」→「低風險」實質改變投稿策略
2. **避免文獻覆蓋不足批評**：reviewer 通常會檢查作者是否引用同期刊先前研究，漏引是常見 reject 理由
3. **獲得潛在審稿人線索**：找到的 2 篇前例作者（陳朝圳、魏浚紘、詹進發、王素芬、宋承恩）是 TJFS 在地光達領域已知學者，可作 cover letter 推薦審稿人或共同作者邀請對象
4. **Cover letter 論證升級**：可主張「本文是 TJFS 既有光達/ML 路線的下一階段 FDT 整合」，比孤立投稿說服力強很多
5. **方法論可重用**：投稿任何期刊（不只 TJFS）都應跑這個查證流程，本次經驗可固化為跨對話 pattern

## 怎麼做的

**三層搜尋策略**（依精度由粗到細）：

1. **第一層 — Google Scholar / WebSearch 廣搜**：
   - `Taiwan Journal of Forest Science "digital twin" forest`
   - `"Taiwan Journal of Forest Science" remote sensing biomass review`
   - `台灣林業科學 數位孿生 forest digital twin`
   - 結果：直接 FDT 主題 → 0 篇，確認本文是首篇 FDT review
2. **第二層 — 期刊官網 + Editor 平台**：
   - TFRI 官網 `https://www.tfri.gov.tw/main/science_cat.aspx`
   - iPress 投稿系統 `https://www.ipress.tw/J0222`
   - TJFS Vol 41 No 1 (2026) 最新一期目錄
   - 結果：取得 scope 描述（Forest Biology/Management/Biotechnology/Wood Science）、確認接受 review article、最新一期有 carbon storage prediction 論文
3. **第三層 — Airiti Library DB site:filter 搜尋**：
   - `site:airitilibrary.com "台灣林業科學" 遙測 OR 光達 OR LiDAR`
   - 結果：找到 5+ 篇 TJFS 光達主題論文清單
   - 隨後用 WebFetch 取 2 篇關鍵論文完整書目（DOI、卷期頁碼、作者、ISSN 1026-4469 驗證）

**找到前例後的後續分析**：

1. **scope 適配性風險再評估**（高 → 低）
2. **必補引用清單**（Section 4 或 8 + Reference list）
3. **潛在審稿人推測**（5 人含機構推測）
4. **cover letter 「為何投 TJFS」段補強建議**
5. **整份分析寫入** `06_投稿管理/TJFS_scope_前例分析_2026-05-20.md`（含完整 sources 連結）

## 對比與替代

**之前的做法（盲點）**：
- 查核 AI 階段（前一個對話）跑了 8 大任務含「引用 hallucination 抽查 15 條」「Taiwan 數字一致性」「三方向錨點呼應」等，但**沒有**「同期刊前例查證」這一項
- AI 在守門員 Agent 階段也沒主動查
- Jacky 在投稿前最後一刻才想到這個關鍵問題

**改進**：
- 把「投稿前同期刊前例查證」加入查核 AI 八大任務 v2 → 變九大任務
- 把這個 pattern 升格成 ailab/patterns/<檔名>.md 供未來任何學術投稿使用

**替代方案（沒採用）**：
- 改投別的期刊（如 *Journal of Forestry Research* / *Forest Ecosystems*）：本次查證後不需要，TJFS scope 適配性已驗證
- 不引用 TJFS 前例賭 reviewer 沒看過：學術嚴謹瑕疵，不採用

## 連結與出處

**本次完整分析報告**：
- `C:\Users\gjj22\Desktop\中興大學生科所\J博Team_Review投稿\06_投稿管理\TJFS_scope_前例分析_2026-05-20.md`

**找到的 2 篇 TJFS 前例**：
- Wei et al. 2014：https://www.airitilibrary.com/Article/Detail/10264469-201409-201410090011-201410090011-169-178
- Sung et al. 2022：https://www.airitilibrary.com/Article/Detail/10264469-202206-202210190014-202210190014-121-143

**TJFS 期刊資訊來源**：
- TFRI 官網：https://www.tfri.gov.tw/main/science_cat.aspx
- TJFS Vol 41 No 1 (2026)：https://www.tfri.gov.tw/en/News_Content.aspx?n=7548&sms=12368&s=34309

**對話脈絡**：
- 線 B：J博Team_Review投稿（TJFS review paper，D-day 2026-07-13）
- 本次對話：2026-05-20，5 Agent 並行第二輪精修 → 產 .docx v0 → Jacky 提 scope 問題 → 三層搜尋查證
- 相關記憶：[[project_j_doctor_team]]、[[feedback_review_paper_focus_not_thesis]]、[[feedback_no_bibliographic_hallucination]]

## 升格目標

**建議升格路徑**：

1. **`ailab/patterns/學術投稿前期刊scope與前例查證.md`**（**主要升格目標**）
   - 把「三層搜尋策略 + 找到前例後的四件後續分析」固化為跨期刊可重用 pattern
   - 含實際 search query 模板（中英、site:filter）
   - 含風險評估翻轉的決策樹
2. **`<jacky-wiki>/wiki/nchu/concepts/零幻覺與文獻查證SOP.md`** 補一段
   - 「投稿前查核」加入第 9 條：同期刊前例查證
   - 與既有「白名單 14 篇 → click-to-source viewer → 人工逐筆修」流程銜接
3. **線 C（J博Team_AI_Methodology_Paper）素材**
   - 本案例可作為線 C §4「Quality control mechanisms」一節的「scope check」具體 case
   - 也可作為 §5「Human-AI labor allocation」的「人類拍板權」實證——AI 8 大任務漏掉的盲點被人類最後抓出

**升格時機**：
- patterns 升格：本次事件已驗證有效，但需要在第 2 個學術投稿（不論 TJFS 還是其他期刊）再用過一次才算「已穩定」；目前先停在 `已驗證`，留 inbox 等下次學術投稿時驗證再升 patterns
- nchu/concepts 升格：可立即執行（補一段不影響其他內容）
- 線 C 素材：等線 B 7/13 投稿後啟動線 C 時自動引用
