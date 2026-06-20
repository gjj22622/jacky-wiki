---
name: ailab
description: 把 Jacky 的 AI 實踐事件扎實記錄下來。觸發時機：使用者說「這個值得記」「ailab capture」「實踐捕手」「ailab promote」「升格」「捕一份」「記下來」「/ailab」，或在某次實驗／突破／失敗／工具發現後值得保留為跨對話資產。也支援 /ailab 斜線指令。讓 Jacky 在不同 AI 模型／不同對話下都能用同一份格式記錄 AI 實踐。
trigger: /ailab
---

# /ailab — Jacky AI 實踐捕手

讓 Claude 把 Jacky 在**任何 AI 模型／任何對話**累積的 AI 實踐事件，扎實記錄到 wiki，並在事件成熟時升格成穩定知識。

> **本檔是 canonical 主版**：`<jacky-wiki>/wiki/ailab/skill/SKILL.md`
> 各機部署：複製或 symlink 到 `~/.claude/skills/ailab/SKILL.md`（詳見 `<jacky-wiki>/wiki/ailab/skill/INSTALL.md`）
> 跨模型部署：詳見 `<jacky-wiki>/wiki/ailab/concepts/跨機與跨模型部署.md`

---

## 路徑解析（多機跨平台）

> 本 skill 不寫死絕對路徑。Claude 觸發時用以下順序找 wiki：
>
> 1. 環境變數 `$JACKY_WIKI_HOME` 或 `%JACKY_WIKI_HOME%`
> 2. `~/jacky-wiki`（Linux / macOS / WSL2 / Windows 的 `%USERPROFILE%\jacky-wiki`）
> 3. `C:\Users\gjj22\jacky-wiki`（Windows 主機 fallback）
> 4. `/home/jacky/jacky-wiki`（G2 mini Ubuntu fallback）
>
> 找到後本檔內所有 `<jacky-wiki>` 都對應該路徑。
> OneDrive inbox：Windows `~/OneDrive/ailab-inbox/`、其他平台依 OneDrive client 設定。

---

## 使用方式

```
/ailab                       # 顯示 ailab 域索引、近 7 天 inbox、進行中實驗
/ailab capture <一句話>       # ⚡ Mode A：捕一份「單一事件」到 inbox（單一突破／失敗／工具）
/ailab session [<主題>]       # 📝 Mode B：對話結尾／中間斷點，總結整段對話（最終做法／繞路／錯誤）
/ailab inbox                 # 列出 inbox/ 內待處理事件
/ailab promote               # 把 inbox 事件升格到對應頁（concepts/tools/patterns/experiments/log）
/ailab tools                 # 顯示當前工具棧索引
/ailab patterns              # 列模式索引 + 連結
/ailab log <事件>            # 記錄重大里程碑（高門檻）
/ailab sync                  # 從 OneDrive/ailab-inbox/ 同步進 wiki/ailab/inbox/
```

### Mode A vs Mode B 怎麼選

| 場景 | 用 | 為什麼 |
|---|---|---|
| 對話中突然發現「這個值得記」 | **Mode A**（`/ailab capture`）| 單一事件，9 欄位夠 |
| 對話結尾／要切換主題／斷點回顧 | **Mode B**（`/ailab session`）| 多事件混合，要保留「最終做法／繞路／錯誤」對照脈絡 |
| 同類錯誤累積、跨對話的反思 | **Mode A**（多份）| 每次錯誤獨立，方便日後 grep |

---

## 觸發後必做

### 1. 先讀協定本體

讀 `<jacky-wiki>/wiki/ailab/concepts/實踐捕手協定.md`——所有 9 欄位定義、`type` 6 種值、`maturity` 4 種值、Mode A/B 兩種模式都在那裡。**不要憑記憶寫**。

### 2. 讀 wiki 結構

讀 `<jacky-wiki>/CLAUDE.md`（schema、ailab 寫作原則、跨域規則）+ `wiki/ailab/AI實踐索引.md`。

### 3. 依子指令動作

#### `/ailab capture <一句話>`（Mode A：單一事件）

1. 主對話中當下發生的事件，立刻套用協定 **Mode A** 9 欄位生成事件 markdown
2. 寫到 `<jacky-wiki>/wiki/ailab/inbox/<YYYY-MM-DD>-<event-slug>.md`
3. 若不確定某欄位（如 `maturity`、`升格目標`），**問 Jacky 一次**（一次集中問完）
4. 不要 commit——讓 Jacky 決定何時 commit（可能跟其他 wiki 變更打包）

#### `/ailab session [<主題>]`（Mode B：對話總結）

1. 掃過當前對話脈絡，**識別**：
   - 最終走通的做法（What Worked）
   - 繞路（Detours）：試過但走錯的路 + 原因
   - 錯誤與失敗（What Failed）：撞牆事件 + 假設錯誤
   - 升格候選（哪些值得升 ailab/tools 或 patterns）
   - 待延伸（下次要做什麼）
2. 套用協定 **Mode B** 5 區塊格式生成 markdown
3. 寫到 `<jacky-wiki>/wiki/ailab/inbox/<YYYY-MM-DD>-session-<topic-slug>.md`
4. **必填**：最終做法 + 升格候選；其他區塊可空
5. 若 `<主題>` 沒給，從對話開頭抽一句話當主題
6. 寫完**先給 Jacky 看內容預覽**（生成的 5 區塊內容），確認沒漏／沒誤後才確認寫檔
7. 不要 commit

##### 「對話中間斷點」 vs「對話結尾」 差異

- **斷點**：對話還會繼續但要切換主題 → Mode B 寫完後**對話繼續**，新主題開新事件
- **結尾**：對話要結束 → Mode B 寫完後可能也順手 `/ailab promote` 一輪

#### `/ailab inbox`

1. 列出 `wiki/ailab/inbox/*.md` 全部檔案（最新在前）
2. 每個顯示：date / event / type / maturity / 升格目標
3. 標出哪些可升格（maturity = 已驗證 或 已穩定）

#### `/ailab promote`

1. 讀 inbox/ 全部檔案
2. 對每個 maturity = 已驗證 / 已穩定 的事件，建議升格目標：
   - 工具發現／模型對比 → `tools/<檔名>` update（不是新增）
   - 模式發現（已穩定，跨場景）→ `patterns/<檔名>` 或建議升 `cross-domain/`
   - 突破 / 工作流改進（已穩定）→ `concepts/<檔名>` update
   - 重大里程碑 → `log/<檔名>` 新增
3. 詢問 Jacky 一個個確認後執行
4. 升格後在原 inbox 檔末尾標 `[已升格 → ailab/<目的>]`

#### `/ailab sync`

1. 列 OneDrive inbox 內所有檔案（路徑見上方「路徑解析」）
2. 把符合協定 9 欄位的搬進 `wiki/ailab/inbox/`
3. `raw.md` 內的三行極簡格式：問 Jacky 是否要補完協定 9 欄位
4. OneDrive 端搬完的檔移到 `OneDrive/ailab-inbox/_synced/<日期>/`

#### `/ailab log <事件>`

⚠️ **高門檻**：只用於方法論級演化（如 v1.0→v1.1）。
1. 確認事件符合 log/ 進入條件（[三層萃取漏斗](`<jacky-wiki>/wiki/ailab/concepts/三層萃取漏斗.md`)）
2. 若符合：寫到 `wiki/ailab/log/<YYYY-MM>-<事件名>.md`
3. 若不符合：建議改用 `/ailab capture` 留 inbox 即可

---

## 跨模型／跨對話的記錄方法

> **完整跨平台部署文件**：`<jacky-wiki>/wiki/ailab/concepts/跨機與跨模型部署.md`
> 本段為快速摘要。

### 在 Claude Code 內（Windows / Ubuntu / WSL2 / macOS）

直接 `/ailab capture` 或 `/ailab session`。本 skill 必須裝在該機 `~/.claude/skills/ailab/SKILL.md`。

### 在 Codex CLI（GPT-5.4）

兩種方法：
- **持久**：把協定加進 `~/.codex/AGENTS.md` 的「實踐捕手」段（一次設定，每次自動載入）
- **臨時**：複製 `<jacky-wiki>/wiki/ailab/concepts/實踐捕手協定.md` 內 §情境 2 的 prompt 給 Codex

### 在 Gemini（Web / Gem）

- **建 Custom Gem**：把 Mode A + Mode B prompt 設為 system instructions（一次設定）
- **臨時**：複製 prompt 給 Gemini Web

### 在 ChatGPT / Claude Web 等其他 AI

複製 prompt 給 AI → AI 輸出 → 貼到 OneDrive/ailab-inbox/ → 回 Claude Code 跑 `/ailab sync`。

### 手機／極簡記錄

只寫三行進 `OneDrive/ailab-inbox/raw.md`：

```
@ailab YYYY-MM-DD <model> | <event>
why: <一句話>
how: <一句話>
```

→ 之後 `/ailab sync` 補齊 9 欄位。

---

## 寫作規範（呼應 jacky-wiki CLAUDE.md）

- 繁體中文 + 中文檔名（除 `event-slug` 可用英文短）
- YAML frontmatter（`title`、`domain: ailab`、`updated`）
- 隱私邊界：客戶機密、家人細節、未發表研究結果**不入** ailab
- 去重：方法論細節在 cross-domain / shuangyun，ailab 用連結
- 升格：**依事件、無時間門檻**（Jacky 偏好）
- commit 格式：`feat(wiki): ailab - <描述>` + Co-Authored-By

---

## 與其他 Skill 的關係

| Skill | 用途 | 跟 ailab 的關係 |
|---|---|---|
| `jacky-wiki` (`/wiki`) | 查詢／更新整個 wiki | 父集——ailab 是它的子域 |
| `jacky-omnimind` | 全人統整層 | omnimind 答「Jacky 是誰」；ailab 答「Jacky 怎麼用 AI」 |
| `graphify` (`/graphify`) | 任何輸入 → 知識圖 | 可用來視覺化 ailab 的事件叢聚 |
| `seminar-helper` | NCHU 9 階段工作流 | 它的 9 階段就是 ailab 模式之一 |

> 觸發優先順序：使用者明確說「ailab」「實踐捕手」「捕一份」→ ailab；說「整個 wiki」→ jacky-wiki；說「視覺化」→ graphify。

---

## 不要做

- ❌ 不要在 inbox 寫流水帳（純工作日誌、純情緒）
- ❌ 不要把家人細節、客戶機密、未發表研究寫進 ailab
- ❌ 不要強行升格未驗證的事件（漏斗會自然篩，不要急）
- ❌ 不要重新發明協定（用 `wiki/ailab/concepts/實踐捕手協定.md` v1.1）
- ❌ 不要把 ailab 內容複製到其他域（用連結）
- ❌ 不要用機械化時間門檻（30 天 / 3 個月閘門）——依事件升格
- ❌ 不要在本 skill 寫死絕對路徑——用 `<jacky-wiki>` 變數讓多機可用

---

## 不在 jacky-wiki 工作目錄時

- 用 `<jacky-wiki>` 路徑解析（見頂部「路徑解析」）
- 不要 cd 過去（用絕對路徑直接讀寫）
- 寫入前 `git pull --rebase origin main`（避免 fast-forward 衝突）
- 寫完不要自動 push——讓 Jacky 決定

---

## 多機部署

- canonical 主版：`<jacky-wiki>/wiki/ailab/skill/SKILL.md`（git 管理）
- 各機執行版：`~/.claude/skills/ailab/SKILL.md`（symlink 或 copy）
- 同步流程：`<jacky-wiki>/wiki/ailab/skill/INSTALL.md`
- 改 skill 時：改主版 → commit → push → 各機 git pull → 自動或手動更新執行版（symlink 直接跟新；copy 要重跑 install）
