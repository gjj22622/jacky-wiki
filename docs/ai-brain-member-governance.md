# AI 大腦 — 成員與金鑰治理 SOP

> 對象：双云核心團隊成員的大腦存取權管理。工具：`tools/members/manage.mjs`（零依賴）。

## 真相來源與同步流

```
本機 services/fulfillment/members.json（gitignored，名冊真相）
   │ node manage.mjs add/rotate/revoke
   ▼ node manage.mjs sync
Zeabur 環境變數 MEMBERS_JSON_B64（base64）→ 自動 redeploy fulfillment
   ▼
履約 API 載入名冊，認證每張訂單
```

**鐵則**：members.json 與 api_key **永不進 git**；金鑰只在 add/rotate 當下印一次，立刻存進金庫 `wiki/portfolio/.vault/ai-brain-deployment.md`。

## 常用指令

```bash
cd tools/members
node manage.mjs list                                  # 看名冊（key 遮罩）
node manage.mjs add 王小明 L2 shuangyun,education "王小明"   # 新增成員，印出 key 一次
node manage.mjs rotate 王小明                          # 換 key（疑似外洩/定期輪替）
node manage.mjs revoke 王小明                          # 離職/退出 → 移除
node manage.mjs sync                                  # 推上線（必做，否則只改本機）
```

## 層級與主題指派（師徒制）

| 層級 | 認證深度 | 能提取到 |
|---|---|---|
| **L1** | 入門（A-G-E）| 各主題 L1 概覽層內容 |
| **L2** | 進階（+N）| L1 + L2 實作層（SOP/playbook/courses/skills）|
| **L3** | 師傅（全 A-G-E-N-T-S）| 全部，**含 AGENTS® 核心方法論**（只有 L3 拿得到）|

- **主題（topics）**：`cross-domain` / `education` / `shuangyun`（成員只配需要的；未配的主題物理隔離，0 命中）。
- 範例：双云行銷講師 → `L2 shuangyun,education`；資深合夥人 → `L3 cross-domain,education,shuangyun`；外部協作者 → `L1 cross-domain`。

## 金鑰輪替政策

- **定期**：每季輪替一次核心成員 key（`rotate` + `sync` + 通知成員換新 key）。
- **即時**：疑似外洩、成員裝置遺失、離職 → 立刻 `rotate`（留人）或 `revoke`（走人）+ `sync`。
- 輪替/撤銷 `sync` 後**舊 key 立即失效**（fulfillment 重載名冊）。

## 稽核軌跡

- **名冊變更**：`tools/members/members-audit.log`（add/rotate/revoke/sync + 時間戳，gitignored）。
- **訂單行為**：fulfillment 容器內 `/app/orders.log`（誰、層級、問題摘要、命中哪些 workspace）。
- 兩者合起來＝「誰在何時被授權什麼、實際提取了什麼」完整軌跡。

## 限流

- 每把 key 30 訂單/分鐘（`RATE_LIMIT_PER_MIN`，防掃庫）。客戶/高頻整合另議。

## 升級路徑

當成員數 > 一定規模、或要「成本歸戶 / 自助發 token / 後台 UI」時，導入 `admin-token-backend` 規格（兩層權限 Admin×RBAC、token 即去個資化追蹤、四來源算力成本歸戶）。現階段內部 pilot 用本 CLI 即可，不過度工程。
