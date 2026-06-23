---
title: AI School 教學定位與 AGENTS 對應
domain: aischool
updated: 2026-06-23
---

# 教學定位與 AGENTS 對應

> 起點參考 `claude2code.com/map` 的章節地圖，內容改成双云版本（Claude、Codex、Antigravity、GitHub、Docker、Zeabur）。專案資料夾保留 `Cladude Code 新手教學`，頁面與 repo 用正確產品名 `Claude Code`。

## 教學定位：讓非工程夥伴做到三件事

1. **看得懂**：檔案、終端機、Git、API、部署的基本語言
2. **問得準**：能把需求拆成 Claude／Codex／Antigravity 可執行的任務
3. **交得出**：能把作品做成可登入、可部署、可交接的內部工具

## 三大工具軌

| 工具軌 | 双云定位 | 主要入口 |
|---|---|---|
| **Claude** | 團隊日常 AI 工作台 | Web Chat、Desktop、Cowork、Design、Office、Chrome、Connectors |
| **Codex** | 技術層與部署交付主力 | CLI、App、Web/Cloud、IDE extension、GitHub、SDK |
| **Antigravity** | 多代理與瀏覽器任務實驗場 | IDE、Agent Manager、Browser integration、CLI、Subagents、Permissions |

## AGENTS 對應（課程主軸）

| 字母 | 正式中文 | 教學短名 | 訓練重點 |
|:--:|---|:--:|---|
| A | 分析拆解 | 拆 | 電腦基本功、路徑、終端機、需求拆解 |
| G | 生成建構 | 建 | Node 專案、Claude Code/Codex/Antigravity 建檔改檔 |
| E | 評測修正 | 修 | Git diff、測試、人工審查、debug |
| N | 串聯協作 | 串 | CLAUDE.md、Skills、MCP、Sub Agent、多代理並行 |
| T | 追蹤治理 | 管 | token、Trace Log、成本、錯誤與權限 |
| S | 規模營運 | 交 | GitHub、Docker、Zeabur、部署、團隊交付 |

> AGENTS 六字訣完整定義在 [shuangyun/AGENTS知識體系](../../shuangyun/concepts/AGENTS知識體系.md)（單一真相，本頁不複製）。

## AI Agent 的双云工作定義

> **AI Agent ＝ 一個能理解目標、把它拆成任務、在清楚權限下用工具、留下紀錄、交出可檢查成果的工作系統。**

不只是模型或聊天介面，而是由 **Brain（腦）/ Harness（手）/ Memory / Tools / Runtime** 組成、受 **權限、日誌、驗證、成本追蹤** 治理的系統。此定義錨定自黃仁勳 Computex 2026 agentic AI 框架（agentic AI 從內容生成走向「推理、規劃、工具使用、任務完成」的有用工作）。

- 對應記憶錨：[ailab 黃仁勳 Computex 2026 AI Agent 兩層架構](../../ailab/AI實踐索引.md)
- 腦＋手架構：腦＝文件＋AI 判斷，手＝Skill 執行

[← 回 AI School 索引](../AI School索引.md)
