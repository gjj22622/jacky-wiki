---
title: SPEAKS Coach App（AI 口說評分 SaaS）
domain: portfolio
status: active
deployed: 生產環境上線
---

# SPEAKS Coach App（AI 口說評分 SaaS）

> SPEAKS® 方法論的 AI 口說教練 SaaS：錄音上傳 → 四維度評分 → 配額管理 → Admin 後台。生產環境運營中。
> SPEAKS 由 Jacky（TBSA 理事長）× 林依柔（Zoe）共創；方法論 → [tbsa/SPEAKS體系](../../tbsa/concepts/SPEAKS方法論總覽.md)。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\OneDrive\建立TBSA商務企劃口說知識體系\SPEAKS-Coach-App` |
| 前端網址 | https://speaks-coach.zeabur.app |
| 後端 API | https://speaks-coach-backend.zeabur.app |
| 使用手冊 | https://speaks-coach.zeabur.app/usage-guide.html |
| admin 網址 | 站內 Admin 後台（Token + Clerk 認證）|
| 技術 | Next.js 16 + FastAPI + PostgreSQL；評分引擎 Gemini 2.5 Flash + Claude Sonnet 雙引擎 |
| 部署平台 | Zeabur（東京 2C/2GB）|
| 狀態 | 🟢 active（生產環境）|

---

## 登入

- **Admin 後台**：Clerk 認證 / Token 登入 → 帳密見金庫（`speaks-coach` key）。
- 憑證：App `.env`（值不在 wiki）。

---

## 一鍵示範腳本

1. 開 https://speaks-coach.zeabur.app → 登入。
2. 上傳一段口說錄音 → 展示四維度 AI 評分（雙引擎）。
3. 展示配額管理 + Admin 後台。
4. （脈絡）背後是 SPEAKS 六步驟方法論（Scan-Purpose-Engineer-Arm-Kindle-Sharpen）。

---

## 相關連結

- 方法論 → [tbsa/SPEAKS方法論總覽](../../tbsa/concepts/SPEAKS方法論總覽.md)
- 同源 Skill：speaks-coach / speaks-knowledge（見作品索引 SPEAKS 家族）
- admin 後台設計 → [ailab/admin-token-backend-規格書](../../ailab/patterns/admin-token-backend-規格書.md)
- 作品總表 → [作品索引](../作品索引.md)
