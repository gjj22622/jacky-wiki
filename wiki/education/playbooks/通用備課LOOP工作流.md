---
title: 通用備課 LOOP 工作流
domain: education
updated: 2026-06-28
audience: Jacky、課程協作者與接手 AI
prerequisite: Jacky 課程與備課系統總覽
duration: 20 分鐘
tags: 備課, LOOP, SOSTAC, workflow, 品質閘門
source_chat: 2026-06-28 TBSA 開課流程自動化全資料夾盤點
---

# 通用備課 LOOP 工作流

> 入口：[`jacky-course-prep-loop`](../skill/jacky-course-prep-loop/SKILL.md)。母方法：[SOSTAC 迴圈與逆推除錯](../../shuangyun/concepts/SOSTAC迴圈與逆推除錯.md)。

## 核心

每階段固定跑 `Input → Decision → Output → Quality Gate → Log`；驗收 C 回到下一輪現況 S。單場追求準時且符合目標，跨場才追求模板化。

## 十階段

| 階段 | 核心決策 | Gate 產出 |
|---|---|---|
| Intake | 成功是什麼 | 可檢查目標與限制 |
| Route | 這到底是哪種課 | 主課型、模組與禁用項 |
| Retrieve | 哪些前例可借 | 前例對齊報告 |
| Design | 如何讓時間與目標一致 | 記憶錨點、時間軸、交付 |
| Validate | 哪些假設值得先查 | 證據或明示風險 |
| Build | 真正需要做哪些東西 | 版本清楚的最小完整交付 |
| Rehearse | 上場會在哪裡壞 | 內容、時間、工具與備援驗收 |
| Deliver | 現場實際發生什麼 | 偏差與證據紀錄 |
| Review | 為何成功或失敗 | 對目標的根因復盤 |
| Promote | 哪些值得成為資產 | 候選、升格或淘汰決定 |

## 管理原則

- 先路由再套 SOP；受眾和主題都不能代替課型。
- 先結構、後簡報；記憶錨點與時間線未過 Gate 不進視覺製作。
- 問卷是驗證工具，不是儀式。
- 最小完整交付優先；不為了展示 AI 增加學員操作成本。
- T-24 小時後凍結非必要視覺變更。
- 失敗依 A→T→S→O→S 逆推；同一方法無新證據最多三次。
- 通用規則至少兩場驗證；單場內容不直接污染 skill。

## 跨場大循環

`新案例 → 模式候選 → 模板候選 → 第二場驗證 → 正式升格 → 舊版封存`。

升格需記錄來源場次、適用課型、成功證據、反例和版本。高風險單次失敗若因果清楚，可直接升格為紅線。

