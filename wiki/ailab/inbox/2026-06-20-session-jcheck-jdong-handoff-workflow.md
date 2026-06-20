---
session_date: 2026-06-20
session_topic: Jcheck 鷹眼監控與 Jdong 執行交接工作流
model: GPT-5 Codex
context: AIRUN / Jcheck / Jdong / Codex skills
duration: 跨多輪對話
type: session-summary
tags: jcheck, jdong, workflow, handoff, skills, monitoring, work-order, governance
---

# Jcheck 鷹眼監控與 Jdong 執行交接工作流

> Mode B：整段 session 的邏輯封存。
> 這不是單一功能紀錄，而是一套 AI 營運治理分工的成形過程：Jcheck 只動眼監控，Jdong 接工作書排程協調，Work AI 執行，最後再由 Jcheck 驗收給 Jacky。

---

## 1. 最終形成的機制

這次對話把 AIRUN 的營運風險監察，從「想知道系統是否正常」升級成一條可持續運作的 AI 工作流：

```text
Jcheck 監控
  -> 擬定優化邏輯
  -> 產生工作書 WO
  -> Jdong 讀工作書
  -> Jdong 排程、分工給團隊或工作 AI
  -> Jdong 寫入工作成果回報 RR
  -> Jcheck 監控品質並產生驗收報告 QR
  -> 回報 Jacky 真人決策
```

核心分工如下：

| 角色 | 責任 | 明確禁止 |
|---|---|---|
| Jcheck | 監控 AIRUN 風險、產生工作書、驗收成果、回報 Jacky | 不修 code、不排程、不指派人、不改 Jdong 計畫 |
| Jdong | 讀 Jcheck 工作書、建立執行計畫、協調工作 AI、提交成果回報 | 不改 Jcheck 工作書、不假裝完成 |
| Work AI | 依照 Jdong 分工真正修改、部署、測試 | 不自行改需求邊界 |
| Jacky | 決定優先順序、是否升級、是否 git 化或正式上線 | 不需要盯每個低階檢查 |

這個設計的關鍵不是「讓 AI 都能做事」，而是把 AI 角色切成監察、調度、執行、驗收四層，避免同一個 AI 同時發現問題、改問題、又宣布自己通過驗收。

---

## 2. 實作落點

### AIRUN 監察工具

- `airun/jcheck/tools/airun-risk-watch.mjs`
- `airun/jcheck/tools/airun-risk-watch.config.json`
- `airun/jcheck/tools/airun-risk-watch.test.mjs`
- `airun/jcheck/wiki/operations/reports/`

第一版採「低成本、確定性、少打擾」原則：

- cron 先試跑一週。
- Red 以上才 email + Telegram。
- LLM 不直接判斷警報，只做報告摘要或後續分析。
- Jcheck 區域先 local-only，不急著推 git。

### Jcheck / Jdong 檔案交接

- Jcheck 工作書：`airun/jcheck/handoff/work-orders/WO-*.md`
- Jdong 接單計畫：`jdong-wiki/ops/jcheck-work-orders/*-plan.md`
- Jdong 工作成果：`jdong-wiki/ops/jcheck-results/RR-*.md`
- Jcheck 驗收報告：`airun/jcheck/handoff/review-reports/QR-*.md`
- 交接工具：`airun/jcheck/tools/handoff-workflow.mjs`

檔案是這套機制的真相來源。skill 只是命令入口，不承擔記憶與證據保存。

### Codex skills

低階能力：

- `jcheck-workorder`：把監控結果變成工作書。
- `jdong-read-workorder`：讀工作書，產生 Jdong 計畫與成果回報。

高階入口：

- `jcheck`：Jacky 只要喊 Jcheck，就進入鷹眼監察、產工作書或驗收模式。
- `jdong-do-it`：Jacky 只要喊 Jdong do it，就讓 Jdong 讀工作書並協調執行。

高階 skill 的價值，是讓 Jacky 不必記工具檔名和參數；低階 skill 的價值，是把邊界規則寫清楚。

---

## 3. 決策繞路紀錄

### 3.1 local-only vs git

一開始討論是否把 Jcheck 監控直接 git 上去。最後決定：

- 先 local-only 試跑一週。
- 確認警報品質、噪音量、通知頻率沒問題後，再決定是否進正式 repo 或獨立 ops repo。

理由：監控系統第一週最容易出現假警報、頻率太高、敏感資訊不小心寫入等問題。先本地試跑，比立刻推正式版本更穩。

### 3.2 Jcheck 是否可以動手修

Jacky 明確定義：Jcheck 是鷹眼，只動眼，不動手。

因此機制上刻意讓 Jcheck：

- 可以讀報告。
- 可以寫工作書。
- 可以驗收成果。
- 不可以修改 AIRUN code。
- 不可以排程團隊。
- 不可以改 Jdong 的計畫。

這條紅線是整套治理的核心。

### 3.3 skill 對 skill 交接 vs file contract

一開始想法是「Jcheck 產、Jdong 讀，兩個 skill 交接」。後來補上更穩的架構：

- skill 負責觸發行為。
- 檔案負責保存事實。
- 每一次交接都落成可追蹤檔案。

這樣即使換模型、換工具、換機器，只要檔案還在，Jcheck 和 Jdong 都能接續。

---

## 4. 錯誤與風險提醒

### 4.1 不要偽造工作成果

測試 workflow 時可以產生 smoke-test 假資料，但正式工作書不能沒有實際執行就產生結果回報。

原則：

- 真正的 `RR-*` 必須由 Jdong 在工作 AI 執行後提交。
- Jcheck 驗收時要看證據，不只看文字。

### 4.2 通知要少而準

Jcheck 如果每次 Yellow 都寄信，會很快變成沒人看的噪音。

第一版通知策略：

- Green：不通知或只寫 log。
- Yellow：寫報告，必要時摘要。
- Red：email + Telegram。
- Black：立即升級。

### 4.3 監控不能和修復混在一起

如果 Jcheck 直接修問題，Jcheck 就會同時變成裁判和球員。

目前分工刻意避免這件事：

- Jcheck 發現問題。
- Jdong 安排修復。
- Work AI 執行。
- Jcheck 再驗收。

### 4.4 Jdong 不是修 code 的人

Jdong 的角色是營運協調，不是直接動手工程師。

它要做的是：

- 讀懂工作書。
- 拆解任務。
- 決定誰或哪個工作 AI 做。
- 收斂成果。
- 回報證據。

---

## 5. 可升格候選

這次事件未來可升格成三種更穩定的知識資產：

1. `ailab/patterns/鷹眼監控到執行交接模式.md`
   - 當 Jcheck/Jdong 跑過 3 次以上真實任務後，可升格為模式。

2. `education/playbooks/jcheck-jdong鷹眼到執行交接SOP.md`
   - 已先建立可分享 SOP，供團隊與客戶理解。

3. `jdong-wiki/ops/AI營運治理制度.md`
   - 如果未來 AIRUN 正式把 Jcheck/Jdong 變成固定營運制度，可在 Jdong wiki 建制度頁。

---

## 6. 可對團隊說的一句話

Jcheck 是監察者，Jdong 是營運協調者，Work AI 是執行者，Jacky 是最後決策者。所有交接都寫成檔案，讓 AI 工作不是靠口頭接力，而是靠可驗收、可追蹤、可回放的工作流。

---

## 7. 待延伸

- 用 `/jdong-do-it WO-20260620-001` 接第一張真實工作書。
- Jdong 產生第一份真實 RR 後，再用 `/jcheck 驗收` 產生 QR。
- 一週試跑後檢查通知頻率與誤報率。
- 決定 Jcheck 是否留 local-only、移進 AIRUN repo，或獨立成 ops repo。
