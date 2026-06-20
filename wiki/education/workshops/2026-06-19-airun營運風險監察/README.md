---
title: AIRUN 營運風險監察：低成本監控與 Jcheck 報告
domain: education
updated: 2026-06-19
audience: 內部團隊 + 客戶端 / 非工程師
prerequisite: 知道 AIRUN 有多個服務與 AI 工作流，不需工程背景
duration: 20 分鐘
tags: AIRUN, 監控, 營運風險, Jcheck, LLM治理, 通知
source_chat: 2026-06-19 Codex 對話：從監察報告規劃到 airun-risk-watch 實作與通知設計
---

# AIRUN 營運風險監察：低成本監控與 Jcheck 報告

## 這份教材要解決什麼

AIRUN 不是單一網頁，而是一組 AI 服務、工作流程、模型 gateway、內部工具與對外入口。系統有沒有掛掉只是最表層的問題。真正的營運風險通常會先出現在：

- 某個服務變慢或偶爾失敗
- repo 長期 dirty，改動沒有被整理
- `.env`、token、CORS、auth 設定留下風險
- 程式碼開始累積重複、同步 I/O、低效率迴圈
- LLM 供應商、模型或 API key 過度集中
- 通知太吵，真正事故反而被忽略

這次的做法是建立 AIRUN 的低成本營運風險雷達：用 Jcheck 裡的一支 deterministic script 定期產出報告，低成本觀察 AIRUN 的健康、效率、資安、流量、程式碼與 LLM 依賴。

## 核心觀念

### 不是先買重型監控，而是先定義風險雷達

對 AIRUN 現階段來說，最重要的是用低資源成本看見風險，而不是一開始導入一整套昂貴平台。

因此第一版選擇：

- Node script
- JSON config
- Markdown 報告
- dashboard snapshot
- email + Telegram 通知
- cron 或 CI 排程即可執行

### 監控判斷不用 LLM 做

LLM 可以幫忙摘要報告，但不應該直接決定「是否異常」。

原因是監控需要穩定、可重現、可追蹤。這次的 AIRUN Risk Watch 用 deterministic checks 做判斷：

- endpoint 回應
- HTTP status
- repo branch / dirty status
- 程式碼風險 pattern
- 設定檔風險 pattern
- 通知環境變數是否齊全
- LLM 依賴與 fallback 線索

LLM 之後可以加在「解釋層」，但不放在「警報判斷層」。

## 監察報告的面向

### 1. 系統整體健康

要知道 AIRUN 現在能不能被使用，核心入口是否可達，公開服務是否正常回應。

可觀測訊號：

- 主要 URL 是否 200
- 延遲是否超過門檻
- optional local service 未啟動時是否只列 Yellow
- 連續失敗是否升級為 Red 或 Black

### 2. 各服務運行狀態

AIRUN 可能包含公開站、內部 gateway、明腦、明察、任務流程與本地 daemon。報告要把服務拆開，不要只給一個「正常 / 不正常」。

可觀測訊號：

- service name
- endpoint
- status code
- latency
- required / optional
- 失敗原因

### 3. 資源效率

低成本監控的核心是先看「資源是否被浪費」，避免工具本身變成負擔。

可觀測訊號：

- 大型 log 或 artifact
- node_modules / cache 是否失控
- report 保留週期
- build output 是否長期堆積
- script 是否可在 no-network / dry-run 下執行

### 4. 程式碼垃圾與效率風險

不是所有風險都是 outage。有些風險會先以低品質程式碼出現。

可觀測訊號：

- 超大檔案
- 同步 I/O
- 無限制迴圈
- debug / TODO / FIXME 過量
- 重複邏輯
- 可能阻塞 event loop 的設計

### 5. 資安基線

第一版不追求完整滲透測試，但要有基本防護觀察。

可觀測訊號：

- secret pattern
- `.env` 是否被追蹤
- API key / token 是否硬編碼
- unsafe eval / shell execution
- CORS 過寬
- auth bypass 線索
- security header 缺漏

### 6. 異常流量與攻擊

初期先用 log pattern 和錯誤線索做低成本觀察，後續再接更完整的流量監控。

可觀測訊號：

- 4xx / 5xx 激增
- unknown route 爆量
- auth failure
- suspicious user-agent
- repeated IP / path
- webhook 失敗或重放跡象

### 7. LLM 模型依賴

AI 服務的風險不只在伺服器，也在模型供應鏈。

可觀測訊號：

- 使用哪些 provider
- 是否有 fallback
- 是否有 timeout
- 是否有 retry 上限
- 是否有成本上限
- 是否有模型切換策略
- 是否把核心流程綁死在單一模型

### 8. Repo 與交付衛生

營運風險也包含「現在到底跑的是哪一版」。

可觀測訊號：

- branch 是否為預期分支
- dirty worktree 是否存在
- untracked files 是否過多
- 是否有本地變更未同步
- 監控工具是否刻意放在 local-only 區域

## 時段設計

### 短週期：每 5 到 15 分鐘

目標是快速知道服務是否還活著。

檢查內容：

- required endpoints
- HTTP status / latency
- 通知狀態是否需要觸發
- 最近一次 report 是否成功產出

通知策略：

- Green：不通知
- Yellow：只記錄
- Red：狀態改變才通知
- Black：立即通知

### 中週期：每天或每週

目標是知道 AIRUN 是否開始累積營運風險。

檢查內容：

- repo dirty / branch
- 程式碼風險 pattern
- 設定檔風險
- LLM dependency
- log / artifact 成長
- optional services 狀態

通知策略：

- 每日 email 摘要
- Red 以上同步 Telegram

### 長週期：每月或重大改版前

目標是做架構與商業風險檢查。

檢查內容：

- LLM provider 集中度
- 成本結構
- 服務拆分是否合理
- 資安 posture
- incident / near-miss 回顧
- 是否需要升級到 Prometheus / Grafana / SIEM

通知策略：

- 產出月報
- 放進 Jcheck / wiki
- 形成下個月的工程優先順序

## 通知規劃

通知不是越多越好，而是要能讓人採取行動。

預設通知對象：

- `agentflowjdong@gmail.com`
- `gjj22622@gmail.com`
- Telegram：AIRUN / Personal Agent 通知通道

分級：

- Green：只寫入報告。
- Yellow：納入每日摘要。
- Red：email + Telegram，但只在狀態改變或首次出現時通知。
- Black：立即 email + Telegram。

每則通知要包含：

- 嚴重度
- 影響服務
- 目前狀態
- 最可能原因
- 下一步建議
- 報告位置

## 團隊應該怎麼用

1. 新增或修改 AIRUN 服務時，同步更新 `airun-risk-watch.config.json`。
2. 每次重大改版前跑一次 dry-run。
3. 每天看一次摘要，不要只等 Telegram。
4. Red 以上要留下處理紀錄，方便之後回顧。
5. 不要把 token 寫進 repo，用環境變數管理。
6. 如果監控開始太吵，先調整閾值和分級，不要直接關掉。

## 客戶可以怎麼理解

這套機制的價值不是「我們會寄通知」，而是我們把 AI 服務的營運風險變成可觀測、可討論、可持續改善的報告。

對客戶來說，代表：

- AI 工作流不是黑箱交付。
- 系統健康、成本效率、模型依賴與資安風險會被持續觀察。
- 異常事件有通知與分級，不是等使用者抱怨才知道。
- 長期可以累積出更成熟的 AI 服務治理能力。

## 採坑提醒

- 不要用 LLM 直接做監控判斷。
- 不要每次小警告都 Telegram。
- optional service 要和 required service 分開。
- 監控腳本要能 dry-run，避免測試時誤發通知。
- email / Telegram token 必須放環境變數。
- local-only Jcheck 很適合初期，但若要團隊共同維護，要另行決定是否移入正式 repo 或獨立 repo。

## 延伸閱讀

- [實踐捕手協定](../../../ailab/concepts/實踐捕手協定.md)
- [AI 工具觀](../../../ailab/concepts/AI工具觀.md)
- [三層萃取漏斗](../../../ailab/concepts/三層萃取漏斗.md)
- [AI 團隊三線並行開發模式](../../../ailab/patterns/AI團隊三線並行開發模式.md)
- [AIRUN 低成本營運風險監察機制](../../../ailab/inbox/2026-06-19-airun-risk-watch.md)

