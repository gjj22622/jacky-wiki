---
event: 把 ~/.claude/skills 推上 GitHub repo 做跨機／跨環境／跨 AI 同步
date: 2026-05-09
model: claude-opus-4.7
context: 個人 AI 工作流（多機 skill 部署）
type: 工作流改進
maturity: 已驗證
tags: skill-sync, github, claude-code, multi-machine, jacky-claude-skills, deploy, cross-model
---

## 發生了什麼

把整個 `~/.claude/skills/` 推上 GitHub repo `gjj22622/jacky-claude-skills`，當作 skill 棧的 source of truth。新機器／新環境啟用只要一行 `git clone`，就有完整 skill 棧；本機改完 skill `push` 上去，其他機器 `git pull` 即更新；其他 AI（Codex / Gemini）需要時也能 clone 拿同一份協定／prompt 來用。

## 為什麼重要

之前各機 skill 各自為政：手動複製 SKILL.md、各機 symlink、或對 ailab skill 用 jacky-wiki canonical 主版 + 各機執行版。改動難同步、新機要從零裝、版本容易飄。

GitHub 當中央倉後：
1. **新機部署一行解決**：`git clone … skills` 完成所有 skill 安裝
2. **跨機改動同步靠 git pull**：不用手動再複製
3. **跨 AI 共用同一份 prompt／協定**：Codex / Gemini 也能 clone 拿
4. **版本控 + PR 審查**：每次 skill 改動有 git diff，可回溯、可審

把 ailab 協定講的「跨機部署」從「人工複製或 symlink」升級到「git pull」。

## 怎麼做的

### 第一次 clone（新機器）

```powershell
cd $env:USERPROFILE\.claude
git clone https://github.com/gjj22622/jacky-claude-skills.git skills
```

若 `skills` 資料夾已存在且非空，先備份：

```powershell
cd $env:USERPROFILE\.claude
Rename-Item skills skills_backup
git clone https://github.com/gjj22622/jacky-claude-skills.git skills
```

### 例行同步

- 拉最新：`cd $env:USERPROFILE\.claude\skills; git pull origin main`
- 推本機改動：`git add -A; git commit -m "feat(skills): …"; git push origin main`

### 雙機 SOP

- 每次**開工前** `git pull`
- **收工前** `git push`
- 避免雙頭改動同檔造成衝突

## 對比與替代

| 做法 | 缺點 | 結論 |
|---|---|---|
| 手動複製 SKILL.md 到各機 | 容易漏、版本飄、新機從零 | 棄用 |
| 單機 symlink | 解單機軟連結；跨機無解 | 解決不同問題 |
| jacky-wiki/ailab/skill/ canonical 主版 + 各機執行版 | 只對 ailab skill 有效，其他 skill 沒這層 | ailab 留用，其他 skill 改走 git repo |
| **GitHub repo（本案）** | 需手動 push/pull、要管衝突 | ⭐ 採用——所有 skill 一起管、版本控完整 |

兩條路線並存：
- **ailab skill** → 雙生：canonical 在 jacky-wiki，執行版在 jacky-claude-skills
- **其他 skill** → 直接住在 jacky-claude-skills 即可

## 連結與出處

- Repo：<https://github.com/gjj22622/jacky-claude-skills>
- 本機路徑：`~/.claude/skills/` （= `C:\Users\gjj22\.claude\skills`）
- 相關協定：[跨機與跨模型部署](../concepts/跨機與跨模型部署.md)
- 對話：2026-05-09 與 Claude Opus 4.7 主對話

## 升格目標

建議：

1. **update** `<jacky-wiki>/wiki/ailab/concepts/跨機與跨模型部署.md` — 補一段「**Skill 同步策略**：用 GitHub repo `jacky-claude-skills` 做 source of truth，clone / pull / push SOP（含雙機開工收工流程）」
2. **update** `<jacky-wiki>/wiki/ailab/tools/claude-code.md` — 補一條「Skill 跨機同步用 git repo（不用手動複製或 symlink）」
3. ailab skill 雙生策略保留：canonical 仍在 wiki，執行版同步進 jacky-claude-skills repo

---

[已升格 → ailab/concepts/跨機與跨模型部署.md「Skill 棧同步策略（兩條路線並存）」段 + ailab/tools/claude-code.md「Skill 跨機同步」段，2026-05-09]
