---
title: 多 Agent 並行學術精修 SOP — Claude Code Sub-agent 拆分長文壓縮的標準操作手冊
domain: education
visibility: team
min_tier: L2
updated: 2026-05-20
audience: 內部團隊 / 學術投稿者
prerequisite: 用過 Claude Code Agent tool、會 PowerShell 字串操作
duration: 15 分鐘
tags: claude-code, agent-tool, parallel-execution, long-document, academic-compression
source_chat: 2026-05-20 J博Team TJFS 投稿衝刺對話
---

# 多 Agent 並行學術精修 SOP

> 把單一長對話的長文壓縮任務，拆給多個 Claude Code sub-agent 並行處理，避開 context 飽和造成的「精修保守化」。
>
> 適用任何 8,000-50,000 字以上的文檔壓縮：論文、技術報告、whitepaper、書稿章節。

---

## 適用情境

✅ **適用**：
- 文檔可拆成 6+ 個獨立章節，章節間無強耦合
- 每章有明確「不可動清單」「可砍清單」「目標字數」
- 主對話 context 已超過 30-40% 利用率
- 需要在數小時內完成多章壓縮

❌ **不適用**：
- 章節間有強敘事連續性（如小說情節線）
- 全文需要保持單一作者語氣（會被多 Agent 風格分裂）
- 文檔短於 6,000 字（單對話內處理較快）

---

## 前置條件

| 項目 | 規格 |
|---|---|
| 工具 | Claude Code（含 Agent tool、PowerShell tool）|
| 平台 | Windows / macOS / Linux 任一（PowerShell 在 Linux 需用 pwsh）|
| 模型 | Opus 4.7 或 Sonnet 4.6（不要用 Haiku，brief 太長會掉細節）|
| 必備檔案 | 查核 AI 回饋報告（含每章「不可動清單」「可砍清單」）|
| 必備檔案 | 主稿絕對路徑 + 章節 line range 索引 |
| 資料夾 | `04_稿件章節/`（接收 Agent 各自的獨立輸出檔）|

---

## 步驟（編號可勾選）

### 步驟 1：產出 Agent 派工表

- [ ] 從查核 AI 回饋抽出每章「不可動清單」「可砍清單」「目標字數」
- [ ] 把 9 章按字數負擔分配給 5 個 Agent（不是 1 章 1 Agent）：

```
Agent A：1 個最大章節
Agent B：1 個次大章節
Agent C：1 個中等章節
Agent D：2 個中小章節
Agent E：3 個小章節
```

- [ ] 確認每個 Agent 的輸出檔路徑不重疊
- [ ] 整理出 9 個分章檔的命名規則（建議：`<NN>_<英文章名>_第二輪精修.md`）

### 步驟 2：寫 Agent brief（每個 Agent 一份）

- [ ] 依下方模板填入每章具體內容
- [ ] **brief 字數控制在 800-1,200 字**（再長會分散 Agent 焦點）
- [ ] 末尾必加「**學術嚴謹優先於壓縮幅度。寧可超目標也不要砍掉不可動清單**」

**Brief 模板**：

```text
你是 <X> Agent 派出的 Section N <主題> 第二輪精修專員。任務：把整合稿 Section N（X 字）壓縮到約 Y 字（±10%），保留學術嚴謹性。

## 來源
讀 <整合稿絕對路徑> 的 lines AAA-BBB（Section N 整章）。

## 輸出檔案
<獨立檔絕對路徑>

## 絕對不可動
- <錨點 1：具體數字 / 引用 / 概念>
- <錨點 2>
- 不接 MRV / 不變題目方向 / 其他 V3 三方向錨點

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

## 輸出格式
```
# Section N <章名>

狀態：第二輪精修版（YYYY-MM-DD，目標 ~Y 字）

---

## N. <章名>

[第二輪精修內容]
```

## 回報格式
完成後給我：原字數、新字數（PowerShell 驗算）、刪除量、保留的不可動錨點、刪掉的段落與理由、仍需確認的引用、輸出路徑。

字數驗算用：
```powershell
$c = Get-Content "<輸出檔路徑>" -Raw -Encoding UTF8
Write-Host "字數: $(($c -replace '\s','').Length)"
```

學術嚴謹優先於壓縮幅度。寧可超目標也不要砍掉不可動清單中任一錨點。
```

### 步驟 3：並行起動所有 Agent

- [ ] 在主對話內**單一 message 含多個 Agent tool call**（並行啟動 5 個）
- [ ] 每個 Agent `subagent_type: "general-purpose"` + `run_in_background: true`
- [ ] 等待通知（不要 poll）

```javascript
// 偽碼示意 — 實際在 Claude Code 內一個 message 多個 tool call
Agent({ description: "Section 8", prompt: "<Agent A brief>", run_in_background: true });
Agent({ description: "Section 5", prompt: "<Agent B brief>", run_in_background: true });
Agent({ description: "Section 3", prompt: "<Agent C brief>", run_in_background: true });
Agent({ description: "Section 4+7", prompt: "<Agent D brief>", run_in_background: true });
Agent({ description: "Section 1+2+9", prompt: "<Agent E brief>", run_in_background: true });
```

### 步驟 4：等通知期間做不衝突的後置工作

- [ ] 寫合併 PowerShell 腳本（步驟 5 用）
- [ ] 寫嚴謹閘門 PowerShell 腳本（步驟 6 用）
- [ ] 環境檢查：Pandoc / Python / Word 哪個能用
- [ ] 寫 cover letter / 圖表 placeholder（與主稿不衝突）

⚠️ **不要動主稿**——Agent 還在讀，併發衝突會壞事

### 步驟 5：合併 9 個分章檔

- [ ] 用 PowerShell 腳本組裝：
  - 從原整合稿抽前段（篇名 + 摘要 + 主文標題）
  - 依序讀 9 個分章檔組成主文
  - 從原整合稿抽後段（致謝 + reference list）
- [ ] regex 注意：先 grep 確認原稿標題層級（`#` vs `##`），不要憑記憶
- [ ] **PowerShell 5.1 慎用 hashtable in array literal**（多行寫法會 ParseException）
- [ ] 合併完跑字數驗算

### 步驟 6：跑學術嚴謹閘門

- [ ] 字數（依目標期刊上限）
- [ ] 紅旗詞（如 MRV、許多研究、最近有篇）
- [ ] R1 修復防回退（如 Sasaki 期別 17(10) vs 17(9)）
- [ ] 數字錨點完整性（Taiwan 政府數字、Lin Apulia 數字、Zhang 統計數字）
- [ ] 中式學術句型密度（review paper ≥ 50 處）
- [ ] 標題冒號違規
- [ ] **閘門全綠才能進 Word 排版**

### 步驟 7：產出最終 .docx

- [ ] 首選 Pandoc（`pandoc input.md -o output.docx --reference-doc=template.docx`）
- [ ] 備案 Python + python-docx（見 `J博Team_Review投稿/06_投稿管理/md_to_docx.py`）
- [ ] **Windows 預先設** `$env:PYTHONIOENCODING = "utf-8"`
- [ ] 用 python-docx 讀回驗證：A4 / 邊界 / 字型 / 行距

---

## 異常情況分支

### 分支 A：某個 Agent 回報「再砍會傷錨點」

**症狀**：Agent 報目標 3,500、實際 4,200，並列出「兩個進一步壓縮選項都會違反不可動清單」

**處理**：
1. **接受 Agent 判斷**——學術嚴謹優先於壓縮幅度
2. 主對話統合時把這章列入「Phase 6 第三輪精修候選」
3. 不要強迫 Agent 再砍——會傷錨點

### 分支 B：Agent 編造引用或數字（hallucinate）

**症狀**：Agent 輸出含「XXXX 年，OO 等人於 *Journal X* 卷期: 頁碼」但 reference list 無此條

**處理**：
1. 立刻 Crossref API 驗證該 DOI
2. 不存在 → 從 Agent 輸出刪除該句並改用既有可信書目
3. 把該事件升格為 ailab capture（Mode A，type=失敗）

### 分支 C：合併後字數仍超 30% 以上

**症狀**：閘門報字數超 30,000+

**處理**：
1. 檢查 reference list 是否含「工作備註」（如 `> ⚠️ 待 Jacky 確認`、`## 1. 14 篇核心文獻` 分類標題）
2. 用 regex 清除工作備註行
3. 仍超 → 確認 in-text 引用清單，砍掉沒被引用的 reference 條目
4. 仍超 → Phase 6 第三輪精修

### 分支 D：Pandoc 安裝失敗

**症狀**：`winget install JohnMacFarlane.Pandoc` exit 255

**處理**：
1. **不要陷在安裝裡** — 切備案 Python + python-docx
2. python-docx 腳本可直接生成符合期刊規範的 .docx
3. 完整腳本見 `J博Team_Review投稿/06_投稿管理/md_to_docx.py`

### 分支 E：合併 regex 抓不到 reference list

**症狀**：合併後 .docx 沒 reference 段

**處理**：
1. Grep 原稿 reference 區塊起點的實際 heading（`#` vs `##`，`引用文獻` vs `References` vs `致謝`）
2. 修 regex 為實際格式
3. 重跑合併

---

## 驗收標準

| 項目 | 通過條件 |
|---|---|
| 9 個分章獨立檔 | 全部存在於 `04_稿件章節/`、每個非空白字元 ≥ Agent 報的數字 ±10% |
| 主文字數 | 達原目標的 90-110% 區間（學術嚴謹優先） |
| 嚴謹閘門 7 項 | 字數可超量、其他 6 項全綠 |
| 不可動錨點 | 所有錨點仍在文中（用 PowerShell grep 驗證）|
| Agent 回報品質 | 每個 Agent 有「原/新字數 / 刪除量 / 保留錨點 / 刪除理由 / 仍需確認」5 欄回報 |
| .docx 格式 | python-docx 驗證 A4 / 邊界 / 字型 / 雙倍行距全部符合期刊規範 |

---

## 配對教材

- [TJFS 投稿衝刺一日工作流（含本 playbook 案例）](../workshops/2026-05-20-tjfs投稿衝刺-多agent並行工作流/README.md)
- [實踐捕手協定（事件捕捉）](../../ailab/concepts/實踐捕手協定.md)
- [零幻覺與文獻查證 SOP](../../nchu/concepts/零幻覺與文獻查證SOP.md)
