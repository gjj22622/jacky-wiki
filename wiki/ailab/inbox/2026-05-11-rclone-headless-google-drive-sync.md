---
event: headless server 用 rclone 同步 Google Drive：Windows 授權後複製 conf 到 server，pipeline 末段自動觸發
date: 2026-05-11
model: claude-sonnet-4.6
context: Jwood AI 工作流
type: 工作流改進
maturity: 已驗證
tags: rclone, google-drive, headless, oauth, sync, pipeline, file-transfer
---

## 發生了什麼

Jwood server（Ubuntu，無瀏覽器）要把 `output/video/` 自動同步到 Google Drive，讓筆電可以直接取影片上傳 YouTube。
Server 沒辦法跑 Google OAuth，解法是在 Windows 筆電完成授權，再把 `rclone.conf` 複製貼到 server。
最後在 `producer_shorts_generic.py` 末段加一行呼叫 `yt_sync.sh`，讓每支影片產完就自動觸發同步。

## 為什麼重要

過去影片只存在 server，要手動搬到筆電才能上傳 YouTube。現在 pipeline 一跑完，Google Drive 就有最新版本。
headless server 的 OAuth 繞法（在有瀏覽器的機器授權 → 複製 conf）是通用模式，適用於任何需要 OAuth 的 rclone remote。

## 怎麼做的

1. **Windows 安裝 rclone**：`winget install Rclone.Rclone`（重開 PowerShell 才生效）
2. **Windows 跑 `rclone config`**：
   - Storage type: `24`（Google Drive）
   - client_id / client_secret：Enter 留空（用 rclone 預設）
   - scope：`1`（Full access）
   - Auto config：`y`（Windows 有瀏覽器，自動跳出授權頁）
   - Shared Drive：`n`
3. **取出 Windows conf**：
   ```powershell
   cat $env:APPDATA\rclone\rclone.conf
   ```
4. **複製到 server**：
   ```bash
   mkdir -p ~/.config/rclone
   cat > ~/.config/rclone/rclone.conf << 'EOF'
   [gdrive]
   type = drive
   scope = drive
   token = {...}
   EOF
   ```
5. **驗證連線**：`rclone lsd gdrive:` 看到 Google Drive 資料夾即可
6. **建 `yt_sync.sh`**（`/home/jacky/claude/projects/Jwood/`）：
   ```bash
   #!/bin/bash
   echo "📤 同步影片到 Google Drive..."
   rclone sync /home/jacky/claude/projects/Jwood/output/video \
     gdrive:Jwood/output/video \
     --progress \
     --exclude "*.tmp"
   echo "✅ 同步完成"
   ```
   `chmod +x yt_sync.sh`
7. **加入 pipeline**（`src/video/v4/producer_shorts_generic.py` `produce()` return 前）：
   ```python
   subprocess.run(["bash", "/home/jacky/claude/projects/Jwood/yt_sync.sh"], check=False)
   ```

## 對比與替代

- **之前**：影片只存 server，要下載到筆電才能上傳，沒有自動化
- **SCP**：可以，但需要知道 server IP 且每次手動；Google Drive 讓筆電直接取用更方便
- **OneDrive**：原本考慮，但 Windows winget 的 rclone config OneDrive 需要另外處理 redirect URI；Google Drive auto config 在 Windows 上最順

## 連結與出處

- `yt_sync.sh`：`/home/jacky/claude/projects/Jwood/yt_sync.sh`
- pipeline 整合：`/home/jacky/claude/projects/Jwood/src/video/v4/producer_shorts_generic.py`（`produce()` 末段）
- rclone conf：`~/.config/rclone/rclone.conf`（server）/ `%APPDATA%\rclone\rclone.conf`（Windows）

## 升格目標

`ailab/tools/claude-code.md` 或新建 `ailab/tools/rclone-headless-sync.md`：
記錄「headless server OAuth → 有瀏覽器的機器完成授權 → 複製 conf」通用模式。
若之後 refresh_token 過期需要重授權，也值得補一段處理方式。
