---
title: 週期性任務自動化 — 簡報大綱
domain: education
updated: 2026-07-01
audience: 內部團隊
duration: 20 分鐘
source_chat: 2026-07-01 airun 每月自動月報實作
---

# 簡報大綱：週期性任務自動化

> 純文字大綱，每張一個 `## Slide`。要出 .pptx 就把本檔餵進 huashu-design。

## Slide 1：標題
- 週期性任務自動化——把「每月/每日自動出報告」做對
- 真案例：airun 每月 1 號自動營運月報
- 三個核心：排程放哪／90-9-1／密鑰活性探針

## Slide 2：問題場景
- 「幫我每月自動出一份營運盤點報告」
- 直覺：開個雲端排程叫 AI 生一份 → 兩個雷等著你
- 雷一：讀不到機密資料；雷二：AI 幻覺數字

## Slide 3：核心觀念一 — 先選對排程放哪
- 第一個決定不是「怎麼寫」，是「跑在哪」
- 判準一句話：**這任務要讀的資料在哪裡？**
- 公開 repo → 雲端；本機/機密/gitignore/本地 DB → 本機 systemd timer

## Slide 4：為什麼 airun 選本機
- 月報要讀 CRM `clients/**`（客戶機密，已 gitignore）
- 雲端 agent 只 checkout 得到追蹤檔 → 機密看不到 → 空殼報告
- 結論：吃本機/機密資料的報告，一律本機排程

## Slide 5：核心觀念二 — 90 / 9 / 1
- 90% 確定性程式：收數據，零 LLM、零幻覺
- 9% LLM：只在「合成策略/文字」這個分岔點
- 1% 人/對外：上傳、通知；碰錢與不可逆的留人點頭

## Slide 6：讓 AI 不生數字的關鍵手法
- 確定性層算好數字 → 組成「數據區塊」文字塞進 prompt
- prompt 明令：「數字只能用這裡的，禁杜撰任何金額/案號」
- LLM 只解讀與寫策略，不負責生數字

## Slide 7：實作四步
- 1. 確定性收集器（含 `--data-only` 乾跑閥）
- 2. 接 LLM 合成（try/catch，失敗 fallback 純數據版）
- 3. 對外動作（每步降級，紅線留人）
- 4. systemd user timer 排程

## Slide 8：timer 設定重點
- `.service`：`Type=oneshot` + 顯式 `Environment=PATH=...`
- `.timer`：`OnCalendar=*-*-01 01:00:00 UTC`（=台灣09:00）+ `Persistent=true`
- `enable --now` 後用 `list-timers` 驗 NEXT

## Slide 9：採坑點（上）
- 坑1 PATH 缺失 → ENOENT：service 顯式補 PATH
- 坑2 雲端讀不到機密 → 空殼：選型先問資料在哪
- 坑3 AI 幻覺數字：90/9/1 + prompt 鎖數字

## Slide 10：採坑點（下）— 最陰的一個
- 坑4 密鑰靜默失效：token 被撤 → 通知 401 → try/catch 吞掉 → 整條閘無聲斷
- 解法：密鑰裝**活性探針**（Telegram `getMe`），失敗走**另一條管道**告警
- 輪替密鑰後 `systemctl --user restart` 讓服務重讀 env
- 坑5 跨機不同步：排程檔不在 repo → 寫 install SOP

## Slide 11：快速回顧
- 資料在哪 → 決定雲端還本機（機密就本機）
- 報告拆 90/9/1 → AI 永不生數字
- 每把外部密鑰裝活性探針 → 通知閘不會靜默斷
- 加 `--data-only` 乾跑閥 → 隨時安心查數字

## Slide 12：延伸與連結
- AI 作業系統觀 / 自我進化規則 loop / claude-code 工具頁
- 腳本範例：jdong-company scripts/monthly-ops-report.mjs
