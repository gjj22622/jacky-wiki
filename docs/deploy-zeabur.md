# AI 大腦 — Zeabur 部署 Runbook

> 把本機 Phase 0/1 跑通的「受保護倉庫＋訂單履約 API」上到 Zeabur，開放公網 API。
> 前置：Phase 1 對外前置已完成（多語 embedder + per-key 限流）。

## 0. 前置門檻（必看）

- **Zeabur credit 必須 > $0**。目前帳號 `gjj22622`（DEVELOPER 方案）credit `$0.00` → **儲值後才能部署**。
- 估算月成本：2 容器低載約 **NT$300–600/月**（AnythingLLM 長駐吃基礎配額，履約 API 無狀態）。建議首充小額觀察首月帳單。
- 金鑰：`OPENROUTER_API_KEY`（LLM＋embedding 同一把）、`ANYTHINGLLM_API_KEY`（履約→倉庫）、成員表 `MEMBERS_JSON`。**全部進 Zeabur 環境變數，不進 repo。**

## 1. 服務拓樸（兩個 service，一個對外）

```
[公網] ──HTTPS──▶ fulfillment（履約 API，POST /order）   ← 唯一對外，綁網域 + 自動 TLS
                      │ Zeabur 私網 DNS
                      ▼
                  anythingllm（倉庫）  ← 不綁公網域名，只走私網；掛 Volume
```

**鐵則**：anythingllm service **不要綁 public domain**。只有 fulfillment 對外。成員永遠碰不到倉庫。

## 2. 建立服務

### 2a. anythingllm（倉庫，prebuilt image）
- Source：Docker image `mintplexlabs/anythingllm:latest`
- **Volume**：掛載到 `/app/server/storage`（持久化 workspace/文件/向量；換 embedder 後是 `text-embedding-3-large` 的 3072 維向量）
- **不開 public domain**（Networking 只保留私網）
- 環境變數：
  ```
  STORAGE_DIR=/app/server/storage
  LLM_PROVIDER=openrouter
  OPEN_ROUTER_API_KEY=<OpenRouter key>
  OPEN_ROUTER_MODEL_PREF=openai/gpt-4o-mini
  EMBEDDING_ENGINE=generic-openai
  EMBEDDING_BASE_PATH=https://openrouter.ai/api/v1
  EMBEDDING_MODEL_PREF=openai/text-embedding-3-large
  EMBEDDING_MODEL_MAX_CHUNK_LENGTH=8000
  GENERIC_OPEN_AI_EMBEDDING_API_KEY=<OpenRouter key>
  GENERIC_OPEN_AI_EMBEDDING_MAX_CONCURRENT_CHUNKS=128
  ```
- 首次起來後：跑一次 onboarding（multi-user / 產 admin API key），或沿用本機已驗證的自動化 API 流程（`/api/system/enable-multi-user` → `/api/request-token` → `/api/admin/generate-api-key`）。把產出的 admin key 設為履約 service 的 `ANYTHINGLLM_API_KEY`。

### 2b. fulfillment（履約 API，git + Dockerfile）
- Source：本 repo `services/fulfillment/`（含 Dockerfile，Node 24 原生跑 TS）
- **綁 public domain + 自動 TLS**
- 環境變數：
  ```
  ANYTHINGLLM_BASE_URL=http://anythingllm.zeabur.internal:3001   # 私網 DNS，依 Zeabur 實際內網名調整
  ANYTHINGLLM_API_KEY=<上一步的 admin key>
  PORT=8080
  RATE_LIMIT_PER_MIN=30
  MEMBERS_JSON={"members":[{"id":"...","tier":"L1","topics":["cross-domain"],"api_key":"<隨機長字串>"}]}
  ```
- `MEMBERS_JSON` 用環境變數帶入（server.ts 已支援環境變數優先、檔案 fallback），**雲端不需掛 members.json 檔**。

## 3. 灌資料（publisher 入庫）

publisher 從**作者機本機**跑，指向 Zeabur 的 anythingllm（暫時開一個私網可達的方式，或本機 SSH/port-forward；不建議長期對外開 3001）：
- `tools/publisher/config.json` 的 `baseUrl` 指向倉庫、`ANYTHINGLLM_API_KEY` 設 admin key
- `node publish.ts --dry-run` 先看 report → 確認沒有敏感頁/誤標 → `node publish.ts` 正式入庫
- 換 embedder 後若是全新倉庫：清空 `manifest.json` 讓它重新上傳重嵌入

## 4. 上公網的資安強化（清單）

- [ ] anythingllm **無 public domain**（只私網）
- [ ] fulfillment 只暴露 `POST /order` + `GET /health`，其餘 404（已內建）
- [ ] 所有金鑰在 Zeabur env，repo 與 CI 全無明文
- [ ] 成員 key 用足夠亂度的長字串（≥ 32 char 隨機）
- [ ] per-key 限流已開（`RATE_LIMIT_PER_MIN`）；視客戶量調整
- [ ] （選配）前置 Cloudflare：隱藏來源、加 WAF/DDoS、統一 TLS
- [ ] Volume 定期備份（匯出 `/app/server/storage`）——Zeabur 不保證自動備份
- [ ] admin key 與成員 key 分離：admin key 只給 publisher/履約服務，絕不發給成員

## 5. 部署後驗收（對 public URL 重跑負向測試）

把本機驗收的 8 步指向 Zeabur 的履約網域，確認雲端與本機行為一致：
1. `GET /health` → `{"ok":true}`
2. L1 訂單 → 拿到「知識＋判斷邏輯」包裹（`fulfilled:true`）
3. 問 jlife / 客戶真名 → `fulfilled:false` 0 命中
4. 無 key / 錯 key → 401
5. `GET /order`、`/workspaces`、`/documents` → 404
6. 直連倉庫網域（若不慎暴露）→ 應無 public domain，連不到
7. 並發 > 限流值 → 部分 429
8. 倉庫 admin 檢視成員可達 workspace 文件清單 → 確認無敏感/越級頁

## 6. 回滾 / 備援

- Zeabur 帳單超預期或要更高資源天花板 → 切 **Hetzner CX32 VPS**（約 NT$240/月），`docker compose up -d` 原封搬移（compose 已含 embedder + 限流設定）。
- 倉庫資料：Volume 匯出 = 唯一資料來源備份；publisher 的 wiki 是 source of truth，最壞情況可重灌。

## 7. 成本監控

- Zeabur：設預算告警；首月對帳，確認 AnythingLLM 長駐用量落點。
- OpenRouter：LLM（gpt-4o-mini）＋ embedding（text-embedding-3-large）同一帳號計費；4MB 語料一次性建索引費用極低（分錢級），日常成本主要在每張訂單的 LLM 回答 token。
