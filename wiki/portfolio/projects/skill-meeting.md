---
title: Skill Meeting（多角色 AI 圓桌討論）
domain: portfolio
status: dev
deployed: Zeabur-ready
---

# Skill Meeting（多角色 AI 圓桌討論）

> 讓多個 AI 角色針對一個主題做多輪圓桌討論，自動產出結構化報告。Next.js 應用，已配置 Zeabur 部署。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\OneDrive\skill-meeting-temp` |
| GitHub | `gjj22622/skill-meeting` |
| 技術 | Next.js v16 + React 19 + better-sqlite3，Node 22 |
| 本機 | http://localhost:3000 |
| 部署平台 | Zeabur（`zeabur.json` 已配置，待部署）|
| 狀態 | ⚪ dev（最後 commit 2026-04-05，準備部署）|

---

## 登入 / 金鑰

- 需 **Anthropic API Key**（`.env`，範本 `.env.example` 無實際值）。
- 換機/部署前要填金鑰 → 見金庫 `skill-meeting`。

---

## 一鍵示範腳本

1. `npm install` → `npm run dev` → localhost:3000。
2. 輸入主題 + 選多個 AI 角色 → 跑多輪圓桌討論 → 看自動產出的結構化報告。

---

## 相關連結

- 作品總表 → [作品索引](../作品索引.md)
