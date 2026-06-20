---
title: 作品域 — 寫作規範與金庫機制
domain: portfolio
updated: 2026-06-21
---

# 作品域 — 寫作規範與金庫機制

> 怎麼寫作品頁、金鑰怎麼存、隱私紅線在哪。`/作品` skill 依本規範運作。

---

## 🔒 金庫機制（最重要）

作品域把資訊拆成**兩半**：

| | 放哪 | 進 git？ | 內容 |
|---|---|---|---|
| **非機密** | `projects/<名稱>.md`（wiki 頁面）| ✅ 會 | 資料夾、repo、前端網址、admin 網址、DNS、**帳號名** |
| **機密** | `.vault/作品金鑰.local.json` | ❌ **絕不** | admin 密碼、token、API key、成員 key |

- `.vault/` 已加進 `.gitignore`（`wiki/portfolio/.vault/`）→ **永不被 commit、永不 push 到 GitHub**。
- 金庫是 JSON，以「專案名」為 key：
  ```json
  {
    "ai大腦": {
      "admin帳號": "jackyadmin",
      "admin密碼": "（機密）",
      "成員token範例": "（機密）",
      "備註": "本機 beta，未上雲"
    }
  }
  ```
- **示範時** `/作品 <名稱>` 把頁面（網址）+ 金庫（登入）接起來，一次給齊。

---

## 多機金庫怎麼同步

`.vault/` 不進 git，所以**不會跟著 git pull 過去**。各機自己維護：
- 手動把 `作品金鑰.local.json` 透過 OneDrive / 密碼管理器 / 加密隨身碟 搬到新機的 `wiki/portfolio/.vault/`。
- 或新機重新從各服務後台取得、用 `/作品 add` 重填。

> 這是刻意的設計：**機密用機密的管道走，絕不混進公開 git。**

---

## 作品頁規範

每頁 frontmatter：
```yaml
---
title: 專案名稱
domain: portfolio
status: active | beta | archived
deployed: YYYY-MM-DD   # 沒上線寫 —
---
```

頁面必含區塊：
1. **一句話定位**：這是什麼、給誰用。
2. **部署座標表**：資料夾路徑 / GitHub / Zeabur project / 前端網址 / admin 網址 / DNS。
3. **登入**：只寫「帳號 → 見金庫」，**密碼/token 永不寫頁面**。
4. **一鍵示範腳本**：要示範時開哪個網址、登入哪、展示什麼（給未來的自己照念）。
5. **相關連結**：連回部署 runbook、admin 規格書、相關 wiki 域。

---

## 隱私紅線（呼應 jacky-wiki CLAUDE.md）

- ❌ token / 密碼 / API key 任何值 → **永不寫進 `.md` 頁面**，只進金庫。
- ❌ 客戶真名 / 個資 → 去敏（用代號）。
- ✅ `/作品` skill 內建守門：偵測到要把機密寫進頁面就攔下，改寫金庫。

---

## 相關連結

- 作品總表 → [作品索引](作品索引.md)
- admin 後台設計法 → [ailab/admin-token-backend-規格書](../ailab/patterns/admin-token-backend-規格書.md)
- 隱私規範 → `../../CLAUDE.md`
