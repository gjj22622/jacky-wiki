---
event: 回信腦改標籤驅動路由——先貼標籤再依標籤走流程，LLM只優化分類
date: 2026-06-09
model: claude-opus-4.8
context: jdong/AIRUN CRM 回信腦（orchestrator）
type: 工作流改進
maturity: 已驗證
tags: agent-separation, classification, deterministic-routing, llm-gate, crm, reply-automation
---

## 發生了什麼
把客戶回信處理從「單一 LLM 一次同時做三件事（判斷需求＋選 workflow＋產草稿，還自己判敏感）」，重構成一條分工流水線：①貼標籤 tagger（唯一 LLM 判斷）→②確定性路由 flow-router（查表零判斷）→③只有 reply 流才跑 producer 產草稿→④獨立監察 auditor（不同 prompt 視角、不繼承自評）→⑤一律推 Telegram 等 J 大點頭。三個 agent（tagger/producer/auditor）刻意分開、走不同 prompt。

## 為什麼重要
J 大的洞見：**把唯一需要 LLM 判斷的事（分類）獨立成單一可測動作，其餘全部確定性查表。「先貼標籤再走流程」就不會錯，要優化的只剩貼標籤的準度。** 這解掉「自產自審＝橡皮章」與「三件事糊在一起、錯了難 debug 難優化」兩個病。分類錯誤現在可被單獨量測、單獨優化（攢標註集回測），路由可預測可測試，標籤同時寫進 CRM tags 留痕可稽核。紅線（錢/承諾/合約帳款）信件直接停人工、不浪費 producer token。

## 怎麼做的
- `mail-tagger.js`：吃信吐一個 `flow:*`（checkup/reply/quote/redline/mingcha/system/unknown）+ confidence + redline_hint；低信心<0.6 自動降 unknown；自身熔斷/失敗一律保守當 unknown。
- `flow-router.js`：純查表 ROUTES，tag→handler（produce-reply/run-checkup/escalate-human/ignore-system）；reply 若嗅到錢自動升級 escalate。
- `auditor-agent.js`：獨立對抗式監察，prompt 視角與 producer 相反（producer 想「怎麼回得好」/auditor 想「哪裡會害我們、該退」），不繼承自評、從零重判；自身失敗一律 block。
- `reply-agent.js`：關掉自動寄，改 tag→route→handler；reply 流產草稿→監察→落 PENDING 草稿(純 fs 不碰 git)→推 Telegram 待點頭。
- `mail-flow-taxonomy.md`：信件流程分類表（改流程先改這張表）。
- 驗證：6 封真實信 tagger 全分類正確；router 邏輯全對（含安全升級）；auditor 乾淨稿 pass／報價+折扣+保證稿 block 抓出 money+promise；CRM 測試 98 pass 零回歸。

## 對比與替代
舊：reply-agent 單 agent 自產自審、非敏感就自動寄——分類/產出/把關糊一起，敏感判斷是自己審自己。
新：分工＋獨立監察＋人類閘門。替代方案考慮過「給 send-deliverable 加 blanket 權限規則」一勞永逸——被 J 大否決（那是放權限不是設流程），改走「標籤系統先貼再路由」才是對的一勞永逸。

## 連結與出處
- 實作：`jdong-wiki/infra/orchestrator/crm/{mail-tagger,flow-router,auditor-agent,reply-agent}.js` + `mail-flow-taxonomy.md`
- auto-memory：`project-reply-auditor-separation`
- 同日用同一條 checkup 產線交付厭厭/Noemie 兩份創業體檢報告

## 升格目標
留 inbox 觀察。跑一兩週真實進信、攢 tagger misclassification 樣本後，若分類準度穩 → 升 `ailab/patterns/`（「先分類再確定性路由」可跨場景複用的 agent 編排模式）；「三 agent 分開不同 prompt 防橡皮章」可補進 `ailab/concepts/` agent 設計觀。
