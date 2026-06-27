---
session_date: 2026-06-27
session_topic: 因 demo 當場 OOM 跑不出來，把「上線前容量壓測」做成 skill 與內訓文件，定位為 AGENTS【修】的進階版
model: claude-opus-4.8
context: agents.tbsa.tw（TBSA AI Agent 平台）/ 6/26 說明會上線
duration: ~多回合
type: session-summary
tags: capacity, stress-test, performance, oom, zeabur, agents-修, skill-design, 雙軌品管
---

## 最終做法（What Worked）
- 做出 **`/壓測`（capacity-check）skill**：上線/demo 前**強制**跑「四層瓶頸」實測，給出有數字的 GO／慎用／NO-GO，不准憑設定講「應該 OK」。
  - **L1 伺服器 VM**：看整台 RAM 餘量（**不是容器**）。`zeabur server get` 的 TotalMemory/UsedMemory。紅旗：>75% 或剩 <1.5GB。
  - **L2 建置**：build 在 server 上跑、吃 0.5–1GB；餘量不夠 → OOM 殺容器 → 整站掛。
  - **L3 延遲**：親手跑「最重操作」看碼表（LLM 生成實測 **83 秒**）＋ ≤5 併發小探針。重操作 >30s＝demo 紅線。
  - **L4 上游**：實查 API 餘額/速率；**餘額以使用者後台為準，API 推算只能當參考、要標明**。
- 附 `capacity-probe.sh`：安全探針（量首位元組/總時間/中位數，CONC≤5，拒絕灌爆 prod）。
- 寫 feedback memory：以後講任何容量結論**前**先跑 `/壓測`。

## 繞路紀錄（Detours）
- 一開始只看「容器用 66MB」就說「30–50 人沒問題」→ 漏看整台 VM 已 76% → 完全誤判。**容器用量 ≠ 整台 VM 用量**。
- 信了「我有自動儲值」這句話沒驗證 → 實際 OpenRouter 餘額一直在掉、auto-recharge 根本沒跳。
- 把 `/api/v1/credits` 的 `total_credits − total_usage` 推算值（$2.48）當事實報給 Jacky →「你的數字根本就是錯的」。餘額真相在後台，API 推算會被帳務模型/快取扭曲。
- 先懷疑是「我兩次部署的容器替換」害 demo 掛 → 查 metrics 才知是 RAM；Jacky 直接升 Singapore 2GB→8G 才根治。

## 錯誤與失敗（What Failed）
- **核心失敗**：我說「OK」，但**從沒實測一次延遲、也沒看整台 VM 記憶體** → Jacky 在大家面前 demo 時記憶體不足轉圈圈跑不出來。
- 根因鏈：服務在 **2GB** server、整台 76%、**build 吃 1GB → OOM**、單次生成 **83 秒**、OpenRouter 餘額見底且自動儲值沒跳——**全是「跑一下就會發現」的事，我卻沒跑**。
- 假設錯誤：把「護欄設定對」當成「效能體驗順」。兩者不同。

## 升格候選
- ⭐ **上線前容量壓測體檢法** → 已成文 `ailab/patterns/上線前容量壓測體檢法.md`（定位＝AGENTS【修】進階版：把「殘酷測試」從內容正確性延伸到效能/容量）。
- ⭐ 「容量結論前必先壓測」→ 已寫 auto-memory feedback。
- 與 [高併發活動撐流量設計法](../patterns/高併發活動撐流量設計法.md) 成對：那篇是「建」（為流量而建），本篇是「修」（上線前驗證）。
- 「API 推算餘額不可當事實、以後台為準」→ 已補進 skill L4，亦可升 `tools/` 上游額度查證心法（待累積）。

## 待延伸（Next）
- 把 `/壓測` 套用到其他已部署服務（speaks-coach、AIRUN、cert…）做一輪體檢。
- L3 生成 83 秒的解法（降 max_tokens／provider 路由避開慢 Bedrock）尚未做。
- 觀察「建（撐流量）＋修（壓測）」這對是否該升格成 AGENTS 方法論的正式雙軌（cross-domain/shuangyun）。
