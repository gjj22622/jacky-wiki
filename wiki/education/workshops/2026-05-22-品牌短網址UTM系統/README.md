---
title: 品牌短網址 + UTM 系統從零到上線
domain: education
visibility: team
min_tier: L1
updated: 2026-05-22
audience: 內部團隊（有基本 Node.js / Zeabur 操作能力）
prerequisite: 知道 server.js 是什麼、用過 Zeabur 部署、知道 GA4 是什麼
duration: 30 分鐘
tags: 短網址, UTM, GA4, Node.js, JSON, 行銷追蹤, Zeabur
source_chat: 2026-05-22 airun-site 短網址系統實作（參照 Lihi.io 功能子集）
---

# 品牌短網址 + UTM 系統從零到上線

> **你會帶走什麼**：一套部署在自家 Domain 的短網址系統，每條連結自動附加 UTM，點擊數即時統計，管理者可在後台隨時換目標網址——不換短網址、GA4 仍能追蹤。

---

## 學習目標

1. 理解短網址 + UTM 系統的架構（為什麼需要、怎麼動）
2. 用 **Node.js + links.json** 建立完整 CRUD 短網址系統（不加新 npm 依賴）
3. 部署到 Zeabur 後發出第一條有追蹤力的品牌短網址

---

## 先備知識

| 需要知道 | 不需要知道 |
|---|---|
| Node.js `http.createServer` 基礎 | 資料庫（SQLite / PostgreSQL）|
| JSON 格式（讀/寫） | Express / Fastify 等框架 |
| Zeabur 或任何 Node 部署平台 | React / Vue / 前端框架 |
| GA4 Property ID 在哪找 | GraphQL、WebSocket |

---

## 為什麼要自建？不用 Lihi.io？

| 比較面 | Lihi.io（外部服務）| 自建（本 workshop）|
|---|---|---|
| 費用 | 月費 NT$199-499 | 免費（Zeabur 已有）|
| 品牌 Domain | `lihi.cc/xxx` | `yourbrand.tw/go/xxx` ✅ |
| 資料主權 | 在 Lihi 的 DB | 在自己的 links.json ✅ |
| 客製 UTM | 有限制 | 完全自訂 ✅ |
| 建置時間 | 0 分鐘 | ~2 小時 |

> **結論**：如果已有 Node.js 網站部署在 Zeabur，自建成本幾乎是零，且品牌連結更有說服力。

---

## 系統架構圖

```
社群貼文 → airun.tw/go/ig-527
                   ↓
           server.js 讀 links.json
                   ↓
           附加 UTM 參數到目標網址
                   ↓
           301 Redirect → https://airun.tw/checkout?utm_source=instagram&...
                   ↓
           GA4 自動追蹤（Traffic Acquisition → Session source/medium）
```

**三個核心元件**：
1. `links.json` — 資料庫（slug → URL + UTM 設定）
2. `/go/:slug` 路由 — 讀庫、附 UTM、重新導向
3. `/admin/links` — 管理後台（CRUD）

---

## 步驟

### Step 1：設計 links.json 資料結構

**為什麼**：JSON 檔作為資料庫，無需新增 npm 依賴，Node.js 單執行緒下讀寫安全。

**建立檔案** `links.json`（放在專案根目錄）：

```json
{
  "ig-527": {
    "url": "https://yourbrand.tw/checkout",
    "utm_source": "instagram",
    "utm_medium": "social",
    "utm_campaign": "origin-day-527",
    "utm_content": "ig-post",
    "utm_term": "",
    "note": "5/27 IG 貼文 → 結帳頁",
    "created_at": "2026-05-22T00:00:00.000Z",
    "hits": 0
  }
}
```

**欄位說明**：

| 欄位 | 必填 | 說明 |
|---|:---:|---|
| `url` | ✅ | 目標網址（可隨時更換，slug 不變）|
| `utm_source` | ✅ | 流量來源（instagram / facebook / line）|
| `utm_medium` | ✅ | 媒介（social / email / referral）|
| `utm_campaign` | ✅ | 活動名稱（origin-day-527）|
| `utm_content` | ⭕ | 素材識別（多個版本才需要）|
| `utm_term` | ⭕ | 付費搜尋關鍵字（社群留空）|
| `note` | ⭕ | 人類備注，不影響跳轉 |
| `hits` | ✅ | 點擊計數（自動遞增）|

**預期結果**：根目錄出現 `links.json`，打開看到有效 JSON。

---

### Step 2：實作重新導向路由

**為什麼**：這是整個系統的核心——讀庫、附 UTM、301 跳轉，三件事一次完成。

在 `server.js` 的 request handler 中加入：

```javascript
if (url.startsWith("/go/")) {
  const slug = url.slice(4).split("?")[0];   // 取 slug，忽略查詢字串
  const linksPath = path.join(__dirname, "links.json");
  
  try {
    const links = JSON.parse(fs.readFileSync(linksPath, "utf8"));
    const entry = links[slug];
    
    if (entry && entry.url) {
      // 更新點擊計數
      entry.hits = (entry.hits || 0) + 1;
      entry.last_hit = new Date().toISOString();
      fs.writeFileSync(linksPath, JSON.stringify(links, null, 2));
      
      // 附加 UTM 到目標網址
      const dest = new URL(entry.url);
      if (entry.utm_source)   dest.searchParams.set("utm_source",   entry.utm_source);
      if (entry.utm_medium)   dest.searchParams.set("utm_medium",   entry.utm_medium);
      if (entry.utm_campaign) dest.searchParams.set("utm_campaign", entry.utm_campaign);
      if (entry.utm_content)  dest.searchParams.set("utm_content",  entry.utm_content);
      if (entry.utm_term)     dest.searchParams.set("utm_term",     entry.utm_term);
      
      // 301 重新導向（Cache-Control: no-cache 確保換網址後立即生效）
      res.writeHead(301, {
        Location: dest.toString(),
        "Cache-Control": "no-cache"
      });
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Short URL not found");
    }
  } catch (e) {
    res.writeHead(500);
    res.end("Redirect error");
  }
  return;
}
```

**放置位置**：在 `server.js` 的其他靜態路由**之前**（先比對 `/go/`，再比對 `/`）。

**預期結果**：瀏覽器打開 `localhost:3000/go/ig-527` → 跳轉到正確網址，URL 帶 UTM 參數。

---

### Step 3：實作 CRUD API

**為什麼**：Admin UI 需要讀取、新增、修改、刪除短網址，API 要先存在。

加入四個 endpoint（在 `/go/` 路由之後）：

```javascript
// Auth 輔助函數（放在 handler 外面）
function isAuthed(req) {
  const cookies = req.headers.cookie || "";
  const tok = cookies.split(";").find(c => c.trim().startsWith("admin_tok="));
  return tok && tok.split("=")[1].trim() === (process.env.ADMIN_TOKEN || "airun-admin-2026");
}

function readLinks() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "links.json"), "utf8"));
}
function writeLinks(data) {
  fs.writeFileSync(path.join(__dirname, "links.json"), JSON.stringify(data, null, 2));
}

// GET /api/links — 取得所有短網址
if (url === "/api/links" && req.method === "GET") {
  if (!isAuthed(req)) { res.writeHead(401); res.end("Unauthorized"); return; }
  const links = readLinks();
  const arr = Object.entries(links).map(([slug, v]) => ({ slug, ...v }));
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(arr));
  return;
}

// POST /api/links — 新增短網址
if (url === "/api/links" && req.method === "POST") {
  if (!isAuthed(req)) { res.writeHead(401); res.end("Unauthorized"); return; }
  let body = "";
  req.on("data", c => body += c);
  req.on("end", () => {
    try {
      const d = JSON.parse(body);
      if (!d.slug || !d.url) { res.writeHead(400); res.end(JSON.stringify({ error: "slug and url required" })); return; }
      const links = readLinks();
      if (links[d.slug]) { res.writeHead(409); res.end(JSON.stringify({ error: "slug already exists" })); return; }
      links[d.slug] = {
        url: d.url,
        utm_source: d.utm_source || "",
        utm_medium: d.utm_medium || "",
        utm_campaign: d.utm_campaign || "",
        utm_content: d.utm_content || "",
        utm_term: d.utm_term || "",
        note: d.note || "",
        created_at: new Date().toISOString(),
        hits: 0
      };
      writeLinks(links);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ slug: d.slug, ...links[d.slug] }));
    } catch { res.writeHead(400); res.end(JSON.stringify({ error: "Invalid JSON" })); }
  });
  return;
}

// PATCH /api/links/:slug — 修改目標網址或 UTM（slug 不換）
if (url.startsWith("/api/links/") && req.method === "PATCH") {
  if (!isAuthed(req)) { res.writeHead(401); res.end("Unauthorized"); return; }
  const slug = url.slice(11);
  let body = "";
  req.on("data", c => body += c);
  req.on("end", () => {
    try {
      const d = JSON.parse(body);
      const links = readLinks();
      if (!links[slug]) { res.writeHead(404); res.end(JSON.stringify({ error: "slug not found" })); return; }
      Object.assign(links[slug], d);
      writeLinks(links);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ slug, ...links[slug] }));
    } catch { res.writeHead(400); res.end(JSON.stringify({ error: "Invalid JSON" })); }
  });
  return;
}

// DELETE /api/links/:slug — 刪除
if (url.startsWith("/api/links/") && req.method === "DELETE") {
  if (!isAuthed(req)) { res.writeHead(401); res.end("Unauthorized"); return; }
  const slug = url.slice(11);
  const links = readLinks();
  if (!links[slug]) { res.writeHead(404); res.end(JSON.stringify({ error: "slug not found" })); return; }
  delete links[slug];
  writeLinks(links);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ deleted: slug }));
  return;
}
```

**預期結果**：用 curl 測試 API 正常回應：

```bash
# 測試建立
curl -s -X POST http://localhost:3000/api/links \
  -b "admin_tok=airun-admin-2026" \
  -H "Content-Type: application/json" \
  -d '{"slug":"test-ig","url":"https://example.com","utm_source":"instagram","utm_medium":"social","utm_campaign":"test"}'

# 預期回應：{"slug":"test-ig","url":"https://example.com",...,"hits":0}
```

---

### Step 4：建立 Admin UI

**為什麼**：純 API 要用 curl 才能操作，Admin UI 讓非工程師團隊也能管理短網址。

在 server.js 加入 `/admin/links` 路由（需先有 `/admin` 登入系統，用 cookie 驗證）：

```javascript
if (url === "/admin/links") {
  if (!isAuthed(req)) {
    res.writeHead(302, { Location: "/admin" });
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache" });
  res.end(linksAdminPage());  // 見 Step 4b
  return;
}
```

**Admin UI 必備功能**：
- 表格列出所有短網址（slug / 目標網址 / UTM / hits / note / 建立時間）
- 新增表單（含 UTM Builder：輸入平台 → 自動填 utm_source + utm_medium）
- 點擊「編輯」開 modal → 修改目標網址（不改 slug）
- 點擊「刪除」確認後刪除

> **UI 實作技巧**：用 vanilla JS 直接操作 DOM，呼叫上面的 API。不需要 React。HTML 字串用 `linksAdminPage()` function 回傳，server.js 內完成，不需要額外 HTML 檔。

**預期結果**：瀏覽器打開 `/admin/links` 看到管理介面，可以新增一條測試短網址。

---

### Step 5：設定環境變數並部署

**為什麼**：ADMIN_TOKEN 不能寫死在程式碼裡，部署後要讓 Zeabur 注入。

**在 Zeabur 設定環境變數**：
```
ADMIN_TOKEN = 你自己設的密碼（英數字，建議 16 碼以上）
```

**驗證方式**：
```bash
# server.js 中讀取方式
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "local-dev-token";
```

**部署後驗收清單**：
- [ ] `yourbrand.tw/go/test-ig` 能正確跳轉並附帶 UTM
- [ ] links.json 的 `hits` 有在遞增
- [ ] `/admin/links` 登入後能看到管理介面
- [ ] ADMIN_TOKEN 沒有出現在任何 git commit 或 markdown

---

### Step 6：建立第一批短網址（活動發布前）

**命名規則**：`{平台縮寫}-{活動縮寫}`

| 短網址 | 平台 | utm_source |
|---|---|---|
| `ig-527` | Instagram | instagram |
| `fb-527` | Facebook | facebook |
| `line-527` | LINE | line |
| `thread-527` | Threads | threads |
| `checkout-ig` | IG → 結帳頁 | instagram |

**用 curl 批次建立**（或用 Admin UI 手動建）：

```bash
ADMIN_TOKEN="你的密碼"
BASE="https://yourbrand.tw"

for PLATFORM in ig fb line thread; do
  SOURCE=$(echo $PLATFORM | sed 's/ig/instagram/;s/fb/facebook/;s/thread/threads/')
  curl -s -X POST $BASE/api/links \
    -b "admin_tok=$ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"slug\":\"${PLATFORM}-527\",\"url\":\"${BASE}\",\"utm_source\":\"${SOURCE}\",\"utm_medium\":\"social\",\"utm_campaign\":\"origin-day-527\",\"note\":\"5/27 ${PLATFORM} 貼文\"}"
  echo ""
done
```

**預期結果**：4 條短網址建立完成，對應社群貼文貼上去，GA4 就能分辨哪個平台帶來的流量。

---

## 採坑點

### 坑 1：301 被瀏覽器快取，換了目標網址沒效

- **症狀**：PATCH 更新了 url，但舊訪客仍跳到舊網址
- **原因**：301 Permanent Redirect 被瀏覽器 aggressive cache
- **解法**：永遠加 `"Cache-Control": "no-cache"` header，或改用 302
- **預防**：如果這個短網址的目標可能會換，從一開始就設 302 + no-cache

### 坑 2：hits 計數在多 Replica 下不安全

- **症狀**：Zeabur 開了 2 個 replica，hits 計數偶爾跳號或不準
- **原因**：兩個 process 同時讀寫同一個 links.json，race condition
- **解法**：低流量（< 100 req/s）問題不大，可接受；高流量才換 Redis 或 SQLite
- **預防**：Zeabur 預設是單 replica，保持單 replica 就沒問題

### 坑 3：slug 含空白或特殊字元

- **症狀**：`/go/ig 527` 被 URL 解析成 `/go/ig%20527`，找不到
- **原因**：URL 空白被編碼
- **解法**：建立短網址時做 slug 驗證：只允許 `a-z0-9-`
- **預防**：API 加驗證 `if (!/^[a-z0-9-]+$/.test(d.slug)) return 400`

### 坑 4：目標網址本身已有 UTM 參數

- **症狀**：`https://example.com?utm_source=organic` 被覆蓋成 links.json 的 utm_source
- **原因**：`searchParams.set()` 會覆蓋既有值（這是我們要的行為）
- **說明**：短網址系統的 UTM 應該是權威來源，目標網址原本的 UTM 應該被覆蓋
- **預防**：如果目標網址有自己的 UTM 且不應被覆蓋，links.json 把對應 utm_* 欄位留空

### 坑 5：ADMIN_TOKEN 意外 commit 進 git

- **症狀**：GitHub 上找到 `admin_tok=xxxxx` 字串
- **原因**：直接寫死在 server.js 或 .env 被 commit
- **解法**：`.gitignore` 加 `.env`；server.js 只用 `process.env.ADMIN_TOKEN`
- **預防**：Zeabur 環境變數介面設定，程式碼裡只留 fallback（`|| "local-dev-only"`）

---

## 延伸閱讀

- [2026-05-22 session ailab inbox — GA4 重建 + 短網址系統實作](../../ailab/inbox/2026-05-22-session-airun-ga4-shorturl-utm.md)（採坑細節的原始版本）
- [UTM + 社群行銷知識庫](../../../../agents/personal-agent/team-knowledge/utm-social-marketing.md)（team-knowledge，681 行 UTM 設計規範）
- [GA4 設定知識庫](../../../../agents/personal-agent/team-knowledge/ga4-analytics.md)（team-knowledge，720 行 GA4 詳細設定）

---

## 快速回顧

短網址系統的核心只有**三件事**：① `links.json` 存 slug 到 URL+UTM 的映射；② `/go/:slug` 路由讀庫、附 UTM、301 跳轉、hits++；③ `/admin/links` 讓人管理這張表。所有複雜功能（Analytics、A/B Test、QR Code）都在這個基礎上擴充。最重要的設計決策是：**slug 永遠不換，只換目標網址**——這樣社群上已發出的連結永遠有效，這就是 Lihi.io 最值錢的那個設計。
