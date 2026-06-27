# Jacky AI Brain MCP 接入手冊

目的：讓團隊成員在 Claude Code / Codex 裡直接用工具查 Jacky wiki，不需要自己打終端機 curl。

## 1. 架構

```txt
Claude Code / Codex
  -> MCP tool: ask_jacky_wiki(question)
  -> POST https://jacky-aibrain.zeabur.app/order
  -> Jacky AI Brain 回傳知識包
```

成員只會拿到自己的 `jaibrain_...` key。key 放在本機 MCP 設定的環境變數裡，不要寫進 repo，不要貼在對話中。

## 2. 取得 MCP 工具

把這個資料夾交給成員：

```txt
tools/jacky-ai-brain-mcp/
```

在該資料夾安裝依賴：

```powershell
cd <你的路徑>\jacky-ai-brain-mcp
npm install
```

需求：

- Node.js 20+
- 可連到 `https://jacky-aibrain.zeabur.app`
- 一組個人 API key

## 3. 自測

```powershell
$env:JACKY_AI_BRAIN_KEY="jaibrain_換成自己的key"
npm run self-test
```

成功時會看到：

```txt
fulfilled: true
tier: L2 或 L3

...
```

常見錯誤：

- `Missing JACKY_AI_BRAIN_KEY`: 沒設定 key
- `HTTP 401 unauthorized`: key 錯了或已被撤銷
- `fulfilled: false`: 知識庫沒有命中，或該 key 沒有對應授權範圍

## 4. Claude Code 設定

在 MCP 工具資料夾以外也可以執行；重點是 `node` 後面要填正確的 `src/server.mjs` 絕對路徑。

```powershell
claude mcp add jacky-ai-brain `
  -e JACKY_AI_BRAIN_KEY=jaibrain_換成自己的key `
  -e JACKY_AI_BRAIN_URL=https://jacky-aibrain.zeabur.app `
  -- node C:\path\to\jacky-ai-brain-mcp\src\server.mjs
```

檢查：

```powershell
claude mcp list
claude mcp get jacky-ai-brain
```

使用方式：

```txt
請用 ask_jacky_wiki 查詢：請說明双云 AI Agent 課程拆建修串管交六步框架分別在教什麼。
```

## 5. Codex 設定

編輯：

```txt
~/.codex/config.toml
```

加入：

```toml
[mcp_servers.jacky_ai_brain]
command = "node"
args = ["C:\\path\\to\\jacky-ai-brain-mcp\\src\\server.mjs"]

[mcp_servers.jacky_ai_brain.env]
JACKY_AI_BRAIN_URL = "https://jacky-aibrain.zeabur.app"
JACKY_AI_BRAIN_KEY = "jaibrain_換成自己的key"
```

重新啟動 Codex 後使用：

```txt
請用 ask_jacky_wiki 查 Jacky AI Brain：双云 AI Agent 課程六步框架是什麼？
```

## 6. 建議放進團隊專案的 AGENTS.md / CLAUDE.md

```md
當問題涉及双云、AI Agent 課程、SOSTAC、TBSA、Jacky wiki 或內部知識時，優先使用 MCP 工具 `ask_jacky_wiki` 查詢。

若工具回傳 `fulfilled:true`，以工具回傳的知識包為主要依據回答。
若工具回傳 `fulfilled:false`，不要編造；明確說知識庫沒有命中，需要轉人工或補資料。
不要要求使用者提供或顯示 API key。
```

## 7. 管理注意事項

- 每位成員用自己的 key，不共用。
- key 外洩時，管理者應 rotate / revoke 該成員 key。
- 不要把 `JACKY_AI_BRAIN_KEY` 寫進 `.env` 以外的文件；`.env` 必須 gitignore。
- MCP server 只暴露 `ask_jacky_wiki`，不提供列目錄、讀原文、管理 key 等能力。
