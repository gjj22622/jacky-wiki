---
event: Wiki canonical skill 讓多個 AI 共用
date: 2026-06-28
model: gpt-5-codex
context: TBSA 開課流程自動化與 jacky-wiki
type: 工作流改進
maturity: 已驗證
tags: skill, wiki, canonical, junction, symlink, claude, codex, multi-ai
---

## 發生了什麼

把 `jacky-course-prep-loop` 的唯一主版放進 jacky-wiki，再以 Windows Junction 暴露到 Codex 全域 skills；Claude Code 使用同一 canonical 來源的 Junction／symlink 安裝指令。Skill 的流程、監察 AI LOOP、視覺規範與後續版本都只需修改 Wiki 主版。

## 為什麼重要

解決同一個 Skill 在 Claude、Codex、不同工作目錄各存一份而逐漸漂移的問題。知識、版本、執行入口與跨機同步合併成一條可追溯發布鏈，其他模型也能透過 prompt／instructions 包裝讀同一真相源。

## 怎麼做的

1. canonical：`<jacky-wiki>/wiki/education/skill/jacky-course-prep-loop/`。
2. Codex：建立 `~/.codex/skills/jacky-course-prep-loop` Junction 指向 canonical 資料夾，已驗證可讀最新版。
3. Claude Code：建立 `~/.claude/skills/jacky-course-prep-loop` Junction／symlink 指向同一資料夾；本次已提供指令，尚待本機實際安裝驗證。
4. 其他 AI：使用 Custom Instructions、Gem 或可攜 prompt，內容連回 Wiki 規範，不另造方法論副本。
5. 更新流程：改 Wiki canonical → 驗證 → commit／push → 各機 git pull；連結安裝者自動取得新版。

## 對比與替代

- 複製 SKILL.md：安裝簡單，但每次更新都要逐份同步，容易版本漂移。
- Skill 專用 repo：適合大量公開 skills；個人方法與 Wiki 高度耦合時會增加雙 repo 同步成本。
- Wiki canonical＋連結：目前最符合 Jacky 的跨 AI、跨機、知識去重與版本管理需求。

## 連結與出處

- `wiki/education/skill/jacky-course-prep-loop/`
- `wiki/ailab/concepts/跨機與跨模型部署.md`
- Wiki main commits：`3fd7fc6`、`e0779b1`、`bfaef64`

## 升格目標

已補入 `ailab/concepts/跨機與跨模型部署.md` 的「Wiki canonical skill 發布模式」。Claude Code 實際完成安裝並驗證後，可將成熟度升為已穩定。

[已升格 → ailab/concepts/跨機與跨模型部署.md]

