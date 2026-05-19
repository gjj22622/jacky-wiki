---
session_date: 2026-05-14
session_topic: Jwood Shorts EP33-40批量製作 + 跨機backlog同步流程建立
model: claude-sonnet-4-6
context: Jwood AI 工作流
duration: ~3h
type: session-summary
tags: jwood, shorts, pillow, diagram, backlog-sync, rclone, gdrive, workflow
---

## 最終做法（What Worked）

**backlog 同步流程（跨機）：**
- 笔電 Cowork Claude → Desktop Commander 寫 `C:\temp\upload_results.json`
  格式：`{"results": [{"id": "...", "yt_video_id": "...", "yt_url": "...", "uploaded_at": "..."}]}`
- `rclone copy C:\temp\upload_results.json gdrive:Jwood/data/` 推到 GDrive
- Linux Claude：`rclone copy gdrive:Jwood/data/upload_results.json .../data/` 拉下來
- 執行 `python3 src/tools/update_backlog.py` → 自動更新 content_backlog.json 狀態

**新 diagram type（Pillow 程式繪製）：**
- 5種圖一個 elif block，共用 face base code（橢圓臉、眉、眼、鼻、嘴、耳）
  - `face_jingming`：睛明穴（內眼角 ±44px）
  - `face_cuanzhu`：攢竹穴（眉頭 ±30px）
  - `face_sibai`：四白穴（眼下 ±90px 往下 55px）
  - `ear_tinggong`：耳屏前（bilateral fx0+5 / fx1-5）
  - `ear_yifeng`：耳後乳突（bilateral fx0-28 / fx1+28, ear_y+38）
- `back_mingmen`：脊椎正中單點（vs back_shenshu 是雙側），spine_x L2 位置

**EP33-40 全部製作完成（30秒格式）：**
- 內關穴 EP33（暈車新角度）、命門穴 EP34（藍海穴位）
- 護眼系列 EP35-37（睛明/攢竹/四白）
- 聽力系列 EP38-40（聽宮/翳風/腎俞耳鳴版）

## 繞路紀錄（Detours）

- 笔電 Cowork 指令一開始寫成「執行 Linux Python scripts」→ 笔電 Claude 在 Windows 環境，根本沒有那些檔案，改成純 Desktop Commander 寫 JSON + rclone 推 GDrive
- EP37 四白穴在 batch loop 中被跳過（`for ep in 35 36 38 39 40` 漏了 37）→ 單獨補跑
- Edit EP32 後的 backlog entry 時 old_string 比對失敗 → EP32 已有 yt_video_id/yt_url/published_date 等額外欄位，要把這些都納入 old_string 才能精確匹配

## 錯誤與失敗（What Failed）

- 原本以為笔電 Cowork 一定能用 Python 跑 update_backlog.py → 假設錯誤，笔電沒有專案檔案，純 AI-to-AI 指令傳遞需要另一個設計（GDrive 中繼）
- strategy.json 的 video_count / avg_views 資料表明有 EP 已上傳但 backlog 狀態是 ready_to_upload → 已上傳的影片只能靠 upload_results.json 流程同步，沒有其他自動橋接

## 升格候選

- ⭐ **跨機 backlog 同步流程**（Laptop Cowork → GDrive → Linux）→ 升格 `ailab/patterns/` 或補進 `ailab/tools/claude-code.md` 多機協作段
- **共用 face base code + dtype-specific 點**的 Pillow 繪圖模式 → `ailab/patterns/` 繪圖程式設計模式（可能值得記）
- **GDrive 作為 AI 跨機中繼**（rclone push/pull）→ 補進 `ailab/tools/` 工具棧

## 待延伸（Next）

- EP33-40 等待笔電 Cowork 上傳，上傳後跑 backlog sync 流程
- EP50 後執行版型改版計畫（已記錄進 content_backlog.json todo）
- 護眼系列、聽力系列數據出來後分析是否比常規穴道更吸量
- 未來考慮美容系列、寵物按摩系列
