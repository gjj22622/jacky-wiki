# AI 大腦 — 部署與日常操作手冊（可教給任何機器，含 Linux）

> 對象：要在**任何一台機器**（Windows 主機 / Linux G2 mini / 新機）上**部署或維運** AI 大腦的人。
> 初次「從零建兩個 service」看 [deploy-zeabur.md](deploy-zeabur.md)；**本篇是日常操作 + 雷區**（改名冊、改程式碼、重新部署）。
> 成員與金鑰治理細節 → [ai-brain-member-governance.md](ai-brain-member-governance.md)。

---

## 🔑 三條黃金鐵則（先看，全是血淚換來的）

### 鐵則 1：`zeabur deploy` 上傳「當前目錄」——一定要在對的目錄跑
- fulfillment 服務的原始碼在 **`services/fulfillment/`**（含 Dockerfile）。
- **部署前一定先 `cd services/fulfillment`**，再跑 deploy。
- ❌ 在別的目錄（例如 `tools/members/`）跑 deploy，會把錯的目錄當服務上傳 → 服務壞掉、`POST /order` 變 **404**。
- 驗證上傳對不對：deploy 後 `POST /order` 帶正確 key 不該是 404。

### 鐵則 2：改了 env 變數，`restart` 不會生效——必須重新 `deploy`
- 服務只在**啟動時**讀一次 env（`MEMBERS_JSON_B64`、`ANYTHINGLLM_API_KEY`…）。
- Zeabur 的 `service restart` 用的是**舊部署的 env 快照**，不會載入你剛改的變數。
- ❌ `service redeploy` 只給「git 綁定」的服務，本機上傳型會回 `CANNOT_REDEPLOY_INPLACE`。
- ✅ 唯一可靠：改完 env → **從 `services/fulfillment/` 跑一次成功的 `deploy`**（重新上傳 = 把新 env 烘進新部署）。

### 鐵則 3：deploy 上傳偶爾逾時，是網路 transient，重試就好
- 看到 `failed to prepare upload ... context deadline exceeded` = Zeabur 上傳端慢，**不是你做錯**。
- 多跑幾次、或換較穩網路。env 變數那步通常已成功，只是 deploy 沒過。

---

## 0. 任何機器的前置（Linux 也一樣）

```bash
# 1. 有 repo（名冊真相 members.json 不在 git，見 §多機）
git clone https://github.com/gjj22622/jacky-wiki.git ~/jacky-wiki   # 或 git pull

# 2. Node 24+
node -v

# 3. 登入 Zeabur CLI（一次性，會開瀏覽器授權）
npx zeabur@latest auth login
npx zeabur@latest auth status     # 確認已登入到 gjj22622

# 4. 名冊真相檔（gitignored，從現有機器安全複製過來，勿走 git）
#    放到 services/fulfillment/members.json
```

> Zeabur 服務/環境 ID（與金庫一致）：
> - project `jacky-ai-brain` = `6a371b336d107f2b4271477c`
> - fulfillment service = `6a371cf546477d60388419fe`、environment = `6a371b3379260dbd87843439`
> - anythingllm service = `6a371b896d107f2b42714780`

---

## 1. 架構速記（兩個 service，一個對外）

```
[公網] ──HTTPS──▶ fulfillment（履約 API，POST /order）  ← 唯一對外
                      │ Zeabur 私網
                      ▼
                  anythingllm（倉庫）  ← 不綁公網、掛 Volume、成員碰不到
```
- 公網入口：`https://jacky-aibrain.zeabur.app`
- 成員只能 `POST /order`，看不到倉庫原文。

---

## 2. 日常操作 A：新增/異動成員 → 上線

工具：`tools/members/manage.mjs`（零依賴）。名冊真相 = `services/fulfillment/members.json`（gitignored）。

```bash
cd ~/jacky-wiki/tools/members

# 看名冊（key 遮罩）
node manage.mjs list

# 新增成員：add <id> <L1|L2|L3> <主題逗號分隔> "顯示名"
node manage.mjs add wangxm L2 shuangyun,education "王小明"
#   → 印出 api_key（只這一次！）立刻存金庫 wiki/portfolio/.vault/ai-brain-deployment.md

node manage.mjs rotate wangxm     # 換 key（疑似外洩/定期）
node manage.mjs revoke wangxm     # 移除（離職）

# 推上線：算 base64 → 更新 Zeabur 變數 MEMBERS_JSON_B64 → 嘗試 deploy
node manage.mjs sync
```

⚠️ **`sync` 的 deploy 步驟若逾時**（鐵則 3），變數其實已更新成功，只差部署。這時**手動補一次正確的 deploy**：

```bash
cd ~/jacky-wiki/services/fulfillment        # ← 鐵則 1：一定在這個目錄
npx zeabur@latest deploy --service-id 6a371cf546477d60388419fe \
  --environment-id 6a371b3379260dbd87843439
# 逾時就重跑（鐵則 3）
```

> 為什麼不能只 `restart`？見鐵則 2。改了名冊（=改 env MEMBERS_JSON_B64）必須 deploy 才生效。

---

## 3. 日常操作 B：改履約程式碼（server.ts）→ 部署

```bash
# 改完 services/fulfillment/server.ts 後
cd ~/jacky-wiki/services/fulfillment        # 鐵則 1
npx zeabur@latest deploy --service-id 6a371cf546477d60388419fe \
  --environment-id 6a371b3379260dbd87843439
```
- `.dockerignore` 已排除 `members.json`/`orders.log`/`*.bak` → 名冊不會被上傳，成員走 env。
- 改 anythingllm（倉庫）設定通常在 Zeabur 後台改 env；換 embedder 要重灌向量（見 deploy-zeabur §3）。

---

## 4. 部署後驗證（一定要做）

```bash
cd ~/jacky-wiki
# 用一把真 key 打通用問題；HTTP 200 = 認證通；fulfilled:true = 檢索到包裹
printf '{"question":"AI 行銷部有哪些 agent 角色？"}' > /tmp/q.json
curl -s -X POST https://jacky-aibrain.zeabur.app/order \
  -H "x-api-key: <某成員key>" -H "Content-Type: application/json" \
  --data-binary "@/tmp/q.json" -w "\n[HTTP %{http_code}]\n"
```
判讀：
- `401` → key 沒在線上名冊（沒 sync/沒 deploy，或 key 打錯）
- `404`（帶正確 key）→ **上傳錯目錄了**（鐵則 1），重新從 `services/fulfillment/` deploy
- `200 fulfilled:false` → 認證 OK，但這題沒命中內容（換問法，或該主題/層級沒這塊）
- `200 fulfilled:true` → 完全正常 ✅
- 越級驗證：L2 成員問 AGENTS® 核心 → 應 `fulfilled:false`（核心鎖 L3）

> 剛 deploy 完服務會重啟幾十秒，期間可能短暫 401/404；用 `curl --retry 10 --retry-delay 6 --retry-all-errors` 等就緒，別用 shell sleep。

---

## 5. 故障排除速查

| 症狀 | 原因 | 解 |
|---|---|---|
| 新 key 全 401，舊 key 正常 | 名冊改了但服務沒重載 | 鐵則 2：從 `services/fulfillment/` 跑 deploy |
| 帶正確 key 卻 404 | deploy 上傳錯目錄 | 鐵則 1：`cd services/fulfillment` 再 deploy |
| `prepare upload deadline exceeded` | Zeabur 上傳逾時 | 鐵則 3：重試 / 換網路 |
| `CANNOT_REDEPLOY_INPLACE` | redeploy 需 git 綁定 | 用 `deploy`（重新上傳），不要用 redeploy |
| restart 回 `Please try again later` | Zeabur 後端 transient | 隔十幾秒重試；但 restart 本來就不重載 env（鐵則 2）|
| `fulfilled:false` 一直出現 | 題目沒命中 / 不在授權主題 | 換問法；確認該成員 topics/tier 有那塊 |

---

## 6. 多機注意（Linux ↔ Windows 同步）

- **`members.json` 是名冊真相、且不在 git**（gitignored）。兩台機器各自有一份會**分歧**。
- 建議：**指定一台機器當「名冊真相機」**（目前 = Windows 主機），只在那台跑 `add/rotate/revoke`。
- Linux 機要能部署/維運時：把最新 `members.json` **透過安全管道**（非 git；OneDrive 加密 / 隨身碟 / 密訊）複製到 `services/fulfillment/members.json`，再 `sync` / `deploy`。
- 程式碼（server.ts 等）走 git 正常同步；只有名冊與金鑰走帶外管道。
- 金鑰本身永遠在金庫 `wiki/portfolio/.vault/`（gitignored），不進 git。

---

## 相關文件

- 初次建置 → [deploy-zeabur.md](deploy-zeabur.md)
- 成員/金鑰治理 → [ai-brain-member-governance.md](ai-brain-member-governance.md)
- 管理者總覽 → [ai-brain-admin-manual.md](ai-brain-admin-manual.md)
- 成員使用 → [ai-brain-user-manual.md](ai-brain-user-manual.md)
