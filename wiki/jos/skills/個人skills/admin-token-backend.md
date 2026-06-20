---
name: admin-token-backend
description: Jacky 的標準 admin 後台設計法。任何需要「權限管理 / 後台 / 發 token 給一群人用 / 追蹤誰用了多少」的專案，注入 token 權限管理規格 + 可複製程式碼樣板，複製一半就好。內含業界資安對照、兩層權限(Admin 密鑰 × RBAC)、token 即去個資化行為追蹤、四來源算力成本歸戶、token 編輯/輪替/併發控制、稽核日誌、統一後台 UX。觸發：「/admin後台」「/admin-token」「設計後台」「權限管理」「token 管理」「發 token」「admin 後台」「使用者追蹤後台」「成本歸戶」。也支援 /admin後台 斜線指令。
trigger: /admin後台
---

# /admin後台 — Admin Token 管理後台設計法

把 Jacky 兩個正式站（双云 AI School＋SPEAKS Coach）驗證過的 token 權限管理萃取成**可複製的標準後台**。觸發時注入規格、引導複製 `templates/` 樣板、跑檢核清單。

> **配對規格（單一真相來源）**：`<jacky-wiki>/wiki/ailab/patterns/admin-token-backend-規格書.md`
> **核心三原則**：① 只存 hash 不存明碼 ② 追蹤行為不追蹤人（token＝pseudonym）③ 凡變更皆留痕。

---

## 跟其他 skill 的分工

| 觸發 | 走 | 原因 |
|---|---|---|
| 「設計後台」「權限管理」「發 token」「使用者追蹤」「成本歸戶」 | **本 skill** | 後台架構＋程式碼樣板 |
| 「查 wiki 有沒有 X」「把這寫進 wiki」 | `/wiki` | 知識查詢/ingest |
| 「整理成教材給同事看」 | `/internal-training` | 對外教材成品 |

---

## 路徑解析（多機跨平台）

> 本 skill 不寫死絕對路徑。觸發時依序找 jacky-wiki：
> 1. 環境變數 `$JACKY_WIKI_HOME` / `%JACKY_WIKI_HOME%`
> 2. `~/jacky-wiki`（macOS / Linux / WSL2 / Windows `%USERPROFILE%\jacky-wiki`）
> 3. `C:\Users\gjj22\jacky-wiki`（Windows 主機 fallback）
> 4. `/home/jacky/jacky-wiki`（G2 mini Ubuntu fallback）
>
> 樣板在本 skill 資料夾 `templates/`，與 jacky-wiki 無關，永遠可讀。

---

## 觸發後必做（嚴格依序）

### 1. 讀規格（不憑記憶）
讀 `<jacky-wiki>/wiki/ailab/patterns/admin-token-backend-規格書.md` 作為單一真相來源。找不到 wiki 時，本 skill 的 `ref_checklist.md` 與 `templates/` 仍足以執行。

### 2. 判斷模式（3 種）

| 觸發情境 | 模式 | 動作 |
|---|---|---|
| 全新專案要做後台 | **A. 新設計** | 吐架構 → 複製必抄半樣板 → 按需接進階半 |
| 既有後台要補強 | **B. 補強** | 跑 `ref_checklist.md` 對照現況找缺口 → 逐項補 |
| 只想查規範/做法 | **C. 查規範** | 直接引規格章節回答，不動程式 |

### 3. 一次問清關鍵設計點（集中提問，不要逐題打斷）
1. **儲存**：JSON 檔（輕量/手工，双云模式）還是 Postgres（規模/付費，SPEAKS 模式）？
2. **成本歸戶**：要不要算力換金額？要算哪幾來源（LLM / 第三方 API / 儲存流量 / 伺服器運算）？
3. **併發控制**：要不要 `maxConcurrent` + 重複登入策略（allow/kick/block）？
4. **PII**：要不要存個資？（預設不存，只留 pseudonym）

> Jacky 全域規範是「不問直接做」——若情境已足夠明確（例如沿用某站既有模式），就直接套預設：JSON 站＝双云預設、付費站＝SPEAKS 預設，全成本來源、有併發控制、不存 PII。

### 4. 複製樣板（templates/）
| 樣板 | 內容 |
|---|---|
| `token_module.md` | TokenGenerator / Validator / SessionJWT（Node + Python 雙版） |
| `admin_api.md` | 統一 API 端點 + require_admin / RBAC 中介層 |
| `schema.md` | 7 張表/檔欄位（JSON 版 + SQL 版） |
| `cost_model.md` | 四來源成本歸戶 + model price 表範例 |
| `frontend_zones.md` | `data-zone*` + roleZones 前端分區 + 統一後台分頁 |

**必抄半**（任何後台都要）：`token_module` + `admin_api` 的 require_admin/RBAC + `schema` 的 `tokens`/`roles`。
**進階半**（按需）：`schema` 其餘 5 表 + `cost_model` + 儀表板。

### 5. 跑檢核清單
逐項對照 `ref_checklist.md`（資安 10 項 + 後台功能項），標 ✅/⚠️/❌ 回報缺口。

### 6. 回報 Jacky（emoji 格式）
列出：採了哪個儲存、接了哪幾半、檢核清單結果、下一步建議。

---

## 安全紅線

- ❌ 樣板與範例**絕不含真實 secret / token / API key**，一律 placeholder（`<YOUR_ADMIN_SECRET>`、`sk-xxxx`）。
- ❌ token 不得明碼儲存、不得進 URL/query、不得 commit 進 repo。
- ✅ token 一律 hash 儲存（SHA-256 起跳）；session secret 從 env 讀、不入 repo。
- ✅ 對外分享版本移除双云/SPEAKS 內部識別，範例品牌用中性的（如木酢寵物達人）。
- ✅ 落地正式站走該專案 `dev 分支 → 驗證 → main → 部署`，不直接動 main。

---

## 邊界情況

| 情境 | 處理 |
|---|---|
| 已有帳密系統，只想加 token | token 當「邀請碼/分享連結」層，疊在現有 auth 上，不取代 |
| 不需要追蹤/成本 | 只抄必抄半，跳過 `cost_model` 與 5 張追蹤表 |
| 純前端 demo 無後端 | 提醒 token 驗證必須在 server 端，前端 gate 無資安意義 |
| 要群組共用一個 token | 必設 `maxConcurrent` + 重複登入策略，否則無法控管 |
| 找不到 jacky-wiki | 用本 skill `ref_checklist.md` + `templates/` 即可執行，提示 Jacky wiki 未 clone |

---

## 可信任 commit message 範例
- `feat(admin): 加入 token hash 儲存與 rate limit`
- `feat(admin): 補 login_history / audit_log / 行為成本歸戶`
- `feat(admin): token 編輯/輪替與 maxConcurrent 併發控制`
