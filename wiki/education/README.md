# education 域內部結構

> 詳細定位請看 [教育訓練索引.md](教育訓練索引.md)。本檔僅說明資料夾用途與寫作範本。

## 子目錄職責

| 目錄 | 內容 | 觸發詞 | 結構 |
|---|---|---|---|
| `concepts/` | 教學哲學、原則 | 「教學原則」「怎麼教 X」 | 單一 .md 檔，frontmatter + 內文 |
| `workshops/` | 完整教學單元 | 「整理成教材」「內訓分享」「教育訓練分享」 | 一個資料夾含 `README.md` + `slides-outline.md` |
| `playbooks/` | SOP / 操作手冊 | 「整理工作流程」「整理 SOP」「步驟手冊」 | 單一 .md 檔，編號步驟為主 |
| `pitfalls/` | 採坑點集合 | 「採坑點」「踩雷」「失敗教訓」 | 單一 .md 檔（依主題），可不斷追加 |

## 沒有 inbox（重要）

要捕「個人原始事件」（突破 / 失敗 / 工具發現） → 走 `/ailab capture` 或 `/ailab session`，存進 `wiki/ailab/inbox/`。

education 只接**已成熟、可對外**的成品。

## Frontmatter 範本

所有 education 檔頂部必含：

```yaml
---
title: <教材標題>
domain: education
updated: YYYY-MM-DD
audience: <目標對象>
prerequisite: <先備知識，無則寫「無」>
duration: <約幾分鐘看完>
tags: <逗號分隔關鍵字>
source_chat: <一句話描述本次對話脈絡>
---
```

## 引用既有 wiki 素材

寫教材時若用到 ailab / shuangyun / cross-domain 等域的內容，**用相對路徑連結**：

```markdown
> 延伸閱讀：[實踐捕手協定](../../ailab/concepts/實踐捕手協定.md)
```

**不複製內容**（嚴守 jacky-wiki/CLAUDE.md §去重原則）。

## 對應 skill

- 執行版：`~/.claude/skills/internal-training/SKILL.md`
- 觸發：`/internal-training` 或自然語言（見索引頁觸發詞清單）
