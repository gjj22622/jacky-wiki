---
title: Jwood 4 系列影片策略
domain: jwood
updated: 2026-04-29
---

# Jwood 4 系列影片策略

> **流量哲學**：用穴道教學帶 YouTube 流量，自然帶入綠檀按摩棒的銷售。**不是賣木工品，是賣「解決痠痛的工具」。**
> 來源：`OneDrive/Jwood/todolist.md`、`output/scripts/content_calendar_2026_05.json`

---

## 4 系列並行設計

| Series | 主題 | EP01 | 時長 | 流量 vs 信任 |
|:---:|---|---|:---:|---|
| **A** | 穴道按摩教學 | 合谷穴 | 4.7 分鐘 | **流量主軸**（搜尋量大、痛點明確） |
| **B** | 木藝知識 | 木頭含水率 | 5.1 分鐘 | 信任建立（產品差異化的科學基礎） |
| **C** | 選料眼光 | 選料眼光 | 3.0 分鐘 | 信任建立（工藝深度展示） |
| **D** | 創辦人故事 | 創辦人故事 | 6.8 分鐘 | 品牌認同（中年轉行 + 學術背景） |

> **為什麼 4 系列並行不是 1 系列做爛？**
>
> 不同主題對應不同的觀眾入口：搜尋「合谷穴」的人是痠痛者（Series A）；搜尋「綠檀」的人是收藏者（Series B/C）；看到「中興生科 → 木藝」的人是品牌粉（Series D）。並行讓 Jwood 同時抓 4 種流量。

---

## 4 系列 EP01 已完成資產（2026-04-24）

| 資產類別 | 路徑 | 規格 |
|---|---|---|
| 影片 | `output/video/series_{A/B/C/D}_ep01/final_video.mp4` | 1920×1080，3-7 分鐘 |
| YouTube 縮圖 | `output/thumbnails/series_{A/B/C/D}_ep01.png` | 1280×720（4 張） |
| IG 貼文 | `output/ig_posts/series_{A/B/C/D}_ep01.png` | 1080×1080（4 張） |
| SEO 文案包 | `output/seo/series_{A/B/C/D}_ep01.json` | 標題／描述／標籤 |

**快速重生成指令**

```bash
npm run thumbnails    # 重生 4 張縮圖
npm run ig            # 重生 4 張 IG 貼文
npm run seo_pack      # 重生 4 組 SEO 文案
```

---

## 5 月內容日曆（content_calendar_2026_05.json）

> Series A（穴道教學）為主軸，**8 支中 7 支是穴道題目**，第 8 支才做純產品介紹。

| 日期 | 主題 | 系列 |
|:---:|---|:---:|
| 5/5 | **肩頸痠痛救星**（第一支，最重要）| A |
| 5/7 | 頸椎僵硬落枕解法 | A |
| 5/12 | 失眠助眠穴道 | A |
| 5/14 | 頭痛不吃藥 | A |
| 5/19 | 久坐腰痠 4 穴道 | A |
| 5/21 | 背痛自救術 | A |
| 5/26 | 睡前全身排疲勞儀式 | A |
| 5/28 | **綠檀按摩棒完整介紹**（第 8 支才做純產品介紹）| 產品 |

> **設計邏輯**：先用 7 支教學內容建立「按穴道達人」的頻道印象，到第 8 支才賣產品——觀眾此時已經接受 Jwood 是「值得信任的穴道知識來源」，而不只是「想賣按摩棒的木工」。

---

## 第一支腳本（範本）

> **5/5 肩頸痠痛救星**：辦公室肩頸痠痛救星！3 個穴道按 2 分鐘，立刻見效

| 屬性 | 內容 |
|---|---|
| 標題 | 辦公室肩頸痠痛救星！3 個穴道按 2 分鐘，立刻見效 |
| 時長 | 約 5 分 45 秒 |
| 場景數 | 7 個 |
| 腳本檔 | `output/scripts/script_video01_FOR_SHOOTING.txt` |

---

## 影片生產流水線（Python）

> **不需要 API key**，純 Python 自動化。

```
scene_config.py（場景設定）
       ↓
frame_generator.py（Pillow 1920×1080 圖框）
       ↓
gTTS（zh-TW 配音）
       ↓
ffmpeg（libx264 + aac 合成）
       ↓
final_video.mp4
```

**指令**

```bash
python3 src/video/producer.py                    # 重新生成 video01
python3 src/video/producer_generic.py video02    # 任意 video_id
```

---

## Series 並行的擴充計畫

todolist 第四優先：**EP02 製作**

- 為 4 系列各寫 EP02 場景設定（`scene_config_{A/B/C/D}_ep02.py`）
- `npm run video_A`（改為 ep02 版本）
- `npm run thumbnails` 重生 EP02 縮圖

> EP02 將同步上 4 支，建立「Jwood 一週一系列各更新」的節奏。

---

## 流量 → 銷售的路徑

```
觀眾搜尋「合谷穴」「肩頸痠痛」→ 看到 Series A 影片
       ↓
影片中段提到「我用綠檀按摩棒按這裡，木頭的溫度比手指好」（自然植入）
       ↓
影片描述欄連結 jwood.tw 商品頁 + LINE OA
       ↓
觀眾點擊 → 看到 Landing Page（深褐金配色 + 創辦人故事 + 6 個賣點零件圖）
       ↓
LINE OA 加入 → 觸發歡迎訊息 + FAQ 自動回覆
       ↓
詢問購買 → CustomerService Agent 處理 / 創辦人接手
       ↓
成交（NT$2,500/單）
```

> **轉換漏斗的關鍵節點**：影片中段的「自然植入」必須夠克制——如果太業配，觀眾會流失；如果完全不提，觀眾不知道按摩棒可以買。Jwood 的解法：**用「我自己用」的口吻**，而不是「你應該買」。

---

## 相關連結

- Agent 團隊（生產這些影片的 Agent） → [agent-team.md](agent-team.md)
- 週排程（自動觸發腳本生產） → [../sop/weekly-operations.md](../sop/weekly-operations.md)
- 視覺 DNA → [brand-overview.md#視覺-dna從-chatgpt-產品圖學到的風格規範](brand-overview.md)
