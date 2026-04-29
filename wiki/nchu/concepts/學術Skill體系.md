---
title: nchu 學術 Skill 體系（6 個）
domain: nchu
updated: 2026-04-29
---

# nchu 學術 Skill 體系（6 個）

> 6 個學術導向的 Skill，分布在 Jacky 的 Claude Skill 體系中。
> 來源：[shuangyun/AGENTS方法論落地.md §10](../../shuangyun/concepts/AGENTS方法論落地.md) + [shuangyun/skills 跨域 Skill 區](../../shuangyun/skills/双云技能索引.md)

---

## 6 個 Skill 一覽

| 層 | Skill | 用途 |
|:---:|---|---|
| Brain | `nchu-advisor-huang` | 模擬黃盟元老師視角給論文建議 |
| Hand | `journal-reviewer` | 審稿共用核心框架 |
| Hand | `journal-reviewer-router` | 多期刊審稿入口（路由到具體期刊規格） |
| Hand | `literature-verifier` | 文獻正確性驗證（防止引用錯誤） |
| Hand | `paper-reading-guide` | 論文導讀製作 |
| Infra | `journal-chinese-forestry` | 林學季刊投稿格式 |

---

## nchu-advisor-huang（模擬指導教授）

| 屬性 | 說明 |
|---|---|
| 層 | Brain |
| 角色 | 模擬黃盟元老師的視角 |
| 觸發 | 論文方向討論、研究設計、博士菜鳥日記反思 |
| 用途 | **像在跟老師討論一樣**——用老師可能的提問與視角審視自己的工作 |

> 這是 Jacky 在沒有實際面對面時，用 AI 預演與老師對話的工具。類似 [shuangyun 的 jacky-question-master](../../shuangyun/skills/双云技能索引.md)（蘇格拉底式審問）的學術版。

---

## journal-reviewer 系列（審稿框架）

### journal-reviewer（核心框架）

審稿的共用核心邏輯。所有期刊審稿時的共通原則寫在這裡。

### journal-reviewer-router（多期刊路由）

```
使用者送來文稿 →
journal-reviewer-router →
判斷投哪個期刊 →
路由到對應的期刊規格 Skill →
journal-chinese-forestry / 其他期刊 Skill
```

### journal-chinese-forestry（具體期刊規格）

林學季刊投稿格式。**這個 Skill 名稱暗示研究領域與林業／生態相關**——對應中興大學生命科學系的研究方向。

---

## literature-verifier（文獻正確性驗證）

> AI 寫論文最大的問題：**引用編造的文獻**（hallucinated citations）。

literature-verifier 的工作是檢查每一篇引用：
- 作者是否真實存在
- 期刊是否真實存在
- 引用內容是否與原文一致

**用途**：博士論文嚴謹性的最後防線。

---

## paper-reading-guide（論文導讀製作）

把一篇論文轉成「導讀版本」——
- 摘要再簡化
- 重點圖表標注
- 與自己研究的關聯說明

**用途**：博士菜鳥日常閱讀文獻的加速器。

---

## 三層架構對照

```
🧠 Brain
  └─ nchu-advisor-huang （想：老師會怎麼看？）

✋ Hand
  ├─ paper-reading-guide （讀：把文獻變成自己的）
  ├─ literature-verifier （查：引用是否正確）
  ├─ journal-reviewer    （審：核心審稿框架）
  └─ journal-reviewer-router （分：路由到具體期刊）

🔧 Infra
  └─ journal-chinese-forestry （格式：具體期刊投稿規格）
```

> **依賴方向**：Brain → Hand → Infra（不可反向）
> 這個架構與 [shuangyun Skill OS 的三層架構](../../shuangyun/skills/双云技能索引.md) 一致。

---

## 与其他域 Skill 的關係

| 對應 | 關係 |
|---|---|
| `jacky-question-master`（跨域 Brain） | **學術版**：jacky-question-master 是蘇格拉底式審問通用版；nchu-advisor-huang 是學術專用版 |
| `jackybraincontrol`（跨域 Brain） | **學術品管**：jackybraincontrol 用 CFALSA 六維度做產出品管，學術文稿可用同框架 |

---

## 相關連結

- 域首頁 → [../中興博士索引.md](../中興博士索引.md)
- 跨域 Skill 區（含 nchu Skills）→ [shuangyun/skills/双云技能索引.md](../../shuangyun/skills/双云技能索引.md)
- AI 重組學術根基 → [AI重組學術根基.md](AI重組學術根基.md)
