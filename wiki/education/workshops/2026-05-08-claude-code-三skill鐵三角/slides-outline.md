---
title: 三 skill 鐵三角簡報大綱
domain: education
visibility: team
min_tier: L2
updated: 2026-05-08
audience: 內部團隊
duration: 約 15 張投影片，10-12 分鐘講完
tags: claude-code, skill, slides
---

# 三 skill 鐵三角簡報大綱

> 純文字大綱。後續若要 .pptx，餵進 huashu-design 並指定設計風格。

---

## Slide 1 — 封面

- 標題：Claude Code 三 skill 鐵三角
- 副標題：把日常工作儀式化的 wrap-up / kickoff / internal-training
- 講者：Jacky
- 日期：2026-05-08
- 對象：內部團隊（10 分鐘版本）

---

## Slide 2 — 三個工作痛點

- 跨對話接軌成本：「上次做到哪？卡在哪？」
- 個人 vs 對外混淆：採坑點該寫給誰？
- 跨機同步斷裂：A 機寫的 B 機看不到

---

## Slide 3 — 解法：三 skill 鐵三角

- `wrap-up`（收工）→ 凍結進度到 `./todolist.md`
- `kickoff`（開工）→ 讀 todolist brief 接續
- `internal-training`（對外教材）→ 寫進 wiki + push GitHub

---

## Slide 4 — 什麼是 Claude Code skill？

- 一份 `SKILL.md` 檔在 `~/.claude/skills/<name>/`
- 兩種觸發方式
  - Slash command（`/wrap-up`）
  - 自然語言匹配（「收工」）
- frontmatter 三大欄位：`name` / `description` / `trigger`

---

## Slide 5 — wrap-up（收工）核心

- 寫到 **cwd** 的 `./todolist.md`（不是家目錄）
- 6 大區塊：下次優先動作 / 進行中 / 待辦 / 已完成 / 關鍵 context / 歷史快照
- 沒值得記就跳過 memory 更新
- **不**自動 git（todolist 是個人進度）

---

## Slide 6 — kickoff（開工）核心

- 讀 `./todolist.md` + auto-memory
- Brief 5-8 行就停下，**等確認**才動工
- 不要 AI 越權替你決定接續第幾件事

---

## Slide 7 — 為什麼分兩個 skill 不合一？

- 觸發詞時機相反，混在一起 description 變模糊
- 下班 / 上班是兩個儀式，分開更直觀
- 各自心智模型乾淨

---

## Slide 8 — internal-training（對外教材）核心

- 對象：**別人**（同事 / 學員 / 客戶）
- 寫到 `jacky-wiki/wiki/education/<分類>/`
- 三種落腳：workshops / playbooks / pitfalls
- 自動 `git pull --rebase → add → commit → push`

---

## Slide 9 — 為什麼不寫在 ailab？

- ailab：個人水庫，捕原始事件，不 push
- education：對外成品，已驗證，要 push
- 對話太原始 → 拒寫教材，引導改走 /ailab

> 兩 skill 共存但分工，**education 沒有 inbox**

---

## Slide 10 — 配合運作 pipeline

```
[早上] /開工 → 讀 todolist → brief → 接續
[白天] 工作中 → /ailab capture（單一事件）
[晚上] 分流：
  ├ 「給自己接續」→ /收工
  ├ 「捕單一事件」→ /ailab
  └ 「整理成可分享教材」→ /internal-training → push GitHub
```

---

## Slide 11 — 採坑點 #1-3（基礎）

- 中文 slash command parser 不穩 → 主 trigger 用英文
- cwd vs jacky-wiki 混淆 → 紅線明示
- `git add -A` 掃到 `.obsidian/graph.json` → 永遠具名 add

---

## Slide 12 — 採坑點 #4-6（設計分歧）

- education 想做 inbox → 重複職責，砍掉
- 忘記 `git pull --rebase` → 多機 push 衝突
- 自動 commit 時機錯誤 → wrap-up 不碰 git，只 internal-training 動

---

## Slide 13 — 自己設計 skill 5 大要點

1. description 把自然語言觸發詞寫滿
2. 路徑解析多機 fallback（環境變數 → ~ → Windows → Ubuntu）
3. 工作流程編號嚴格依序
4. 安全紅線清單明示
5. 列邊界情況表

---

## Slide 14 — 跨機部署

- canonical 主版可放 `jacky-wiki/wiki/<域>/skill/SKILL.md`（git 管）
- 各機執行版 `~/.claude/skills/<name>/SKILL.md`（symlink 或 copy）
- 觸發 = 在每台機台 Claude Code 啟動時自動讀

---

## Slide 15 — Q&A / 行動

- 你想做的下一個 skill 是？
- 觸發詞會是什麼？
- 落腳在 cwd / jacky-wiki / 第三方 repo？
- 需要 git push 嗎？

> 抄三 skill 的 frontmatter 開始改起，最快 30 分鐘出第一版。
