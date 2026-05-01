---
session_date: 2026-05-02
session_topic: 在 jacky-wiki 新建第 6 個內容域 ailab（AI 實踐）並建立跨模型實踐捕手協定 + Mode A/B 雙模式
model: claude-opus-4.7
context: jacky-wiki ingest
duration: ~3h
type: session-summary
tags: wiki, ailab, capture-protocol, skill-design, mode-a, mode-b
---

## 最終做法（What Worked）

- **規劃 → 拍板 → 執行三段式**：先列 4 個 Wave + 6 個拍板項，集中問 Jacky 一次，拍板後一次到位執行（不分批中斷主對話）
- **協定 + Skill「雙生」設計**：協定（markdown）放 wiki 模型無關；Skill（Claude Code）自動讀協定 → 任何模型都能用，且未來換工具能搬遷
- **inbox 雙路徑**：`wiki/ailab/inbox/`（Claude Code 內 capture）+ `OneDrive/ailab-inbox/`（跨模型／手機跨對話）→ `/ailab sync` 把 OneDrive 同步進 wiki
- **依事件升格、無時間門檻**：不用機械化 30 天 / 3 個月閘門，由事件成熟度判斷（呼應 Jacky 反機械化偏好）
- **Mode A + Mode B 雙模式**（v1.1 補強）：單一事件用 Mode A 9 欄位；對話結尾／中間斷點用 Mode B 5 區塊，保留「最終做法／繞路／錯誤」對照脈絡
- **跨域連結 5 條**：jlife/AI與博士、shuangyun/AGENTS、nchu/AI重組學術根基、jwood、cross-domain 各加一段反向連結

## 繞路紀錄（Detours）

- **Bash tool 在 Windows 路徑解析有 bug**：傳含反斜線 `C:\Users\...` 路徑的 `cd` 命令時被吞掉反斜線變成 `C:Usersgjj22...`。改用 PowerShell tool + 雙引號絕對路徑就過。**踩過一次直接記住**。
- **30 天 / 3 個月時間門檻**：第一版規劃寫了「30 天無更新關檔／3 個月穩定升格」的機械化時間閘門。Jacky 拍板「無時間門檻、依事件升格」——這個改動不只是表面文字，是核心節奏觀的修正。
- **stash pop 撞 conflict**：rebase 完 stash pop 兩個檔（log.md + wiki主索引.md）conflict。手動解 conflict marker（保留兩段、修頁數）比硬 rebase 快——因為兩段是不同章節、結構獨立，不是真內容衝突。

## 錯誤與失敗（What Failed）

- **域名「AI 學習路徑」**（Jacky 原始問句的字眼）：第一版規劃直接沿用，會把這個域變成「日記／時間軸」性質，跟 jlife 撞。Jacky 隱性訂正成「AI 實踐」——強調動手結晶層而非歷程。**啟示：使用者的字眼是觸發器，不是命名拍板**。
- **wiki 主索引頁數誤算**：第一次寫「目前頁面數：92」實際是 93（16 ailab + 77 既有）。後來 rebase 完發現 upstream 還加了 1 頁（多品牌獨立應用架構），改成 94。**啟示：頁數不要憑記憶寫，每次都要 ground truth check**。
- **協定 v1.0 漏「對話結尾總結」場景**：v1.0 只設計了 Mode A 單一事件，Jacky 對話結束時才問「對話結尾／中間斷點怎麼記」。**啟示：協定設計 v1.0 之前該想完使用情境**。已用 v1.1 補 Mode B 解決。

## 升格候選

- ⭐ **Mode A + Mode B 兩種捕捉模式** → 已升格到 `wiki/ailab/concepts/實踐捕手協定.md` v1.1（已動手）
- 🟡 **Skill + 協定雙生**（協定 markdown 模型無關 + Skill 自動讀協定）→ 升格 `ailab/concepts/AI工具觀.md` 「協作鏈完整 > 單點最強」段補例子
- 🟡 **Windows 上 Bash tool 路徑解析 bug** → `ailab/tools/claude-code.md` 雷區段補一條「Windows 路徑必用 PowerShell tool」
- 🟡 **stash pop conflict 手動解優於硬 rebase** → 候選 inbox 留紀錄，累積 ≥ 2 次再升 patterns/
- ❌ 「使用者字眼是觸發器、不是命名」→ 候選反思層，不適合升 ailab，留 inbox

## 待延伸（Next）

- [ ] OneDrive `ailab-inbox/` 資料夾首次使用時建立（候 Jacky 第一次跨模型 capture 時觸發）
- [ ] EXP-2026-Q2-04 Claude Code Hook：對話結束自動 `/ailab session` 提示
- [ ] 觀察 1 個月後 Mode A vs Mode B 比例，調整協定權重（如 Mode B 比 Mode A 多很多 → 表示「對話結尾」是主場景，可考慮把 Mode B 設成預設）
- [ ] 開始累積真實 Mode B 事件（本檔是元範例不算）
- [ ] 考慮 v1.2 候選：加 `cost` / `time-spent` / `replicable` 欄位（30+ 事件後再決定）
