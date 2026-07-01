---
title: 週期性任務自動化——把「每月/每日自動出報告」做對
domain: education
updated: 2026-07-01
audience: 內部團隊
prerequisite: 會用終端機、看得懂 shell 與基本 Node/Python；知道 git 是什麼
duration: 20 分鐘
tags: 自動化, systemd-timer, cron, 90/9/1, AI, 排程, 採坑點
source_chat: 2026-07-01 為 airun.tw 建「每月 1 號自動營運月報」的實作對話
---

# 週期性任務自動化——把「每月/每日自動出報告」做對

> 這份教材教你把「每月/每日自動生成一份報告」這類**週期性任務**做到可靠。
> 主線是一個真案例：airun 每月 1 號自動產出營運盤點月報。
> 三個核心觀念：**選對排程位置（雲 vs 本機）／把任務拆成 90-9-1／給密鑰裝活性探針**。

---

## 學習目標

1. 能判斷一個週期性任務該放**雲端 routine** 還是**本機 systemd timer**。
2. 會用 **90/9/1** 拆分報告類任務，讓 AI 只做該做的那一段、不幻覺數字。
3. 知道自動化最常見的三個坑（PATH、密鑰靜默失效、幻覺數字）怎麼避。

---

## 先備知識

- 會用終端機、`systemctl --user`、基本 shell。
- 看得懂 Node 或 Python 小腳本。
- 知道什麼是 git、gitignore。

---

## 核心觀念一：先選對「排程放哪裡」

週期性任務第一個決定不是「怎麼寫」，是「**跑在哪**」。判準只有一句話：

> **這個任務要讀的資料，在哪裡？**

| 資料在哪 | 用什麼 | 為什麼 |
|---|---|---|
| 純公開 git repo，無機密 | 雲端 routine（cloud agent / GitHub Action） | 免顧機器、隨時可跑 |
| **本機檔案 / gitignored 機密 / 本地 DB / daemon 產物** | **本機 systemd timer** | 雲端 checkout **讀不到**這些 |

### 真案例的抉擇
airun 月報要讀 CRM 真相 `clients/**` 的 case.json——但那是**客戶機密，被 gitignore**。
若排在雲端，cloud agent 只 checkout 得到 git 追蹤的檔，`clients/**` 根本看不到 → 報告會是空殼。
→ **結論：吃本機/機密資料的報告，一律本機排程。** 一開始差點用雲端 routine，是這條判準把它擋回來。

---

## 核心觀念二：把任務拆成 90 / 9 / 1

報告類任務最忌「整包丟給 AI 生」——它會**幻覺金額、案號、日期**。正確拆法：

```
90% 確定性程式  →  收數據。腳本讀檔算統計，零 LLM、零幻覺。
 9% LLM         →  只做「合成策略/文字」這一個分岔點，且數字只能引用上一層算好的。
 1% 人 / 對外    →  上傳、通知；不可逆或碰錢的（報價/寄出）留給人點頭。
```

**關鍵手法**：把確定性算好的數字組成一段「數據區塊」文字，塞進給 LLM 的 prompt，並在 prompt 裡**明令「數字只能用這裡的，禁止杜撰任何金額或案號」**。LLM 只負責解讀與寫策略，不負責生數字。

> 延伸閱讀：[AI 作業系統觀](../../ailab/concepts/AI作業系統觀.md)、[自我進化規則 loop](../../ailab/patterns/自我進化規則loop.md)（同樣是「確定性骨架 + LLM 只在分岔點」的思路）。

---

## 步驟：從零建一個「每月 1 號自動報告」

### 步驟 1：寫確定性收集器（零 LLM）

用 Node（零依賴）或 Python 寫一支腳本，讀真相源、算統計、輸出一段純文字「數據區塊」。

- 接受一個 `YYYY-MM` 參數，**預設＝上個月**。
- 加一個 `--data-only` 旗標：只印數據、不呼叫 LLM、不 commit。**這是你的安全乾跑閥**，隨時能查數字而不觸發任何副作用。

**預期結果**：`node report.mjs 2026-06 --data-only` 印出當月統計，不動任何東西。

### 步驟 2：接 LLM 合成（唯一的 9%）

```js
import { execFileSync } from "node:child_process";
const body = execFileSync("claude",
  ["-p", prompt, "--model", "claude-sonnet-4-6"],
  { encoding: "utf8", maxBuffer: 8<<20, timeout: 300000 });
```

- prompt 內灌入：角色與原則、**步驟 1 的數據區塊**、上一期報告（給連續性）、固定的輸出結構。
- 明令「數字只能用數據區塊、禁杜撰」。
- **包 try/catch**：LLM 失敗就 fallback 寫「純數據版 + 待人工補策略」，絕不讓整條掛掉。

**預期結果**：產出一份含分析與策略的 Markdown，數字全部可追回步驟 1。

### 步驟 3：對外動作（1%，每步降級）

依序 `git commit + push` → 上傳雲端硬碟 → 送通知（Telegram/Slack/Email）。
**每步各自 try/catch**：上傳失敗不該擋掉通知；報價/寄信這種不可逆動作**不進自動層**，留給人。

### 步驟 4：用 systemd user timer 排程

建兩個檔（照抄專案裡既有 timer 範式最省事）：

`~/.config/systemd/user/<name>.service`
```ini
[Service]
Type=oneshot
WorkingDirectory=/path/to/project
Environment=PATH=/home/you/.node/bin:/home/you/.local/bin:/usr/bin:/bin
ExecStart=/home/you/.node/bin/node /path/to/report.mjs
StandardOutput=append:/path/to/logs/report.log
StandardError=append:/path/to/logs/report.log
```

`~/.config/systemd/user/<name>.timer`
```ini
[Timer]
OnCalendar=*-*-01 01:00:00 UTC
Persistent=true
Unit=<name>.service

[Install]
WantedBy=timers.target
```

啟用與驗證：
```bash
systemctl --user daemon-reload
systemctl --user enable --now <name>.timer
systemctl --user list-timers <name>.timer   # 看 NEXT 是否正確
```

- `OnCalendar=*-*-01 01:00:00 UTC` = 每月 1 號 UTC 01:00 = **台灣 09:00**（時區換算務必自己算一次）。
- `Persistent=true`：機器關機錯過了，開機會補跑。
- `Type=oneshot`：跑完就結束，不是常駐服務。

**預期結果**：`list-timers` 顯示下一次觸發時間；到點自動跑完整條。

---

## 採坑點（最珍貴，逐一避開）

### 坑 1：systemd 找不到 node/claude/gog（`ENOENT`）
- **原因**：systemd user service 的 PATH 極簡，沒有你登入 shell 的那串 PATH。
- **解法**：在 `.service` 裡顯式 `Environment=PATH=...` 把 node、`~/.local/bin`（gog 等 CLI）加進去；或全部用絕對路徑呼叫。

### 坑 2：雲端排程讀不到機密資料，產出空殼
- **原因**：cloud agent 只有 git 追蹤的檔，gitignored 的 `clients/**`、本地 DB、local env 一律看不到。
- **解法**：吃本機/機密資料的任務用**本機 timer**。選型時先問「資料在哪」。

### 坑 3：AI 幻覺金額/案號
- **原因**：把整包丟 LLM 生，它會編數字。
- **解法**：90/9/1。數字鎖死在確定性層，prompt 明令「只能用給定數據、禁杜撰」。

### 坑 4：依賴外部密鑰的自動化「靜默失效」
- **症狀**：某天起通知都沒收到，但沒有人報錯——通知那步 try/catch 吞掉了失敗。
- **真實原因**：Telegram bot token 被撤銷/輪替，`sendMessage` 回 401，整條點頭閘無聲斷掉。連每天的 morning brief 服務都 exit 1 沒人發現。
- **解法**：**給密鑰裝活性探針**。開機/每日跑一次輕量健康檢查（Telegram 用 `getMe`、其他 API 用最便宜的 whoami/ping），失敗就用**另一條管道**告警（別用剛好壞掉的那條通知自己）。輪替密鑰後記得 `systemctl --user restart` 讓常駐服務重讀 env。

### 坑 5：跨機器設定不同步
- **原因**：timer/service 檔在 `~/.config/systemd/user/`，不在 repo 裡，換機器就沒了。
- **解法**：把安裝步驟寫成 SOP 或 install 腳本；腳本本體進 repo，排程檔的內容也貼進 repo 的 README 備查。

---

## 延伸閱讀

- [AI 作業系統觀](../../ailab/concepts/AI作業系統觀.md)——為什麼「確定性骨架 + LLM 分岔點」是主結構。
- [自我進化規則 loop](../../ailab/patterns/自我進化規則loop.md)——同款自動化 loop 的另一個應用。
- [claude-code 工具頁](../../ailab/tools/claude-code.md)——`claude -p` headless 用法。
- ailab 原始事件：`ailab/inbox/2026-07-01-週期性自動化報告的正確架構.md`

---

## 快速回顧

週期性任務做對，記三句話：**先問資料在哪來決定雲端還本機（機密就本機 timer）；把報告拆成 90 確定性收數據／9 LLM 合成／1 人與對外，讓 AI 永遠不生數字；給每把外部密鑰裝活性探針，別讓通知閘靜默斷掉。** 加一個 `--data-only` 乾跑閥，你隨時能安心查數字。
