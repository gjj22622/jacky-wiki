---
title: Claude Code（主對話 IDE）
domain: ailab
updated: 2026-05-02
---

# Claude Code

> Jacky 工具棧的**核心**——不是因為 Claude 模型最強，是因為 IDE + Skill + Memory + Subagent + MCP 的整套生態最完整。

---

## 為什麼選它做主軸

→ 詳見 [AI工具觀](../concepts/AI工具觀.md)

簡言之：**對話介面 + 檔案系統 + 持久記憶 + 工作流引擎四合一**，其他工具還在做單點。

---

## 五大組件實際用法

### 1. Skills（可重用方法論封裝）

**位置**：`~/.claude/skills/<name>/SKILL.md`

**Jacky 當前 Skills**：

| Skill | 觸發 | 用途 |
|---|---|---|
| `jacky-wiki` | `/wiki` | 查詢／更新 wiki |
| `graphify` | `/graphify` | 任何輸入 → 知識圖 |
| `seminar-helper` | （非斜線觸發）| NCHU 9 階段專討工作流 |
| **`ailab`**（本次新建）| `/ailab` | 實踐捕手協定執行 |

**寫 Skill 心得**：
- frontmatter 的 `description` 是 trigger 判斷依據——寫得越精準，Claude 越能正確觸發
- Skill 是 markdown，可以放 prompt、指令、SOP、規則
- Skill 之間可以互相引用（`jacky-wiki` 可以呼叫 `graphify`）

→ 詳細寫 Skill 流程候選獨立成 page，先放這裡

### 2. Hooks（事件驅動自動化）

**位置**：`~/.claude/settings.json`

**用途**：
- `PreToolUse` / `PostToolUse`：工具呼叫前後攔截
- `Stop`：對話結束時做事（如自動 commit）
- `UserPromptSubmit`：使用者送出前處理

**Jacky 目前用法**（待補完，下個月規劃）：
- 預想：commit hook 自動加 Co-Authored-By
- 預想：stop hook 自動把當對話的方法級事件丟進 ailab/inbox/

### 3. Plugins（第三方功能）

**Jacky 當前 Plugins**：
- `codex` — 呼叫 Codex CLI subagent（rescue / setup / gpt-5.4 prompting）
- `zeabur` — 部署相關（auth / deploy / database / template ...）
- `frontend-design` — 前端設計輔助
- `claude_ai` MCP servers — Canva / Gamma / Gmail / Calendar / Drive

### 4. Subagents（多 agent 協作）

**主要 Subagents**：

| Subagent | 何時用 |
|---|---|
| `Explore` | 程式碼／檔案搜尋（不要用主對話 grep）|
| `Plan` | 架構規劃（複雜任務先 plan）|
| `general-purpose` | 通用研究、多步驟任務 |
| `claude-code-guide` | 問 Claude Code 怎麼用 |
| `codex:codex-rescue` | 主對話卡住時呼叫 Codex 第二意見 |

**Subagent 心得**：
- 並行：獨立任務一次發多個（同 message 多 tool call）
- 不要重複工作：delegate 給 subagent 後不要自己也做一遍
- 終止判斷：subagent 回覆是「它打算做什麼」，不是「實際做了什麼」——要 verify

### 5. Auto-memory（跨對話記憶）

**位置**：`.claude/projects/<project-hash>/memory/`

**結構**：
- `MEMORY.md`：索引（每行一個 memory pointer）
- 各 memory 個別 .md 檔，含 frontmatter（name / description / type）

**4 種類型**：user / feedback / project / reference

→ 詳見 [auto-memory系統](auto-memory系統.md)

---

## 模型切換

主要在 Claude Code 內切：

| 模型 | 何時用 | 切換 |
|---|---|---|
| **Opus 4.7 (1M ctx)** | 深度任務、長 context | 主用 |
| **Sonnet 4.6** | 一般 coding | `/model claude-sonnet-4-6` |
| **Haiku 4.5** | 子任務、Subagent 內部 | 自動 |

→ 詳見 [模型選擇心法](模型選擇心法.md)

---

## Settings 重要欄位（個人配置）

`~/.claude/settings.json`：
- `permissions`：允許哪些工具不問
- `hooks`：事件鉤子
- `env`：環境變數

→ 配置 settings 用 `update-config` skill。

---

## 與其他 AI 工具的協作

### Claude Code → Codex CLI
- 用 `codex` plugin，主對話遇到瓶頸 → `codex:rescue` 子代理把任務丟給 Codex CLI
- 適合：跨檔結構性重構、第二意見診斷

### Claude Code → ChatGPT / Gemini
- 不直接整合（也不需要），通過 [實踐捕手協定](../concepts/實踐捕手協定.md) 統一格式

### Claude Code → MCP servers
- Gmail / Drive / Calendar / Canva / Gamma 全部走 MCP
- 需 authenticate 一次（每個 MCP）

---

## 個人 workflow 模板

### Workflow 1：wiki ingest
```
1. /wiki query "<主題>"  ← 確認既有狀態
2. 讀 OneDrive 素材
3. 寫對應 wiki/<域>/ 頁面
4. 更新 wiki/wiki主索引.md
5. 寫 wiki/log.md
6. commit (feat(wiki): 描述 + Co-Authored-By)
```

### Workflow 2：新工具學習
→ 詳見 [學習方法](../concepts/學習方法.md)

### Workflow 3：跨檔重構
```
1. Plan subagent 規劃改動
2. Explore subagent 搜出影響範圍
3. 主對話 Edit / Write
4. 驗證階段：codex:rescue 第二意見
5. 跑測試（如果有）
6. commit
```

---

## 關鍵技巧

### 並行 tool call
獨立任務在同一個 message 發多個 tool call → 大幅加速。

### 不要在主對話 grep
用 Explore subagent 或 Grep tool；主對話 grep 容易污染 context。

### Auto-memory 主動寫
不只回答時讀 memory，也要主動寫——Jacky 講了什麼偏好、踩了什麼坑，當下就 save。

### Skill > Slash command > 純 prompt
能寫成 Skill 就不要每次都 prompt。

### 1M ctx 不是濫用許可
Opus 4.7 (1M) 不代表可以塞無限 context——cache 5 分鐘 TTL，超過 5 分鐘要重讀。看[ScheduleWakeup](../concepts/實踐捕手協定.md) 文檔對 cache window 的說明。

---

## 雷區

| 雷 | 結果 | 解 |
|---|---|---|
| 對話太長一直累積 context | 變慢、變貴、變遲鈍 | 該開新對話就開 |
| Skill description 太短 | trigger 判斷錯 | 寫具體場景與關鍵詞 |
| 把 wiki 當對話歷史 | 流水帳污染結晶層 | 對話結束才升格 inbox → wiki |
| 沒讀 memory 就回答 | 重複問已答過的問題 | 每次先讀 MEMORY.md |
| 手動 grep 主檔 | 慢 + Token 浪費 | 用 Grep tool |

---

## 相關連結

- 域首頁 → [AI實踐索引](../AI實踐索引.md)
- 工具觀 → [AI工具觀](../concepts/AI工具觀.md)
- Codex CLI（互補）→ [codex-cli](codex-cli.md)
- 模型分流 → [模型選擇心法](模型選擇心法.md)
- Auto-memory → [auto-memory系統](auto-memory系統.md)
- MCP 整合 → [mcp-servers](mcp-servers.md)
