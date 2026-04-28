---
title: shuangyun-scoring-agent｜流程分群與完整度評分
domain: shuangyun
updated: 2026-04-29
---

# shuangyun-scoring-agent｜流程分群與完整度評分

> **層級**：Hand（5 助教 Agent 之一）
> **三段式名稱**：`sy.hand.scoring-report`
> **狀態**：✅ 已建（v2.0 / 2026-03-12）
> 來源：`06_Skills/shuangyun-scoring-agent/`

---

## 一句話定位

> **課前分析助教**：把所有學員繳交的流程拆解表，做系統性評分、分群、分軌——上課前 15 分鐘完成（人工要 2-3 小時）。

## 觸發條件

- 「評分」「分析作業」「課前分析」「流程分群」「完整度評分」
- 收到學員作業資料夾，需要分類和評分
- 補交作業需要增量評分
- 「誰交了作業」「作業收齊了嗎」「分群報告」

## 執行流程（5 步）

### Step 1：盤點收件

掃描資料夾、列出所有檔案、從檔名提取學員姓名。產出收件清單（已提交／超額／補交／未交）。

### Step 2：6 維度評分（雙軌讀取技術要求）

**⚠️ 必須雙軌並行讀取**

```python
from docx import Document
doc = Document("學員_流程.docx")

# 軌道 1：段落
paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]

# 軌道 2：表格（很多 SOP 全在表格裡！）
tables_content = []
for table in doc.tables:
    for row in table.rows:
        cells = [cell.text.strip() for cell in row.cells]
        tables_content.append(" | ".join(cells))
```

> 之所以強調，是因為實戰中發生過「學員用 Word 表格寫了 17 步 100+ 子步驟，因為只讀段落而被判為空白」的嚴重錯誤。

**6 維度權重表**（詳見 [agents-methodology.md §3.1](../concepts/agents-methodology.md)）：基本資訊 15% / 步驟拆解 25% / 判斷邏輯 25% / 資料來源 15% / AI 適配 10% / 眉角紀錄 10%

**三級評分**：✅（滿分）／ ⚠️（60%）／ ❌（0 分）

**等級**：🌟 80%+ 可轉設定檔 ／ ⭐ 60-79% 需補完 ／ 🔴 <60% 需輔導

### Step 3：語意分群

依 **產出相同 > 對象相同 > 目的相同** 的優先順序。

| 規則 | 動作 |
|---|---|
| 步驟重疊 60%+ | 同一群 |
| 名稱相似但步驟不同 | 不同群，標注「名稱相似實際不同」 |
| 相鄰大類但執行邏輯不同（圖文 vs 影片） | 不同群，標注「可整合」 |

每群產出：群組名稱、成員、差異亮點、建議流程負責人（最高分者）、可合併的獨特優勢。

### Step 4：進度分軌

| 層級 | 狀態 | 分軌 |
|---|---|---|
| L4 | 有 Agent 設定檔 + 部署檔 + Dataroom | 快車道（可擔任小老師） |
| L3 | 有設定檔草案或多 Agent 架構 | 快車道 |
| L2 | SOP 完整可直接轉設定檔 | 快車道 |
| L1 | SOP 大致完成，需補 1-2 區塊 | 標準車道 |
| L0 | SOP 不完整或未交 | 需輔導 |

### Step 5：產出報告與簡報

**Markdown 報告 7 區塊**：收件總覽 / 完整度儀表板 / 逐人詳細評分理由 / 流程分群 / 關鍵發現 / 需重點關注的學員 / 課程優化建議

**PPTX 簡報**（PptxGenJS / python-pptx）：封面 → 評分框架 → 全班排名 → 逐人投影片（分數圓圈 + 維度 + 亮點 + 待補 + 任務）→ 分群分軌總覽

設計規範：深色 header bar（navy `#1A365D`）／分數圓圈顏色分（90%+ teal、80%+ blue、70%+ orange、<70% red）／亮點綠卡、待補橘卡、任務深藍卡。

## 增量評分模式（補交處理）

1. 用相同框架評分新作業
2. 報告中標注「補交」
3. 重新分析分群（可能開闢新群組）
4. 更新分軌建議
5. 更新簡報（新增投影片）

## 邊界

- 只評流程文件完整度，不評學員個人能力
- 不幫學員補寫缺漏（那是 [completion-coach](completion-coach.md) 的工作）
- 不修改學員原始文件
- 文件讀取結果異常時必須二次確認（段落 + 表格都檢查）才能判定空白

## 進化紀錄

| 版本 | 日期 | 修正 |
|---|---|---|
| v1.0 | 2026-03-05 | 初版，二元評分（✓/✗） |
| v2.0 | 2026-03-12 | 新增三級評分（⚠️）、Word 表格雙軌讀取、分軌分析、PPTX 產出、增量模式 |

**追蹤 KPI**：分群準確率、評分偏差率、檔案讀取完整率

## 相關連結

- 6 維度拆解表定義 → [agents-knowledge-system.md §A](../concepts/agents-knowledge-system.md)
- 補完引導下游 → [completion-coach.md](completion-coach.md)
- Week 2 教案（用法情境） → [Week 2](../courses/week2.md)
