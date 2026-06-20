---
title: 機器狀態快照（manifest，分機器）
domain: jos
updated: 2026-06-21
last_capture: G2 mini (Ubuntu) @ 2026-06-21
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

- **OS**：Ubuntu 24.04.4 LTS（Noble Numbat，kernel 6.8.0-124）
- **hostname**：`jacky-agent`
- **角色**：副機 / 常駐（personal-agent daemon 所在）
- **快照時間**：2026-06-21（`/移機 capture`）
- **jacky-wiki 路徑**：`/home/jacky/jacky-wiki`

### CLI 版本

| 工具 | 版本 |
|---|---|
| claude | 2.1.185 |
| git | 2.43.0 |
| node | **v24.17.0**（nvm，2026-06-21 升級）|
| npm | 11.13.0 |
| docker | 29.4.0 |
| gh | 2.90.0 |
| python3 | 3.12.3 |
| pip | 24.0 |

### 個人 Skill（17 支）

ailab, daemon-status, gen-image, graphify, huashu-design, internal-training,
invest-advisor, jacky-wiki, jdong-wiki, jwood-analytics, kickoff, seminar-helper,
tbsa-forms, utm-shortlink, wrap-up, **移機**, **作品**

> ✅ `utm-shortlink` 原存錯路徑（檔案而非目錄/SKILL.md），2026-06-21 已修為 `utm-shortlink/SKILL.md`，現可載入。
> Linux 獨有（Windows 沒有）：daemon-status, gen-image, invest-advisor, jdong-wiki, jwood-analytics, utm-shortlink
> Windows 獨有（Linux 沒有）：admin-token-backend, deck-final-check, j-bo, journal-chinese-forestry, journal-ecological-informatics, survey-analysis, tts-script

### Plugin（2）

claude-code-setup（user）、resend（project: personal-agent）

### MCP（6，claude.ai 遠端）

Google Drive ✔、Gmail ✔、Google Calendar ✔（已連線）；twinkle / Canva / Gamma（待授權）

### 自建程式 / runtime 注意

- `~/bin/` 空；`~/.claude/` 客製：settings.json / settings.local.json / remote-settings.json / statusline-command.sh / CLAUDE.md
- ⚠️ **node 三來源並存**（換機/排查必看）：
  - 使用者 `node`（PATH 第一）= `~/.local/bin/node` → **symlink 指向 nvm v24.17.0**（dev 用，2026-06-21 設）
  - `~/.hermes/node/bin/node` = **v22.22.2，hermes-agent 自帶 runtime，勿動**（動了會壞常駐 agent）
  - `/usr/bin/node` = apt v18（系統殘留，沒用到）
- nvm 安裝於 `~/.nvm`（v0.40.5），default alias → 24

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
