---
title: Jwood YouTube 影片生產 SOP
domain: jwood
tags: [jwood, youtube, shorts, sop, ffmpeg, python]
updated: 2026-04-28
---

# YouTube 影片生產 SOP

> 涵蓋長影片（1920×1080）與 Shorts（1080×1920）

---

## 技術棧

| 工具 | 用途 |
|------|------|
| Python + Pillow | 場景圖幀合成 |
| gTTS（zh-TW） | 中文 TTS 語音 |
| ffmpeg | 圖幀 + 音軌合成影片 |
| Codex CLI + gpt-image-2 | AI 背景圖生成 |
| Claude Code | 腳本生成、自動化協調 |

---

## 長影片流程

### 1. 確認場景設定

每集在 `src/video/v4/producer_A_epXX.py` 定義場景列表：
- opening（開場）
- acupressure（穴道介紹）
- knowledge（知識卡）
- product（產品展示）
- recap（總結）
- endcard（結尾 CTA）

### 2. 執行 producer

```bash
cd ~/claude/projects/Jwood
python3 src/video/v4/producer_A_ep05.py
```

每個場景自動：
1. 呼叫 `frame_engineer_openai.py` → Codex CLI 生成 AI 背景（約 40-60 秒/場景）
2. Pillow 疊加文字面板、品牌元素
3. gTTS 生成語音
4. ffmpeg 合成單場景影片

全集完成後合併為 `output/video/series_A_ep05/final_video.mp4`。

### 3. 規格

| 項目 | 規格 |
|------|------|
| 解析度 | 1920×1080 |
| 幀率 | 30fps |
| 編碼 | libx264 + aac |
| 長度 | 約 4-5 分鐘 |

---

## Shorts 流程

### 執行

```bash
python3 src/video/v4/producer_A_ep05_shorts.py
```

每集產出 3 支 Shorts（各 55 秒以內）：
1. **找穴 Short**：精準定位穴道
2. **按法 Short**：掌心雷示範
3. **場景 Short**：適用情境

### 規格

| 項目 | 規格 |
|------|------|
| 解析度 | 1080×1920（9:16） |
| 幀率 | 30fps |
| 長度 | ≤ 55 秒 |
| 字幕區 | 下方 40% 為文字區，上方 60% 為解剖/產品圖 |

---

## npm 快速指令

```bash
npm run shorts_A2   # Series A EP02 Shorts
npm run shorts_A3   # Series A EP03 Shorts
npm run shorts_A4   # Series A EP04 Shorts
npm run daily_report  # 手動觸發費用報告
```

---

## YouTube 上傳資訊

每集自動生成：
- `output/video/series_A_epXX/youtube_upload.json` — 機器讀取格式
- `output/video/series_A_epXX/youtube_upload.txt` — 人工複製貼上格式

內含：標題、說明欄（含章節時間戳）、分類、語言、標籤、縮圖路徑。

---

## 已完成集數（Series A）

| 集 | 穴道 | 長影片 | Shorts (3支) | upload.txt |
|----|------|--------|-------------|-----------|
| EP01 | 合谷穴 | ✅ | ✅ | ✅ |
| EP02 | 內關穴 | ✅ | ✅ | ✅ |
| EP03 | 足三里 | ✅ | ✅ | ✅ |
| EP04 | 三陰交 | ✅ | ✅ | ✅ |
| EP05 | 湧泉穴 | ✅ | 待執行 | ✅ |

---

## 費用追蹤

API 用量自動寫入 `output/logs/api_usage.jsonl`。  
每日 08:03 由 crontab 執行 `daily_report.py` 發送 Email + Telegram 報告。
