---
name: gen-image
description: 用 Codex CLI 呼叫 gpt-image-2（ChatGPT Pro 額度，不消耗 OpenAI API Key）生成圖片，自動搬到 Jwood 專案的 output/IG/ 目錄。
  觸發詞：生圖、畫一張、來張圖、generate image、幫我生成圖片、圖片生成、用 codex 生圖、codex 生圖
allowed-tools: Bash(codex:*), Bash(mkdir:*), Bash(ls:*), Bash(cp:*), Bash(find:*)
---

# gen-image：Codex CLI gpt-image-2 圖片生成

透過 `codex exec` 呼叫內建 image generation tool，使用 ChatGPT Pro 訂閱額度生成圖片。
生成的圖片會先存到 `~/.codex/generated_images/<session-id>/`，再由 Claude Code 自動複製到 Jwood 專案目錄。

## 機制說明

Codex 的 sandbox 限制了 bwrap loopback，導致 codex 本身無法 cp 到 workdir。
解法：codex exec 跑完後，Claude Code 用 Bash 取最新的生成圖，複製到指定路徑。

## 執行步驟

1. **決定輸出路徑**：預設為 `~/claude/projects/Jwood/output/IG/`，若使用者指定其他路徑以使用者為準
2. **決定檔名**：從描述提取英文關鍵字，格式 `YYYY-MM-DD_描述.png`
3. **記錄啟動時間**：`START=$(date +%s)`
4. **執行 codex exec**：
   ```bash
   START=$(date +%s)
   codex exec \
     -C ~/claude/projects/Jwood \
     --full-auto \
     --skip-git-repo-check \
     -s workspace-write \
     "Use the image generation tool to create: <英文描述>. Save as ./images/<filename>.png" \
     < /dev/null 2>&1
   ```
5. **找到新生成的圖片**：
   ```bash
   LATEST=$(find ~/.codex/generated_images -name "*.png" -newer /proc/$$/fd/0 \
     -printf "%T@ %p\n" 2>/dev/null | sort -n | tail -1 | awk '{print $2}')
   # 若 -newer 不可用，改用 find + mtime：
   LATEST=$(find ~/.codex/generated_images -name "*.png" \
     $(python3 -c "import time; print(f'-newermt @{int(time.time())-300}')") \
     | sort | tail -1)
   ```
6. **複製到目標路徑**：
   ```bash
   mkdir -p ~/claude/projects/Jwood/output/IG
   DEST=~/claude/projects/Jwood/output/IG/<filename>
   cp "$LATEST" "$DEST"
   ls -lh "$DEST"
   ```
7. **回報結果**：絕對路徑、檔案大小

## 簡化版（推薦實際使用）

```bash
# 步驟 1：生圖（codex 會存到 ~/.codex/generated_images/<session>/）
codex exec -C ~/claude/projects/Jwood --full-auto --skip-git-repo-check -s workspace-write \
  "Use the image generation tool to create: <描述>. Save as ./output/IG/<filename>.png" \
  < /dev/null 2>&1

# 步驟 2：取最新生成的圖複製過來
LATEST=$(find ~/.codex/generated_images -name "ig_*.png" -printf "%T@ %p\n" 2>/dev/null \
  | sort -n | tail -1 | cut -d' ' -f2-)
mkdir -p ~/claude/projects/Jwood/output/IG
cp "$LATEST" ~/claude/projects/Jwood/output/IG/<filename>
ls -lh ~/claude/projects/Jwood/output/IG/<filename>
```

## Jwood 專案常用場景

- IG 貼文封面：`output/IG/YYYY-MM-DD_<主題>/`
- 縮圖：`output/thumbnails/`
- 商品展示：`output/IG/_assets/`

## Prompt 撰寫原則

- 用**英文**（gpt-image-2 英文效果最好）
- 帶入具體風格詞：photorealistic / minimalist / dark moody / flat illustration
- 指定構圖：close-up / wide shot / product on table / lifestyle
- 帶入 Jwood 品牌色彩提示：dark walnut background / deep brown tones / candlelit warmth

## 範例

**用戶：** 「生圖一張：綠檀掌心雷放在深色木桌上的產品圖」

```bash
codex exec -C ~/claude/projects/Jwood --full-auto --skip-git-repo-check -s workspace-write \
  "Use the image generation tool to create: green sandalwood massage stick placed on a dark walnut wood table, professional product photography, moody lighting, shallow depth of field, luxury feel. Save as ./output/IG/green_sandalwood_product.png" \
  < /dev/null 2>&1

LATEST=$(find ~/.codex/generated_images -name "ig_*.png" -printf "%T@ %p\n" 2>/dev/null \
  | sort -n | tail -1 | cut -d' ' -f2-)
cp "$LATEST" ~/claude/projects/Jwood/output/IG/green_sandalwood_product.png
ls -lh ~/claude/projects/Jwood/output/IG/green_sandalwood_product.png
```
