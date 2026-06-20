---
title: TJFS 投稿衝刺一日工作流 — 5 Agent 並行 + 查核-撰寫-Scope 三重閘門
domain: education
visibility: team
min_tier: L1
updated: 2026-05-20
audience: 內部團隊（J博Team 同事 + 學術投稿 AI 工作流學習者）
prerequisite: 用過 Claude Code、知道 cwd 與 Agent tool、看過 ailab/concepts 任一份
duration: 25 分鐘
tags: academic-submission, multi-agent, parallel-agents, citation-verification, journal-scope, claude-code, tjfs, forest-digital-twin
source_chat: 2026-05-20 J博Team TJFS Review Paper 一日衝刺對話（Claude Opus 4.7，含 5 個並行 sub-agent、查核 AI 跨對話交接、ailab 即時 capture、Pandoc 失敗→python-docx 替代、Jacky 4 個關鍵拍板）
---

# TJFS 投稿衝刺一日工作流

> 把學術投稿從「AI 寫一段 → 人類審一段」的散裝模式，升級成「**多 Agent 並行 + 查核-撰寫責任分離 + Scope 風險預防**」的工程化流程。
>
> 本案例：2026-05-20 一個對話內，從 41,532 字壓縮到 28,402 字主文，產出投稿規格 .docx，並完成 ailab 跨對話記錄與 TJFS scope 前例查證。

---

## 🎯 學習目標

讀完這份教材你會：

1. **能複用「5 Agent 並行精修」模式**到任何長文壓縮任務（論文、報告、whitepaper），知道何時並行、何時序列
2. **能設計「查核 AI ↔ 撰寫 AI」責任分離流程**，避免 AI 自己評自己造成的盲點
3. **能在投稿前跑完三層 scope 風險查證**（Google Scholar / 期刊官網 / 學科資料庫），避免 desk reject
4. **看懂 Jacky 拍板權的具體形態**：哪些決策一定要人類保留，哪些可下放 Agent

---

## 📦 先備知識

- 用過 Claude Code CLI
- 知道 `Agent` tool 是什麼、會用 `run_in_background`
- 用過 PowerShell（Windows）做檔案操作
- 看過 [實踐捕手協定](../../../ailab/concepts/實踐捕手協定.md) 任一段
- 用過 git pull/add/commit/push（多機同步）

---

## 章 1. 為什麼要做這個工作流？

### 1.1 散裝模式的兩個結構性問題

**問題 1：context 過長 → 精修保守化**

當對話 context 超過 ~40% 利用率，AI 的精修策略會自動偏保守（不敢整段刪、只敢刪細節）。本案例先前 session 的證據：

> 「上輪 05 AI、03 ground 第二輪精修，原本目標每章砍 42%，實際只砍 11-12%。原因是對話 context 已重，精修策略保守化。」

**解法**：把單一長對話的工作拆給多個獨立 sub-agent，每個有乾淨 context、明確 brief、獨立輸出檔。

**問題 2：寫稿者同時當審稿者 → 盲點漏抓**

AI 寫完一段、立刻自己審，會出現「自評偏誤」：作者視角無法看到讀者視角的問題。本案例的查核 AI 在 8 大任務裡漏掉「同期刊前例查證」，最後是 Jacky 在投稿前一刻問出來。

**解法**：寫稿 AI 與查核 AI 是不同對話實例，且都不能直接改稿——只能寫「不可動清單」「可砍清單」「紅旗清單」，交給統合 Agent 拍板。

### 1.2 本案例規模對照

| 指標 | 量 |
|---|---:|
| 對話總長 | 約 6 小時（含 4 個對話交接點）|
| 並行 sub-agent 數 | 5 個（每個負責 1-3 章）|
| 第二輪精修字數變化 | 主文 38,834 → 28,402 字（-27%）|
| R1 引用修復 | 3 處（DOI/期別/數字錯誤）|
| Scope 查證 web search | 4 輪 + 2 次 WebFetch |
| 找到的同期刊前例 | 2 篇（從 0 → 2，逆轉 desk reject 風險評估）|
| ailab 即時 capture | 1 份 Mode A（投稿前 scope 查證模式）|
| 產出檔案 | .docx 主稿 + .docx cover letter + 6 份分章檔 + 4 份分析報告 + 1 份 ailab inbox |

延伸閱讀：[AI 工具觀 — 整合鏈完整 > 單點最強](../../../ailab/concepts/AI工具觀.md)

---

## 章 2. 整體流程地圖（5 Phase）

```
Phase 1  查核 AI 跨對話審查     ────► 紅旗清單（R1 引用錯）+ 不可動/可砍清單
                ↓
Phase 2  R1 引用修復             ────► 投稿主稿不再含 hallucination
                ↓
Phase 3  5 Agent 並行精修        ────► 9 個分章獨立檔（每章砍 8-46%）
                ↓
Phase 4  合併 + 學術嚴謹閘門     ────► 字數驗算 + 7 項紅旗檢查
                ↓
Phase 5  Word 排版 + Scope 查證  ────► .docx 投稿規格檔 + Scope 風險評估
```

每個 Phase 都有明確的「輸入 → 處理 → 輸出」與**驗收標準**。下面逐章拆解。

---

## 章 3. Phase 1 — 查核 AI 跨對話審查

### 3.1 為什麼要分對話跑

如果同一個對話既寫稿又審稿，AI 對自己剛寫的內容有「沉浸效應」，盲點漏抓。**完全獨立的對話實例**才能維持讀者視角。

### 3.2 怎麼操作

1. **撰寫對話**先收工凍結（用 `/wrap-up`，產出 todolist 給接手用）
2. **查核對話**用新對話啟動，給三件 input：
   - 主稿絕對路徑
   - 守門員 Agent 角色檔（含三方向錨點）
   - V3 reference list（書目主檔）
3. **查核 AI 必須產出 3 份檔案**（不能改稿）：
   - `查核AI回饋.md`（10 節結構化報告）
   - `_citation_crossref_check.csv`（Crossref API 抽驗 15 條）
   - `撰寫AI開工指令.md`（給下個對話的接手指令）

### 3.3 查核 AI 8 大任務（本案例採用）

| # | 任務 | 紅旗等級 |
|:-:|---|---|
| 1 | 字數獨立驗證 | — |
| 2 | 引用 hallucination 抽查 15 條 | R1 必修 |
| 3 | Taiwan 政府數字一致性 | R2 補頁碼 |
| 4 | V3 三方向錨點呼應 | Y1 黃旗 |
| 5 | 引用句型與冒號禁令 | R3/R4 |
| 6 | 每章可整段刪除候選 + 不可動清單 | — |
| 7 | 章節間銜接邏輯 | — |
| 8 | TJFS 30 點 checklist | — |

⚠️ **本案例漏掉的第 9 任務**：**同期刊前例查證**（章 6 詳述）。

### 3.4 採坑點：查核 AI 自己也會 hallucinate

本案例查核 AI 在「必查清單」列出「Zheng 2024 *Journal of Remote Sensing*」，但 manuscript 與 reference list 都查不到這條——**查核 AI 自己編造了引用**。

**解法**：撰寫 AI 接手時必須用 Crossref / Airiti DB 二次驗證查核 AI 的 output。

延伸閱讀：[零幻覺與文獻查證 SOP](../../../nchu/concepts/零幻覺與文獻查證SOP.md)

---

## 章 4. Phase 2 — R1 引用修復

### 4.1 R1 是什麼

R1 = **投稿前必修等級**（reviewer 或編輯抓到會直接退稿）。本案例三件 R1：

| # | 問題 | 修法 |
|:-:|---|---|
| 1 | Sasaki & Abe 2025 期別錯 17(10) → 17(9)、DOI 錯 fi17100421 → fi17090421 | 全文 + reference list 替換（4 處）|
| 2 | Tian 2023 「50% 地上碳/85% 地下碳」無 PDF 原文佐證 | 改保守表述「重要碳庫之一」|
| 3 | Zheng 2024 *Journal of Remote Sensing* 無對應條目（查核 AI 編造）| 用既有可信 Mohammed 2019 *RSE* 替換 |

### 4.2 為什麼順手砍 MRV 列舉

R1-1 Sasaki 段原文同時帶出 COP29 / Verra / ART-TREES / ICVCM 四項碳治理機制，與本論文「不接 MRV」V3 三方向錨點衝突。**修 DOI 時順手砍**這四項列舉，一次解決兩個風險。

**心法**：R1 修復不只是文字替換，也是檢查同段是否還有其他與論文方向衝突的內容。

### 4.3 採坑點：作者中文姓名 romanization 必驗

中文期刊投稿的 reference list 條目，作者英文 romanization（如 Wei 浚紘 → "Wei, Chun-Hung" 或 "Wei, J.H."？）必須回 PDF 原文驗證，不能用漢語拼音規則「合理推測」。

**解法**：暫存 `(author romanization to be verified)` 標註，等 Jacky 跟黃老師驗證後補。

---

## 章 5. Phase 3 — 5 Agent 並行精修（本案例核心方法論）

### 5.1 為什麼用 sub-agent 而不是 multi-tool-call

| 情境 | 用 |
|---|---|
| 任務之間有資料依賴 | 主對話內序列 tool call |
| 任務完全獨立 + 每個都很長 | **Agent tool + run_in_background** |
| 任務 context 重 + 主對話需保留 capacity | **Agent tool** |

本案例 9 章獨立檔可平行處理且各章 brief 長（不可動清單 + 可砍清單共 ~1000 字），用 sub-agent 才不會吃爆主對話 context。

### 5.2 5 個 Agent 任務分配（實戰）

| Agent | 章節 | 任務 | 輸出檔 |
|:-:|---|---|---|
| A | Section 8 Taiwan | 4,983 → 3,000 | `04_稿件章節/08_Taiwan_第二輪精修.md` |
| B | Section 5 AI | 5,626 → 3,500 | `05_AI_第二輪精修.md` |
| C | Section 3 Ground | 5,520 → 3,500 | `03_Ground_第二輪精修.md` |
| D | Section 4 RS + Section 7 FDT | 4,266 → 3,500 / 4,775 → 4,000 | 2 個檔 |
| E | Section 1 + 2 + 9 | 3,536 → 2,500 / 2,701 → 1,500 / 1,904 → 1,200 | 3 個檔 |

關鍵設計：**每個 Agent 寫自己的獨立檔**，不動主整合稿 → 完全 race-free。等所有 Agent 完成後由主對話用 PowerShell 合併腳本組裝。

### 5.3 每個 Agent 的 brief 模板（可複製）

```text
你是 <X> Agent 派出的 Section N <主題> 第二輪精修專員。

## 任務
把整合稿 Section N（原 X 字）壓縮到約 Y 字（±10%），保留學術嚴謹性。

## 來源
讀 <絕對路徑> 的 lines AAA-BBB（Section N 整章）。

## 輸出檔案
<獨立檔絕對路徑>

## 絕對不可動（從查核 AI §七抽出）
- <錨點 1>（數字、引用、概念）
- <錨點 2>
- 不接 MRV

## 可大刀刪除
- <與其他章重複段>
- <非台灣或非核心 case study>
- <工具名展開列舉>

## 硬性紅線
1. 不准編造引用、頁碼、數字、卷期、DOI
2. 不准新增沒在原稿出現過的文獻
3. 引用必須用中式學術句型「YYYY 年，XX 等人於 *Journal* 卷(期): 頁碼 發表的文獻指出 …」
4. 不准用「許多研究」「一些研究」等口語引用
5. 中文標題、副標、摘要不可用冒號（：）
6. 不准潤稿、不准重新發明架構

## 回報格式
完成後回傳：原字數、新字數（PowerShell 驗算）、刪除量、保留的不可動錨點、刪掉的段落與理由、仍需確認的引用、輸出路徑。

學術嚴謹優先於壓縮幅度。寧可超目標也不要砍掉不可動清單中任一錨點。
```

### 5.4 為什麼「學術嚴謹優先於壓縮幅度」要寫進每個 brief

不寫的話 Agent 會為了達標而「整段刪不可動內容」。本案例 5 個 Agent 都觸到「再砍會傷錨點」的紅線，全部選擇略超目標——這是**正確判斷**，因為投稿後可以再壓字，但漏錨點會被 reviewer 抓出。

### 5.5 採坑點：Agent 字數驗算結果可能不一致

Agent 自己用「中文字計數」、合併腳本用「非空白字元計數」，兩個數字會差 ~25-40%。本案例 Agent C 報「4,583 字符」、合併後驗 4,239 字。

**解法**：主對話有最終發言權——以合併腳本字數為準，Agent 報的字數只當參考。

延伸閱讀：[Agent 並行使用心法（待寫）](../../../ailab/patterns/模式索引.md)

---

## 章 6. Phase 4 — 合併 + 學術嚴謹閘門

### 6.1 合併腳本設計關鍵

```powershell
# 從主整合稿抽前段（篇名 + 摘要）
$preMatch = [regex]::Match($source, '(?s)^.*?(?=# Section 1\b)')

# 從各分章檔讀內容依序組裝
foreach ($p in $sectionPaths) {
  $mainBody += "`n`n" + (Get-Content $p -Raw -Encoding UTF8) + "`n`n---`n`n"
}

# 從主整合稿抽後段（致謝 + reference list）
$postMatch = [regex]::Match($source, '(?sm)^# 致謝.*$')
```

⚠️ **採坑點 1**：postMain regex 第一版寫成 `^## (?:致謝|引用)...` 雙井號，但實際 reference 段是 `# 致謝（Acknowledgments）` 單井號。**第一次合併 postMain 是空白**，reference list 全沒進來。修法：把 regex 改成 `^# 致謝.*$`。

⚠️ **採坑點 2**：PowerShell 5.1 不支援 hashtable in array literal 多行語法（會 ParseException）。把 `@( @{Name=...; File=...}, ... )` 改成兩個並列陣列 `@("01.md", "02.md", ...)` 或用 inline 一行寫法。

### 6.2 學術嚴謹閘門 7 項

```powershell
# 1. 字數
$nonSpace = ($content -replace '\s','').Length

# 2. MRV 字眼（不接 MRV 錨點）
$mrv = [regex]::Matches($content, 'MRV|measurement[- ]reporting[- ]verification')

# 3. 口語引用
$vague = [regex]::Matches($content, '許多研究|一些研究|有一篇|最近有篇|不少研究')

# 4. Sasaki 期別防回退（R1-1）
$wrong = [regex]::Matches($content, '17\(10\):\s*421|fi17100421')

# 5. Taiwan 政府數字錨點
$keyNums = @('2,197,090','29,389','40\.756','14\.059','81\.5%','11\.9%')

# 6. 中式學術句型密度
$cites = [regex]::Matches($content, '\d{4}\s*年[，,]\s*[A-Z一-鿿][a-zA-Z一-鿿\-]+(?:\s+(?:and|與)\s+...)\s+等?人?於\s+\*[^*]+\*')

# 7. 標題冒號違規
$titleColons = [regex]::Matches($content, '^#+\s+.*[：:].*$', 'Multiline')
```

每項可獨立通過/失敗，**閘門全綠才能進 Phase 5 排版**。

### 6.3 採坑點：「許多研究」修補要含中文摘要

第一次預修腳本只改了主文 3 處「許多研究」，**漏改中文摘要那處**。修補要把摘要也納入 grep 範圍。

延伸閱讀：[零幻覺與文獻查證 SOP](../../../nchu/concepts/零幻覺與文獻查證SOP.md)

---

## 章 7. Phase 5 — Word 排版 + Scope 查證

### 7.1 Pandoc 安裝失敗 → python-docx 替代

`winget install JohnMacFarlane.Pandoc` 在某些機台返回 exit 255（admin 權限或 source 同步問題）。**不要陷在安裝裡**，立刻切備案：

**備案路線：Python + python-docx**

```python
from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_LINE_SPACING

doc = Document()
section = doc.sections[0]
section.page_width = Cm(21.0)
section.page_height = Cm(29.7)
section.top_margin = Cm(3)
# ... 設定 + 解析 markdown
doc.save('output.docx')
```

完整腳本見 `J博Team_Review投稿/06_投稿管理/md_to_docx.py`（~170 行）。

⚠️ **採坑點**：Python 在 Windows CP950 預設編碼會在 print emoji 時 `UnicodeEncodeError`。前置 `$env:PYTHONIOENCODING = "utf-8"` 解決。

### 7.2 TJFS 規範符合性自動驗證

```python
doc = Document('output.docx')
section = doc.sections[0]
assert section.page_width.cm == 21.0     # A4
assert section.page_height.cm == 29.7
assert section.top_margin.cm == 3.0      # 四邊 3cm
# Line spacing 是文件級樣式，要查 paragraphs[].paragraph_format.line_spacing_rule == WD_LINE_SPACING.DOUBLE
```

### 7.3 Scope 風險查證 — 三層搜尋（**本案例最大教訓**）

**為什麼這項必做**：投稿前必須驗證該期刊是否曾發表過類似主題，否則 desk reject 風險高。本案例 Jacky 在投稿前一刻問出來，AI 用三層搜尋找到 2 篇關鍵前例：

```text
第一層 — Google Scholar / WebSearch 廣搜
   query 1: "<期刊全名>" "<本文核心關鍵詞>"
   query 2: "<期刊全名>" "<本文核心方法論>" review
   query 3: <中文期刊名> <中文核心關鍵詞>

第二層 — 期刊官網 + 編輯平台
   - Aim & Scope 描述
   - 最新一期目錄（看接受什麼主題）
   - Manuscript types（review article 是否在內）

第三層 — 學科資料庫 site:filter
   site:airitilibrary.com "<中文期刊名>" <關鍵詞>
   site:scopus.com / site:webofscience.com <關鍵詞>
   site:pubmed.ncbi.nlm.nih.gov <關鍵詞>
```

### 7.4 找到前例後的 4 件後續分析

1. **風險再評估**（高/中/低）：scope mismatch desk reject 機率變化
2. **必補引用清單**：在哪些 section 補哪幾篇前例
3. **潛在審稿人推測**：找到的前例作者可能是 reviewer 候選
4. **Cover letter 「為何投本刊」段強化**：明確聲明本文是該刊既有路線的延伸

延伸閱讀：[2026-05-20 TJFS scope 與前例查證 ailab 紀錄](../../../ailab/inbox/2026-05-20-tjfs投稿前scope與前例查證.md)

---

## 章 8. Jacky 4 個關鍵拍板（人類保留決策權的具體形態）

### 拍板 1（15:30）：暫停寫稿改派審稿

> 「做到這裡收工，我現在讓查核 AI 來查核目前的內容，請幫我準備給他的指令」

**意義**：AI 處於「我可以繼續寫」狀態時，是 Jacky 喊停的——AI 沒有「該停了」的自我察覺。

### 拍板 2（16:15）：今天必出 .docx + 拆平行分支

> 「今天目標要做出一版正式投稿版本的 word 檔，請拆分平行分支同時進行各項工作。請注意不要因為快速產出，而忽略了學術的嚴謹性」

**意義**：時程壓縮 D-day 從 2026-07-13 拉到「今天」+ 明確紅線「嚴謹性不可犧牲」。AI 需立刻切換策略到並行多 Agent。

### 拍板 3（投稿前一刻）：問期刊前例的關鍵風險

> 「我想到一個關鍵的問題這本期刊之前沒有 類似 森林數位孿生的 期刊投稿發表嗎？」

**意義**：查核 AI 8 大任務漏掉的第 9 項，是 Jacky 在投稿前一刻自己想到並丟出來的——**人類拍板權的價值在於「AI 沒問的問題」**。

### 拍板 4（最後）：值得記錄做分享文件

> 「以上這些內容值得記錄，然後我選 a」+ 後續「整理今天的各項工作流程⋯⋯做成分享文件」

**意義**：把今天的實踐沉澱為跨對話可重用資產（ailab + education 雙軌：個人 + 對外）。

---

## 章 9. 採坑點集合

### 採坑 #1：對話 context 過長 → 精修策略保守化
- **症狀**：第二輪精修砍幅遠低於目標（目標 42%、實際 11-12%）
- **誤區假設**：AI 是「無記憶執行體」、應該對所有 context 量無差別
- **真實原因**：context 利用率高時，AI 自動偏保守、不敢整段刪
- **解法**：把工作拆給多個獨立 sub-agent，每個乾淨 context
- **預防**：監控對話 context 利用率，超過 40% 就考慮拆 sub-agent

### 採坑 #2：查核 AI 自己 hallucinate
- **症狀**：「Zheng 2024 *Journal of Remote Sensing*」在必查清單，但 manuscript 與 reference list 都查不到
- **誤區假設**：查核 AI 比寫稿 AI 嚴謹
- **真實原因**：所有 AI 都會 hallucinate，「查核」身份不會自動防止
- **解法**：撰寫 AI 接手時用 Crossref / Airiti DB 二次驗證查核 AI 的 output
- **預防**：查核 AI 也納入 zero-hallucination protocol，引用必驗

### 採坑 #3：PowerShell 5.1 hashtable in array literal 語法不相容
- **症狀**：`@( @{Name='01'; File='...'}, @{...} )` 跨多行 → ParseException
- **誤區假設**：PowerShell 5.1 與 7+ 語法相同
- **真實原因**：5.1 parser 對多行 hashtable 陣列有限制
- **解法**：改用並列陣列 `@("01.md", "02.md")` 或 inline 一行寫法
- **預防**：寫 .ps1 腳本時先確認目標機台 PowerShell 版本

### 採坑 #4：merge regex 抓不到 reference list
- **症狀**：合併後 postMain 是空白、reference list 全沒進來
- **誤區假設**：原稿用 `## 致謝` 雙井號
- **真實原因**：原稿其實是 `# 致謝` 單井號
- **解法**：把 regex 改成 `^# 致謝.*$`
- **預防**：寫 regex 前先 grep 看實際標題層級

### 採坑 #5：Pandoc 安裝失敗（exit 255）
- **症狀**：`winget install JohnMacFarlane.Pandoc` 返回 255
- **誤區假設**：winget 一定能裝
- **真實原因**：admin 權限或 winget source 同步問題
- **解法**：切備案 Python + python-docx
- **預防**：環境檢查階段同時驗證 Pandoc / Python / Word 三條路線

### 採坑 #6：Python print emoji UnicodeEncodeError (cp950)
- **症狀**：`print(f"✅ 輸出: ...")` → `'cp950' codec can't encode character '✅'`
- **誤區假設**：Python 預設 UTF-8
- **真實原因**：Windows 預設 stdout 是 cp950
- **解法**：前置 `$env:PYTHONIOENCODING = "utf-8"`
- **預防**：腳本內加 `sys.stdout.reconfigure(encoding='utf-8')` 或環境變數

### 採坑 #7：「許多研究」清查漏中文摘要
- **症狀**：第一次 grep 清完 3 處仍有 1 處
- **誤區假設**：grep 已涵蓋全文
- **真實原因**：中文摘要那處用了同樣 phrase 但沒納入清查
- **解法**：閘門腳本對全檔（含摘要、致謝）跑 grep
- **預防**：閘門 grep 範圍要 = 全檔，不要只看主文

### 採坑 #8：作者中文姓名 romanization 不能猜
- **症狀**：reference list 條目要寫 "Wei, J.H." 還是 "Wei, Chun-Hung"？
- **誤區假設**：漢語拼音規則合理推測
- **真實原因**：中文期刊各自 romanization 不同（有的用威妥瑪、有的用漢語拼音、有的用作者偏好）
- **解法**：暫存 `(author romanization to be verified)` 標註，等 PDF 原文驗證
- **預防**：所有中文姓名第一次出現時不猜，標 pending

延伸閱讀：[禁止編造書目資訊（feedback memory）](../../../../.claude/projects/C--Users-gjj22-Desktop--------/memory/feedback_no_bibliographic_hallucination.md)（jacky-wiki 之外的個人記憶）

---

## 章 10. 跨對話資產化

本工作流產出的可重用資產，**不只是 .docx 投稿稿**，還有以下持久化資產：

| 資產 | 位置 | 跨對話用途 |
|---|---|---|
| 查核 AI 指令模板 | `J博Team_Review投稿/06_投稿管理/查核AI指令_2026-05-20.md` | 下次任何學術投稿可改 keyword 復用 |
| 5 Agent brief 模板 | 本檔章 5.3 | 任何長文壓縮可改章節數復用 |
| 學術嚴謹閘門腳本 | `06_投稿管理/_閘門腳本_2026-05-20.ps1` | 改紅旗清單後可跨論文復用 |
| md → docx Python 腳本 | `06_投稿管理/md_to_docx.py` | 通用 markdown to TJFS-spec docx 轉換器 |
| ailab capture | `ailab/inbox/2026-05-20-tjfs投稿前scope與前例查證.md` | 三層 scope 查證模式（待升 patterns） |
| TJFS scope 前例分析 | `06_投稿管理/TJFS_scope_前例分析_2026-05-20.md` | TJFS 投稿備胎期刊清單與潛在審稿人 |

**設計原則**：每個資產都應該「換掉 TJFS 換成別的期刊也能用」，避免一次性執行。

延伸閱讀：[AI 工具觀 — 整合鏈完整 > 單點最強](../../../ailab/concepts/AI工具觀.md)

---

## 🚀 快速回顧

學術投稿一日衝刺的關鍵不是「AI 寫得多快」，而是「**人機分工是否設計過**」。本案例的核心結構：

- **責任分離**：查核 AI 標問題、撰寫 AI 下刀、Jacky 拍板方向——三個責任不混
- **並行分流**：9 個分章拆給 5 個獨立 sub-agent，避開 context 飽和的保守化
- **錨點優先**：每個 Agent 都被告知「學術嚴謹優先於壓縮幅度」，超目標也不能傷錨點
- **閘門檢查**：合併後 7 項紅旗自動驗，全綠才進 Word 排版
- **Scope 預檢**：投稿前用三層搜尋查同期刊前例，避免 desk reject

Jacky 的 4 個關鍵拍板，每個都對應一個 AI 看不到的盲點。**把人類拍板權設計進工作流，比追求 AI 自主性更值錢**。

---

## 延伸閱讀

- [實踐捕手協定](../../../ailab/concepts/實踐捕手協定.md)（Mode A / Mode B 9 欄位）
- [三層萃取漏斗](../../../ailab/concepts/三層萃取漏斗.md)（事件升格機制）
- [AI 工具觀](../../../ailab/concepts/AI工具觀.md)（整合鏈完整 > 單點最強）
- [零幻覺與文獻查證 SOP](../../../nchu/concepts/零幻覺與文獻查證SOP.md)
- [AI Co-Researcher 工作流](../../../nchu/concepts/AI_Co-Researcher工作流.md)
- [2026-05-20 ailab capture — TJFS scope 查證](../../../ailab/inbox/2026-05-20-tjfs投稿前scope與前例查證.md)
- [配對 Playbook：5 Agent 並行學術精修 SOP](../../playbooks/多agent並行學術精修SOP.md)

---

## 簡報大綱

→ [slides-outline.md](slides-outline.md)（25 張投影片）
