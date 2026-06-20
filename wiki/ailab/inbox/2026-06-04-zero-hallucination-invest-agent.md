---
title: 零幻覺投資顧問 agent 一日上線
domain: ailab
updated: 2026-06-04
---

---
event: 零幻覺投資顧問 agent 一日上線（claude -p 工具全關 + 數字稽核）
date: 2026-06-04
model: claude-opus-4-8
context: 個人投資儀表板（/home/jacky/Jacky的投資儀表板，Telegram bot @Doubleclouds_bot）
type: 突破
maturity: 已驗證
tags: zero-hallucination, claude-cli, headless, telegram-bot, twse-mis, finmind, systemd, context-injection
---

## 發生了什麼

把停擺 6 週的 Telegram 投資 bot 復活＋升級成「零幻覺投資顧問 agent」，從調研到 systemd 常駐上線一天完成。AI 可分析持倉/產業前瞻，但所有股價、法人、新聞數字 100% 來自真實 API，AI 只做判讀敘事。

## 為什麼重要

直接回應了在其他 AI 上遇到的痛點：AI 對股價/研報/趨勢會幻覺，數字不可信。這次實證了「AI 不碰數字、只判讀」的工程化做法可行——實測問「台積電目標價多少」會拒答、報價缺漏會明說「資料暫缺」、AI 偷生數字會被稽核抓到附警語。這是 NCHU 73% 作者名幻覺事故後，幻覺防線從「事後人工修」進化到「架構性預防」。

## 怎麼做的

三道防線（OpenBB Copilot 模式落地）：
1. **工具全關**：`claude -p --model sonnet --disallowedTools "Bash,Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Task,Agent,..."` — AI 唯一資訊來源是注入的 prompt，無法自己上網抓（幻覺）數字
2. **零幻覺鐵律 prompt**：只能引用數據區塊數字／引用附 `[來源·時間戳]`／【資料暫缺】必須明說／不給目標價／不確定就說不確定
3. **post-hoc 數字稽核**：正則抽 AI 回應所有數字比對注入 context 溯源（含 ×1000/×10000/×1e8 中文單位換算、0.5% 容差），對不上附 ⚠️ 警語

配套：ContextBuilder 先從真實 API 取數組「數據區塊」（TWSE MIS 5 秒級即時、FinMind 法人、RSS 新聞 AI 評分）；時間戳用交易所 tlong 非本地時間；AI 掛了降級成純數據摘要。

## 對比與替代

- vs **bot 內直呼 Claude API**：headless CLI 走訂閱額度零現金成本，且 API key 從未設定過（發現舊 bot 的 AI 評分其實從沒跑過）
- vs **給 AI 開 WebSearch 自己查**：正是幻覺來源，被 disallowedTools 明確封死
- vs **Ghostfolio / TWSEMCPServer 等現成方案**：調研後選「重用既有零依賴 bot + 補 AI 層」，TWSEMCPServer 列選配
- 環境坑：systemd 的 node 必須指 `~/.hermes/node/bin/node`（系統 Node 18 vs better-sqlite3 編譯於 Node 22 → ERR_DLOPEN_FAILED）

## 連結與出處

- 專案：`/home/jacky/Jacky的投資儀表板/`（AdvisorService.js / ContextBuilder.js）
- 規劃：`~/.claude/plans/nested-stirring-pike.md`
- 配對 skill：`~/.claude/skills/invest-advisor/`
- auto-memory：`reference_zero_hallucination_pattern.md`
- 前因事故：wiki/nchu/concepts/零幻覺與文獻查證SOP.md

## 升格目標

跑滿 1-2 週驗證推播與稽核誤報率後，升 `ailab/patterns/`（零幻覺三道防線模式，與 cross-domain/來源控制與script_viewer模式.md 互連）；`ailab/tools/claude-code.md` 補「claude -p headless + disallowedTools 當無幻覺推理引擎」一條。
