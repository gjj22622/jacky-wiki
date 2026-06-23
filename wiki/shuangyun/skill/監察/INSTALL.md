---
title: 監察 skill 安裝（多平台）
domain: shuangyun
updated: 2026-06-22
---

# /監察 安裝指南

> canonical 主版：`<jacky-wiki>/wiki/shuangyun/skill/監察/`
> 執行版：`~/.claude/skills/監察/`（含 `scripts/`）

## 還原（換機 / 新機）

**Windows（PowerShell）**：
```powershell
$src = "$env:USERPROFILE\jacky-wiki\wiki\shuangyun\skill\監察"
$dst = "$env:USERPROFILE\.claude\skills\監察"
New-Item -ItemType Directory -Force -Path "$dst\scripts" | Out-Null
Copy-Item "$src\SKILL.md" "$dst\SKILL.md" -Force
Copy-Item "$src\scripts\*" "$dst\scripts\" -Force
```

**Mac / Ubuntu / WSL2**：
```bash
src="$HOME/jacky-wiki/wiki/shuangyun/skill/監察"
dst="$HOME/.claude/skills/監察"
mkdir -p "$dst/scripts"
cp "$src/SKILL.md" "$dst/SKILL.md"
cp "$src"/scripts/* "$dst/scripts/"
```

## 註冊

在 `~/.claude/CLAUDE.md` 確認有 `# 監察` 區塊（見主版說明）。`/移機 sync` 會把本機 skill 回寫 master 快照。

## 依賴
- `node`（scan_content/perms/logs.mjs）、`bash + grep + git`（scan_secrets.sh）、`ffmpeg`（非必要）。
- 跑 e/f 設定檢查需 ADMIN_SECRET（環境變數或 `.zeabur-secrets.local.txt`），拿不到則降級為讀 `data/admin-config.json`。

## 驗證
```bash
node ~/.claude/skills/監察/scripts/scan_content.mjs "<平台 repo 路徑>"
```
有 JSON 輸出且不報錯 = 裝好。
