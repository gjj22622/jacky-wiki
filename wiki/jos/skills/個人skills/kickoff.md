---
name: kickoff
description: 開工儀式 — 讀當前工作目錄的 ./todolist.md 與 auto-memory（MEMORY.md），brief 上次進度、卡點、優先動作，等候 Jacky 確認後接續工作。觸發時機：使用者說「開工」「上工」「繼續昨天」「接續上次」「接著做」「開始」「/開工」「/kickoff」。也支援 /kickoff 斜線指令。配對 skill：wrap-up（收工）。
trigger: /kickoff
---

# /kickoff — 開工儀式

讀上次 `wrap-up` 寫的 `./todolist.md`，brief Jacky 進度，等確認後直接接續工作。

> 配對：`wrap-up`（收工）寫此檔。

---

## 觸發後必做

### 1. 確認 cwd 並讀 todolist.md

- 用 `pwd` / `Get-Location` 確認當前工作目錄
- 用 Read 讀 `./todolist.md`

**若不存在**：

```
👋 開工 — 但當前目錄 <cwd> 沒有 todolist.md。

選一個：
1. 這是新專案 → 直接告訴我這次要做什麼，我們從零開始
2. 走錯目錄 → 切到對的目錄再說「開工」
3. 看全域看板 → 改到 ~ 開工（C:\Users\gjj22\todolist.md）
```

**不要**自己亂建一份空 todolist.md。

### 2. 讀 auto-memory 補 context

- 讀 `~/.claude/projects/C--Users-gjj22/memory/MEMORY.md`（這是索引）
- 索引中若有跟當前工作相關的 memory（看描述），讀對應 .md 檔

### 3. Brief 給 Jacky

從 todolist.md 抓重點，**5-8 行內**講完：

```
📥 開工 brief（上次收工：<時間戳，距今 X 天/小時>）

🎯 下次優先動作：
1. <第 1 件>
2. <第 2 件>（若有）

🔄 進行中卡點：<最重要的 1 個 / 或 N/A>

📌 環境：<工作目錄、port、重要決定 1 句>

👉 直接接續第 1 件？還是要改做別的？
```

### 4. 等 Jacky 確認

**不要**自動執行任何寫入動作。等 Jacky 回：
- 「接續」/「繼續」/「好」 → 開始做第 1 件優先動作
- 「改做 X」 → 動 X
- 「先給我看完整 todolist」 → 把 todolist.md 完整貼出來
- 「先聊 X」 → 進對話模式

---

## 安全紅線

- ❌ **不**自動寫 todolist.md（那是 wrap-up 的工作）
- ❌ **不**自動 commit / push / 改檔
- ❌ **不**幫 Jacky 跳過卡點（卡點要先確認原因再處理）
- ❌ **不**讀整個 cwd 的所有檔（讓 brief 簡潔；只讀 todolist.md + 相關 memory）
- ✅ Brief 完務必停下等確認，**不要連續動作**

---

## 邊界情況

| 情況 | 處理 |
|---|---|
| todolist.md 存在但 schema 異常（不是 wrap-up 寫的） | 直接整檔貼給 Jacky 看，問怎麼處理 |
| 上次收工時間 > 7 天前 | 在 brief 開頭提醒「距今已超過一週，環境可能有變」 |
| 「下次優先動作」是空的 | 列「進行中」與「待辦」前 3 項給 Jacky 選 |
| 多份 todolist.md（cwd 與家目錄都有） | 只讀 cwd 的，提醒 Jacky 家目錄也有一份 |
| Jacky 沒給 cwd 線索就說「開工」 | 從當前 cwd 找 todolist.md；找不到就走「不存在」流程 |
