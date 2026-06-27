---
event: Wiki API 化與 MCP 接入權限控制模式
date: 2026-06-24
model: gpt-5 Codex
context: jacky-wiki AI 大腦 /order 排錯與團隊接入
type: 工作流改進
maturity: 已驗證
tags: ai-brain, wiki, mcp, api, rbac, access-control, codex, claude-code, anythingllm
---

## 事件一句話

把 Jacky wiki 從「只有自己能讀的 repo」封裝成一套可控的 AI 大腦服務：外層只開 `/order` API，內層用 AnythingLLM workspace 查知識，再用成員 key 控制 tier/topic 授權，最後補上 MCP server，讓團隊能在 Claude Code / Codex 介面直接用 `ask_jacky_wiki` 查 wiki。

## 為什麼值得記

這不是單純做一個 API，而是一個可複製的「私有知識庫對外供應鏈」模式：

- **知識不直接外露**：團隊不拿 repo、不看原文、不碰 AnythingLLM admin。
- **只交付答案包**：成員只送問題，系統回 `fulfilled:true/false` 與可引用的 package。
- **權限可分層**：key 對應 member，member 對應 tier/topic，API 只查授權 workspace。
- **AI 介面原生接入**：MCP 把 HTTP API 包成 `ask_jacky_wiki(question)`，Claude/Codex 可以直接呼叫，不需要成員打 curl。
- **可審計與可撤銷**：orders.log 記錄查詢軌跡，key 可 rotate/revoke，rate limit 可控。

這等於把 wiki 從「資料庫」升級成「AI 作業系統的知識服務」。

## 當時背景

成員打 `POST /order` 一直得到 `fulfilled:false`。排錯過程發現並修掉幾個根因：

- 歷史 thread 污染：改成每次 fresh thread。
- Zeabur CLI 被 TLS 攔截：改走 GitHub push 自動部署。
- Zeabur root dir 錯誤導致 Caddy/404：改成 `services/fulfillment`。
- filter 誤殺回答：改用 `NO_MATCH` sentinel。

最新 `filterfix-v3` 上線後，重測 `/order` 已回 `fulfilled:true`。接著需求從「API 能不能通」推進到「團隊怎麼在自己的 Codex / Claude 裡使用」。

## 做法

### 1. 外層只開 fulfillment API

檔案：

- `services/fulfillment/server.ts`

對外只保留：

- `GET /health`
- `POST /order`

刻意不做瀏覽器前端、不開 raw browse/list 端點，避免 wiki 被當資料庫任意翻。

### 2. API key 對應成員權限

`/order` 流程：

```txt
x-api-key
  -> authMember()
  -> member.tier + member.topics
  -> workspaces = topic-tier
  -> askWorkspace()
  -> fulfilled true/false
```

這裡的核心不是「驗證登入」而是「授權路由」：每個 key 只查到它對應的主題與層級。

### 3. AnythingLLM workspace 做知識隔離

wiki 發佈到多個 workspace，例如：

```txt
shuangyun-l3
education-l3
cross-domain-l3
```

fulfillment API 依 key 決定要查哪些 workspace。這讓隔離發生在兩層：

- publisher 階段：不同內容進不同 workspace。
- runtime 階段：不同 member key 只能打不同 workspace。

### 4. 回答規則用 sentinel，而不是脆弱文字判斷

先前 filter 用「沒有相關資訊」之類文字判斷，會誤殺真正答案。修正為要求模型在無命中時只回 `NO_MATCH`，API 只把精準 sentinel 視為 false。

這個模式適合所有 RAG 型服務：不要用自然語言模糊字串當控制訊號，應明確設計 machine-readable sentinel。

### 5. MCP server 把 API 包成 AI 工具

新增：

- `tools/jacky-ai-brain-mcp/src/server.mjs`
- `tools/jacky-ai-brain-mcp/README.md`
- `docs/ai-brain-mcp-setup.md`

MCP tool：

```txt
ask_jacky_wiki(question)
```

工具內部呼叫：

```txt
POST https://jacky-aibrain.zeabur.app/order
Header: x-api-key = JACKY_AI_BRAIN_KEY
Body: { question }
```

API key 只從環境變數讀：

```txt
JACKY_AI_BRAIN_KEY
JACKY_AI_BRAIN_URL
```

避免模型、使用者或 prompt 直接傳 key。

## 已驗證結果

- `/health` 回 `{"ok":true,"build":"filterfix-v3"}`。
- 直接打 `/order`，同題可回 `fulfilled:true`。
- MCP server `npm run self-test` 可成功查到 L3 答案。
- 用 MCP client 走 stdio protocol，工具清單包含 `ask_jacky_wiki`，同題回 `fulfilled:true`。

測試中也確認一個坑：PowerShell pipe 內直接傳中文給 Node 測試腳本時可能造成編碼破壞，導致同題 false；改用 UTF-8 檔案讀入後正常。這不是 MCP 問題，是 Windows shell 中文傳遞問題。

## 這套模式的抽象流程

```txt
私有 wiki / 知識庫
  -> publisher 分級發佈
  -> RAG workspace 隔離
  -> fulfillment API 外牆
  -> API key 驗證與授權路由
  -> answer package / NO_MATCH
  -> MCP tool 包裝
  -> Claude Code / Codex 原生使用
```

## 關鍵設計原則

1. **不要讓團隊直接讀庫**：團隊拿到的是工具，不是資料庫。
2. **不要讓模型碰管理權限**：admin key、members.json、AnythingLLM admin 都留在後台。
3. **權限要在 API 層 fail closed**：沒有 key、key 錯、workspace 無命中都不能外洩內容。
4. **回答和控制訊號分離**：答案是 package，無命中是 `NO_MATCH` / `fulfilled:false`。
5. **AI 介面用 MCP，不用叫人 curl**：curl 只適合排錯，團隊日常應該在 Claude/Codex 裡叫工具。
6. **先做最小工具再補文件**：先讓 `ask_jacky_wiki` 跑通，再補 Claude Code / Codex 安裝說明。

## 踩坑點

- 不要把「前端介面」誤解成瀏覽器 UI。這次真正需求是「AI 介面的工具接入」，也就是 MCP。
- Windows PowerShell 直接內嵌中文 JSON 容易壞，測 API 建議寫 UTF-8 檔再 `--data-binary @file`。
- Zeabur CLI 在 TLS 攔截環境會 x509 失敗，部署改走 GitHub 自動部署比較穩。
- Zeabur root dir 設錯會 build 出 Caddy 靜態站，不是 Node API。
- RAG 無命中判斷不能依賴自然語言片段，應使用 sentinel。
- MCP server 不應把 key 設計成 tool argument，否則模型可能在對話或 tool trace 裡暴露 key。

## 產物位置

- API：`services/fulfillment/server.ts`
- MCP server：`tools/jacky-ai-brain-mcp/`
- 團隊接入手冊：`docs/ai-brain-mcp-setup.md`
- 使用者 API 手冊：`docs/ai-brain-user-manual.md`
- 成員與 key 管理：`tools/members/manage.mjs`

## 可升格目標

- `ailab/patterns/wiki-api-mcp-access-control.md`：整理成「私有 wiki 封裝為 AI 工具服務」通用模式。
- `ailab/tools/mcp-servers.md`：補一段「Jacky AI Brain MCP」作為自建 MCP 範例。
- `jos/environment/MCP伺服器清單.md`：若未來 Jacky 自己常駐使用，可加入本機 MCP 清單。
- `education/playbooks/`：可升成給內部教學的「把私有知識庫變成團隊 AI 工具」SOP。

