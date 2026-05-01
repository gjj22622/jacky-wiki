---
title: jacky-omnimind Skill 建立——全人統整層
domain: ailab
updated: 2026-05-02
---

# 里程碑：jacky-omnimind Skill 建立

**日期**：2026-05-02
**事件類型**：Skill 生態系架構升級
**重要性**：高——改變了整個 Jacky AI 生態系的頂層結構

---

## 發生了什麼

把 jacky-wiki 的 92 頁知識圖譜打包成一個 Cowork Skill（`jacky-omnimind`），定位為 jackybraincommander 之上的「靈魂層」。

這是第一次有一個 Skill 真正「認識 Jacky 整個人」，而不只是負責某個業務域的路由或執行。

---

## 技術實作

- **Skill 名稱**：`jacky-omnimind`
- **格式**：Cowork `.skill` 檔案（SKILL.md + 4 個 reference 文件）
- **打包工具**：skill-creator 的 `package_skill.py`

### 四個 reference 的分工邏輯

| Reference | 職責 | 讀取時機 |
|---|---|---|
| `knowledge-graph.md` | 域拓樸、目錄結構、雙向關聯 | 問 wiki 結構、域定義時 |
| `jacky-identity.md` | 六個身分階段、六句回望、隱私邊界 | 問「Jacky 是誰」時 |
| `domain-summaries.md` | 每個域在做什麼、跨域連結語義 | 問跨域關係、某域具體內容時 |
| `skill-ecosystem.md` | 完整 Skill 地圖（含路由仲裁規則）| 問有哪些 Skill、怎麼路由時 |

**設計原則**：按需讀取，不要一次全讀。4 份 reference 加起來涵蓋 wiki 的骨架，但不複製 wiki 的所有細節——需要細節時直接讀 wiki 對應頁面。

---

## 架構意義

### 之前的問題

jackybraincommander 只能路由（聽需求→分派 Skill），無法回答「双云跟 TBSA 的人才循環是什麼邏輯」這類需要跨域整合理解的問題。每個 Skill 都只知道自己的域，沒有人知道全局。

### 解決方式

```
jacky-omnimind（靈魂層）← 知道所有域、能合成跨域洞察
    │
    └── jackybraincommander（路由層）← 任務模糊時先到這裡
            │
            └── 各 Brain/Hand Skill（執行層）
```

omnimind 是第一個真正「擁有 Jacky 完整知識圖譜」的 Skill。它能：
- 回答「Jacky 是誰」（讀 jacky-identity）
- 說明跨域關係（讀 domain-summaries）
- 導覽 wiki（讀 knowledge-graph）
- 查詢 Skill 生態系（讀 skill-ecosystem）
- 更新 wiki 頁面
- 路由給對應 Skill（任務明確時直接跳過 commander）

---

## 與 ailab 的關係

這個 Skill 本身也是 ailab 實踐的成果——用 skill-creator 的打包機制，把 jacky-wiki 這個「知識結構」轉成「可調用的 AI 工具」。

**三層萃取漏斗的應用**：
- wiki（已結晶的知識）→ reference 文件（抽取骨架）→ Skill（可調用形式）

---

## 後續可能的演化

- jacky-omnimind 版本升級時序：wiki 有重大域更新時同步更新 reference
- 未來可加入 `yinian` 域（目前 0 頁，待建）
- Jwood 專屬 skill 建立後，更新 skill-ecosystem.md 的「待建 Skill」清單
