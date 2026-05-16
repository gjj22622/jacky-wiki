---
session_date: 2026-05-16
session_topic: 明察、明腦雙姊妹品牌視覺設計工作流——從 SOSTAC STP 到 Claude Design 雙輪細化
model: claude-opus-4-7
context: AgentFlow Solutions / Airun 品牌建立（明察姊妹品牌明腦上線）
duration: ~6h（跨 2 天，2026-05-15→16）
type: session-summary
tags: brand-design, visual-system, sostac, mingcha, mingnow, claude-design, character-design, seal-design, role-card, ai-design-team
---

## 最終做法（What Worked）

下次新子品牌視覺設計可直接照這條工作流：

1. **SOSTAC 順序強制**：先 S→O→S（STP 拍板）→ T（視覺），不可跳階段。視覺方向必須有「一句話受眾 / 一句話痛點 / 一句話賣點 + 情緒甜點」四件套輸入。
2. **角色卡先於設計**：為新子品牌召聘 AI 產品線負責人（明察 = 明眼；明腦 = 明匠），仿 `visual-director.md` 結構寫角色卡 → 含設計哲學、職責、鐵規（STP 未拍板前禁動視覺、不准抄姊妹品牌、每元素須可解釋）。
3. **三個視覺對標壓出視覺哲學**：J大圈選 → 萃取共同氣質 → 推導色票/字體/排版/12 條黑名單。
4. **設計團隊內部會議模式**：J董 主持 + 兩位 AI 員工辯論 + 共享/不共享/灰色地帶三段清單 → 產出 final prompt。
5. **雙姊妹對照式 brief**：不孤立做新品牌，把已上線姊妹品牌（明察）的視覺維度全列出，讓 Claude Design 看到對照才知道往哪去。
6. **Claude Design 雙輪細化**：Round 1 完整 brief（10 PART：context/task/STP/sister/shared/logo/system/avoid/deliverables/tone）→ 明匠 14 條黑名單 audit 出 47/50 → Round 2 只針對不夠的部分精準補丁，不重寫。
7. **學徒明匠先做結構示意，Claude Design 做專業細化**：明匠不假裝是字體設計師，誠實標明「SVG path 手繪 vs web font 渲染」，把「結構與方向」傳達清楚，由 Claude Design 接 production 級。
8. **字形不能只是字體渲染**：品牌核心 mark 的漢字必須是 SVG path 從零建構，不可用 LXGW WenKai / Noto Serif TC 等 web font 直接渲染交差——這是 logo 跟 typesetting 的本質差別。

## 繞路紀錄（Detours）

最珍貴：下次別再走的歪路 + 走錯時怎麼接回來。

1. **跳過 STP 直接做視覺** → 被 J大 糾正「不是我的 jacky-wiki SOSTAC 邏輯嗎？你又忘記了」→ 補做 STP 拍板 + 寫進 feedback memory（`feedback_sostac_order.md`）避免再忘
2. **複製姊妹品牌 tokens.css 不問** → 假設「家族視覺一致」是好事，但明察=機構嚴肅 vs 明腦=老師傅工藝，氣質完全不同 → 重做色票/字體/排版全套
3. **客群定位過廣**：第一輪寫「個人專業者/SMB/IP 工作者」三群混 → J大 拍板「**傳統**中小企業主」（具體窄）→ STP 拍板鎖定王老闆/廖老闆/林老闆三個 persona
4. **命名重議**：「明腦」拍板後 J大 質疑「為什麼明字？要一直明下去嗎？」→ 評估「掌印/本腦」候選 → 仍拍板維持明腦 → 寫進 memory（`project_mingnow_name_pinned.md`）避免再議
5. **「腦」字 web font 渲染交差**：v1.0 Claude Design 用 LXGW WenKai Bold + filter → J大 指「設計感不夠」→ 重新研究 8 種歷代書體 → 推薦漢印小篆 + 楷書 wordmark 雙線方案（對位真實漢印傳統）→ Round 2 Claude Design 純 SVG path 漢印幾何骨架（月+巛+囟）拍板定版
6. **mingnao → mingnow rename**：J大 在 mingnao 拍板後加 now 諧音 → 18 個檔案 + 6 個目錄重新 rename（PowerShell 跑一次卡 user-mapped section，用 Edit 工具補完）

## 錯誤與失敗（What Failed）

同類錯誤下次別再犯。

1. ❌ **跳過 SOSTAC 順序**：違反 jacky-wiki 整套方法論血緣。已存 feedback memory，下次接到新品牌任務第一句話必須是「目標客群是誰」不是「視覺長怎樣」
2. ❌ **假設「家族視覺一致」是好事**：實際上母品牌家族感應靠 footer 標記 + 法定主體統一達成，不靠子品牌字首綁定或視覺相似
3. ❌ **客群定位過廣**：「給創辦人/教練/個人」三群混 → 每個都不夠精準。下次 STP 要逼到一個具體 persona 一句話
4. ❌ **「腦」字 web font 沒意識到問題**：v1.0 Claude Design 自己用 LXGW WenKai 渲染、明匠沒檢核出來——直到 J大 點出。下次 brand mark 字形必須先確認「是不是 SVG path 從零畫」
5. ❌ **「明腦」念起來怪沒早察覺**：是 J大 質疑後才意識到合成詞 vs 自然詞的問題。下次品牌命名要先過「55 歲老闆 5 秒能讀出口」測試
6. ❌ **AI 手繪 SVG 漢字限制承認太晚**：明匠該更早承認「我畫不好漢字」，把這個限制寫進角色卡，導引去找真人篆刻師。最終 J大 拍板 v2 SVG path 即為終版（不委外篆刻師），但限制承認時機若早可省一輪探索

## 升格候選

⭐⭐⭐ **強烈建議升格 wiki concepts / patterns**：

- **「雙姊妹品牌視覺差異化 SOP」** → `wiki/cross-domain/雙姊妹品牌視覺SOP.md`（8 步驟工作流，跨域可重用）
- **「設計團隊內部會議模式」**（J董 + 兩 AI 員工辯論 + 拍板）→ `wiki/cross-domain/設計團隊AI會議模式.md`
- **「SOSTAC T 階段視覺 SOP」**（STP→品牌個性→視覺方向→BRIEF→執行 prompt→產出 audit→細化）→ `wiki/tbsa/concepts/SOSTAC-T階段視覺SOP.md`

⭐⭐ **建議升格 ailab tools**：

- **「Claude Design 雙輪細化工作流」** → `wiki/ailab/tools/claude-design-workflow.md`
  - R1：完整 brief 含 brand context + STP + token + 黑名單 + wireframe
  - R1 audit：14 條黑名單檢核 + 5 維度評分 + quick fix 清單
  - R2 brief：只針對「不夠的部分」精準補丁，不重寫
  - 結果：v1 47/50 → v2 48/50（核心字形從 web font 渲染升格為 SVG path 漢印幾何）

⭐ **建議升格 ailab concepts**：

- **「SOSTAC 順序鐵規」**（不可跳階段，視覺前必須有 STP 三句話）→ 已存 memory，順手升格 `wiki/ailab/concepts/SOSTAC順序鐵規.md` 給其他 AI 員工讀

🔵 **留 inbox 不升**：mingnao → mingnow rename 操作瑣事、明匠角色卡格式（品牌專屬，不通用）

## 待延伸（Next）

1. ✅ **Round 2 Claude Design 已拍板定版**（2026-05-16，nao-strict 漢印小篆為終版）
2. 🔵 **brand assets 落地**進行中：抽 SVG defs → brand.svg、套子站三頁、favicon、email signature、報價單 watermark、brand guidelines 對外發布
3. 🔵 **STP 對齊更新**：`products/mingnow/product-brief.md`、`service-tiers.md`、`mingnow-business-model.md` 內仍寫舊客群「個人專業者/SMB/IP工作者」，需對齊「傳統中小企業主」
4. 🔵 **明匠 audit checklist** 寫成 SOP（5 條硬檢核點，下次新子品牌 audit 用）
5. 🔵 **驗證會議模式**：下次新子品牌（採購情報 procurement.airun.tw）啟動時，用同一個會議模式跑一次，看是否仍適用
6. 🔵 **整合明察明腦 brand assets 入 jacky-wiki**：兩品牌的 visual-director.md / ming-jiang.md / brand-architecture.md 升格 jacky-wiki cross-domain 域

---

_本 session 由明匠（明腦產品線負責人）整理，J董 主持，Jacky 拍板。_
