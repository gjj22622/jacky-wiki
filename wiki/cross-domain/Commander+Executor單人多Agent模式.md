---
title: Commander + Executor 單人多 Agent 模式
domain: cross-domain
updated: 2026-04-30
---

# Commander + Executor 單人多 Agent 模式

> Jacky 用 Claude Code（CLI）操作多 Agent 的固定方式：**主對話想清楚，sub-agent 做乾淨**。
> 來源：博二專討資料夾 `工作方法筆記.md`（2026-04-22 整理）

---

## 一句話定位

**單人也能跑多 Agent 工作流**——主對話扮演 Commander 負責思考與拆解，Sub-agents 扮演 Executor 負責執行與回報。這是 [AGENTS N 階段三協作模式](../shuangyun/concepts/AGENTS知識體系.md)（Pipeline / Sub Agent / Parallel）的**單人 CLI 實踐版**。

> 双云的版本：團隊裡多人各管一個 Agent。
> 單人 CLI 的版本：一個人在主對話拆解，平行發射多個 Sub-agent 去做。

---

## 核心結構

```
主對話（Commander）
  ├── 想清楚任務拆解邏輯
  ├── 決定哪些任務可平行、哪些需串行
  └── 下達指令給 Sub-agents（Executors）

Sub-agent（Executor）
  ├── 接收自成一體的任務說明
  ├── 執行後回傳結果摘要
  └── 不保留跨對話記憶
```

**鐵律**：**主對話想清楚，sub-agent 做乾淨。**

> 主對話如果自己沒想清楚就丟給 sub-agent，等於把混亂外包；sub-agent 是新同事，無法替你想。

---

## 何時用 Agent、何時直接做

| 情況 | 做法 |
|---|---|
| 需要搜尋大量檔案、不確定在哪裡 | 派 `Explore` agent |
| 已知檔案路徑，直接讀寫 | 用 `Read` / `Edit` / `Write` |
| 任務互相獨立、可同時進行 | 多個 agent 平行發射 |
| 後一步需要前一步的結果 | 串行，等結果再下一步 |
| 問題只需查詢，不需寫程式 | 用 `claude-code-guide` agent |
| 大型實作任務、需要獨立環境 | 用 `codex-rescue` agent |
| 設計實作架構、列出步驟 | 用 `Plan` agent |

---

## 平行 vs 串行 判斷樹

```
任務 B 需要任務 A 的輸出？
├── 是 → 串行（等 A 完成再發 B）
└── 否 → 任務 A、B 互相獨立？
          ├── 是 → 平行發射（同一訊息多個 Agent tool call）
          └── 否 → 確認依賴關係後再決定
```

**平行發射的關鍵**：必須在**同一個訊息內**包多個 Agent tool call，Claude Code 才會真的同時跑。分兩個訊息發是串行假裝平行。

---

## Sub-agent Prompt 三原則

Sub-agent 是「**剛走進房間的新同事**」，沒有對話上下文，所以 Prompt 必須：

1. **說清楚目標**：要完成什麼、產出是什麼
2. **給路徑**：明確的資料夾或檔案絕對路徑
3. **說明背景**：為什麼要做、有什麼限制
4. **限制回傳長度**：「回報 200 字以內摘要」

### 反例 vs 正例

**❌ 壞 Prompt**（太模糊，依賴 agent 自己想）
> 「幫我整理一下資料夾」

**✅ 好 Prompt**（自成一體，agent 不需問問題就能執行）
> 「把 `C:\...\專題討論\114下學期專討-博二` 下與資訊收集階段相關的子資料夾，
> 移入新建的 `A_資訊收集階段/` 目錄。
> 包含：01_題目提案與規劃、02_文獻管理、04_導讀相關、08_NotebookLM音檔、專討文獻集。
> 完成後回報已移動的資料夾清單（100 字以內）。」

---

## 實際流程範例（NCHU 博二專討資料夾整理）

```
主對話
├── [平行] Agent A：整理 A_資訊收集階段資料夾
├── [平行] Agent B：整理 B_專討準備階段資料夾
│
↓ 兩個 Agent 回報完成
│
├── 主對話：建立 index.html 導覽頁
├── [平行] Agent C：建 share_cards/ Facebook 分享圖卡
├── [平行] Agent D：建 script_viewer.html 講稿引用導覽頁
│
↓ 收到結果 → 整合修正
│
└── 主對話：修正本機連結邏輯（file:// BASE + encodeURIComponent）
```

**關鍵觀察**：
- 第一波 A+B 平行（彼此獨立）
- 等 A+B 完成後，主對話才能寫 index.html（依賴 A+B 的整理結果）
- 第二波 C+D 平行（都是基於 index.html 的延伸產出）
- 最後主對話收尾整合（無法外包的判斷）

---

## 與 AGENTS N 階段三協作模式的對應

| AGENTS N 階段（団隊版） | 單人 CLI 版 |
|---|---|
| **Pipeline**（A→B→C 串行） | 主對話依賴判斷 → 串行發 Sub-agent |
| **Sub Agent**（主呼叫專業判斷） | 主對話遇到專業領域 → 派 `claude-code-guide`、`codex-rescue` 等 |
| **Parallel**（多 Agent 同時工作） | 同一訊息發多個 Agent tool call |

差異點：
- 双云團隊版有「整合端品管壓力大」的問題（藝嘉合規 Sub Agent 可能 fallback）
- 單人 CLI 版的整合端永遠是**主對話自己**——不會 fallback，但會被自己限速

---

## 注意事項

- **Sub-agent 的「回報」是它打算做的事，不等於它已完成的事**——重要改動要自己驗證
- **同一個 sub-agent 要繼續對話用 `SendMessage`，不要重開**（重開會失去上下文）
- **背景執行**（`run_in_background: true`）適合不需要立即結果的長任務
- **Trust but verify**：subagent 的摘要描述意圖，未必等於實際結果。寫程式類動作完成後親自看 diff

---

## 常見 Agent 類型與用途

| Agent 類型 | 用途 |
|---|---|
| `Explore` | 探索程式碼庫、搜尋檔案、開放式查詢 |
| `Plan` | 設計實作架構、列出步驟 |
| `claude-code-guide` | 回答 Claude Code / Anthropic API / SDK 使用問題 |
| `codex-rescue` | 複雜實作、第二意見、大型重構（透過 Codex CLI） |
| `general-purpose` | 研究、多步驟查詢、混合任務 |

---

## 與其他 Agent 編排觀念的關係

| 觀念 | 說明 |
|---|---|
| AGENTS N 階段（団隊版） | 多人各自管理一個 Agent，靠交接規格書串接 |
| Commander+Executor（單人 CLI） | 一人主對話拆解，平行發射 sub-agent 執行 |
| `shuangyun-api-gateway`（API 版） | 機器之間自動路由的工業化版本 |

三者結構同源——**「想清楚 + 拆乾淨 + 串好交接」**。差別只在 Commander 是人 / 對話 / Gateway 哪一層。

---

## 相關連結

- AGENTS N 階段（団隊版）→ [shuangyun/AGENTS知識體系 §N](../shuangyun/concepts/AGENTS知識體系.md)
- API 工業化版 → [shuangyun/skills/API調度總機](../shuangyun/skills/API調度總機.md)
- 入口導覽頁（多 Agent 產出整合）→ [入口導覽頁 SOP](入口導覽頁SOP.md)
- 來源控制（多 Agent 產出品管）→ [來源控制與 script_viewer 模式](來源控制與script_viewer模式.md)
- 原始素材 → `中興大學生科所/專題討論/114下學期專討-博二/工作方法筆記.md`
