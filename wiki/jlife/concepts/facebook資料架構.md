---
title: Facebook 資料架構（JSON 28,715 筆 events）
domain: jlife
updated: 2026-04-29
---

# Facebook 資料架構（JSON 28,715 筆 events）

> 自 2026-03-22 起，Facebook 資料**改為 JSON 匯出**作為主要來源，取代舊版 HTML。
> 主要檔案：`data/processed/facebook/facebook_events_json_v2.json`

---

## 資料來源

| 項目 | 說明 |
|---|---|
| **匯出檔案** | `facebook-gjj22622-2008-10-01-2026-3-21-0caAwkMT.zip` |
| **匯出格式** | JSON（Facebook 設定中選「JSON」格式下載） |
| **時間範圍** | 2008-10-01 ~ 2026-03-21（實際最早貼文 2008-11-25） |
| **解壓位置** | `data/facebook_exports/extracted/facebook-gjj22622-2008-10-01-2026-3-21-0caAwkMT/` |
| **處理後檔案** | `data/processed/facebook/facebook_events_json_v2.json` |
| **總 events 數** | **28,715 筆**（去重後） |
| **解析工具** | `tools/build_facebook_events_from_json.py` |

---

## JSON 版 vs HTML 版（資料量差異）

| 資料類型 | JSON v2 | 舊 HTML v1 | 差異 |
|---|:---:|:---:|---|
| 主貼文（your_posts） | 6,433 | 6,272 | +161 |
| **留言（comments）** | **9,925** | **無** | JSON 獨有 |
| **社團貼文（groups）** | 1,476 → 1,118（去重後） | **無** | JSON 獨有 |
| 相簿（albums） | 9,472 → 9,405（去重後） | ~7,000 | +2,400 |
| 未分類照片 | 1,056 | 906 | +150 |
| 影片 | 896 | 748 | +148 |
| **合計（去重後）** | **28,715** | 15,082 | **+13,633（+90%）** |

> **JSON 版的決定性優勢**：留言（9,925）+ 社團貼文（1,476）這兩塊在 HTML 匯出**完全沒有**。
> 留言是回憶錄重要的「**他人視角**」素材——你寫的貼文 vs 別人留下的回應。

---

## 6 種事件類型（event_type）

| 類型 | 說明 | 主要欄位 |
|---|---|---|
| `post` | 主貼文 | `text`、`attachments`、`tags`、`coordinates` |
| `comment` | 留言 | `text`、`comment_author` |
| `group_post` | 社團貼文 | `text`、社團 metadata |
| `album` | 相簿 | `name`、`photos: [{uri, creation_timestamp}]` |
| `photo` | 未分類照片 | `uri`、`creation_timestamp` |
| `video` | 影片 | `uri`、`creation_timestamp` |

> ⚠️ **album 結構與 posts 不同**：album JSON 是 `{name, photos: [{uri, creation_timestamp}]}`，**不是** `[{timestamp, data, attachments}]`。解析時用 `creation_timestamp` 而非 `timestamp`，用 `uri` 而非 `attachments.data.media.uri`。

---

## JSON v2 獨有欄位（向下相容）

舊欄位不變，新增以下：

| 欄位 | 型別 | 說明 |
|---|---|---|
| `event_type` | string | 6 種類型之一 |
| `tags` | `[{"name": "..."}]` | 被標記的朋友名單 |
| `coordinates` | `{"latitude": 25.0, "longitude": 121.5}` | 地點經緯度（**儀表板地圖用**） |
| `external_url` | string | 分享連結的 URL |
| `external_name` | string | 分享連結的標題 |
| `comment_author` | string | 留言者名稱（僅 `comment` 類型） |

> **`coordinates` 的價值**：JSON 直接提供結構化地點座標，**不再需要從 HTML 解析**。旅行儀表板的地圖功能因此大幅簡化。

---

## Encoding 修復規則（極重要）

> ⚠️ Facebook JSON 匯出有經典的 encoding 問題：**UTF-8 中文字被當 Latin-1 儲存**。直接讀會是亂碼。

### 修復方法

```python
def fix_fb_encoding(text: str) -> str:
    """text.encode('latin-1').decode('utf-8')"""
    return text.encode('latin-1').decode('utf-8')
```

> `build_facebook_events_from_json.py` 已內建 `fix_fb_encoding()` **遞迴修復函式**。
>
> **所有讀取 JSON 匯出的程式都必須加這個修復**——否則中文會是亂碼。

---

## serve.py 載入順序

`apps/reader/serve.py` 已更新：

```
優先載入：facebook_events_json_v2.json（28,715 筆）
找不到 → fallback：facebook_events_range_..._html_v1.json（15,082 筆）
```

`FB_EXTRACTED_DIRS` 也新增 JSON 匯出目錄，`/api/media/` 端點會**自動搜尋所有匯出目錄**。

---

## 媒體引用路徑

> 書稿（`.md`）中嵌入 Facebook 照片時，**必須使用 `/api/media/` 路徑**，不能用相對路徑。

### 正確寫法

```markdown
![圖片說明](/api/media/your_facebook_activity/posts/media/{相簿目錄}/{檔名}.jpg)
```

### 錯誤寫法（不要用）

```markdown
![圖片說明](../../../data/facebook_exports/extracted/.../...)
```

> **原因**：Facebook 匯出資料分散在 `_01` 和 `_02` 兩個目錄中，相對路徑無法確定檔案在哪一個目錄。`/api/media/` 端點會自動搜尋所有匯出目錄，保證能找到檔案。
>
> （2026-03-19 卷二照片無法顯示的根因。）

---

## 旅行儀表板與 JSON

舊：`extract_trip_posts.py` 從 Facebook **HTML** 匯出擷取貼文。

新方向：應改為讀取 JSON 匯出的 `your_posts__check_ins__photos_and_videos_1.json`，因為：

1. JSON 直接提供結構化地點座標（`coordinates`）
2. 不需要再從 HTML 解析（解析複雜、易錯）
3. 對齊主資料來源（28,715 筆 events 全部來自 JSON）

---

## 資料目錄完整對照

```
data/
├── facebook_exports/
│   ├── raw/                       ← 原始 zip 檔案
│   └── extracted/
│       ├── facebook-gjj22622-2008-10-01-2026-3-21-0caAwkMT/   ← ★ 主要資料來源（JSON）
│       ├── facebook-gjj22622-2006-3-9 - 2026-3-9_01/          ← 舊 HTML 匯出（備用）
│       └── facebook-gjj22622-2006-3-9 - 2026-3-9_02/          ← 舊 HTML 匯出（備用）
└── processed/
    └── facebook/
        ├── facebook_events_json_v2.json                        ← ★ 主要 events（28,715 筆）
        └── facebook_events_range_20060310_20260310_html_v1.json ← 舊 HTML 解析（fallback）
```

---

## 相關連結

- 書的結構（如何用這些 events 重組成卷／章） → [書的結構.md](書的結構.md)
- 旅行儀表板（如何把 events 視覺化） → [旅行儀表板系統.md](旅行儀表板系統.md)
- 書稿中的 fb:YYYY-MM-DD 標記規範 → [../sop/書稿編寫規範.md](../sop/書稿編寫規範.md)
