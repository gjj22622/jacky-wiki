# AI 大腦 — 管理者使用說明書（Jacky 專用）

> 機密等級：內部。金鑰**不在本文件**，全部在金庫 `wiki/portfolio/.vault/ai-brain-deployment.md`（gitignored）。
> 最後更新：2026-06-21

---

## 0. 一頁總覽

| 項目 | 值 |
|---|---|
| 對外入口（履約 API）| `https://jacky-aibrain.zeabur.app` |
| 倉庫（AnythingLLM）| 純內部 `anythingllm.zeabur.internal:3001`，**無公網 domain** |
| 平台 | Zeabur，Tencent 東京專用 server（2C/8GB，$6/月固定）|
| 月費 | server $6 固定 ＋ OpenRouter 用量（每張訂單幾分錢）|
| 倉庫內容 | 3 主題 × 3 層級 = 9 workspace；59 頁入庫 |
| 線上成員 | 3 位 pilot（金庫有 key）|

---

## 1. 系統架構（心智模型 = 電商訂單履約）

```
成員（持 api_key）
   │ POST /order  { question }
   ▼
[履約 API] fulfillment（唯一對外面）
   ├ 認證 api_key → 取成員(tier, topics)
   ├ 層級+主題雙閘 → 選 workspace 集 = {topic-tier | topic ∈ 成員主題}
   ├ 呼叫倉庫 answer-only → 合成「知識+判斷邏輯」包裹
   └ 審計 orders.log → 回包裹（永不回原文/不可枚舉）
        │ 內部私網
        ▼
[倉庫] AnythingLLM（無公網）
   9 workspace 矩陣，向量檢索 + LLM 合成
```

**核心原則**：成員只下訂單、永遠碰不到倉庫。權限靠**物理隔離**——不該看的內容根本不在他可達的 workspace，越權/jailbreak 也問不出不存在的資料。

### 1.1 層級 × 主題矩陣（累積扇出）
- 主題：`cross-domain` / `education` / `shuangyun`
- 層級：`L1`（入門）⊂ `L2`（實作）⊂ `L3`（核心，含 AGENTS®）
- 頁的 `min_tier` 決定它扇出到哪幾層：L1 頁→[l1,l2,l3]、L2→[l2,l3]、L3→[l3]
- 成員 tier=L1 只查 `*-l1`，碰不到 L2/L3 獨有內容；topics 未含的主題完全隔離。

---

## 2. 環境與依賴

- **Zeabur**：DEVELOPER 方案 + Tencent 東京 dedicated server（已租）。專案 `jacky-ai-brain`。
- **OpenRouter**：一把付費 key 同時管 LLM（`openai/gpt-4o-mini`）+ embedding（`openai/text-embedding-3-large`）。key 在 repo `.env` 與金庫。
- **本機工具**：Node 24（原生跑 TS/mjs，零 npm 依賴）、Zeabur CLI（`npx zeabur@latest`）、curl。
- **IDs / 帳密 / api_key**：全在金庫。

---

## 3. 日常操作

### 3.1 成員管理（發 / 換 / 撤 key）
```bash
cd tools/members
node manage.mjs list                                       # 看名冊
node manage.mjs add 王小明 L2 shuangyun,education "王小明"    # 新增 → 印 key 一次（存金庫！）
node manage.mjs rotate 王小明                               # 換 key（外洩/定期）
node manage.mjs revoke 王小明                               # 移除
node manage.mjs sync                                        # ★ 必做：推上線 + redeploy
```
細節見 `docs/ai-brain-member-governance.md`。

### 3.2 灌新內容進大腦（wiki → 倉庫）
1. **標分層**：新頁加 frontmatter `visibility: team` + `min_tier: L1/L2/L3`（或批次跑 `tools/publisher/tag-tiers.mjs`）。
2. **開隧道**（倉庫無公網，維運期才開）：
   ```bash
   npx zeabur@latest service port-forward --id <倉庫service-id> --enable
   npx zeabur@latest service port-forward --id <倉庫service-id> -i=false --json   # 取 forwardedPort
   ```
3. **改 publisher config**：`tools/publisher/config.json` 的 `baseUrl` 指向 `http://<server-ip>:<forwardedPort>`、`topics`/`activeTiers` 設好。
4. **dry-run 審核**：`node publish.ts --dry-run` → 看 report，確認沒有敏感頁誤入、denylist 有攔到客戶名。
5. **正式發布**：`$env:ANYTHINGLLM_API_KEY=<admin key>; node publish.ts`。
6. **關隧道**（★ 資安）：`port-forward --disable`。
7. **還原本機 config**（若有備份）。

> 提醒：跑 publisher 對「全新/重置的 workspace」要先清 `manifest.json` 為 `{}`；換 embedder 或想撤回舊頁時，先刪該 workspace 再重發。

### 3.3 內容去敏防線（多層）
- **路徑硬排除**：`jlife/`、`ailab/inbox/`、`ailab/experiments/`、`shuangyun/cases/`、`inbox/`、`raw/` 永不入庫。
- **去敏 fail-closed**：頁含 email / `denylist.txt`（客戶真名）→ 整頁退出。`denylist.txt`（gitignored）目前含木酢寵物/晟光建設/濂直火割烹。**接新客戶就把客戶名加進去。**
- **AGENTS® 安全網**：含此標記的頁自動鎖 `min_tier=L3`（凌駕 frontmatter）。

---

## 4. 監控、稽核、成本

- **訂單審計**：`docker exec`（經 Zeabur）或履約容器內 `/app/orders.log`——誰、層級、問題摘要、命中哪些 workspace。
- **名冊變更**：`tools/members/members-audit.log`（add/rotate/revoke/sync）。
- **Zeabur Dashboard**：CPU/RAM、部署狀態、帳單用量。
- **成本盯點**：server $6 固定；OpenRouter 隨訂單量走（看 OpenRouter 後台用量）。RAM 才是 Zeabur 主成本，但已含在 server 固定費。

---

## 5. 安全紅線

1. 倉庫**永不綁公網 domain**；維運用 port-forward，**用完立刻 disable**。
2. admin key / 成員 key / members.json / .env / 金庫**絕不進 git**（已 gitignored）。
3. 接新客戶/新內容前，先更新 `denylist.txt`，再 publisher dry-run 複核。
4. 成員 key 一人一把；疑似外洩立刻 `rotate`。
5. 履約 API 只有 `POST /order` + `GET /health`，其餘 404（不可枚舉）。

---

## 6. 故障排除

| 症狀 | 原因 / 解法 |
|---|---|
| 查詢回「No OpenRouter API key was set」| LLM provider 沒寫入倉庫設定。用 admin JWT 打 `/api/system/update-env` 設 `LLMProvider/OpenRouterApiKey/OpenRouterModelPref`（寫進 volume 持久）。|
| 中文訂單回 `bad_json` | PowerShell 字串編碼壞。中文 body 一律用 UTF-8 檔案餵 curl（`--data-binary "@file"`）。|
| 設環境變數含 JSON 壞掉 | Zeabur CLI `variable env` 會剝引號、`-k` 會被逗號拆。含 JSON 一律用 **base64**（`MEMBERS_JSON_B64`）。|
| 改 env 沒生效 | local-upload 服務不能 in-place redeploy；用 `zeabur deploy --service-id <id> --environment-id <env>` 重新上傳。|
| 正向訂單 0 命中 | ① 倉庫 provider key（見上）② workspace 門檻太高（設 `similarityThreshold 0.25`）③ 內容沒在該成員可達 workspace。|
| 成員問什麼都 0 命中 | 確認他的 tier/topics 對；或剛 redeploy 還沒起來（等 ~20s）。|

---

## 7. 擴充路線

- **加主題/層級**：tag 新頁 → 改 publisher `topics`/`activeTiers` → 重發 → 設門檻。
- **正式成員上線**：用 `manage.mjs` 建真實名冊。
- **客戶 wiki（Phase 4）**：每客戶獨立 server + 履約 API + `visibility: client:<id>`，跨實例隔離。
- **要後台 UI / 成本歸戶 / 自助發 token**：導入 `admin-token-backend` 規格。

---

## 8. 相關文件
- 部署 runbook：`docs/deploy-zeabur.md`
- 成員治理 SOP：`docs/ai-brain-member-governance.md`
- 使用者說明書（發給成員）：`docs/ai-brain-user-manual.md`
- 計畫檔：`~/.claude/plans/jacky-wiki-ai-zazzy-sprout.md`
- 金庫（金鑰）：`wiki/portfolio/.vault/ai-brain-deployment.md`
