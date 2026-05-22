---
session_date: 2026-05-22
session_topic: airun.tw GA4 全面重建 + 短網址 UTM 系統 + 藍新金流補件
model: claude-sonnet-4-6
context: AI Run 集團 / 双云行銷 / airun-site
duration: ~3h
type: session-summary
tags: ga4, utm, short-url, 藍新, 消費者保護法, json-crud, claude-code-skill, team-knowledge
---

## 最終做法（What Worked）

### GA4 全面重建（3 個 repo、21 頁）
- 舊帳號（agentflowjdong@gmail.com）被封停，舊 GA4 property ID 全部廢棄
- 新帳號：`tw52613000@2clouds.cc`，取得三組新 ID：
  - airun.tw → `G-SZ07910G09`
  - mingcha.airun.tw → `G-4MRKK24FPC`
  - mingnow.airun.tw → `G-YR0ZTKX67J`
- 批次替換工具：`sed` 失敗後改用 Python `content.replace(old, new, 1)` 做 HTML 多行插入
- 步驟：先 `grep -r "G-OLD" --include="*.html"` 找出所有問題頁面 → 再 `grep -rL "gtag"` 找沒有埋的 → 各自 Python 一次處理

### 短網址 + UTM 系統（Lihi.io 功能子集）
- 後端：`/home/jacky/agents/airun-site/links.json` 作為資料庫（無新 npm 依賴）
- 路由：`/go/:slug` → 讀 links.json → 附加 UTM → 301 redirect；同時更新 hits + last_hit
- CRUD API：`GET/POST/PATCH/DELETE /api/links`，cookie auth（`admin_tok` vs `ADMIN_TOKEN` env）
- Admin UI：`/admin/links`，包含 UTM builder、發行紀錄表格、編輯 modal
- links.json 結構：`{ url, utm_source, utm_medium, utm_campaign, utm_content, utm_term, note, created_at, hits }`
- 預先建立 11 條 5/27 原點日短網址（各平台 × 各落地頁）

### UTM 設計原則（AI Run 命名規範）
- `utm_source`：平台名小寫（instagram / facebook / line / threads / youtube / email）
- `utm_medium`：social / email / referral（不要亂加）
- `utm_campaign`：活動名-日期（origin-day-527 / academy-launch）
- `utm_content`：素材識別（ig-post / checkout-cta），多版本才需要
- `utm_term`：僅付費搜尋關鍵字，其他留空
- Slug 格式：`{平台縮寫}-{活動縮寫}`（ig-527, fb-527, checkout-ig）

### 藍新金流補件
- 建立 `/terms` 頁（`public/terms.html`）涵蓋：客服聯絡資訊、服務條款、退款政策、消費者權益
- 退款政策關鍵：數位內容 token 已兌換後不退款（依消費者保護法第19條）
- 客服信箱統一換成 `tw52613000@2clouds.cc`（双云行銷實際收件匣）

### Claude Code Skill 建立
- 新 skill：`/utm-shortlink`，存到 `~/.claude/skills/utm-shortlink`
- 流程：讀知識庫 → 問三個必要資訊 → 建議 UTM → 建議 slug → 呼叫 API → 輸出表格
- 對應知識庫：`/home/jacky/agents/personal-agent/team-knowledge/utm-social-marketing.md`（681行）

### 團隊知識庫持久化
- 新路徑：`/home/jacky/agents/personal-agent/team-knowledge/`
- 行銷 AI 研究 UTM 最佳實踐 → 寫進 `utm-social-marketing.md`（681行）
- 行銷 AI 研究 GA4 設定 → 寫進 `ga4-analytics.md`（720行）
- 跨對話不失憶；下次 `/utm-shortlink` 觸發自動讀庫

---

## 繞路紀錄（Detours）

- **sed 多行 HTML 插入失敗** → Linux sed 的 `s|</head>|snippet\n</head>|` 遇多行 snippet 報 "unknown option to `s'" → 改用 Python `content.replace('</head>', snippet, 1)` 一行解決
- **客服信箱 j@airun.tw 無收件匣** → 一開始未發現，藍新補件時才確認沒有真實 inbox；嘗試建議 Cloudflare Email Routing 但 airun.tw 的 nameserver 是 Cloudmax（ix1000.com），不是 Cloudflare → 改建議 Zoho Mail → 最後確認 `tw52613000@2clouds.cc`（双云 Google Workspace）才是正確答案
- **Resend 誤解** → Jacky 問「Resend 不是就可以了嗎」→ 釐清 Resend = 僅發信 API，無收件匣功能
- **redirects.json → links.json 升級** → 初版短網址只做 slug→url 映射，沒有 hits/UTM/note → 在實作 admin UI 時確認需要完整 metadata，整包重建

---

## 錯誤與失敗（What Failed）

- **行銷 AI 不知道 UTM** → Jacky 批評：行銷 AI 連 UTM 是什麼都不知道，是失職 → 當場派行銷 AI 自學並建知識庫，這才是正確使用 subagent 的方式
- **Edit tool "File has not been read yet" 錯誤** → 直接 Edit `payment.js` 失敗，因沒先 Read → 修正：Edit 前必須先 Read
- **GA4 ID 張冠李戴** → academy 頁面（academy/index.html、module-2~5.html）原本裝了 mingcha 的 GA4 ID（G-X45EF3VDHW）→ grep 全部掃出來才發現，批次修正

---

## 升格候選

| 內容 | 建議升格到 | 優先 |
|---|---|---|
| Python 多行 HTML 插入模式（比 sed 可靠）| `patterns/html-insertion-python.md` | 中 |
| UTM 命名規範（AI Run 專用）| `tools/utm-social-marketing.md`（摘要版，知識庫是全文）| 高 |
| GA4 三 repo 重建 SOP（grep找→Python換）| `patterns/ga4-bulk-replace.md` | 中 |
| JSON-based CRUD 替代 SQLite（無新依賴）| `patterns/json-as-db-no-deps.md` | 低 |
| Claude Code Skill 製作流程（utm-shortlink 為例）| `concepts/skill-製作流程.md` | 高 |
| subagent 學習 → 寫進 team-knowledge 持久化 | `patterns/team-knowledge-persistence.md` | 高 |

---

## 待延伸（Next）

- 藍新金流審核通過後：Zeabur 把 `NEWEBPAY_STAGE` 改為 `false`
- 確認 5/27 短網址全部上線可用（`airun.tw/go/ig-527` 等）
- `/utm-shortlink` skill 實際使用一次驗證流程完整
- 未來：短網址 hits 資料接 GA4 Events API，做雙重比對（GA4 session 數 vs 短網址 hits）
- Academy module-2~5 GA4 需確認 `G-SZ07910G09` 已正確追蹤（非模組專屬 ID）
- 醫療業 pilot（step 2-3 adapter + engine）— 從 jdong-wiki 接續
