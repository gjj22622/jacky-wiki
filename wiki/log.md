---
title: Wiki 操作日誌
domain: root
updated: 2026-05-01
---

# Wiki 操作日誌

> 記錄 wiki 整理過程的關鍵操作。**只記下「做了什麼、為什麼這樣做、留下什麼決策」**——不重複頁面內容本身。

---

## 2026-05-01

**主題**：双云 AI 行銷部平台架構決策——多品牌獨立應用 + 中控台。

### 決策

新增 `shuangyun/concepts/多品牌獨立應用架構.md`，記錄 Jacky 對 2clouds-agents 平台的上位架構要求：

- 双云 AI 行銷部是 Command Center，不是把所有品牌資料塞在一起的大工作區。
- 每個甲方品牌都應是可獨立運作的 Brand App。
- 每個 Brand App 需要獨立品牌腦、任務、review、trace、營收訊號、品牌 skill / prompt context。
- 每個成員需要自己的獨立工作環境與權限範圍。
- 品牌間要維持機密隔離，但能透過双云中控進行協作、調度與品管。

### 判斷理由

這個決策延伸自 `AI行銷部定義.md` 的「每個客戶一套 4 Agent 委員會」；平台化後必須進一步明確 `brandId`、member scope、skill / prompt boundary，避免品牌資料互相污染。

### 同步

- 更新 `shuangyun/双云索引.md`，加入新概念頁。
- 更新 `wiki主索引.md` 的 shuangyun 頁面數與 concepts 頁面數。
- 專案 `2clouds-agents` 同步新增 `docs/multi-brand-app-architecture.md`，作為工程實作方向。

## 2026-04-29

**主題**：双云域首次大規模 ingest——把 OneDrive `双云AI轉型教育訓練/` 的核心素材搬進 wiki。

### 背景

在此之前，wiki 只有 7 個頁面（[wiki主索引.md](wiki主索引.md)、5 個域的索引頁、跨域 賣點命名理論、shuangyun 兩個 cases 與 1 個 sop）。今天決定優先處理 ⭐ 双云域，因為它是最高優先域且素材最豐富。

OneDrive `双云AI轉型教育訓練/` 共約 2000 多個檔案，無法全部搬入。先掃 inventory（[第一次 ls](#)），再分批處理：選擇「方法論密度高、可長期使用」的頁面進 wiki，「進度追蹤、ephemeral 任務狀態」留在 OneDrive。

---

### 批次 1｜首批 ingest（commit d458aac）

| 來源 | 處理結果 |
|---|---|
| `AGENTS.md`（OneDrive 根目錄，原 Codex Instructions） | → `concepts/AGENTS方法論落地.md`（双云專案落地總覽，採 SOSTAC 結構重組） |
| `03_團隊操作指南/`（2 個檔） | → `concepts/AI行銷部定義.md`（合併「定義文件 v1」+「操作全指南 v1.0」，分為 11 個 Part） |
| `02_課程架構與教案/`（10 個檔） | → `courses/{week2,week3,week4,week5}.md` + `courses/課程總覽.md` + `concepts/AI備課流程.md`（meta 備課流程獨立） |

**版本選擇**

- Week 3：v1/v2/v3 並存 → 採 v3（新增交叉測試 + 醫美加碼）
- Week 4：v1/v2/v3 並存 → 採 v3（新增 Skill 管理系統 + 架構師認同）
- Week 5：v1（API 串接版）+ v2（AI 行銷部 v3）→ **採 AI 行銷部 v3**，並在頁面注記為何放棄 v1 技術路線
- Week 1：OneDrive 沒有獨立教案，標為「尚未整理」

**設計決策**：每個 Week 頁面只放教案核心，方法論細節（流程拆解 6 維度、9 區塊、3 色情境、3 種協作）一律連回 `AGENTS方法論落地.md`，不重複。

---

### 批次 2｜AGENTS 知識體系（commit bd65e13 含）

| 來源 | 處理結果 |
|---|---|
| `11_AGENTS_知識體系/01_AGENTS方法論_知識體系全書.md`（v1.0 / 731 行） | → `concepts/AGENTS知識體系.md`（六字訣 / 三級認證 / 三場景部署 / 與 SOSTAC + SPEAKS 整合圖） |
| `11_AGENTS_知識體系/02_AGENTS認證考核手冊.md`（v1.0 / 392 行） | → `concepts/AGENTS認證手冊.md`（L1/L2/L3 評分表，濃縮為緊湊表格） |

**處理 namespace 衝突**：原 `AGENTS方法論落地.md`（從 OneDrive 根 AGENTS.md 整理）容易跟「AGENTS® 方法論」混淆。處理方式：不改檔名、不破壞既有連結，在原頁頂加分流註記，明確指向兩個新頁。

**未搬入**（原始素材保留 OneDrive）：

- `03_AGENTS方法論內部提案簡報.pptx`（14 張）
- `AGENTS_知識體系架構圖.html`（互動式視覺化）
- `AGENTS知識體系_通用版/`（對外授課版本）— 與內部版同源，wiki 用內部版，通用版的存在在 `AGENTS知識體系.md` 底部註記

---

### 批次 3｜Skills 層（commit bd65e13）

| 來源 | 處理結果 |
|---|---|
| `06_Skills/`（22 個 Skill，含 7 個頂層 + Skill OS 8 個 + 双云技能包 14 個） | → `skills/`（13 頁涵蓋全部適合放 wiki 的 Skill） |

**判斷標準（用戶要求 judge）**

| 決策 | 對象 | 理由 |
|---|---|---|
| ✅ 獨立頁（8 個） | 5 助教（scoring/completion-coach/config-converter/wisdom-merger/progress-tracker）+ api-gateway + jacky-agent + jie-an-liu-cheng + cruelty-test | 課程／業務核心，每個都有獨立教學價值 |
| ✅ 集成頁（3 個） | Skill OS 8 個 → `SkillOS系統.md`；自動化 4 個 → `自動化流程.md`；客戶模板 3 個 → `品牌模板.md` | 緊密耦合的子系統，個別檔案太薄、合在一頁更好用 |
| ❌ 不放 wiki/shuangyun/ | jackybraincommander/control、jacky-question-master、tbsa-jacky-agent、tbsa-sostac-planner | 跨域或他域，僅在 `skills/双云技能索引.md` 註記 + 觸發區分原則 |
| ❌ 不重複放 | `agents-methodology.skill`（11_AGENTS_知識體系/） | 方法論本身已在 `concepts/AGENTS知識體系.md` |

**設計決策**

- 每頁結構統一：定位 → 觸發條件 → 執行流程 → 判斷邏輯 → 邊界 → KPI → 相關連結
- 雙向交叉連結：上下游 Skill 互相 link、連回 `concepts/`、連回 `courses/`
- 5 助教頁特別保留 SKILL.md 裡的關鍵警語（例 scoring-agent 的 Word 表格雙軌讀取血淚教訓）
- 三段式命名（`{domain}.{layer}.{verb-output}`）和三層架構（Brain / Hand / Infra）作為索引主軸

---

### 今日成果統計

| 類別 | 數量 |
|---|---|
| 新增頁面 | 20 個（concepts +5、courses +5、skills +13、courses/index +1，扣除 cross-counted） |
| 修改頁面 | 2 個（`shuangyun/双云索引.md`、`AGENTS方法論落地.md` 加分流註記） |
| 涵蓋原始 Skill 數 | 22 個 |
| 累計文字量 | ~181 KB Markdown |
| Commits | 2（`d458aac`、`bd65e13`） |

### Wiki 整體頁面數變化

| 時間點 | 頁面數 |
|---|---|
| 初始（2026-04-28 init） | 7 頁 |
| 批次 1 後 | 15 頁 |
| 批次 2-3 後（今日結束） | **30 頁** |

---

### 待處理（OneDrive 已掃過但未搬入 wiki）

按 [批次 0 評估](#) 順序：

1. **04_助教Agent設定檔/**（5 個 md）— 助教 Agent 課堂用設定，可選擇性整合
2. **05_實作上傳/**（172 檔）— 學員作業，主要是 ephemeral 不適合進 wiki
3. **07_殘酷測試素材/**（623 檔）— 三色題庫，方法論層面已在 `個人化殘酷測試.md` 提及，題庫本身不進 wiki
4. **08_Agent工廠API互控_落地執行手冊.docx**（待解析評估）
5. **09_双云Agent應用 / 12_KOL_AI_AGENT / V2_AI_AGENT_2lcouds**（程式碼專案，不進 wiki，必要時摘設計理念）
6. **13_客戶Agents_20260421/母親節貼文_8品牌_v1.md**（客戶實戰素材）
7. **14_入口網頁工作坊/**（HTML + 截圖，視覺類）

---

### 工作準則確認（從本次 ingest 提煉）

1. **方法論集中於 `concepts/`，課程教案在 `courses/`，可呼叫單元在 `skills/`** — 三者不重複，靠交叉連結串接
2. **版本選擇取最新**（v3 > v2 > v1），但保留 v1/v2 的設計演進注記在頁面內
3. **Ephemeral 內容（待辦清單、進度勾選、團隊個別狀態）不進 wiki**——這些屬專案管理而非知識體
4. **個人隱私 / 家人細節不放 wiki**（CLAUDE.md 既有規則，本次無觸發）
5. **跨域 Skill 不放 shuangyun，只在 index 註記**——避免域邊界模糊
6. **原始素材路徑（OneDrive 完整路徑）保留在每頁 frontmatter 下方**——便於日後追源

---

## 2026-04-30

**主題**：方法論敘事大修正 + TBSA 5 大表單建立 + 內部團隊分享文件

### 批次 1｜方法論敘事三輪修正

| 輪 | 修正 | commit |
|---|---|---|
| 1 | SPEAKS / AGENTS 創作敘事（從「Jacky × Claude 共創」「Jacky × Zoe 共建」「双云首創」改為「Jacky 主筆」） | a79d43c |
| 2 | SOSTAC 「14 年弧線／整合者」改為 **20 年三段身分**（學習者 → 實踐者 → 倡議者） | af36987 |
| 3 | IP 治理結構（方法論內核 vs 商標品牌分開）：SOSTAC 國際 / SPEAKS Zoe 公司 / AGENTS 双云行銷；TBSA 都是被授權方 | （在 1+2 中） |

> 此次修正源於 Jacky 對敘事精確性的高要求——已寫入 [memory/feedback-narrative-precision.md](../../.claude/projects/C--Users-gjj22-jacky-wiki/memory/feedback-narrative-precision.md)。

### 批次 2｜TBSA 5 大表單（commit 56f3b0e）

| 來源 | 處理結果 |
|---|---|
| `OneDrive/TBSA知識體系/TBSA企劃工具表單欄位說明_2025.pptx` | → `tbsa/templates/` 6 頁 |
| 兩本 TBSA 教材（初階洪敏莉 / 進階鄭沂珊） | 已在 4-29 整理完，本次補上附錄三的 5 大表單實作工具 |

**新增頁面**

- 五大表單總覽（流程圖 + 依賴關係 + SOSTAC 對應 + SPEAKS 對應）
- 表單 1：企劃情報／概念分析（PESTEL + 產業 + 競爭 + 消費者 + 內部）
- 表單 2：現況分析與策略目標設定（SWOT 矩陣 + SMART 目標 + 對策）
- 表單 3：STP 市場策略設計（區隔 → 目標 → 定位）
- 表單 4：行銷戰術及溝通活動設計（7Ps + AIDAS）
- 表單 5：一頁企劃書（全 SOSTAC 收束）

### 批次 3｜內部團隊分享文件 + 簡報

- `wiki/團隊分享.md`：給双云夥伴／TBSA 學員的 wiki 介紹文件
- `wiki/團隊分享簡報.md`：Marp 格式簡報（可直接 export PPTX）

### 批次 4｜Memory 系統建立

從零建立 6 份 memory + 1 份索引，涵蓋：
- 用戶身分（jacky-profile）
- 三套方法論 IP 治理（methodology-ip）
- wiki 結構（wiki-structure）
- 敘事精確性偏好（feedback-narrative-precision）
- 直接行動偏好（feedback-direct-action）
- OneDrive 來源路徑（reference-onedrive-paths）

> 目的：未來新對話可從 memory 快速 onboarding，不需重新解釋背景。

### 今日成果統計

| 項目 | 數量 |
|---|---|
| 新增頁面 | 8 個（5 表單 + 總覽 + 團隊分享 + 簡報） |
| 修改頁面 | 約 12 個（敘事修正涉及多檔） |
| 總頁面數變化 | 61 → **69**（含團隊分享 2 頁） |
| Memory 檔案 | 7 個（含索引） |
| Commits | 3 個（a79d43c / af36987 / 56f3b0e） |

### Wiki 整體頁面數變化

| 時間點 | 頁面數 |
|---|---|
| 2026-04-29 結束 | 61 頁 |
| 2026-04-30（早） | 69 頁 |
| **2026-04-30（晚 — NCHU + cross-domain 升版第一批） | **74 頁** |

### 已建立的呼叫機制（待補強）

- ✅ Claude Code 對話自動讀 CLAUDE.md（已運作）
- ✅ Memory 持久化（本次新增）
- 🔲 快查表（情境 → 路由）— 待建
- 🔲 `jacky-wiki-router` Skill — 最強的呼叫方式，待建
- 🔲 對外部署（Zeabur 給夥伴／客戶看）— 待評估

---

## 2026-04-30（晚）

**主題**：NCHU 博士班場景倒灌進 wiki + AGENTS v1.1 升版第一批（cross-domain 三新頁）

### 觸發

Jacky 提出「把中興博士班加入 wiki，你可能會更完整理解我的 AGENT 用法」。派 4 路 Explore subagent 偵察後發現，wiki 的 nchu 域 3 頁是骨架，**真實實踐遠超記錄**：

1. 博二（不是博一）；研究主題已定（森林數位孿生 / 葉綠素螢光 / 衛星遙測 / AI）
2. 共指朱彥煒老師（基資所，演算法／ML）
3. 第三次專討題目定案（2026-04-28）：**森林數位孿生作為下一世代地上生物量與碳儲量估算技術**，2026-05-13 上場
4. 6 個規劃 Skill 中**只有 1 個（seminar-helper）真正實作**——wiki 寫得過度樂觀
5. 73% 作者名幻覺事故（2026-03-12，26 檔 19 錯）已用 script_viewer + 人工修正
6. **入口導覽頁 + script_viewer + 工作方法筆記**三個跨域工具——之前 wiki 完全沒收

### 批次 1｜cross-domain 三新頁（這次）

| 新頁 | 用途 | 萃取自 |
|---|---|---|
| [入口導覽頁 SOP](cross-domain/入口導覽頁SOP.md) | 每個專案完成後產 `index.html` 收束分散產出 | 6 實例（双云架構圖 / 通用版 / 教育訓練入口 / Jwood Brand 3 份 / NCHU 博二專討 / 3D 知識圖）|
| [來源控制與 script_viewer 模式](cross-domain/來源控制與script_viewer模式.md) | AGENTS E 階段事前品管雙軌 | NCHU 博二 `script_viewer.html`（左講稿 70% + 右文獻 30%，14 篇白名單，cite tooltip）|
| [Commander+Executor 單人多 Agent 模式](cross-domain/Commander+Executor單人多Agent模式.md) | AGENTS N 階段三協作模式的單人 CLI 版 | NCHU 博二 `工作方法筆記.md`（2026-04-22）|

### 批次 2｜nchu 修訂兩頁

| 頁面 | 修正 |
|---|---|
| [中興博士索引](nchu/中興博士索引.md) | 博一 → 博二；補朱彥煒共指；補研究方向；補 2026-04-28 題目定案；隱私邊界（中庸版）；新增「跨域貢獻」表 |
| [學術 Skill 體系](nchu/concepts/學術Skill體系.md) | 誠實版：6 規劃 + 1 已實作（seminar-helper）；補實作優先順序；建議新增 `nchu-advisor-zhu` |

### 批次 3｜索引同步

- `wiki主索引.md`：69 → 74，補 cross-domain 5 頁清單
- `cross-domain/跨域索引.md`：補三新頁 + 視覺化專案區（3D 知識圖）

### 對 AGENTS v1.1 的衝擊（待動筆）

NCHU 場景貢獻 6 個 v1.0 沒涵蓋的維度：

1. 入口導覽頁範式（→ N 階段「Agent 產出視覺化整合」章節）
2. script_viewer 來源控制（→ E 階段「事前品管 vs 事後測試」雙軌）
3. Commander+Executor（→ N 階段三協作模式補單人 CLI 版）
4. 9 階段倒推時程（→ T 階段「倒推 vs 排程」雙模式）
5. 零幻覺 + 單一資料來源（→ E 階段紀律章節）
6. Brain 層代理人模型（→ N 階段「代理人型 Agent」獨立分類）

### 第二批｜nchu 三新頁（接續完成）

| 新頁 | 用途 | 萃取自 |
|---|---|---|
| [9 階段專討工作流](nchu/concepts/9階段專討工作流.md) | seminar-helper 方法論升格、AGENTS 學術版（D-60 → D-day 倒推時程）| `~/.claude/skills/seminar-helper/SKILL.md` |
| [零幻覺與文獻查證 SOP](nchu/concepts/零幻覺與文獻查證SOP.md) | 73% 作者名幻覺事故 + 八項紀律 + 雙軌品管 | 2026-03-12 真實事故 |
| [第三次專討 — 森林數位孿生](nchu/cases/第三次專討.md) | 結構摘要（隱私邊界 B 中庸版）| 博二專討資料夾完整成品集 |

### 第二批｜雙向連結

- `jlife/AI與博士_2023-2026.md` 補：博二、共指朱彥煒、第三次專討題目定案、73% 幻覺事故、Commander+Executor 模式
- `wiki主索引.md`：nchu 域 3 → 6 頁，補完整目錄結構（concepts 4 + cases 1）
- 總頁數 74 → **77**（含本批增加的 nchu 三頁）

### 隱私邊界決策（這次拍板）

採 **B 中庸版**：
- ✅ 可入：研究方向、專討題目、研究主題、跨域工具鏈、9 階段工作流方法論、73% 幻覺事故修正流程
- ❌ 不入：未發表研究結果、實驗數據、論文初稿、與老師私下討論、農業部科專計畫（該案沒有進行）

### 對 AGENTS v1.1 的衝擊（待動筆 v1.1 升版）

NCHU 場景貢獻 6 個 v1.0 沒涵蓋的維度（已記錄在新增頁面中，待整合進 AGENTS 知識體系 v1.1）：

1. **入口導覽頁範式** → N 階段「Agent 產出視覺化整合」章節（[入口導覽頁 SOP](cross-domain/入口導覽頁SOP.md)）
2. **script_viewer 來源控制** → E 階段「事前品管 vs 事後測試」雙軌（[來源控制 viewer](cross-domain/來源控制與script_viewer模式.md)）
3. **Commander+Executor** → N 階段三協作模式補單人 CLI 版（[Commander+Executor](cross-domain/Commander+Executor單人多Agent模式.md)）
4. **9 階段倒推時程** → T 階段「倒推 vs 排程」雙模式（[9 階段專討工作流](nchu/concepts/9階段專討工作流.md)）
5. **零幻覺 + 單一資料來源** → E 階段紀律章節（[零幻覺與文獻查證 SOP](nchu/concepts/零幻覺與文獻查證SOP.md)）
6. **Brain 層代理人模型**（模擬指導教授）→ N 階段「代理人型 Agent」獨立分類（[學術 Skill 體系](nchu/concepts/學術Skill體系.md)）

### 第三批｜AGENTS v1.1 草案產出 + **方法論修正：草案不入 wiki**

接續第二批 NCHU 升版後，把三實踐場（双云団隊 / Jwood 多模態 / NCHU 單人深度）反推的 12 個新元素整合進 AGENTS 方法論本身。

#### 📌 重要方法論教訓（這次學到）

最初將 `AGENTS知識體系_v1.1草案.md` 直接寫入 `wiki/shuangyun/concepts/`。Jacky 即時更正：

> **wiki 是已確認知識的整理；草案／進行中／未拍板的版本應在 OneDrive 等待，等穩定後才 ingest 進 wiki。**

**修正動作**：
- v1.1 草案檔案移至 OneDrive：`双云AI轉型教育訓練/11_AGENTS_知識體系/04_AGENTS方法論_v1.1草案.md`
- 撤回 wiki 中 `双云索引.md` 與 `wiki主索引.md` 對草案的引用（草案不算 wiki 頁面）
- 此原則寫入 memory `feedback-wiki-stable-only.md`，避免再犯

#### v1.1 草案內容（在 OneDrive，568 行）

**v1.0 → v1.1 12 個新元素整合位置**：

| # | 新元素 | 來源 | 整合位置 |
|---|---|---|---|
| 1 | 訪談式拆解（人物 → Brain Skill）| NCHU + 双云 | A 階段補章節 |
| 2 | 多模態 Agent 設計（圖／音／影 + 設定檔即劇本）| Jwood | G 階段補章節 |
| 3 | 單一資料來源紀律 | NCHU 73% 幻覺 | G 階段補章節 |
| 4 | 產出固化原則 | NCHU 導讀 PPTX | G 階段補章節 |
| 5 | 雙軌品管（事前可追溯性 + 事後殘酷測試）| NCHU 73% 幻覺 | **E 階段重大改動** |
| 6 | 第 4 協作模式：Brain 共享 + Series 並行 | Jwood Series A/B/C/D | N 階段第 4 模式 |
| 7 | AI 行銷部四角色組織模型 | 双云 Week 5 v2 | N 階段升格章節 |
| 8 | 入口導覽頁範式 | 6 實例 | N 階段補章節 |
| 9 | Brain 層代理人模型 | NCHU + 双云 | N 階段補章節 |
| 10 | Commander + Executor（單人 CLI）| NCHU 工作方法筆記 | N 階段補單人 CLI 版 |
| 11 | 倒推時程編排（vs 排程）| NCHU 9 階段 | T 階段補章節 |
| 12 | 金錢型 KPI（vs 數量型）| Jwood NT$10 萬/月 | T 階段補章節 |

**結構變動**：
- 三場景 → 四場景（補 Brand Agent 工廠交付）+ 潛在第五場景（學術研究者）
- 新章節 §7 Skill 治理分層（Brain / OS / Apps / Templates / Customer 五層）
- 第四個不變原則：「可追溯先於可生成」
- 名詞速查補 11 個術語

**草案 vs 正式版策略（修正後）**：
- v1.0 完整保留在 wiki（避免破壞現有連結）
- v1.1 草案在 **OneDrive** `11_AGENTS_知識體系/04_AGENTS方法論_v1.1草案.md`
- review 通過後才覆寫 v1.0（屆時 ingest 進 wiki + 更新所有 backlinks）
- wiki 內只在 `双云索引.md` concepts 段落加 🚧 註記指向 OneDrive 草案

### 第一+二+三批 今日合計

| 項目 | 數量 |
|---|---|
| Wiki 新增頁面 | 6（cross-domain 3 + nchu 3）|
| Wiki 修訂頁面 | 6（含双云索引 🚧 註記、wiki主索引、log）|
| Wiki 頁面數 | 69 → **77** |
| OneDrive 新增 | 1 份 v1.1 草案（不算 wiki 頁）|
| Commits | 第一+二批已 commit（68f25f1, de072d4）；第三批 wiki 修正待 commit |
| Push | hook 阻擋，等 Jacky 處理 |

### 今日成果統計（晚批）

| 項目 | 數量 |
|---|---|
| 新增頁面 | 3 個（cross-domain）|
| 修訂頁面 | 4 個（中興博士索引 / 學術 Skill 體系 / 跨域索引 / wiki主索引）|
| 涉及 commit | 待提交 |

## 2026-04-30｜2clouds-agents 專案啟動：双云 AI 行銷部訓練與營運平台

### 背景

Jacky 提出：因應新一批新人即將入職，原本「先教育訓練、再上手服務」的方式過時。新的導入邏輯應改為：

> 平台本身就是新人訓練系統。新人透過操作平台，使用 Jacky 的腦、成員的腦、客戶品牌腦與品管回饋，在可控範圍內成為 60 分以上的數位行銷服務者。

後續補充拍板：方法論仍然必要，但不應只放在課程裡，而是要散布到各個工作節點。當成員不知道如何決策或回應客戶時，Jacky 可以透過 wiki 知識圖譜與思考模型跳出來，引導成員做出最佳決策與反應。

### 專案建立

| 項目 | 內容 |
|---|---|
| 專案資料夾 | `/home/jacky/2clouds-agents` |
| GitHub repo | `https://github.com/gjj22622/2clouds-agents` |
| 初始 commit | `247bc8e docs: initialize 2clouds agents platform spec` |
| repo visibility | Public |
| 預設分支 | `main` |

### 已整理文件

| 檔案 | 用途 |
|---|---|
| `README.md` | 專案定位、核心公式、文件入口 |
| `docs/platform-spec.md` | 平台總規格：新人 cockpit、營運模式、角色、路由 |
| `docs/onboarding-training-system.md` | 新人導入訓練系統與 60 分數位行銷服務者標準 |
| `docs/jacky-decision-layer.md` | Jacky 知識圖譜、決策層、方法論節點與 Decision Panel |
| `docs/modules.md` | 功能模組：腦袋資料庫、品牌工作台、內容工廠、品管、Skill OS 等 |
| `docs/mvp-roadmap.md` | Phase 1-4 MVP 路線圖 |
| `docs/source-context.md` | 本 Spec 依據的 jacky-wiki 双云來源頁 |

### 產品定位決策

本專案不是一般 CRM，也不是單純 LMS，而是三合一：

1. 新人導入訓練系統
2. 双云營運管理平台
3. AI 行銷服務交付系統

核心公式：

```text
新人能力
+ Jacky 知識圖譜
+ 成員腦
+ 品牌腦
+ 方法論節點
+ 品管回饋
= 可交付的 60 分數位行銷服務者
```

### 方法論嵌入原則

- 方法論不能被拿掉；要從「課程內容」變成「平台判斷引擎」。
- Jacky 知識體系要散布在客戶導入、品牌工作台、內容工廠、品管中心、新人訓練場、Skill OS 等節點。
- 成員卡住時可呼叫 `問 Jacky` / `用 Jacky 模型判斷`。
- Jacky Decision Layer 回應時不只給答案，而要提供：問題重述、對應知識節點、思考模型、建議決策、可直接使用的回應草稿。
- 新人的訓練重點不是背知識，而是會查腦、會用腦、會被品管修正、會升級問題。

### Wiki 更新判斷

- 本次建立的是外部產品專案 repo，未新增 wiki 知識頁，因此不更新 `wiki/wiki主索引.md` 頁面數。
- 本次屬於双云域方法論與產品化延伸，先記錄在 `wiki/log.md`；後續若專案規格穩定，可再整理成 `shuangyun/concepts/` 或 `cross-domain/` 的正式頁。
