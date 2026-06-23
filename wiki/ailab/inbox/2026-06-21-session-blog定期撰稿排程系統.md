---
session_date: 2026-06-21
session_topic: Blog 定期撰稿排程系統（每3天·點頭制·多平台素材·AEO回饋）
model: Claude Opus 4.8 (1M)
context: AIRUN / airun.tw blog / jdong-wiki orchestrator
duration: 跨多輪對話
type: session-summary
tags: blog, aeo, content-engine, scheduler, human-gate, repurpose, orchestrator, governance
---

# Blog 定期撰稿排程系統

> Mode B：整段 session 的封存。把 airun.tw/blog 從「人工偶爾寫」升級成一條「每三天自走撰稿、人類點頭才發、發完轉多平台」的內容產線，並示範「擴充既有基建、不重造」與「dry-run/mock 先驗管線再接真 LLM」的工作法。

---

## 1. 最終形成的機制

六段管線（全在 `jdong-wiki/infra/orchestrator/blog/`，複用既有 gate/persona/Telegram，零新 npm 依賴）：

```text
議題收集器 topic-harvester
  -> 月曆排程 calendar（每3天一篇·第一個月10題 SEED）
  -> 排程器 blog-scheduler（日跑08:30，loop.js 掛載）
       檢熔斷/急停 -> 月曆到期? -> 數據回饋微調 -> 撰稿 -> 邊界+反轉句掃描
  -> 存草稿 pending -> Telegram 推 J董（待點頭）
  -> 【人類 /yes】= 跑 blog-publish.mjs <slug> = 對外授權
       -> POST /api/blog（runtime 持久卷，即時上線，不碰 git/main）
       -> repurpose 產四平台素材包 -> 標月曆 published -> 清草稿
  -> feedback 讀 /api/blog-stats，北極星=AEO命中×3+PV -> 微調下一篇
```

核心設計原則：**90/9/1**——90% 確定性管線、9% LLM 判斷（只在「寫稿」與「改寫素材」）、1% 人類守門（發布永遠等 /yes）。對外不可逆動作（公開發文）永不下放自動層，這條與 reply-agent/dispatcher 既有閘門同源。

---

## 2. 實作落點

- 程式：`blog/lib.mjs`（共用層：tg/callClaude/persona/邊界DENY/反轉句檢/publishViaApi/blog-stats）｜`topic-harvester.mjs`｜`blog-scheduler.mjs`（主迴圈＋月曆SEED）｜`blog-publish.mjs`（/yes 觸發發布）｜`repurpose.mjs`（多平台素材）｜`feedback.mjs`（數據回饋）。
- 狀態（非 git，可重生）：`logs/blog/{calendar,backlog}.json`、`logs/blog/pending/<slug>.json`、`logs/content-kits/<slug>/{newsletter.md,fb.txt,threads.txt,yt-short.md}`。
- 排程：`loop.js` TASKS 加 `blog-scheduler` 每日 08:30；systemd `jdong-loop.service`（user 服務，`systemctl --user restart` 無需 sudo）。
- 複用：`gate/llm.js callClaude`（預算熔斷）、`persona.js personaBrief`（J董聲音）、`personal-agent/pa notify`（Telegram）、`/api/blog`＋`/api/blog-stats`（既有站台端點）、`ai-sov-scan` summary.json（AEO 訊號）。
- 退役：舊 `blog-agent.mjs` cron（週一三五自動 git push＋stale /0613）已在 crontab 註解停用——它與「點頭制」衝突。

檔案是真相來源；skill/cron 只是觸發入口。

---

## 3. 決策繞路紀錄

### 3.1 發布把關：自動發 vs 點頭
既有 blog-agent 是「自動寫+自動 git push+只通知」。本次 J董 明確改成「草稿→Telegram 點頭→才發布」。實作上不耦合 dispatcher 的 /yes（它一律走 LLM executor、不適合跑固定指令），改成**確定性的發布指令** `blog-publish.mjs <slug>`，由 J董 觸發＝對外授權。簡單、可審計、不脆弱。

### 3.2 發布走 git 還是 runtime 卷
選 `POST /api/blog` 寫 Zeabur 持久卷：即時上線、不碰 git/main、不觸發重新部署、不踩 main-push 閘門（/yes 即該篇授權）。高頻內容機器不該每篇 git push。

### 3.3 多平台範圍：API 不存在的誠實
FB/Threads/YT 都沒有 API、電子報沒訂閱名單。不假裝能自動發——**只產素材包**，社群由人手動貼。誠實標出每通路「全自動/半自動/只產素材」，避免期待落空。

### 3.4 北極星：AEO 而非流量
微調下一篇用「AI 有沒有讀/推薦」（AEO 命中，blog-stats 權重×3）當北極星，而非人類 PV。對齊 AIRUN「讓 AI 推薦你」的戰略，而非追熱度。

---

## 4. 錯誤與風險提醒（這次真的踩到/擋掉的）

### 4.1 ⛔ 議題源混入客戶機密（dry-run 抓到）
topic-harvester 第一版直接吃所有 `ai-sov` 掃描——但那些是**客戶**掃描（木酢達人/Muzopet/TBSA）。拿客戶 AEO 題去寫 AIRUN blog ＝離題＋洩客戶機密。修法：加 `AIRUN_BRANDS` 白名單，**只收 AIRUN 自家品牌掃描**，客戶一律排除。教訓：任何「自動撈資料」的源，先問「這裡面有沒有客戶的東西」。

### 4.2 去 AI 腔反轉句會悄悄爆量
寫第一批文章時「不是X，是Y」反轉句一度寫了 13 句（品牌明令禁的 tic）。加了 `reversalTicCount()` 自檢、prompt 明令「最多 1 次」、發布前掃描。教訓：禁用句式要做成可量測的關卡，不能只寫在 prompt 裡靠自律。

### 4.3 dry-run/mock 先驗管線，再燒真 LLM
全程用 `--mock`（假稿不呼叫 LLM）把確定性管線（月曆/到期/邊界/pending/發布/素材/月曆推進）驗到全綠，最後才跑一次真 claude dry-run 確認「寫稿→JSON→邊界」這段。省 token、快、隔離問題。

### 4.4 順手抓到既有 loop.js 路徑 bug
`backup-site-data`/`gog-token-monitor` 任務用 `path.join(INFRA,…)`(=infra/) 但檔在 `infra/orchestrator/`＝指錯、一直沒在跑（連 gog token 到期提醒都沒響）。逐檔驗證實際位置才改（`now-snapshot-builder.js` 真在 infra/ 根，不能一律改）。教訓：盤依賴要逐檔對位置，別假設同一個常數對所有檔都成立。

---

## 5. 可升格候選

1. `ailab/patterns/自走內容產線-人類點頭制.md`——跑滿一個月（10 篇）後，把「採集→排程→撰稿→點頭→發布→轉化→回饋」升格成可複用模式。
2. `ailab/patterns/擴充既有基建而非重造.md`——本次「先派探子盤既有 cron/gate/api、只補新模組」的方法，可抽象成通用工作法。
3. `tools/` 更新：blog-stats/ai-sov-scan 當「AEO 訊號源」工具卡。

---

## 6. 可對團隊說的一句話

內容機器的價值不在「AI 自動發文」，而在「AI 把 90% 確定性流水線跑滿、只把 1% 的對外發布留給人點頭」——快、省、可控，且永遠有人為品牌按下最後那一鍵。

---

## 7. 待延伸

- 6/23 08:30 排程器產第一篇（數位孿生）草稿 → 守線複查 → /yes 發布。
- 跑滿第一個月後，用 feedback 數據回頭調月曆題目與角度。
- 之後掃 AIRUN 自家品牌 AEO（`ai-sov-scan --brand AIRUN --site airun.tw`），讓議題源真的由「AI 沒推薦你的問題」驅動。
- 電子報下一階：建訂閱名單 → blog 發新文自動寄（目前只產 newsletter.md 素材）。
- 社群若拿到 FB/Threads/YT API token，repurpose 可從「產素材」升級成「半自動發」。
