---
title: 換電腦 SOP（新手友善逐步版）
domain: jos
updated: 2026-06-21
---

# 換電腦 SOP

> 🎯 **目標**：拿到一台全新電腦，照這份做完，就回到 Jacky 原本的 AI 工作狀態。
> 👶 **寫給誰看**：就算你是電腦新手、AI 新手，照著複製貼上也能做完。
> 🤖 **更快的方法**：打開 Claude Code 輸入 `/移機 restore`，它會牽著你一步步走、能自動的幫你自動跑。
>
> 📌 **現階段是「照步驟手動執行」**。未來會進化成一支腳本一鍵跑完（先求穩、再求快）。

---

## 開始之前：看懂這份文件的格式

每一步都長這樣：

> **這步在做什麼**（一句白話）
> 👉 **複製這行指令貼到終端機，按 Enter**
> ✅ **成功會看到**：……
> ❌ **失敗怎麼辦**：……

「終端機」= Windows 的 **PowerShell**（開始選單搜「PowerShell」打開）；Mac/Ubuntu 的 **Terminal**。

每步分 **Windows** 和 **Mac/Ubuntu** 兩版，用你的系統那版就好。

---

## 步驟 0：先確認你有這些帳號

換機前手邊要有（不是電腦上的東西，是帳號密碼）：

- [ ] **Claude 帳號**（登入 Claude Code 用，跟舊機同一個）
- [ ] **GitHub 帳號**（clone wiki repo 用）
- [ ] **各服務金鑰**：OpenRouter、AnythingLLM 的 API key（要跑 AI 大腦才需要；去各自後台拿，見 [環境變數清單](../environment/環境變數清單.md)）

> 沒有這些，後面有些步驟會卡住。先備齊。

---

## 步驟 1：裝 Git

> Git 是版本控制工具，等下要用它把整個 wiki 下載下來。

**Windows**（PowerShell）：
👉
```powershell
winget install Git.Git
```
**Mac**：
👉
```bash
xcode-select --install
```
**Ubuntu**：
👉
```bash
sudo apt update && sudo apt install -y git
```

✅ **成功會看到**：裝完後**重開終端機**，打 `git --version`，跑出 `git version 2.x.x`。
❌ **失敗**：Windows 說找不到 `winget` → 去 Microsoft Store 更新「應用程式安裝程式（App Installer）」再試。

---

## 步驟 2：把 wiki 下載到電腦（clone repo）

> 這一步會把 Jacky 整個知識庫 + 這套作業系統的所有清單下載下來。

**Windows**：
👉
```powershell
cd $env:USERPROFILE
git clone https://github.com/gjj22622/jacky-wiki.git
```
**Mac / Ubuntu / WSL2**：
👉
```bash
cd ~
git clone https://github.com/gjj22622/jacky-wiki.git
```

✅ **成功會看到**：跑完後 `~/jacky-wiki`（Windows 是 `C:\Users\你\jacky-wiki`）這個資料夾出現，裡面有 `wiki/`、`CLAUDE.md` 等。
❌ **失敗**：
- 要求登入 → 用 GitHub 帳號登入（或先 `gh auth login`，見步驟 6）。
- 說資料夾已存在 → 那台可能已經 clone 過，跳過這步。

---

## 步驟 3：裝 Node.js，再裝 Claude Code

> Claude Code 是整套作業系統的核心（主 IDE）。它需要 Node.js 才能跑。

**先裝 Node.js**

**Windows**：
👉
```powershell
winget install OpenJS.NodeJS.LTS
```
**Mac**：
👉
```bash
brew install node
```
**Ubuntu**：
👉
```bash
sudo apt install -y nodejs npm
```

✅ 重開終端機，打 `node -v`，跑出 `v24.x`（或更新）。

**再裝 Claude Code**

👉 到 https://claude.ai/code 依官網指示安裝（各平台不同）。
✅ 裝完打 `claude --version`，跑出 `2.x.x (Claude Code)`。
裝完後先 **登入**：打開 Claude Code，用你的 Claude 帳號登入（跟舊機同一個）。

---

## 步驟 4：設環境變數（讓 skill 找得到 wiki）

> 設一個叫 `JACKY_WIKI_HOME` 的變數指向 wiki 資料夾，skill 才不會找錯路。

**Windows**（PowerShell）：
👉 先開設定檔：
```powershell
if (-not (Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
notepad $PROFILE
```
在打開的記事本**最後一行**貼上、存檔：
```powershell
$env:JACKY_WIKI_HOME = "$env:USERPROFILE\jacky-wiki"
```
**Mac / Ubuntu / WSL2**：
👉
```bash
echo 'export JACKY_WIKI_HOME="$HOME/jacky-wiki"' >> ~/.bashrc
source ~/.bashrc
```
（用 zsh 的把 `~/.bashrc` 換成 `~/.zshrc`）

✅ **成功會看到**：**重開終端機**，打 `echo $env:JACKY_WIKI_HOME`（Win）或 `echo $JACKY_WIKI_HOME`（Mac/Ubuntu），跑出 wiki 路徑。
❌ **失敗**：跑出空白 → 設定檔沒存到、或沒重開終端機。重做一次。

---

## 步驟 5：把 skill 複製回電腦

> 16 支個人 skill 都備份在 wiki 裡。這步把它們複製到 Claude Code 會讀的位置（`~/.claude/skills/`）。

**Windows**：
👉
```powershell
$src = "$env:USERPROFILE\jacky-wiki\wiki\jos\skills\個人skills"
Get-ChildItem "$src\*.md" | ForEach-Object {
    $dst = "$env:USERPROFILE\.claude\skills\$($_.BaseName)"
    New-Item -ItemType Directory -Force -Path $dst | Out-Null
    Copy-Item $_.FullName "$dst\SKILL.md" -Force
    Write-Host "restored $($_.BaseName)"
}
```
**Mac / Ubuntu / WSL2**：
👉
```bash
src="$HOME/jacky-wiki/wiki/jos/skills/個人skills"
for f in "$src"/*.md; do
  name=$(basename "$f" .md)
  mkdir -p "$HOME/.claude/skills/$name"
  cp "$f" "$HOME/.claude/skills/$name/SKILL.md"
  echo "restored $name"
done
```

✅ **成功會看到**：印出一串 `restored xxx`（18 個）。重開 Claude Code，打 `/wiki` 有反應 = 成功。
❌ **失敗**：
- `/wiki` 沒反應 → 先確認檔案真的在：Windows `Test-Path "$env:USERPROFILE\.claude\skills\jacky-wiki\SKILL.md"`（應回 `True`）；Mac/Ubuntu `ls ~/.claude/skills/jacky-wiki/SKILL.md`。
- 指令整段沒印任何 `restored` → `$src` 路徑錯（wiki 沒 clone 到預期位置）→ 回步驟 2、4 確認。

> 進階：移機 / 作品 / ailab 三支有更完整的 canonical 主版（含安裝指南）。要用主版安裝，分別看
> `wiki/jos/skill/INSTALL.md`、`wiki/portfolio/skill/INSTALL.md`、`wiki/ailab/skill/INSTALL.md`。

---

## 步驟 6：裝其他 CLI 工具

> GitHub CLI、Docker 等。一次裝齊。

**Windows**：
👉
```powershell
winget install GitHub.cli
winget install Docker.DockerDesktop
winget install Python.Python.3.12
```
**Ubuntu**：
👉
```bash
sudo apt install -y gh docker.io python3 python3-pip
```
**Mac**：
👉
```bash
brew install gh
brew install python
brew install --cask docker
```

裝完登入 GitHub CLI：
👉 `gh auth login`（照提示用瀏覽器登入）

✅ 驗證全部（[CLI工具清單](../environment/CLI工具清單.md) 有完整驗證指令）：
```powershell
git --version; node -v; npm -v; gh --version; docker --version; python --version
```
每行都有版本 = 都裝好。

> 完整 GUI 軟體清單（VS Code、OneDrive…）→ [軟體清單](../environment/軟體清單.md)。

---

## 步驟 7：重裝 Plugin

> codex / zeabur / frontend-design / claude-code-setup 這 4 個 plugin。

👉 在 Claude Code 內輸入 `/plugin`，照介面把這 4 個裝起來並啟用。
✅ **成功會看到**：4 個 plugin 都標記為已啟用（可在 Claude Code 的 Settings → Plugins 確認都打勾）。
詳見 [plugin與市集](../skills/plugin與市集.md)。

---

## 步驟 8：重新認證 MCP（連 Drive / Gmail / Calendar…）

> MCP 是連到外部服務的橋。換機要重新授權一次。

👉 在 Claude Code 內，第一次叫用某個 MCP（例如請 Claude 讀 Google Drive），它會跳**授權連結** → 瀏覽器點開、登入對應服務、按同意。
詳見 [MCP伺服器清單](../environment/MCP伺服器清單.md)。

---

## 步驟 9：補金鑰與自建程式（要跑 AI 大腦 / 特定 skill 才需要）

> 金鑰**不在 wiki 裡**（紅線）。要跑 AI 大腦的話，去各服務後台重新拿，填回 `.env`。

**先判斷：你需要做這步嗎？**

| 你打算做什麼 | 這步要做嗎 |
|---|---|
| 只用 wiki 查詢、`/wiki` `/開工` `/收工` `/移機` `/作品` 等 | ❌ 不用，跳到步驟 10 |
| 要跑 tts/影音/問卷分析等 skill | ⚠️ 只需補 `~/bin/`（ffmpeg）+ python，不用金鑰 |
| 要跑 AI 大腦（倉庫 + 履約 API）| ✅ 要補金鑰到 `.env` + 還原 settings.json |


- AI 大腦金鑰 → [環境變數清單](../environment/環境變數清單.md) 照「值去哪拿」那欄補。
- `~/bin/`（如 `ffmpeg.exe`，tts/影音 skill 需要）→ [自建程式清單](../environment/自建程式清單.md)。
- `~/.claude/settings.json`、`statusline-command.js`、`~/.claude/CLAUDE.md` → 從舊機複製或自己的備份還原（[自建程式清單](../environment/自建程式清單.md)）。

---

## 步驟 10：驗收

👉 打開 [還原檢查清單](還原檢查清單.md)，一項一項打勾。全綠 = 轉移完成 🎉

或在 Claude Code 打 `/移機 restore`，讓它幫你逐項確認。

---

## 三平台路徑對照（隨手查）

| 東西 | Windows | Mac / Ubuntu / WSL2 |
|---|---|---|
| wiki repo | `C:\Users\你\jacky-wiki` | `~/jacky-wiki` |
| skill 放哪 | `%USERPROFILE%\.claude\skills\` | `~/.claude/skills/` |
| 終端機 | PowerShell | Terminal |
| 家目錄 | `$env:USERPROFILE` | `$HOME` 或 `~` |

---

## 常見卡關

| 症狀 | 原因 | 解 |
|---|---|---|
| `/wiki` `/移機` 沒反應 | skill 沒複製到位 | 重做步驟 5 |
| skill 反應但找不到 wiki | `JACKY_WIKI_HOME` 沒設 | 重做步驟 4，重開終端機 |
| `winget` 找不到 | App Installer 太舊 | Microsoft Store 更新 |
| clone 要求密碼一直失敗 | 沒登入 GitHub | 步驟 6 `gh auth login` |
| WSL2 裡 skill 沒用 | WSL2 的 `~/.claude` 跟 Windows 分開 | 兩邊都跑步驟 5 |

---

## 相關連結

- 一鍵還原（給 AI 跑）→ `/移機 restore`，主版 [skill/SKILL.md](../skill/SKILL.md)
- 驗收 → [還原檢查清單](還原檢查清單.md)
- 機器快照 → [manifest](manifest.md)
- 域首頁 → [作業系統索引](../作業系統索引.md)
