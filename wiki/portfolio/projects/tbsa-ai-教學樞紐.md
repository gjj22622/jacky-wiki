---
title: TBSA AI 教學樞紐（agents.tbsa.tw）
domain: portfolio
status: active
deployed: 上線中（自有網域）
---

# TBSA AI 教學樞紐（agents.tbsa.tw）

> TBSA 對外 AI 教學工具樞紐：把 Jacky 的 AI 教學能力規模化成可客製、可引流的線上 Agent 生態。自有網域、4 個子 agent。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\OneDrive\TBSA開課流程自動化\TBSAAIAGENT`（程式碼 `05-課程總覽\14_TBSA_18週課程產生器`）|
| 前端網址 | https://agents.tbsa.tw |
| DNS | **agents.tbsa.tw（自有網域）** ✅ |
| 技術 | Node 24 原生 http server |
| 部署平台 | Zeabur |
| 狀態 | 🟢 active |

### 4 個子 agent

| 路徑 | 功能 |
|---|---|
| `/` | 入口頁 |
| `/18week/` | 18 週課程產生器（一鍵生成含 TBSA 考證的課程大綱）|
| `/forms/` | 五張表單工作坊介紹 |
| `/teaching/` | AI 備課研習營 |

> 子產生器另有獨立測試部署 https://tbsa-18week.zeabur.app（同引擎 `prompts/master-prompt.txt`）。

---

## 登入 / 金鑰

- 憑證：`14_TBSA_18週課程產生器\.env` / `.env.zeabur`（`OPENAI_API_KEY` 等，值見金庫 `tbsa-agents`）。

---

## 一鍵示範腳本

1. 開 https://agents.tbsa.tw → 展示樞紐入口 4 個子 agent。
2. 進 `/18week/` → 輸入科系 → 一鍵生成 18 週 AI 商務企劃課程大綱（嵌入五張表單 + TBSA 考證）。
3. 展示三種用法：Gemini/ChatGPT/Claude 指令包 + 本地 Node 工具 + 線上版。

---

## 相關連結

- 方法論 → [tbsa/SOSTAC方法論](../../tbsa/concepts/SOSTAC方法論.md)、[五大表單總覽](../../tbsa/templates/五大表單總覽.md)
- 同家族子作品（五張表單工作坊/助教後台/18週教學計劃）→ 見作品索引 TBSA 家族
- 作品總表 → [作品索引](../作品索引.md)
