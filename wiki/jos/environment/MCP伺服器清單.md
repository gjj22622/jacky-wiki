---
title: MCP 伺服器清單
domain: jos
updated: 2026-06-21
---

# MCP 伺服器清單

> MCP（Model Context Protocol）伺服器 = 讓 Claude Code 連到外部服務（Drive、Gmail…）的橋。
> 換機時這些需要**重新認證**（OAuth 登入），不能直接複製設定。
> 工具觀（為什麼用這些）→ [ailab/tools/mcp-servers.md](../../ailab/tools/mcp-servers.md)

---

## 主表

| MCP 伺服器 | 用途 | 連到哪 | 認證方式 |
|---|---|---|---|
| **Google Drive** | OneDrive/雲端硬碟素材 ingest | claude.ai 整合 | OAuth（瀏覽器登入 Google）|
| **Gmail** | 郵件管理（搜信、草稿、標籤）| claude.ai 整合 | OAuth |
| **Google Calendar** | 排程、查行程 | claude.ai 整合 | OAuth |
| **Canva** | 設計入口 | claude.ai 整合 | OAuth |
| **Gamma** | 簡報生成入口 | claude.ai 整合 | OAuth |
| **twinkle（opendata / twtools）**| 政府開放資料查詢、URL 轉 markdown | twinkle-hub | 互動登入 |

> 以上多為 **claude.ai 帳號層級的整合**——只要在新機用同一個 Claude 帳號登入，整合多半會跟著帳號走，但**每台機器首次使用仍可能要重新授權一次**。

---

## 換機重設步驟

1. 在新機用 **同一個 Claude 帳號** 登入 Claude Code。
2. 第一次叫用某個 MCP（例如要 Claude 讀 Drive），它會跳出**授權連結** → 用瀏覽器點開、登入對應服務（Google / Canva…）、按同意。
3. 授權一次後該機就記住了。
4. `twinkle` 等互動登入型：依當下提示完成 OAuth。

> **注意**：headless / 排程（cron）環境下，互動登入型 MCP（如 claude.ai 整合）可能無法使用——那是正常的，只在有人互動的 session 才可用。

---

## 已許可的 MCP 工具（settings.local.json 內，本機白名單）

> 這些是「免再問權限」的允許清單，屬本機設定（`settings.local.json` 不進 git）。換機後依需要重新允許即可。

- `mcp__twinkle-hub__opendata-*`（search_datasets / get_dataset / query_rows / list_domains）
- `mcp__twinkle-hub__twtools-fetch_url_as_markdown`

---

## 相關連結

- 工具觀（為什麼用 MCP）→ [ailab/tools/mcp-servers.md](../../ailab/tools/mcp-servers.md)
- 環境變數 → [環境變數清單](環境變數清單.md)
- 換機步驟 → [換電腦SOP](../migration/換電腦SOP.md)
