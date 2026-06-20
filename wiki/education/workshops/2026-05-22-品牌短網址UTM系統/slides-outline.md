---
title: 品牌短網址 + UTM 系統從零到上線 — 簡報大綱
domain: education
visibility: team
min_tier: L2
updated: 2026-05-22
audience: 內部團隊
duration: 30 分鐘（含 Q&A）
tags: 短網址, UTM, GA4, Node.js
source_chat: 2026-05-22 airun-site 短網址系統實作
---

# 簡報大綱（17 張）

## Slide 1：封面
- **品牌短網址 + UTM 系統**
- 從零到上線，30 分鐘
- AI Run 集團 · 内部訓練 · 2026-05-22

---

## Slide 2：你今天會帶走什麼
- 一套部署在自家 Domain 的短網址系統
- 每條連結自動附加 UTM（GA4 追蹤就通了）
- 管理者後台隨時換目標網址，slug 不變
- **不加任何 npm 依賴，不用學新框架**

---

## Slide 3：為什麼不用 Lihi.io？
- 月費 NT$199–499 vs 自建免費
- `lihi.cc/xxx` vs `yourbrand.tw/go/xxx` ← 品牌差距
- 資料在別人 DB vs 在自己的 links.json
- 建置時間：0 分鐘 vs 2 小時 ← 值得投資

---

## Slide 4：系統架構全覽（一張圖）
```
社群貼文 → yourbrand.tw/go/ig-527
    ↓
server.js 讀 links.json
    ↓
附加 UTM → 301 Redirect → 目標網址?utm_source=instagram&...
    ↓
GA4 自動看到 Session source/medium
```
- 三個元件：links.json / /go/:slug 路由 / /admin/links 後台

---

## Slide 5：UTM 是什麼？為什麼重要？
- GA4 看到的「流量來源」就是 UTM
- 沒有 UTM = GA4 看到 `direct / (none)`，不知道從哪來
- 有 UTM = 清楚看到 `instagram / social / origin-day-527`
- **短網址的工作：幫你自動把 UTM 貼上去**

---

## Slide 6：UTM 五個參數
| 參數 | 範例值 | 說明 |
|---|---|---|
| utm_source | instagram | 哪個平台 |
| utm_medium | social | 哪種媒介 |
| utm_campaign | origin-day-527 | 哪個活動 |
| utm_content | ig-post | 哪個素材（可選）|
| utm_term | （留空）| 只有付費搜尋才填 |

---

## Slide 7：Step 1 — links.json 設計
- JSON 格式，每個 key 就是一個 slug
- 必填：`url, utm_source, utm_medium, utm_campaign, hits, created_at`
- 選填：`utm_content, utm_term, note`
- Slug 命名規則：`{平台縮寫}-{活動縮寫}`（ig-527、fb-527）
- **最重要**：`url` 隨時可改，slug 不換

---

## Slide 8：Step 2 — 重新導向路由（核心）
```javascript
if (url.startsWith("/go/")) {
  const slug = url.slice(4).split("?")[0];
  const links = JSON.parse(fs.readFileSync("links.json", "utf8"));
  const entry = links[slug];
  if (entry) {
    entry.hits++;
    fs.writeFileSync("links.json", JSON.stringify(links, null, 2));
    const dest = new URL(entry.url);
    if (entry.utm_source) dest.searchParams.set("utm_source", entry.utm_source);
    // ... 其他 UTM 同樣做法
    res.writeHead(301, { Location: dest.toString(), "Cache-Control": "no-cache" });
    res.end();
  }
}
```
- 這 20 行就是整個系統最重要的部分

---

## Slide 9：Step 3 — CRUD API 四個 Endpoint
| Method | 路徑 | 做什麼 |
|---|---|---|
| GET | /api/links | 取得所有短網址 |
| POST | /api/links | 建立新短網址（帶 UTM）|
| PATCH | /api/links/:slug | 改目標網址或 UTM |
| DELETE | /api/links/:slug | 刪除 |
- 全部用 cookie 驗證（admin_tok）
- 409 = slug 已存在 → 用 PATCH 更新即可

---

## Slide 10：Step 4 — Admin UI
- 無需額外 HTML 檔，`linksAdminPage()` function 回傳 HTML 字串
- 功能：表格列出所有短網址 + hits + note
- 新增表單：UTM Builder（選平台 → 自動填 utm_source + medium）
- 編輯 modal：只改 URL，不改 slug
- **任何不會寫 code 的同事都能用**

---

## Slide 11：Step 5 — Zeabur 部署設定
- 環境變數 `ADMIN_TOKEN` 在 Zeabur 後台設定
- 永遠不寫在程式碼或 git 裡
- `server.js` 用 `process.env.ADMIN_TOKEN || "local-dev-only"`
- 單 Replica 部署（hits 計數安全的前提）

---

## Slide 12：Step 6 — 發行第一批短網址
- 活動前 1-2 天建好，不要等到活動當天
- 批次 curl 腳本 or Admin UI 手動建
- 建好後先自己點一次，確認 GA4 Realtime 有看到 utm_source
- 發布時複製短網址，**不要複製原始長網址**

---

## Slide 13：採坑 #1 — 301 被快取
- **症狀**：換了目標網址但舊訪客還是跳舊網址
- **解法**：加 `"Cache-Control": "no-cache"` ← 這行不能省
- **口訣**：短網址是活的，快取是死的

---

## Slide 14：採坑 #2 — ADMIN_TOKEN 洩漏
- **症狀**：GitHub 上搜到 admin_tok 明文
- **後果**：任何人都能刪改你的短網址
- **解法**：`.gitignore` 加 `.env`，Zeabur 設環境變數

---

## Slide 15：採坑 #3 — Slug 含空白
- **症狀**：`ig 527` 被編碼成 `ig%20527`，找不到
- **解法**：建立時驗證 `if (!/^[a-z0-9-]+$/.test(slug)) return 400`
- **慣例**：一律用小寫英數字 + 連字號

---

## Slide 16：完整驗收清單
- [ ] `yourbrand.tw/go/ig-527` → 正確跳轉
- [ ] 跳轉後 URL 含 `utm_source=instagram` 等 UTM 參數
- [ ] GA4 Realtime 看到正確 source/medium
- [ ] links.json 的 hits 有在遞增
- [ ] `/admin/links` 登入後看得到管理介面
- [ ] ADMIN_TOKEN 不在任何 git commit 中

---

## Slide 17：延伸 — 後續可以加什麼
- **QR Code 生成**：`/go/ig-527/qr` → 用 `qrcode` 套件（但要新增 npm 依賴）
- **GA4 Events API 對照**：短網址 hits 數 vs GA4 sessions 數，找差距
- **A/B Test**：同一個 slug，50/50 隨機跳到兩個不同 URL
- **過期時間**：`expires_at` 欄位，到期後 410 Gone
- **本 workshop 的 code**：全都在 `airun-site/server.js`（可直接參考）
