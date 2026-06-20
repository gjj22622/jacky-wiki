---
title: 作品 Skill 安裝指南
domain: portfolio
updated: 2026-06-21
---

# 作品 Skill 多機安裝指南

> canonical 主版：`<jacky-wiki>/wiki/portfolio/skill/SKILL.md`
> 各機需放到 `~/.claude/skills/作品/SKILL.md` 才能觸發 `/作品`。

---

## 前置

1. 已 clone wiki repo。
2. 設好 `JACKY_WIKI_HOME`（見 [jos/環境變數清單](../../jos/environment/環境變數清單.md)）。
3. （可選）金庫 `.vault/作品金鑰.local.json` 從舊機/OneDrive 搬過來——它不隨 git 同步。

---

## Windows（Copy，推薦）

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills\作品" | Out-Null
Copy-Item "$env:USERPROFILE\jacky-wiki\wiki\portfolio\skill\SKILL.md" `
          "$env:USERPROFILE\.claude\skills\作品\SKILL.md" -Force
```
wiki 更新主版後，重跑 `Copy-Item`。

## Ubuntu / macOS / WSL2（Symlink，推薦）

```bash
mkdir -p ~/.claude/skills/作品
ln -sf ~/jacky-wiki/wiki/portfolio/skill/SKILL.md ~/.claude/skills/作品/SKILL.md
```

---

## 驗證

Claude Code 打 `/作品` → 有反應（顯示作品索引）= 成功。

---

## 改 skill 標準流程

1. 改主版 `wiki/portfolio/skill/SKILL.md`
2. `git commit -m "feat(wiki): portfolio - 改作品 skill 主版"` → push
3. 其他機 `git pull --rebase` → symlink 自動跟 / copy 法重跑

> 金庫 `.vault/` 不進 git，各機自行維護（見 [README](../README.md)）。

---

## 相關

- skill 主版 → [SKILL.md](SKILL.md)
- 金庫機制 → [README](../README.md)
