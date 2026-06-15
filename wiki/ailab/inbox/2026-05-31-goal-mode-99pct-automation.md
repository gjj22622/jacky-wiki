---
event: 第一次用 /goal（plan mode + goal hook）近乎全自動完成一整個網站開發＋部署
date: 2026-05-31
model: claude-opus-4.8
context: J博Team 文獻知識庫網站（NCHU 森林數位孿生）升級為公開內容產品 + Zeabur 部署
type: 工作流改進
maturity: 已驗證
tags: goal-mode, plan-mode, stop-hook, automation, multi-agent, claude-code, zeabur
---

## 發生了什麼

第一次使用 Claude Code 的 `/goal` 功能。把一段含完整計畫檔的長指令設成 goal，Claude 接著用「**多分支多 Agent 並行**」自主把 Phase B/C/D（後台製程＋資料庫＋付費層 scaffold）、7 篇文獻 learning_note 回填、git push GitHub、Zeabur 部署＋兩站互連，**幾乎全自動跑完**，中途只在真正屬於使用者的決策點（站名、整合架構、dev→main 抉擇）停下來問。整體約 99% 由 AI 自走，Jacky 只做關鍵拍板。

## 為什麼重要

這是「下指令 → 等成品」與「逐步盯著做」之間的質變。`/goal` 加上 Stop hook，讓 AI **不會在任務沒做完時擅自收手**——hook 會擋下停止、把 goal 本身當指令反覆推進，直到條件達成。配合 plan mode 先把計畫寫死、再放手執行，等於把「規劃確認」與「自動執行」切成兩段，既保留人對方向的控制，又拿掉了人對每一步的盯場成本。對 Jacky 的單人重度開發場景（NCHU／Jwood／双云）是可複用的高槓桿工作流。

## 怎麼做的

1. 先用 plan mode 把完整計畫寫成 `.claude/plans/<name>.md`（決策鎖定、步驟、鐵則、驗證方式全列清楚）。
2. `/goal <把計畫濃縮成的起始指令>`：指令內含「已鎖定決策（不要重問）」「現況（已查證的 ID/路徑）」「依序步驟」「鐵則」「先讀計畫檔」。
3. Claude 啟動後自走：多 Agent 並行（一輪 3 個做 B/C/D，一輪 7 個各回填一篇文獻）、整併、build 驗證、commit、push、Zeabur CLI 部署、綁網域、互連連結、端到端 curl 驗證。
4. 只在使用者決策點用 AskUserQuestion 停下（站名、兩站整合架構），其餘全自動。

## 對比與替代

- **之前**：每個階段都要 Jacky 回一句「繼續」，AI 容易做一半就停下問「要不要往下」。
- **現在**：goal + Stop hook = AI 自己判斷沒做完就繼續，省掉大量「繼續」往返。
- **替代**：`/loop`（定時重跑）適合輪詢/週期任務；`/goal` 適合「一個有明確終點的交付」。
- **⚠ 踩到的坑（對照價值最高）**：當 goal 已達成大半、AI 想停下來問使用者意見時，Stop hook 會持續觸發「條件未滿足」把 AI 推回去；若此時又處在 **plan mode**（不能執行非唯讀動作），就會卡成死結——hook 要求執行、plan mode 禁止執行，AI 只能反覆對使用者喊話。解法是使用者給一個明確出口（「直接做」或貼新 /goal），或 AI 用 ExitPlanMode 請求離開。**教訓：plan mode 與 goal Stop hook 同時開時要留意這個張力，別讓兩者互鎖。**

## 連結與出處

- 計畫檔：`C:\Users\gjj22\.claude\plans\jaunty-wobbling-waterfall.md`（網站升級）、`...\fdt-fdt-repo-zeabur-groovy-crystal.md`（兩站互連）
- 成品：文獻站 https://forest-lit.zeabur.app ｜ FDT 展示站 https://tpe-forest-dt.zeabur.app（同 Zeabur 專案 Forest_FDT）
- 相關模式：[patterns/AI團隊三線並行開發模式](../patterns/AI團隊三線並行開發模式.md)、[cross-domain/Commander+Executor 單人多 Agent 模式](../../cross-domain/Commander+Executor單人多Agent模式.md)
- 資產頁：[nchu/cases/文獻知識庫網站](../../nchu/cases/文獻知識庫網站.md)

## 升格目標（建議落點）

- 主升格 → [tools/claude-code.md](../tools/claude-code.md) 新增「/goal（goal + Stop hook）自走工作流」一段，含「plan mode 互鎖」雷區。
- 次連結 → [patterns/AI團隊三線並行開發模式](../patterns/AI團隊三線並行開發模式.md) 補一條「goal 模式驅動多 Agent 自走」。
