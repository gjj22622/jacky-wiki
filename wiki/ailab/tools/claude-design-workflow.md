---
title: Claude Design 雙輪細化工作流
domain: ailab
updated: 2026-05-16
---

# Claude Design 雙輪細化工作流

> **適用**：用 Claude Design / Cursor / Lovart 等 AI 設計工具產出 brand identity / website / hi-fi mockup。
>
> **核心**：**雙輪 + audit**。不要 R1 直接接受、不要 R2 整個重寫。
>
> **案例**：[明腦 v1 47/50 → v2 48/50](../inbox/2026-05-16-session-airun-dual-brand-visual-workflow.md) 走的就是這個工作流。

---

## 一句話工作流

> **R1 完整 brief（10 PART）→ R1 audit（14 條黑名單 + 5 維度評分 + Quick Fix）→ R2 brief（只精準補丁，不重寫）**。

---

## R1 · Round 1 完整 Brief 結構

10 個 PART（按順序，每個段落都不能省）：

| PART | 內容 | 為什麼必要 |
|---|---|---|
| **0 · CONTEXT** | 母品牌 + 子品牌定位 + 跟姊妹品牌的關係 | 給工具上下文，讓它知道「這個品牌不孤立」|
| **1 · THE TASK** | Deliverables 明確列表（不只「做個 brand」）| 防止它誤解工作範圍 |
| **2 · TARGET AUDIENCE** | STP 全套 + 3 個 persona + 5 秒場景測試 | **最重要的單一 PART**——所有設計決策的根 |
| **3 · SISTER BRAND COMPARISON** | 跟姊妹品牌的 12 維度對照 | 雙姊妹品牌時必加；單品牌時可省 |
| **4 · SHARED vs NOT SHARED** | 家族 DNA 三段清單 | 防止視覺失去家族感 OR 失去差異化 |
| **5 · LOGO REQUIREMENTS** | 章印 / wordmark 細化要求 + 字形構造 | 品牌核心 mark 不能只是字體渲染 |
| **6 · VISUAL SYSTEM** | 色票 token / 字體 / 排版 / 組件 | token 寫死，不留 ambiguity |
| **7 · STRICTLY AVOID** | 12-14 條黑名單 | 黑名單比白名單更可執行 |
| **8 · DELIVERABLES** | 具體交付物清單（含格式 / 尺寸）| 防止漏交 |
| **9 · TONE & VOICE** | 文案語氣 + 禁詞清單 | 工具產出的 placeholder 文案才不會出錯 |

**經驗值**：完整 R1 brief 通常 400-600 行 markdown。

---

## R1 Audit · 收到 R1 產出後的檢核

### Step 1 · 14 條黑名單檢核

每條打勾或標違規：

```
[ ] 1. 沒違反姊妹品牌的領域感（如沒做出 Bloomberg-style 而我們是 craft-style）
[ ] 2. 沒用純黑 #000 / 純白 #FFF 底
[ ] 3. 沒用藍紫漸層
[ ] 4. 沒用姊妹品牌的字體 stack
[ ] 5. 沒有機器人 / 電路板 / AI 老梗插畫
[ ] 6. 沒撞到 Notion / Linear / Figma 套版
[ ] 7. 沒用 emoji 裝飾
[ ] 8. 沒多 CTA 並列
[ ] 9. 沒用大段英文 hero 標題
[ ] 10. 沒浮誇 hover / parallax / video hero
[ ] 11. 沒用創投術語（賦能 / 變現 / 飛輪）
[ ] 12. 沒有過度圓角（>12px）
[ ] 13. 沒重 box-shadow blur
[ ] 14. 字形不是字體渲染（核心 mark 是 SVG path）
```

任一打違規 → R2 brief 必須修。

### Step 2 · 5 維度評分（25 分滿）

| 維度 | 0-5 |
|---|:---:|
| 哲學一致性（每個元素都服務同一視覺哲學）|  |
| 視覺層級（hierarchy 清楚、輕重分明）|  |
| 細節執行（chip / overspill / Pantone / CMYK 等）|  |
| 功能性（涵蓋 deliverables 完整度）|  |
| 創新性（有沒有自己 add 的 educational value）|  |

**經驗值**：好的 R1 約 23-25 分（46-50 / 50）。<22 分要嚴肅 R2 重做某段。

### Step 3 · Quick Fix 清單

列 3-5 個「小修改建議」（不是重做）：
- 哪個文案要改字（例：persona 名字對齊）
- 哪個 hex code 微調
- 哪個元件要新增 / 刪除

---

## R2 · Round 2 精準補丁（不重寫）

R2 brief 結構：

```markdown
# Round 2 Refinement · 只重做 X 元素

R1 audit 整體分數：47/50
R1 100% 保留：色票 / 字體 / 組件 / 黑名單 / 語氣
本輪只針對：<具體元素>

## 為什麼要重做這個元素
（描述 R1 在哪一條黑名單違規，或哪一個維度不夠）

## 視覺參考（給工具看的對照）
（附明匠手繪示意 / 真實對標品牌路徑）

## 硬約束（這次不能違反的 6 條）
（從 R1 brief 抽出對這個元素相關的鐵規）

## 期待產出
- 主版 + 2-3 個變體比較
- 不更動 R1 其他段
```

**經驗值**：R2 通常 100-200 行（只針對 1-2 個元素）。

---

## 工具特性提醒

| 工具 | 特性 | 適合 R1 還是 R2 |
|---|---|---|
| **Claude Design** | 強在系統性結構（brand guidelines、token、component lib）| R1 大架構 + R2 細化 |
| **Cursor** | 強在程式碼級別實作 | R2 細化更佳 |
| **Lovart** | 強在 visual fidelity | 視覺精細元素 |
| **v0** | 強在 React component | 互動元件 |

選對工具 = 省一輪。

---

## 實戰指標

- R1 < 40/50 → 工具沒理解 brief，R2 不要硬補，重寫 R1 brief
- R1 40-44/50 → R2 要修 2-3 個元素，refresh 後 R3 收尾
- R1 45-48/50 → R2 只修 1-2 個元素，R2 後可採用
- R1 49-50/50 → 直接採用，跳過 R2

---

## 不要做

- ❌ R1 brief 不要 < 300 行 → 太短工具會自己腦補方向
- ❌ R1 不 audit 直接接受 → 永遠有違規，audit 是必要環節
- ❌ R2 brief 把 R1 整個重寫 → 浪費 R1 已對的部分（可能 95% 是對的）
- ❌ 不同 PART 不要混 → CONTEXT 跟 STRICTLY AVOID 分開，工具才能對位
- ❌ 不要在 R2 加新需求 → R2 是「修不夠的」，新需求另開 R3 brief

---

## 相關連結

- [SOSTAC T 階段視覺 SOP](../../tbsa/concepts/SOSTAC-T階段視覺SOP.md)
- [SOSTAC 順序鐵規](../concepts/SOSTAC順序鐵規.md)
- [雙姊妹品牌視覺 SOP](../../cross-domain/雙姊妹品牌視覺SOP.md)
- [實踐捕手協定](../concepts/實踐捕手協定.md)
- [工具棧索引](工具棧索引.md)
