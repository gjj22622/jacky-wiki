---
name: internal-training
description: 內部教育訓練分享儀式 — 把當前對話精華 + ailab 既有結晶整理成可分享教材，存到 jacky-wiki/education/ 並 git push 到 GitHub 跨機同步。觸發時機：使用者說「整理工作流程」「整理經驗」「整理成教材」「整理成 SOP」「整理成內訓」「採坑點」「踩雷」「進度整理給同事看」「教育訓練分享」「內訓」「給同事看的版本」「/internal-training」「/內訓」。也支援 /internal-training 斜線指令。配對 wiki 域：jacky-wiki/wiki/education。差異：要捕個人原始事件 → 走 /ailab；本 skill 只產對外成品。
trigger: /internal-training
---

# /internal-training — 內部教育訓練分享

把當前對話精華 + jacky-wiki 既有結晶 → 整理成**對外可分享教材** → 存進 `wiki/education/` → `git push` 跨機同步。

> **配對域**：`jacky-wiki/wiki/education/`
> **設計參考**：`<jacky-wiki>/wiki/ailab/skill/SKILL.md`（路徑解析、跨機部署模式）

---

## 跟其他 skill 的分工（重要！）

| 觸發 | 走 | 原因 |
|---|---|---|
| 「捕一份」「這個值得記」「升格」 | `/ailab` | 個人原始事件入水庫 |
| 「收工」「今天做到這」 | `/wrap-up` | 個人進度凍結 |
| 「開工」「繼續昨天」 | `/kickoff` | 個人接續 |
| **「整理成教材」「採坑點分享」「整理 SOP」「內訓」「給同事看」** | **本 skill** | **對外成品** |

**灰區判斷**：
- 對象是「未來的我」 → ailab
- 對象是「別人」（同事、學員、客戶、AI 新手） → 本 skill

對話內容**還太原始、未消化** → 拒寫教材，改建議走 `/ailab capture` 或 `/ailab session`。

---

## 路徑解析（多機跨平台）

> 本 skill 不寫死絕對路徑。觸發時依以下順序找 jacky-wiki：
>
> 1. 環境變數 `$JACKY_WIKI_HOME` 或 `%JACKY_WIKI_HOME%`
> 2. `~/jacky-wiki`（macOS / Linux / WSL2 / Windows `%USERPROFILE%\jacky-wiki`）
> 3. `C:\Users\gjj22\jacky-wiki`（Windows 主機 fallback）
> 4. `/home/jacky/jacky-wiki`（G2 mini Ubuntu fallback）
>
> 找不到 → 友善提示「找不到 jacky-wiki，是這台機台還沒 clone 嗎？」**不要亂建。**

---

## 觸發後必做（嚴格依序）

### 1. 解析路徑

確定 `<jacky-wiki>` 絕對路徑。後續所有寫檔／git 操作都用 `git -C "<jacky-wiki>"`，**不要 `cd`**。

### 2. 讀規範（不憑記憶）

- `<jacky-wiki>/CLAUDE.md` — schema、commit 格式、跨域規則、隱私邊界
- `<jacky-wiki>/wiki/education/教育訓練索引.md` — 域定位、跟 ailab 的分工
- `<jacky-wiki>/wiki/wiki主索引.md` — 看當前各域頁數，預備更新

### 3. 判斷模式（**只 3 種**，沒有 inbox）

| 觸發詞 | 模式 | 寫到 |
|---|---|---|
| 「整理成教材／內訓／教育訓練分享」「給同事看」 | **A. workshop** | `workshops/<YYYY-MM-DD>-<slug>/{README.md, slides-outline.md}` |
| 「整理工作流程／SOP／步驟／流程」 | **B. playbook** | `playbooks/<slug>.md` |
| 「採坑點／踩雷／失敗教訓／反面教材」 | **C. pitfalls** | `pitfalls/<topic>.md`（既有檔追加 / 否則新建） |
| 對話**還太原始、實驗中、未驗證** | → **拒寫**，建議 `/ailab capture` 或 `/ailab session` | （不寫） |

### 4. 問目標對象（一次集中問完）

```
這份教材給誰看？
1. 內部團隊（同事都看得懂）
2. AI 新手（從零講起，不假設背景）
3. 客戶端 / 非工程師
4. 其他（請說明）
```

### 5. 掃 ailab 既有結晶（核心差異化步驟）

從 `<jacky-wiki>/wiki/ailab/{concepts,tools,patterns}/*.md` 找跟當前主題相關的檔（用 Glob + Grep 關鍵字匹配）。

找到 → 在新教材裡用**相對路徑連結引用**：
```markdown
> 延伸閱讀：[實踐捕手協定](../../ailab/concepts/實踐捕手協定.md)
```

**不複製內容**（嚴守 `<jacky-wiki>/CLAUDE.md` 去重原則）。

### 6. 萃取對話寫教材

#### Frontmatter（必填三項 + 教材特有）

```yaml
---
title: <教材標題>
domain: education
updated: YYYY-MM-DD
audience: <目標對象，例如「內部團隊」>
prerequisite: <先備知識，無則寫「無」>
duration: <約幾分鐘看完，例如「15 分鐘」>
tags: <逗號分隔，如「AI, 工具棧, 採坑點」>
source_chat: <一句話描述本次對話脈絡，便於追溯>
---
```

#### 寫作語氣

- **學員視角**：以讀者「我能照做」的角度寫，不是「我做過」的日記
- **step-by-step**：每步可獨立執行
- **採坑點獨立區塊**（最珍貴）
- **延伸閱讀區塊**：列引用到的 ailab / 其他域連結

#### Workshop 結構（Mode A）

`workshops/<YYYY-MM-DD>-<slug>/README.md`：
1. 學習目標（1-3 條）
2. 先備知識
3. 步驟 1, 2, 3...（每步含為什麼、怎麼做、預期結果）
4. 採坑點（含原因 + 解法）
5. 延伸閱讀
6. 快速回顧（1 段話）

`workshops/<YYYY-MM-DD>-<slug>/slides-outline.md`：純文字大綱，每張一個 `## Slide N` 標題 + 3-5 個 bullet。後續若要 .pptx，餵進 huashu-design。

#### Playbook 結構（Mode B）

`playbooks/<slug>.md`：
1. 適用情境
2. 前置條件（環境、權限、工具）
3. 步驟（編號、可勾選格式）
4. 異常情況分支
5. 驗收標準

#### Pitfalls 結構（Mode C）

`pitfalls/<topic>.md`：每筆採坑用統一欄位：
```markdown
## 採坑 #N：<標題>
- **症狀**：
- **誤區假設**：
- **真實原因**：
- **解法**：
- **預防**：
- **發生於**：<日期 / 對話脈絡>
```

### 7. 更新索引

更新 `<jacky-wiki>/wiki/education/教育訓練索引.md` 對應分類，加入新教材的條目連結。

### 8. 更新 wiki 主索引（每次 ingest 後規範要求）

`<jacky-wiki>/wiki/wiki主索引.md`：頁數加 N、必要時更新 education 域結構小節。

### 9. 更新 log.md

`<jacky-wiki>/wiki/log.md` 加一筆，格式仿既有條目（日期、主題、新增頁面表、為什麼這樣分）。

### 10. Git 同步（在 jacky-wiki 內）

**順序固定**：

```
1. git -C "<wiki>" status                         # 確認 staged 狀態乾淨
2. git -C "<wiki>" pull --rebase origin main      # ⚠ 強制：CLAUDE.md 規範
3. git -C "<wiki>" add <具名檔案>                 # ❌ 絕不用 -A
4. git -C "<wiki>" commit -m "<message>"          # 用 HEREDOC，含 Co-Authored-By
5. git -C "<wiki>" push origin main
```

**Commit message 格式**（依 jacky-wiki/CLAUDE.md §141）：

```
feat(wiki): <一句話描述教材>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

**例外**：使用者說「先不要 push」 → 跳過 step 5，回報手動 push 指令。

### 11. 回報 Jacky

```
📚 教育訓練教材完成

📝 寫入：
- wiki/education/<分類>/<檔名>
- wiki/education/教育訓練索引.md（已更新索引）
- wiki/wiki主索引.md（頁數 X→Y）
- wiki/log.md（已記錄本次 ingest）

🔗 引用 ailab 素材：
- <相對路徑>
- <相對路徑>

🚀 Git：
- commit: <hash 前 7 碼> "<message>"
- push: ✅ 成功 / ❌ <原因>

下次同步：其他機台 git -C ~/jacky-wiki pull
```

---

## 安全紅線

- ❌ **不**用 `git add -A`（具名加檔，避免誤帶 `.obsidian/graph.json`）
- ❌ **不**在 jacky-wiki 以外執行 git
- ❌ **不**刪既有教材
- ❌ **不**在 cwd 寫檔（此 skill 跟 cwd 無關，全寫進 jacky-wiki）
- ❌ **不**改既有域（ailab / shuangyun / jwood / jlife / tbsa / nchu / cross-domain）
- ❌ **不**修改 `~/.claude/CLAUDE.md` 或 `~/CLAUDE.md`
- ❌ **不**動 wrap-up / kickoff / ailab skill
- ❌ **不**自動產 .pptx（後續手動 huashu-design）
- ❌ **不**建 `education/inbox/`、`education/experiments/`（捕事件走 ailab）
- ❌ **不**複製 ailab 內容到 education（用連結引用）
- ❌ **不**跳過 `git pull --rebase`（多機協作會衝突）
- ✅ commit 前 `git status` 確認沒誤動其他檔
- ✅ push 失敗 → 友善回報手動指令，**不**重試亂搞
- ✅ 對話太原始 → 拒寫，引導改走 /ailab

---

## 邊界情況

| 情況 | 處理 |
|---|---|
| jacky-wiki 不存在的機台 | 友善提示「找不到 jacky-wiki，先 clone」，列出 GitHub 路徑 |
| `wiki/education/` 域骨架不存在 | 提示「education 域尚未初始化，請先在主機 push 域骨架」（不自動建，避免分歧） |
| 沒網路 push 失敗 | 本地 commit 已成功，回報手動 `git push origin main` 指令 |
| 多份教材同時要寫 | 一次 commit 多檔，commit message 涵蓋全部 |
| 觸發詞模糊（如「整理進度」） | 問一次「給自己接續（→ /wrap-up） / 給別人看（→ 本 skill）」 |
| 對話太長、教材會超過 500 行 | 拆成多個檔，主檔做總覽 + 連結子檔 |
| 隱私邊界（涉及客戶機密 / 個資） | 提示「這部分含 X 不入 wiki」，自動去識別化或拒寫 |

---

## 可信任 commit message 範例

```
feat(wiki): education - 新增 Claude Code 三 skill 鐵三角教材（wrap-up/kickoff/internal-training）

feat(wiki): education - 新增 Tool Use 升級採坑點 #6（Context Injection 廢棄時機）

feat(wiki): education - 新增 jacky-wiki 多機部署 SOP（playbook）
```

主索引也要更新 → 同個 commit 一起 push。
