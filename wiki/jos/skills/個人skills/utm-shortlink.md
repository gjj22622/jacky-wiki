# /utm-shortlink — UTM 製造 + airun.tw 短網址發行

為 AI Run 集團建立帶 UTM 的短網址。觸發後全程引導，完成即輸出可用短網址。

> **知識庫**：`/home/jacky/agents/personal-agent/team-knowledge/utm-social-marketing.md`
> **API**：`https://airun.tw/api/links`（需 ADMIN_TOKEN）
> **後台**：`https://airun.tw/admin/links`

---

## 觸發後必做（嚴格依序）

### 1. 讀知識庫（不憑記憶）

讀 `/home/jacky/agents/personal-agent/team-knowledge/utm-social-marketing.md`，
取出「AI Run 集團專用命名規範」章節，作為本次參數決策依據。

### 2. 收集必要資訊（一次問完，不分多輪）

用 AskUserQuestion 問（最多 3 題合併）：

| 問題 | 選項範例 |
|------|---------|
| 目標網址是？ | 直接輸入 URL |
| 發布平台？ | Instagram / Facebook / LINE / Threads / YouTube / Email / 其他 |
| 這次活動名稱？ | origin-day-527 / mingcha-launch / academy-open / 自訂 |

若 Jacky 給的資訊已夠（例如直接說「IG 發布，連到 checkout，5/27 活動」），**跳過詢問，直接進 Step 3**。

### 3. 建議 UTM 參數（列出讓 Jacky 確認或直接採用）

依知識庫規範，自動推導：

```
utm_source   = instagram（依平台）
utm_medium   = social（依媒介）
utm_campaign = origin-day-527（依活動名）
utm_content  = [素材識別，若有多條連結才需要]
utm_term     = [付費搜尋才填，其他留空]
```

組出完整 UTM 網址：
```
https://airun.tw/checkout?utm_source=instagram&utm_medium=social&utm_campaign=origin-day-527
```

### 4. 建議 Slug

格式規則：`{平台縮寫}-{活動縮寫}`，例如：
- `ig-527`、`fb-527`、`line-527`
- `ig-academy`、`line-checkout`

若 Jacky 要多個平台版本，一次建出所有 slug。

### 5. 呼叫 API 發行短網址

用 Bash 工具發行，每個 slug 一條 curl：

```bash
ADMIN_TOKEN="${ADMIN_TOKEN:?去 Zeabur / .env 取 ADMIN_TOKEN，勿明文寫進檔案}"
curl -s -X POST https://airun.tw/api/links \
  -b "admin_tok=$ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "ig-527",
    "url": "https://airun.tw/checkout",
    "utm_source": "instagram",
    "utm_medium": "social",
    "utm_campaign": "origin-day-527",
    "utm_content": "ig-post",
    "note": "5/27 IG 結帳連結"
  }'
```

**若回傳 409**（slug 已存在）→ 自動改用 PATCH 更新目標網址：
```bash
curl -s -X PATCH https://airun.tw/api/links/ig-527 \
  -b "admin_tok=$ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "新網址", "utm_campaign": "新活動名"}'
```

### 6. 輸出結果

最後整理成表格給 Jacky：

```
✅ 短網址發行完成

| 短網址 | 目標 | 點擊追蹤 |
|--------|------|---------|
| airun.tw/go/ig-527   | checkout | utm_source=instagram |
| airun.tw/go/line-527 | checkout | utm_source=line      |

📋 GA4 追蹤：流量獲取 → 依 Session source/medium 查看
🔗 管理後台：airun.tw/admin/links（編輯/查看點擊數）
```

---

## 邊界情況

| 情況 | 處理 |
|------|------|
| Jacky 只說「幫我做一條 IG 的」 | 問目標網址 + 活動名，其他 UTM 自動推導 |
| 多平台同一活動 | 一次建出 ig/fb/line/thread 四條，slug 加平台後綴 |
| Slug 已存在 | 問是要更新目標網址還是換新 slug |
| 要修改已有的短網址 | 直接 PATCH，不用重建 |
| 不知道 ADMIN_TOKEN | 提示去 Zeabur 查 ADMIN_TOKEN 環境變數（勿明文） |
| Jacky 說「不用問了直接做」 | 依合理預設值自動執行，完成後列出結果 |

---

## 安全紅線

- ❌ 不把 ADMIN_TOKEN 明文寫進任何 commit 或 markdown
- ❌ 不刪除既有短網址（除非 Jacky 明確指示）
- ✅ 每次使用前讀知識庫，不憑記憶決定 UTM 參數
- ✅ 一次最多建 10 條短網址，超過先問 Jacky

> 📌 **本快照已脫敏**：原始執行版（`~/.claude/skills/utm-shortlink/SKILL.md`）的 ADMIN_TOKEN 用 `${ADMIN_TOKEN:-airun-admin-2026}` 內建預設值；jos 快照不存 token 值，改為強制從環境變數取。還原時若要保留預設值請自行加回（不建議）。
