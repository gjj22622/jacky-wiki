---
session_date: 2026-06-20
session_topic: 規劃並落地「受保護倉庫＋訂單履約 API」雲端 AI 大腦 Phase 0（AnythingLLM＋自訂 publisher/fulfillment）
model: claude-opus-4.8（1M context）
context: jacky-wiki AI 大腦專案
duration: ~ 一個長對話（規劃 → Phase 0 落地驗收）
type: session-summary
tags: ai-brain, anythingllm, rag, rbac, 訂單履約模型, publisher, openrouter, docker, 資安, phase0
---

## 最終做法（What Worked）

- **規劃走 plan mode**：3 路並行 Explore subagent（repo 勘查／GitHub 選型／資安 RBAC）→ Plan agent 設計 → AskUserQuestion 集中拍板，不分批打斷 Jacky。
- **心智模型翻轉（Jacky 訂正）**：從「RBAC 開放瀏覽知識庫」改成「電商訂單履約：受保護倉庫＋履約 API」——成員只發訂單（訂單傳導→倉庫提取→物流送達→滿意度→回購），**永不瀏覽大腦**。這是整個架構的錨。
- **引擎不自建**：AnythingLLM 當倉庫（向量/RAG/審計/RBAC），只寫兩支零依賴 TS（`tools/publisher` 入庫＋`services/fulfillment` 履約 API），Node 24 原生跑 TS（type stripping）。
- **層級用 workspace 矩陣表達**（主題×L1/L2/L3 累積扇出：`shuangyun-L1 ⊂ L2 ⊂ L3`），履約 API 依（主題,成員層級）直接選 workspace，**不靠 runtime 向量過濾**。
- **安全靠物理隔離＋預設拒絕＋路徑硬排除**：敏感頁（jlife/inbox/客戶真名/AGENTS® IP）根本不進可達 workspace，jailbreak/越權也問不出不存在的資料——比任何 runtime guardrail 可靠。
- **AnythingLLM onboarding 全用 API 自動化**：single-user 無認證狀態下打 `/api/system/enable-multi-user`（建管理員）→ `/api/request-token`（admin JWT）→ `/api/admin/generate-api-key`，省掉整套 GUI onboarding，把使用者手動步驟壓到只剩「給一把 LLM key」。
- **/goal 模式驅動執行**＋stop hook 守驗收，全程「每步回報、卡住先問」。

## 繞路紀錄（Detours）

- Zeabur credit $0 → 改本機 docker compose 先證明 Phase 0（有問過 Jacky 才轉向）。
- LLM provider 卡在等 OpenRouter key；一度起本機 Ollama 想自主完成證明 → Jacky 否決「跑不動，我試過」→ 回 OpenRouter。**教訓：使用者明確選了的引擎不要為了趕進度擅自換成被否決的選項。**
- 中文召回弱：把 workspace `similarityThreshold` 設 0 反而拉進雜訊，讓模型回「我不太明白」→ 改 0.1 才平衡（recall vs noise）。
- 想用 AnythingLLM `vector-search` 端點證明「檢索層隔離」（不需 LLM）→ 500 錯誤 → 放棄，改用「物理隔離」論證 + 等 LLM 跑 order 級驗收。

## 錯誤與失敗（What Failed）

- ⚠️ **public repo 洩漏**：publisher 的 `report.md`（含被剝除的客戶頁名「木酢寵物達人」）被 commit 進 public repo。未 push 時抓到 → `git rm --cached` + 加進 .gitignore + amend。**教訓：publisher 中間產物/報告也算機密，要先 gitignore 再產出。**
- Node 24 strip-only 模式不支援 TS「constructor 參數屬性」（`constructor(private x)`）→ publish.ts 報 `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` → 改顯式欄位賦值。
- fulfillment 第一版：倉庫連不上時 `fetch` 是 **throw**（不是回 `!ok`）→ 整個請求掛掉（curl exit 56）→ askWorkspace 加 try/catch，連不上＝0 命中不崩潰。
- **AnythingLLM provider 設定寫在容器 `/app/server/.env`（不在 volume）**，`docker compose up` 重建容器就掉（workspace 資料在 `/app/server/storage` volume 才持久）→ 把 provider 設定搬進 docker-compose 環境變數（`LLM_PROVIDER`/`OPEN_ROUTER_API_KEY`/`OPEN_ROUTER_MODEL_PREF`/`EMBEDDING_ENGINE`）才持久。
- gpt-4o-mini（經 OpenRouter）吐 `<think>` 推理塊污染輸出；jlife 查詢回「倉庫中無此資訊」卻 fulfilled:true → fulfillment 加後處理（剝 `<think>`、把「無此資訊」判為 0 命中 fulfilled:false）。
- PowerShell 5.1 `Set-Content -Encoding utf8` 把 .env 中文註解搞成亂碼（誤判讀取編碼）→ 改用 Write 工具寫，乾淨 UTF-8。

## 升格候選

- ⭐ **「受保護倉庫＋訂單履約」模式** → 已在 auto-memory `project-ai-brain-fulfillment.md`＋計畫檔；Phase 1 穩定後升 `ailab/patterns/` 或 `cross-domain/`。
- ⭐ **AnythingLLM API 自動化 onboarding（免 GUI）** → 值得升 `ailab/tools/`（新建 AnythingLLM 工具頁）。
- **層級×主題 workspace 矩陣做 RBAC（不靠 runtime 過濾）** → 模式候選。
- **native embedder 中文召回弱 + provider 設定非持久** → 雷區，升 `ailab/tools/` AnythingLLM 雷區段。
- **public-repo 中間產物洩漏** → 雷區，升 `ailab/tools/claude-code.md` 或 `education/pitfalls`。
- 以上**先留 inbox**，Phase 1 驗證更多後再依事件升格（無時間門檻）。

## 待延伸（Next）

- Phase 1：換多語 embedder（解中文召回）、publisher 傳乾淨檔名（現顯示 `sop.txt`/`.txt`）、開 education/shuangyun × L1/L2/L3 完整矩陣。
- members.json 正式成員 + 金鑰治理；Zeabur 上雲（要加值）；denylist.txt；per-key 速率限制。
- 觀察 fulfillment 用「無此資訊」字串判定 0 命中是否夠穩（偏 brittle，可能要改用更可靠訊號）。

## 連結與出處

- 計畫檔：`C:\Users\gjj22\.claude\plans\jacky-wiki-ai-zazzy-sprout.md`
- auto-memory：`project-ai-brain-fulfillment.md`
- 程式：`tools/publisher/`、`services/fulfillment/`、`docker-compose.yml`、`docs/ai-brain-phase0.md`（branch `dev`，commit 49a4a85→e923aec）
- 相關：[AI實踐索引](../AI實踐索引.md)、[實踐捕手協定](../concepts/實踐捕手協定.md)、[AI作業系統觀](../concepts/AI作業系統觀.md)
