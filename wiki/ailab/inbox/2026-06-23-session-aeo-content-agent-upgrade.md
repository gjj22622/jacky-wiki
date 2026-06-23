---
session_date: 2026-06-23
session_topic: 把 AIRUN blog 撰稿系統升級成「AEO 文章撰寫 Agent」（AEO缺口驅動＋後台審核＋人機雙渲染＋反轉句自癒）
model: claude-opus-4.8
context: AIRUN / jdong-company blog 系統（airun-site + jdong-wiki orchestrator）
duration: ~4h
type: session-summary
tags: aeo, geo, blog-agent, dual-rendering, json-ld, llms-txt, zeabur-deploy, x-admin-token, 絞殺式收編, prompt-engineering
---

## 最終做法（What Worked）

**整體策略＝絞殺式收編，不重寫。** 保留既有 `pending→calendar→Telegram→/yes` 管線（已做對 90/9/1、預算熔斷、邊界掃描、去AI腔自檢），三項升級全是加法掛上去。

1. **AEO 缺口驅動撰稿**：新建 `topic-source.mjs`，讓 scheduler 消費 AEO 引擎 `advice-agent` 算出的「AI 首推率 0% 問句」（publish_content actions 含 linked_question/outline）→ backlog → SEED 日曆保底。日曆只當「節奏控制器」（每3天一篇），「寫什麼」改由缺口驅動。修掉「scheduler 一直忽略 backlog、只跑固定日曆」的盲眼。
2. **AEO 撰稿規範文件化**：把 SEO+AEO 研究編成 `aeo-content-agent-工作說明書.md`（可執行規則非散文），餵成撰稿 system prompt。核心規則：①每個 H2 是使用者會問 AI 的「問句」、其下 40–75 字「答案先行」自足段（可被單獨摘走）②前 30% 放最密證據 ③Princeton GEO 證據三件套（統計數字／可引用來源／肯定語氣，各 +30–40% 被引用率）④能比較就用表格（被引用率 4.2×）⑤文末 3–5 題 FAQ 自足（驅動 FAQPage schema 4.2×）。
3. **後台審核機制**：複用 `/api/admin/aeo/result` 的 x-admin-token 鏡像 push 模式——本機草稿 push 到 airun-site runtime store，`/admin/blog-review` 左（人類 HTML）右（爬蟲 markdown）並排預覽、反轉句標紅、核准即時上線、退回理由回流。保留 Telegram /yes 當第二條等價路徑。
4. **人機雙渲染**：blog 接上既有 `machine.js` 內容協商——`?format=md`／`Accept: text/markdown`／即時爬蟲 UA（PerplexityBot等）→ 乾淨 markdown；人類與訓練爬蟲（GPTBot）→ HTML + JSON-LD `@graph`（Article+FAQPage+BreadcrumbList，FAQ 同時可見確保非 cloaking）。`md2html` 補表格解析。
5. **反轉句自癒**：撰稿後 `reversalTicCount > 1` 自動重抽一次、取較乾淨者（實測 3 句→1 句）。把去AI腔守線從「事後人工標紅」升級成「事前自癒」。
6. **回流閉環**：`review-sync.mjs`（接進 jdong-loop 每10分）拉後台決策——approve 補素材包/標月曆/清草稿、reject 把 feedback 寫回 `rejected/` 供下次 prompt 學習。

## 繞路紀錄（Detours）

- **想加表格解析器到渲染器** → 那要改 airun-site 部署（卡在 J董 push）→ 改先把當下那篇的比較表「重構成 H2+三組清單」即時 runtime 重發（不需部署），表格解析器併進後續部署批次。**教訓：能用既有渲染能力先解的，別為單篇卡部署。**
- **想自己 redeploy 完成部署** → 查 `zeabur deployment list` 發現 push main 已觸發原生自動部署（`DEPLOYING`）→ **沒有手動 redeploy**（避開 push+redeploy 並發 race→502）。原生整合與 6/21「hook 全空」診斷不同、狀態會變。
- **topic-source 去重用關鍵詞比對** → 第一版含通用詞「AI」→ 幾乎每個 blog slug 都含「ai」→ 全被當重複、`nextTopic()` 永遠回 null。改成「排除通用詞 + 同一 slug 命中 ≥2 個具體詞才算覆蓋」+ 主要靠 consumed-state 刻意去重。
- **git reset --hard origin/main 想清乾淨 main** → 當時 HEAD 其實在 feat 分支 → 把已 commit 的 x-admin-token（8d83a80）從分支頭打掉。**還好 commit 還是 dangling object**，用 `git cherry-pick 8d83a80` 救回併進新分支。

## 錯誤與失敗（What Failed）

- **假設 Zeabur 原生自動部署是壞的**（沿用 6/21 診斷）→ 實際 push main 會觸發部署，差點手動 redeploy 造成上次那種 502。**修正：部署診斷狀態會變，push 後先 `deployment list` 看有沒有自動 DEPLOYING，有就只等不手動。**
- **LLM 反轉句非確定性**：同一 prompt 兩次跑出 0 句 vs 4 句。光靠 prompt 規則壓不死 → 必須加程式層的自癒（重抽）或人工關卡，不能假設 prompt 寫了「禁反轉句」就會歸零。
- **「稽核」被守線整篇退稿**：advice 的 outline 含「決策可稽核軌跡」，LLM 照抄 → 命中 DENY `/稽核/`。修正：prompt 加「禁用詞替換」（稽核→可回查的紀錄）。**教訓：上游 context（advice outline）含禁用詞，下游 LLM 會照抄——禁用詞規則要寫進 prompt 讓它主動替換，不能只靠守線事後攔。**
- **路徑 bug**：`LOGS` 常數已含 `/blog`，再 `path.join(LOGS,"blog",...)` → `logs/blog/blog/`。寫新路徑前先確認既有常數已經包含到哪一層。
- **安全硬化的連鎖斷裂**（本 session 開頭發現）：6/21 admin session 改 opaque sid 後，blog 發布器仍送舊式 cookie=ADMIN_TOKEN → 401 靜默掛掉一週沒人發現。**改 admin 認證機制時沒盤所有依賴它的本機 push 工具。**

## 升格候選

- ⭐ **AEO/GEO 撰稿知識** → 升 `ailab/concepts/` 或 `tools/`：answer-first、H2即問句、Princeton GEO 證據三件套、表格 4.2×、FAQPage、llms.txt、robots AI 爬蟲 token 分類（訓練/檢索/使用者）。工作說明書本身就是現成服務規格書（日後白牌成對外服務「AEO 文章撰寫 Agent」）。
- ⭐ **「絞殺式收編 > 重寫」模式** → `patterns/`：既有管線做對的部分全保留，升級全做加法（topic-source/pushDraft/review-sync 都是新檔掛上去，核心 scheduler 只改 buildPrompt+接線）。
- ⭐ **「介面給人看、文件給爬蟲看」雙渲染模式** → `patterns/`：同一內容兩種出口，UA/Accept/query 三路偵測分流，JSON-LD 必須與可見內容一致（非 cloaking）。
- **「事前自癒 > 事後標紅」守線模式** → `patterns/`：LLM 非確定性產出，程式層加「偵測超標→自動重抽取較佳者」比只標紅等人修更穩。
- **Zeabur 部署：push 後先查 deployment list 再決定要不要 redeploy** → 已寫進 jdong-company 的 lessons memory；可抽通用版進 `tools/`。
- 只留 inbox 不升：x-admin-token 那段斷裂修復（已在 jdong-company lessons，屬該專案脈絡）。

## 待延伸（Next）

- 今天 08:30 排程首次用新引擎自動產缺口題草稿、鏡像後台、推 Telegram——觀察第一篇真實產出品質與反轉句自癒是否生效。
- review-sync 首次處理真實 approve/reject 的回流是否順（素材包補跑、reject feedback 進下次 prompt）。
- 觀察數輪後：AEO 首推率有沒有因為這些缺口題上升（verify-agent 的 delta）。
- 工作說明書日後白牌成對外服務時，補「客戶版」邊界（拿掉 AIRUN 內部定位/紅線）。
