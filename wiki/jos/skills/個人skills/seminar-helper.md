---
name: seminar-helper
description: 中興生科所博士班專題討論端到端準備 unified skill。從題目定案、文獻收集、核心文獻精選（含導讀 PPTX 製作）、架構規劃、講稿、PPT、中英文摘要繕寫（含 python-docx 自動產出）、計時演練到上場前準備，9 階段全包。已整合原 seminar-abstract（摘要繕寫）+ paper-slide-guide（導讀 PPTX）兩個 skill。觸發：/seminar、寫摘要、做專討、114-1 摘要、Zool Stud 引用、論文導讀。
trigger: /seminar
---

# /seminar

中興生科所博士班專題討論**端到端 unified 準備工具**。從題目定案到上場簡報，9 階段一條龍。

## ⚠️ 必讀順序（新對話／新專討啟動時）

1. **本 SKILL.md**（你正在讀）
2. `references/reference_seminar_workspace.md` — 所有檔案位置、工具、Skills 速查
3. `references/reference_zoological_studies_format.md` — Zool Stud 引用 13 條規則 final（**列前 5 + et al.**）
4. `references/reference_huang_meng_yuan_seminar_preferences.md` — 黃老師偏好（學術定位、摘要、結構）

## 📚 詳細工作流 reference（依需要 lazy load）

| reference memory | 對應階段 | 內容 |
|---|---|---|
| `references/reference_paper_slide_guide_workflow.md` | 階段 2 | 論文導讀 PPTX 製作 10 步（PIL 裁切、PptxGenJS 模板、12-15 張投影片架構） |
| `references/reference_abstract_docx_python_template.md` | 階段 6 | python-docx 完整模板（標楷體+TNR、卷號粗體、學名斜體、列前 5 + et al.、第 2 頁獨立呈現） |
| `references/reference_zoological_studies_format.md` | 階段 6 | Zool Stud 13 條規則 + 14 條雷區 |
| `references/reference_huang_meng_yuan_seminar_preferences.md` | 階段 6 | 黃老師摘要繕寫偏好（5/4 整合版） |
| `user_jacky_school_id.md` | 全階段 | Jacky 學號、姓名、日期格式 |

## 🔄 整合歷程

| skill | 狀態 | 整合位置 |
|---|---|---|
| seminar-helper | ✅ unified（本 skill） | 主 skill，9 階段 |
| seminar-abstract | 🗄 archived（`~/.claude/skills/_archive_2026-05-04/`） | 階段 6 詳細指引 + reference_abstract_docx_python_template.md |
| paper-slide-guide | 🗄 archived（`B_專討準備階段/06_Skill開發/*.archived`） | 階段 2 + reference_paper_slide_guide_workflow.md |

從題目定案到上場簡報，端到端協助鐘基啟（NCHU 生科所博二）準備博士班專題討論。本 Skill 萃取自第三次專討（2026-05-13）實戰經驗，內含 9 階段工作流、關鍵時程倒推、零幻覺核稿原則，以及對 AI 常見錯誤的防呆檢查清單。

## 適用對象與背景

- **使用者**：鐘基啟（Jacky Chung），NCHU 生科所博士班
- **研究方向**：結合地面葉綠素螢光、衛星遙測、AI 之森林即時固碳量估算
- **指導教授**：黃盟元 副教授（NCHU 生科所，主指導，植物生態生理、精準農業）
- **共同指導**：朱彥煒 教授（NCHU 基資所，演算法、機器學習、資料探勘）
- **第三次專討主題**：森林 AGB / Carbon Stock / Digital Twin 系統性文獻回顧（已完成）
- **第四次專討（適用本 Skill）**：可能是博士論文研究計畫，或 DT 主題深化，主題待定

## 使用方法

```
/seminar                       # 互動式：詢問所處階段 + 距離專討日 → 推薦下一步
/seminar status                # 巡查專案資料夾，回報每階段完成度
/seminar timeline 2026-12-15   # 給定專討日，反推所有 deadline
/seminar review <檔案>         # 用零幻覺原則檢查文件中的引用、數字、頁碼
/seminar stage 0..8            # 直接跳到指定階段的詳細指引
```

---

## 9 階段工作流

### 階段 0｜題目定案（D-70 ~ D-60）

從研究方向收斂為專討題目。

**句型推薦（學術期刊 review 格式）：**
- `X 作為下一世代 Y 技術：A Systematic Review of...`
- `Integrating X for Y: A Review of...`
- `Advances in X for Y: From Z1 to Z2`
- `X: Methodologies, Applications, and Challenges in Y`

**避坑（AI 味標題、科普句型）：**
- `從 X 到 Y：……` ← 偏科普 / AI 句型
- `揭密 X` / `探索 X 的奧秘` ← 不學術
- 冒號可用，但要是「主題：副標」或「名稱：描述」結構，不要是「敘事：……」

**產出：**
- 題目中文版
- 題目英文版（首字大寫，符合 SCI review 格式）
- 1-2 段研究動機（先暫定，文獻收集後可調整）

---

### 階段 1｜文獻收集（D-60 ~ D-45）

**目標：** 30-40 篇 SCI 文獻（年份 2022 之後優先）。

**步驟：**
1. 拆分 8-10 章主題架構（Ch1 背景、Ch2-N 各方法、Ch_last 缺口/未來）
2. 每章 4-7 篇文獻
3. 用 NCHU IP（VPN）下載 PDF：Springer / Elsevier / Wiley / T&F
4. **DOI 驗證、作者姓名查核**（避免 AI 幻覺，見下方原則）
5. 建立 Excel 文獻總表

**Excel 文獻總表欄位：**

| # | 章節 | 第一作者 | 年份 | 期刊 | 標題 | DOI | 主題標籤 | PDF 下載 | 備註 |

**檔名規則：**
```
Ch{N}_{第一作者}_{年份}_{標題關鍵詞}.pdf
例：Ch3_Pelletier_2024_Sentinel2_Forest_AGB.pdf
```

---

### 階段 2｜核心文獻精選（D-45 ~ D-40）

從全部文獻中選出**每章 1-2 篇最關鍵 → 共 10-14 篇**，建立「專討文獻集」。

**判準：**
- 引用數高（被該領域重複引用）
- 方法或結論可被本次專討直接呼應
- PDF 完整、可標頁碼、可截 Figure / Table

**產出：**
- `專討文獻集/` 資料夾（核心 10-14 篇 PDF）
- 每篇 1 份導讀 PPTX（標題、摘要、Method、Figure 截圖、討論、Take-home）
- 每篇 1 份中文翻譯 `.md`（可選，但強烈建議）

**重要規則：**
- 導讀 PPTX 完成後**禁止重做**，後續只能引用 / 複用，不重新產製截圖與中英文說明

**詳細工作流（10 步驟、PIL 裁切、PptxGenJS 模板、12-15 張投影片架構、色彩與字型規範）**：
→ 見 `references/reference_paper_slide_guide_workflow.md`

---

### 階段 3｜架構規劃 + 引用查核表（D-40 ~ D-25）

25 分鐘專討時長分配示範：

| 段落 | 時長 | 內容 |
|------|------|------|
| 封面 + 自我介紹 | 1 min | 題目、姓名、指導教授 |
| 開場（研究動機） | 1 min | 為什麼這題重要 |
| §1 背景 | 2 min | Ch1 文獻 |
| §2-§N 各方法章節 | 各 2-4 min | Ch2-ChN 文獻 |
| §_last 缺口與未來 | 3 min | 含台灣應用、博士命題 |
| 結語 | 0.5 min | Take-home |
| Q&A 緩衝 | 0.5 min | |

**關鍵步驟：人工核對所有引用**
- 頁碼、Table / Figure 編號、精確數字（誤差、R²、AGB 數字、像素數）
- 任何未確認的標 `[⚠️核對]`，後續逐一替換為已確認數字

**產出：** `25分鐘專討_架構v?_引用查核表.md`，欄位包含：
- 段落 / 時長 / 使用文獻 / 引用頁碼 / 引用具體內容（含數字）/ 視覺素材出處 / 核對狀態

---

### 階段 4｜講稿撰寫（D-25 ~ D-20）

對照架構表逐段撰寫**口語版**口白。

**規則：**
- 每段標註預估時長 + 使用的圖表 + 出處頁碼
- 一字一句寫好，不要靠「上場臨機應變」
- V1 → V2 → V3 迭代，每版用「黃老師 Skill 審查」工具檢查
- 句子長度控制在 25 字內，方便口說

**產出：** `第三次專討_講稿V3_鐘基啟.md`

---

### 階段 5｜PPT 大綱（D-20 ~ D-15）

**關鍵原則：先寫文字大綱（.md），再開 PowerPoint。**

每張投影片必備欄位：
1. 投影片編號與標題
2. 預估停留時長
3. 要點（bullet）
4. 視覺素材出處（哪一張 Figure / Table，哪篇文獻第幾頁）
5. 引用頁碼
6. 講者口白要點（節錄自講稿）

**製作優先順序：**
1. 先做最重的章節（如第三次專討 §9 數位孿生 6 min）
2. 中間段落
3. 最後修封面與目錄

**張數：** 35 張左右（含封面、目錄、Backup）

**產出：** `PPT大綱.md` → 再依此製作 `.pptx`

---

### 階段 6｜中英文摘要（D-12 ~ D-9，繳交 deadline 視系所規定）

> ⚠️ **核心參考檔案（必讀）**：
> - 共同知識庫：`專題討論/_共同知識庫/Zoological_Studies_完整投稿規範.md`
> - `references/reference_zoological_studies_format.md`
> - `references/reference_huang_meng_yuan_seminar_preferences.md`
> - 自動檢查工具：`摘要檢查器/`（也在 GitHub: `gjj22622/nchu-lifeSciences-seminar-abstract-checker`）

**順序：依據口稿架構與 PPT 撰寫，不要先寫摘要再做簡報。**

**結構（300-500 字，5% 容忍可達 525）：**
- Background（背景）
- Motivation（動機）
- Methods / Scope（review 範圍與方法論）
- Main findings（主要發現）
- Research gaps（研究缺口）
- Position / Argument（命題式收尾，不寫「希望」「探討」這類軟句）

#### 黃老師（生理生態實驗室）對摘要的明確偏好（5/4 確認）

1. **摘要正文不放任何 in-text 引用**（不要 `(Author Year)` 形式）；引用全部在文末參考文獻清單
2. **第一次出現的英文名詞**附中文＋英文＋常用縮寫（如「葉綠素螢光（Chlorophyll Fluorescence, ChlF）」）
3. **避免過度技術取向**；強調生理生態學意義（光合固碳、葉綠素螢光、生理變數）
4. **新名詞（如森林數位孿生）必須在第 3 段中央位置正式定義**
5. **參考文獻獨立第 2 頁**（page break before），不要硬擠到第 1 頁

#### 引用文獻（Zool Stud 格式）— 強制規則 final

| 規則 | 規範 |
|---|---|
| **作者數規則** | **≤5 位全列；6 位以上列前 5 位 + et al.**（黃老師 5/4 confirm，Vol 64-46 證據） |
| 作者名 | `Smith J`（無中間句點），多個 initials 連寫 `Hemes KS` |
| 標題 | sentence case |
| 期刊縮寫 | **無句點**（`Remote Sens Environ`，不是 `Remote Sens. Environ.`） |
| 卷號 | **粗體**（`Forests **14:**1086`） |
| 頁碼 | en-dash（`325–329`），不是 hyphen |
| DOI | **不列**（114-1 老師更新版範例皆無） |
| 學名 | 斜體（如 `*Larix principis-rupprechtii*`） |
| 參考文獻範圍 | **含演講內容（PPT、口頭）出現之全部引用**，不只摘要正文有的 |
| 主要參考 | **整條粗體**（學校層級規定，非 Zool Stud 慣例） |
| 排序 | 依 Last name 字母順序，編號 1.、2.、3. ... |

#### 過去摘要常被抓的雷區（13 條，避開）

見 `references/reference_zoological_studies_format.md` G 段或共同知識庫第 7-3 節。摘錄前 5 大：
1. 引用沒編號 1./2./3. （113-2、114-1 都犯）
2. 摘要首行未縮入 1.0 cm
3. 摘要正文未設左右對齊（justify）
4. 期刊縮寫加句點
5. 卷號未粗體

#### 繳交時程
- D-12：完成初稿（必須先有 PPT 與講稿）
- D-9：送指導老師（附「請給 2 天回饋」明確說明）
- D-7：摘要交件 deadline

#### 自動檢查
跑前丟給 `摘要檢查器/拖放這裡檢查.bat` 或 `python check_abstract.py 你的摘要.docx`。
出 0 必改才寄老師。

#### 自動產出 docx（python-docx 模板）
複用 `_build_abstract_v4_docx.py`（或 v5+）腳本，內建：
- 列前 5 + et al. 的 `format_authors()` 函數（**規則 final，不要再改**）
- 卷號粗體 + 學名斜體 + 主要參考整條粗體 multi-run
- 第 2 頁獨立呈現引用（page break before）
- 摘要正文 1.5 行距、首行縮入 1cm、左右對齊、無 in-text 引用

完整模板見 `references/reference_abstract_docx_python_template.md`。

---

### 階段 7｜演練與調整（D-15 ~ D-3）

**第一次計時演練（D-15）：** 通常會超過 25 min 約 5-8 分鐘 → 找出哪段太冗、哪段沒講透。

**演練輪次：**
1. R1（D-15）：自己計時 → 找出超時段
2. R2（D-10）：給室友 / 同學聽 → 找出聽不懂處
3. R3（D-7）：黃老師 feedback → 修正
4. R4（D-3）：最終演練含 Q&A 模擬

**Q&A 模擬題型：**
- 為什麼選這篇文獻？
- 這個方法有什麼局限？
- 你的博士論文要做什麼？
- 台灣應用有什麼挑戰？

---

### 階段 8｜上場前準備（D-1 ~ D-day）

**Checklist：**
- [ ] 印製講者稿（紙本 1 份 + 手機備份）
- [ ] USB 備份 PPT（PowerPoint + PDF 雙格式）
- [ ] 雲端備份 PPT（Google Drive / OneDrive）
- [ ] 預先到場確認投影、麥克風、雷射筆
- [ ] 喉糖、開水
- [ ] Backup 投影片（預想 Q&A 答案的圖表）

---

## 關鍵時程倒推（D-day = 專討日）

| 倒推日 | 任務 |
|--------|------|
| D-60 | 開始文獻收集 |
| D-45 | 文獻 30-40 篇 + Excel 總表完成 |
| D-40 | 核心文獻 10-14 篇選定 + 導讀 PPTX |
| D-25 | 講稿 V3 + 引用查核表完成 |
| D-20 | PPT 文字大綱 (.md) 完成 |
| D-15 | PPT 初稿完成 + 第一次計時演練 |
| D-12 | 摘要初稿（PPT + 講稿都要先有） |
| D-9 | 摘要送指導老師 |
| D-7 | 摘要交件 deadline |
| D-3 | 最終演練 + Q&A 模擬 |
| D-1 | 印講稿、USB 備份、場地確認 |
| D-day | 專討 |

---

## 系統性原則（從第三次專討學到的教訓）

1. **零幻覺原則**：所有數字、作者、結論都必須可追溯到 PDF 的具體頁碼與段落；無法確認標「待查」而非編造。
2. **單一資料來源**：核心文獻收在一個資料夾（`專討文獻集/`），禁止用該資料夾外的引用。
3. **導讀簡報禁止重做**：每篇導讀 PPTX 完成後，後續只能引用 / 複用，不重新產製截圖與中英文說明，只能做「組織、串接、轉述」。
4. **作者名要查核**：AI 在文獻檢索時會產生第一作者名幻覺（第三次專討遇 73% 錯誤率），務必對照 PDF 第一頁的作者列表。
5. **檔名規則**：`{編號}_{章節}_{第一作者}_{年份}_{原文|導讀}.{pdf|pptx}`
6. **AI 味標題避開**：`從 X 到 Y：……` 是科普文 / AI 句型，學術期刊 review 不用。
7. **冒號的學術用法**：可以用，但要是「主題：副標」或「名稱：描述」結構，不要是「敘事：……」。
8. **引用查核表優先於講稿**：先把每段要引的數字、頁碼、Figure 編號鎖定，再寫口白。

### 5/4 第三次專討當天追加的教訓（V4 final 版整合）

9. **學術定位優先於技術秀**：標題與摘要要符合所屬實驗室（生理生態）的學術定位，不要做成跨域技術綜述。技術內容保留，但語感要從「這個技術很厲害」轉為「這個技術解什麼生理生態問題」。
10. **DOI 不必列入摘要引用**：114-1 老師更新版範例皆無 DOI，列了反而被視為冗贅。
11. **摘要正文不放 in-text 引用**（`(Author Year)` 形式）：黃老師明確要求，引用全部移到文末清單。
12. **規則 final 後不再討論**：「列前 5 + et al.」是黃老師 5/4 confirm 的最終規則，不要再去翻「列前 3 + et al. 還是全列」。每一個此類「老師確認過的 final」都要寫進 reference memory 並在規則檔加紅色警告框。
13. **GitHub raw 有 5 分鐘 CDN 快取**：規則 push 後不會立即生效，急用時用 `commit SHA pin URL` 或刪本地 cache 強制 fetch。

---

## 規則 reference memories 索引（必讀）

寫摘要前一定先讀以下三份 reference：

| memory 檔名 | 內容 |
|---|---|
| `references/reference_zoological_studies_format.md` | Zool Stud 引用格式 13 條規則 + 列前 5 + et al. final 證據 |
| `references/reference_huang_meng_yuan_seminar_preferences.md` | 黃老師對摘要、敘事取向的明確偏好（5/4 整合版） |
| `references/reference_seminar_workspace.md` | 摘要檢查器位置、共同知識庫位置、過去摘要 docx 路徑 |

---

---

## 資料夾架構建議

```
{學期}-{專討次別}/
├── A_資訊收集階段/
│   ├── 01_題目提案與規劃/
│   │   ├── 題目提案_v?.docx
│   │   └── Meeting準備.docx
│   ├── 02_文獻管理/
│   │   ├── 參考文獻/
│   │   │   ├── Ch1_研究背景/
│   │   │   ├── Ch2_.../
│   │   │   └── Ch_last_缺口與未來/
│   │   └── 文獻總表.xlsx
│   ├── 04_導讀相關/
│   │   ├── Ch1_{作者}_{年}_導讀.pptx
│   │   └── ...
│   ├── 08_NotebookLM音檔/    # 敘事節奏參考
│   └── 專討文獻集/           # 核心 10-14 篇（單一資料來源）
├── B_專討準備階段/
│   ├── 25分鐘架構v?_引用查核表.md
│   └── 03_講稿與演練/
│       ├── 講稿V?.md
│       ├── PPT大綱.md
│       ├── {次別}專討_鐘基啟.pptx
│       └── 演練紀錄.md
├── C_投稿準備階段/           # 專討後展開（如要投稿期刊）
└── _歸檔_{日期}/             # 舊版本
```

---

## 互動行為規範

當使用者輸入 `/seminar`（無參數）：
1. 詢問現在處於階段 0-8 哪一段
2. 詢問距離專討日還有幾天
3. 根據兩者推薦下一步具體任務（含預期產出檔名）

當使用者輸入 `/seminar status`：
1. 巡查 `中興大學生科所/專題討論/` 下最新一次專討資料夾
2. 對照本 Skill 9 階段，回報每階段完成度（已完成 / 進行中 / 未開始）
3. 標出最關鍵的下一步任務

當使用者輸入 `/seminar timeline <日期>`：
1. 解析日期為 D-day
2. 反推 D-60 / D-45 / D-40 / D-25 / D-20 / D-15 / D-12 / D-9 / D-7 / D-3 / D-1 對應的西元日期
3. 輸出 Markdown 表格，並標記「今天落在 D-?」

當使用者輸入 `/seminar review <檔案>`：
1. 讀取該檔案
2. 抓出所有引用（作者 + 年份 + 頁碼 + 數字）
3. 對照 `專討文獻集/` 內的 PDF 逐一查核
4. 標出 `[⚠️核對]`、`[❌ 不一致]`、`[✅ 已驗證]`
5. 產出查核報告

---

## 第四次專討快速啟動建議

由於第四次專討主題尚未定，但很可能是「博士論文研究計畫」或繼續 DT 主題深化：

- 若延續 DT 主題：可大量複用第三次專討的核心文獻 + 導讀 PPTX，新增 5-8 篇 2026 年新文獻即可
- 若改做博士論文計畫：題目句型建議用 `Towards X: A Research Proposal for Real-time Forest Carbon Monitoring in Taiwan`
- 兩個方向都建議在 D-65 前與黃老師確認題目

---

*本 Skill 萃取自鐘基啟 2026-04-22 完成的第三次專討實戰經驗，由 Claude 整理。*
