---
title: ailab Skill 多機安裝指南
domain: ailab
updated: 2026-05-02
---

# ailab Skill 多機安裝指南

> 本 skill 的 canonical 主版是 `<jacky-wiki>/wiki/ailab/skill/SKILL.md`，
> 各機需要把它放到 `~/.claude/skills/ailab/SKILL.md` 才能讓 Claude Code 觸發。
> **本指南**：Windows / Ubuntu / WSL2 / macOS 各平台的安裝步驟。

---

## 三種部署策略

| 策略 | 同步方式 | 適合 |
|---|---|---|
| **A. Symlink**（推薦）| `~/.claude/skills/ailab/SKILL.md` symlink → wiki repo | Linux / macOS / WSL2（git pull 後自動跟）|
| **B. Copy + 同步指令** | git pull 後跑 `install-ailab` 把主版 copy 過去 | Windows（symlink 麻煩）|
| **C. 直接編輯本機版** | 直接改 `~/.claude/skills/ailab/SKILL.md`，不同步 | 不建議（多機會分歧）|

> 多機協作建議：Linux/Mac 用 A；Windows 用 B；不要混用。

---

## 前置條件（所有平台）

1. **本機已 clone wiki repo**：
   ```bash
   git clone https://github.com/gjj22622/jacky-wiki.git ~/jacky-wiki
   ```
   或 Windows：`git clone https://github.com/gjj22622/jacky-wiki.git C:\Users\gjj22\jacky-wiki`

2. **環境變數設好**（讓 skill 找得到 wiki，可選但建議）：
   ```bash
   # ~/.bashrc 或 ~/.zshrc
   export JACKY_WIKI_HOME="$HOME/jacky-wiki"
   ```
   Windows PowerShell `$PROFILE`：
   ```powershell
   $env:JACKY_WIKI_HOME = "$env:USERPROFILE\jacky-wiki"
   ```

3. **Claude Code 已安裝**：[claude.ai/code](https://claude.ai/code)

---

## 平台 1：Ubuntu（含 G2 mini）

### 方案 A：Symlink（推薦）

```bash
# 一次性安裝
mkdir -p ~/.claude/skills/ailab
ln -sf ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md

# 驗證
ls -la ~/.claude/skills/ailab/SKILL.md
# 應顯示：SKILL.md -> /home/jacky/jacky-wiki/wiki/ailab/skill/SKILL.md

# 之後每次更新
cd ~/jacky-wiki && git pull
# 完成（symlink 自動跟新）
```

### 方案 B：Copy

```bash
mkdir -p ~/.claude/skills/ailab
cp ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md

# 之後每次 wiki 更新後
cd ~/jacky-wiki && git pull
cp ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md
```

---

## 平台 2：Windows（PowerShell）

### 方案 B：Copy（推薦給 Windows）

```powershell
# 一次性安裝
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills\ailab"
Copy-Item "$env:USERPROFILE\jacky-wiki\wiki\ailab\skill\SKILL.md" `
          "$env:USERPROFILE\.claude\skills\ailab\SKILL.md" -Force

# 之後每次 wiki 更新後
cd $env:USERPROFILE\jacky-wiki
git pull
Copy-Item "$env:USERPROFILE\jacky-wiki\wiki\ailab\skill\SKILL.md" `
          "$env:USERPROFILE\.claude\skills\ailab\SKILL.md" -Force
```

### 方案 A：Symlink（需要 Developer Mode 或管理員）

開 PowerShell as Administrator 或在 Windows Settings 開 Developer Mode：
```powershell
New-Item -ItemType SymbolicLink `
         -Path "$env:USERPROFILE\.claude\skills\ailab\SKILL.md" `
         -Target "$env:USERPROFILE\jacky-wiki\wiki\ailab\skill\SKILL.md"
```

---

## 平台 3：WSL2

跟 Ubuntu 一樣，用方案 A symlink：

```bash
mkdir -p ~/.claude/skills/ailab
ln -sf ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md
```

> 注意：WSL2 的 `~/.claude/` 跟 Windows 主機的 `~/.claude/` 是分開的——兩邊都裝 Claude Code 的話兩邊都要裝 skill。

---

## 平台 4：macOS

跟 Ubuntu 一樣，用方案 A symlink：

```bash
mkdir -p ~/.claude/skills/ailab
ln -sf ~/jacky-wiki/wiki/ailab/skill/SKILL.md ~/.claude/skills/ailab/SKILL.md
```

---

## 驗證安裝

開 Claude Code，打：

```
/ailab
```

如果有反應（顯示 ailab 域索引或 inbox 列表）→ 安裝成功。
如果沒反應或說「找不到 skill」→ 檢查 `~/.claude/skills/ailab/SKILL.md` 是否存在且內容對。

---

## 多機 git 同步流程（重要）

### 改 skill 的標準流程

```
[在任一機器]
1. 編輯 wiki/ailab/skill/SKILL.md（主版）
2. git add wiki/ailab/skill/SKILL.md
3. git commit -m "feat(wiki): ailab - 改 skill 主版"
4. git push origin main

[在其他機器]
5. cd ~/jacky-wiki && git pull --rebase origin main
6. 方案 A（symlink）：自動跟新，無需動作
   方案 B（copy）：重跑 cp 把主版複製到 ~/.claude/skills/ailab/SKILL.md
```

### 衝突避免

- **不要直接編輯 `~/.claude/skills/ailab/SKILL.md`**——只改主版
- 所有機器以 `<jacky-wiki>/wiki/ailab/skill/SKILL.md` 為唯一真相
- git pull 前先 commit 本機改動（雖然方案 A symlink 不會有 working tree 改動）

---

## 同時安裝其他 ailab 相關檔案

ailab 域的所有內容已隨 wiki repo 同步：

```
<jacky-wiki>/wiki/ailab/
├── AI實踐索引.md
├── concepts/      (協定、漏斗、演化元方法、工具觀、學習方法、跨機部署)
├── tools/         (工具棧索引、claude-code、codex-cli、mcp、模型選擇、auto-memory)
├── patterns/      (模式索引)
├── experiments/   (Q2 實驗清單)
├── log/           (重大里程碑)
├── reading/       (閱讀索引)
├── inbox/         (未升格事件)
└── skill/         (本 SKILL.md 主版 + INSTALL.md)
```

→ git pull 後全部同步，**只需要把 skill/SKILL.md 額外鏈接到 ~/.claude/skills/ailab/**。

---

## 跨模型部署

→ 詳見 [跨機與跨模型部署](../concepts/跨機與跨模型部署.md)（Codex CLI / Gemini Gem / ChatGPT 等）

---

## 故障排除

| 症狀 | 可能原因 | 解 |
|---|---|---|
| `/ailab` 沒反應 | skill 沒裝 | 跑安裝指令 |
| `/ailab` 反應但找不到 wiki | wiki repo 不在預期路徑 | 設 `JACKY_WIKI_HOME` 環境變數 |
| 多機 inbox 不同步 | git pull 沒跑或有衝突 | `git pull --rebase origin main` |
| symlink 無效（Windows）| 沒開 Developer Mode | 改用方案 B copy |
| WSL2 跟 Windows skill 不同步 | 兩個 home 目錄分開 | 兩邊都裝 |
