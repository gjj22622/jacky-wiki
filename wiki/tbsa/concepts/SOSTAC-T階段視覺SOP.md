---
title: SOSTAC T 階段視覺 SOP
domain: tbsa
updated: 2026-05-16
---

# SOSTAC T 階段視覺 SOP

> **本頁定位**：[SOSTAC 方法論](SOSTAC方法論.md) 中 **T（Tactics 戰術）** 階段在「品牌視覺」領域的具體展開 SOP。
>
> **觸發**：要為品牌做視覺設計（logo / 配色 / 字體 / hero / 元件）時。
>
> **為什麼需要**：SOSTAC 是大框架，T 階段在「品牌視覺」這個子領域有特定的 8 步驟。沒有這個 SOP，視覺設計容易跳過 STP 直接做、做出 generic SaaS 套版。

---

## 一句話 SOP

> **STP 三句話拍板 → 對標 + 情緒甜點 → 視覺方向綜合 → BRIEF → 執行 Prompt → audit + refine → 套用**。
> 不是隨便丟到設計工具就期待出好東西。

---

## 8 步驟（T 階段細化）

### T1 · 確認 STP 三句話拍板

進入 T 階段**之前**，第二個 S（STP）必須已拍板。三件套硬性 input：

```
1. 一句話受眾：誰會用、誰不會用（含正例反例）
2. 一句話痛點：客戶最痛的時刻是什麼
3. 一句話賣點：vs 別人怎麼不同
```

⚠️ **任何視覺工作開始前，這三句話必須白紙黑字寫下**。詳見 [SOSTAC 順序鐵規](../../ailab/concepts/SOSTAC順序鐹規.md)。

### T2 · 情緒甜點 + 3-5 個對標品牌

從 STP 推導：

**情緒甜點**：客戶第一次用完服務後最想說的那句話（一句話）。
- 例：「終於有人懂我了」/「我終於做對了」/「我可以放心了」

**3-5 個對標品牌**：每個都來自不同流派但共享某種精神：
- 老牌企業？日系職人？商業雜誌？金融機構？文創品牌？
- 對標**不是抄**，是**錨定氣質**

### T3 · 萃取品牌個性 keyword

從 3-5 個對標品牌**萃取共同氣質**：

| 對標 | 學什麼 |
|---|---|
| A | （氣質特徵 1-2 條）|
| B | （氣質特徵 1-2 條）|
| C | （氣質特徵 1-2 條）|

→ 共同元素 → 4-6 個品牌個性關鍵字（如：踏實 / 工藝 / 紙墨 / 同行 / 不假掰）。

### T4 · 視覺方向綜合（色票 / 字體 / 排版 / 黑名單）

從品牌個性關鍵字推出：

| 元素 | 拍板 + 為什麼 |
|---|---|
| 主底色 | （hex + 為什麼這色不是另一色）|
| 主文字色 | （hex + 為什麼）|
| Accent 色 | 單 / 雙，hex，為什麼 |
| 中文字體 | 主標題 + 內文 + 引言 |
| 英文字體 | 標題 + 數字 + mono |
| 排版 | section padding / 行距 / 圓角 / shadow 規則 |
| 黑名單 | 12 條「絕對不要」清單 |

⚠️ **每個決定都要有「為什麼」可解釋**。沒解釋 = 不能上線。

### T5 · 寫 BRIEF（給人類設計師看的中文版）

BRIEF 結構（10 PART）：
1. CONTEXT · 母品牌 + 子品牌定位
2. THE TASK · Deliverable 清單
3. TARGET AUDIENCE · STP 全套
4. SISTER BRAND COMPARISON · 跟姊妹品牌對照
5. SHARED vs NOT SHARED · 家族 DNA 清單
6. LOGO REQUIREMENTS · 細化要求
7. VISUAL SYSTEM · 色票/字體/排版完整 token
8. STRICTLY AVOID · 黑名單
9. DELIVERABLES · 具體產物
10. TONE & VOICE · 文案語氣

### T6 · 寫 Execution Prompt（給 AI 設計工具看的英文版）

跟 BRIEF 是**雙生兄弟**，不是同一份文件：

| BRIEF | Execution Prompt |
|---|---|
| 中文 | 英文（AI 工具更穩） |
| 給人看 | 給 AI 跑 |
| 商業導向 | 技術導向 |
| 含 why | 含 token hex code、像素、字型名 |
| 留設計師 freedom | token 全寫死 |

### T7 · Audit + Refine（雙輪細化）

設計工具產出後，**不要直接接受**：

1. **黑名單檢核**（14 條）：是否違規？
2. **5 維度評分**（哲學一致性 / 視覺層級 / 細節執行 / 功能性 / 創新性 各 0-10）
3. **Quick Fix 清單**：列 3-5 個小修改
4. **R2 Brief**：只針對「不夠的部分」精準補丁，不重寫

詳見 [Claude Design 雙輪細化工作流](../../ailab/tools/claude-design-workflow.md)。

### T8 · 套用到所有對外物料

定版後**全套套用**：
- 子站三頁（首頁 / 案例 / 關於）
- favicon / Email signature / 報價單 watermark / 合約 letterhead
- 社群頭像 / OG image / 名片 / 文件首頁

每個物料的章印、wordmark、token 都從同一個 brand assets 來（如 brand.svg + tokens.css）。

---

## 案例參照

[明腦 / MingNow 視覺建立 2026-05-15→16](../../ailab/inbox/2026-05-16-session-airun-dual-brand-visual-workflow.md) 走的就是這 8 步。

---

## 跟 SOSTAC 的位置

```
S (Situation) — 內外部分析
O (Objectives) — 目標
S (Strategy / STP) ← T 階段的硬性前置
↓
T (Tactics)
  └── 品牌視覺 SOP（本頁）
  └── 通路 SOP
  └── 文案 SOP
  └── ...其他 7Ps 子領域
↓
A (Action) — 執行
C (Control) — 追蹤
```

---

## 不要做

- ❌ 不要跳過 T1（STP 拍板）直接做視覺 → 一定做出 generic
- ❌ 不要省略 T2 情緒甜點 → 視覺會缺 emotional anchor
- ❌ BRIEF 跟 Execution Prompt 不要合併 → 合併後 AI 會被 why 干擾、執行偏差
- ❌ 不要 R1 直接接受不 audit → AI 設計工具總有 14 條黑名單要對
- ❌ 不要 R2 整個重寫 → 精準補丁就好，R1 已是 47/50

---

## 相關連結

- [SOSTAC 方法論](SOSTAC方法論.md)（父框架）
- [SOSTAC 順序鐵規](../../ailab/concepts/SOSTAC順序鐵規.md)
- [Claude Design 雙輪細化工作流](../../ailab/tools/claude-design-workflow.md)
- [雙姊妹品牌視覺 SOP](../../cross-domain/雙姊妹品牌視覺SOP.md)
- [設計團隊 AI 會議模式](../../cross-domain/設計團隊AI會議模式.md)
- [TBSA 索引](../TBSA索引.md)
