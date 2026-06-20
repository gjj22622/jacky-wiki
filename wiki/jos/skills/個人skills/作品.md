---
name: 作品
description: Jacky 的作品歸檔與示範速查。觸發時機：使用者說「歸檔作品」「這個專案上線了」「記一下這個部署」「作品放哪」「要示範 X 專案」「/作品」，或某專案部署到 GitHub/Zeabur、接上自有 DNS 等里程碑時。讓「找作品示範」變一句指令——非機密寫 wiki 頁、token/密碼寫 gitignored 金庫，示範時兩邊接起來給齊。也支援 /作品 斜線指令。
trigger: /作品
---

# /作品 — Jacky 作品歸檔速查

每次要示範作品時，不用再想「資料夾叫什麼、網址多少、怎麼登入」。本 skill 把作品的**非機密**記進 wiki、**機密**進金庫，示範時一句話全給齊。

> **本檔是 canonical 主版**：`<jacky-wiki>/wiki/portfolio/skill/SKILL.md`
> 各機部署：複製或 symlink 到 `~/.claude/skills/作品/SKILL.md`（詳見 `<jacky-wiki>/wiki/portfolio/skill/INSTALL.md`）

---

## 路徑解析（多機跨平台）

> 1. `$JACKY_WIKI_HOME` / `%JACKY_WIKI_HOME%`
> 2. `~/jacky-wiki`（含 Windows `%USERPROFILE%\jacky-wiki`）
> 3. `C:\Users\gjj22\jacky-wiki`（fallback）
> 4. `/home/jacky/jacky-wiki`（Ubuntu fallback）
>
> 本域根目錄：`<jacky-wiki>/wiki/portfolio/`。金庫：`<jacky-wiki>/wiki/portfolio/.vault/作品金鑰.local.json`。

---

## 使用方式

```
/作品               # 顯示作品索引 + 子指令
/作品 add           # ➕ 歸檔新作品（互動收集，自動偵測資料夾/repo）
/作品 <名稱>        # 🔍 查作品完整示範資訊（頁面 + 金庫接起來）
/作品 list          # 📋 列所有作品狀態總表
```

---

## 觸發後必做

### 1. 先讀規範

讀 `<jacky-wiki>/wiki/portfolio/README.md`（金庫機制、頁面規範、隱私紅線）+ `作品索引.md`。**不要憑記憶寫。**

### 2. 依子指令動作

#### `/作品 add`（歸檔新作品）

1. **自動偵測**能拿到的：
   - 當前資料夾名（`pwd` / `Get-Location`）
   - git remote（`git remote get-url origin`）→ 推出 GitHub repo
2. **詢問 Jacky**（一次集中問）缺的欄位：前端網址 / Zeabur project / admin 網址 / DNS / 狀態(active/beta/archived) / admin 帳號 / **機密（密碼·token·key）**。
3. **拆兩半寫入**：
   - **非機密** → `<jacky-wiki>/wiki/portfolio/projects/<名稱>.md`（依 README 的頁面規範五區塊；登入只寫「帳號 → 見金庫」）。
   - **機密** → `<jacky-wiki>/wiki/portfolio/.vault/作品金鑰.local.json`，以 `<名稱>` 為 key 寫入。**金庫檔不進 git（已 gitignore）。**
4. 更新 `作品索引.md` 主表加一列。
5. ⚠️ **守門**：任何 token/密碼/key 的**值**，只能進金庫，**絕不寫進 `.md`**。偵測到就攔下改寫金庫。
6. 不自動 commit——提示 Jacky（`feat(wiki): portfolio - 歸檔 <名稱>`）。**注意金庫不會被 commit（正確）。**

#### `/作品 <名稱>`（查示範資訊）

1. 讀 `projects/<名稱>.md`（網址、部署座標、示範腳本）。
2. 讀金庫 `.vault/作品金鑰.local.json` 的 `<名稱>` 區塊（登入機密）。
3. **接起來輸出**「示範這個作品需要的一切」：開哪個網址 → 用什麼帳密登入 → 展示什麼（照頁面的示範腳本）。
4. 金庫缺這個 key → 提醒去後台取得、或 `/作品 add` 補。

#### `/作品 list`

列 `作品索引.md` 主表（專案 / 狀態 / 前端 / admin / 部署日），標出哪些線上(🟢)、哪些 beta(🟡)。

---

## 寫作規範

- 繁體中文 + 中文檔名（專案名）
- frontmatter：`title` / `domain: portfolio` / `status` / `deployed`
- 🔒 **金鑰紅線**：機密只進金庫，頁面只記非機密 + 帳號名 + 「見金庫」。
- 客戶真名去敏（用代號）。
- commit：`feat(wiki): portfolio - <描述>` + Co-Authored-By（不自動 commit）

---

## 與其他 Skill 的關係

| Skill | 關係 |
|---|---|
| `jacky-wiki` (`/wiki`) | 父集——portfolio 是它的子域 |
| `移機` (`/移機`) | 姊妹 skill——移機管環境傳承，作品管成果速查 |
| `admin-token-backend` (`/admin後台`) | 作品若有 admin 後台，設計連回它的規格書 |

---

## 不要做

- ❌ 不要把 token/密碼/key 任何值寫進 `.md` 頁面——只進金庫
- ❌ 不要嘗試 commit 金庫（它被 gitignore，也不該繞過）
- ❌ 不要自動 commit / push
- ❌ 不要在本 skill 寫死絕對路徑——用 `<jacky-wiki>`
- ❌ 不要記客戶個資/真名——去敏

---

## 不在 jacky-wiki 工作目錄時

- 用 `<jacky-wiki>` 路徑解析
- 寫入前 `git pull --rebase origin main`
- 寫完不要自動 push

---

## 多機部署

- canonical 主版：`<jacky-wiki>/wiki/portfolio/skill/SKILL.md`
- 各機執行版：`~/.claude/skills/作品/SKILL.md`
- 金庫**不隨 git 同步**（機密走 OneDrive/密碼管理器）——見 [README](../README.md)
- 同步流程：`<jacky-wiki>/wiki/portfolio/skill/INSTALL.md`
