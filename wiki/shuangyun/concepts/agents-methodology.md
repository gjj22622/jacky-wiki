---
title: AGENTS 方法論 — 双云 AI 轉型總覽
domain: shuangyun
updated: 2026-04-29
---

# AGENTS 方法論 — 双云 AI 轉型總覽

> 双云行銷 AI Agent 全面轉型的**專案落地狀態**——團隊組成、課程進度、API Gateway 路由表、工廠藍圖 v2、商業模式。
> 來源：`双云AI轉型教育訓練/AGENTS.md`（2026-04-21 版，原為 Codex Instructions）

> **方法論的正式定義（AGENTS® 六字訣 / 三級認證 / 三場景部署）見 [`agents-knowledge-system.md`](agents-knowledge-system.md)。**
> 認證評分表見 [`agents-certification.md`](agents-certification.md)。
> 本頁聚焦双云的**專案執行**面（誰負責什麼、現在跑到哪、API 路由怎麼設計、工廠藍圖長什麼樣）。

---

## 1. Situation 現況

### 課程進度

**已完成：4 週基礎課程（拆 → 建 → 修 → 串）**

| Week | 主題 | 內容 |
|---|---|---|
| Week 1 | 拆 | 流程拆解 — 將工作拆成 AI 可處理的步驟 |
| Week 2 | 建 | Agent 建構 — 流程拆解表轉為 9 區塊 Agent 設定檔 |
| Week 3 | 修 | 殘酷測試 — 三色情境（標準🟢/邊緣🟡/錯誤🔴）壓力測試 |
| Week 4 | 串 | Agent 工廠 — 從單兵到工廠，從接力到互控（v3：10 模組+1 補充 / 165 min） |

**進行中：Week 5–8 進階課程（通 → 控 → 開 → 營）**

| Week | 主題 | 內容 |
|---|---|---|
| Week 5 | 通 | API 基礎與首次串接 — API 概念、n8n 操作、第一條自動化流水線 |
| Week 6 | 控 | Main Agent 控制 Sub Agent — 路由設計、錯誤處理、健壯性測試 |
| Week 7 | 開 | 客戶 API 開放與監控 — API 端點、認證、用量計費、儀表板 |
| Week 8 | 營 | Agent 自動更新與營運 — 進化機制、營運儀表板、畢業專案 |

> 六步驟完整框架：**拆 → 建 → 修 → 串 → 管 → 交**

### 團隊現況（2026-04-21 起）

| 夥伴 | 角色／專長 | 負責 Agent |
|---|---|---|
| Sophia | 接案／HR／業務主力 | 26 Skill + 4 層 Orchestrator（Week 4 驗收最成熟）；接案 SOP、分潤流程、離職 Skill、業務 QA、問問題 Agent |
| 藝嘉 | 社群合規／紅線把關 | 8 Skill Master→Sub + 合規 4 分類；社群貼文工作流含合規 |
| 政澔 | 技術／自動化方向（待正式定義） | 5 Agent Pipeline + 自進化（Week 4 作業） |

> **歷史成員**（Week 1–4 課程參與，已離開團隊）：Barbie、詩媛、潘潘、蕙瑄、岱恩。
> Week 1–4 課堂產出保留為歷史事實不追溯修改；但原本依賴他們為主責節點的工廠藍圖需重新設計。

---

## 2. Objectives 三階段目標（API 互控）

| 階段 | 時程 | 目標 |
|---|---|---|
| 短期 | 1–2 月 | 人觸發 + Agent 自動串 — 夥伴發指令，後續 Agent 鏈自動跑 |
| 中期 | 3–6 月 | 全自動流水線 — 排程觸發，人只在關鍵節點確認 |
| 長期 | 6–12 月 | 開放客戶 API — 品牌客戶直接透過 API 呼叫 Agent 產出 |

---

## 3. Strategy 核心方法論

### 3.1 流程拆解表（6 維度）

1. **基本資訊**：流程名、觸發條件、產出物
2. **步驟拆解**：3–10 步驟 + 驗證方式
3. **判斷邏輯**：if-then 規則
4. **資料來源**：Dataroom 結構
5. **AI 適配評估**：全自動／半自動／人工
6. **眉角紀錄**：常見地雷

### 3.2 Agent 說明書（9 區塊）

1. 角色定位
2. 觸發條件
3. 輸入需求
4. 執行流程（步驟 + 動作 + 決策 + 產出）
5. 判斷邏輯與決策樹
6. 輸出規格
7. 知識庫／Dataroom 需求
8. 邊界與禁止行為
9. 進化機制

### 3.3 完整度評分（6 維度）

| 維度 | 權重 |
|---|---|
| 基本資訊 | 15% |
| 步驟拆解 | 25% |
| 判斷邏輯 | 25% |
| 資料來源 | 15% |
| AI 適配 | 10% |
| 眉角紀錄 | 10% |

**等級**：🌟 80%+ 可轉 Agent ／ ⭐ 60–79% 需補完 ／ 🔴 <60% 需課堂支援

### 3.4 殘酷測試（3 色情境）

- 🟢 **標準情境**：完整正常輸入，測基本功能
- 🟡 **邊緣情境**：合法但棘手，測判斷邏輯
- 🔴 **錯誤情境**：故意錯誤輸入，測防護欄

### 3.5 Agent 三種協作模式（Week 4 v2 核心）

| 模式 | 說明 | 適合場景 | 速度 |
|---|---|---|---|
| 1. 接力（Pipeline） | A → B → C 串行流水線 | 有明確先後順序（接案→社群→品管） | 最慢 |
| 2. 呼叫（Sub Agent） | 主 Agent 遇到問題 → 呼叫 Sub → 拿回結果 → 繼續 | 需要專業判斷（社群呼叫合規檢查禁詞） | 中等 |
| 3. 並行（Parallel） | 主 Agent 同時呼叫多個 Sub → 收集 → 整合 | 任務彼此獨立（4 個社群同時產出 → 一次審 4 篇） | 最快 |

### 3.6 何時該拆 Sub Agent — 四個訊號

1. Agent 做太多事（判斷規則超過 10 條）
2. Agent 需要專業知識（領域專知如法規、金融）
3. 同一功能被多人需要（複用需求出現）
4. Agent 回應品質下降（System Prompt 超過 2000 字，開始失焦）

### 3.7 Skill 瘦身術（Week 4 v2 新增）

> 核心觀念：**Agent 不是越完整越好，太肥的 Agent 反而做不好事。**

**三個健康指標**

| 指標 | 健康 | 需要瘦身 | 必須立刻瘦身 |
|---|---|---|---|
| System Prompt 長度 | <1000 字 | 1000–2000 字 | >2000 字 |
| 判斷規則數量 | <5 條 | 5–10 條 | >10 條 |
| 殘酷測試通過率 | >80% | 60–80% | <60% |

**三步驟瘦身法**

1. **盤點**：列出 Agent 做的所有事，標記核心 vs 附加
2. **拆分**：核心留主 Agent、附加拆 Sub、共用拆公用 Sub
3. **連接**：定義呼叫時機、傳入資料、回傳結果

---

## 4. Tactics API 互控架構

### 4.1 四層技術架構

| 層次 | 功能 | 工具 |
|---|---|---|
| 觸發層 | 接收指令、排程、客戶請求 | n8n Form / LINE Bot / Webhook |
| 編排層 | Main Agent 路由、流程控制 | n8n Workflow + 路由邏輯 |
| Agent 執行層 | 各 Sub Agent 執行專業任務 | Codex API + System Prompt |
| 儲存層 | Dataroom、進度、日誌 | Google Drive / Notion |

### 4.2 推薦技術組合

- **n8n**（工作流編排）+ **Codex API**（Agent 執行）
- n8n 視覺化介面，夥伴看得懂；技術層由 Jacky 用 Codex API 搭建
- 月費預估：USD $70–200

### 4.3 API Gateway Skill — `shuangyun-api-gateway`

**角色**：所有 Skill 之間溝通的中央路由器（調度總機）

**核心流程**：解析請求 → 判斷讀／寫 → 路由到對的 Skill → 收集結果 → 品管（寫才需要）→ 回傳標準格式

**包含檔案**

- `SKILL.md` — 主 Prompt（觸發條件、執行流程、錯誤碼、自然語言轉換範例）
- `references/routing-table.md` — 完整路由表（9 GET + 8 POST）
- `references/json-schemas.md` — 6 種 JSON Schema（Request / Success / Error / Log / Chain Handoff / QA Review）
- `scripts/validate_request.py` — CLI 驗證工具

**8 種錯誤碼**

`INVALID_ACTION` ／ `INSUFFICIENT_DATA` ／ `METHOD_MISMATCH` ／ `SKILL_NOT_FOUND` ／ `SKILL_EXECUTION_FAILED` ／ `QA_REJECTED` ／ `PERMISSION_DENIED` ／ `CHAIN_INTERRUPTED`

### 4.4 讀／寫 API 分離原則

**讀 API（GET — 查詢類）**

- 不產生新內容，只讀取 Dataroom 後回答
- 不需要品管、不需要存檔、不通知任何人
- 可以大量快取降低成本
- 範例：查客戶狀態、查品管分數、拉進度報告

**寫 API（POST — 產出類）**

- 創造新內容、觸發流程、改變狀態
- 必須有品管環節、記錄日誌、關鍵節點人確認
- 範例：產社群貼文、新客戶進場、更新 Prompt

### 4.5 Agent System Prompt 轉換原則（SKILL.md → API 版）

1. **強制 JSON 輸出**：所有回覆必須是合法 JSON
2. **移除互動邏輯**：不能問問題，缺欄位標記 `missing`
3. **加入錯誤處理**：回傳結構化錯誤碼（`INSUFFICIENT_DATA` 等）
4. **讀寫權限宣告**：在 Prompt 開頭聲明 Agent 的讀／寫權限

### 4.6 路由表（完整版 9 GET + 8 POST）

**讀路由（GET）**

| Action | 目標 Skill | 用途 |
|---|---|---|
| `client.status` | shuangyun-jacky-agent | 查客戶合約狀態 |
| `client.strategy` | shuangyun-jacky-agent | 查客戶品牌策略包 |
| `content.list` | shuangyun-jacky-agent | 查已產出內容清單 |
| `content.score` | shuangyun-scoring-agent | 查某篇內容品管分數 |
| `partner.workload` | shuangyun-progress-tracker | 查全體夥伴進度 |
| `partner.skill-status` | shuangyun-scoring-agent | 查某夥伴 Skill 完整度 |
| `prompt.history` | shuangyun-jacky-agent | 查 Prompt 版本歷史 |
| `workflow.status` | shuangyun-progress-tracker | 查工作流執行狀態 |
| `factory.blueprint` | shuangyun-jacky-agent | 查 Agent 工廠藍圖現況 |

**寫路由（POST — 含執行鏈）**

| Action | 路由 | 備註 |
|---|---|---|
| `client.onboard` | 接案 → 策略 → 排程 | 鏈式 |
| `content.generate` | 策略 → 內容 → 品管 | 鏈式 |
| `content.review` | shuangyun-scoring-agent | 品管 |
| `content.batch` | 內容 ×N 並行 → 品管 | 並行 + 品管 |
| `prompt.update` | shuangyun-jacky-agent | 需 Jacky 確認 |
| `workflow.create` | shuangyun-jacky-agent | 建立新工作流 |
| `skill.evaluate` | shuangyun-scoring-agent | 評估 Skill 完整度 |
| `skill.slim` | shuangyun-completion-coach | Skill 瘦身建議 |

### 4.7 Agent 讀寫對應（現有）

| Agent | 讀 API | 寫 API |
|---|---|---|
| 接案 Agent（Sophia） | 查客戶合約狀態 | 建立新客戶檔案 |
| 品管 Agent | 查某篇內容評分 | 執行品管審查 |
| 內容 Agent ×4 | 查已產出內容清單 | 產生新貼文 |
| 進度追蹤 Agent | 查全體夥伴進度 | 發送催交提醒 |
| 策略 Agent | 查客戶策略包 | 產出新策略建議 |
| 進化日誌 Agent | 查 Prompt 版本歷史 | 提交 Prompt 更新建議 |

### 4.8 Agent 自動更新機制

1. 每次執行後，品管 Agent 給評分 + 修改原因
2. 「進化日誌 Agent」自動彙整最近 10 次品管回饋
3. 累積 5+ 次相同類型修改時，自動產出 Prompt 修改建議
4. **所有 Prompt 變更必須 Jacky 確認，不允許 Agent 自行修改**

### 4.9 JSON 資料流規格

Agent 間的 API 溝通依賴統一 JSON 格式。每個 Agent 的輸入／輸出都必須明確定義「交接規格」。這是 Week 4 已建立的「交接規格書」的 JSON 化版本。

---

## 5. Action 双云 Agent 工廠 v2.0 藍圖

> ⚠️ **2026-04-21 注記**：下方藍圖以原 7 人團隊設計。團隊縮編為 3 人（Sophia、藝嘉、政澔）後，藍圖中依賴「潘潘／蕙瑄／岱恩並行產內容」「Barbie 品管」「詩媛策略審核」的架構已無法直接沿用，需要 Jacky 決定重新設計時機。暫保留藍圖作為歷史架構參考。

```
            ┌──────────────────────┐
            │  API 調度中心（總機）  │ ← shuangyun-api-gateway（已建）
            │  接收指令 → 判斷路由   │   Jacky 負責維護
            │  分派讀/寫任務        │
            └───────┬──────────────┘
             ┌──────┼──────┐
             ↓      ↓      ↓
  接案 Agent   策略 Agent   排程 Agent
  (Sophia)    (待建)       (待建)
       │                    │
       ↓      ┌─────────────┤
  社群貼文     │  並行執行    │
  Agent ×4 ◄──┘  [原潘潘/蕙瑄 │
                  /岱恩/藝嘉，│
                  縮編後待重] │
       │                    │
       ↓                    │
  品管 Agent   策略審核      │
  [原Barbie]  [原詩媛] ◄────┘
  [待重指派]  [待重指派]
       │
       ↓
  客戶交付     公用 Sub Agent（共用）
  (待建)      · 合規檢查 Sub Agent（藝嘉）
              · 品牌語調 Sub Agent
  側線：       · 排程查詢 Sub Agent
  離職Agent | 分潤Agent | 業務QA (Sophia)
```

### 關鍵時間線

| 月份 | 里程碑 | 驗收標準 |
|---|---|---|
| 第 1 月 | 環境建置 + 第一條流水線 | n8n 可運作，1 條流水線跑通 |
| 第 2 月 | Week 5 課程 + 夥伴上手 | 3/3 夥伴能獨立觸發（2026-04 縮編後） |
| 第 3 月 | Week 6 + Main Agent 上線 | 路由正確率 > 90% |
| 第 4 月 | 全自動流水線 + 自動更新 | ≥ 3 客戶案例全自動跑完 |
| 第 5 月 | Week 7 + 客戶 API 開放 | ≥ 1 客戶用 API 產出 |
| 第 6 月 | Week 8 + 營運儀表板 | 完整監控系統運作 |
| 第 12 月 | Agent 工廠 v2.0 完全體 | 自動化率 >70%，新人 1 天上手 |

---

## 6. Control 教學核心原則（Jacky 框架）

1. **一步一 Agent** — 不建巨石 Agent，每個 Agent 只做一個決策
2. **說明書 > 工具** — 規格可攜帶跨平台，工具只是容器
3. **測 > 做** — 90% 學習發生在發現 bug 的過程
4. **人 + AI 協作** — 人定義判斷邏輯，AI 執行重複步驟
5. **團隊工廠 > 個人工具** — 多 Agent 連接 = 組織轉型

---

## 7. 平台與成本

### 平台部署對照

| 平台 | 角色 |
|---|---|
| Codex Skill | 深度分析、文件生成、複雜工作流（**主力**） |
| Gemini Gem | 搜尋整合、Gmail/Calendar 同步 |
| GPTs | 類似 Gem，不同生態系 |
| NotebookLM | 知識庫查詢（不執行） |

### 成本估算

| 項目 | 月費用 |
|---|---|
| Codex API | ~USD $50–150（依用量） |
| n8n Cloud | ~USD $20–50（或自架免費） |
| Google Drive | 現有帳號即可 |
| **合計** | **~USD $70–200/月** |

---

## 8. 商業模式設計（第三階段）

- **混合制（推薦）**：基本月費 NT$8,000 + 超出篇數 NT$100/額外篇
- **護城河**：Agent 的質 × Dataroom 的深 = 双云的護城河
- **隔離原則**：每客戶獨立 API Key、速率限制、Dataroom 隔離

---

## 9. 助教 Agent 與基礎設施 Skill

### 5 個助教 Agent

| Agent | Skill |
|---|---|
| 流程分群與完整度評分 Agent（課前分析） | `shuangyun-scoring-agent` |
| 拆解表補完引導 Agent（課堂輔助） | `shuangyun-completion-coach` |
| 設定檔轉換 Agent（流程轉 Agent） | `shuangyun-config-converter` |
| 集體智慧合併 Agent（重複流程整合） | `shuangyun-wisdom-merger` |
| 每日進度追蹤 Agent（課後管理） | `shuangyun-progress-tracker` |

### 基礎設施 Skill

- `shuangyun-api-gateway` — API 調度總機（Skill 間中央路由器，讀／寫分離）

### 進階 Skill OS（`06_Skills/双云_Skill_OS/`）

- `shuangyun-master-content-orchestrator` — 中央工作流協調器
- `shuangyun-brand-ops-agent` — 品牌營運
- `shuangyun-brand-pack-builder` — 品牌包建構
- `shuangyun-content-reviewer` — 內容品質審查
- `shuangyun-review-rule-builder` — 審查規則生成
- `shuangyun-task-skill-builder` — 任務 Skill 建構
- `shuangyun-trace-logger` — 稽核日誌
- `shuangyun-workflow-mapper` — 工作流視覺化

---

## 10. 域邊界註記

- 双云議題優先使用 `shuangyun-jacky-agent`
- 中興博士研究相關 Skill 另外管理（`paper-reading-guide`、`literature-verifier`、`review-*`、`journal-*`、`nchu-advisor-huang`）
- TBSA 相關 Skill（`tbsa-*`）是行銷企劃方法論工具，與双云互補但獨立
- 一念清涼相關 Skill（`yinian-social-editor`、`video-story-director`）是另一個品牌專案
