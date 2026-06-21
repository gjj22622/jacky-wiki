---
name: jdong-wiki
description: 查詢或更新 J董 Wiki（AgentFlow Solutions CEO 的結構化知識庫）。觸發時機：需要查詢客戶進展、決策日誌、工作隊列、學習原則、市場情報；或需要記錄新決策、學習、客戶進展、產品進度時。執行任何商業任務前先查 decisions/ 和 learnings/ 避免重複錯誤。支援 /jdong-wiki 斜線指令。
trigger: /jdong-wiki
---

# /jdong-wiki — J董知識庫

讓 Claude 在**任何工作目錄**下，都能查詢和更新 J董（AgentFlow Solutions CEO）的結構化知識庫。

## Wiki 位置（固定）

```
/home/jacky/agents/jdong-wiki/
├── README.md                   # 主索引、J董身份、稽核方式
├── identity/                   # J董是誰、核心原則、行為準則
├── company/                    # AgentFlow 定位/服務/定價/戰略
├── clients/                    # 每個客戶的知識
│   ├── muzopet/
│   ├── mingcha/
│   └── ...
├── market/                     # 競品/市場情報/趨勢
├── ops/                        # 工具/SOP/費用控管/執行規則
│   ├── work-queue.md           # ⭐ J董工作隊列（每次任務前必讀）
│   ├── journal.md              # 每日工作日誌
│   └── jdong-log.json          # 結構化事件 log
├── marketing/                  # LinkedIn 草稿/outreach drafts
│   ├── linkedin-drafts/
│   └── outreach/
├── products/                   # 產品知識
│   ├── mingcha/
│   ├── ai-training-school/
│   └── ...
├── decisions/                  # 重大決策日誌（YYYY-MM-DD-主題.md）
├── learnings/                  # 從錯誤/成功提煉的原則
├── strategy/                   # 策略文件
└── skill/                      # 本 skill 的 canonical 位置
    └── SKILL.md
```

## 使用方式

```
/jdong-wiki                      # 顯示主索引 + 工作隊列待辦事項
/jdong-wiki queue                # 顯示 work-queue.md TODO 項目
/jdong-wiki query "<問題>"        # 查詢 wiki（自動路由到對應域）
/jdong-wiki client <名稱>         # 查詢/更新客戶進展
/jdong-wiki log <決策>            # 記錄重大決策 → decisions/
/jdong-wiki learn <原則>          # 記錄學習/教訓 → learnings/
/jdong-wiki journal              # 查看今日 journal 並補充當日進度
/jdong-wiki sync                 # 從當前對話抽取知識，存入對應域並 commit
```

## 觸發後必做

### 1. 先讀主索引和工作隊列

```bash
cat /home/jacky/agents/jdong-wiki/README.md
cat /home/jacky/agents/jdong-wiki/ops/work-queue.md
```

### 2. 依子指令動作

#### `/jdong-wiki`（無子指令）

1. 讀 README.md 取得全域概覽
2. 讀 ops/work-queue.md 的 TODO 項目列出未完成工作
3. 摘要：客戶狀態 / 本週 P1 任務 / 阻塞項目

#### `/jdong-wiki queue`

1. 讀 ops/work-queue.md
2. 列出所有 TODO 和 BLOCKED 項目（依優先度分組）
3. 標出可立即執行的 vs 待 Jacky 解除阻塞的

#### `/jdong-wiki query "<問題>"`

1. 判斷問題屬於哪個域（identity/company/clients/market/ops/decisions/learnings）
2. 讀該域 index.md → 找對應頁面 → 讀全文
3. 若跨多域，逐域查詢後整合回答

#### `/jdong-wiki client <名稱>`

1. 讀 `clients/<名稱>/` 目錄內容
2. 顯示：客戶狀態 / 最新進展 / 下一步 / 阻塞原因
3. 更新時寫入 `clients/<名稱>/progress.md`

#### `/jdong-wiki log <決策>`

1. 在 `decisions/YYYY-MM-DD-<主題>.md` 建新檔（用今天日期）
2. 格式：
   ```markdown
   ---
   title: <決策標題>
   date: YYYY-MM-DD
   domain: <涉及的域>
   impact: <high/medium/low>
   ---

   ## 決策內容
   ## 決策理由
   ## 替代方案（為什麼不選）
   ## 預期結果
   ## 後續追蹤
   ```
3. 更新 `decisions/index.md`
4. git add + commit + push

#### `/jdong-wiki learn <原則>`

1. 判斷原則屬於哪個 learnings 分類（client-mgmt/ops/sales/product/strategy）
2. 找對應 learnings 檔案或建新檔
3. 補充原則內容（包含：情境 / 原則 / 反例 / 出處）
4. git add + commit + push

#### `/jdong-wiki journal`

1. 讀今天的 ops/journal.md 對應段落
2. 若今天沒有條目，建一個並補入當前對話的進度摘要
3. journal 格式：
   ```markdown
   ## YYYY-MM-DD

   ### 完成
   - ...

   ### 進行中
   - ...

   ### 學到
   - ...
   ```

#### `/jdong-wiki sync`

從**當前對話**提煉知識並存入 wiki，完整流程：

1. **掃描對話**找：新決策 / 新學到的原則 / 客戶進展更新 / 產品進度 / 工作隊列變動
2. **分類存入**：
   - 決策 → `decisions/YYYY-MM-DD-<主題>.md`
   - 學習原則 → `learnings/<分類>.md`（補充，不是覆蓋）
   - 客戶進展 → `clients/<名稱>/progress.md`
   - 工作隊列 → `ops/work-queue.md`（標 DONE，補備注）
   - 日誌 → `ops/journal.md` 的今日段落
3. **提交**：`git add -A && git commit -m "chore(wiki): 自動 sync YYYY-MM-DD"` + push
4. **回報**：列出哪些檔案更新了、哪些知識被提取

---

## 寫作規範

- 繁體中文 + 檔名可中英混用
- YAML frontmatter（`title`、`domain`、`updated`）
- 不寫流水帳——只存**決策、原則、可複用的知識**
- 客戶機密、個人隱私不入 wiki（存 memory 即可）
- 去重：同一原則只存一份，用連結指向
- commit 格式：`feat(wiki): <描述>` / `chore(wiki): sync YYYY-MM-DD`

## 不要做

- ❌ 不要複製整段工作日誌 → 只存提煉後的原則
- ❌ 不要存暫時性任務狀態 → 那是 work-queue 的事
- ❌ 不要寫死臨時路徑 → 用 `/home/jacky/agents/jdong-wiki/` 固定根
- ❌ 不要 force push
- ❌ 不要在未確認 git pull 前就 push（避免 fast-forward conflict）

## 與其他 Skill 的關係

| Skill | 用途 | 關係 |
|---|---|---|
| `ailab` | Jacky 個人 AI 實踐紀錄 | 互補——ailab 記「怎麼用 AI」，jdong-wiki 記「J董怎麼運作公司」 |
| `jacky-wiki` | Jacky 個人知識 wiki | 上層——jdong-wiki 是 Jacky 公司面的知識，jacky-wiki 是人生面 |
| `wrap-up` | 對話結尾總結 | 互補——wrap-up 做摘要，/jdong-wiki sync 把摘要存進 wiki |
