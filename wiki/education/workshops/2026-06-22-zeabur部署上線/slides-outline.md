---
title: Zeabur 部署上線 — 簡報大綱（8 張）
domain: education
updated: 2026-06-22
audience: 內部團隊
duration: 10 分鐘
---

# 簡報大綱 — Zeabur CLI 部署採坑點（8 張）

> 對應互動 deck：[index.html](index.html)。風格：工程深色底、紅=錯誤／綠=正確、monospace 指令。

## Slide 1 · 封面
- AI 大腦團隊上線那晚，踩的 5 個雷
- 副標：Zeabur CLI 部署採坑點 · 內部團隊 · 10 分鐘
- 鉤子：成員、key、env 全備好，卻卡在最後一步部署一小時

## Slide 2 · 雷 #1 從錯目錄 deploy → 404
- 症狀：deploy 回成功，但帶對 key 打 API 卻 404
- 誤區：以為 deploy 認 service-id，哪個目錄跑都一樣
- 真因：deploy 上傳「當前工作目錄」
- 解法：`cd services/fulfillment` 再 deploy
- 預防：部署前先 `pwd`

## Slide 3 · 雷 #2 改 env 後 restart 不生效
- 症狀：variable update + restart 都成功，新 key 仍 401
- 誤區：以為 restart 會重讀 env
- 真因：只在啟動讀 env；restart 用舊快照、redeploy 需 git 綁定
- 解法/預防：改 env ＝ 要 deploy，不是 restart

## Slide 4 · 雷 #3 上傳逾時當失敗
- 症狀：`prepare upload … context deadline exceeded`
- 誤區：逾時＝我設錯
- 真因：Zeabur 上傳端網路 transient
- 解法：直接重試 / 換網路
- 預防：先重試 2–3 次再懷疑設定

## Slide 5 · 雷 #4 名冊不在 git，多機分歧
- 症狀：另一台機器名冊跟主機不一致
- 誤區：以為 git pull 會同步一切
- 真因：members.json/金鑰刻意 gitignored
- 解法：指定一台「名冊真相機」，其他機帶外取得
- 預防：程式碼走 git、機密走帶外

## Slide 6 · 雷 #5 401 ≠ 404 別亂改
- 401 帶 key 卻 unauthorized → 名冊沒 deploy 生效（雷2）
- 帶對 key 卻 404 → 上傳錯目錄（雷1）
- 200 + fulfilled:false → 認證 OK，沒命中（正常）
- 200 + fulfilled:true → 正常 ✓
- 暖機：剛 deploy 完數十秒 4xx 正常，用 `curl --retry` 等，別 shell sleep

## Slide 7 · 三條黃金鐵則
- ① 部署前先 `pwd`（deploy 上傳當前目錄）
- ② 改 env ＝ deploy，不是 restart
- ③ 逾時 ＝ transient，重試就好
- 外加：名冊走帶外（多機真相機）· 驗證 401≠404

## Slide 8 · 三層資產分工
- docs/ai-brain-部署操作手冊 — 具體案例（實際 ID）
- ailab/patterns/zeabur自動部署方法 — 通用方法論
- education/pitfalls/zeabur部署採坑點 — 對外教材
- 結語：docs 給具體 · ailab 給通用 · education 給傳承
