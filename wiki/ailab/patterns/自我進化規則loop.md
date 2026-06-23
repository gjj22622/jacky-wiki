---
title: 自我進化規則 loop（外部規則會變→自動跟進→提案→人工閘）
domain: ailab
updated: 2026-06-23
---

# 自我進化規則 loop ⭐

> 適用：**任何「外部規則／官方政策會一直變」的領域**（AEO/SEO 規則、平台 API 政策、補助法規、合規要求…）。人工追不完，就把「跟進→解析→調策略→執行→量數據」做成常駐 loop。

## 我個人視角

| 維度 | 註記 |
|---|---|
| 觸發契機 | AEO/GEO/SEO 規則官方一直改（Google 一篇文就推翻 llms.txt/FAQ 紅利）；想「徹底解決」＝不要每次人工追 |
| 核心五步 | 跟進(抓官方文件)→解析(diff)→調策略(提案)→執行(改設定)→量數據(指標) |
| **四條鐵則**（可複用） | ① **deterministic 先行**：抓+文字 diff 零 LLM；② **只有偵測到變動才動 LLM**（省成本、對齊 90/9/1）；③ LLM 只產『提案』不執行；④ **人工 /yes 閘**——改碼/設定/對外永不下放自動層；⑤ 首輪只建 baseline（冷啟不噪音）|
| 家放哪 | 要永久＝常駐 cron daemon（如 jdong-loop）；要這次跑完＝session loop（`/loop` 動態）。**判準：活不活過 session** |
| 第一個實作 | AIRUN `crm/aeo/rule-watch.mjs`（週抓 Google/OpenAI/Anthropic/Perplexity→sha256 diff→變動才提案→Telegram /yes→提案落 `ops/aeo-rule-proposals/`），接 jdong-loop `dow:2` |
| 自我提示 | 遇到「這規則以後還會變」的東西，**問自己：該手追還是該建 loop？** 建 loop 時先確認「執行步驟需不需要本機 env／人工閘」決定家 |

## 為什麼有效
- 把成本壓在「只有真的變了才花 LLM」——平時零成本空轉。
- 人工閘擋住「自動改碼/對外」的災難面，又保留「自動偵測+提案」的省力面（人只做最後一哩的判斷）。

## 連結與出處
- 實作：AIRUN orchestrator `crm/aeo/rule-watch.mjs`（jdong-company 專案）
- 同血脈：[[deterministic先行LLM只在分岔點]]（90/9/1）、[[指標雜訊底先測]]（量數據那一步的紀律）
- 跨域完整 SOP（若日後寫）→ cross-domain
