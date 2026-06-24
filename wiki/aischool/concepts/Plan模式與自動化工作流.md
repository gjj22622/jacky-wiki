---
title: Plan 模式與自動化工作流（Plan × Auto × Goal）
domain: aischool
updated: 2026-06-24
---

# Plan 模式與自動化工作流

> 一句心法：**先鎖方向（plan），再放手（auto / goal）。** 大任務直接叫 AI 做，它會中途亂發揮或做一半停下來問；切成兩段就穩。

這是一個跨工具的進階開發技巧，對應 AGENTS 的「拆」(A — 先把工作拆清楚寫成計畫) 與「修」(E — 計畫被人審過才執行)。屬 L5（協作與部署）、L6（迴圈）的進階延伸。

## 什麼是 Plan Mode

Plan Mode ＝ **先計畫、後執行**的兩段式工作法：

1. **唯讀探索**：AI 只讀不寫，去理解現況、搜尋既有做法。
2. **寫出可審計畫**：把「已鎖定決策、步驟、鐵則、驗證方式」寫成一份計畫，攤開給人看。
3. **人核准**：你審計畫、改方向；方向對了才放行。
4. **執行**：照核准的計畫一步步做。

價值：在 AI 動手改任何東西之前，先把「要做什麼、不要做什麼」談定，省掉做錯重來。

## 三工具軌都有 Plan Mode

[三大工具軌](教學定位與AGENTS對應.md)（Claude · Codex · Antigravity）都內建「先計畫後執行」的模式：

| 工具 | 名稱 | 計畫產物 | 切換／核准 |
|---|---|---|---|
| **Claude Code** | Plan Mode | `.claude/plans/*.md` 計畫檔 | `Shift+Tab` 進入；`ExitPlanMode` 送審核准後才執行 |
| **Codex** | plan mode | 計畫清單 | 先列計畫、確認後執行 |
| **Antigravity** | Planning Mode（相對 Fast Mode） | Implementation Plan artifact（目標／技術棧／步驟／檔案變更／測試）；完成後再產 Walkthrough artifact（變更摘要＋怎麼測） | 用 Google-Docs 式畫線留言改計畫、回「proceed」核准；Fast Mode 則直接動手不出計畫 |

> Antigravity 的建議：複雜、跨 3+ 檔、正式碼、不熟領域時用 Planning Mode；打字錯字、單一明顯修正才用 Fast Mode。Claude Code / Codex 同理——大事先 plan，小事直接做。

## Plan Mode + Auto Mode

計畫核准後，讓 AI **無人值守自走**把計畫跑完。Antigravity 核准 Implementation Plan 後「逐步自走、自我驗證」即此型；Claude Code 則搭配自動許可／背景執行讓它連續做完多步，不必每步點頭。

要點：**自動化的前提是計畫已鎖死方向**。沒先 plan 就開 auto，等於放手讓它亂跑。

## Plan Mode + Goal Mode（Claude Code 近全自動心法）

Claude Code 的 `/goal`（目標 + Stop hook）能把一個大目標自走到完成。和 plan mode 串起來就是雙云實證的「逼近全自動」做法：

1. **plan mode 先把計畫寫死**：在計畫檔裡明列「已鎖定決策（不要重問）、依序步驟、鐵則、驗收方式」。
2. **`/goal <把計畫濃縮成的起始指令>` 啟動**：指令內含目標、工作目錄、計畫檔路徑、已鎖定決策、步驟、鐵則。
3. **AI 自走**：自己跑完多階段（建置→多 Agent→驗證→commit→push→部署），只在「真正屬於你的決策點」停下來問，其餘全自動。

> 這和 L6 的 [SOSTAC 迴圈](../curriculum/L6_迴圈_Agent自動迴圈.md) 同一條線：迴圈的「策略格」就是用 plan mode 拆解擬定，再讓六格 Agent 自己跑、自己監控、達標才停。

### 雷區：plan mode × goal Stop hook 互鎖

當 goal 已達成大半、AI 想停下來問你意見時，goal 的 Stop hook 會「沒做完就把你推回去做」；若此時又處在 plan mode（禁止非唯讀動作），就卡成死結——hook 要求執行、plan mode 禁止執行。

**解法**：給 AI 一個明確出口（回一句「直接做」或貼一個新的 `/goal`），或讓它 `ExitPlanMode` 脫離計畫模式。

## 快速回顧

把大專案交給 AI：**先 plan 鎖方向 → 再 auto/goal 放手 → 能並行就並行**。三工具軌都有 plan mode，挑你手上那套用就好；組合 goal 模式時記得「互鎖」這個雷。

## 延伸閱讀

- 完整實戰教材（母教材）→ [education / 用 Claude Code 把文獻知識庫變公開內容產品](../../education/workshops/2026-06-01-文獻知識庫公開內容產品/README.md)
- `/goal` 近全自動的原始事件 → [ailab/inbox / 2026-05-31 第一次用 /goal](../../ailab/inbox/2026-05-31-goal-mode-99pct-automation.md)
- Claude Code 工具觀 → [ailab/tools/claude-code](../../ailab/tools/claude-code.md)
- L6 自動迴圈 → [課程 L6・Agent 自動迴圈](../curriculum/L6_迴圈_Agent自動迴圈.md)
- 進階課入口 → [課程 L5-07 Claude Code 自動化 CLI](../curriculum/L5_串通_協作與部署.md)

[← 回 AI School 索引](../AI School索引.md)
