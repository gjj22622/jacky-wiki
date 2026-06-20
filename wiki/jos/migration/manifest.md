---
title: 機器狀態快照（manifest）
domain: jos
updated: 2026-06-21
---

# 機器狀態快照（manifest）

> 這台機器**現在**的狀態快照。由 `/移機 capture` 自動刷新。換機時對照它，確認新機與舊機一致。
> 這是「事實紀錄」，不是教學——教學在 [換電腦SOP](換電腦SOP.md)。

---

## 快照資訊

- **基準機器**：Windows 主機（Windows 11 Pro 10.0.26200）
- **快照時間**：2026-06-21
- **產生方式**：`/移機 capture`

---

## CLI 版本（本機實測）

| 工具 | 版本 |
|---|---|
| claude | 2.1.183 |
| git | 2.53.0.windows.2 |
| node | v24.14.0 |
| npm | 11.9.0 |
| docker | 29.3.1 |
| gh | 2.87.3 |
| python | 3.12.9 |
| pip | 24.3.1 |

## 個人 Skill（16 支）

admin-token-backend, ailab, deck-final-check, graphify, huashu-design,
internal-training, jacky-wiki, j-bo, journal-chinese-forestry,
journal-ecological-informatics, kickoff, seminar-helper, survey-analysis,
tbsa-forms, tts-script, wrap-up

> 加上本次新增的 **移機**、**作品** 兩支 → 共 18 支。

## Plugin（4 個）

codex（openai-codex）, zeabur（zeabur）, frontend-design（claude-plugins-official）, claude-code-setup（claude-plugins-official）

## MCP 伺服器

Google Drive, Gmail, Google Calendar, Canva, Gamma, twinkle（opendata/twtools）

## 環境變數（名稱）

JACKY_WIKI_HOME, ANYTHINGLLM_API_KEY, OPENROUTER_API_KEY, MEMBERS_JSON
（值不記錄——見 [環境變數清單](../environment/環境變數清單.md)）

## 自建程式

`~/bin/ffmpeg.exe`；`~/.claude/` 客製：settings.json / statusline-command.js / CLAUDE.md

---

## 怎麼刷新這份快照

裝了新 CLI / skill / plugin 後，在 Claude Code 打：
```
/移機 capture
```
它會重掃本機、更新本頁與相關清單，並提示 commit。

---

## 相關連結

- 換機步驟 → [換電腦SOP](換電腦SOP.md)
- 驗收 → [還原檢查清單](還原檢查清單.md)
- 域首頁 → [作業系統索引](../作業系統索引.md)
