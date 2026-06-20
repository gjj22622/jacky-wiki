---
title: Plugin 與市集
domain: jos
updated: 2026-06-21
---

# Plugin 與市集

> Claude Code 的 plugin（從市集 marketplace 安裝）。跟個人 skill 不同：plugin **不從 wiki 複製**，而是在新機重新安裝（`/plugin`）。
> 個人 skill 還原 → [skill總索引](skill總索引.md)

---

## 已啟用的 Plugin（4 個）

| Plugin | 市集 | 用途 |
|---|---|---|
| **codex** | `openai-codex` | 呼叫 Codex CLI（GPT-5.4）做跨檔重構 / 第二意見 / 救援 |
| **zeabur** | `zeabur` | Zeabur 部署相關（deploy / domain / database / template…）|
| **frontend-design** | `claude-plugins-official` | 高品質前端介面生成 |
| **claude-code-setup** | `claude-plugins-official` | Claude Code 設定推薦器（hook/subagent/skill 建議）|

> 啟用狀態記在 `~/.claude/settings.json` 的 `enabledPlugins`。

---

## 換機重裝步驟

1. 在 Claude Code 內輸入 `/plugin`（開 plugin 管理介面）。
2. 確認市集已加入（`openai-codex` / `zeabur` / `claude-plugins-official`）；沒有就先 add marketplace。
3. 逐一安裝上表 4 個 plugin 並啟用。
4. plugin 的 skill（如 zeabur 的一整組、codex 的 rescue/setup）會隨 plugin 自動帶入，**不需要手動複製**。

> 或者：直接把舊機的 `~/.claude/settings.json`（含 `enabledPlugins`）複製過去，新機首次啟動會自動拉取 plugin 快取。但仍建議用 `/plugin` 確認都裝好。

---

## Plugin vs 個人 Skill 的差別

| | 個人 Skill | Plugin |
|---|---|---|
| 來源 | Jacky 自己寫 | 市集下載 |
| 還原方式 | 從 wiki `個人skills/` 複製 | `/plugin` 重新安裝 |
| 放哪 | `~/.claude/skills/<名稱>/SKILL.md` | `~/.claude/plugins/cache/...`（自動）|
| 改它 | 改 SKILL.md | 不改（跟著市集版本）|

---

## 相關連結

- 個人 skill → [skill總索引](skill總索引.md)
- 工具觀（codex 為什麼用）→ [ailab/tools/codex-cli.md](../../ailab/tools/codex-cli.md)
- 換機步驟 → [換電腦SOP](../migration/換電腦SOP.md)
