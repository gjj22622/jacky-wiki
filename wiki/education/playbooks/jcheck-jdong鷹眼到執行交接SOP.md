---
title: Jcheck × Jdong 鷹眼到執行交接 SOP
domain: education
visibility: team
min_tier: L2
updated: 2026-06-20
audience: 內部團隊 / AI 工作流設計者 / 客戶端可理解版本
prerequisite: 知道 Jcheck 是監察角色、Jdong 是營運執行角色
duration: 15 分鐘
tags: Jcheck, Jdong, AI治理, 工作書, 交接, 監控, SOP
source_chat: 2026-06-20 Codex 對話：從 AIRUN 監察到 Jcheck/Jdong 檔案交接與 skill 入口
---

# Jcheck × Jdong 鷹眼到執行交接 SOP

> 一句話版：Jcheck 當鷹眼，只負責監控、提出工作書與驗收；Jdong 讀工作書，協調團隊或工作 AI 執行；最後由 Jcheck 產生品質報告給 Jacky。

---

## 1. 這套 SOP 解決什麼問題

AIRUN 服務持續運行後，真正的風險不只在「網站有沒有掛掉」，還包括：

- 服務狀態是否正常。
- 各服務是否照預期運行。
- 資源使用是否有效率。
- 是否有程式碼垃圾、低效率迴圈或不必要設計。
- 資安防護是否達最低基準。
- 是否有異常流量或攻擊。
- LLM 模型依賴是否過高、成本是否失控。
- 發現問題後，是否有人接手、是否有成果、是否被驗收。

所以這套流程不是單純監控，而是「營運風險監察 + AI 工作分工 + 品質驗收」。

---

## 2. 核心角色

| 角色 | 主要任務 | 不做的事 |
|---|---|---|
| Jcheck | 監控、風險判讀、產生工作書、驗收成果、回報 Jacky | 不修 code、不排程、不指派團隊 |
| Jdong | 讀工作書、拆任務、排程、分工、整合成果 | 不改 Jcheck 工作書、不跳過證據 |
| Work AI / 團隊成員 | 依 Jdong 分工執行修復、優化、部署、測試 | 不自行改需求邊界 |
| Jacky | 做優先級、資源投入與正式上線決策 | 不需要盯每個低階監控項 |

最重要的治理原則：

```text
發現問題的人，不直接宣布自己修好了。
執行修復的人，不自己當最終驗收。
```

---

## 3. 四種檔案契約

| 檔案 | 誰產生 | 給誰讀 | 用途 |
|---|---|---|---|
| `WO-*` 工作書 | Jcheck | Jdong | 描述風險、證據、建議處理方式 |
| `*-plan.md` 接單計畫 | Jdong | Jacky / Work AI | 排程、分工、驗收條件 |
| `RR-*` 工作成果回報 | Jdong | Jcheck | 回報實際執行內容、測試、證據 |
| `QR-*` 驗收報告 | Jcheck | Jacky | 判斷成果是否通過，是否仍有風險 |

檔案比對話重要。對話會消失、模型會換、上下文會斷，但工作書、計畫、成果與驗收報告可以長期追蹤。

---

## 4. 標準流程

### Step 1：Jcheck 監控

Jcheck 讀取 AIRUN 的監控報告、服務狀態與風險訊號。

可觀察面向：

- 服務健康：public endpoint、local service、cron、daemon。
- 資源效率：CPU、memory、disk、log 膨脹。
- 程式碼風險：dirty worktree、分支錯誤、TODO/FIXME、重複輪詢。
- 資安基線：secret 外洩、公開端點、header、防火牆、依賴漏洞。
- 異常流量：錯誤率、暴增請求、可疑來源。
- LLM 依賴：模型使用量、fallback、成本、單點依賴。

### Step 2：Jcheck 產生工作書

當風險達到 Yellow/Red/Black，Jcheck 產生工作書。

工作書至少包含：

- 風險等級。
- 受影響服務。
- 觀察到的證據。
- 建議處理目標。
- 不可做事項。
- 驗收標準。

### Step 3：Jdong 讀工作書並接單

Jdong 只讀 `WO-*`，不修改工作書。

接單後產生 `*-plan.md`：

- 拆任務。
- 排優先順序。
- 指派工作 AI 或團隊角色。
- 定義完成條件。
- 定義回報格式。

### Step 4：Work AI 或團隊執行

執行者依照 Jdong 計畫做實際修改、部署或清理。

執行時必須留下：

- 修改檔案。
- 測試指令。
- 測試結果。
- 仍未處理的風險。
- 需要 Jacky 決策的事項。

### Step 5：Jdong 寫工作成果回報

Jdong 整合成果，產生 `RR-*`。

成果回報不可只寫「已完成」，必須包含證據：

- 做了什麼。
- 哪些檔案或服務受影響。
- 如何驗證。
- 驗證結果。
- 哪些問題尚未解。

### Step 6：Jcheck 驗收品質

Jcheck 讀 `WO-*` 與 `RR-*`，產生 `QR-*`。

驗收判斷：

- `pass`：符合工作書驗收標準。
- `conditional`：可暫時接受，但有剩餘風險。
- `fail`：未解決核心問題或缺證據。

### Step 7：回報 Jacky

最後只回報高訊號內容：

- 目前風險等級。
- 本次處理是否通過。
- 剩下什麼要決策。
- 下次 Jcheck 要追蹤什麼。

---

## 5. 指令入口

Jacky 日常只需要記兩個入口。

```text
/jcheck
```

用途：

- 看今天 AIRUN 風險。
- 產生工作書。
- 驗收 Jdong 的成果回報。

```text
/jdong-do-it
```

用途：

- 讀 Jcheck 工作書。
- 建立 Jdong 接單計畫。
- 協調工作 AI 或團隊處理。
- 寫成果回報給 Jcheck 驗收。

內部工具層可用：

```bash
node jcheck/tools/airun-risk-watch.mjs --no-notify
node jcheck/tools/handoff-workflow.mjs issue --help
node jcheck/tools/handoff-workflow.mjs accept --help
node jcheck/tools/handoff-workflow.mjs submit-result --help
node jcheck/tools/handoff-workflow.mjs review --help
```

---

## 6. 異常分支

### Red 風險持續出現

處理方式：

- Jcheck 不重複產生一堆同樣工作書。
- 先查是否已有 open WO。
- 若已有 Jdong plan，但無 RR，催 Jdong。
- 若已有 RR，但 Jcheck 驗收 fail，開 follow-up WO。

### Jdong 沒有成果回報

處理方式：

- Jcheck 標示為「未驗收」。
- Jacky 只看卡點，不進細節。
- Jdong 補交 RR 後再驗收。

### 成果回報沒有證據

處理方式：

- Jcheck 不通過。
- 要求補測試結果、log、diff、部署紀錄或截圖。

### 工作書內容錯誤

處理方式：

- 不直接覆寫原 WO。
- 新增 correction 或 supersede 記錄。
- 保留原始判斷，避免審計鏈斷掉。

### 牽涉高風險部署

處理方式：

- Jdong 計畫標示需要 Jacky approval。
- Work AI 不自行部署。
- Jcheck 只追蹤「是否已批准」與「部署後是否通過」。

---

## 7. 驗收標準

一個完整循環必須符合：

- 有 Jcheck 監控報告。
- 有對應工作書 `WO-*`。
- 有 Jdong 接單計畫 `*-plan.md`。
- 有工作成果回報 `RR-*`。
- 有 Jcheck 驗收報告 `QR-*`。
- 報告中有證據，而不是只有口頭完成。
- Jcheck 沒有直接修 code。
- Jdong 沒有修改 Jcheck 工作書。
- Jacky 收到的是重點結論，不是大量低階 log。

---

## 8. 團隊與客戶可理解版本

可以這樣說：

> 我們把 AIRUN 的 AI 營運拆成四個角色：Jcheck 負責監控與驗收，Jdong 負責把問題變成可執行的工作，工作 AI 或團隊負責處理，最後由真人決策者看風險報告。這樣 AI 不是自己發現問題、自己修、自己宣布沒事，而是有一條可追蹤的工作書與驗收流程。

如果客戶問「這和一般監控差在哪」：

> 一般監控只告訴你壞了。這套流程會把壞掉或有風險的地方變成工作書，交給執行角色處理，再由監察角色驗收。它監控的不只是 uptime，也包含程式碼品質、資安、資源效率、異常流量與 LLM 依賴。

如果團隊問「為什麼 Jcheck 不能直接修」：

> 因為 Jcheck 是監察者。監察者如果也負責修復，就會失去驗收的獨立性。Jcheck 的價值是客觀地看見風險、產出工作書、驗收成果。

---

## 9. 採坑點

- 不要讓 skill 對話本身成為唯一交接方式；一定要落檔。
- 不要讓 Jcheck 同時監控、修復、驗收。
- 不要在沒有實際執行時產生正式 RR。
- 不要讓通知太頻繁；Red 以上才主動推送。
- 不要把 token、chat id、secret 寫進報告或工作書。
- 不要把 dirty worktree 當成可以忽略的小事；它代表部署或版本狀態可能不清楚。
- 不要讓 LLM 判斷所有監控；基礎監控應以確定性檢查為主。

---

## 10. 延伸閱讀

- [實踐捕手協定](../../ailab/concepts/實踐捕手協定.md)
- [AI工具觀](../../ailab/concepts/AI工具觀.md)
- [三層萃取漏斗](../../ailab/concepts/三層萃取漏斗.md)
- [AIRUN 營運風險監察 workshop](../workshops/2026-06-19-airun營運風險監察/README.md)
- [Jcheck/Jdong 事件封存](../../ailab/inbox/2026-06-20-session-jcheck-jdong-handoff-workflow.md)
