---
title: Wiki 操作日誌
domain: root
updated: 2026-04-29
---

# Wiki 操作日誌

> 記錄 wiki 整理過程的關鍵操作。**只記下「做了什麼、為什麼這樣做、留下什麼決策」**——不重複頁面內容本身。

---

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
