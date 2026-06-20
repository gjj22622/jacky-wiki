---
title: CLI 工具清單（命令列）
domain: jos
updated: 2026-06-21
---

# CLI 工具清單（命令列）

> 命令列工具。每項都附「安裝指令」與「驗證指令」（跑驗證指令有版本號跑出來 = 裝好了）。
> 桌面 GUI 應用另見 [軟體清單](軟體清單.md)。

---

## 主表

| 工具 | 用途 | Windows 安裝 | Ubuntu 安裝 | 驗證指令 | 本機版本 |
|---|---|---|---|---|---|
| **claude** | Claude Code 主程式 | 見 claude.ai/code | 見 claude.ai/code | `claude --version` | 2.1.183 |
| **git** | 版本控制 | `winget install Git.Git` | `sudo apt install git` | `git --version` | 2.53.0 |
| **node** | JS 執行環境 | `winget install OpenJS.NodeJS.LTS` | `sudo apt install nodejs` | `node -v` | v24.14.0 |
| **npm** | Node 套件管理（隨 node）| （隨 node）| （隨 node）| `npm -v` | 11.9.0 |
| **docker** | 容器（AI 大腦倉庫）| `winget install Docker.DockerDesktop` | `sudo apt install docker.io` | `docker --version` | 29.3.1 |
| **gh** | GitHub CLI | `winget install GitHub.cli` | `sudo apt install gh` | `gh --version` | 2.87.3 |
| **python** | 部分 skill 依賴 | `winget install Python.Python.3.12` | `sudo apt install python3` | `python --version` | 3.12.9 |
| **pip** | Python 套件管理 | （隨 python）| `sudo apt install python3-pip` | `pip --version` | 24.3.1 |
| **codex** | Codex CLI（GPT-5.4，第二意見）| 見 Codex 官方 | 見 Codex 官方 | `codex --version` | （plugin 形式，見下）|

> **codex** 在 Jacky 的環境是以 Claude Code **plugin**（`codex@openai-codex`）形式整合，不是獨立 CLI。重裝方式見 [plugin與市集](../skills/plugin與市集.md)。

---

## 驗證全部一次跑完（換機後貼這段）

**Windows PowerShell**：
```powershell
claude --version; git --version; node -v; npm -v; docker --version; gh --version; python --version
```

**Ubuntu / macOS / WSL2**：
```bash
claude --version && git --version && node -v && npm -v && docker --version && gh --version && python3 --version
```

每行都有版本號跑出來 = 全部裝好。哪行報「command not found / 不是內部或外部命令」= 那個還沒裝，回去裝它。

---

## 安裝小抄（Windows winget 一次裝四個）

```powershell
winget install Git.Git
winget install OpenJS.NodeJS.LTS
winget install Docker.DockerDesktop
winget install GitHub.cli
```

> `winget` 是 Windows 11 內建的套件管理器。若提示找不到 winget，先到 Microsoft Store 更新「應用程式安裝程式（App Installer）」。

---

## 相關連結

- GUI 軟體 → [軟體清單](軟體清單.md)
- 換機步驟 → [換電腦SOP](../migration/換電腦SOP.md)
- 域首頁 → [作業系統索引](../作業系統索引.md)
