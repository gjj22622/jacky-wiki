# AI 大腦 — Phase 0 操作手冊（Proof）

受保護倉庫 + 訂單履約 API 的最小證明。目標：證明**零洩漏 + 不可瀏覽**。
完整計畫見 `C:\Users\gjj22\.claude\plans\jacky-wiki-ai-zazzy-sprout.md`。

## 元件
- **倉庫**：AnythingLLM（Docker，multi-user/volume/TLS）。Workspace = 主題×層級。
- **入庫**：`tools/publisher/`（TS 零依賴）。
- **對外面**：`services/fulfillment/`（TS 零依賴，唯一公開端點 `POST /order`）。

## 金鑰紅線（已 .gitignore）
`config.json`、`manifest.json`、`denylist.txt`、`members.json`、`orders.log`、`.env` 全部不進 repo。

## 本機端到端（最快 Proof）
```bash
cp .env.example .env                       # 填 ANYTHINGLLM_API_KEY（先空，待倉庫起來產生）
cp services/fulfillment/members.json.example services/fulfillment/members.json   # 或用 members.example.json
cp tools/publisher/config.example.json tools/publisher/config.json
docker compose up -d --build               # 起 AnythingLLM(:3001) + fulfillment(:8080)
```
1. 開 `http://localhost:3001` 完成 AnythingLLM 初始設定 → **開啟 multi-user mode、設管理員密碼**。
2. 設定 → API Keys 產生 Developer API key → 填進 `.env` 的 `ANYTHINGLLM_API_KEY` → `docker compose up -d` 重載。
3. 設定 LLM/Embedding provider（可用 Zeabur AI Hub 或外部 OpenAI 相容 key）。
4. 跑入庫：
   ```bash
   cd tools/publisher && ANYTHINGLLM_API_KEY=xxx node publish.ts
   ```
   會自動建 `cross-domain-l1` workspace、扇出 cross-domain 8 頁、產 `report.md`。
5. 為 `members.json` 的測試成員填一把隨機 `api_key`，重啟 fulfillment。

## Phase 0 驗收（負向測試，全過才算完成）
```bash
# 1) L1 成員問 cross-domain → 應拿到「對應知識 + 判斷邏輯」包裹
curl -s localhost:8080/order -H "x-api-key: <會員key>" -H "content-type: application/json" \
  -d '{"question":"賣點命名理論的重點是什麼？"}'

# 2) 問 jlife / 客戶真名 → fulfilled:false（0 命中）
curl -s localhost:8080/order -H "x-api-key: <會員key>" -H "content-type: application/json" \
  -d '{"question":"濂餐廳這個客戶案例的細節？"}'

# 3) 嘗試枚舉/下載原文 → 無此端點（404）
curl -s -X POST localhost:8080/documents -H "x-api-key: <會員key>"
curl -s localhost:8080/order   # GET → 404

# 4) 直連倉庫 → 需帳號，成員沒有（成員只有 fulfillment 的 api_key，沒有 AnythingLLM 帳號/key）
```

## Zeabur 雲端路徑（正式）
- 倉庫 AnythingLLM 部署到 Zeabur（Docker image `mintplexlabs/anythingllm`，掛 volume 於 `/app/server/storage`，繫域名自動 TLS）。
- fulfillment 可一併部署到 Zeabur 或本機指向 Zeabur 倉庫 URL（`ANYTHINGLLM_BASE_URL`）。
- publisher 永遠本機手動跑（帶 admin key，不進 public CI）。
