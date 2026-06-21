---
title: 双云 Agent 平台（shuangyun-agent-platform）
domain: portfolio
status: active
deployed: Zeabur 上線（v0.2.0）
---

# 双云 Agent 平台（腦+手架構）

> 双云行銷的「AI 客戶行銷部門」平台：腦（決策）+ 手（執行）monorepo 架構，為 20 個品牌客戶做每日行銷自動化執行。已部署 Zeabur。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\OneDrive\双云AI轉型教育訓練\09_双云Agent應用` |
| 前端網址 | https://shuangyun-agent-platform.zeabur.app |
| 技術 | Monorepo（packages：shared-types / brain / hands / orchestrator / web）+ Docker |
| 部署平台 | Zeabur |
| 狀態 | 🟢 active（v0.2.0）|
| 相關版本 | `V2_AI_AGENT_2lcouds`（簡化版，3 頁面，dev）|

---

## 登入 / 金鑰

- 憑證：`09_双云Agent應用\.env`（Anthropic API Key、Google Drive、成本預算等，值見金庫 `shuangyun-agent`）。
- 見 `TOKEN_LIST.md` / `DEPLOYMENT.md`。

---

## 一鍵示範腳本

1. 開 https://shuangyun-agent-platform.zeabur.app → 展示腦+手平台。
2. 展示 20 個品牌客戶的每日行銷自動化執行（orchestrator 排程 → brain 決策 → hands 執行）。
3. （脈絡）這是 [双云 AI 行銷部](../../shuangyun/concepts/AI行銷部定義.md) 方法論的實作平台。

---

## 相關連結

- 方法論 → [shuangyun/AI行銷部定義](../../shuangyun/concepts/AI行銷部定義.md)、[多品牌獨立應用架構](../../shuangyun/concepts/多品牌獨立應用架構.md)
- 客戶數據看板（同生態）→ [muzopet 數據看板](muzopet-dashboard.md)
- 作品總表 → [作品索引](../作品索引.md)
