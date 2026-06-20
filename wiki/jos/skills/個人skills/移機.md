---
name: 移機
description: Jacky 的 AI 作業系統轉移與備份。觸發時機：使用者說「換電腦」「轉移環境」「備份環境」「新機器設定」「裝回我的工具」「同步 skill」「/移機」，或裝了新 CLI/MCP/skill 想更新清單時。讓「換電腦無痛轉移」變成一句指令——維護 jos 域的環境清單、把本機 skill 備份進 wiki、並在新機照 SOP 還原。也支援 /移機 斜線指令。
trigger: /移機
---

# /移機 — Jacky AI 作業系統轉移

把 Jacky 整套 AI 作業系統（環境 + 工具 + skill）**機械化記錄、可複製、可傳承**，讓換電腦變成一句指令。

> **本檔是 canonical 主版**：`<jacky-wiki>/wiki/jos/skill/SKILL.md`
> 各機部署：複製或 symlink 到 `~/.claude/skills/移機/SKILL.md`（詳見 `<jacky-wiki>/wiki/jos/skill/INSTALL.md`）

---

## 路徑解析（多機跨平台）

> 觸發時用以下順序找 wiki：
> 1. 環境變數 `$JACKY_WIKI_HOME` / `%JACKY_WIKI_HOME%`
> 2. `~/jacky-wiki`（含 Windows `%USERPROFILE%\jacky-wiki`）
> 3. `C:\Users\gjj22\jacky-wiki`（Windows 主機 fallback）
> 4. `/home/jacky/jacky-wiki`（G2 mini Ubuntu fallback）
>
> 找到後本檔內 `<jacky-wiki>` 都對應該路徑。本域根目錄：`<jacky-wiki>/wiki/jos/`。

---

## 使用方式

```
/移機                  # 顯示 jos 域索引、近況、可用子指令
/移機 capture          # 🔄 掃描本機現況，更新 wiki 清單（CLI 版本 / skill 快照 / manifest）
/移機 restore          # 🚀 新機還原：照 換電腦SOP 逐步帶做，能自動的先跑
/移機 sync             # 🔁 只同步 skill：~/.claude/skills/ ↔ wiki/jos/skills/個人skills/
```

---

## 觸發後必做

### 1. 先讀域結構

讀 `<jacky-wiki>/wiki/jos/作業系統索引.md` 了解四層架構與三子區。**不要憑記憶寫清單。**

### 2. 依子指令動作

#### `/移機`（無參數）

1. 顯示 [作業系統索引](作業系統索引.md) 的三子區導覽。
2. 提醒：換新機 → `/移機 restore`；裝了新東西 → `/移機 capture`。

#### `/移機 capture`（掃描本機、更新清單）

對應使用者偏好「先做 runbook（3），再進化腳本（1）」——現階段以「維護清單」為主。

1. **掃 CLI 版本**：跑這些（跨平台擇一）取得版本，更新 [manifest](migration/manifest.md) 與 [CLI工具清單](environment/CLI工具清單.md) 的「本機版本」欄：
   - `claude --version` / `git --version` / `node -v` / `npm -v` / `docker --version` / `gh --version` / `python --version`（Win）或 `python3 --version`
2. **同步 skill 快照**：把 `~/.claude/skills/<每支>/SKILL.md` 複製成 `<jacky-wiki>/wiki/jos/skills/個人skills/<名稱>.md`（見下方 sync 指令的指令片段）。發現新 skill → 也加進 [skill總索引](skills/skill總索引.md) 的表。
3. **盤點 plugin / MCP**：若有新增，更新 [plugin與市集](skills/plugin與市集.md) / [MCP伺服器清單](environment/MCP伺服器清單.md)。
4. 更新各被改檔的 `updated:` 日期與 manifest 的「快照時間」。
5. **不要自動 commit**——列出改了哪些檔，提示 Jacky 一句 commit（`feat(wiki): jos - 更新環境快照`）。

#### `/移機 restore`（新機還原，逐步帶做）

1. 讀 [換電腦SOP](migration/換電腦SOP.md)，**照步驟順序**帶 Jacky 走（0→10）。
2. **能安全自動化的，先示範並可代跑**：clone repo、複製 skill（下方指令片段）、設環境變數、驗證 CLI 版本。
3. **需要人手動的，清楚列出並等待**：裝 GUI 軟體、`/plugin` 重裝、MCP 瀏覽器授權、填金鑰到 `.env`。
4. 每完成一步，對照 [還原檢查清單](migration/還原檢查清單.md) 打勾回報。
5. ⚠️ 涉及金鑰：**只引導去各服務後台拿**，絕不把任何值寫進 wiki。

#### `/移機 sync`（只同步 skill）

把本機 skill 回寫成 wiki 快照（或反向還原）。

**本機 → wiki（備份，capture 也會做）**

Windows PowerShell：
```powershell
$dst = "$env:JACKY_WIKI_HOME\wiki\jos\skills\個人skills"
Get-ChildItem "$env:USERPROFILE\.claude\skills" -Directory | ForEach-Object {
  $sk = "$($_.FullName)\SKILL.md"
  if (Test-Path $sk) { Copy-Item $sk "$dst\$($_.Name).md" -Force }
}
```
bash：
```bash
dst="$JACKY_WIKI_HOME/wiki/jos/skills/個人skills"
for d in "$HOME/.claude/skills"/*/; do
  [ -f "$d/SKILL.md" ] && cp "$d/SKILL.md" "$dst/$(basename "$d").md"
done
```

**wiki → 本機（還原）**：見 [skill總索引](skills/skill總索引.md) 的「一鍵還原」段。

> sync 後若 skill 清單有增減，更新 [skill總索引](skills/skill總索引.md) 的表。不自動 commit。

---

## 寫作規範

- 繁體中文 + 中文檔名
- YAML frontmatter（`title`、`domain: jos`、`updated`）
- ⚠️ **金鑰紅線**：環境變數只記「名稱 + 去哪拿值」，**絕不記值**。token/密碼/API key 永不進 jos 域任何檔。
- 清單要反映**實況**（跑指令拿真版本），不要憑記憶填。
- commit 格式：`feat(wiki): jos - <描述>` + Co-Authored-By（不自動 commit，提示 Jacky）

---

## 與其他 Skill 的關係

| Skill | 關係 |
|---|---|
| `jacky-wiki` (`/wiki`) | 父集——jos 是它的子域 |
| `ailab` (`/ailab`) | ailab/tools 是「工具觀（為什麼）」；jos 是「機械清單（怎麼裝）」。互補不重複 |
| `作品` (`/作品`) | 姊妹 skill——jos 管環境傳承，作品管成果速查 |

---

## 不要做

- ❌ 不要把任何金鑰/token/密碼值寫進 jos 域
- ❌ 不要自動 commit / push（讓 Jacky 決定）
- ❌ 不要憑記憶填版本號——跑指令拿實況
- ❌ 不要在本 skill 寫死絕對路徑——用 `<jacky-wiki>` 變數
- ❌ restore 時不要跳步——照 SOP 0→10 順序，每步確認

---

## 不在 jacky-wiki 工作目錄時

- 用 `<jacky-wiki>` 路徑解析（見頂部）
- 寫入前 `git pull --rebase origin main`
- 寫完不要自動 push

---

## 多機部署

- canonical 主版：`<jacky-wiki>/wiki/jos/skill/SKILL.md`
- 各機執行版：`~/.claude/skills/移機/SKILL.md`（symlink 或 copy）
- 同步流程：`<jacky-wiki>/wiki/jos/skill/INSTALL.md`
