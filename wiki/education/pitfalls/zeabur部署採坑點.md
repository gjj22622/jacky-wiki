---
title: Zeabur CLI 部署 — 採坑點
domain: education
visibility: team
min_tier: L1
updated: 2026-06-22
audience: 內部團隊（會碰部署 / AI 工作流的人）
prerequisite: 知道什麼是 git、CLI、環境變數；用過一次 zeabur
duration: 10 分鐘
tags: Zeabur, 部署, CLI, 採坑點, env, 多機
source_chat: AI 大腦團隊上線實戰——8 位成員 onboarding 卡在部署，連環踩 3 個雷
---

# Zeabur CLI 部署 — 採坑點

> 反面教材，最珍貴。這 5 個雷全是「AI 大腦團隊上線」那晚踩出來的——成員、key、env 全備好了，卻卡在最後一步部署卡了一小時。
> 通用方法論（正面 SOP）→ [ailab/zeabur自動部署方法](../../ailab/patterns/zeabur自動部署方法.md)；具體專案操作 → [`docs/ai-brain-部署操作手冊`](../../../docs/ai-brain-部署操作手冊.md)。

---

## 採坑 #1：從錯的目錄 deploy，服務直接變 404

- **症狀**：`zeabur deploy` 回 `Service deployed successfully`，但帶正確憑證打 API 卻 **404**（連原本好的 endpoint 都不見了）。
- **誤區假設**：以為 `deploy` 認的是 `--service-id`，在哪個資料夾跑都一樣。
- **真實原因**：`zeabur deploy` 上傳的是**當前工作目錄（CWD）**。我從 `tools/members/`（只有一支 CLI）跑 deploy，等於把錯的內容當服務上傳，把好的服務蓋掉。
- **解法**：`cd` 到該 service 的**源碼目錄**（含 Dockerfile / package.json 那層）再 deploy。本例是 `services/fulfillment/`。
- **預防**：部署前一律先 `pwd` 確認；把「cd 對目錄 + deploy」封進腳本。
- **發生於**：2026-06-21 AI 大腦團隊上線。

## 採坑 #2：改了 env 變數，`restart` 不會生效

- **症狀**：用 CLI 更新環境變數（`variable update`）成功，`restart` 也成功，但服務行為沒變（新成員 key 還是 401）。
- **誤區假設**：以為「restart 一下就會重讀新環境變數」。
- **真實原因**：服務只在**啟動時**讀一次 env；Zeabur 的 `service restart` 用的是**舊部署的 env 快照**，不會載入剛改的變數。（`service redeploy` 又只給 git 綁定服務，本機上傳型會回 `CANNOT_REDEPLOY_INPLACE`。）
- **解法**：改完 env → 從源碼目錄跑一次成功的 **`deploy`**（重新上傳＝把新 env 烘進新部署）。
- **預防**：心法記成「**改 env＝要 deploy，不是 restart**」。
- **發生於**：同上（先以為是 key 錯，查了半天才發現是服務沒重載名冊）。

## 採坑 #3：把「上傳逾時」當成部署失敗

- **症狀**：deploy 卡在 `failed to prepare upload ... context deadline exceeded`，以為壞了，反覆改設定。
- **誤區假設**：逾時＝我哪裡設錯。
- **真實原因**：那是 Zeabur **上傳端的網路 transient**，跟你的設定無關。env 變數那步通常已成功，只是上傳沒過。
- **解法**：**直接重試**（多跑幾次）或換較穩網路。
- **預防**：看到 `deadline exceeded` 先重試 2-3 次再懷疑設定。
- **發生於**：同上（連續逾時數次，重試後就過）。

## 採坑 #4：名冊/憑證檔不在 git，多機會「各說各話」

- **症狀**：想在另一台機器（Linux）也能部署/改成員，但那台的名冊跟主機不一致。
- **誤區假設**：以為 `git pull` 會把一切同步過來。
- **真實原因**：名冊真相檔（`members.json`）與金鑰**刻意 gitignored**（不能進公開 repo）。它不會跟著 git 走，兩台各改就分歧。
- **解法**：**指定一台當「名冊真相機」**（本例＝Windows 主機）只在那台改成員；其他機要用時，經**安全管道**（OneDrive 加密／隨身碟／密訊，非 git）複製最新檔過去。
- **預防**：程式碼走 git；機密與狀態走帶外管道。明確誰是真相機。
- **發生於**：規劃「教 Linux 機部署」時釐清。

## 採坑 #5：驗證時別把 401 跟 404 混為一談

- **症狀**：部署後打 API 失敗，分不清是「沒生效」還是「部署壞了」。
- **真實原因 / 判讀**：
  - **401**（帶 key 卻 unauthorized）→ 名冊/env 沒 deploy 生效（採坑 #2）。
  - **帶對 key 卻 404** → 上傳錯目錄、服務壞了（採坑 #1）。
  - **200 + fulfilled:false** → 認證 OK，只是這題沒命中內容（不是錯）。
- **解法**：用上面三態快速定位問題層級，別亂改。
- **預防**：剛 deploy 完服務會重啟數十秒，期間短暫 4xx 正常——用 `curl --retry 10 --retry-delay 6 --retry-all-errors` 等就緒，**別用 shell sleep**（環境會擋）。
- **發生於**：8 把 key 驗證時，第一個請求暖機 404、其餘 200，差點誤判。

---

## 一句話總結

> **部署前先 `pwd`（鐵則1）、改 env 要 deploy 不是 restart（鐵則2）、逾時就重試（鐵則3）、名冊走帶外不走 git（多機）、401≠404 別亂改（驗證）。**

## 延伸閱讀

- 通用部署方法論 → [ailab/patterns/zeabur自動部署方法](../../ailab/patterns/zeabur自動部署方法.md)
- AI 大腦專案操作手冊 → [`docs/ai-brain-部署操作手冊`](../../../docs/ai-brain-部署操作手冊.md)
- 換機/環境傳承 → [jos/作業系統索引](../../jos/作業系統索引.md)
