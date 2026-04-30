---
title: nchu 學術 Skill 體系（規劃 6 + 已實作 1）
domain: nchu
updated: 2026-04-30
---

# nchu 學術 Skill 體系（規劃 6 + 已實作 1）

> **誠實版**：原規劃 6 個學術 Skill，目前**只有 1 個已落地**（`seminar-helper`）。其餘 5 個是藍圖，尚未在 `~/.claude/skills/` 實際存在。
>
> 這個落差本身就是 [AGENTS A 階段（拆解）vs G 階段（生成）](../../shuangyun/concepts/AGENTS知識體系.md) 的真實案例：拆解容易，生成需要時間。

---

## 全景表

| 層 | Skill | 狀態 | 觸發 | 用途 |
|:---:|---|:---:|---|---|
| Brain | `nchu-advisor-huang` | 🔲 規劃 | — | 模擬黃盟元老師視角給論文建議 |
| Brain | `nchu-advisor-zhu`（建議新增）| 🔲 待建 | — | 模擬朱彥煒老師視角（演算法／ML 角度）|
| Hand | `journal-reviewer` | 🔲 規劃 | — | 審稿共用核心框架 |
| Hand | `journal-reviewer-router` | 🔲 規劃 | — | 多期刊審稿入口（路由到具體期刊規格）|
| Hand | `literature-verifier` | 🔲 規劃 | — | 文獻正確性驗證（防止引用錯誤）|
| Hand | `paper-reading-guide` | 🔲 規劃 | — | 論文導讀製作 |
| Hand | **`seminar-helper`** | **✅ 已實作（全域）** | `/seminar` | **9 階段專討端到端工作流** |
| Infra | `journal-chinese-forestry` | 🔲 規劃 | — | 林學季刊投稿格式 |

> **關鍵事實**：目前真正運作的學術 Skill 只有 `seminar-helper` 一個，撐起第三次專討的全部工作流。

---

## seminar-helper（已實作 / 全域）

**唯一已落地的學術 Skill**，內含 9 階段工作流、D-day 倒推時程、零幻覺核稿原則。

詳細方法論見 [9 階段專討工作流](9階段專討工作流.md)。

| 屬性 | 說明 |
|---|---|
| 位置 | `~/.claude/skills/seminar-helper/SKILL.md`（全域 Skill） |
| 觸發 | `/seminar`、`/seminar status`、`/seminar timeline <date>`、`/seminar review <file>` |
| 適用對象 | 鐘基啟（NCHU 生科所博二） |
| 萃取自 | 第三次專討（2026-05-13）實戰經驗 |
| 涵蓋階段 | 0 題目 → 1 文獻收集 → 2 核心精選 → 3 架構 → 4 講稿 → 5 PPT → 6 摘要 → 7 演練 → 8 上場 |

---

## 規劃中（尚未實作）

### nchu-advisor-huang（Brain，規劃中）

| 屬性 | 說明 |
|---|---|
| 角色 | 模擬黃盟元老師的視角 |
| 觸發（規劃） | 論文方向討論、研究設計、博士菜鳥日記反思 |
| 用途 | **像在跟老師討論一樣**——用老師可能的提問與視角審視自己的工作 |
| 萃取進度 | 訪談大綱已備（`建教授Skill_對談準備_鐘基啟.docx`），實際對談、知識萃取、Skill 編碼尚未進行 |

> 這是 [AGENTS A 階段「人物 → Brain 層 Skill」訪談式拆解](../../shuangyun/concepts/AGENTS知識體系.md) 的具體應用——拆的不是工作流，是**人的判斷邏輯**。

### nchu-advisor-zhu（Brain，建議新增）

朱彥煒老師（基資所）建議轉向「多源 Open Database 整合 → 森林數位孿生變數演算法」（GEDI L4B、ESA CCI Biomass、GFW Carbon Flux、FLUXNET2015、ICESat-2）——這是與黃老師生態生理視角不同的演算法／ML 視角，值得獨立成 Skill。

### journal-reviewer 系列（Hand，規劃中）

```
使用者送來文稿
   ↓
journal-reviewer-router → 判斷投哪個期刊
   ↓
路由到對應的期刊規格 Skill
   ↓
journal-chinese-forestry / 其他期刊 Skill
```

**journal-reviewer**（核心框架）：所有期刊審稿時的共通原則。
**journal-chinese-forestry**（林學季刊規格）：研究領域對應中興大學生命科學系的森林相關方向。

### literature-verifier（Hand，規劃中 — 急迫）

> AI 寫論文最大的問題：**引用編造的文獻**（hallucinated citations）。
> 第三次專討準備期遭遇 73% 作者名幻覺率（見 [零幻覺與文獻查證 SOP](零幻覺與文獻查證SOP.md)），但目前是用人工 + script_viewer 處理，沒有獨立 Skill。

literature-verifier 的工作（規劃）：
- 作者是否真實存在
- 期刊是否真實存在
- 引用內容是否與原文一致
- 串接 [script_viewer 模式](../../cross-domain/來源控制與script_viewer模式.md) 的 REFS 白名單

**用途**：博士論文嚴謹性的最後防線。**優先級高**——已有真實事故觸發。

### paper-reading-guide（Hand，規劃中）

把一篇論文轉成「導讀版本」——
- 摘要再簡化
- 重點圖表標注
- 與自己研究的關聯說明

**用途**：博士菜鳥日常閱讀文獻的加速器。

---

## 三層架構對照

```
🧠 Brain
  ├─ nchu-advisor-huang （想：黃老師會怎麼看？）       🔲
  └─ nchu-advisor-zhu   （想：朱老師會怎麼看？）       🔲

✋ Hand
  ├─ seminar-helper       （端到端：9 階段專討工作流）  ✅
  ├─ paper-reading-guide  （讀：把文獻變成自己的）      🔲
  ├─ literature-verifier  （查：引用是否正確）          🔲
  ├─ journal-reviewer     （審：核心審稿框架）          🔲
  └─ journal-reviewer-router （分：路由到具體期刊）     🔲

🔧 Infra
  └─ journal-chinese-forestry （格式：具體期刊投稿規格）🔲
```

> **依賴方向**：Brain → Hand → Infra（不可反向）
> 這個架構與 [shuangyun Skill OS 的三層架構](../../shuangyun/skills/双云技能索引.md) 一致。

---

## 实作優先順序（建議）

| 順序 | Skill | 理由 |
|:---:|---|---|
| 1 | `literature-verifier` | 真實事故（73% 幻覺）已發生，最急 |
| 2 | `nchu-advisor-huang` | 訪談大綱已備，下一步是執行知識萃取 |
| 3 | `paper-reading-guide` | 日常閱讀消化文獻的高頻需求 |
| 4 | `journal-reviewer` + `journal-reviewer-router` | 投稿準備期之前需要 |
| 5 | `journal-chinese-forestry` | 確定投稿目標後再做 |
| 6 | `nchu-advisor-zhu` | 共指意見納入後再考慮 |

---

## 与其他域 Skill 的關係

| 對應 | 關係 |
|---|---|
| `jacky-question-master`（跨域 Brain） | **學術版**：jacky-question-master 是蘇格拉底式審問通用版；nchu-advisor-huang 是學術專用版 |
| `jackybraincontrol`（跨域 Brain） | **學術品管**：jackybraincontrol 用 CFALSA 六維度做產出品管，學術文稿可用同框架 |
| [`seminar-helper`](#seminar-helper已實作--全域)（本域 Hand） | **唯一已實作**：撐起所有專討工作流 |

---

## 相關連結

- 域首頁 → [../中興博士索引.md](../中興博士索引.md)
- 跨域 Skill 區（含 nchu Skills 規劃）→ [shuangyun/skills/双云技能索引.md](../../shuangyun/skills/双云技能索引.md)
- 已實作的方法論 → [9 階段專討工作流](9階段專討工作流.md)
- 真實事故與修正 → [零幻覺與文獻查證 SOP](零幻覺與文獻查證SOP.md)
- AI 重組學術根基 → [AI重組學術根基.md](AI重組學術根基.md)
