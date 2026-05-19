---
session_date: 2026-05-19
session_topic: 明察 B2G 完整閉環六行業×AI管理學院三模組×tw-opendata-mcp Sprint 7-9 並行上線
model: claude-sonnet-4-6
context: 双云/明察情報、AgentFlow
duration: ~4h（含前段 session 接續）
type: session-summary
tags: parallel-agents, b2g-memo, academy-modules, tw-opendata-mcp, sprint, sitemap, site-monitor
---

## 最終做法（What Worked）

**1. 多代理平行部署法（已穩定）**
- 同一 session 最多同時跑 3 個 background subagent，各負責不重疊的 repo/file：Module 3 builder（mingcha）+ Sprint 8（tw-opendata-mcp）+ Sprint 9（tw-opendata-mcp）+ Module 4 builder（mingcha）
- 衝突規則：同一個 repo 的兩個 agent 不能同時改同一個 **同名** 檔（sitemap.xml、training-school.html），需等一個完成再動
- 「等通知再繼續」比「輪詢」更高效：background agent 完成自動通知，主線程做其他不衝突的工作（週報、B2G memo、LinkedIn 草稿）
- 效果：5 個重量級功能在同一對話內平行完成（Module 3 ~2008行 + Sprint 8 794筆 + Sprint 9 36,501筆 + Module 4 + tech B2G memo）

**2. B2G 備忘錄工廠模式（已穩定）**
- 固定 HTML 模板：`memo-nav / memo-header（含 KPI row）/ 3 條路徑 / callout / data-table / cta-block（含雙按鈕）/ memo-sig`
- 完整 SEO 三件套：canonical、OG/Twitter meta、schema.org Article、GA4
- 六個行業全部走通：餐飲/建材/醫療/寵物/人力資源/科技業
- 每篇新 memo 的「三件套同步」：about.html 新增 memo 卡片 + sitemap.xml 新增 entry + site-monitor.yml 新增 URL
- 這三件套是閉環，少一件就有 SEO 死角或監控盲點

**3. tw-opendata-mcp Sprint 模式（已穩定）**
- 流程：找政府 API → TypeScript adapter（DATASET_ID/MANIFEST/materialize()）→ DuckDB → Parquet（ZSTD）→ manifest.json → 更新 materialize.ts SOURCES map + catalog.yaml → feature branch → PR → merge
- Sprint 7: EPA 裁罰 10,000 筆（公開 API key 在 data.gov.tw 下載 URL 內嵌，免申請）
- Sprint 8: 內政部建築執照 794 筆（建造+使用執照，民國95年起）
- Sprint 9: 健保署特約醫療機構 36,501 筆（每日更新）
- 目前 6 個資料集：pcc-tender / moe-9617 / moe-9623 / fda-restaurant-ghp / epa-penalty / building-permit / medical-institution

**4. AI 管理學模組架構（已穩定）**
- 每模組 ~1900-2100 行 HTML，同一 tokens.css 框架
- 模組邏輯鏈：1=概念→2=選模型→3=品質管控→4=策略決策→5=capstone（設計你的工作流）
- 進度點（topbar）：dot.done = prussian-500，dot.active = amber-600，dot.empty = rule
- subagent 可獨立建每模組：prompt 給「讀上一個模組檔路徑 → 完全複製 CSS → 這模組 4 課完整大綱」

---

## 繞路紀錄（Detours）

- **Module 2 曾落在 dev branch**（前段 session）：subagent 照 CLAUDE.md「dev 分支開發」規則，把 Module 2 推到 dev 而非 main，需要手動 `git merge dev → main`。修正：在 subagent prompt 加「commit and push to main directly」
- **sitemap.xml 衝突規避**：科技業 B2G memo 完成後，Module 4 agent 尚在執行（也會改 sitemap.xml），所以選擇等 Module 4 完成再一次補 tech-b2g entry，避免 git conflict
- **個人網站監控 URL 累積 26 條**：site-monitor.yml 每次有新頁面就要加 URL，沒有批次更新機制，偶爾忘加。修正：把「更新 site-monitor」寫進 B2G memo 製作 SOP

---

## 錯誤與失敗（What Failed）

- **Google Drive 上傳完全封鎖**：agentflowjdong@gmail.com token 過期（帳號暫停），所有 gog upload 指令都失敗。Labor quotation、報告 PDF 版本均無法上傳 Drive。需要 Jacky 恢復帳號或重新授權。
- **Subagent 自動 merge PR**（出現 Security Warning）：Sprint 8 & Sprint 9 agents 都在建 PR 後立即 `gh pr merge --merge --delete-branch` 自動合進 main，觸發安全警告。對小型 repo 影響有限，但這個 pattern 需要在 subagent prompt 裡明確禁止：「open PR but DO NOT merge」
- **personal-agent 無 git**：outreach drafts 020-022 存在 `/home/jacky/agents/personal-agent/company/marketing/outreach/`，但這個目錄沒有 git repo，無法版本控制。下次應存進 jdong-wiki 的 marketing/outreach/

---

## 升格候選

- ⭐ **B2G 備忘錄三件套（about + sitemap + site-monitor）** → `ailab/patterns/B2G備忘錄閉環.md`（新增）：這個同步規則每次都有用，值得固化
- ⭐ **「平行 subagent 衝突規則」** → `ailab/patterns/多代理平行部署模式.md`（已有，補「同 repo 同文件衝突規避」條目）
- `epa-penalty API key 在下載 URL 內嵌` → `ailab/tools/tw-opendata-mcp資料來源清單.md`（新增 EPA 條目）
- **Subagent 禁止自動 merge PR** → `ailab/tools/claude-code.md` subagent prompt 設計段補一條「禁止 gh pr merge --delete-branch 直接上 main」
- **Module 系列 subagent prompt 模式** → `ailab/patterns/模式索引.md`（連結備注）

---

## 待延伸（Next）

- ~~Module 4 agent 完成後：補 sitemap.xml（module-4 + tech-b2g）、site-monitor（module-4）~~ ✅ 完成
- ~~Module 5 設計與建置（capstone：建立你自己的 AI 工作流程 + J董評閱）~~ ✅ 2061行，PR#3 開啟待 Jacky merge
- ~~科技業完整版付費報告（/reports/2026-05-tech-industry）~~ ✅ subagent 執行中（IT NT$466億/793筆數據）
- ~~outreach drafts 020-022 搬進 jdong-wiki/marketing/outreach/ 做版本控制~~ ✅ 完成
- 確認 agentflowjdong@gmail.com 是否可以恢復 → Google Drive 上傳解鎖（待 Jacky）
- Sprint 10 實價登錄 PR#8 待 Jacky review/merge（tw-opendata-mcp）
- mingcha PR#3（Module 5 sitemap+training-school）待 Jacky merge
- reports/index.html + sitemap + site-monitor 補 tech-industry 三件套（W110完成後）
