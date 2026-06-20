---
title: Admin Token 管理後台產品規格書（Jacky 標準後台設計法）
domain: ailab
type: patterns
updated: 2026-06-20
tags: token, admin, rbac, auth, audit, cost-attribution, privacy, backend, pattern
---

# Admin Token 管理後台產品規格書

> **這是 Jacky 的標準 admin 後台設計法。** 以後任何專案需要「權限管理 / 後台」，直接接這套邏輯——**必抄的那一半**（token 模組＋兩層權限＋RBAC）先複製，再按專案性質接上**進階那一半**（追蹤＋成本＋稽核）。
> 配對 skill：`/admin後台`（`admin-token-backend`），會注入本規格並引導複製 `templates/` 樣板。
> 來源：双云 AI Agent School（Node＋JSON）與 SPEAKS Coach（Python＋Postgres）兩個正式站的實戰，各做一半，本文把兩邊優點合一並補上業界最佳實務。

---

## 第 0 章 — 一頁速覽（TL;DR）

**這套後台是什麼**：用「發一組 token＝給一個身份」做權限管理，不用傳統帳密。使用者拿 token 登入，token 對應到他能看哪些內容／角色。後台則把 **token 當成一個「去個資化的行為追蹤單位」**：看得到這個 token 做了什麼、花了多少算力換算多少錢，但不綁個人身分。

**什麼時候接它**：任何「要分權限、要發給一群人用、要追蹤誰用了多少」的 web 後台。

**複製哪一半**：
- **必抄半（任何專案都要）**：token 產生／hash 儲存／驗證 + 兩層權限（Admin 密鑰 × User Role）+ session。
- **進階半（按需接）**：登入記錄 / 行為事件 / 四來源成本歸戶 / 稽核日誌 / 併發控制 / 儀表板。

**Token 生命週期**（後台的主軸）：
```
產生 ──► 發放（單發/批次/CSV）──► 啟用·登入 ──► 使用（計次/計量/計費）
  ▲                                                      │
  └──── 撤銷 / 過期 ◄──── 編輯 / 一鍵輪替 ◄───── 行為·成本追蹤 ◄┘
```

**核心三原則**：
1. **只存 hash，不存明碼**——token 像密碼一樣對待。
2. **追蹤行為，不追蹤人**——token＝pseudonym，PII 可選且分開加密存。
3. **凡變更皆留痕**——所有 admin 操作、所有登入都進不可變日誌。

---

## 第 1 章 — 業界對照與資安檢視

### 1.1 模式定位
Jacky 的做法屬於業界的 **opaque bearer token / pre-shared capability token**：一串不可猜的隨機字串＝持有即授權，後端**查表**核對。對照業界：

| 業界實作 | 前綴 | 儲存 | 撤銷 | 對應 Jacky |
|---|---|---|---|---|
| GitHub PAT | `ghp_` | hash | 查表即時 | 同模式 |
| OpenAI / Anthropic API key | `sk-` | hash（僅建立時顯示一次） | 查表即時 | 同模式 |
| Stripe secret key | `sk_live_` | hash | 查表即時 | 同模式 |
| Cloudflare Access / Tailscale auth key | — | hash + 過期 | 中央撤銷 | 同模式 |
| JWT（自帶 claim） | — | 不查表 | **難撤銷**（要 blocklist） | Jacky 只把 JWT 用在 **session**，不用在長期憑證 |

> **結論**：opaque token＋查表＋hash＋角色分區，是業界穩健做法，方向正確。JWT 只該拿來簽短期 session（双云 12hr、SPEAKS 30 天），不該當長期身份憑證——這點兩站都做對了。

### 1.2 資安／管理問題清單（含兩站現況裁決）

| # | 問題 | 業界準則 | 双云現況 | SPEAKS 現況 |
|---|---|---|---|---|
| 1 | **明碼儲存** | 只存 hash（SHA-256；高敏感用 argon2），查找改查 hash | ✅ SHA-256 | ⚠️ **明碼存 DB** → 待修 |
| 2 | **熵與長度** | ≥128-bit 熵 | ✅ 24 bytes | ⚠️ base32×16 ≈80-bit → 提到 ≥20 字元 |
| 3 | **前綴慣例** | 固定前綴利於 log 偵測誤貼、secret scanning | ✅ `sycc_` | ✅ `SPK-` |
| 4 | **過期 / 輪替** | 預設給期限；支援一鍵輪替（舊碼進撤銷清單） | ✅ `expiresAt`／⚠️ 無輪替 | ✅ 過期／⚠️ 無輪替 |
| 5 | **撤銷** | 即時生效（查表天然支援） | ✅ revoke | ✅ revoke（僅 unused） |
| 6 | **傳輸方式** | POST body 換 HttpOnly cookie；**token 不進 URL/query** | ✅ | ✅ |
| 7 | **Rate limit / 暴力猜測** | 登入端點 IP+token 維度節流 + 失敗記錄 | ❌ 無 | ❌ 無 |
| 8 | **共用 vs per-user** | 群組共用需設「最大併發人數」與「重複登入策略」 | ❌ 無 | ❌ 無 |
| 9 | **稽核** | 所有 admin 變更與所有登入都留痕 | ❌ 無 | ✅ AdminAuditLog + LoginHistory |
| 10 | **Session 安全** | secret 夠長、不入 repo、定期輪替 | ✅ `SESSION_SECRET` env | ✅ 由 `encryption_key` 衍生 |

> **互補結論**：双云補 audit／追蹤／成本／併發／rate limit；SPEAKS 補 **hash 儲存** + 提高熵 + rate limit。兩站對齊後即達業界水準。

---

## 第 2 章 — Token 權限管理萃取知識

### 2.1 兩層權限模型（核心骨架）
- **第 1 層 — Admin 全局密鑰**：`ADMIN_SECRET`（双云）/ `require_admin`（SPEAKS）。所有 `/api/admin/*` 必過此關。絕對權限，與 token 無關。
- **第 2 層 — User Role（細粒度）**：token → role → permission catalog。決定登入者能看什麼。

### 2.2 角色 ↔ 權限矩陣（沿用双云 permission catalog）
權限項：`tokens:manage`、`roles:manage`、`knowledge:view`、`knowledge:manage`、`content:view`、`content:practice`、`reports:view`。
- **系統角色不可刪**（admin / mentor / full-access / 各專區角色），**自訂角色可增刪改**。
- 前端分區沿用 `data-zone` / `data-zone-card` / `data-zone-link` / `data-zone-button` + `roleZones` 對照表控制可見專區。

### 2.3 Token 統一資料模型（跨專案 schema）
```
token {
  id, label, tokenHash, roleId,
  issuedAt, expiresAt,
  usesRemaining | usedCount,        // 配額（次數），可為 null＝無限
  maxConcurrent,                    // 同時最多幾個 active session
  duplicateLoginPolicy,             // allow | kick | block
  revoked,                          // soft-delete，不硬刪
  targetRef                         // 去識別後的 pseudonym；PII 另表加密存
}
```

### 2.4 儲存策略對照（什麼時候用哪個）
| 場景 | 儲存 | 代表 | 適用 |
|---|---|---|---|
| 輕量、手工管理幾十~幾百個 token | JSON 檔 + persistent disk | 双云 | 教材站、內訓站、小工具 |
| 規模化、批次發放、大量追蹤 | Postgres + Alembic migration | SPEAKS | 對外產品、付費、多租戶 |

### 2.5 可抽象的 6 個共用模組（樣板就是它們）
`TokenGenerator`（產生＋hash＋碰撞重試）· `TokenValidator`（過期/撤銷/配額/狀態）· `SessionJWT`（HS256 簽/驗）· `AuditLogger`（append-only、operator+old→new）· `QuotaManager`（多單位：次數·秒數·額度）· `RBAC`（permission catalog + 角色檢查）。

---

## 第 3 章 — 進化版 Admin 後台：Token 即去個資化行為追蹤

> 核心理念：**追蹤行為，不追蹤人。** token＝一個 pseudonymous id；後台看得到「這個 token 做了什麼、花了多少算力」，PII 可選、分開加密、行為頁不顯示。

### 3.1 新增追蹤機制
- **登入追蹤**（`login_history`）：每次登入記 `tokenId, 時間, IP（hash 或 /24 去尾）, User-Agent, 成功/失敗+原因`。
- **彙總指標**：登入次數、首/末登入時間、活躍天數。
- **行為事件流**（`behavior_events`）：`tokenId, action, target, 時間, 耗時ms`——看了哪個專區、練了哪題、用了哪個工具。
- **算力 → 金額（四來源歸戶，記入 `cost_ledger`，每筆換算 TWD）**：
  1. **LLM API**：input/output token 數 × 各模型單價（維護一張 model price 表）。
  2. **第三方 API/服務**：STT / TTS / 外部 API 按次計費。
  3. **儲存與流量**：上傳/下載 bytes、影片串流流量。
  4. **伺服器運算**：處理秒數 × 機型費率（粗估分攤）。
  - 後台顯示每 token：**累計花費 / 本月花費 / 平均每次花費**，可排序找出高耗用 token。

### 3.2 Token 可編輯
單一 token 後台可改：角色/權限、有效期、剩餘使用次數、`maxConcurrent`、label/備註、啟用/停用、**一鍵輪替**（換新碼、保留歷史與額度，舊碼進撤銷清單）。

### 3.3 併發與共用控制
- `maxConcurrent`：同一 token 同時最多幾個 active session。
- **重複登入策略**：`allow`（都放行）/ `kick`（新登入踢掉最舊 session）/ `block`（達上限拒絕）。
- `active_sessions` 即時列表 + 強制登出單一 session。

### 3.4 去個資化 / 隱私
- 預設只存 token 維度行為；**PII（姓名/email/phone）為可選**，分開存、加密或 hash，行為頁只顯示 pseudonym `token-xxxx`。
- 提供「匯出某 token 去識別行為報表」與「一鍵抹除該 token 的 PII（保留匿名行為統計）」——對齊 GDPR / 個資法的**最小化**與**被遺忘權**精神。

### 3.5 補強項（規格內建，常被忽略）
- **Audit log（全變更留痕）**：誰在何時改了什麼 token/role，存 old→new，不可變。
- **Rate limiting + 異常告警**：同 token 異地/異國同時登入、短時間請求暴增、登入失敗暴衝 → 標記/通知。
- **批次發放 + CSV 匯入 + 批次統計**（沿用 SPEAKS）：一次發一群、追蹤兌換率/啟用率。
- **Token 健康儀表板**：active/expired/revoked 總覽、即將到期、殭屍 token（發了沒用）、Top 花費 token。
- **配額/預算告警**：單 token 或全站達成本門檻時通知，避免帳單失控。
- **Secret scanning 友善**：固定前綴 + 文件提示「token 勿貼 URL/公開頻道」。
- **Soft-delete / 不可變 audit**：token 不硬刪，留軌跡可回溯。
- **匯出/備份**：tokens 與 audit 定期備份（persistent disk / DB dump）。

---

## 第 4 章 — Admin 後台 API 與資料表（樣板對照）

### 4.1 統一 API 命名（兩站一致，零學習障礙）
| 端點 | 方法 | 功能 |
|---|---|---|
| `/api/admin/tokens` | GET/POST | 列表 / 新增（單發·批次） |
| `/api/admin/tokens/{id}` | PUT/DELETE | 編輯 / soft-delete |
| `/api/admin/tokens/{id}/revoke` | POST | 撤銷 |
| `/api/admin/tokens/{id}/rotate` | POST | 一鍵輪替 |
| `/api/admin/tokens/import` | POST | CSV 批次匯入 |
| `/api/admin/sessions` | GET/DELETE | active session 列表 / 強制登出 |
| `/api/admin/analytics/cost` | GET | 成本歸戶查詢（per token / 全站 / 期間） |
| `/api/admin/login-history` | GET | 登入記錄 |
| `/api/admin/audit-logs` | GET | 稽核日誌 |
| `/api/admin/roles` | GET/POST/PUT/DELETE | 角色權限管理 |

### 4.2 資料表 / 檔案（7 張，JSON 版與 SQL 版欄位見 templates/schema）
`tokens` · `login_history` · `behavior_events` · `cost_ledger` · `admin_audit_log` · `active_sessions` · `roles`。
- **JSON 版（双云）**：`data/*.json` 落 persistent disk。
- **Postgres 版（SPEAKS）**：對應 table + Alembic migration。

### 4.3 統一後台 UX 分頁（兩站採同一套）
`總覽儀表板 / Token 管理 / 角色權限 / 登入記錄 / 行為與成本 / 稽核日誌 / Active Sessions`。
同樣的 token 列表欄位、成本顯示（累計/本月/平均每次）、編輯彈窗欄位、中文用語——讓 Jacky 切換無痛。

---

## 第 5 章 — 「複製一半」導入指引

新後台落地最小順序：
1. **抄必抄半**：`TokenGenerator` + `TokenValidator` + `SessionJWT` + 兩層權限（Admin 密鑰 × RBAC）。→ 立即有「發 token、登入、分權限」。
2. **選儲存**：手工/輕量 → JSON 檔（双云模式）；規模/付費 → Postgres（SPEAKS 模式）。
3. **接進階半（按需）**：`login_history` → `audit_log` → `behavior_events` + `cost_ledger`（四來源）→ 併發控制 → 儀表板。
4. **跑檢核清單**：`skills/admin-token-backend/ref_checklist.md`（資安 10 項 + 後台功能項）逐項打勾。

> **紅線**：任何樣板與範例一律 placeholder，**絕不含真實 secret/token**；token 一律 hash 儲存、不進 URL、不進 repo。

---

## 現況待辦（落地兩站）
- **SPEAKS**：token 改 hash 儲存（`code_hash` + Alembic）、提高熵 ≥20 字元、登入 rate limit、補 token 編輯/輪替/併發。
- **双云**：補 `login_history` / `audit_log` / `behavior_events` / `cost_ledger` / `active_sessions`、token 編輯/輪替/併發、rate limit、儀表板。
- **兩站**：對齊第 4.1 API 命名與第 4.3 UX 分頁，達成零學習障礙。

## 關聯
- 模式索引：[模式索引](模式索引.md)
- 工具觀：[claude-code 工具頁](../tools/claude-code.md)
- 雙站實戰來源：双云 AI Agent School（`shuangyun`）· SPEAKS Coach（`tbsa`／SPEAKS 體系）
