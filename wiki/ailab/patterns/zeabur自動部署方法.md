---
title: Zeabur CLI 自動部署方法（通用模式）
domain: ailab
updated: 2026-06-22
---

# Zeabur CLI 自動部署方法（通用）

> 用 `npx zeabur` CLI 自動部署**任何**專案到 Zeabur 的通用方法。
> 從「AI 大腦」上線實戰淬煉出的三條鐵則 + 標準流程，**不限單一專案**。
> 具體案例（AI 大腦兩 service）→ [`docs/ai-brain-部署操作手冊.md`](../../../docs/ai-brain-部署操作手冊.md)。

---

## 🔑 三條黃金鐵則（違反就出事，每條都是血淚）

### 鐵則 1：`zeabur deploy` 上傳「當前工作目錄」
- 部署前**一定 `cd` 到該 service 的原始碼目錄**（含 `Dockerfile` 或 `package.json` 那層），再 deploy。
- ❌ 在錯的目錄（repo 根、工具夾…）deploy → 上傳錯內容 → 服務壞掉（常見 404）。
- ✅ 部署前先確認 `pwd` 是對的源碼目錄。

### 鐵則 2：改了 env 變數，要重新 `deploy` 才生效（restart 沒用）
- 服務通常只在**啟動時**讀一次環境變數。
- `service restart` 用**舊部署的 env 快照**，不會載入剛改的變數。
- `service redeploy` **只支援 git 綁定的服務**；本機上傳型（local-upload）會回 `CANNOT_REDEPLOY_INPLACE`。
- ✅ 改完 env（CLI `variable update` 或後台）→ **重新 `deploy`**（重新上傳 = 把新 env 烘進新部署）。

### 鐵則 3：deploy 上傳逾時是網路 transient
- `failed to prepare upload ... context deadline exceeded` = Zeabur 上傳端慢，**不是你做錯**。
- ✅ 重試（多跑幾次）或換較穩網路。env 變數那步通常已成功，只是 deploy 沒過。

---

## 標準部署流程（任何專案）

```bash
# 0. 前置（一次性）
node -v                              # runtime 版本對
npx zeabur@latest auth login         # 登入（開瀏覽器）
npx zeabur@latest auth status        # 確認帳號

# 1. 找到 service-id / environment-id
npx zeabur@latest service list       # 或從 dashboard URL 抓；建議記進金庫

# 2. cd 到該 service 的源碼目錄（鐵則 1）
cd <repo>/<該service源碼資料夾>       # 含 Dockerfile / package.json 那層

# 3. 部署
npx zeabur@latest deploy --service-id <SID> --environment-id <EID>
#   逾時就重跑（鐵則 3）

# 4. 改了 env 也要 deploy（鐵則 2）
npx zeabur@latest variable update --id <SID> --env-id <EID> -y -i=false -k "KEY=value"
cd <該service源碼目錄> && npx zeabur@latest deploy --service-id <SID> --environment-id <EID>
```

---

## 機密與狀態檔（通則）

- **機密（API key/token/密碼）走環境變數**，永不進 repo。含 JSON 的值用 base64 包（避免 CLI 引號/逗號轉義坑）。
- **狀態/名冊/資料檔**用 `.dockerignore` 排除，不上傳；執行時從 env 或掛載的 Volume 注入。
- **有狀態服務**（DB/向量庫）掛 **Volume** 持久化；無狀態服務（API）可隨意重部署。

---

## 部署後驗證（通則）

- deploy 後服務**重啟數十秒**，期間請求可能短暫 4xx。
- 用 `curl --retry 10 --retry-delay 6 --retry-all-errors` 等就緒——**別用 shell sleep**（會被擋）。
- 對 health endpoint 或主要 endpoint 打一筆 smoke test，確認 2xx + 預期回應。
- 判讀：認證失敗(401)→env/名冊沒 deploy 生效；帶對憑證卻 404→上傳錯目錄(鐵則1)。

---

## 故障排除速查

| 症狀 | 原因 | 解 |
|---|---|---|
| 帶對憑證卻 404 | deploy 上傳錯目錄 | 鐵則 1：cd 到源碼目錄再 deploy |
| 改 env 後沒生效 | restart 用舊快照 | 鐵則 2：重新 deploy |
| `prepare upload deadline exceeded` | 上傳逾時 | 鐵則 3：重試 |
| `CANNOT_REDEPLOY_INPLACE` | redeploy 需 git 綁定 | 改用 `deploy` |
| 改 env 一直要重打 | 沒持久化 | 機密走 env、資料走 Volume |

---

## 多機協作通則

- **不在 git 的真相檔**（名冊/憑證/.env）會在多台機器分歧 → **指定一台當「真相機」**管理，其餘機器經安全管道（非 git）取得最新檔再部署。
- 程式碼走 git 正常同步；機密與狀態走帶外管道。

---

## 相關連結

- 具體案例（AI 大腦）→ [`docs/ai-brain-部署操作手冊.md`](../../../docs/ai-brain-部署操作手冊.md)
- 模式索引 → [模式索引](模式索引.md)
- 換機/環境 → [jos/作業系統索引](../../jos/作業系統索引.md)
