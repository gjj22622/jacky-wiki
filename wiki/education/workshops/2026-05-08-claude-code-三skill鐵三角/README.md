---
title: Claude Code 三 skill 鐵三角設計（wrap-up / kickoff / internal-training）
domain: education
visibility: team
min_tier: L1
updated: 2026-05-08
audience: 內部團隊
prerequisite: 用過 Claude Code、知道 cwd 概念、git 基礎
duration: 15 分鐘
tags: claude-code, skill, wrap-up, kickoff, internal-training, auto-memory, jacky-wiki
source_chat: 2026-05-08 與 Claude Opus 4.7 設計三 skill 的對話（從需求到 push GitHub 完整一輪）
---

# Claude Code 三 skill 鐵三角設計

> 把日常工作儀式化的三個 Claude Code skill：**收工**、**開工**、**對外教材**。
> 解決「跨對話接軌成本」+「個人實踐 vs 對外分享」混在一起的問題。

---

## 🎯 學習目標

讀完這份教材你會：

1. 理解 Claude Code skill 是什麼、何時觸發、SKILL.md 怎麼寫
2. 看懂三 skill 鐵三角各自職責、互通邏輯、灰區判斷
3. 能自己設計類似 skill（觸發詞、流程、安全紅線、跨機部署）

---

## 📦 先備知識

- 用過 Claude Code CLI（`claude` 指令）
- 知道 **cwd**（當前工作目錄）的意義
- git `commit` / `push` 基本操作

---

## 章 1. Claude Code skill 是什麼？

**Skill = 一份 `SKILL.md` 檔，定義一個觸發詞 + 一段標準工作流程。**

放在 `~/.claude/skills/<skill-name>/SKILL.md`，Claude Code 啟動時會自動載入。觸發機制有兩種：

| 觸發方式 | 例子 | 觸發詞寫在 |
|---|---|---|
| Slash command | `/wrap-up`、`/kickoff` | frontmatter 的 `trigger` 欄位 |
| 自然語言匹配 | 「收工」「開工」 | frontmatter 的 `description` 欄位 |

**SKILL.md 最小骨架**：

```yaml
---
name: <skill-name>
description: <一句話 + 觸發詞清單，給 Claude 自然語言匹配用>
trigger: /<skill-name>
---

# /<skill-name> — <標題>

<觸發後必做的步驟，越具體越好>
```

> 📚 延伸閱讀：[ailab Skill 主版](../../../ailab/skill/SKILL.md)（jacky-wiki 已實證 1-2 個月的 skill 範本）

---

## 章 2. 為什麼要設計三 skill 鐵三角？

Jacky 在不同對話中累積大量工作，常遇到三個痛點：

| 痛點 | 場景 |
|---|---|
| **接軌成本高** | 隔天 / 換對話 → 「上次做到哪？卡在哪？該先做什麼？」 |
| **個人 vs 對外混淆** | 採坑點到底是寫給「未來的我」還是「給同事看」？格式語氣不同 |
| **跨機同步斷裂** | A 機台寫的東西，B 機台不知道，要手動拷貝 |

對應三 skill：

| Skill | 解決哪個痛點 |
|---|---|
| `wrap-up`（收工） | 接軌成本：當下凍結進度到 `./todolist.md` |
| `kickoff`（開工） | 接軌成本：新對話讀 todolist 立刻 brief |
| `internal-training`（對外教材） | 個人 vs 對外混淆 + 跨機同步：寫進 jacky-wiki 並 push GitHub |

**三者一起跑，工作流程從零碎變儀式化。**

---

## 章 3. wrap-up（收工）— 設計邏輯

**核心**：對話結束前，把進度凍結成下次能直接接軌的「進度看板」。

### 為什麼寫到 cwd？

不寫到家目錄、不寫到 jacky-wiki，而是**當前工作目錄** `./todolist.md`。

理由：每個專案都有自己的進度，散在不同目錄合理；專案內也方便 `git add` 跟著版本走（如果該專案有 git）。

### 進度看板 6 大區塊

| 區塊 | 用途 |
|---|---|
| 🚀 下次開工指令 | 告訴你（或下次的 Claude）打 `/開工` 即可 |
| 🎯 下次優先動作（1-3 件） | 最該先做的事，明確到「第一件事」 |
| 🔄 進行中（含卡點） | 還沒做完的、卡在哪、為什麼卡 |
| ⏳ 待辦 | 還沒動的下一步 |
| ✅ 今日完成 | 這次對話實際交付的事 |
| 📌 關鍵 context | cwd、port、env、決定、外部連結 |
| 📅 歷史快照 | 折疊區塊，保留最近 3 次收工 |

### 設計重點

- **沒值得記就跳過 memory 更新**（auto-memory 系統不強制）
- **不自動 git commit / push**（todolist.md 是個人進度，不該污染 commit log）
- **歷史快照 rotate**（保留最近 3 次，超過刪最舊那筆）

> 📚 延伸閱讀：[auto-memory 系統](../../../ailab/tools/auto-memory系統.md)（wrap-up 用的記憶寫入機制）

---

## 章 4. kickoff（開工）— 設計邏輯

**核心**：新對話一句「開工」即可讓 Claude 讀 todolist + memory，brief 進度，等確認後接續。

### 為什麼分兩個 skill 而不是一個？

理論上 wrap-up 與 kickoff 可以合成「一個 skill 兩個 mode」。但拆開有兩個好處：

1. **觸發詞反直覺合在一起**：「收工」跟「開工」的時機完全相反，混在一個 skill 的 description 會讓 Claude 自然語言匹配變模糊
2. **配對心智模型**：下班 / 上班是兩個儀式，分成兩個 skill 對使用者更直觀

### kickoff 的「不自動執行」原則

讀完 todolist 後，**brief 5-8 行就停下**等使用者確認，不直接動工。

理由：
- 上次的「下次優先動作」可能已經過時
- 使用者今天可能想做別的
- 卡點可能要先確認原因再處理

讓人決定下一步，不要 AI 越權。

### 邊界：todolist.md 不存在怎麼辦？

不要自己亂建一份空 todolist.md。改提示：

```
👋 開工 — 但當前目錄 <cwd> 沒有 todolist.md。
1. 新專案？告訴我這次要做什麼
2. 走錯目錄？切到對的目錄
3. 看全域看板？改到 ~ 開工
```

---

## 章 5. internal-training（對外教材）— 設計邏輯

**核心**：把對話精華 + 既有 wiki 結晶 → 整理成可分享教材 → 存進 `jacky-wiki/wiki/education/` → `git push` 跨機同步。

### 為什麼不是寫在 ailab？（重要設計分歧）

ailab 已經能捕對話事件、做 session 總結。為何要再開一個 education 域？

| 比較 | ailab | education |
|---|---|---|
| 對象 | **未來的我** | **別人** |
| 內容狀態 | 可未成熟、繞路、失敗 | 已驗證、可分享 |
| 語氣 | 日記式 | 學員視角 |
| 隱私 | 個人水庫 | 對外無隱私 |
| Git | 不自動 push | **預設**自動 push |
| Inbox | 有（事件樞紐） | **無** |

**結論**：兩個 skill **共存但分工**。education 不重複做事件捕手，只負責「把已知的東西整理成對外成品」。

### 三個落腳分類

| 觸發詞 | 模式 | 落腳 |
|---|---|---|
| 「整理成教材／內訓／教育訓練分享」 | Workshop | `workshops/<日期>-<slug>/` 含 README + slides-outline |
| 「整理工作流程／SOP／步驟」 | Playbook | `playbooks/<slug>.md` |
| 「採坑點／踩雷／失敗教訓」 | Pitfalls | `pitfalls/<topic>.md`（可累加） |

### 拒寫機制

對話內容**還太原始、實驗中、未驗證** → skill 主動建議「先走 `/ailab capture` 沉澱，等成熟再來做教材」，**不硬寫**。

### Git 同步邏輯

寫完即執行（在 `jacky-wiki` repo 內）：

```
git status                    # 確認 staged 乾淨
git pull --rebase origin main # 多機協作必做（jacky-wiki/CLAUDE.md 規範）
git add <具名檔案>            # 不用 -A
git commit -m "feat(wiki): ..."
git push origin main
```

其他工作機台 `git -C ~/jacky-wiki pull` 即同步。

> 📚 延伸閱讀：[跨機與跨模型部署](../../../ailab/concepts/跨機與跨模型部署.md)（多機 skill 部署的完整模式）

---

## 章 6. 三者如何配合運作（pipeline）

```
[早上開工]
   ↓
/開工 → 讀 ./todolist.md → brief 給我 → 等確認 → 接續工作
   ↓
[白天工作中]
   ↓ （遇到值得記的單一事件）
   ↓ /ailab capture → 進 jacky-wiki/ailab/inbox/
   ↓
[晚上收工 / 該分享了]
   ↓
分流：
  ├─ 「整理進度給自己接續」 → /收工 → 寫 ./todolist.md
  ├─ 「捕單一事件」 → /ailab → 進 ailab/inbox
  └─ 「整理成可分享的教材」 → /internal-training → 進 education + push GitHub
```

**互相不重複職責**，是「鐵三角」的關鍵。

---

## 章 7. 自己設計類似 skill 的 5 大要點

如果你想自己做一個新 skill（例如「客戶簡報自動產出」「會議紀錄整理」），照這 5 點：

### 1. Frontmatter 的 description 要把自然語言觸發詞寫滿

別只寫一句話描述。要把「使用者可能怎麼說」全列出來：

```yaml
description: <一句話描述>。觸發時機：使用者說「X」「Y」「Z」「/skill-name」。
```

理由：Claude 看 description 做自然語言匹配，觸發詞越完整越準確。

### 2. 路徑解析要支援多機

不要寫死 `C:\Users\gjj22\...`，用環境變數 + fallback 順序：

```
1. $JACKY_WIKI_HOME
2. ~/jacky-wiki
3. <Windows fallback>
4. <Ubuntu fallback>
```

### 3. 工作流程要編號嚴格依序

`SKILL.md` 的「觸發後必做」用編號清單，每步寫到「Claude 看了能照做」。模糊指令會被當建議忽略。

### 4. 安全紅線清單明示

例如「不用 git add -A」「不在 cwd 寫檔」「不重試 push 失敗」。寫越具體越好，避免 Claude 自由發揮。

### 5. 列邊界情況表

```
| 情況 | 處理 |
|---|---|
| 路徑不存在 | 友善提示，不自動建 |
| 沒網路 | 本地 commit 仍成功，回報手動指令 |
| ... |
```

涵蓋邊界 = skill 在不同環境都不會崩。

---

## ⚠️ 採坑點

### 採坑 #1：中文 slash command parser 不穩

**症狀**：寫 `trigger: /收工`，使用者打 `/收工` 不一定觸發。
**真實原因**：Claude Code slash command parser 對中文支援不一定，不同版本可能有差。
**解法**：主 trigger 用英文（`/wrap-up`），中文觸發走 description 自然語言匹配。
**預防**：description 把中英文觸發詞都列出來。

### 採坑 #2：cwd 跟 jacky-wiki 路徑混淆

**症狀**：本來要寫到 jacky-wiki 的教材，結果寫到當前 cwd。
**真實原因**：skill 沒明確區分「跟 cwd 有關」（wrap-up 寫 todolist）vs「跟 cwd 無關」（internal-training 寫 wiki）。
**解法**：每個 skill 在 SKILL.md 開頭明示「此 skill 跟 cwd 有關／無關」，並用 `git -C "<wiki>"` 而非 `cd`。
**預防**：寫安全紅線「不在 cwd 寫檔」（給 internal-training）。

### 採坑 #3：`git add -A` 掃到 `.obsidian/graph.json`

**症狀**：commit 多帶了一份 Obsidian 個人化檔的修改。
**真實原因**：jacky-wiki 是 Obsidian vault，`.obsidian/graph.json` 會在 Obsidian 開啟時被觸碰。`git add -A` 全部抓進去。
**解法**：永遠用具名 add（`git add wiki/education/<具體檔>`）。
**預防**：寫進 SKILL.md 紅線「絕不用 -A」。

### 採坑 #4：education 也想做 inbox 機制

**症狀**：原始 plan 想讓 education 有 inbox/，跟 ailab 一樣三層漏斗。
**真實原因**：兩個 skill 重複「捕事件」職責，使用者看到「整理採坑點」會猶豫該走哪個。
**解法**：分工 — ailab 捕原始事件、education 只做對外成品。education **沒有 inbox**。
**預防**：在教育訓練索引 + SKILL.md 明示「要捕事件走 ailab、做教材走 education」。

### 採坑 #5：忘記 `git pull --rebase` 就 push

**症狀**：多機協作時 push 被拒，`non-fast-forward`。
**真實原因**：另一台機台已經 push 過新 commit，本地不知道。
**解法**：push 前一律 `git pull --rebase origin main`（jacky-wiki/CLAUDE.md §142 規範）。
**預防**：SKILL.md 的 git 步驟把 `pull --rebase` 列為 step 2，**不能跳過**。

### 採坑 #6：自動 commit/push 的時機錯誤

**症狀**：todolist.md 也被自動 commit 進專案 git，污染 commit log。
**真實原因**：wrap-up 寫到 cwd，而 cwd 可能是別的專案的 git repo。
**解法**：wrap-up **不**碰 git。internal-training 才在 jacky-wiki 內 commit/push。**git 動作只在已知 repo 做**。
**預防**：紅線寫明「wrap-up 不寫 git」「internal-training 只在 jacky-wiki 內 git」。

---

## 📚 延伸閱讀

- [ailab Skill 主版（INSTALL）](../../../ailab/skill/SKILL.md) — 多機 skill 部署完整範例
- [跨機與跨模型部署](../../../ailab/concepts/跨機與跨模型部署.md) — 5 種環境部署矩陣
- [實踐捕手協定](../../../ailab/concepts/實踐捕手協定.md) — 一個更複雜 skill 的 spec 範例
- [auto-memory 系統](../../../ailab/tools/auto-memory系統.md) — wrap-up 寫記憶用的子系統
- [Claude Code 工具觀](../../../ailab/tools/claude-code.md) — 為什麼選 Claude Code

實際 skill 檔（執行版）：
- `~/.claude/skills/wrap-up/SKILL.md`
- `~/.claude/skills/kickoff/SKILL.md`
- `~/.claude/skills/internal-training/SKILL.md`

---

## 🔄 快速回顧

三 skill 鐵三角解決「跨對話接軌成本」+「個人 vs 對外混淆」。**wrap-up** 凍結個人進度到 cwd `./todolist.md`；**kickoff** 讀 todolist brief 接續；**internal-training** 把對話整理成對外教材推 GitHub 跨機同步。設計重點：分工不重複、觸發詞自然語言匹配、路徑多機 fallback、安全紅線明示、git 動作只在已知 repo。

> 想自己做新 skill？先抄這三份的 frontmatter / 工作流程結構，再依場景調整。
