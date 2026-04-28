---
title: Week 4｜串 — Agent 工廠
domain: shuangyun
updated: 2026-04-29
---

# Week 4｜串 — Agent 工廠（從單兵到工廠，從接力到互控）

> **時長**：約 2 小時 45 分（核心 10 模組 155 min + Plugin 補充 10 min = 165 min）
> **使用版本**：v3（v1/v2 詳見 OneDrive；v3 新增 Skill 管理系統 + AI Agent 架構師身份認同）
> **定位**：基礎結業 + 進階銜接
> 來源：`02_課程架構與教案/04_Week4_課程架構_Agent工廠_v3.md`

---

## 一句話定位

> **一個人的 Agent 再強，也只是單兵作戰。**
> **當 Agent A 的產出能自動成為 Agent B 的輸入，那才叫工廠。**
> **而當 Agent 之間還會互相呼叫、同時並行——那就是 API 互控。**
> **但工廠有了 50 台機器，你沒有管理系統，那叫倉庫不叫工廠。**
> **而能做到這一切的人，叫做 AI Agent 架構師。**

---

## 教學核心理念：四週 = 架構師養成

```
Week 1 拆 → 架構師能力 1：流程拆解
Week 2 建 → 架構師能力 2：Skill 設計
Week 3 修 → 架構師能力 3：殘酷測試
Week 4 串 → 架構師能力 4：Agent 工廠
```

> **双云 AI 轉型定位：全員成為 AI 架構師，以行銷切入，沒有極限。**

### 六個結業認知（v3）

1. **單一 Agent 是工具，Agent 工作流才是系統**
2. **接力的關鍵是「交接規格」**
3. **Skill 太肥要瘦身**
4. **双云的 Agent 工廠 = 每個人的 Agent 連在一起**
5. **工廠需要管理系統**（v3 新增）
6. **你們已經是 AI Agent 架構師**（v3 新增）

---

## 課程流程（10 模組 + 1 補充 / 165 min）

| 模組 | 內容 | 時長 |
|---|---|---|
| 1 | 醫美案例成果展 + Sophia 分享 | 15 |
| 2 | Agent 工作流設計原理（三大原則） | 10 |
| 2.5 | 三種協作模式（接力／呼叫／並行）+ Jacky 現場展示 | 15 |
| 3 | Skill 瘦身術 | 15 |
| 4 | 現場實作：設計 Agent 工作流 | 25 |
| 5 | 交接規格現場對齊 + JSON 預告 | 20 |
| 6 | 結業 Review：每人 Agent 系統總檢 | 15 |
| 7 | 双云 Agent 工廠藍圖 v2（含 API 調度） | 10 |
| **7.5** | **Jacky 的 Skill 管理系統展示**（v3 新增） | 12 |
| **8** | **你們已經是 AI Agent 架構師**（v3 升級） | 8 |
| 9 | 結業 | 10 |
| 補充 | Cowork Plugin — Skill 打包分享 | 10 |

---

## 模組 1｜醫美案例成果展（15 min）

投影 Week 3 加碼任務的成果，按工作流順序排列：

```
Sophia 接案 Agent 產出
         ↓
   ┌─────┴─────┐
   ↓           ↓
潘潘 蕙瑄 岱恩 藝嘉  ← 四個社群 Agent 各自產出
(7)  (3)  (4)  (Sk)
   ↓           ↓
   └────┬──────┘
        ↓
Barbie 品質審查 / 詩媛邏輯審查
```

關鍵問題：「同一份品牌策略，4 個社群 Agent 產出的內容差異有多大？」

---

## 模組 2｜工作流三大原則

| 原則 | 說明 | 課堂提問 |
|---|---|---|
| **原則 1：交接規格（最重要）** | A 的「輸出格式」必須 = B 的「輸入格式」 | 「Sophia 的產出物你拿得動嗎？格式對嗎？」 |
| **原則 2：錯誤不傳遞** | Step 1 出錯，Step 2 會放大；品管 Agent 在錯誤傳到客戶前攔截 | 「Barbie/詩媛的審查報告抓到前面 Agent 的錯誤了嗎？」 |
| **原則 3：可替換性** | 每個位置可以換人或換 Agent；有規格才能替換 | 「潘潘請假，蕙瑄的 Agent 能不能接手？」 |

---

## 模組 2.5｜三種協作模式 + Jacky 現場展示

> 接力 / 呼叫（Sub Agent）/ 並行（Parallel）— 完整定義見 [AGENTS方法論落地.md §3.5](../concepts/AGENTS方法論落地.md)。

**Jacky 現場震撼展示**：在 Cowork 中即時展示三個以上 Skill 同時運作。

> 「你看，我沒有一個一個去呼叫它們。我只下了一個指令，系統自己判斷該找誰。這就是未來你們的 Agent 工廠要做到的事。」

**何時拆 Sub Agent — 四個訊號**

| 訊號 | 範例 |
|---|---|
| Agent 做太多事（判斷規則 > 10） | 社群 Agent 又要寫文又要查法規又要做圖 |
| Agent 需要專業知識 | 醫療廣告法規、金融合規、NPO 倫理 |
| 同一個功能被多人需要 | 合規檢查被所有社群 Agent 共用 |
| Agent 回應品質下降（Prompt > 2000 字） | 開始忘記重點 |

---

## 模組 3｜Skill 瘦身術

> 三個健康指標 + 三步驟瘦身法見 [AGENTS方法論落地.md §3.7](../concepts/AGENTS方法論落地.md)。

**現場練習**：每人拿出自己的 Agent 設定檔做盤點

```
Agent 名稱：______
目前的 System Prompt 大約幾個字？______

列出做的所有事情：
1. ______ → □ 核心 □ 附加 □ 可共用
2. ______ → □ 核心 □ 附加 □ 可共用
...

需要拆出的 Sub Agent：
可以做成公用 Sub Agent 的：
```

> Jacky 巡場：幫 Barbie 看 9-Agent 系統有沒有可再濃縮的；幫 Sophia 看多個 Skill 之間有沒有重複功能可合併成公用。

---

## 模組 4｜現場實作：設計 Agent 工作流（25 min）

每組設計一條完整工作流，包含：

```
工作流設計模板 v2
─────────────────────────
工作流名稱：______
觸發條件：______

Step N：________ Agent
  輸入：（從哪裡來？格式？）
  處理：（做什麼？）
  產出：（給誰？格式？）
  交接規格：（產出物必須包含哪些欄位？）

Sub Agent（至少 1 個）：
  名稱、被誰呼叫、什麼時候、做什麼、回傳什麼

並行環節：哪些 Agent 可同時跑？
品管關卡：什麼時候啟動？不通過怎麼辦？
異常處理：某步掛了 / 產出品質太差怎麼辦？
```

**分組任務**

| 組別 | 任務 |
|---|---|
| 工作流 A：新客戶社群上線全流程 | 接案 → 第一篇貼文上線 |
| 工作流 B：月度社群營運全流程 | 月初策略 → 月底報告 |

---

## 模組 5｜交接規格現場對齊（20 min）

### 找出醫美案例的「交接斷裂點」

| 斷裂點 | 問題 | 影響 |
|---|---|---|
| Sophia → 社群 Agent | 品牌策略文件格式不統一 | 4 個社群 Agent 產出風格差異大 |
| 社群 → 品管 | 沒附原始 brief，無法對照審查 | 只能看表面，不能看策略一致性 |
| 品管 → 退回修改 | 審查意見太籠統（「建議加強」） | 來回修改效率低 |

### 三份交接規格文件（全班共同制定）

**規格 1：接案 → 社群**
- 品牌基本資訊、目標受眾、品牌調性關鍵詞、禁忌事項、KPI、社群排程、可用素材

**規格 2：社群 → 品管**
- 完整文案（含 hashtag、CTA）、原始 brief、視覺指引、目標平台、法規自查結果

**規格 3：品管 → 退回**
- 嚴重程度（必修／建議／小瑕疵）、具體問題（引用原文）、修改方向、預估工作量

### JSON 化預告

```
【人讀版】                     【機器讀版】
□ 品牌基本資訊        →        { "brand": {"name": "青禾設計", ...}, ... }
□ 目標受眾描述
□ 品牌調性關鍵詞
```

> **目的是種下 Week 5 的種子，不是讓夥伴現在學 JSON。**
> 「你今天定義得越清楚，未來 Agent 自動串接就越順暢。」

---

## 模組 7.5｜Jacky 的 Skill 管理系統（v3 新增 / 12 min）

> **目的不是教夥伴去建管理系統，而是讓他們理解：Agent 越多，管理越重要。Jacky 已經幫你們把路鋪好了。**

### 從 7 個到 34 個 — Jacky 的真實 Skill 清單

> 「你們現在每人有 1-9 個 Agent，全部加起來大概 20 幾個。Jacky 自己的 Claude 上正在跑 34 個 Skill。」

按業務域分類（35 個 Skill 全景）：

| 域 | 數量 | 代表 Skill |
|---|---|---|
| 跨域（Jacky 個人） | 6 | jackybraincommander、jackybraincontrol、jacky-question-master |
| TBSA 教學 | 3 | tbsa-jacky-agent、tbsa-sostac-planner、speaks-coach |
| 双云營運 | 11 | shuangyun-jacky-agent、shuangyun-scoring-agent、shuangyun-completion-coach、shuangyun-api-gateway |
| 中興學術 | 6 | nchu-advisor-huang、journal-reviewer、literature-verifier |
| 一念清涼 | 2 | yinian-social-editor、video-story-director |
| 系統工具 | 6 | docx / pptx / xlsx / pdf、skill-creator、schedule |

### 三段式命名

```
{domain}.{layer}.{verb-output}
  ↑          ↑         ↑
  哪個業務    什麼角色    做什麼事

shuangyun-scoring-agent → sy.hand.scoring-report
jackybraincommander    → jacky.brain.commander
shuangyun-api-gateway  → sy.infra.api-gateway
```

### 三層架構（依賴方向：Brain → Hand → Infra，不可反向）

| 層 | 數量 | 用途 | 真實範例 |
|---|---|---|---|
| 🧠 Brain（動腦） | 5 | 判斷、決策、調度下游；使用者直接對話 | jackybraincommander、shuangyun-jacky-agent、tbsa-jacky-agent、nchu-advisor-huang |
| ✋ Hand（動手） | 21 | 執行任務、產出文件 | shuangyun-scoring-agent、shuangyun-completion-coach、shuangyun-config-converter |
| 🔧 Infra（基礎設施） | 8 | 被其他 Skill 共用的底層工具 | docx/pptx/xlsx/pdf、shuangyun-api-gateway、journal-reviewer |

### Jacky 的工具箱（4 個管理工具）

| 工具 | 用途 |
|---|---|
| 互動式儀表板（`Jacky-Skill-Dashboard.html`） | 34 個 Skill 全景，按業務域篩選 |
| 路由決策表（`CLAUDE.md`） | 關鍵字 → 該呼叫哪個 Skill |
| 更新同步 Checklist（`SKILL-UPDATE-CHECKLIST.md`） | 每次新增/修改 Skill 同步 7 個檔案 |
| 一鍵部署腳本（`_deploy/`） | 新 Skill 做好跑腳本部署上線 |

> **收尾**：「管理 Agent 和管理人一樣，越多越需要系統。技術部分 Jacky 會建好，你們要記住的是觀念。」

---

## 模組 8｜你們已經是 AI Agent 架構師了（v3 升級 / 8 min）

```
═══════════════════════════════════════════════════════════════
  双云 AI 轉型：全員成為 AI 架構師，以行銷切入，沒有極限
═══════════════════════════════════════════════════════════════

AI Agent 架構師 ≠ 工程師
AI Agent 架構師 ≠ 只會下 Prompt 的人

AI Agent 架構師 =
  能看懂工作流程（拆）
  + 能設計 AI Skill（建）
  + 能測試到穩定可靠（修）
  + 能串成自動化工廠（串）
  + 能管理規模化系統（管）
  + 能完成測試交付客戶（交）

這六件事，你們四週全部做過了。
═══════════════════════════════════════════════════════════════
```

### 架構師完整服務流程

```
Step 1：抓流程（Week 1 拆）→ 流程拆解表
Step 2：設計 Skill（Week 2 建）→ Agent 說明書（9 區塊）+ 部署
Step 3：殘酷測試（Week 3 修）→ 修復版 + 測試報告
Step 4：Agent 工廠（Week 4 串）→ 工作流 + 交接規格 + 工廠藍圖
Step 5：完成測試，交付客戶
   ✅ 客戶自己操作 / ✅ 由双云操作
```

### 架構師進階能力地圖（Week 5-8 預覽）

| Week | 主題 | 架構師能力 |
|---|---|---|
| 5 通 | API 串接力 | 讓工廠自動化 |
| 6 控 | 系統控制力 | 讓工廠有大腦 |
| 7 開 | 對外開放力 | 讓工廠變成產品 |
| 8 營 | 持續進化力 | 讓工廠自己進化 |

---

## 補充模組｜Cowork Plugin（10 min）

> Skill → 打包成 Plugin → 別人一鍵安裝 → 立刻能用

| | Skill | Plugin |
|---|---|---|
| 使用方式 | 複製 SKILL.md 到 Claude 設定 | 一鍵安裝 |
| 分享方式 | 傳檔案、教對方設定 | 分享連結或 .plugin 檔 |
| 包含內容 | Prompt + References | Prompt + 工具 + MCP + 設定 |
| 安裝門檻 | 需要懂設定 | 不需技術背景 |
| 適合對象 | 自己用 / 團隊內部 | 對外 / 客戶 / 市集 |

> **双云的護城河不只是 Agent 會做事，而是 Agent 的知識可以打包、可以販售、可以規模化。**

---

## 工廠藍圖 v2（含 API 調度中心）

> 完整圖見 [AGENTS方法論落地.md §5](../concepts/AGENTS方法論落地.md)。
>
> **2026-04-21 縮編注記**：原 7 人團隊設計的藍圖，現團隊為 3 人（Sophia、藝嘉、政澔），藍圖中「潘潘/蕙瑄/岱恩並行產內容」「Barbie 品管」「詩媛策略審核」需重新指派。

---

## 課後資產（每人應有）

- 至少 1 個已部署、已通過殘酷測試、已定義交接規格的 Agent
- 1 份 Skill 瘦身評估
- 全員理解 Skill 管理系統的概念
- 全員認同自己的新身份：**AI Agent 架構師**

---

## 相關連結

- 三種協作模式詳解 → [AGENTS方法論落地.md §3.5](../concepts/AGENTS方法論落地.md)
- Skill 瘦身術 → [AGENTS方法論落地.md §3.7](../concepts/AGENTS方法論落地.md)
- API Gateway 路由表 → [AGENTS方法論落地.md §4.6](../concepts/AGENTS方法論落地.md)
- 上一週 → [Week 3 修](Week3修.md)
- 下一週 → [Week 5 通](Week5通.md)
