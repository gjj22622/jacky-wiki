---
title: Subagent 並行 fan-out 設計法（個人視角）
domain: ailab
type: patterns
updated: 2026-06-18
tags: subagent, parallel, fan-out, agent-tool, delivery
---

# Subagent 並行 fan-out 設計法（個人視角）

> 完整 SOP 已升格 education（廚房試完端上桌）。本頁只留個人視角與觸發脈絡，**不複製內容**。
> → **可照做的 SOP**：[education/playbooks/subagent並行fan-out交付SOP](../../education/playbooks/subagent並行fan-out交付SOP.md)
> → **反面教材**：[education/pitfalls/subagent與交付採坑點](../../education/pitfalls/subagent與交付採坑點.md)

## 我個人視角

- **觸發契機**：2026-06-18 四學院視覺 v2——一則訊息派 4 個設計師 agent 各做一院，1 個 socket 斷線回 0 token，補跑那院才補齊。
- **核心心法**：fan-out 的咬合度＝主代理那份「統一世界觀框架」寫得多死；產物落檔不回 context 才規模化得起來。
- **與 [Commander+Executor 單人多 Agent 模式](模式索引.md) 的關係**：那個強調「分流不污染主 context」（本質非加速）；本法是「**真並行加速**」的特例——前提是 N 件**彼此獨立**。兩者不衝突，本法多一層「並行的代價＝要驗收（死亡偵測/截圖/grep）」。
- **與 [AI團隊三線並行開發模式](AI團隊三線並行開發模式.md) 的區隔**：那是 work-queue + daemon 跨對話派工；本法是單一對話內 Agent 工具一次 fan-out。
- **原始 session 脈絡**：`ailab/inbox/2026-06-18-session-subagent-fanout-設計與html轉pdf交付.md`
