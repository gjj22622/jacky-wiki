---
title: 黃仁勳 Computex 2026 — AI Agent 的定義與架構（演講開場定義錨）
domain: ailab
source: NVIDIA GTC Taipei @ Computex 2026 主題演講（2026-06-01，台北流行音樂中心）｜整理自 aiposthub 全紀錄 + technice 報導
read_date: 2026-06-03
type: 影片
impact: 改變了「對非技術聽眾講 AI Agent 是什麼」的開場方式——用最高權威架構框死定義，終結各自解讀
updated: 2026-06-03
---

# 黃仁勳 Computex 2026 — AI Agent 的定義與架構

> **為什麼記這筆**：AI Agent 現在「每個人各自解讀、很混亂」。要對企業決策者（尤其傳產老闆）講清楚「這東西到底是什麼」，與其自己定義，不如借**全世界最高權威**的架構框死它。黃仁勳 2026-06-01 在台北 Computex 的 keynote，剛好給了一個乾淨的兩層定義。
> **直接用途**：6/13 彰師大演講**開場（承幕）的「定義錨」**——框定 AI Agent 定義與架構，對齊海報官方目標①（AI Agent 與生成式 AI 的差異）。

---

## 一、核心：AI Agent（代理式 AI）的「兩層架構」

黃仁勳把代理式 AI 拆成**兩層**：

| 層 | 是什麼 | 負責 |
|---|---|---|
| **第一層 — 大腦** | 大語言模型（LLM） | **推理與規劃** |
| **第二層 — 作業系統** | 外部**編排引擎** | 把大腦**接到各種工具**去實際做事 |

**最關鍵的一句定義（逐字）**：
> 「**操作的主體，從人變成了 AI。**」
> 使用者不再開啟軟體、點擊按鈕，而是**向 AI 描述想要的結果，AI 自動完成工作**。

→ 這一句就是「生成式 AI（工讀生，你問它答）」與「AI Agent（員工，給目標自己跑）」的分界線，也是 [活知識四工模組](../../shuangyun/concepts/AGENTS知識體系.md) 裡「工讀生 vs 幹部」的技術精準版。

---

## 二、「AI 搶工作論」——黃仁勳直接打臉（開場拔刺神器）

對傳產老闆心裡最大的刺（AI 會不會搶工作），黃仁勳同場給了權威背書：

> 「People are talking about AI reducing job openings. **That's complete nonsense.**（這完全是無稽之談）」
>
> 「**You will not lose your job to AI, but to someone who uses AI better.**（你不會輸給 AI，你會輸給比你更會用 AI 的人。）」

數據佐證：AI 輔助編寫使用次數 2023→2026 從 3 億次飆到近 14 億次；軟體工程師反而越僱越多。

---

## 三、AI 基礎設施「五層蛋糕」（背景，演講可不用）

由下而上：**能源 → 晶片 → 基礎設施（AI 工廠）→ 模型 → 應用生態系**。
這是講 AI**產業基礎建設**的宏觀框架，對傳產老闆會失焦。**演講建議不放**，最多當「AI 是新的工業基礎」一句過場。

---

## 四、商業模式論述（→ 演講收幕 / AIRUN 定位背書）

> 來源交叉：[jdong-wiki `products/airun-new-business-models-2026-06.md`](../../../) 的 14-agent 艦隊偵察已抓過這層。

- **「agentic AI 已落地會賺錢、每個 token 都是營收單位、SaaS 變 GaaS——賣 agent 不賣座位」**
- **「7.5 萬人配 750 萬 agent、100:1」** 的 agent 槓桿
- 定價典範轉移：per-seat → usage / outcome（賣成果）

→ **收幕用法**：黃仁勳說未來是「賣 agent、賣成果，不賣座位」——明察天生就是這形狀（你不買工具席次，買一位 24h 不睡的數位分析師查出來的成果）。**是黃仁勳替服務定位背書，不是自吹。**

---

## 五、在 6/13 演講裡怎麼用（兩條線各歸各位）

| 黃仁勳論述 | 用在哪段 | 對應海報目標 |
|---|---|---|
| **兩層架構 + 操作主體從人變成 AI** | **承幕①（開場定義錨）** | 目標①：Agent vs 生成式差異 |
| **賣成果不賣座位 / 100:1** | **收幕（AIRUN 鋪陳）** | — |

**開場敘事**：Jacky「超級武器掉進原始人部落、沒附說明書、大家各自解讀」→ 「那說明書誰寫最清楚？三天前黃仁勳在台北講了」→ 兩層架構 → 翻成「工讀生 vs 員工」→ 拔刺「你不會輸給 AI，會輸給比你更會用 AI 的人」→ 進 A（拆你的決策）。

---

## 守線備註（30% 揭露線）

✅ 可用：黃仁勳公開 keynote 的架構、金句、商模論述（全是公開資訊）
❌ 不上台：jdong-wiki 那份商模 doc 的內部紅線（cron/cache_hit/twinkle-hub MCP/corpus 筆數/北極星三鐵則/客戶名）

---

## 來源

- [黃仁勳 Computex 2026 主題演講全紀錄 — aiposthub](https://www.aiposthub.com/jensen-huang-computex-2026-agentic-ai-keynote-ai-jobs-debate/)
- [COMPUTEX 2026／AI 代理工具將成 PC 新主角，黃仁勳：我們想重新發明電腦 — technice](https://www.technice.com.tw/issues/semicon/225044/)
- [NVIDIA GTC Taipei @ Computex 2026 官方](https://www.nvidia.com/zh-tw/gtc/taipei/computex/)

---

## 相關連結

- 域首頁 → [AI 實踐索引](../AI實踐索引.md)
- 閱讀索引 → [閱讀索引](閱讀索引.md)
- AGENTS 方法論（工讀生 vs 幹部、生成式 vs Agent）→ [AGENTS知識體系](../../shuangyun/concepts/AGENTS知識體系.md)
- 演講專案 → `OneDrive/.../04_彰師大高階企業經理人培訓`（6/13 彰師大）
