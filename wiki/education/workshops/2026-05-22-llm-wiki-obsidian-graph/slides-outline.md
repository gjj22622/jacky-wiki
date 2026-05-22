---
title: 投影片大綱 — 如何製作自己的 LLM Wiki
domain: education
updated: 2026-05-22
audience: 內部團隊
duration: 60 分鐘（30 分概念 + 30 分動手）
tags: AI, wiki, Obsidian, slides
---

# 投影片大綱 — 如何製作自己的 LLM Wiki

> 配對主教材：[[README]]
> 全 15 張，60 分鐘節奏：Slide 1-5 概念（15 分）→ Slide 6-10 動手（30 分）→ Slide 11-15 採坑+延伸+QA+收尾（15 分）。

---

## Slide 1 · 開場 — 為什麼今天聽

- 60 分鐘後你會帶走「跑得動的 wiki 骨架 + Obsidian graph 畫面」回家
- 不是看懂概念，是**真的看到自己第一張知識圖譜亮起來**
- 對象：同事、夥伴、AI 新手皆可
- 不在範圍：Skill 設計、接 Claude Code（那是進階班）
- 為什麼是今天：手冊 + 簡報 + 3D 圖譜可視化 + ailab 4 個 concept 都已就位

---

## Slide 2 · 先備知識

- 必備：git 基本操作（`clone / add / commit / push`）
- 必備：Markdown 基本語法（標題、清單、連結）
- 必備：桌面軟體安裝權限（裝 Obsidian / VS Code）
- 不需要：任何 AI 經驗、Obsidian 經驗、程式背景
- 整套是 Markdown + YAML，零程式

---

## Slide 3 · Wiki vs 一般筆記（為什麼要做 LLM wiki）

- 一般筆記：散落、單向、無 schema → LLM 讀不懂
- Wiki：**結構化 + 可導航 + 可成長** → LLM 看得懂
- 三件事決定一份筆記是不是 wiki：frontmatter / 雙向連結 / 域定位
- LLM 原生格式 = Markdown + git，不是 Notion 內部結構
- 30 秒同事版定義：「散落 → 結構化」這個躍遷

---

## Slide 4 · Jacky Wiki 7 個域案例（上）

- 看一個成熟版本長什麼樣（125+ 頁、6 個月演化）
- ⭐ shuangyun（30 頁）：双云行銷、品牌、AI Agent 體系
- ⭐ jwood（9 頁）：基的木藝、綠檀按摩棒、YT 自動化
- ⭐ ailab（20 頁）：AI 實踐活知識結晶層
- jlife（9 頁）：人生回憶錄、前傳脈絡
- 每個域有自己的「索引頁」+ concepts / cases / sop 子結構

---

## Slide 5 · Jacky Wiki 7 個域案例（下）+ 跨域

- tbsa（14 頁）：學習行銷起點、SOSTAC、5 大表單
- nchu（12 頁）：中興博士、9 階段專討工作流
- education（19 頁）：對外教材成品產線
- cross-domain（6 頁）：跨域素材、視覺化實驗、3D 圖譜
- 域的拓樸：前傳 jlife ↔ 各現況域**雙向連結**（CLAUDE.md §跨域寫作原則）
- demo：切到 3D 知識圖譜可視化（wow factor 在這）

---

## Slide 6 · Step 1-2 概念 — 為什麼是 wiki + 定義 5-8 個域

- Step 1：手冊 §1-2 兩節 5 分鐘看完，能 30 秒講「為什麼要做 LLM wiki」
- Step 2：拿白紙寫下 5-8 個域名 + 每個一句話定位
- 三個問題引導：工作/生活/學習線幾條？歷程 vs 現況？哪些方法論多處用？
- ⚠️ 不要照抄 Jacky 的 7 域 — 你不是 Jacky
- 白紙手寫**不要打字**，防止過早 over-engineer

---

## Slide 7 · Step 3-4 動手 — 建 repo + CLAUDE.md

- Step 3：`mkdir my-wiki && git init` → 建域骨架 → `gh repo create --private --push`
- 每個域建一個索引頁（檔名用中文：`<域中文名>索引.md`）
- Step 4：根目錄建 `CLAUDE.md`，貼最小模板（domain 列表 / frontmatter 規範 / 檔名規則 / commit 格式）
- CLAUDE.md = wiki 的「憲法」，LLM 看到就懂規矩
- 預期：GitHub 上有 private repo，5-8 個域資料夾打開能看到

---

## Slide 8 · Step 5 寫第 1 頁 — frontmatter + 雙向連結

- 每頁必含 frontmatter（YAML）：`title / domain / updated`
- 內部頁面互連語法：`[[檔名]]` 或 `[[資料夾/檔名]]`，**不用 .md 副檔名**
- 外部 URL 用 `[文字](url)`
- 頁末必加「相關」區塊，至少連 2 個其他頁面
- 寫完 commit + push，這頁才真的「存在」於 wiki

---

## Slide 9 · Step 6 安裝 Obsidian + 第一張 graph 亮起

- 下載 [obsidian.md](https://obsidian.md/)（macOS/Windows/Linux 免費）
- 「Open folder as vault」→ 選 `my-wiki` 資料夾
- 左下角 Graph view 圖示 → 你的第一張圖譜出現
- 🎯 **這個 workshop 的 aha moment 在這一張 slide**
- 講師示範時切到 Jacky Wiki 3D 圖譜可視化，讓學員看「成熟版本」對比

---

## Slide 10 · Step 7-8 連結密度 + Graph 分組配色

- Step 7：在不同域各寫 1-2 頁，每頁至少一個跨域 `[[..]]` 雙向連結
- 1 頁沒圖譜，5 頁才開始有「網」的形狀
- 看到孤兒節點（無連線圓點）→ 回去把它連上
- Step 8：Graph view 右上 → Groups → Query `path:wiki/域1/` → 套色
- 每個域配一色（藍/綠/黃/紅/紫），跨域連線一眼看出

---

## Slide 11 · 5 個採坑點濃縮

- #1 第一週塞 50 頁但 0 連結 → 強迫頁末「相關」區塊至少 2 個雙向
- #2 用 `[文字](path.md)` 不畫進 graph → 內部一律 `[[檔名]]`
- #3 把 `.obsidian/graph.json` 推 git → `.gitignore` 擋掉 workspace*.json / graph.json / cache
- #4 所有頁塞一個域 → 寧可 5 域寬一點，也不要 1 域塞所有
- #5 「每天 review inbox」變心理負擔 → 依事件成熟度判斷，不依時間

---

## Slide 12 · 延伸閱讀 — wiki 內互聯

- 整套 schema 完整版 → [[wiki知識圖譜建置手冊]] §STEP 1-6
- 給管理層的簡報版 → [[wiki知識圖譜建置簡報]]
- 3D 知識圖譜可視化 demo → `cross-domain/visualizations/jackywiki-3d-knowledge-graph.html`
- 跨對話/跨模型收事件 → [[ailab/concepts/實踐捕手協定]]
- 三層萃取漏斗（inbox → 結晶） → [[ailab/concepts/三層萃取漏斗]]

---

## Slide 13 · 進階學習路徑

- AI 工具觀（為什麼選這套工具棧） → [[ailab/concepts/AI工具觀]]
- 跨機部署（多台電腦同步 wiki） → [[ailab/concepts/跨機與跨模型部署]]
- 演化元方法（從實踐反推方法論） → [[ailab/concepts/演化元方法]]
- 模型選擇心法（Opus/Sonnet/Haiku） → [[ailab/tools/模型選擇心法]]
- 走完延伸閱讀 → 你能設計自己的 Skill（進階班的入口）

---

## Slide 14 · QA 預備兩個高頻問題

- Q：「Notion 不就好了嗎？」
  - A：可以，但 LLM 讀不懂 Notion 內部結構；Markdown + git 才是 LLM 原生格式
  - Notion 沒辦法做雙向 wiki-link graph、沒辦法用 Claude Code 直接讀
- Q：「VS Code 也可以嗎？」
  - A：可以，wiki 是 Markdown + git，不綁工具
  - Obsidian 強在 graph view 視覺化；VS Code 強在開發整合
  - Jacky 平常兩個都開：Obsidian 看 graph，VS Code 寫程式時順手改 wiki

---

## Slide 15 · 30 秒收尾 — 3 個關鍵原則

- 原則 1：**每頁有 frontmatter** — LLM 才看得懂
- 原則 2：**每頁有雙向連結** — 圖譜才有邊
- 原則 3：**每個域有清楚定位** — 找得到、跨域也連得到
- Wiki 不是文件系統，是「可被呼叫的知識形式」
- Obsidian 是讓你「看到」這張圖的工具，不是 wiki 本身
- 把 Obsidian 換成 VS Code / GitHub 網頁 / Claude Code，wiki 一樣跑得動
