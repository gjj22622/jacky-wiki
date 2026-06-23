---
title: L6「迴圈」章節設計 — 用 SOSTAC 把 AI 工作流做成自走迴圈
domain: education
updated: 2026-06-23
audience: 內部團隊 / 課程設計者 / 想教 AI Agent 工作流的人
prerequisite: 懂 SOSTAC（L2）、Agent 說明書、三種協作（L5）
duration: 20 分鐘
tags: SOSTAC, agent loop, 逆向工程, 逆推除錯, 課程設計, 課程↔Skill 連動
source_chat: 2026-06-23 替双云 AI School 規劃並開發 L6 章節（教案→講稿→/迴圈 Skill→課程↔Skill 資料庫→影片→上架）
---

# L6「迴圈」章節：把 SOSTAC 變成會自走的 AI 工作流

## 一句話
串通（L5）把 Agent 接起來；**迴圈（L6）讓它自己重複跑、自我監控、達標才停**。主骨幹＝**SOSTAC 本身就是一個迴圈**，正著建、逆著查。

## 三個可複用的教學設計決策

1. **用學員學過的東西當主軸**：SOSTAC（L2 已教）→ 六格映射成六個 Agent（S 現況收集／O 人給目標／S 策略 plan／T 工具環境／A 執行／C 交付），**C 回頭成下一輪的 S**，繞著 O 轉。不發明新框架，舊知識長出新能力。

2. **兩種「逆」補完知識體系**：
   - **逆向工程（建構用）**：從一個成功成品倒推 → 把目標 O 定具體（打掉「目標太空泛」）。借鏡 Jacky 2025-08《數位行銷AI逆向工程》。
   - **逆推除錯（修正用）**：跑不到目標時，倒著沿 SOSTAC `A→T→S→O→S` 從便宜改起、不行才往根本爬，3 次升一級。兩個終極病根＝O 訂壞 或 現況 S 是 AI 幻覺。**讓 loop 永遠圍繞目標、不越跑越遠**。

3. **課程 > 影片 > 實作 > Skill 閉環**：每課影片下方「實作」區塊直接把對應 Skill 交到學員手上（L6 試點＝`/迴圈`）。配一條**貫穿實作 Lab**（木酢競品週報，七課產出互為輸入，像迴圈 C→S），最後交一份真的週報＋執行紀錄（對應 AGENTS L2）。

## 採坑點（製作時踩到的）

- **★ 影片語音與換頁對不齊的根因＝講稿沒分段**：影片管線的真對齊靠「**一段 `# 標題` 對一張投影片**」——TTS 照 `#` 段切出每段音檔，`align_dur.py` 用每段音檔的實際長度設該頁時長。既有 35 課的講稿都是這樣寫（如 L0-01 有 5 個 `#` 段對 6 頁）。
  - **錯誤示範（第一版 L6）**：講稿只寫一個 `# H1` ＋整段散文 → TTS 只切一段 → align_dur 退化（標題頁吃掉全部時長）→ 當時誤用「按比例縮放 deck 時長」`_make_l6_videos.sh` 硬湊長度，結果**換頁跟旁白對不上**（頁數對、節奏不對）。
  - **正解（已修）**：把講稿改成「一段一頁」結構（`#` 標題＝該頁的口語開場句，會被念出來，要寫自然），段數＝中間頁數＋首尾；重跑 TTS（分段）→ **標準 `scripts/_realign_all.sh`（內含 align_dur）** 出片。已刪除 `_make_l6_videos.sh`。
  - 對應 slide 數算法：`段數 = 1(title) + 中間頁數 + 1(末段給 task+check)`。6 頁→5 段、7 頁→6 段。
- **母源路徑漂移**：`build-course-json.js`、`sync-videos.js` 都寫死空格版「双云AI School」，實際是底線版「双云AI_School」。兩支都要改成底線優先＋空格 fallback。
- **新增 Level 要改兩處**：母源資料夾 `L6-0X_*` ＋ `build-course-json.js` 的 `LEVELS` 陣列加 L6，缺一不可（只建資料夾，level 不會出現在 course.json）。

## 對應產物
- 教案：`双云AI_School/01_影片課程/L6_迴圈_教案設計.md`
- 範例：`…/L6_貫穿實作_木酢競品週報_範例.md`
- Skill：`/迴圈`（canonical `jacky-wiki/wiki/shuangyun/skill/迴圈/`）
- 平台：`skills.json` ＋ course 卡片「實作」區塊（課程↔Skill 連動）

## 延伸
- 迴圈的監控（T 管：自動品管→進化日誌→人工確認→版控）＝ [[shuangyun/concepts/AGENTS知識體系]] 的 N＋T。
- 工具地景（Claude Code 編排／n8n／LangGraph/CrewAI／MCP）當「知道就好」的對照，不在非工程班深講。
