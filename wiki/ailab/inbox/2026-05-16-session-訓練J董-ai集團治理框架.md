---
session_date: 2026-05-16
session_topic: 訓練J董：AI集團治理框架與SOSTAC分工實戰
model: claude-sonnet-4-6
context: AI Run 集團 / personal-agent / mingcha
duration: ~6h
type: session-summary
tags: SOSTAC, 集團治理, 轉移定價, 明察委託, J董管理學, zeabur, github-actions
---

## 最終做法（What Worked）

**1. J董不猜現況，一律委託明察**
- 發現 Jacky 在問「明察要怎麼打外商市場？」時，J董開始自行臆測市場資料
- Jacky 糾正：「你不是有明察？就應該讓明察來調查，不要在那邊猜。」
- 正確做法：寫正式委託書（INT-2026-001），含調查範圍、格式、截止，交給明察執行
- 執行結果：取得真實 FDI 數字（USD 11.25B）、競品真實定價（Euromonitor $350～F&S $8K）、確認藍海（無競爭者做英文台灣政府開放資料）

**2. AI Run 集團治理三鐵規**
- 內部轉移定價 30%：子服務互採購，委託方記費用、承接方記收入，財務要有真實數字
- SOSTAC S 階段一律委託明察：任何現況分析禁止猜測
- J董是客戶，不是執行者：把能力需求轉成委託書，不因「快」就自己做
- 落地：寫入 `jdong-wiki/ops/airun-group-principles.md` + 寫入全域記憶

**3. GitHub Actions 補上 Zeabur 自動部署**
- 問題：Zeabur GitHub App 有時不觸發（`gh api .../hooks` 回傳 `[]`）
- 解法 B：`.github/workflows/zeabur-deploy.yml` → `curl -X POST $ZEABUR_DEPLOY_HOOK`
- 分別部署到 mingcha / airun-site 兩個 repo，PR → main 後自動觸發

**4. Telegram 通知改為每日兩次**
- hourly-report.sh：`0 2,14 * * *`（早 10 / 晚 10 台灣時間）
- inspector-trigger.sh：原來 `30 */2 * * *`（每 2 小時）→ 改 `5 2,14 * * *`
- cost-alert.sh：只在費用跨門檻時才推，不動

## 繞路紀錄（Detours）

- **mingcha zeabur-deploy.yml 提交到錯誤分支**：原本在 `feat/INT-2026-001-foreign-market` 分支提交，應先合入 main 才有效。改法：checkout main → merge feature → push main。
- **airun.tw DNS ENOTFOUND**：GitHub Actions 跑 `curl airun.tw` 失敗，以為是 Cloudflare 問題。後來 Jacky 說 DNS 在 Cloudmax 管，且根網域 `@` 不支援，只有 `www.airun.tw` 有 A 記錄。改監控 URL 為 `www.airun.tw`。
- **J董做 SOSTAC S 時自己估算**：Jacky 第一反應是 J董在猜，需要明確被糾正「去開委託書給明察」才修正。若無糾正會繼續猜測下去。

## 錯誤與失敗（What Failed）

- **一開始假設明察只服務台灣上市公司**：Jacky 提出「外商也需要台灣市場情報」，打開新客群視野。這個盲點來自 J董沒主動做市場拓展思考，等 Jacky 提才反應。
- **子服務之間沒有財務往來機制**：之前集團內部服務「免費互用」，Jacky 要求建立真實的轉移定價才有財務意義。

## 升格候選

- **升 `patterns/SOSTAC-S-委託明察模式.md`**（已驗證）：每次做現況分析的標準 SOP，有 INT 委託書格式，可跨服務重用
- **升 `concepts/AI集團治理框架.md`**（已驗證）：三鐵規 + 轉移定價 30% + J董管理學，是 AI Run 的治理方法論
- **暫留 inbox**：Zeabur GitHub Actions 解法（工具性，特定平台，不夠通用）

## 待延伸（Next）

- 明察執行外商首份免費樣本報告（離岸風電政府採購）→ 試水溫
- 聯繫 AmCham / ECCT 第一步（W065 outreach plan 已備好）
- mingnow.airun.tw 需 Jacky 手動設 `ZEABUR_DEPLOY_HOOK` secret（mingcha & airun-site 兩個 repo）
- W053 J董形象影片：Jacky 需要自己去 autoip.app 操作
