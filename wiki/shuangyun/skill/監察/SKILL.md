---
name: 監察
description: 双云 AI School 線上平台的六維監察查核員 — 唯讀體檢內容是否有誤/過舊、邏輯前後不一、與 jacky-wiki 版本差異、機密外洩、權限設定、以及越權封鎖破口（含流量日誌分析與盲點標記）。觸發：「/監察」「/監察 content|diff|security」「稽核 AI School」「audit 平台」「檢查線上平台」「上線前體檢」。
trigger: /監察
domain: shuangyun
updated: 2026-06-22
---

# /監察 — 双云 AI School 監察查核員

> **本檔是 canonical 主版**：`<jacky-wiki>/wiki/shuangyun/skill/監察/SKILL.md`
> 各機部署：複製或 symlink 到 `~/.claude/skills/監察/SKILL.md`（詳見 [INSTALL.md](INSTALL.md)）。

---

## 核心信條

双云 AI School 是**對外的線上資產**（學員、種子教師、合作學校都會看）。這支 skill 反覆問六件事，當它的守門人：

1. 內容**是否有誤、是否過舊**
2. 邏輯**是否前後不一**
3. 與 jacky-wiki（jos / education）的**版本差異**
4. 是否有**過於機密的事項上傳**（客戶機密、金鑰、營收、ROAS）
5. **權限是否都設定正確**
6. 有沒有辦法**突破 admin 的權限封鎖**（含流量／點擊監控、無權 token 是否在瀏覽無權頁面）

**性質：純唯讀。** 只掃描、只產報告、分級 findings。修不修由 Jacky 決定。**絕不改平台、不 commit、不碰 `data/*.json`、不發 token。** 比照 `/排查`（機械層硬掃 + 人工層判讀）與 `/jbo`（反覆查真實性 + 定期 audit）。

---

## 路徑解析（多機）

依序嘗試，取第一個存在的：

| 標的 | 解析順序 |
|---|---|
| **平台 repo** | `$SHUANGYUN_SCHOOL_REPO` → `~/OneDrive/双云AI轉型教育訓練/Cladude Code 新手教學` → `C:\Users\gjj22\OneDrive\双云AI轉型教育訓練\Cladude Code 新手教學` |
| **內容母源** | repo 的 `../双云AI_School/01_影片課程`（底線）→ `../双云AI School/01_影片課程`（空格，build 腳本寫死的舊路徑）|
| **jacky-wiki** | `$JACKY_WIKI_HOME` → `~/jacky-wiki` → `C:\Users\gjj22\jacky-wiki` |

> ⚠️ 母源有「底線 vs 空格」兩種命名；`scripts/build-course-json.js:13` 寫死空格版。掃描時兩種都試，**並把不一致列為 finding**。

---

## 必讀順序（每次開跑先做）

1. 本 SKILL.md（紅線、檢查清單）。
2. 受檢平台 repo：`public/index.html`、`public/app.js`、`server.js`、`tracking.js`、`course.json`、`.gitignore`。
3. 真相源：`jacky-wiki/wiki/jos/作業系統索引.md`、`wiki/jos/skills/skill總索引.md`、`wiki/education/教育訓練索引.md` 及對應 workshop。

---

## Sub-command 分派（全唯讀）

| 指令 | 範圍 | 需要 ADMIN_SECRET | 用途 |
|---|---|---|---|
| `/監察`（無參數） | 六維全掃 | 是（e/f 用）| 完整體檢，產 `監察報告_YYYY-MM-DD.md` |
| `/監察 content` | a + b + d | 否 | 上線前快檢內容準確/一致/不洩密 |
| `/監察 diff` | c | 否 | 對 jos + education 比版本，報漂移方向 |
| `/監察 security` | e + f | 是 | 權限設定 + 越權靜態稽核 + 日誌分析 + 盲點 |

執行：先跑 `scripts/` 機械層（見下），把輸出餵給人工層判讀分級，再依「報告格式」產出。ADMIN_SECRET 從環境變數或 `.zeabur-secrets.local.txt` 讀取，**絕不寫進報告或任何會 push 的檔**。

---

## 機械層腳本（`scripts/`，全部只讀）

| 腳本 | 對應維 | 做什麼 |
|---|---|---|
| `scan_content.mjs <repo>` | a, b | 數母源資料夾 vs `course.json` totalLessons/duration vs `index.html` 文案數字；標過期日期（對今天）；列 zone↔role↔path 不對稱；偵測母源命名漂移 |
| `scan_secrets.sh <repo>` | d | grep 公開檔找 key/token/ROAS/營收/真客戶名；`git ls-files` 確認 secret 檔沒被追蹤；驗 `.gitignore` 覆蓋 |
| `scan_perms.mjs <repo>` | e | 讀 `data/admin-config.json` 比對 baseline（見下），標權限越界、system role 遺失 |
| `scan_logs.mjs <repo>` | f | 讀 `data/{login_history,active_sessions,behavior_events}.json` 找撤銷後登入/rate-limit/併發違規/量異常；**印盲點：behavior 無 zone 欄位** |

跑法：`node scripts/scan_content.mjs "<repo路徑>"`、`bash scripts/scan_secrets.sh "<repo路徑>"`。腳本只印 JSON/摘要，不改任何檔；缺檔時印警告續跑（degrade gracefully）。

---

## 六維檢查清單

### a — 內容有誤／過舊
- `index.html` 手寫文案 vs 真相源逐項對：
  - 「N 支 skill」← `jos/skills/skill總索引.md`（或 `~/.claude/skills` 實數）
  - 「N 支影片／NN 分」← `course.json` `totalLessons`/`totalDuration` ← 母源資料夾數
  - 工具版本（Claude Code/Node/Codex…）← `jos/environment/CLI工具清單.md`
  - 入場日期（7/6、7/9、7/15、7/20…）← 對「今天」，過了標 🟡，與事實不符標 🔴
- `course.json` 是否重建過：母源資料夾 mtime 晚於 course.json → 🟡 過舊。
- 燈號：🔴 錯 / 🟡 過舊 / 🟢 符。

### b — 邏輯前後不一
- `index.html` 數字 ↔ `course.json`（如「35 支」對不上 totalLessons）。
- zone 對稱：`index.html` 的 `data-zone` ↔ `app.js` `roleZones` ↔ `zonePaths`（多/缺一邊都算矛盾）。
- `course.json` 每課 `slug` 是否吻合 `L\d-\d{2}_*` 命名。
- 燈號：🔴 矛盾 / 🟢 一致。

### c — 與 jacky-wiki 版本差異
- ai-os zone 文案 vs `jos/作業系統索引.md` + `education/workshops/2026-06-20-ai作業系統觀/`。
- 比 `updated:` frontmatter 或 `git log` 判**誰較新**：站比 wiki 舊 = 🔴 落後該回補；wiki 比站舊 = 🟡 wiki 待更新；齊 = 🟢。
- 只報差異與方向，**不自動同步**。

### d — 機密上傳
- 公開檔（`public/*.html|*.js`、`course.json`、`*.md`、`README.md`）出現：`sk-`、`Bearer `、`sycc_` token 明碼、ADMIN_SECRET/SESSION_SECRET 值、`營收|revenue|ROAS|毛利|淨利`、真客戶名（濂直火割烹、晟光建設、木酢寵物達人…）。
- `.gitignore` 是否覆蓋 `.env`、`data/tokens.json`、`data/admin-config.json`、`.zeabur-secrets.local.txt`；`git ls-files` 是否誤追蹤 secret 檔。
- **區分教學虛構素材**（日好甜點、小真）vs 真客戶機密——前者不算洩漏。
- 燈號：🔴 洩漏（附 file:line）/ 🟢 乾淨。

### e — 權限設定正確（baseline）
讀 `data/admin-config.json`（或 `GET /api/admin/config` 帶 ADMIN_SECRET）比對：

| role | 應有權限 | isSystem |
|---|---|---|
| admin | 全 7 項 | ✓ |
| mentor | knowledge:view, content:view, content:practice, reports:view | ✓ |
| full-access | 同 mentor | ✓ |
| core-member | 同 mentor | ✓ |
| tbsa-seed-teacher | knowledge:view, content:view, content:practice | ✓ |
| newcomer | knowledge:view, content:view, content:practice | ✓ |

- newcomer/種子教師**不得**有 `tokens:manage`/`roles:manage`/`knowledge:manage` → 有就 🔴 越界。
- 6 個 system role 應齊全且 `isSystem:true`（不可刪）。
- `app.js` `roleZones` 是否與角色層級相稱（如 newcomer 不該含 `core`）。
- 燈號：🔴 越界 / 🟡 待 Jacky 確認 / 🟢 正確。

### f — 突破封鎖／流量監控（靜態稽核 + 盲點）
**靜態破口（引 file:line）**：
- zone gating **純前端** `hidden` 切換（`app.js:658-746`）；整份 `index.html` 送給每個登入者 → 任何 token 改 URL/看原始碼即可讀任何 zone 文字。🔴
- 影片串流只檢查通用 `content:view`、**無 per-zone**（`server.js:799`）→ 知道檔名就能跨區抓片。🔴
- `/admin.html` 公開可取、ADMIN_SECRET 存 sessionStorage（`admin.js`）；確認 admin 端點有無 rate-limit。
- `recordAudit` operator 寫死 "admin"（`tracking.js`）→ 改動無法歸戶。🟡

**日誌分析（現可做）**：撤銷後仍成功登入、rate-limit 命中、併發違規、單 token 行為量異常。

**盲點（明確標記、不修）**：`behavior_events` 無 zone 欄位 → **無法偵測「無權 token 瀏覽無權頁面」**。報告附「要真正偵測需補的埋點」建議 patch 描述（伺服器端 per-zone 檢查 + behavior 記 zone + 記 403），**不自動套用**。

---

## 報告格式（固定）

檔名 `監察報告_YYYY-MM-DD.md`，寫在受檢 repo 外的工作目錄（或 cwd）；**含敏感發現時寫 gitignored 位置**，不 push。

1. **一句話結論** — 整體健康度 + 最嚴重一項。
2. **六維表** — 維 / 燈號 / findings 數。
3. **分維 findings** — 每項：🔴必修/🟡建議/🟢加分 + 證據（file:line 或數值）+ 權威來源 + 建議動作。
4. **機械層硬掃結果** — 四支腳本輸出摘要。
5. **盲點清單** — audit 不到的地方 + 要補的埋點（含 f 的建議 patch 描述，不套）。

---

## 定期觸發時機表

| 時機 | 跑什麼 |
|---|---|
| 每次平台上線前 | `/監察 content` + `/監察 diff`（必跑） |
| 改了權限/角色/token 設定後 | `/監察 security` |
| 改了 ai-os 等內容、或 wiki jos/education 更新後 | `/監察 diff` |
| 每月健檢 | `/監察`（全掃） |
| 主動提醒 | 偵測到母源資料夾變動但 course.json 未重建時，提醒跑 content |

---

## 紅線

- ❌ 不改平台任何檔、不 commit/push、不發 token、不碰 `data/*.json`（只讀）。
- ❌ 不把 ADMIN_SECRET／疑似洩漏字串寫進 wiki 或會 push 的檔；含敏感發現的報告寫 gitignored 位置。
- ❌ 不編造：查不到來源標「未驗證」，不臆測。
- ❌ (f) 的修法只「建議 + 附 patch 描述」，**不自動套用**。
- ❌ 不超出當輪維度做「順便」修改。
- ✅ 跑完在受檢 repo 跑 `git status` 確認除新報告外**零改動**。

---

## 與其他 skill 協作

- `/wiki query` — 取 jos/education 真相源（c 維）。
- `/移機` — skill 總數的真相源（a 維「N 支 skill」）。
- `/作品` — 平台部署狀態速查。
- `/收工` — 把監察結論記進 todolist/MEMORY。
- `/internal-training` — 若某次監察發現值得教，產 education workshop/pitfalls（下游、可選）。

---

## 邊界情況

| 情況 | 處理 |
|---|---|
| 拿不到 ADMIN_SECRET | e/f 的設定檢查降級為「讀 `data/admin-config.json` 檔」；拿不到檔則標「未驗證」 |
| 母源資料夾找不到（底線/空格都沒有）| a 維標 🔴 並回報路徑漂移 |
| `data/*.json` 日誌不存在（剛部署）| f 日誌分析標「無資料」，仍輸出靜態破口與盲點 |
| 在非 Windows 機跑 | 用路徑解析表的 fallback；腳本走 node/bash 跨平台 |
| 受檢 repo 不在 git 內 | secrets 的 `git ls-files` 檢查跳過，改純 grep |
