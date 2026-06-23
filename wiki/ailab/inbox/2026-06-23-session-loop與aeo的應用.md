---
session_date: 2026-06-23
session_topic: 把「規則會一直變」做成自我進化 loop，並完成 AEO PRO 外發硬化＋客戶進案端到端
model: claude-opus-4-8
context: AIRUN / jdong-wiki orchestrator + airun-site
duration: ~半天
type: session-summary
tags: loop, self-evolving-loop, aeo, geo, seo, deterministic-first, human-gate, sov-noise-floor, controlled-pilot, jdong-loop
---

## 最終做法（What Worked）

### A. loop 的應用——「規則會一直變」做成自我進化引擎
- **問題**：AEO/GEO/SEO 規則官方一直改，人工追不完。**正解＝把「跟進→解析→調策略→執行→量數據」做成常駐 loop**，不是每次人工追。
- **架構鐵則（可複用到任何「外部規則會變」的領域）**：
  1. **deterministic 先行**：抓官方文件 + 文字 diff＝零 LLM；**只有偵測到變動才動 LLM**（省成本、90/9/1）。
  2. **LLM 只產『提案』不執行**：解析變動→提調整策略，但不自動改碼/部署。
  3. **人工 /yes 閘**：改 scorer/SOP/紅線一律 Telegram 點頭，**對外/改碼永不下放自動層**。
  4. **首輪只建 baseline**（冷啟不噪音），第二輪起偵測變動才提案。
- **落地**：`crm/aeo/rule-watch.mjs`（抓 Google/OpenAI/Anthropic/Perplexity 官方頁→sha256 diff→變動才 gate.callClaude→提案落 `ops/aeo-rule-proposals/`＋Telegram），接 jdong-loop `dow:2 07:00`。state 在 `.rule-watch/` 不進 git、自重建。
- **家選對**：`/loop` skill 落在「session 動態自走」模式，但「徹底解決」要活過 session→改放 **jdong-loop 常駐 cron**（我們 blog/AEO/CRM 自動化的同款 daemon）。**判準：要永久＝cron daemon；要這次跑完＝session loop。**

### B. AEO 的應用——外發硬化＋客戶進案端到端＋規則校準
- **外發前硬化（WO 驗收級）**：token at rest 改 **sha256 digest**（明文只發行回一次）＋舊明文自動 migration；未綁 host token 非 admin→403；`/aeo-pro` 移除 query 自動解鎖；`/api/aeo/full` 補 `no-store`。本機 black-box curl + 自簽 test token（測畢撤銷）驗 host-mismatch/unbound→403。
- **客戶進案端到端**（受控試點）：填入→admin 發**綁 host＋設效期**的 token→`/aeo-pro` 解鎖看技術分(live)+首推率+`actions[]`→交客戶 AI Agent 照 **AEO-Playbook** 執行（write_file/inject_jsonld/site_edit/publish_content）。內容型 action 過 **deterministic 紅線 guard**（客戶名/金額/內部詞）才輸出。
- **規則校準（對齊 Google 官方）**：Google 立場「good SEO is good GEO、別做 llms.txt、別信第三方指標」→ 我方 scorer **llms.txt P1→P3+標低信心、FAQPage 去『4.2×』+註 Google 已砍 rich result**；SOP 北極星改**商業結果>一切指標**、first_pick_rate 降方向訊號、答案先行加「為人寫非為機器 chunk」防呆。**定位：AEO=SEO基本盤+跨引擎可見度（Google 只代表自己那台）。**
- **部署紀律**：改碼走分支→/yes→FF 本地 main→**J大 push→Zeabur 原生自動部署→先查 deployment list 確認自動觸發、絕不手動 redeploy（防 race→502）→探新碼標記驗活→5× 穩定**。

## 繞路紀錄（Detours）
- SOV 同日重跑會覆蓋當天 baseline、verify 仍回「baseline」拿不到 delta → 寫**一次性比對 harness**（round-1 當 prev、新掃當 curr、直接 verify()，不覆蓋紀錄）。
- 想直接用 `/loop` skill 一鍵解 → 發現 session 模式撐不住「永久跟進」→ 用 AskUserQuestion 確認家、改建 jdong-loop cron。
- 工具 `submit-result` 把我手寫的詳細 RR 覆蓋成 template stub → 重寫時保留 workflow frontmatter（result_id/from/to/status）＋把證據塞進它的區塊。

## 錯誤與失敗（What Failed）
- **零改動也跑出「首推率 +6pp、verdict 上升✓」**：jwood round-2 沒套任何 action，first_pick 19%→25%、一題 0%→50%。→ **SOV 單輪 delta 的雜訊底 ≈ ±6pp**，單輪正 delta 不可信。教訓：報 delta 一定逐題拆 by_question、不只看 overall；宣稱「提升」要跨多輪超雜訊。
- **誤判 tech 13 vs 64 矛盾**：以為引擎掃錯 → 真因是 `jwood.tw` 根網域 **301→www**，跟轉址的 scorer 讀到真內容(64)、不跟的讀到空 stub(13)。→ 這本身是 AEO finding（爬蟲在根網域看到空白），不是 bug。
- 手改 case.json 撞 schema enum（promises.status/pricing.status/decisions_log 型別）→ 一定跑 `validateCase()` 驗。

## 升格候選
- ⭐ **「自我進化規則 loop」模式** → `patterns/`：外部規則會變的任何領域，用「deterministic 抓+diff 零LLM／只有變動才動LLM／人工閘不自動改／首輪只baseline」。
- ⭐ **「指標雜訊底先測」模式** → `patterns/`：任何 LLM/抽樣指標，先做「零改動對照」測出雜訊底，再決定多少 delta 才算真訊號（本次 SOV ±6pp）。
- ⭐ **AEO=SEO基本盤+跨引擎可見度** → `concepts/`：Google 只代表自己那台引擎，別拿它不認的招（llms.txt/FAQ 紅利）當主賣點；內容哲學（E-E-A-T/第一手/對人好）與 Google 同向。
- ⭐ **deterministic 先行、LLM 只在分岔點** → `concepts/AI工具觀` 補：90/9/1，把 LLM 關進「只有偵測到變動/只有判斷題」才呼叫的閘。
- **受控試點 token 治理**（綁 host/設效期/不量發/admin 手動把關）→ `tools/` 或留 inbox。
- 只留 inbox 不升：WO/RR 流程細節、case schema 雷（屬 jdong-company lessons）。

## 待延伸（Next）
- jwood 實際把 12 條 actions 套上站（先修 301）→ 跑 round-3 對照 round-1，看 fp_delta 是否穩定超 ±6pp 且 losing 題減少。
- rule-watch iteration-2 下週二首次自動觸發，觀察「官方真的改了」時的 diff→提案品質。
- scorer llms.txt 降權後，觀察客戶端 actions 是否更貼 Google 立場、會不會少掉無效建議。

---
[已升格 2026-06-23]
- ⭐ 自我進化規則 loop → patterns/自我進化規則loop.md
- ⭐ 指標雜訊底先測 → patterns/指標雜訊底先測.md
- ⭐ AEO=SEO+跨引擎 → concepts/AEO與跨引擎可見度.md
- ⭐ deterministic先行/LLM只在分岔點 → concepts/AI工具觀.md（新增 90/9/1 段）
- 模式索引已加 已升格 8/9
