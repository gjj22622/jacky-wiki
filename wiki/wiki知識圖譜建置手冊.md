---
title: 如何建立個人知識圖譜 Wiki — 完整建置手冊
domain: root
updated: 2026-05-04
---

# 如何建立個人知識圖譜 Wiki

> **這份手冊回答**：如何從零建立一套可沉澱、可搜尋、可 AI 協作的個人知識圖譜。
> **案例**：Jacky Wiki（97 頁、7 個知識域）——以實際架構為例說明每個步驟。
> **適用對象**：双云夥伴、TBSA 學員、任何想建立個人知識管理系統的人。

---

## 目錄

1. [為什麼需要知識圖譜](#1-為什麼需要知識圖譜)
2. [什麼是知識圖譜 Wiki（不是一般筆記本）](#2-什麼是知識圖譜-wiki)
3. [Jacky Wiki 架構解析（完整案例）](#3-jacky-wiki-架構解析)
4. [STEP 1 — 定義你的知識域](#step-1--定義你的知識域)
5. [STEP 2 — 設計頁面規範（Page Schema）](#step-2--設計頁面規範)
6. [STEP 3 — 建立跨域拓樸（Cross-Domain Topology）](#step-3--建立跨域拓樸)
7. [STEP 4 — 三層萃取漏斗（inbox → 結晶）](#step-4--三層萃取漏斗)
8. [STEP 5 — AI 輔助工作流](#step-5--ai-輔助工作流)
9. [STEP 6 — 實踐捕手協定（跨模型記錄）](#step-6--實踐捕手協定)
10. [從零到一的行動路徑（30 天）](#從零到一的行動路徑)
11. [常見陷阱與規避](#常見陷阱與規避)
12. [工具推薦與安裝](#工具推薦與安裝)

---

## 1. 為什麼需要知識圖譜

### 沒有系統化知識管理的三種痛

| 痛點 | 具體症狀 | 成本 |
|---|---|---|
| **知識散落** | 方法論在腦袋、在 Line 群、在 Google Drive、在 Email | 每次重新解釋 = 重複損耗 |
| **傳承斷層** | 夥伴來問問題，每次都要從頭說一遍 | 1 個人的知識 = 組織的單點風險 |
| **記憶衰退** | 三個月前試過的方法，現在想不起來細節 | 重複踩坑，AI 實踐尤其嚴重 |

### Wiki 解決什麼

> **Wiki = 外接大腦**——不是把東西堆在那裡，而是把知識「結構化沉澱成可被呼叫的形式」。

| 沒有 wiki | 有 wiki |
|---|---|
| 夥伴問問題每次重新解釋 | 連結傳過去，自學 |
| 方法論散在某人腦袋 | 結構化頁面，可搜尋、可引用 |
| 新人要 3 個月師父帶 | 1 週讀 wiki + 半小時對焦 |
| AI 實踐事件丟失 | 實踐捕手協定 → 永久沉澱 |

---

## 2. 什麼是知識圖譜 Wiki

### 三個關鍵字

```
結構化  ×  可導航  ×  可成長
```

- **結構化**：每個知識有固定欄位（域、類型、日期）、有固定位置、有命名規範。
- **可導航**：域索引、跨域連結、入口導覽頁——讀者能「走進去」，不是看完就找不到了。
- **可成長**：新知識不是覆蓋舊知識，是依三層漏斗沉澱進來；wiki 隨實踐而演化。

### 知識圖譜 vs 一般筆記

| 維度 | 一般筆記（Notion / Bear / 手帳） | 知識圖譜 Wiki |
|---|---|---|
| 組織方式 | 線性時間順序 / 自由文本 | 域 + 頁面 + 雙向連結 |
| 搜尋 | 全文搜尋 | 結構化查詢 + 語義導航 |
| 傳承性 | 只有自己看得懂 | 有 schema，他人可以 onboard |
| AI 協作 | 沒有統一格式 | 一致格式 → AI 可直接 ingest |
| 去重 | 重複內容散落各處 | 單一來源（go to definition） |

### Obsidian 圖譜與 wiki 的關係

Jacky Wiki 用 **Obsidian** 管理——雙向連結在圖譜視圖中會自動可視化。
但 wiki 的本質不依賴 Obsidian——它是純 Markdown + YAML frontmatter，
任何 Markdown 閱讀器（VS Code、GitHub、Claude Code）都能用。

---

## 3. Jacky Wiki 架構解析

### 全域概覽

```
jacky-wiki/
├── CLAUDE.md                 # Wiki Schema 主規格（核心）
├── wiki/
│   ├── wiki主索引.md          # 總覽（含各域頁面數）
│   ├── log.md                # 操作日誌
│   ├── shuangyun/            # ⭐ 双云行銷（29 頁）
│   ├── jwood/                # ⭐ Jwood 木藝（9 頁）
│   ├── ailab/                # ⭐ AI 實踐（19 頁）
│   ├── jlife/                # 人生回憶錄（9 頁）
│   ├── tbsa/                 # 商務企劃協會（14 頁）
│   ├── nchu/                 # 中興博士（6 頁）
│   ├── cross-domain/         # 跨域素材（5 頁）
│   └── yinian/               # 待建
├── inbox/                    # 未分類輸入
└── raw/                      # 原始素材備存
```

> 總計 97 頁（7 個內容域 + 1 跨域），從 2026-04-29 起建，約一週完成主骨架。

### 每個域的定位

| 域 | 定位一句話 | 代表頁面 |
|---|---|---|
| **shuangyun** | 双云行銷的 AI Agent 方法論體系 | AGENTS知識體系.md |
| **jwood** | Jwood 木藝的品牌與 AI 工作流 | agent-team.md |
| **ailab** | Jacky 每天的 AI 實踐活知識（工具觀/方法觀） | 三層萃取漏斗.md |
| **jlife** | 從 0 開始的成長脈絡（前傳） | 自己搭場_2014-2020.md |
| **tbsa** | 20 年三段身分 × 三套方法論 | 三大方法論體系.md |
| **nchu** | 博士班 × AI 學術應用 | 零幻覺與文獻查證SOP.md |
| **cross-domain** | 跨域共用框架（去個人化） | Commander+Executor.md |

### 域間拓樸（最重要的一張圖）

```
         ┌──── jlife（從 0 開始的歷程 / 前傳）────┐
         │                                      │
         │  jlife/自己搭場 ←──────→ shuangyun   │
         │  jlife/AI與博士 ←──────→ shuangyun   │
         │  jlife/AI與博士 ←──────→ ailab       │
         │  jlife/作品線   ←──────→ jwood       │
         │  jlife/作品線   ←──────→ tbsa        │
         │  jlife/AI與博士 ←──────→ nchu        │
         │                                      │
         │  shuangyun ←── 人才循環 ──→ tbsa      │
         │  shuangyun ←── AI 體系  ──→ nchu      │
         │  ailab ←── 結晶 ↔ 活知識 ──→ shuangyun│
         │  ailab ←── 工具 ↔ 工作流 ──→ jwood    │
         │  ailab ←── 個人 ↔ 共用   ──→ cross-domain│
         └──────────────────────────────────────┘
```

**設計原則**：`jlife` 是所有域的「前傳」，事業/學術域是「現況」，
每條關係線都必須**雙向**（兩邊都要有對方的連結）。

---

## STEP 1 — 定義你的知識域

### 域是什麼

> 域 = 一個自洽的知識宇宙，有自己的索引頁、子目錄結構、與其他域的關係。

域不是「資料夾」——資料夾是容器，域是**有觀點、有邊界、有目的**的知識空間。

### 如何決定域數量

| 太少（1-2 個域） | 剛好（5-8 個域） | 太多（15+ 個域） |
|---|---|---|
| 全部擠在一起，失去導航價值 | 每個域有清楚定位，頁面找得到 | 維護成本暴增，跨域連結爆炸 |
| 沒有跨域對話的空間 | 跨域連結有意義 | 域間邊界模糊，重複內容多 |

**Jacky Wiki 的答案**：7 個內容域 + 1 個跨域（cross-domain）。
一個人的知識邊界通常 5-8 個域是合理的。

### 域設計原則

**1. 每個域有清楚的「不負責什麼」**

Jacky Wiki 的 ailab 域設計：
- ✅ 負責：Jacky 個人 AI 工具觀、方法觀、活知識
- ❌ 不負責：已結晶的 AI 方法論（那是 shuangyun/AGENTS 的）
- ❌ 不負責：AI 歷程（那是 jlife/AI與博士 的）
- ❌ 不負責：可直接給別人用的 SOP（那是 cross-domain 的）

**2. 前傳 ↔ 現況 雙域設計**

> 不要把「我怎麼變成現在這樣」和「現在是什麼樣」混在一起。

Jacky Wiki 的解法：
- `jlife` 專門放**歷程**（前傳）
- 其他域（shuangyun / jwood / tbsa / nchu）放**現況**

這樣可以在現況域專注方法論，在 jlife 域敘事成長——不相互汙染。

**3. 優先域 vs 次要域**

不是所有域都同等重要——應明確標記優先級。

Jacky Wiki：
- ⭐ 優先域：shuangyun / jwood / ailab（工作直接相關，高頻更新）
- 次要域：jlife / tbsa / nchu（重要但低頻更新）
- 待建：yinian（未來計畫）

### 你自己的域應該怎麼定

問自己三個問題：
1. **我現在有幾條主要的工作/生活/學習線？**（每條可能是一個域）
2. **哪些知識是「從 0 變成現在」的歷程，哪些是「現在的樣子」？**（前傳 ↔ 現況分離）
3. **哪些知識在多個域都用到？**（那些應該是 cross-domain/）

---

## STEP 2 — 設計頁面規範

### YAML Frontmatter（每頁必備）

每一頁 Markdown 頂部必須有：

```yaml
---
title: 頁面標題（可搜尋、中文為主）
domain: shuangyun  # 所屬域代碼
updated: 2026-05-04  # 最後更新日期（YYYY-MM-DD）
---
```

**為什麼重要**：
- `title` — AI 搜尋時的主要識別欄位
- `domain` — 讓 AI（Claude / 搜尋工具）知道這頁屬於哪個知識空間
- `updated` — 判斷資訊新鮮度，決定信任程度

### 檔名規範

**中文為主，英文補充**

| 好的檔名 | 不好的檔名 | 原因 |
|---|---|---|
| `AGENTS知識體系.md` | `agents-system.md` | 中文更直觀，不依賴英文別名 |
| `双云索引.md` | `index.md` | 唯一可識別（多個 index.md 容易混淆）|
| `AI行銷部定義.md` | `definition.md` | 自帶語義，不需要看路徑才知道內容 |

**Jacky Wiki 的實踐**：
所有索引頁都用中文命名——`双云索引.md`、`木作索引.md`、`TBSA索引.md`、`中興博士索引.md`——而不是 `index.md`。

### 去重原則（Single Source of Truth）

> 同一方法論只存一份，其他頁面用連結指向。

**反例（錯誤做法）**：
```
shuangyun/AGENTS知識體系.md  ← 完整定義
tbsa/三大方法論體系.md        ← 複製一份（壞！）
nchu/學術Skill體系.md         ← 又複製一份（壞！）
```

**正確做法**：
```
shuangyun/AGENTS知識體系.md  ← 完整定義（Single Source）
tbsa/三大方法論體系.md        ← 連結到 shuangyun 的頁面（好）
nchu/學術Skill體系.md         ← 連結到 shuangyun 的頁面（好）
```

**好處**：更新時只改一個地方；讀者知道「原典在哪裡」。

### 頁面類型與子目錄

不同類型的頁面放在對應子目錄：

| 子目錄 | 放什麼 | 例子 |
|---|---|---|
| `concepts/` | 方法論、理念、觀點 | AGENTS知識體系.md |
| `tools/` | 工具心得、設定 | claude-code.md |
| `courses/` | 教案、課程模組 | Week1拆.md |
| `skills/` | Skill 設計文件 | 双云技能索引.md |
| `cases/` | 客戶案例、實際案例 | 濂直火割烹.md |
| `sop/` | 標準流程 | 找賣點SOP.md |
| `stages/` | 時間軸、階段（jlife 專用） | 自己搭場_2014-2020.md |
| `patterns/` | 跨場景驗證的穩定模式 | 模式索引.md |
| `experiments/` | 仍在驗證中的實驗 | 2026-Q2實驗清單.md |
| `log/` | 重大里程碑（精選） | 2026-04_AGENTS_v1.0→v1.1.md |

---

## STEP 3 — 建立跨域拓樸

### 為什麼跨域連結比頁面更重要

> **知識圖譜的「圖」就在這裡**——頁面是節點，連結是邊。
> 沒有連結，wiki 只是一堆 Markdown 文件；有了雙向連結，才是真正的知識圖譜。

### 前傳 ↔ 現況 雙向連結（強制）

每個「歷程頁」都要連到對應的「現況頁」，反之亦然：

**例：jlife 的 `自己搭場_2014-2020.md`**

```markdown
# 自己搭場（2014-2020）

這段歷程催生了双云行銷。

→ 現況：[双云行銷現在的樣子](../../shuangyun/双云索引.md)
```

**例：shuangyun 的 `双云索引.md`**

```markdown
# 双云行銷

双云從 Jacky 2014 年自己搭場的歷程演化而來。

→ 前傳：[自己搭場_2014-2020](../jlife/stages/自己搭場_2014-2020.md)
```

### 同層域共生關係

除了前傳 ↔ 現況，同屬「現況」的域之間也有共生關係：

| 關係 | 說明 | Jacky Wiki 例子 |
|---|---|---|
| 人才循環 | 一個域訓練的人才流到另一個域 | shuangyun ↔ tbsa |
| AI 體系互通 | 學術研究支持商業體系 | shuangyun ↔ nchu |
| 活知識 ↔ 結晶 | 實踐記錄 ↔ 已固化方法論 | ailab ↔ shuangyun |
| 工具 ↔ 工作流 | 工具實驗 → 多模態工作流 | ailab ↔ jwood |
| 個人 ↔ 共用 | 個人視角 → 去個人化 SOP | ailab ↔ cross-domain |

### 每次新增頁面的連結 Checklist

新增一頁後，問自己：

- [ ] 這頁的內容有沒有「前傳」在 jlife？如果有，雙向連結建了嗎？
- [ ] 這頁的方法論，其他域會用到嗎？如果有，對方的索引頁要加連結嗎？
- [ ] 這頁跟 cross-domain 的某個頁面是不是同一個模式？如果是，連過去就好，不要複製。

---

## STEP 4 — 三層萃取漏斗

### 概念

知識不應該直接「倒進 wiki」——應該先在 inbox 緩衝，再依成熟度升格。

```
[每天的實踐 / 想法]
         ↓
[Layer 1: inbox]          ← 低門檻，任何值得記的都進來
         ↓（依事件本身判斷）
[Layer 2: experiments / log]  ← 驗證中 or 重大里程碑
         ↓（重複出現 + 穩定）
[Layer 3: concepts / tools / patterns]  ← 結晶層（wiki 主體）
```

### 升格四問

每次處理 inbox 事件，問自己：

1. **這事件可重現嗎？** → 可重現 = patterns/ 候選
2. **跨場景嗎？** → ≥2 場景 = patterns/ 或 cross-domain/
3. **改變了我的選擇嗎？** → 改工具選擇 = tools/；改思考方式 = concepts/
4. **未來會回頭看嗎？** → 會 = log/；不會 = 留 inbox 或關檔

**四問都 yes → concepts/ 級結晶**
**四問都 no → 留 inbox 或 archive**

### 不要這樣做

| 反面教材 | 問題 |
|---|---|
| 「每天必看 inbox」 | 變成雜事，心理負擔大 |
| 「每月強制 review」 | 變成交作業，機械化 |
| 「30 天沒更新就關檔」 | 機械化門檻——有些實驗本來就是長期跑 |

### 應該這樣

> **有事件就記，有重複就升，有大事就 log。**
> 依事件成熟度判斷，不依時間。

---

## STEP 5 — AI 輔助工作流

### Claude Code + Skills 組合

Jacky Wiki 使用 Claude Code（AI 輔助 IDE）搭配自定義 Skills：

```
Claude Code
├── /wiki          ← 查詢 / 更新 wiki
├── /ailab         ← AI 實踐事件記錄
├── /jacky-wiki    ← 完整 wiki 操作入口
└── auto-memory    ← 跨對話持久記憶（.claude/projects/.../memory/）
```

### 怎麼呼叫 wiki

**在 Claude Code 對話中**：

```
你：「幫我用 SOSTAC 分析這個客戶」
AI：自動讀 tbsa/concepts/SOSTAC方法論.md + tbsa/templates/

你：「找這個客戶的賣點」
AI：自動讀 找賣點SOP.md + 賣點命名理論.md
```

**直接指令**：
```
/wiki                      # 顯示主索引
/wiki query "AGENTS 認證標準"   # 查詢
/wiki add <素材>               # 新增到對應域
```

### Auto-Memory 系統

Claude Code 會自動把跨對話重要資訊存在：
```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # 索引（每條 150 字以內）
├── user_*.md          # 關於用戶的事
├── feedback_*.md      # 用戶的偏好與糾正
├── project_*.md       # 專案狀態
└── reference_*.md     # 外部資源指標
```

**這意味著**：每次對話，AI 都「記得」你是誰、你的偏好、專案進度——不需要每次重新解釋。

### 在非 Claude 環境的使用

沒有 Claude Code 時，wiki 仍然可用：

| 工具 | 使用場景 |
|---|---|
| **Obsidian** | 看知識圖譜、探索式思考、手機同步 |
| **GitHub 網頁** | 出門開會前快查 |
| **VS Code** | 編輯與更新 |

---

## STEP 6 — 實踐捕手協定

### 為什麼需要「協定」，而不只是隨手記

| 問題 | 沒協定的後果 | 有協定的好處 |
|---|---|---|
| 跨模型 | Claude / ChatGPT / Gemini 各記各的 | 統一格式，任何模型輸出都能直接 ingest |
| 跨對話 | 每次從零開始描述 | 9 欄位不漏關鍵維度 |
| 跨時間 | 兩個月後看不懂當時記什麼 | 結構化，時序/模型/成熟度都能追 |
| 升格難 | 流水帳 → 升格 wiki 時無法判斷 | 自帶 maturity 欄位 → 漏斗判斷直接化 |

### Mode A：單一事件（9 欄位）

```yaml
---
event: <一句話，30 字內>
date: YYYY-MM-DD
model: <claude-opus-4.7 / gpt-5.4 / gemini-2.5-pro / ...>
context: <在哪個場景：双云 / Jwood / NCHU / 個人實驗>
type: <突破 | 失敗 | 工具發現 | 模式發現 | 模型對比 | 工作流改進>
maturity: <想法 | 實驗中 | 已驗證 | 已穩定>
tags: <逗號分隔標籤>
---

## 發生了什麼
## 為什麼重要
## 怎麼做的
## 對比與替代
## 連結與出處
## 升格目標（建議落點）
```

### Mode B：Session 總結（對話結尾用）

```yaml
---
session_date: YYYY-MM-DD
session_topic: <一句話>
model: <主用模型>
context: <場景>
type: session-summary
tags: <逗號分隔>
---

## 最終做法（What Worked）
## 繞路紀錄（Detours）
## 錯誤與失敗（What Failed）
## 升格候選
## 待延伸（Next）
```

**Mode B 最珍貴的是「繞路紀錄」**——記錄哪些路走錯了、為什麼走錯。
這是一般筆記不會記、但未來最值錢的內容。

### 在任何 AI 觸發協定

把這段貼進任何 AI 對話：

```
請用「實踐捕手協定 Mode A」記錄剛才這個 AI 實踐事件，
輸出 9 欄位 YAML + 五段內文格式（發生了什麼 / 為什麼重要 / 怎麼做的 / 對比與替代 / 升格目標）。
```

或對話結尾：

```
請用「實踐捕手協定 Mode B」總結這次對話，
保留「最終做法 / 繞路紀錄 / 錯誤與失敗」三方對照。
```

---

## 從零到一的行動路徑

### Week 1 — 打地基（4 小時）

| 動作 | 說明 |
|---|---|
| 建 git repo | `git init wiki` + push 到 GitHub（private）|
| 寫 CLAUDE.md | 域代碼 / 命名規範 / 跨域規則（先粗稿，後細化）|
| 定義域清單 | 5-8 個域，每個域一句話定位 |
| 建目錄骨架 | `wiki/<domain>/` + 各域 `<中文>索引.md` |
| 寫主索引 | `wiki/wiki主索引.md`（域清單 + 頁面數）|

### Week 2 — 填第一批內容（2 小時/天）

| 動作 | 說明 |
|---|---|
| 每域至少 3-5 頁 | 優先域先填（方法論、SOP、索引）|
| 全部加 frontmatter | `title / domain / updated` |
| 建第一批雙向連結 | jlife ↔ 各事業域的前傳/現況連結 |
| 更新主索引頁數 | 每新增一頁就更新 |

### Week 3 — 第一次 AI 實踐記錄

| 動作 | 說明 |
|---|---|
| 建 inbox/ | `wiki/ailab/inbox/` 或等效的暫存區 |
| 用協定記一個事件 | Mode A 或 Mode B 各一份 |
| 跑升格四問 | 決定這事件要不要升到結晶層 |
| 第一個 `/ailab` Skill | 如果用 Claude Code，安裝 ailab Skill |

### Week 4 — 穩定節奏

- 有事件就記（不強制每天）
- 有重複就升（≥2 場景就考慮 patterns/）
- 每次 ingest 後更新主索引頁數 + log.md

---

## 常見陷阱與規避

### 陷阱 1：「先把所有東西都入 wiki」

**症狀**：看到任何內容就想 ingest，wiki 迅速膨脹到幾百頁但找不到東西。

**規避**：三層漏斗——不成熟的事件先進 inbox，成熟了才升。
**底線**：草稿、未拍板、進行中的版本不入 wiki。

### 陷阱 2：「域越多越好」

**症狀**：15 個域、維護成本高、跨域連結爆炸、每個域只有 1-2 頁。

**規避**：先建 3-5 個域，6 個月後視需求再拆分。寧可一個域大一點，也不要域太多太碎。

### 陷阱 3：「只有自己看得懂的命名」

**症狀**：`page1.md`, `notes-2024.md`, `temp.md`, `final_v3_FINAL.md`

**規避**：檔名 = 一眼看出內容（如 `AGENTS知識體系.md`）。
命名規範寫進 CLAUDE.md，AI 才能遵守。

### 陷阱 4：「更新舊知識就直接覆蓋」

**症狀**：版本歷史消失，不知道方法論為什麼演化。

**規避**：重大版本（如 v1.0→v1.1）開 log/ 記錄，說明觸發事件、改了什麼、為什麼改。
演化脈絡本身就是知識。

### 陷阱 5：「wiki 跟 AI 工作流分開」

**症狀**：wiki 是靜態的，AI 對話的產出全部散在 Chat History，永遠不入 wiki。

**規避**：實踐捕手協定 + /ailab Skill——讓每次有價值的 AI 實踐事件都能低摩擦地進 inbox。

---

## 工具推薦與安裝

### 最低配置（免費）

| 工具 | 用途 | 費用 |
|---|---|---|
| **VS Code** | 編輯 Markdown | 免費 |
| **Git + GitHub** | 版本控制 + 多機同步 | 免費（private repo 也免費）|
| **Obsidian** | 圖譜視圖 + 雙向連結預覽 | 個人免費 |

### 進階配置（有 AI 協作）

| 工具 | 用途 | 費用 |
|---|---|---|
| **Claude Code** | AI 輔助建 wiki + Skills | 訂閱制（Pro / Max）|
| **Claude Code Skills** | /wiki / /ailab 等自動化 | 內建於 Claude Code |
| **Auto-Memory** | 跨對話持久記憶 | 內建於 Claude Code |

### 安裝 Claude Code 後的 wiki 設定

1. 在 wiki repo 根目錄建 `CLAUDE.md`（Schema 主規格）
2. 安裝 Skills：
   ```
   ~/.claude/skills/ailab/SKILL.md   ← ailab 實踐記錄 Skill
   ~/.claude/skills/jacky-wiki/SKILL.md  ← wiki 查詢 Skill
   ```
3. 設定 git identity：
   ```bash
   git config user.name "Jacky"
   git config user.email "gjj22622@gmail.com"
   ```

---

## 結語

> Wiki 的本質不是「文件系統」——是**「可被呼叫的知識形式」**。
>
> 當你能對 AI 說「查一下 SOSTAC 的三個分析工具是什麼」，然後 AI 直接從你的 wiki 找到正確頁面給你——這才叫知識圖譜真正發揮作用。
>
> 它不是你寫給自己的，是你留給未來的人（也包括未來的你）的。

---

## 相關連結

- 主索引 → [wiki主索引.md](wiki主索引.md)
- 實踐捕手協定 → [ailab/concepts/實踐捕手協定.md](ailab/concepts/實踐捕手協定.md)
- 三層萃取漏斗 → [ailab/concepts/三層萃取漏斗.md](ailab/concepts/三層萃取漏斗.md)
- 簡報版 → [wiki知識圖譜建置簡報.html](wiki知識圖譜建置簡報.html)
- 操作日誌 → [log.md](log.md)
