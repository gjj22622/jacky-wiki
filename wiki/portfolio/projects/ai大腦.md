---
title: AI 大腦（履約問答系統）
domain: portfolio
status: beta
deployed: —
---

# AI 大腦（履約問答系統）

> 受保護知識倉庫 + 履約 API：依 token 層級（L1/L2/L3）+ 主題雙閘，回答已授權範圍內的問題。發布層預設拒絕。
> 目前 **本機 beta**——Phase 0 驗收 8/8 通過，待 Zeabur credit 恢復後上雲。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\jacky-wiki`（AI 大腦在此 repo 內）|
| GitHub | `gjj22622/jacky-wiki`（dev 分支開發，main 上線）|
| Zeabur project | 未上線（credit $0，部署前置已備齊）|
| 前端網址 | 未上線 |
| 倉庫（AnythingLLM）| `http://localhost:3001`（本機）|
| 履約 API | `http://localhost:8080`（`POST /order`，限流 30/分）|
| DNS | 未接自有網域 |

---

## 登入

- **AnythingLLM admin**：帳號 `jackyadmin` → **密碼見金庫**（`.vault/作品金鑰.local.json` → `ai大腦`）。
- **履約 API 測試 key**：→ **見金庫**（L1, cross-domain 範圍）。

> 🔒 密碼/token 不寫在本頁。要登入資訊跑 `/作品 ai大腦`。

---

## 一鍵示範腳本

1. 確認本機 `docker compose up -d` 已起（倉庫 + 履約 API 常駐）。
2. 開瀏覽器 → `http://localhost:3001` → 用金庫的 admin 帳密登入，展示受保護倉庫。
3. 終端機示範履約 API：`POST http://localhost:8080/order`，帶測試 key（金庫），body 用 **UTF-8 檔案 + curl**（PowerShell 字串直送會 bad_json）。
4. 展示負向測試：錯 key → 401；越級主題 → 403；不存在 → 404（Phase 0 驗收 8/8）。

---

## 相關連結

- 部署 runbook → `../../../docs/deploy-zeabur.md`
- 本機端到端證明 → `../../../docs/ai-brain-phase0.md`
- 產品模型 → auto-memory `project-ai-brain-fulfillment`
- admin 後台設計 → [ailab/admin-token-backend-規格書](../../ailab/patterns/admin-token-backend-規格書.md)
- 作品總表 → [作品索引](../作品索引.md)
