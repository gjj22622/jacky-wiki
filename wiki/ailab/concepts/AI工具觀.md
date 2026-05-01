---
title: AI 工具觀（為什麼選這套工具棧）
domain: ailab
updated: 2026-05-02
---

# AI 工具觀

> **核心信念**：工具會換（Gemini / ChatGPT / Claude / NotebookLM），方法論不會過時。
> 但**工具選擇本身是方法觀的延伸**——選什麼工具、怎麼組合、什麼時候換，反映的是「我怎麼工作」。

---

## 三條工具選擇原則

### 原則 1：可程式化 > 對話介面

**判斷**：能不能寫成 Skill / Hook / Plugin / 設定檔自動化？

| 偏好順序 | 例子 |
|---|---|
| 1. 可寫 Skill / commands / hooks | Claude Code、Codex CLI |
| 2. 可寫 Bot / API 串接 | n8n、ChatGPT API |
| 3. 純對話介面（最後選擇）| ChatGPT Web、Claude Web、Gemini Web |

**為什麼**：對話介面好用一兩次，但每次都重新解釋 context 等於沒記憶。**可程式化的工具一次設定終身受益**（auto-memory + skills + 設定檔）。

### 原則 2：在地檔案系統 > 雲端對話

**判斷**：產出能不能落到本機檔案、納入 git、可被多工具共讀？

| 偏好順序 | 例子 |
|---|---|
| 1. 直接寫本機檔（IDE 級工具）| Claude Code、Codex CLI |
| 2. 結構化雲端 + 本機同步 | OneDrive、Google Drive（搭配 MCP）|
| 3. 純雲端對話（要手動複製貼）| ChatGPT Web、Claude Web |

**為什麼**：本機檔案系統是真正的「持久記憶」。OneDrive 雙端同步 → wiki ingest → git commit 形成完整可追溯鏈。

### 原則 3：協作鏈完整 > 單點最強

**判斷**：這工具能不能跟其他工具協作？

| 偏好順序 | 例子 |
|---|---|
| 1. 開放介面、可被別工具呼叫 | Codex CLI（可被 Claude Code subagent 呼叫）|
| 2. 雙向同步、有 MCP / API | Drive / Calendar / Gmail MCP |
| 3. 封閉、只能在自己介面用 | 各家 GPT Store / Gem Store |

**為什麼**：單點最強的工具今天領先半年就被超越。**協作鏈完整的工具能搭配整套體系生長**——同樣的 Skill、Memory、Wiki，跟著工具棧滾動。

---

## 當前工具棧（2026-05）

| 角色 | 工具 | 為什麼選它 |
|---|---|---|
| **主對話 IDE** | Claude Code（Opus 4.7 / Sonnet 4.6 / Haiku 4.5）| Skill / Hook / Plugin / Subagent / Auto-memory 全套 |
| **跨檔重構／第二意見** | Codex CLI（GPT-5.4） | 結構性重構穩、跟 Claude Code 互補 |
| **第三方 LLM** | Zeabur AI Hub（OpenAI 相容介面） | 一個 endpoint 切多家 |
| **持久記憶** | `.claude/projects/<proj>/memory/` | 跨對話、可 grep、可 git |
| **跨平台素材** | OneDrive（双云／Jwood／TBSA／回憶錄）| 多機同步、進 wiki 前的緩衝區 |
| **Wiki** | jacky-wiki repo（git）| 結晶層，只放穩定知識 |
| **MCP** | Gmail / Drive / Calendar / Canva / Gamma | 行政 + 設計入口 |
| **多模態** | Codex CLI + gpt-image-2（Jwood）| 商品圖批次生成 |
| **部署** | Zeabur | TypeScript / Node 24 / SSR + vanilla JS |

> 詳見 [工具棧索引](../tools/工具棧索引.md)。

---

## 為什麼 Claude Code 是主軸

不是因為 Claude 模型最強（Opus 4.7 vs GPT-5.4 各有強項），是因為**整套生態最完整**：

| 組件 | 用途 |
|---|---|
| Skills | 可重用的方法論／流程封裝（jacky-wiki / graphify / seminar-helper / ailab）|
| Hooks | 事件驅動的自動化（commit hook / stop hook）|
| Plugins | 第三方功能（codex / zeabur）|
| Subagents | 多 Agent 協作（Explore / Plan / general-purpose）|
| Auto-memory | 跨對話記憶（user / feedback / project / reference 四類）|
| Slash commands | 自定義快捷指令（/wiki / /loop / /schedule）|
| MCP servers | 外部工具整合（Drive / Gmail / Calendar / Canva）|

> 等同於「**IDE + 助理 + 記憶系統 + 工作流引擎**」四合一，其他工具還在做單點。

---

## 工具棧的演化規則

### 加新工具的條件
- ✅ 解決現有工具棧的明確缺口（不是「想試試看」）
- ✅ 至少跑過 1 個真實案子（不是 demo 玩玩）
- ✅ 能跟既有工具鏈協作（不是孤島）

### 換掉舊工具的條件
- ✅ 新工具在 2-3 個任務上明顯更穩
- ✅ 能保留既有 Skill / Memory / Wiki（不破壞累積）
- ✅ 至少並行 1 個月（不是一夜換）

### 不換工具的時機
- ❌ 「聽說 X 模型分數更高」（benchmark 不等於實用）
- ❌ 「網紅推薦」
- ❌ 沒明確缺口、純追新

---

## 對「未來工具替代」的態度

> 「Claude 會不會被取代？」「GPT-6 出來怎麼辦？」

回答：**不會跟著工具走，會跟著方法走**。

- Skill / Memory / Wiki / 協定（**這些是方法觀的載體**）→ 跨工具可遷移
- Claude Code 介面 / Codex CLI 介面 / 模型本身（**這些是工具**）→ 隨時可換

當 GPT-6 出來，如果 OpenAI 的 IDE 整合超越 Claude Code，Skill 跟 Memory 都能搬遷（協定都是 markdown）。**真正不能搬的是方法觀本身**——而那不依賴任何單一工具。

---

## 三個常見的工具選擇錯誤

### 錯誤 1：追新工具忘了既有累積
症狀：每出新模型就跳，沒有累積 Skill、Memory。
解法：先看新工具能否承接既有累積，不行就先觀望。

### 錯誤 2：被「最強」綁架
症狀：堅持用某個 benchmark 第一名做所有事。
解法：「分流」概念——不同任務用不同模型/工具，不是一個工具包山包海。

### 錯誤 3：對話介面當主要工作場
症狀：在 ChatGPT Web 開 50 個對話，沒有持久化、沒有 git。
解法：對話只用來腦力激盪；落地一律進 IDE / 檔案系統。

---

## 相關連結

- 工具棧 → [工具棧索引](../tools/工具棧索引.md)
- 模型分流 → [模型選擇心法](../tools/模型選擇心法.md)
- Claude Code 心得 → [claude-code](../tools/claude-code.md)
- Codex CLI 心得 → [codex-cli](../tools/codex-cli.md)
- 學習新工具 → [學習方法](學習方法.md)
