---
title: MCP Servers（外部工具整合）
domain: ailab
updated: 2026-05-02
---

# MCP Servers

> **MCP（Model Context Protocol）**：讓 Claude 直接呼叫外部服務（Gmail / Drive / Calendar / Canva / Gamma...）的標準介面。
> **Jacky 用法**：把日常行政與素材操作整合進 IDE 對話，不用切視窗。

---

## 當前已啟用的 MCP

| MCP | 主場景 | 取代了 | 心得 |
|---|---|---|---|
| **Gmail** | 寫信草稿、找信、貼標籤 | Gmail 網頁 | 找信很順、寫信草稿穩 |
| **Drive**（Google）| 檔案搜尋、metadata、權限查 | Drive 網頁 | 列最近檔案、找文件 metadata |
| **Calendar** | 排程、查看、回應邀約 | Google Calendar | suggest_time 找空檔 |
| **Canva** | 圖像／設計檔案 | Canva 網頁 | 還在實驗階段 |
| **Gamma** | AI 簡報生成 | Gamma 網頁 | 還在實驗階段 |

---

## Gmail MCP

### 主要工具
| 工具 | 用途 |
|---|---|
| `search_threads` | 找特定主題／寄件人的對話 |
| `get_thread` | 讀完整對話 |
| `create_draft` | 寫信草稿 |
| `list_drafts` / `list_labels` | 列草稿／標籤 |
| `create_label` / `label_message` / `label_thread` | 標籤管理 |

### 典型用法
```
1. search_threads "TBSA 第三次理事會"
2. get_thread <thread_id>
3. create_draft（讀完上下文後直接寫回信）
```

### 沒用在的場景
- 即時收發（直接看 Gmail 網頁）
- 大量批次（用 Gmail API 寫腳本更穩）

---

## Drive MCP（Google）

### 主要工具
| 工具 | 用途 |
|---|---|
| `search_files` | 找檔案 |
| `list_recent_files` | 最近檔 |
| `get_file_metadata` / `get_file_permissions` | 檔案資訊 |
| `read_file_content` / `download_file_content` | 讀內容 |
| `create_file` / `copy_file` | 新建／複製 |

### 典型用法
- 對話中需要某份 Google Doc → 直接 `search_files` + `read_file_content`
- 找 OneDrive 對應的 Google Drive 同步檔

### 注意
- Drive MCP 是 **Google Drive**，不是 OneDrive
- OneDrive 直接走 Windows 本機檔案系統（`C:\Users\gjj22\OneDrive\`）

---

## Calendar MCP

### 主要工具
| 工具 | 用途 |
|---|---|
| `list_calendars` / `list_events` | 列行事曆／事件 |
| `get_event` | 看事件細節 |
| `create_event` / `update_event` / `delete_event` | CRUD |
| `respond_to_event` | 接受／拒絕邀約 |
| `suggest_time` | 找空檔（**最有用**）|

### 典型用法
- 「下週可以跟某客戶聊嗎？」→ `suggest_time` 找空檔 → `create_event`
- 「我這週會議多嗎？」→ `list_events`

---

## Canva / Gamma MCP（實驗階段）

兩者都需要 `authenticate` 走 OAuth。

| MCP | 預期用途 | 目前狀態 |
|---|---|---|
| Canva | 從 Claude Code 直接生圖／編設計 | 待跑 1 個真實案子驗證 |
| Gamma | AI 簡報生成 | 待跑 1 個真實簡報驗證 |

→ 升格條件：跑 ≥ 2 個 Jwood 或双云實際案子，比手動 Canva/Gamma 順 → 寫進 [模型選擇心法](模型選擇心法.md)。

---

## MCP 觀察中（尚未啟用）

| MCP | 何時可能啟用 |
|---|---|
| Notion MCP | 不會（已用 wiki repo）|
| Slack MCP | 双云有 Slack 時可能 |
| Linear MCP | 有專案需求時 |
| GitHub MCP | 已用 gh CLI 取代 |

---

## MCP 設計原則（個人選擇）

### 該啟用的訊號
- ✅ 解決「切視窗」的瓶頸（如：找信、查行事曆）
- ✅ 整合進 Claude Code workflow（不只是個獨立 chat 工具）
- ✅ 至少跑過 1 個真實任務

### 不啟用的訊號
- ❌ 「聽說有」（純實驗驅動，沒明確需求）
- ❌ 跟既有工具棧重疊（如 Notion vs wiki）
- ❌ 認證流程複雜但用例少（cost > benefit）

---

## MCP 與 wiki ingest 的協作

典型工作流：

```
1. 對話中說「整理 OneDrive/双云AI轉型/X 進 wiki」
2. 主對話用本機檔案系統讀（不需 MCP）
3. 但若需要查相關 Gmail 對話：用 Gmail MCP `search_threads`
4. 若需要查 Calendar 看「這次討論是哪天的」：用 Calendar MCP
5. 整合進 wiki/<域>/ 頁面
```

---

## 限制與雷區

| 雷 | 解 |
|---|---|
| MCP 認證 token 過期 | 重跑 authenticate（Claude Code 會提示）|
| MCP server 速度慢 | 並行多 MCP call、避免序列等待 |
| MCP 結果太大 | 先用 search 縮範圍，不要一次抓全部 |
| 跨帳號（私 vs 公司）| 每個帳號獨立 authenticate |

---

## 相關連結

- 域首頁 → [AI實踐索引](../AI實踐索引.md)
- 工具棧 → [工具棧索引](工具棧索引.md)
- Claude Code → [claude-code](claude-code.md)
