---
name: wrap-up
description: 收工儀式 — 把當前對話進度凍結到 ./todolist.md（cwd），並按需更新 auto-memory（MEMORY.md），產出下次開工 brief，讓下次對話無縫接軌。觸發時機：使用者說「收工」「今天做到這」「暫時停在這」「先停在這」「明天再繼續」「下班」「先停一下」「/收工」「/wrap-up」。也支援 /wrap-up 斜線指令。配對 skill：kickoff（開工）。
trigger: /wrap-up
---

# /wrap-up — 收工儀式

把當下對話的進度、卡點、決定、環境 context 一次凍結成「進度看板」，寫到 cwd 的 `./todolist.md`，並按需更新 auto-memory，讓下次開工時可以一句「開工」就接軌。

> 配對：`kickoff`（開工）讀此檔接續工作。

---

## 觸發後必做

### 1. 確認 cwd

`./todolist.md` 寫到**當前工作目錄**（cwd），不是寫到 `~/`。先用 `pwd`（PowerShell 用 `Get-Location`）確認 cwd，並在回報時告知 Jacky 寫到哪裡。

### 2. 盤點當前對話

從整段對話脈絡歸納以下五類，**不要漏抓**：

| 類別 | 內容 |
|---|---|
| ✅ **今日完成** | 這次對話實際做完、可交付的事 |
| 🔄 **進行中（含卡點）** | 還沒做完的、卡在哪、為什麼卡 |
| ⏳ **待辦** | 還沒動但要記住的下一步 |
| 🎯 **下次優先動作** | 從上述抓 1-3 件最該先做的，明確到「下次開工第一件事」 |
| 📌 **關鍵 context** | 工作目錄、執行中服務 / port / pid、env 變數、本次重要決定、外部資源連結（PR、issue、Notion）、不要忘記的事 |

不確定就**問 Jacky 一次**（一次集中問完，不要分多輪）。

### 3. 讀現有 todolist.md（若存在）

- 用 Read 讀 `./todolist.md`
- 保留「📅 歷史快照」區塊
- 把上次的「主看板」內容**整段**搬進歷史快照，加上時間戳
- 歷史快照只保留**最近 3 次**，超過就 rotate 掉最舊那筆

### 4. 寫 ./todolist.md

用 Write 覆寫 `./todolist.md`，**嚴格依此 schema**：

```markdown
# 進度看板（最後更新：YYYY-MM-DD HH:MM）

> 工作目錄：<cwd 絕對路徑>

## 🚀 下次開工指令

新對話貼上 `/開工` 或 `/kickoff`，或自然語言說「開工，接續昨天進度」，Claude 會自動讀此檔 brief。

## 🎯 下次優先動作（最重要的 1-3 件）

- [ ] <最該先做的第 1 件事，要具體可執行>
- [ ] <第 2 件>
- [ ] <第 3 件>

## 🔄 進行中（含卡點）

- [ ] <事項> — 卡在 <原因>

## ⏳ 待辦

- [ ] <事項>

## ✅ 今日完成

- [x] <事項>

## 📌 關鍵 context

- 工作目錄：<cwd>
- 執行中服務 / port：<或 N/A>
- 重要決定：<本次做的設計／路線決定>
- 環境 / env：<重要的環境變數、版本、依賴>
- 別忘了：<下次要記得的細節>
- 外部連結：<PR / Issue / Notion>

## 📅 歷史快照（最近 3 次）

<details>
<summary>YYYY-MM-DD HH:MM 收工</summary>

[上一次的主看板內容整段貼這]

</details>
```

**規則**：
- 沒有內容的區塊保留標題但寫 `（無）`，不要刪標題（保持結構穩定）
- 時間用 24 小時制 `YYYY-MM-DD HH:MM`
- 工作目錄寫絕對路徑

### 5. 評估是否更新 auto-memory（按需）

讀 `~/.claude/projects/C--Users-gjj22/memory/MEMORY.md` 看是否要追記。**不強制寫**，只在以下情況才寫：

| 觸發 | 寫到 |
|---|---|
| 學到 Jacky 新偏好 / 新規則 | `feedback_*.md` + MEMORY.md 索引 |
| 跨對話有用的專案決定 / 動機 / 背景 | `project_*.md` + MEMORY.md 索引 |
| 學到外部資源 / dashboard / repo 的位置 | `reference_*.md` + MEMORY.md 索引 |
| 沒值得記 | **跳過**，不要硬寫 |

寫法嚴守既有規範（參考 `feedback_language.md` frontmatter 格式）：

```yaml
---
name: <記憶名稱>
description: <一句話描述，未來判斷相關性用，要具體>
type: <user / feedback / project / reference>
---

<內容>
```

`MEMORY.md` 索引行格式：`- [標題](檔名.md) — 一句話 hook`

### 6. 回報 Jacky

最後給簡短報告（5-8 行）：

```
📋 收工完成
- todolist.md 寫到：<cwd 絕對路徑>
- 抓到 X 件進行中、Y 件待辦、Z 件完成
- 下次優先：<第 1 件事>
- Memory 更新：<有更新哪幾筆 / 無>

下次開工：新對話打 /開工 或說「開工」
```

---

## 安全紅線

- ❌ **不**自動 `git commit` / `git push`（即使 cwd 是 git repo）
- ❌ **不**刪歷史快照（最多 rotate 最舊 1 筆）
- ❌ **不**另建 `memory.md`，沿用既有 `~/.claude/projects/C--Users-gjj22/memory/` 系統
- ❌ **不**修改 `~/.claude/CLAUDE.md` 或 `~/CLAUDE.md`
- ❌ **不**依賴中文 slash command parser（中文觸發走自然語言匹配）
- ✅ 寫檔前若 cwd 是 `C:\Windows`、`C:\Program Files` 之類系統目錄，**先警告 Jacky** 並建議 cd 到專案目錄

---

## 邊界情況

| 情況 | 處理 |
|---|---|
| cwd 是 `C:\Users\gjj22`（家目錄） | 照寫，但提醒 Jacky 這是全域 todolist |
| `./todolist.md` 已存在但不是此 schema | 整檔備份成 `./todolist.backup.<timestamp>.md`，再覆寫新版 |
| 對話太短、沒實際進度 | 仍寫檔，但「今日完成」寫「（本次無實質進度）」 |
| Jacky 中途打斷說「先不要寫 memory」 | 跳過 step 5，仍寫 todolist.md |
