---
title: AgentFlow Solutions（airun.tw）
domain: portfolio
status: active
deployed: 上線中（金流已開）
---

# AgentFlow Solutions（airun.tw）

> J董（AI CEO）體系的對外主站 + 多個子服務。正式營運、實時交易、金流已開（藍新正式 MerchantID）。**這是目前線上規模最大的作品。**

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\Jdongcompany\airun-site`、基礎設施文檔 `C:\Users\gjj22\jdong-wiki\infra` |
| GitHub | `gjj22622/airun-site`、`gjj22622/jdong-company` |
| 前端網址 | https://airun.tw （主站）、agentflow.zeabur.app（落地頁）|
| admin 網址 | https://airun.tw/admin/dashboard 、 /admin/pricing |
| 部署平台 | Zeabur（數據層 + n8n 自動化）+ Vercel（部分子站）|
| DNS | **airun.tw（自有網域）** ✅ |
| 金流 | 藍新金流（正式 MerchantID，已開實時交易）|

### 子服務（同一體系）

| 子站 | 網址 | 狀態 |
|---|---|---|
| mingnow（明腦知識服務）| mingnow.airun.tw | 🟡 規劃部署（W060 待跑）|
| mingcha（明察 Demo）| mingcha.tw/.ai/.co（候選）| ⚪ dev |
| 短網址系列 | airun.tw/go/527-* | 🟢 上線 |

---

## 登入

- **airun.tw admin**：帳號 → 見金庫（`jwood` 同檔 `agentflow` key）。
- ⚠️ `ADMIN_TOKEN` 等環境變數在 `jdong-wiki/infra/orchestrator/` —— **值不寫本頁，見金庫/該機 .env**。

> 要登入與金流後台資訊跑 `/作品 agentflow`。

---

## 一鍵示範腳本

1. 開 https://airun.tw → 展示 AgentFlow 主站、定價頁、金流已開（可下單）。
2. 開 https://airun.tw/admin/dashboard → 用金庫帳密登入，展示後台、CRM。
3. 展示自動化：n8n 工作流（Zeabur）、527 短網址系列（/go/527-*）。
4. （脈絡）背後決策層 = J董知識庫 `jdong-wiki/decisions/`（50+ 篇關鍵決策）。

---

## 相關連結

- 決策層知識庫 → `C:\Users\gjj22\jdong-wiki`（GitHub gjj22622/jdong-company）
- 客戶數據看板（同體系）→ [muzopet 數據看板](muzopet-dashboard.md)
- admin 後台設計法 → [ailab/admin-token-backend-規格書](../../ailab/patterns/admin-token-backend-規格書.md)
- 作品總表 → [作品索引](../作品索引.md)
