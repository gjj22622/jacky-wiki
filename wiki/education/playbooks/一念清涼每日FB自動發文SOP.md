---
title: 一念清涼 每日佛學故事 FB 自動發文 SOP
domain: education
updated: 2026-06-22
audience: 內部團隊 / 接手維運的同事或 AI
prerequisite: 看得懂 GitHub Actions（cron）、JSON 檔、Facebook 粉專基本概念
duration: 15 分鐘
tags: GitHub Actions, 自動化, 社群發文, Facebook, cron, 內容排程
source_chat: 2026-06-22 把「一念清涼每天更新到 FB 的方法步驟」整理成教育訓練文件
---

# 一念清涼 — 每日佛學故事 FB 自動發文 SOP

> 「一念清涼」每天**不需要人手點發文**：寫好故事 → 排進內容月曆 → GitHub Actions 每天定時自動發到 FB 粉專，再寫回監控數據。本 SOP 教你**整套怎麼運作、怎麼接手、出事怎麼修**。
>
> 核心心法：**人只做「內容」與「排程」，發文交給機器人。**

---

## 1. 適用情境

- 接手維運「一念清涼」每日 FB 發文（同事 / 排程 AI / 換機後的自己）。
- 要把這套「寫一次內容 → 自動天天發」的做法**複製到其他粉專 / 品牌**。
- 發文中斷、漏發、數據異常時，要照表操課排查。

**這套系統的本質**：GitHub Pages（前台）+ Firebase（數據）+ **GitHub Actions（每日自動發 FB）**。發文這一步是全自動的，人只負責上游內容。

---

## 2. 前置條件（環境 / 權限 / 工具）

| 項目 | 值 / 說明 |
|---|---|
| GitHub Repo | `gjj22622/A-day-A-Story` |
| 前台 | https://gjj22622.github.io/A-day-A-Story/ |
| 儀表板（Dashboard）| https://gjj22622.github.io/A-day-A-Story/dashboard/ ｜帳密 → **見金庫**（`/作品 一念清涼`） |
| Firebase RTDB | https://yinian-qingliang-default-rtdb.firebaseio.com |
| FB 粉專 Page ID | `985242784680024`（公開資訊） |
| 發文 Workflow | `.github/workflows/auto-post.yml`（name：🪷 一念清涼 Auto Post） |
| 站內貼文 Workflow | Site Posts（另一支，發網站動態用） |
| 必要 Secrets | FB 粉專長期 access token、GitHub PAT（`repo` + `workflow` scope） — **值只在 GitHub Secrets / 金庫，不寫文件** |
| 內容檔（main 分支）| `data/stories.json`（故事庫）、`data/content_calendar.json`（每日排程）、`data/keywords.json`（心情→標籤映射）|

> 🔒 任何 token / 密碼 / FB access token 的**值**一律走金庫或 GitHub Secrets，**絕不寫進本文件或任何 wiki 頁**。

---

## 3. 步驟（照順序，可勾選）

### A. 準備內容（人 / AI 做）

- [ ] **A1 寫故事**：新增佛學寓意故事，每則含 `id`（BDH-0xx）、標題、原文、`keywords`、`tags`。
- [ ] **A2 守關鍵字規則**：每則 `keywords ≤ 12 個`、泛用詞 ≤ 3 個（避免過度覆蓋稀釋推薦）。
- [ ] **A3 寫進故事庫**：故事加進 `data/stories.json`。
- [ ] **A4 排進月曆**：在 `data/content_calendar.json` 指定「日期 → 故事 id」，要連續、不留洞、不重複。
      - 可混入 `featured_repost`（精選重播）填滿淡季，例如 6/16–7/27 主打 50+ 客群精選重播。

### B. 設定自動發文（一次性，已完成；接手時驗證即可）

- [ ] **B1 確認 cron**：`auto-post.yml` 內 `cron: '0 6 * * *'`（UTC 06:00 = 台灣 14:00）。
- [ ] **B2 確認 secrets**：GitHub repo → Settings → Secrets 內 FB token、PAT 都在且未過期。
- [ ] **B3 確認 workflow_dispatch**：yml 內保留 `workflow_dispatch`（支援手動觸發、指定日期、`dry_run`）。

### C. 每日自動執行（機器做，人不用動手）

機器人每天做的事，照順序：
1. cron 觸發 `auto-post.yml`（UTC 06:00 排定，**實際常延遲 1.5–4 小時**，屬 GitHub schedule 正常範圍）。
2. 讀 `content_calendar.json` 取「今天該發哪則」。
3. 用 FB Graph API + 粉專 token 發文到 Page `985242784680024`。
4. 寫 `post_log`（記 `post_id`、status、發文時間）+ Firebase `events/{date}` 事件。

> 近期實際發文時間穩定在 **18:00 TW** 前後，status=success。

### D. 監控驗收（人 / 排程 AI，建議每日或每週）

- [ ] **D1 對帳**：`post_log` 的故事 id ＝ `content_calendar.json` 今日排程？（一致才算成功，且無重複 success）
- [ ] **D2 看 Actions**：近 N runs 是否全 success，有沒有 failure / cancelled / 漏跑。
- [ ] **D3 看數據**：Dashboard / Firebase 今日 sessions、story_views、AI 對話、mood 輸入。
- [ ] **D4 壟斷監控**：Top1 / Top2 story views 比值，> 2x 才警報（目前多為 FB 外部直連，健康）。
- [ ] **D5 加 CTA**：FB 貼文固定帶 AI CTA「💬 輸入你的心情，讓 AI 為你選一則故事」（AI 互動是目前唯一持續成長指標）。

---

## 4. 異常情況分支

| 症狀 | 判斷 / 動作 |
|---|---|
| **某天沒發文、Firebase 零事件** | 多半是 GitHub schedule 週末單次跳過（低活躍 repo 常見），非程式錯誤。→ 去 Actions 頁手動 `workflow_dispatch` 補觸發（可指定日期）。 |
| **想先測不真發** | `workflow_dispatch` 帶 `dry_run`，驗證流程不實際貼文。 |
| **GitHub API 回 `401 Bad credentials`** | 監控用的 PAT 過期。**不影響自動發文**（Actions 內另有獨立 token），但監控要改走公開 API 或更新 PAT（`repo` + `workflow` scope）。 |
| **FB 發文失敗 / token 失效** | 粉專長期 access token 過期 → 重新產生並更新 GitHub Secrets，**不要寫進文件**。 |
| **月曆排到底 / 沒有今天** | `content_calendar.json` 沒排到今天 → 補排（可用 featured_repost 填淡季）。 |
| **某則故事壟斷推薦** | 單一故事 views > 第 2 名 2 倍 → 檢查 keywords 是否過度覆蓋，依規則修剪（≤12、泛用≤3）。 |
| **Firebase `story_views` 讀取 Permission Denied** | Security Rules 未開放外部讀 → 改用 `events` 節點估算，或從監控報告手動讀。 |

---

## 5. 驗收標準（全綠才算這天 OK）

1. ✅ 今日 Actions「Auto Post」run = success。
2. ✅ `post_log` 今日故事 id 與 `content_calendar.json` 排程**一致**、無重複 success。
3. ✅ FB 粉專實際看得到今日貼文（帶當日故事 + AI CTA）。
4. ✅ Firebase 今日有 sessions / story_views 寫入。
5. ✅ 壟斷比 Top1/Top2 ≤ 2x。
6. ✅ 未來 7 天 `content_calendar.json` 排程連續、無洞、無重複。

---

## 6. 採坑點（最珍貴，接手必看）

- **cron 不準時**：GitHub schedule 觸發常延遲 1.5–4 小時，甚至週末整次跳過。**別把延遲當故障**；真漏跑才手動補觸發。
- **PAT 過期≠系統壞**：監控 PAT 過期會讓「讀 Actions 私有端點」失敗，但**自動發文照常**（Actions 用獨立 token）。別被 401 嚇到去亂改發文流程。
- **憑證雙軌**：發文 token（FB）與監控 token（GitHub PAT）是兩條不同憑證，過期要分開處理。
- **內容是上游、發文是下游**：發文全自動，所以**漏排內容 = 漏發文**。維運重心永遠在「月曆有沒有排滿」。
- **keywords 超標不緊急但要管**：超過 12 個只影響過度覆蓋、不影響排除，可批次擇期修剪。

---

## 7. 把這套複製到別的粉專（方法論）

抽掉「佛學故事」這層內容，骨架是一個通用的**「內容月曆 + GitHub Actions 定時發社群」管線**：

1. **內容資料化**：故事 / 貼文寫成 JSON（`stories.json`）。
2. **排程資料化**：日期→內容 id 寫成 `content_calendar.json`（人唯一要持續維護的檔）。
3. **發文自動化**：GitHub Actions cron 讀月曆 → 平台 API（FB Graph / IG / LINE）發文 → 寫 log。
4. **數據回寫**：發文事件寫 Firebase / Sheet，接 Dashboard 看成效。
5. **手動逃生門**：保留 `workflow_dispatch` + `dry_run`，schedule 跳過時能補。

> 跟 [多平台數據匯流 Dashboard Pipeline SOP](多平台數據匯流到dashboard-pipeline.md) 同屬「GitHub Actions 當免費排程器」家族：那份是把數據**拉進來**，這份是把內容**推出去**。

---

## 延伸閱讀

- [多平台數據匯流 Dashboard Pipeline SOP](多平台數據匯流到dashboard-pipeline.md) — 同樣用 GitHub Actions cron 的姊妹管線（數據匯入方向）
- [AI 作業系統觀](../../ailab/concepts/AI作業系統觀.md) — 把排程 / 自動化視為「機器代你天天執行」的系統觀
- [作品頁：一念清涼](../../portfolio/projects/一念清涼-每日佛學故事.md) — 部署座標、示範腳本（登入資訊走金庫）

---

## 快速回顧（一句話）

**人寫故事、排月曆；GitHub Actions 每天定時讀月曆、發 FB、寫數據——維運只要顧「月曆排滿」和「每天對帳一次」，其餘交給機器人。**
