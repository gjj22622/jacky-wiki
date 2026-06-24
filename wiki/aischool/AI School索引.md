---
title: 双云 AI Agent School 索引
domain: aischool
updated: 2026-06-23
---

# 双云 AI Agent School（線上教學平台）

> **一句話**：把「拆→建→修→串→通→迴圈」六階段、42 支影片課程，做成可登入、可追蹤、權限分區的內部線上學院。
> **線上**：`2clouds-claude-code-training.zeabur.app`（token 登入）｜**repo**：`gjj22622/shuangyun-claude-code-training`｜**部署**：Zeabur（Docker + /data 持久碟）

## 這個域是什麼

`aischool` 是**双云 AI Agent School 線上平台**這個產品的知識域：課程章節全文、平台架構、權限分區、課程↔Skill 連動、部署與監察。

與其他域的分工：
- **內容方法論**（AGENTS 六字訣、SOSTAC、殘酷測試）只存一份在 [shuangyun](../shuangyun/双云索引.md)，本域**連結回去不複製**。
- **L1–L5 章節**對應原 5 週實體課教案（[shuangyun/courses](../shuangyun/双云索引.md)），本域記的是**線上影片版重構**（L0 新增入門、L6 新增迴圈）。
- **平台部署速查** 另見 [portfolio](../portfolio/作品索引.md)；**工具觀／Claude Code** 在 [ailab](../ailab/AI實踐索引.md)；**對外教材** 在 [education](../education/教育訓練索引.md)。

## 域結構

```
aischool/
├── AI School索引.md                  # 本頁
├── curriculum/  (8 頁)
│   ├── 課程地圖.md                    # L0-L6 全 42 課總表 + Level↔Week 對應
│   ├── L0_入門環境起手式.md           # 7 課
│   ├── L1_拆_三工具與好問題.md        # 4 課
│   ├── L2_建_SOSTAC決策架構.md        # 4 課
│   ├── L3_建_最小Agent.md             # 4 課
│   ├── L4_修_Skill與殘酷測試.md       # 7 課
│   ├── L5_串通_協作與部署.md          # 9 課
│   └── L6_迴圈_Agent自動迴圈.md       # 7 課
├── platform/  (2 頁)
│   ├── 平台架構.md                    # 5 權限分區 / token 後台 / 影片管線 / 部署 / 監察
│   └── 課程Skill連動.md               # skills.json → 每課 practice 機制
└── concepts/  (2 頁)
    ├── 教學定位與AGENTS對應.md        # 三件事 / 三工具軌 / AGENTS 對應 / AI Agent 定義
    └── Plan模式與自動化工作流.md       # Plan Mode（三工具都有）× Auto × Goal；互鎖雷區
```

## 課程一覽（L0–L6，42 課，92 分 55 秒）

| Level | 主題 | 課數 | 重點 | 對應原週 |
|---|---|:--:|---|---|
| [L0 入門](curriculum/L0_入門環境起手式.md) | 環境起手式 | 7 | 心態、AI 科普、三工具、帳號、起手式、檔案邏輯、為何 SOSTAC+AGENTS | 新增 |
| [L1 拆](curriculum/L1_拆_三工具與好問題.md) | 三工具與好問題 | 4 | 三工具分工、好問題四要素、差異比較、工作紀錄卡 | Week1 拆 |
| [L2 建](curriculum/L2_建_SOSTAC決策架構.md) | SOSTAC 決策架構 | 4 | 六格決策、S/O、S/T/A、Control 與資料缺口 | Week2 建 |
| [L3 建](curriculum/L3_建_最小Agent.md) | 最小 Agent | 4 | 聊天 vs Agent、單一決策、最小說明書、驗收一致 | Week2 建 |
| [L4 修](curriculum/L4_修_Skill與殘酷測試.md) | Skill 與殘酷測試 | 7 | Agent→Skill、九區塊、Prompt 工程、三色測試、報告修正、設定、知識分享 | Week3 修 |
| [L5 串通](curriculum/L5_串通_協作與部署.md) | 協作與部署 | 9 | 三種協作、Sub Agent、Agent 工廠、追蹤成本權限、部署、MCP、CLI、長對話、開工收工 | Week4 串 + Week5 通 |
| [L6 迴圈](curriculum/L6_迴圈_Agent自動迴圈.md) | Agent 自動迴圈 | 7 | 為何迴圈、SOSTAC 六格 Agent、逆向工程定目標、每格成 Agent、監控打分、逆推除錯、動手跑 | 新增（對應 `/迴圈`） |

## 跨域連結

- **方法論母源**：[shuangyun/AGENTS知識體系](../shuangyun/concepts/AGENTS知識體系.md)、[shuangyun/SOSTAC迴圈與逆推除錯](../shuangyun/双云索引.md)（L6 核心）
- **SOSTAC 根**：[tbsa/SOSTAC方法論](../tbsa/concepts/SOSTAC方法論.md)
- **平台部署速查**：[portfolio/作品索引](../portfolio/作品索引.md)
- **工具軌**：[ailab/claude-code](../ailab/tools/claude-code.md)、[ailab/codex-cli](../ailab/tools/codex-cli.md)
- **對外教材**：[education/教育訓練索引](../education/教育訓練索引.md)（含 L6 workshop、部署上線 workshop）
- **線上監察**：對應 `/監察` skill（六維唯讀稽核），詳見 [平台架構](platform/平台架構.md)
