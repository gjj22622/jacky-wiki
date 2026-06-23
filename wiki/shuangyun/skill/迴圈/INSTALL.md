---
title: 迴圈 skill 安裝（多平台）
domain: shuangyun
updated: 2026-06-23
---

# /迴圈 安裝指南

> canonical：`<jacky-wiki>/wiki/shuangyun/skill/迴圈/SKILL.md`
> 執行版：`~/.claude/skills/迴圈/SKILL.md`

## 還原（換機 / 學員安裝）

**Windows（PowerShell）**：
```powershell
$src = "$env:USERPROFILE\jacky-wiki\wiki\shuangyun\skill\迴圈"
$dst = "$env:USERPROFILE\.claude\skills\迴圈"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item "$src\SKILL.md" "$dst\SKILL.md" -Force
```

**Mac / Ubuntu / WSL2**：
```bash
src="$HOME/jacky-wiki/wiki/shuangyun/skill/迴圈"
dst="$HOME/.claude/skills/迴圈"
mkdir -p "$dst"
cp "$src/SKILL.md" "$dst/SKILL.md"
```

## 註冊
在 `~/.claude/CLAUDE.md` 確認有 `# 迴圈` 區塊。

## 依賴
純方法論 + Claude Code 內建 subagent 編排，無外部依賴。要連外部工具走 MCP。

## 驗證
在 Claude Code 輸入 `/迴圈`，出現「拆→設計→跑」導覽＝裝好。
