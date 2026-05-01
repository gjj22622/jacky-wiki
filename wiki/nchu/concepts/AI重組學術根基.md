---
title: AI 重組學術根基（博士班 × AI 工作的雙線敘事）
domain: nchu
updated: 2026-04-29
---

# AI 重組學術根基（博士班 × AI 工作的雙線敘事）

> 博士班入學（2025）與 AI 全面進場（2023）幾乎同期——這不是巧合，是**同一個人的同一個決定**：「48 歲，回頭補一個根」。
> 來源：[jlife / AI 與博士 卷五](../../jlife/stages/AI與博士_2023-2026.md)

---

## 為什麼把博士班和 AI 放在同一個敘事

> 來源：[jlife/書的結構 §E 版三個結構特色](../../jlife/concepts/書的結構.md)
>
> 「博士班入學（2025）與 AI 進場（2023）幾乎同期，都代表『**重新學習**』的決定。把它們放在同一卷，形成『**一個 48 歲的人同時用 AI 重組工作、用博士班重建知識根基**』的雙線敘事。」

兩條線都在做同一件事：

| 線 | 在重組什麼 |
|---|---|
| **AI 線**（2023-） | 重組**工作方式**——用 Agent 取代重複勞動、用 AGENTS® 方法論重新組織思考 |
| **博士班線**（2025-） | 重組**知識根基**——用學術方法重新理解世界、用同儕審稿訓練嚴謹度 |

> 兩條線不是並列，是**同一個人在兩個層次同時重啟**。

---

## 雙線交集點

### 1. 文獻 vs Skill

AI 工具製作 Skill 的方式 ↔ 學術文獻的引用習慣

| AI Skill | 學術文獻 |
|---|---|
| 引用其他 Skill 的功能 | 引用其他學者的研究 |
| 標註版本與依賴 | 標註出處與年份 |
| 防止 hallucination | [literature-verifier](學術Skill體系.md) 防止錯誤引用 |

### 2. 審稿 vs 品管

學術審稿框架 ↔ AI 產出品管框架

| 學術 | AI |
|---|---|
| `journal-reviewer` 框架 | [shuangyun/scoring-agent](../../shuangyun/skills/評分Agent.md) 框架 |
| 雙盲評審 | 殘酷測試三色情境（🟢🟡🔴）|
| 修稿迴圈 | Agent 進化日誌 |

### 3. 老師指導 vs Brain 層

`nchu-advisor-huang`（模擬黃老師）↔ `jackybraincommander`（總指揮）

兩者結構一樣：**Brain 層的代理人**——在沒有實際指導者時，用 AI 預演對方視角。

---

## AI 重組學術工作流的具體做法

> 詳細 Skill 見 [學術 Skill 體系](學術Skill體系.md)。

```
讀文獻
  └─ paper-reading-guide → 快速消化文獻

寫論文
  ├─ literature-verifier → 防止引用錯誤
  ├─ nchu-advisor-huang  → 預演老師會怎麼看
  └─ jackybraincontrol   → CFALSA 六維度品管

投稿
  ├─ journal-reviewer-router → 路由到具體期刊
  └─ journal-chinese-forestry → 套用期刊格式
```

> 這套工作流本身就是 [AGENTS® N 階段（Network 串聯協作）](../../shuangyun/concepts/AGENTS知識體系.md#n--network串聯協作) 的學術應用。

---

## 与 [shuangyun AGENTS®](../../shuangyun/concepts/AGENTS知識體系.md) 的關係

> AGENTS® 方法論本來是為了「把工作交給 AI」設計的，但拿來做學術也通用——因為**核心都是把隱性知識顯性化**。

| AGENTS 階段 | 在博士工作中的對應 |
|---|---|
| **A** Analyze | 拆解論文寫作流程（從題目到投稿） |
| **G** Generate | 為每個流程環節寫 Skill |
| **E** Evaluate | 用嚴謹度測試（同儕審稿級別）測試 Skill |
| **N** Network | 多 Skill 串聯成完整工作流 |
| **T** Track | 追蹤論文修改歷程、引用管理 |
| **S** Scale | 把工作流分享給其他博士生 |

---

## 一條 AI x 學術的回望

> 「**整天的 AI，晚上木工舒壓完後，還是 AI**。」（fb:2026-03-09）

這句話總結了 [jlife/作品線](../../jlife/stages/作品線_2015-2026.md)（木工慢線）與 [jlife/AI 與博士](../../jlife/stages/AI與博士_2023-2026.md)（AI 快線）的並置邏輯——**人不能全被效率吃掉，但也不能拒絕重組**。

博士班是這個張力中的第三條線：**慢的學術** vs **快的 AI** vs **手感的木工**。

---

## ⭐ 對應 [ailab 域](../../ailab/AI實踐索引.md)（2026-05-02 新增）

> 學術應用是 ailab 工具棧的**主場景之一**——許多重大實踐紀錄反向貢獻給 ailab 的工具觀／方法觀。

| 在 nchu 看到 | 在 ailab 看到 |
|---|---|
| 73% 幻覺事故 → 零幻覺 SOP | [實踐捕手協定](../../ailab/concepts/實踐捕手協定.md) 範例 2：失敗事件記錄格式 |
| seminar-helper 9 階段工作流 | [模式索引](../../ailab/patterns/模式索引.md)：學術應用模式 |
| nchu-advisor-huang Brain 代理人 | [Auto-memory 系統](../../ailab/tools/auto-memory系統.md) 與 Brain 模型對照 |
| 博二 + 朱彥煒共指（多 advisor） | [experiments/EXP-04 nchu-advisor-zhu](../../ailab/experiments/2026-Q2實驗清單.md) 候選 |

> **流向**：nchu 場景 → ailab/patterns 註記 → 跨場景累積 → AGENTS v1.1 結晶（8 個新元素）。

---

## 相關連結

- 域首頁 → [../中興博士索引.md](../中興博士索引.md)
- 學術 Skill 體系 → [學術Skill體系.md](學術Skill體系.md)
- 前傳 → [jlife / AI 與博士 卷五](../../jlife/stages/AI與博士_2023-2026.md)
- AGENTS® 方法論 → [shuangyun/AGENTS知識體系.md](../../shuangyun/concepts/AGENTS知識體系.md)
- ⭐ ailab 域 → [AI實踐索引](../../ailab/AI實踐索引.md)
