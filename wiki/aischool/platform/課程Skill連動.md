---
title: AI School 課程↔Skill 連動
domain: aischool
updated: 2026-06-23
---

# 課程↔Skill 連動

> 機制：每課的實作可以直接交一個對應的 Skill。**single source** ＝ `skills.json`，由 `scripts/build-skills-json.js` 維護；`build-course-json` 會把對應 skill 燒進每課的 `practice` 欄位。

## 資料流

```
skills.json （課↔Skill 對照單一真相）
      │  build-skills-json.js
      ▼
build-course-json.js  →  把對應 skill 寫進 course.json 每課的 practice[]
      ▼
app.js  →  該課的「實作區塊」渲染（trigger / 安裝 / 用法 / 範例 / 交付物）
```

## 已連動的 Skill

| skill | trigger | 章節 | 課 | 類別 |
|---|---|---|---|---|
| 迴圈 | `/迴圈` | L6 | L6-07 | 執行 loop |

每筆含：purpose（用途）／install（安裝）／usage（用法）／example（範例）／deliverable（交付物）／sourceLink（canonical 路徑）。

## 新增一個課程 Skill 的步驟

1. 在 `skills.json` 加一筆（id / name / trigger / chapter / lessons / purpose / install / usage / example / deliverable / sourceLink）
2. 跑 `build-skills-json.js` → `build-course-json.js` 重建 `course.json`
3. 對應 skill 的 canonical 主版放在 `jacky-wiki/wiki/<域>/skill/<name>/SKILL.md`
4. 學員在自己的 Claude Code 各裝一次

> 對應記憶：[[project-aischool-l6-course-skill-link]]（skills.json→build 燒 practice→app.js 實作區塊）。

[← 平台架構](平台架構.md)｜[← AI School 索引](../AI School索引.md)
