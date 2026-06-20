---
event: AIRUN 低成本營運風險監察機制
date: 2026-06-19
model: GPT-5 Codex
context: AIRUN / Jcheck / 明腦營運風險治理
type: 工作流改進
maturity: 已驗證
tags: airun, jcheck, risk-watch, monitoring, deterministic, notification, llm-dependency
---

# AIRUN 低成本營運風險監察機制

## 發生了什麼

Jacky 想把 AIRUN 的營運風險監察系統化，目標不是單純知道服務有沒有掛，而是知道整個 AIRUN 是否健康、資源是否有效率、程式碼是否累積垃圾、資安是否有基本防護、是否有異常流量或攻擊，以及 LLM 模型依賴是否過高。

原始需求包含：

- 系統運行狀態是否正常
- AIRUN 各服務運行狀態
- 資源效率是否正常
- 是否有程式碼垃圾、低效率設計或危險迴圈
- 資安是否有一定防護
- 是否有異常流量或攻擊
- LLM 模型依賴度評估
- 低資源成本前提下做完整營運風險監察
- 通知寄到 `agentflowjdong@gmail.com`、`gjj22622@gmail.com`，並加入 Telegram

這次把想法實作成 Jcheck 工具：

- `airun/jcheck/tools/airun-risk-watch.mjs`
- `airun/jcheck/tools/airun-risk-watch.config.json`
- `airun/jcheck/tools/airun-risk-watch.test.mjs`
- `airun/jcheck/tools/README.md`

工具以 deterministic checks 為主，不依賴 LLM 判斷監控數字。它會掃服務端點、git 狀態、程式碼風險、設定檔風險、LLM 呼叫依賴、notification 設定，並輸出 JSON / Markdown / dashboard snapshot。通知分級支援 email 與 Telegram，dry-run 預設不真的送出。

## 為什麼重要

這次的關鍵不是「多裝一套監控」，而是把 AI 服務的營運風險拆成可定期觀察的面向。AIRUN 不是單一網站，它包含多個服務、內部工具、AI gateway、workflow 與對外入口。只看 uptime 不夠，因為很多風險會先從成本、設定、程式碼品質、模型依賴與異常行為出現。

這套機制把「明腦」從知識與工作流程接入，推進到「營運風險也接入大腦」：

- 團隊知道哪裡正常、哪裡不正常。
- 客戶可以理解我們不是只交付 AI 功能，也會治理 AI 服務風險。
- 監控報告可以沉澱回 Jcheck，變成每次營運判斷的共同語言。

## 這次形成的流程

### 1. 先定義監察報告，不急著上重型工具

報告分成短、中、長三種週期：

- 短週期：高頻、低成本，觀察服務是否活著、端點是否回應、通知是否需要觸發。
- 中週期：每天或每週，觀察資源效率、程式碼風險、設定風險、LLM 依賴與異常趨勢。
- 長週期：每月或重大改版前，做架構風險、資安 posture、模型供應商依賴與成本結構檢查。

### 2. 監控先做 deterministic，不讓 LLM 決定警報

LLM 適合摘要、解釋與產生建議，但不適合直接判斷「現在是否異常」。

這次的設計是：

- 規則與閾值由 config 管理。
- 腳本直接檢查端點、檔案、程式碼、repo 狀態與通知設定。
- LLM 只作為日後可選的說明層，不作為警報來源。

### 3. 用 Jcheck 當 AIRUN 的本地營運黑盒

Jcheck 是 AIRUN 的本地監察區，不一定要進產品 repo。它可以保存：

- 監控工具
- 稽核報告
- dashboard snapshot
- 操作手冊
- 風險判斷紀錄

這讓「監控 AIRUN」與「開發 AIRUN」保持分離，降低污染正式產品程式碼的風險。

### 4. 通知要分級，不要把人吵死

通知設計不是所有事件都推播，而是按照嚴重度與狀態變化：

- Green：只記錄，不通知。
- Yellow：進每日摘要信。
- Red：狀態改變時 email + Telegram。
- Black：立即 email + Telegram。

預設 email 收件人：

- `agentflowjdong@gmail.com`
- `gjj22622@gmail.com`

Telegram 走 AIRUN / Personal Agent 現有通知通道。

## 可重複使用的模式

這次可抽象成「低成本營運風險雷達」模式：

1. 先列服務與風險面，不先買平台。
2. 每個風險面定義最小可觀測訊號。
3. 用 deterministic script 產生機器可讀報告。
4. 用 Markdown 產生人可讀摘要。
5. 只對狀態變化與高風險事件通知。
6. 定期把結果沉澱回 wiki / Jcheck。

## 可複製到其他專案的檢查面向

- Service health：服務端點是否回應、狀態碼、延遲、是否可選服務。
- Resource efficiency：CPU / memory / disk / logs / cache / build artifact 是否異常。
- Code risk：大檔案、sync I/O、危險迴圈、未清理 debug、重複邏輯。
- Security baseline：`.env`、secret pattern、CORS、auth bypass、unsafe eval。
- Traffic risk：異常 log、暴力請求、未知來源、錯誤率。
- LLM dependency：模型供應商集中度、fallback、成本上限、timeout、重試策略。
- Repo hygiene：branch、dirty worktree、未追蹤檔、未同步狀態。
- Notification readiness：email / Telegram token 是否存在、dry-run 是否可驗證。

## 踩坑點

- 監控工具本身不能變成高成本負擔。這次刻意用 Node script + cron 型設計，不一開始導入 Prometheus / Grafana。
- 監控不能只看 public endpoint。內部 gateway、repo 狀態、LLM 呼叫與設定風險同樣會影響營運。
- optional local service 不能和正式 outage 混在一起。像 Brain Gateway local dev 沒跑時應該標 Yellow，不該直接 Black。
- 通知要避免 spam。若每次 cron 都寄信，團隊會很快忽略真正風險。
- `jcheck/` 被 `.git/info/exclude` 忽略，這是刻意的本地監察區；若要團隊共享，需另行決定是否移到正式 repo 或獨立 repo。
- email / Telegram token 不能寫死在 repo，要由環境變數提供。

## 已驗證

- 單元測試通過：`node --test jcheck/tools/airun-risk-watch.test.mjs`
- dry-run / no-network / no-notify 可輸出報告
- network dry-run 可檢查 AIRUN、明察、明腦公開端點
- local optional Brain Gateway 未啟動時正確列為 Yellow
- 報告可輸出 JSON、Markdown 與 dashboard snapshot

## 升格建議

暫留 inbox。

若 AIRUN 實際 cron 跑一週且通知穩定，可升格為：

- `ailab/patterns/低成本營運風險監察模式.md`
- 或補入 `ailab/tools/codex-cli.md`
- 或擴充 `ailab/concepts/AI工具觀.md`，補上「AI 工具服務化後的營運風險治理」

