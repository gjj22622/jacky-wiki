---
title: 如何製作自己的 LLM Wiki — Obsidian 關聯圖實戰
domain: education
updated: 2026-05-22
audience: 內部團隊（同事、夥伴、AI 新手皆可）
prerequisite: 會用 git push、會裝桌面軟體；不需任何 LLM 經驗
duration: 60 分鐘（30 分概念 + 30 分動手）
tags: AI, wiki, Obsidian, 知識管理, 內訓, workshop
source_chat: Jacky 5/22 點名要把 wiki 知識圖譜建置手冊 + Obsidian graph 整理成可分享內訓
---

# 如何製作自己的 LLM Wiki — Obsidian 關聯圖實戰

> 走完這個 workshop，學員會帶著「一個跑得動的 wiki 骨架 + Obsidian 圖譜畫面」回家。
> 不只是看懂概念，是**真的看到自己第一張知識圖譜亮起來**。

---

## 1. 學習目標（60 分鐘後你能做到）

1. **理解** wiki 跟一般筆記的差異，能用一句話跟同事解釋「為什麼要做 LLM wiki」
2. **建好** 你自己的 wiki 骨架（git repo + 域結構 + 第一批雙向連結）
3. **看到** Obsidian 圖譜視圖把你的知識點串起來（亮燈 + 拖拉 + zoom）

> 不在範圍：怎麼設計 Skill / 怎麼接 Claude Code — 那是進階班。
> 本班只解決「我的知識散落 → 我有一張可看的關聯圖」這一步。

---

## 2. 先備知識

| 必備 | 內容 |
|---|---|
| Git 基本操作 | `clone / add / commit / push`（會打就行，不用懂 rebase） |
| Markdown 基本語法 | 標題、清單、連結 `[文字](url)` |
| 桌面軟體安裝權限 | 你能在自己電腦裝 Obsidian / VS Code |

| 不需要 | 為什麼 |
|---|---|
| 任何 AI 經驗 | 本班不教 AI 使用，只教 wiki 結構 |
| Obsidian 經驗 | 從零安裝開始 |
| Python / 程式背景 | 整套是 Markdown + YAML，零程式 |

---

## 3. 步驟（依序操作，每步約 5-10 分鐘）

### Step 1 · 為什麼是 wiki，不是 Notion / Bear 隨手記？

**為什麼要做**：講「散落 → 結構化」這個躍遷。

**怎麼做**：5 分鐘內看完手冊 §1-2 兩節（[wiki知識圖譜建置手冊 §1](../../../wiki知識圖譜建置手冊.md#1-為什麼需要知識圖譜)）。

**預期結果**：你能跟同事 30 秒解釋：「結構化 + 可導航 + 可成長 = LLM 看得懂的 wiki」。

> ⚠️ 不要跳過這節 — 沒想清楚「為什麼」，後面建好的東西很快會荒廢。

---

### Step 2 · 定義你自己的 5-8 個域

**為什麼**：域是「自洽的知識宇宙」。少了沒導航價值，多了維護爆炸。

**怎麼做**：拿白紙寫下：
1. 我現在主要的工作 / 生活 / 學習線有幾條？
2. 哪些是「歷程」（前傳）vs 「現況」？
3. 哪些方法論會多處用到？（這些將進 `cross-domain/`）

**預期結果**：一張紙上有 5-8 個域名 + 每個域一句話定位。

> 📎 範例：Jacky Wiki 的 7 個域定義在 [手冊 §3 架構解析](../../../wiki知識圖譜建置手冊.md#3-jacky-wiki-架構解析)。看著模仿，不要照抄 — 你不是 Jacky。

---

### Step 3 · 建 git repo + 域骨架

**為什麼**：wiki 必須在 git 裡（版本控制 + 跨機同步是 wiki 的命脈，跑了 6 個月後你會感謝這一步）。

**怎麼做**：

```bash
# 1. 在本機建 repo
mkdir my-wiki && cd my-wiki
git init

# 2. 建域骨架（依你 Step 2 寫的域名）
mkdir -p wiki/{域1,域2,域3,域4,域5}
mkdir -p wiki/cross-domain

# 3. 建主索引（中文檔名是規範）
touch wiki/wiki主索引.md
touch wiki/log.md
touch wiki/域1/域1索引.md  # 每個域都建一個索引頁

# 4. push 到 GitHub
gh repo create my-wiki --private --source=. --push
```

**預期結果**：GitHub 上有一個 private repo，目錄結構打開來能看到 5-8 個域資料夾。

---

### Step 4 · 寫 CLAUDE.md（Schema 主規格）

**為什麼**：這是 wiki 的「憲法」 — LLM / 同事看到這份就知道規矩。

**怎麼做**：在 repo 根目錄建 `CLAUDE.md`，貼這個最小模板：

```markdown
# Wiki Schema 主規格

## 域代碼
- 域1：<一句話定位>
- 域2：<一句話定位>
（依此類推）

## 每頁 frontmatter（必填）
\`\`\`yaml
---
title: 頁面標題（中文）
domain: <域代碼>
updated: YYYY-MM-DD
---
\`\`\`

## 檔名規範
- 中文為主，英文補充
- 索引頁：`<域中文名>索引.md`
- 不用 `index.md`、`page1.md` 這類無語義名稱

## 跨域連結規則
- 同方法論只存一份（Single Source of Truth），其他頁面用相對路徑連過去
- jlife / 歷程域 ↔ 現況域 必須雙向連結

## Commit 格式
`feat(wiki): <一句話描述>`
```

**預期結果**：根目錄有 CLAUDE.md，內容就是上面這份。

---

### Step 5 · 寫第 1 頁（內含 frontmatter + 內鏈）

**為什麼**：實際寫一頁，才會感受到 frontmatter / 雙向連結的意義。

**怎麼做**：在 `wiki/域1/` 建一個你最熟的方法論 / SOP 頁（例：`我的工作流.md`）：

```markdown
---
title: 我的工作流
domain: 域1
updated: 2026-05-22
---

# 我的工作流

這頁記錄我每天怎麼工作。

→ 相關：[[../域2/相關方法]]
→ 前傳：[[../jlife/我是怎麼學會的]]
```

> Obsidian 的雙向連結語法是 `[[檔名]]` 或 `[[資料夾/檔名]]`，**不用 `.md` 副檔名**。
> Markdown 標準連結 `[文字](路徑)` 也支援，但 Obsidian graph 會優先讀 `[[]]`。

**預期結果**：第 1 頁存好、commit、push。

---

### Step 6 · 安裝 Obsidian + 開啟你的 wiki

**為什麼**：到這裡你的圖譜終於「亮起來」。

**怎麼做**：

1. 下載 Obsidian：[obsidian.md](https://obsidian.md/)（macOS / Windows / Linux 都免費）
2. 開啟後選「Open folder as vault」→ 選你的 `my-wiki` 資料夾
3. **左下角 → Graph view 圖示**（看起來像 4 個圓點連線）→ 你的第一張圖譜就出現

**預期結果**：螢幕中央會看到節點（每個 .md 一個圓點）+ 連線（每個 `[[ ]]` 一條邊）。

> 🎯 **這個 workshop 的關鍵 aha moment 就在這裡** — 學員會看到「原來我寫的 5 頁筆記，是這樣彼此連結的」。
> 講師示範時，建議**畫面切到 Jacky Wiki 的 3D 圖譜可視化**讓學員看一個「成熟版本長什麼樣」：[3D 知識圖譜](../../../cross-domain/visualizations/jackywiki-3d-knowledge-graph.html)。

---

### Step 7 · 寫第 2-5 頁（建構連結密度）

**為什麼**：1 頁沒圖譜可言，5 頁才開始有「網」的形狀。

**怎麼做**：在不同域各寫 1-2 頁，**每頁至少加一個 `[[..]]` 指到其他域的頁面**。例如：
- `域1/方法A.md` 連到 `域2/應用B.md`
- `域2/應用B.md` 反過來連回 `域1/方法A.md`（雙向）

**預期結果**：Obsidian graph view 中，節點開始**聚成群**（同域節點靠近）、**跨域連線把群拉在一起**。

> ⚠️ 如果你看到圖譜中有「孤兒節點」（沒有任何連線的圓點）— 那就是還沒被串進知識網的頁，**回去把它連上**。

---

### Step 8 · 設定 Obsidian Graph 顏色（依域分組）

**為什麼**：當頁數 >20，所有節點都同色會看不出域邊界。

**怎麼做**：

1. Graph view 右上角設定圖示 → **Groups** 區
2. 點「New group」→ 在 Query 框輸入：`path:wiki/域1/`
3. 選一個顏色（例：藍色）→ 套用
4. 每個域重複一次（綠 / 黃 / 紅 / 紫）

**預期結果**：圖譜上每個域是不同顏色，跨域連線一眼看出來。

> 📎 參考：[Jacky Wiki 3D 圖譜可視化](../../../cross-domain/visualizations/jackywiki-3d-knowledge-graph.html) 就是這套配色思路的進階版（用 three.js 做 3D 視覺化）。

---

## 4. 採坑點（最珍貴的一節）

### 採坑 #1：第一週就想塞 50 頁，結果一頁沒連結

**症狀**：跟著手冊建了 50 個 .md 檔，但 Obsidian 圖譜看起來像「50 個孤兒節點 + 0 條邊」。

**真實原因**：寫頁面時忘記加 `[[]]` 連結。**連結是 graph 的命脈**，沒連結 = 沒圖譜。

**解法**：每寫一頁，**強迫自己在頁末加「相關」區塊**，至少連 2 個其他頁面。

**預防**：在 CLAUDE.md 寫進規範：「每頁必須至少 2 個雙向連結」。

---

### 採坑 #2：用 `[文字](path.md)` 而不是 `[[檔名]]`

**症狀**：Obsidian graph view 不顯示連線。

**真實原因**：Markdown 標準連結 `[文字](path.md)` Obsidian 認得但**不一定畫進 graph**（依版本和設定）。`[[檔名]]` 是 Obsidian 原生 wiki-link 語法，graph 絕對畫。

**解法**：內部頁面互連一律用 `[[檔名]]`；外部 URL 才用 `[文字](url)`。

**預防**：在 CLAUDE.md 範例就用 `[[]]` 寫，不要混雜。

---

### 採坑 #3：把 `.obsidian/graph.json` 推上 git

**症狀**：跨機同步時 graph 顏色 / 位置一直被覆蓋；多人協作衝突不斷。

**真實原因**：`.obsidian/` 是 Obsidian 的個人設定（含 graph 配色、view layout、cache），不該入 git。

**解法**：在 repo 根目錄建 `.gitignore`：

```
.obsidian/workspace*.json
.obsidian/cache
.obsidian/graph.json
```

> 也可以整個 `.obsidian/` 都 ignore，但 plugin 設定就不會跨機同步。
> Jacky 的折衷：**ignore graph.json / workspace*.json，保留 plugins**。

---

### 採坑 #4：所有頁面塞在一個域，因為「我覺得這樣比較單純」

**症狀**：一個月後，域裡有 80 頁，找不到東西，跟「Notion 隨手記」沒差。

**真實原因**：沒做 Step 2 — 沒花時間定域。

**解法**：**現在就把 80 頁分到 5-8 個域**，每個域 10-20 頁是合理的。

**預防**：寧可一開始 5 個域寬一點，也不要 1 個域塞所有東西。6 個月後再依需求拆分。

---

### 採坑 #5：「我每天都要 review inbox」變成心理負擔

**症狀**：3 週後就開始逃避 wiki，因為「又要整理 inbox」。

**真實原因**：把「應該每天/每月」變成義務 — 知識管理的最大殺手是儀式感過重。

**解法**：依事件成熟度判斷，不依時間。**有事件就記、有重複就升、有大事就 log**。

**預防**：CLAUDE.md 寫進去這個原則，避免別人（或未來的你）誤以為要設 calendar reminder。

---

## 5. 延伸閱讀（wiki 內互聯）

| 想深入 | 走到 |
|---|---|
| 整套 wiki schema 完整版 | [[../../wiki知識圖譜建置手冊]] §STEP 1-6 |
| 簡報版（給管理層 / 客戶看的版本） | [[../../wiki知識圖譜建置簡報]] |
| 3D 知識圖譜可視化（demo 給人看效果） | [[../../cross-domain/visualizations/jackywiki-3d-knowledge-graph]] |
| 跨對話/跨模型怎麼把 AI 實踐事件收進來 | [[../../ailab/concepts/實踐捕手協定]] |
| 三層漏斗（inbox → 結晶）怎麼跑 | [[../../ailab/concepts/三層萃取漏斗]] |
| AI 工具觀（為什麼選這套而不選別套） | [[../../ailab/concepts/AI工具觀]] |
| 跨機部署（不同電腦怎麼同步 wiki） | [[../../ailab/concepts/跨機與跨模型部署]] |

---

## 6. 30 秒快速回顧

> **Wiki 不是文件系統，是「可被呼叫的知識形式」。**
>
> 三件事決定 wiki 是不是知識圖譜：
> 1. **每頁有 frontmatter**（LLM 才看得懂）
> 2. **每頁有雙向連結**（圖譜才有邊）
> 3. **每個域有清楚定位**（找得到、跨域也連得到）
>
> Obsidian 是讓你「看到」這張圖的工具，不是 wiki 本身 — wiki 是 Markdown + git。
> 把 Obsidian 換成 VS Code / GitHub 網頁 / Claude Code，wiki 一樣跑得動。

---

## 7. 講師備課 checklist

> 給未來自己或其他講師帶這堂課時用。

- [ ] 演示用的 wiki 範例：準備一個「乾淨 5 頁版本」+「Jacky Wiki 97 頁完整版」對比
- [ ] Obsidian 桌面端事先裝好，graph view 預先設好顏色分群（避免現場手忙腳亂）
- [ ] 3D 圖譜可視化 [[../../cross-domain/visualizations/jackywiki-3d-knowledge-graph]] 預先在瀏覽器開好（demo 用，wow factor 在這）
- [ ] 印 5 張白紙給學員 — Step 2 域設計用手寫，不要直接打字（防止過早 over-engineer）
- [ ] 上機環境：每位學員確認 git + GitHub 帳號 + 桌面有 800MB 空間裝 Obsidian
- [ ] 結尾 5 分鐘留 Q&A，最常被問的問題：「Notion 不是也可以嗎？」 — 答：可以，但 LLM 讀不懂 Notion 的內部結構；Markdown + git 是 LLM 原生格式
