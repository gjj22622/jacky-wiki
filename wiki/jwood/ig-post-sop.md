---
title: Jwood IG Post 每日生產 SOP
domain: jwood
tags: [jwood, instagram, ig, sop, ai-workflow]
updated: 2026-04-28
---

# IG Post 每日生產 SOP

---

## 每日流程

### 1. 決定主題
選定當日穴道或品牌主題，避免近期已發過的重複（參考 `output/IG/_generated_posts/`）。

近期已發（2026-04）：合谷穴、湧泉穴、內關穴、三陰交、足三里、風池穴

### 2. 生成封面圖

```bash
# 用 Claude Code skill（直接說「生圖：[描述]」）
# 或手動執行：

codex exec \
  -C ~/claude/projects/Jwood \
  --full-auto --skip-git-repo-check -s workspace-write \
  "Use the image generation tool to create: <英文描述>. Save as ./output/IG/YYYY-MM-DD_主題.png" \
  < /dev/null 2>&1

LATEST=$(find ~/.codex/generated_images -name "ig_*.png" \
  -printf "%T@ %p\n" | sort -n | tail -1 | cut -d' ' -f2-)
cp "$LATEST" ~/claude/projects/Jwood/output/IG/YYYY-MM-DD_主題.png
```

### 3. 生成文案

Claude Code 根據主題自動產出 8 張 carousel 文案 + caption + hashtag，存為：
- `output/IG/_generated_posts/ig_post_YYYY-MM-DD.json`
- `output/IG/_generated_posts/ig_post_YYYY-MM-DD.txt`

### 4. 上傳 Google Drive

```bash
rclone copyto \
  ~/claude/projects/Jwood/output/IG/YYYY-MM-DD_主題.png \
  "gdrive:jwood-ai-outputs/IG/YYYY-MM-DD_主題.png" --progress
```

### 5. 發布 Instagram
- 從 Drive 取得圖片下載到手機
- 從 `.txt` 複製 caption + hashtag
- 發布 carousel post

---

## 文案結構（8 張 Carousel）

| Slide | 角色 | 內容 |
|-------|------|------|
| 1 | 封面／勾引 | 痛點標題 + 穴道名稱副標 |
| 2 | 穴位知識 | 位置、所屬經脈、主治 |
| 3 | 找穴教學 | Step 1 — 定位方法 |
| 4 | 按摩手法 | Step 2 — 掌心雷示範 |
| 5 | 情境加深 | 木頭感官體驗、中醫原理 |
| 6 | 適用場景 | 三個日常場景（▸ 列點） |
| 7 | 工藝說明 | 品牌價值、工藝故事 |
| 8 | CTA | jwood.tw + 私訊 @TWJwood |

---

## 設計規範

| 元素 | 規格 |
|------|------|
| 底色 | `#F4EDE2`（Paper） |
| 主標 | `#1A1613`（Ink），Noto Serif TC |
| 穴位標示 | `#8A2A1F`（Urushi） |
| Footer | `#C9A77A`（Sandal） |
| 圖片尺寸 | 1080×1080（正方形） |

---

## 已發貼文記錄

| 日期 | 主題 | 封面圖路徑 |
|------|------|-----------|
| 2026-04-24 | 合谷穴 | `output/IG/2026-04-24_綠檀掌心雷合谷穴/` |
| 2026-04-24 | 湧泉穴（睡前版） | `output/IG/2026-04-24_綠檀掌心雷睡前湧泉穴/` |
| 2026-04-25 | 內關穴 v2 | `output/IG/2026-04-25_綠檀掌心雷內關穴_v2/` |
| 2026-04-27 | 湧泉穴 EP05 系列 | `output/IG/2026-04-27_SeriesA_EP05_湧泉穴/` |
| 2026-04-27 | 綠檀產品圖 | `output/IG/2026-04-27_green_sandalwood_product.png` |
| 2026-04-28 | 湧泉穴 v2 | `output/IG/2026-04-28_綠檀掌心雷睡前湧泉穴_v2/` |
| 2026-04-28 | 風池穴 | `output/IG/2026-04-28_fengchi_cover.png` |
