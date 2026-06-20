---
title: 移機 Skill 安裝指南
domain: jos
updated: 2026-06-21
---

# 移機 Skill 多機安裝指南

> canonical 主版：`<jacky-wiki>/wiki/jos/skill/SKILL.md`
> 各機需放到 `~/.claude/skills/移機/SKILL.md` 才能觸發 `/移機`。

---

## 前置

1. 已 clone wiki repo（見 [換電腦SOP](../migration/換電腦SOP.md) 步驟 2）。
2. 設好 `JACKY_WIKI_HOME`（見 [環境變數清單](../environment/環境變數清單.md)）。

---

## Windows（Copy，推薦）

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills\移機" | Out-Null
Copy-Item "$env:USERPROFILE\jacky-wiki\wiki\jos\skill\SKILL.md" `
          "$env:USERPROFILE\.claude\skills\移機\SKILL.md" -Force
```
之後 wiki 更新主版後，重跑上面的 `Copy-Item`。

## Ubuntu / macOS / WSL2（Symlink，推薦）

```bash
mkdir -p ~/.claude/skills/移機
ln -sf ~/jacky-wiki/wiki/jos/skill/SKILL.md ~/.claude/skills/移機/SKILL.md
```
git pull 後自動跟新。

---

## 驗證

Claude Code 打 `/移機` → 有反應（顯示 jos 域索引）= 成功。

---

## 改 skill 標準流程

1. 改主版 `wiki/jos/skill/SKILL.md`
2. `git commit -m "feat(wiki): jos - 改移機 skill 主版"` → push
3. 其他機 `git pull --rebase origin main`
4. symlink 自動跟；copy 法重跑 Copy-Item

> 不要直接改 `~/.claude/skills/移機/SKILL.md`——只改主版。

---

## 相關

- skill 主版 → [SKILL.md](SKILL.md)
- 全部 skill 安裝 → [skill總索引](../skills/skill總索引.md)
