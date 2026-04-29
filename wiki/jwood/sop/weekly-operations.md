---
title: Jwood 週排程 SOP
domain: jwood
updated: 2026-04-29
---

# Jwood 週排程 SOP

> 每週兩個自動觸發點：**週一早上 09:00 產出本週腳本** + **週五下午 15:00 規劃下週**。
> 來源：`OneDrive/Jwood/CLAUDE.md`、`crontab.txt`、`run_weekly.sh`

---

## 排程總覽

| 時間 | 任務 | 觸發的 Agent |
|---|---|---|
| 週一 09:00 | 生成本週影片腳本 + SEO 套件 | ScriptWriter + SEOOptimizer + ThumbnailCopywriter |
| 週五 15:00 | 規劃下週內容日曆 + 銷售文案 | ContentStrategist + SalesCopywriter + AdCopywriter |

> 兩個觸發點之間，創辦人負責**拍片 + 上傳 + 客戶溝通**。

---

## 啟用排程

### 一次性安裝（首次設定）

```bash
# 1. 設定 API key
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > ~/claude/projects/Jwood/.env

# 2. 首次設定（跑一次就好）
cd ~/claude/projects/Jwood && ./run_weekly.sh setup

# 3. 啟用每週自動排程
crontab ~/claude/projects/Jwood/crontab.txt
```

### 排程 log

```
output/reports/cron.log
```

---

## 手動觸發（不等排程）

```bash
# 週一腳本（生成本週腳本 + SEO + 縮圖）
node --env-file=.env --experimental-strip-types src/scheduler.ts --force monday

# 週五企劃（規劃下週日曆 + 銷售文案）
node --env-file=.env --experimental-strip-types src/scheduler.ts --force friday
```

---

## 週一 09:00 自動產出（給創辦人）

### 產出物

| 檔案 | 用途 |
|---|---|
| `output/scripts/script_video{XX}_FOR_SHOOTING.txt` | **拍片腳本**（含 7 個場景配音稿） |
| `output/seo/series_*_ep{XX}.json` | **YouTube SEO 文案**（標題／描述／標籤） |
| `output/thumbnails/series_*_ep{XX}.png` | **縮圖**（1280×720） |

### 創辦人本週的事

```
週一上午：拿到腳本 → 排拍攝時段
週二-週四：拍片
週四晚-週五：剪片 + 上傳 YouTube
       ├─ 標題／描述／標籤：直接複製 SEO JSON 的內容
       └─ 縮圖：直接上傳 output/thumbnails/ 的 PNG
```

---

## 週五 15:00 自動產出（規劃下週）

### 產出物

| 檔案 | 用途 |
|---|---|
| `output/scripts/content_calendar_2026_{MM}.json` | **下週／下月內容日曆**（影片題目） |
| `output/reports/sales_copy_*.json` | **銷售文案更新**（隨內容調整） |
| FB/IG 廣告文案（A/B 版本） | 配合本週上線影片做廣告 |

### 創辦人本週末的事

```
週五下午：拿到下週日曆 → 對照拍攝行程
       ├─ 確認下週題目可拍（要去外景？需要道具？）
       └─ 微調 / 確認後不變動
```

---

## 月初／月末特殊任務

### 月初（每月 1 日）

```bash
npm run analyse    # PerformanceAnalyst 分析上月數據
                   # → 產出：哪個系列效果最好、哪些題目該加碼
```

### 月末

```bash
npm run director   # Director 產月度策略簡報
                   # → 下月 KPI、預算分配、Series 比重調整
```

---

## 阻擋情況的處理

| 狀況 | 動作 |
|---|---|
| `.env` 沒設好 → API call 失敗 | 排程 cron 會 log 錯誤；手動補設後 `--force monday` |
| 售價未填 → 廣告 ROAS 算錯 | 編輯 `data/products/green_sandalwood/green_sandalwood_stick.json` `pricing.price_twd` |
| Node 版本太舊 → `--experimental-strip-types` 不支援 | 升級 Node v24（建議）或 v22.22.2 也可 |
| 影片生產失敗（ffmpeg / Pillow 問題） | 手動跑 `python3 src/video/producer.py` 看錯誤訊息 |

---

## 創辦人在自動化下的角色

每週只需做 3 件事：

1. **拍片** — 腳本週一早上自動到 `output/scripts/`
2. **上傳影片** — SEO 設定自動在 `output/seo/`
3. **看 LINE 客詢** — 關鍵字自動回覆，**只處理要下單的訊息**

> 其他（內容企劃、文案、SEO、廣告、留言、FAQ）全部 Agent 處理。

---

## LINE OA 設定（一次性）

> 來源：`output/reports/sales_copy_lineOAKit.json`

| 欄位 | LINE OA 後台設定位置 |
|---|---|
| `welcomeMessage` | 「加入好友的問候語」 |
| `keywordTriggers`（陣列） | 「自動回應訊息」逐條設定 |

> 設定完後，創辦人只處理「要下單」「要客製」「投訴」這 3 類訊息，其他自動處理。

---

## 商品頁設定（一次性）

> 來源：`output/reports/productPage_READY_TO_USE.txt`

→ 直接複製貼上到 jwood.tw，**修改售價欄位**（必須先填 `green_sandalwood_stick.json`）。

---

## 相關連結

- Agent 團隊細節 → [../concepts/agent-team.md](../concepts/agent-team.md)
- 4 系列影片策略 → [../concepts/content-strategy.md](../concepts/content-strategy.md)
- 待辦狀態（含阻擋點）→ [../todolist.md](../todolist.md)
