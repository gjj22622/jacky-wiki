---
title: Zeabur CLI 部署上線 — 從踩雷到教會另一台機器
domain: education
visibility: team
min_tier: L1
updated: 2026-06-22
audience: 內部團隊（會碰部署 / AI 工作流的人）
prerequisite: 知道 git、CLI、環境變數；用過一次 zeabur
duration: 15 分鐘
tags: Zeabur, 部署, CLI, 採坑點, 多機, AI大腦
source_chat: AI 大腦 8 位成員上線實戰——部署連環踩 3 雷、釐清後教會 Linux 機同樣會部署
---

# Zeabur CLI 部署上線 — 從踩雷到教會另一台機器

> 一個晚上的真實故事：把「双云 AI 大腦」開放給 8 位核心成員，**成員、key、環境變數全備好了，卻卡在最後一步部署整整一小時**。
> 這份 workshop 把那晚的 5 個雷 + 收束出的三條鐵則，整理成可分享、可複製的教材，**最後還教會了另一台 Linux 機器自己會部署**。

---

## 🎯 學習目標

1. 看懂 Zeabur CLI 部署最容易踩的 5 個雷（每個都附「怎麼診斷、怎麼解」）。
2. 記住三條黃金鐵則，之後部署任何 Zeabur 專案都不再卡。
3. 知道這套知識在 wiki 的三層分工（具體案例／通用方法論／對外教材），需要時查得到。

## 先備知識

知道什麼是 git、CLI、環境變數；用過一次 zeabur。不需要懂這個專案的程式碼。

---

## 背景：那晚發生什麼

要把 AI 大腦開給團隊，流程本來很單純：`manage.mjs add` 建 8 位成員 → `sync` 推上線 → 私訊發 key。前面全順，**卡在「推上線」**——新成員的 key 打 API 一直 `401`，舊 key 卻正常。查了一小時才發現：不是 key 錯、不是名冊錯，是**部署的方式踩了連環雷**。

---

## 五個雷（一句話版，完整見採坑點）

> 完整「症狀／誤區／真實原因／解法／預防」→ [Zeabur 部署採坑點](../../pitfalls/zeabur部署採坑點.md)

| # | 雷 | 一句話 |
|---|---|---|
| 1 | 從錯目錄 deploy → 404 | `zeabur deploy` 上傳**當前目錄**；從 `tools/members/` 跑等於把錯東西當服務上傳 |
| 2 | 改 env 後 `restart` 不生效 | 服務只在啟動讀 env；restart 用舊快照、redeploy 需 git 綁定 → **必須重新 deploy** |
| 3 | 上傳逾時當失敗 | `prepare upload deadline exceeded` 是網路 transient，**重試就過** |
| 4 | 名冊不在 git，多機分歧 | `members.json` 刻意 gitignored；指定一台當**「名冊真相機」**，其他機帶外取得 |
| 5 | 401 ≠ 404 別亂改 | 401＝沒 deploy 生效；帶對 key 卻 404＝上傳錯目錄；200+fulfilled:false＝沒命中(正常) |

---

## 三條黃金鐵則（帶走這個就夠）

1. **部署前先 `pwd`** — deploy 上傳當前目錄，一定先 `cd` 到 service 源碼夾（含 Dockerfile）再 deploy。
2. **改 env ＝ deploy，不是 restart** — restart 用舊快照不重載；改完變數必須重新 deploy 才生效。
3. **逾時 ＝ transient，重試就好** — 看到 `deadline exceeded` 先重試 2–3 次再懷疑設定。

> 外加兩條：名冊/憑證走帶外管道不走 git（多機真相機）· 驗證時 401≠404 別亂改。

---

## 驗收：怎麼確認成員真的能用

部署後用真 key 打 `POST /order`，看回傳碼：
- `200 + fulfilled:true` → 正常 ✓
- `401` → 名冊沒 deploy 生效（雷 #2）
- 帶對 key 卻 `404` → 上傳錯目錄（雷 #1）

實測 8 把 key 全綠、且 **L2 成員問 AGENTS® 核心被正確擋下（fulfilled:false）、L3 拿得到** → 層級隔離有效，團隊正式接入。

---

## 延伸：教會另一台機器自己會部署（已驗證）

這套方法不綁單一專案。我們把它**教給另一台 Linux 機的 Claude**，做法是「裝 plugin 取機制 + 讀 pattern 學雷區」兩層、**不重複造 skill**：

1. Linux Claude `/plugin` 裝 zeabur plugin（取得 `zeabur-deploy` 等整套部署 skill）。
2. `git pull` 後讀 [ailab/zeabur自動部署方法](../../../ailab/patterns/zeabur自動部署方法.md)（三鐵區 know-how）。
3. 之後說「部署 X」，它就用 plugin 跑機制 + 守三鐵則。

→ **Linux 環境已成功**：另一台機器照這套自己會部署了。多機紅線：名冊/憑證走帶外管道，指定一台真相機。

---

## 三層資產分工（需要時去哪查）

| 層 | 檔 | 什麼時候看 |
|---|---|---|
| **具體案例** | [`docs/ai-brain-部署操作手冊`](../../../../docs/ai-brain-部署操作手冊.md) | 「我要部署 AI 大腦這一個」（含實際 service/env ID）|
| **通用方法論** | [ailab/zeabur自動部署方法](../../../ailab/patterns/zeabur自動部署方法.md) | 「部署別的 Zeabur 專案」|
| **對外教材** | [pitfalls/zeabur部署採坑點](../../pitfalls/zeabur部署採坑點.md) | 「教別人 / 複習採坑」|

> docs 給具體 · ailab 給通用 · education 給傳承 — 三層搭起來，不重複造輪子。

---

## 快速回顧

部署卡住先別亂改：**先 `pwd`（雷1）、改 env 要 deploy 不是 restart（雷2）、逾時重試（雷3）、名冊走帶外（雷4）、401≠404（雷5）**。記住三鐵則，任何 Zeabur 專案都不再卡。

## 簡報

- [簡報大綱 8 張](slides-outline.md)
- 互動 deck（雙擊開、`→`翻頁、`F`全屏）：[index.html](index.html)

## 延伸閱讀

- 採坑完整版 → [pitfalls/zeabur部署採坑點](../../pitfalls/zeabur部署採坑點.md)
- 通用方法論 → [ailab/zeabur自動部署方法](../../../ailab/patterns/zeabur自動部署方法.md)
- AI 大腦操作手冊 → [`docs/ai-brain-部署操作手冊`](../../../../docs/ai-brain-部署操作手冊.md)
- 成員/金鑰治理 → [`docs/ai-brain-member-governance`](../../../../docs/ai-brain-member-governance.md)
