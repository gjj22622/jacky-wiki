# Jacky AI Brain MCP

讓 Claude Code、Codex 或其他 MCP client 透過工具 `ask_jacky_wiki` 查詢 Jacky AI Brain。

這個 MCP server 不存放成員 key。每位成員只要在自己的本機環境設定 `JACKY_AI_BRAIN_KEY`。

## 工具行為

- Tool name: `ask_jacky_wiki`
- Input: `question`
- Backend: `POST https://jacky-aibrain.zeabur.app/order`
- `fulfilled:true`: 回傳可直接引用的知識包
- `fulfilled:false`: 代表知識庫沒有命中，應轉人工或補資料

## 安裝

```powershell
cd C:\Users\gjj22\jacky-wiki\tools\jacky-ai-brain-mcp
npm install
```

成員自己的電腦可以放在任意資料夾，只要路徑在 MCP 設定中指到 `src/server.mjs`。

## 先做連線自測

PowerShell:

```powershell
$env:JACKY_AI_BRAIN_KEY="jaibrain_換成成員自己的key"
npm run self-test
```

成功會看到：

```txt
fulfilled: true
tier: L2 或 L3

...
```

## Claude Code 接入

在 MCP server 目錄執行：

```powershell
claude mcp add jacky-ai-brain `
  -e JACKY_AI_BRAIN_KEY=jaibrain_換成成員自己的key `
  -e JACKY_AI_BRAIN_URL=https://jacky-aibrain.zeabur.app `
  -- node C:\Users\gjj22\jacky-wiki\tools\jacky-ai-brain-mcp\src\server.mjs
```

檢查：

```powershell
claude mcp list
claude mcp get jacky-ai-brain
```

使用時對 Claude 說：

```txt
請用 ask_jacky_wiki 查詢：請說明双云 AI Agent 課程拆建修串管交六步框架分別在教什麼。
```

## Codex 接入

在 `~/.codex/config.toml` 加入：

```toml
[mcp_servers.jacky_ai_brain]
command = "node"
args = ["C:\\Users\\gjj22\\jacky-wiki\\tools\\jacky-ai-brain-mcp\\src\\server.mjs"]

[mcp_servers.jacky_ai_brain.env]
JACKY_AI_BRAIN_URL = "https://jacky-aibrain.zeabur.app"
JACKY_AI_BRAIN_KEY = "jaibrain_換成成員自己的key"
```

重新開 Codex 後，對 Codex 說：

```txt
請用 ask_jacky_wiki 查 Jacky AI Brain：請說明双云 AI Agent 課程拆建修串管交六步框架。
```

## 建議放進團隊專案的 AGENTS.md / CLAUDE.md

```md
當問題涉及双云、AI Agent 課程、SOSTAC、TBSA、Jacky wiki 或內部知識時，優先使用 MCP 工具 `ask_jacky_wiki` 查詢。

若工具回傳 `fulfilled:true`，以工具回傳的知識包為主要依據回答。
若工具回傳 `fulfilled:false`，不要編造；明確說知識庫沒有命中，需要轉人工或補資料。
不要要求使用者提供或顯示 API key。
```
