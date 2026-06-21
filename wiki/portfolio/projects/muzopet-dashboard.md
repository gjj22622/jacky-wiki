---
title: muzopet 品牌數據看板（木酢寵物達人）
domain: portfolio
status: active
deployed: 上線中（v2.0）
---

# muzopet 品牌數據看板

> 客戶「木酢寵物達人」的品牌指揮中心 + AI 數據顧問平台：整合 GA4 即時看板 + Meta + 蝦皮數據，Token 認證 + AI Agent。已 v2.0 上線、每日自動快照。

---

## 部署座標

| 項目 | 值 |
|---|---|
| 資料夾 | `C:\Users\gjj22\Jdongcompany\clients\muzopet\dashboard` |
| GitHub | `gjj22622/muzopet_Agent` |
| 前端網址 | https://muzopet-dashboard.zeabur.app |
| admin 網址 | 同站（Token 認證進入）|
| 部署平台 | Zeabur（Node.js 24 ESM）|
| DNS | 無自有網域（用 zeabur.app）|
| Zeabur project/service | project `69fc8e2e15a34741e35316a7` / service `69fc8f0da96f65f4370dde13` |

---

## 登入

- **看板 Token 認證**：access token → 見金庫（`muzopet` key）。
- **GA4 服務帳號**：憑證檔在 `clients/muzopet/dashboard`，API 金鑰治理見 `Jdongcompany/sop/client-api-keys.md`。
- ⚠️ token / 服務帳號金鑰**值不寫本頁** —— 見金庫或該機憑證檔。

> 要登入資訊跑 `/作品 muzopet`。

---

## 一鍵示範腳本

1. 開 https://muzopet-dashboard.zeabur.app → 用 Token 進入。
2. 展示 GA4 即時看板 + Meta Ads + 蝦皮數據整合。
3. 展示 AI 數據顧問 Agent（對話式解讀數據）。
4. （脈絡）這是 [双云 AGENTS 方法論](../../shuangyun/cases/木酢寵物達人.md) 的客戶落地案例。

---

## 部署方式（速記）

```
git push → npx zeabur deploy --project-id 69fc8e2e15a34741e35316a7 --service-id 69fc8f0da96f65f4370dde13
```

---

## 相關連結

- 客戶案例 → [shuangyun/cases/木酢寵物達人](../../shuangyun/cases/木酢寵物達人.md)
- 同體系主站 → [AgentFlow（airun.tw）](agentflow-airun.md)
- admin 後台設計法 → [ailab/admin-token-backend-規格書](../../ailab/patterns/admin-token-backend-規格書.md)
- 作品總表 → [作品索引](../作品索引.md)
