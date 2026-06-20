---
title: 機器狀態快照（manifest，分機器）
domain: jos
updated: 2026-06-21
---

# 機器狀態快照（manifest）

> 每台機器**現在**的狀態快照。由各機自己跑 `/移機 capture` 填入**自己那段**（不覆蓋別台）。
> 兩台機器是否一致 → 看 [環境一致性](環境一致性.md) 的比對表。
> 這是「事實紀錄」，不是教學——教學在 [換電腦SOP](換電腦SOP.md)。

> ⚠️ **多機規則**：`/移機 capture` 會偵測作業系統，只更新**該機對應的那個 `##` 區段**。
> 在 Windows 跑 → 更新「Windows 主機」段；在 Linux 跑 → 更新「G2 mini (Ubuntu)」段。

---

## Windows 主機

- **OS**：Windows 11 Pro（10.0.26200）
- **角色**：主力開發機
- **快照時間**：2026-06-21（`/移機 capture`）
- **jacky-wiki 路徑**：`C:\Users\gjj22\jacky-wiki`

### CLI 版本

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

### 個人 Skill（18 支）

admin-token-backend, ailab, deck-final-check, graphify, huashu-design,
internal-training, jacky-wiki, j-bo, journal-chinese-forestry,
journal-ecological-informatics, kickoff, seminar-helper, survey-analysis,
tbsa-forms, tts-script, wrap-up, **移機**, **作品**

### Plugin（4）

codex, zeabur, frontend-design, claude-code-setup

### MCP

Google Drive, Gmail, Google Calendar, Canva, Gamma, twinkle

### 自建程式

`~/bin/ffmpeg.exe`；`~/.claude/` 客製：settings.json / statusline-command.js / CLAUDE.md

---

## G2 mini (Ubuntu)

> 🔲 **待 capture**：在 Linux 機跑 `/移機 capture`，它會自動填這一段並列出與 Windows 的差異。
> （在這之前以下為**預期值/未知**，請以 capture 實測為準。）

- **OS**：Ubuntu
- **角色**：副機 / 常駐
- **快照時間**：尚未 capture
- **jacky-wiki 路徑**：`/home/jacky/jacky-wiki`

### CLI 版本

| 工具 | 版本 |
|---|---|
| claude | 待 capture |
| git | 待 capture |
| node | 待 capture |
| npm | 待 capture |
| docker | 待 capture |
| gh | 待 capture |
| python3 | 待 capture |

### 個人 Skill

待 capture（Linux 上實際裝了哪幾支，capture 會列出；可能與 Windows 不同——這正是要比對的）

### Plugin / MCP / 自建程式

待 capture

---

## 怎麼刷新

在**該台機器**的 Claude Code 打：
```
/移機 capture
```
它偵測 OS → 只更新該機區段 → 列出與另一台的差異 → 提示 commit。
比對結果記到 [環境一致性](環境一致性.md)。

---

## 相關連結

- 環境一致性比對 → [環境一致性](環境一致性.md)
- 換機步驟 → [換電腦SOP](換電腦SOP.md)
- 驗收 → [還原檢查清單](還原檢查清單.md)
- 域首頁 → [作業系統索引](../作業系統索引.md)
