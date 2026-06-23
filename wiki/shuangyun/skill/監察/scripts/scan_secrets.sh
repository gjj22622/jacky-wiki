#!/usr/bin/env bash
# scan_secrets.sh <repo> — 唯讀掃描：機密上傳偵測(d)
# grep 公開檔找 key/token/ROAS/營收/真客戶名；驗 .gitignore；git ls-files 確認 secret 檔沒被追蹤。
# 只讀、只印，不改任何檔。
set -u
REPO="${1:-${SHUANGYUN_SCHOOL_REPO:-}}"
if [ -z "$REPO" ] || [ ! -d "$REPO" ]; then echo "✗ repo 路徑找不到：$REPO"; exit 0; fi
cd "$REPO" || exit 0

echo "=== d. 機密上傳偵測 @ $REPO ==="

# 受檢公開檔範圍（排除 node_modules / data / .git）
FILES=$(find public course.json README.md product-facts.md -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) 2>/dev/null | grep -v node_modules)

echo "--- [1] 金鑰/Token 明碼 ---"
# 真 token 是長隨機字串：sycc_ 後接 20+ 純英數（無底線）；"sycc_admin_secret" 之類的識別字名不算
PAT='sk-[A-Za-z0-9]{16,}|Bearer [A-Za-z0-9._-]{20,}|sycc_[A-Za-z0-9]{20,}|(ADMIN_SECRET|SESSION_SECRET)\s*[:=]\s*["'\''][^"'\'' ]{6,}|AIza[0-9A-Za-z_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}'
HIT=$(echo "$FILES" | xargs grep -nEI "$PAT" 2>/dev/null)
if [ -n "$HIT" ]; then echo "🔴 疑似金鑰/Token 明碼："; echo "$HIT"; else echo "🟢 無金鑰/Token 明碼"; fi

echo "--- [2] 營收/ROAS/毛利 等財務機密 ---"
HIT=$(echo "$FILES" | xargs grep -nEI "ROAS|營收|revenue|毛利|淨利|客單價|月營收|年營收" 2>/dev/null)
if [ -n "$HIT" ]; then echo "🟡 出現財務字眼（確認是否真客戶數字 vs 教學示意）："; echo "$HIT"; else echo "🟢 無財務機密字眼"; fi

echo "--- [3] 真客戶名（vs 教學虛構素材）---"
# 真客戶（jacky-wiki cases）；日好甜點/小真 為虛構教學素材，不在此列
HIT=$(echo "$FILES" | xargs grep -nEI "濂直火割烹|晟光建設|木酢寵物達人|木酢達人" 2>/dev/null)
if [ -n "$HIT" ]; then echo "🟡 出現真客戶名（確認是否該公開）："; echo "$HIT"; else echo "🟢 無真客戶名"; fi

echo "--- [4] .gitignore 覆蓋 ---"
for f in ".env" "data/tokens.json" "data/admin-config.json" ".zeabur-secrets.local.txt"; do
  if grep -qF "$f" .gitignore 2>/dev/null; then echo "🟢 已忽略：$f"; else echo "🔴 .gitignore 未覆蓋：$f"; fi
done

echo "--- [5] git 是否誤追蹤 secret 檔 ---"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  TRACKED=$(git ls-files | grep -E "(^|/)\.env$|tokens\.json$|admin-config\.json$|secrets.*\.local|\.zeabur-secrets" 2>/dev/null)
  if [ -n "$TRACKED" ]; then echo "🔴 secret 檔被 git 追蹤："; echo "$TRACKED"; else echo "🟢 無 secret 檔被追蹤"; fi
else
  echo "（非 git repo，略過 ls-files 檢查）"
fi
echo "=== done (d) ==="
