---
name: daemon-status
description: 快速回報 personal-agent daemon 健康狀態：inbox 待處理數、最近 5 個任務結果、今日 AI 費用消耗、當前模型狀態。觸發：「daemon 狀態」「inbox 幾筆」「今天燒了多少錢」「agent 健康」「/daemon-status」
trigger: /daemon-status
---

讀以下來源並摘要，不要問 Jacky：

1. `ls /home/jacky/agents/personal-agent/inbox/ | wc -l` → inbox 待處理數
2. `ls -lt /home/jacky/agents/personal-agent/processed/ | head -6` → 最近完成任務
3. `tail -20 /home/jacky/agents/personal-agent/logs/ai-call-ledger.jsonl 2>/dev/null` → 今日費用（加總 cost 欄位）
4. `cat /home/jacky/agents/personal-agent/model-state.json 2>/dev/null` → 當前模型設定
5. `tail -5 /home/jacky/agents/personal-agent/logs/heartbeat.log 2>/dev/null` → daemon 心跳

輸出格式（固定）：
```
📥 Inbox：N 筆待處理
✅ 最近完成：
  - [時間] 任務名稱
  - ...（最多 5 筆）
💰 今日費用：$X.XX USD（N 次 AI 呼叫）
🤖 模型：claude-sonnet-4.6（或當前設定）
💓 Daemon：最後心跳 HH:MM
```
