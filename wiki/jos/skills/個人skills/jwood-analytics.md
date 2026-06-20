# jwood-analytics：Jwood YouTube 數字與策略速讀

觸發關鍵字：「看數字」「更新數字」「觀看數」「策略」「jwood analytics」「yt數字」「youtube數字」

## 執行動作

```bash
rm -rf /tmp/jwood_scripts && rclone copy gdrive:Jwood/scripts/ /tmp/jwood_scripts/ --include "show_strategy.py" && python3 /tmp/jwood_scripts/show_strategy.py
```

> show_strategy.py 是 GDrive 上的官方摘要腳本，會顯示訂閱數、累計觀看、影片數等完整資訊。
> remote 名稱是 `gdrive:`（用 `rclone listremotes` 確認）。
> 若只需要原始 JSON：`rclone copy gdrive:Jwood/strategy/ /tmp/` 再讀 `/tmp/strategy.json`。

## 摘要輸出格式

讀取後輸出以下摘要（不要貼原始 JSON）：

```
📊 Jwood YT 數據（generated_at）

目標進度：current_monthly_views / 100,000（progress_pct%）
90 天觀看：views_90d
差距倍數：gap_multiplier x

當前策略：strategy.name（name_en）
  → strategy.description
  週目標：weekly_target_videos 支，片長 video_length_sec 秒
  重點指標：focus_metrics

🏆 Top 5 穴道（優先製作）
1. acupoint — avg_views views，subs/千次 X，距上次 N 天
2. ...

🌊 藍海穴道（未製作）
- 地倉穴、大椎穴 ...

📌 優化目標（improvement_targets）
- 神門穴、睛明穴 ...

👥 受眾：dominant_age + dominant_gender（audience_persona）
```

## 策略解讀規則

| gap_multiplier | 策略名 | 週目標 | 片長 |
|---|---|---|---|
| > 10x | 爆量衝刺 | 7 支 | 30s |
| 3–10x | 品質優化 | 5 支 | 45s |
| 1–3x | 轉換強化 | 3 支 | 60s |

## 不要做

- ❌ 不要直接開始製作影片——摘要完畢後等 Jacky 確認方向
- ❌ 不要貼完整 JSON——只輸出摘要
- ❌ 不要用 `rclone copy`（會出錯），一律用 `rclone copyto`
