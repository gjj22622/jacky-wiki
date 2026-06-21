---
title: Skill 總索引（單一真相）
domain: jos
updated: 2026-06-21
snapshot: 24 份快照（utm-shortlink 已修復目錄結構）@ 2026-06-21 G2 mini
---

# Skill 總索引

> Jacky 所有 skill 的**單一真相**。換機時，skill 全部從這裡還原。
> 個人 skill 的 master 還原快照放在 `個人skills/`（由 `/移機 sync` 維護）。
> plugin 型 skill 另見 [plugin與市集](plugin與市集.md)。

---

## 個人 Skill（24 支聯集，放 `~/.claude/skills/<名稱>/SKILL.md`）

| # | Skill | 觸發 | 用途 | 還原快照 |
|:--:|---|---|---|---|
| 1 | **jacky-wiki** | `/wiki` | 查詢／更新整個 wiki | [→](個人skills/jacky-wiki.md) |
| 2 | **ailab** | `/ailab` | AI 實踐捕手協定（跨模型記錄）| [→](個人skills/ailab.md) ・[編輯主版](../../ailab/skill/SKILL.md) |
| 3 | **移機** | `/移機` | AI 作業系統轉移（本域 skill）| [編輯主版](../skill/SKILL.md) |
| 4 | **作品** | `/作品` | 作品歸檔速查（portfolio 域 skill）| [編輯主版](../../portfolio/skill/SKILL.md) |
| 5 | **kickoff** | `/開工` `/kickoff` | 開工儀式（讀 todolist brief 進度）| [→](個人skills/kickoff.md) |
| 6 | **wrap-up** | `/收工` `/wrap-up` | 收工儀式（凍結進度到 todolist）| [→](個人skills/wrap-up.md) |
| 7 | **internal-training** | `/內訓` `/internal-training` | 整理對外教材（配對 education 域）| [→](個人skills/internal-training.md) |
| 8 | **admin-token-backend** | `/admin後台` | admin 後台 token 管理規格+樣板 | [→](個人skills/admin-token-backend.md) |
| 9 | **graphify** | `/graphify` | 任何輸入 → 知識圖 | [→](個人skills/graphify.md) |
| 10 | **deck-final-check** | `/排查` | 簡報上場前六維體檢 | [→](個人skills/deck-final-check.md) |
| 11 | **survey-analysis** | `/問卷分析` | 問卷分析三件套 | [→](個人skills/survey-analysis.md) |
| 12 | **tbsa-forms** | `/tbsa-forms` | TBSA 五張企劃表單 .docx | [→](個人skills/tbsa-forms.md) |
| 13 | **tts-script** | `/tts` `/語音` | 文字轉語音口稿（Edge TTS）| [→](個人skills/tts-script.md) |
| 14 | **seminar-helper** | `/seminar` | NCHU 9 階段專討工作流 | [→](個人skills/seminar-helper.md) |
| 15 | **j-bo** | `/J博` `/查核` | 學術內容真實性查核 | [→](個人skills/j-bo.md) |
| 16 | **journal-chinese-forestry** | `/TJFS` `/林業科學` | 林業科學期刊投稿審核 | [→](個人skills/journal-chinese-forestry.md) |
| 17 | **journal-ecological-informatics** | `/EI` `/生態資訊` | Ecological Informatics 投稿審核 | [→](個人skills/journal-ecological-informatics.md) |
| 18 | **huashu-design** | （自然語言觸發）| 花叔 Design — HTML 高保真原型/設計 | [→](個人skills/huashu-design.md) |
| 19 | **daemon-status** | `/daemon-status` | personal-agent daemon 健康狀態速報 | [→](個人skills/daemon-status.md) |
| 20 | **gen-image** | （生圖／畫一張）| Codex CLI 呼叫 gpt-image-2 生圖 | [→](個人skills/gen-image.md) |
| 21 | **invest-advisor** | `/invest` | 投資顧問（讀真實持倉/報價/法人）| [→](個人skills/invest-advisor.md) |
| 22 | **jdong-wiki** | `/jdong-wiki` | J董 Wiki（AgentFlow CEO 知識庫）| [→](個人skills/jdong-wiki.md) |
| 23 | **jwood-analytics** | （自然語言觸發）| Jwood YouTube 數字與策略速讀 | [→](個人skills/jwood-analytics.md) |
| 24 | **utm-shortlink** | `/utm-shortlink` | UTM 製造 + airun.tw 短網址發行 | [→](個人skills/utm-shortlink.md) |

> 第 2/3/4 支（ailab/移機/作品）有更完整的 **canonical 編輯主版**在 wiki 對應域；`個人skills/` 的快照只用於緊急一鍵還原。**要改 skill 改編輯主版，不要改快照。**
>
> **跨機分布**：1–18 多在 Windows 主機；19–24 為 G2 mini (Ubuntu) 獨有（多為 daemon/Linux 專用）。各機實際安裝清單見 [manifest](../migration/manifest.md)，差異與補齊見 [環境一致性](../migration/環境一致性.md)。

---

## 「還原快照」是什麼

`個人skills/*.md` = 各 skill 的 `~/.claude/skills/<名稱>/SKILL.md` 內容備份。
- **產生**：`/移機 capture` 或 `/移機 sync` 自動從本機 `~/.claude/skills/` 複製進來。
- **用途**：換機時 `/移機 restore` 把它們複製回新機的 `~/.claude/skills/`。
- **這是快照不是編輯主版**：日常改 skill 請改 `~/.claude/skills/` 的執行版或對應的 canonical 主版，再跑 `/移機 sync` 回寫。

---

## 一鍵還原（換機後）

把 wiki 的 skill 快照複製回 `~/.claude/skills/`。

**Windows PowerShell**：
```powershell
$src = "$env:USERPROFILE\jacky-wiki\wiki\jos\skills\個人skills"
Get-ChildItem "$src\*.md" | ForEach-Object {
    $name = $_.BaseName
    $dst  = "$env:USERPROFILE\.claude\skills\$name"
    New-Item -ItemType Directory -Force -Path $dst | Out-Null
    Copy-Item $_.FullName "$dst\SKILL.md" -Force
    Write-Host "restored $name"
}
```

**Ubuntu / macOS / WSL2**：
```bash
src="$HOME/jacky-wiki/wiki/jos/skills/個人skills"
for f in "$src"/*.md; do
  name=$(basename "$f" .md)
  mkdir -p "$HOME/.claude/skills/$name"
  cp "$f" "$HOME/.claude/skills/$name/SKILL.md"
  echo "restored $name"
done
```

> ailab / 移機 / 作品 想用 canonical 主版（含 INSTALL.md）安裝，改用各自域的 `skill/INSTALL.md` 步驟。

---

## 相關連結

- plugin 型 skill → [plugin與市集](plugin與市集.md)
- 換機步驟 → [換電腦SOP](../migration/換電腦SOP.md)
- 域首頁 → [作業系統索引](../作業系統索引.md)
