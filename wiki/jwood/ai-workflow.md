---
title: Jwood AI 圖片生成工作流
domain: jwood
tags: [jwood, ai-workflow, codex-cli, gpt-image-2, google-drive, rclone]
updated: 2026-04-28
---

# AI 圖片生成工作流

> 適用於：IG 封面圖、YouTube 縮圖、影片背景幀

---

## 核心概念

| 工具 | 角色 | 費用 |
|------|------|------|
| **Codex CLI** | 呼叫 gpt-image-2 的橋接工具 | 含在 ChatGPT Pro $20/月 |
| **gpt-image-2** | OpenAI 最新生圖模型 | 透過 Pro 訂閱免費 |
| **Claude Code** | 下指令、執行後處理（find + cp） | 含在 Anthropic 訂閱 |
| **rclone** | 上傳 Google Drive | 免費 |

**關鍵優勢**：gpt-image-2 透過 Codex CLI 呼叫時消耗 ChatGPT Pro 月費額度，不另外計費。  
比直接打 OpenAI API（約 $0.04-$0.08/張）划算非常多。

---

## 工作流程

```
Claude Code 下指令
    ↓
codex exec（呼叫 gpt-image-2）
    ↓
圖片存至 ~/.codex/generated_images/<session>/ig_*.png
    ↓
Claude Code find + cp 到 output/IG/
    ↓
rclone 上傳 Google Drive
```

---

## 完整指令

### Step 1：生圖

```bash
codex exec \
  -C ~/claude/projects/Jwood \
  --full-auto \
  --skip-git-repo-check \
  -s workspace-write \
  "Use the image generation tool to create: <英文描述>. Save as ./output/IG/<filename>.png" \
  < /dev/null 2>&1
```

### Step 2：取回圖片

```bash
LATEST=$(find ~/.codex/generated_images -name "ig_*.png" \
  -printf "%T@ %p\n" 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
cp "$LATEST" ~/claude/projects/Jwood/output/IG/<filename>.png
ls -lh ~/claude/projects/Jwood/output/IG/<filename>.png
```

### Step 3：上傳 Google Drive

```bash
rclone copyto \
  ~/claude/projects/Jwood/output/IG/<filename>.png \
  "gdrive:jwood-ai-outputs/IG/<filename>.png" \
  --progress
```

---

## Prompt 撰寫原則

- 用**英文**（gpt-image-2 英文效果最佳）
- 加入具體風格詞：`photorealistic` / `minimalist` / `dark moody` / `luxury wellness`
- 指定構圖：`close-up` / `wide shot` / `product on table` / `lifestyle`
- 帶入 Jwood 品牌色調：`dark walnut background` / `deep brown tones` / `candlelit warmth`
- 結尾加方向：`Horizontal landscape 16:9` 或 `Vertical portrait 9:16`

### 範例 Prompt（綠檀掌心雷產品圖）

```
green sandalwood massage stick (掌心雷) placed elegantly on a dark walnut 
wood surface, soft candlelit warm light from the side, professional product 
photography style, shallow depth of field, luxury brand aesthetic, deep brown 
tones, minimalist composition, no text. Horizontal landscape 16:9.
```

---

## 已知限制與解法

| 問題 | 原因 | 解法 |
|------|------|------|
| `bwrap: loopback: Failed RTM_NEWADDR` | workspace-write sandbox 的 bubblewrap 限制 | 不影響生圖；圖片在 `~/.codex/generated_images/`，用 find+cp 取回 |
| 生圖慢（40-60 秒/張） | Codex session 啟動時間 | 接受此速度；批次執行時可多開 terminal |
| Codex skills YAML 錯誤 | `~/.codex/skills/` 下兩個檔案格式有誤 | 不影響生圖，僅啟動時 log ERROR |

---

## 整合進影片生產

`frame_engineer_openai.py` 和 `frame_engineer_short.py` 已更新：  
`_gen_ai_bg()` / `_gen_ai_bg_portrait()` 改為 subprocess 呼叫 Codex CLI，  
不再需要 `OPENAI_API_KEY`。

```python
def _gen_ai_bg(prompt: str) -> Image.Image:
    ts = time.time()
    subprocess.run(
        ["codex", "exec", "-C", str(ROOT),
         "--full-auto", "--skip-git-repo-check", "-s", "workspace-write",
         f"Use the image generation tool to create: {prompt}. Save as ./output/tmp_frame_bg.png"],
        input=b"", capture_output=True, timeout=300,
    )
    files = glob.glob(str(Path.home() / ".codex/generated_images/*/ig_*.png"))
    new_files = [f for f in files if os.path.getmtime(f) > ts]
    latest = max(new_files if new_files else files, key=os.path.getmtime)
    img = Image.open(latest).convert("RGB")
    # ... cover crop to target size
```

---

## 輸出路徑規範

| 用途 | 路徑 | 命名格式 |
|------|------|---------|
| IG 封面圖 | `output/IG/` | `YYYY-MM-DD_主題.png` |
| YT 縮圖 | `output/thumbnails/` | `series_X_epNN.png` |
| 影片背景幀 | 由 producer 自動管理 | — |
| Google Drive | `gdrive:jwood-ai-outputs/IG/` | 同本機 |

---

## 參考

- 詳細 HTML 教學文件：`~/claude/projects/Jwood/education/AI_Image_Generation_Workflow.html`
- Claude Code skill：`~/.claude/skills/gen-image/SKILL.md`
- 首次驗證時間：2026-04-28（綠檀掌心雷產品圖 2.0MB，生成成功）
