---
title: AI 實踐 — Jacky 的工具觀／方法觀／演化觀
domain: ailab
updated: 2026-05-02
---

# AI 實踐（ailab）

> Jacky 作為 AI 工具用戶／實驗者每天累積的活知識。
> 不是日記、不是時間軸、不是已被 AGENTS 收編的方法論——而是**工具觀／方法觀／演化觀**的結晶層。

---

## 域定位

| 域 | 處理什麼 |
|---|---|
| `jlife/AI與博士` | **歷程**——從 0 變成現在的這個人（時間軸） |
| `shuangyun/AGENTS知識體系` | **結晶方法論**——已固化、可教學、可認證 |
| `cross-domain/*` | **跨域共用模式**——多場景重複出現的規律 |
| **`ailab`（本域）** | **工具與方法的活知識**——每天嘗試、每次突破、每次失敗、每個工具棧的個人視角 |

> 三句話劃清邊界：
> - jlife 是「我怎麼變成現在這樣」
> - AGENTS 是「結晶完、可教學、可認證」
> - **ailab 是「我作為 AI 實踐者每天的活知識」**

---

## 結構

```
ailab/
├── AI實踐索引.md（本頁）
├── concepts/         # 結晶層：個人方法觀
│   ├── 演化元方法.md         # 從實踐反推方法論的元邏輯
│   ├── AI工具觀.md           # 為什麼選這套工具棧
│   ├── 學習方法.md           # 學新模型／新工具的 SOP
│   ├── 三層萃取漏斗.md       # 對話 → 嘗試 → 模式 → 結晶 的篩選機制
│   ├── 實踐捕手協定.md       # ⭐ 跨模型／跨對話的標準記錄格式（v1.1：Mode A + Mode B）
│   └── 跨機與跨模型部署.md   # ⭐ Claude Code 多機 + Codex + Gemini Gem + Web AI 部署矩陣
├── tools/            # 工具觀：當前在用的（隨時間更新）
│   ├── 工具棧索引.md
│   ├── claude-code.md
│   ├── codex-cli.md
│   ├── mcp-servers.md
│   ├── 模型選擇心法.md
│   └── auto-memory系統.md
├── patterns/         # 模式：已驗證、已穩定（連結為主，不複製內容）
│   └── 模式索引.md
├── experiments/      # 實驗中（依事件升格／關檔，無時間門檻）
│   └── 2026-Q2實驗清單.md
├── log/              # 重大里程碑（精選，不是日記）
│   └── 2026-04_AGENTS_v1.0→v1.1.md
├── reading/          # 教材／文獻／重要影片心得
│   └── 閱讀索引.md
└── skill/            # ⭐ canonical SKILL 主版（多機共用）
    ├── SKILL.md      # ailab Skill 跨平台主版（symlink/copy 到 ~/.claude/skills/ailab/）
    └── INSTALL.md    # Windows / Ubuntu / WSL2 / macOS 安裝指南
```

---

## 跨域連結（前傳 ↔ 現況）

### 與 jlife 的關係（歷程 ↔ 方法）

→ [jlife/AI與博士_2023-2026](../jlife/stages/AI與博士_2023-2026.md)

| 在 jlife 看到 | 在 ailab 看到 |
|---|---|
| 「2023 ChatGPT 衝擊→双云 Deep Learning 共學」 | [學習方法](concepts/學習方法.md) — 怎麼學新工具的 SOP |
| 「2024 SOSTAC + AI 教學模式」 | [演化元方法](concepts/演化元方法.md) — 從實踐反推方法論 |
| 「整天的 AI，晚上木工舒壓」 | [模型選擇心法](tools/模型選擇心法.md) — 不同任務不同模型 |

### 與 shuangyun 的關係（結晶 ↔ 個人視角）

→ [shuangyun/AGENTS知識體系](../shuangyun/concepts/AGENTS知識體系.md)

- AGENTS 是「打出來」的結晶方法論
- ailab 是「打的過程中累積、但還沒結晶」的活知識
- 兩邊互為前後台：ailab 累到夠成熟 → 升格進 AGENTS；AGENTS 教學中遇到新場景 → 回到 ailab 記錄

### 與 nchu 的關係（學術應用 ↔ 工具心得）

→ [nchu/AI重組學術根基](../nchu/concepts/AI重組學術根基.md)

| 在 nchu 看到 | 在 ailab 看到 |
|---|---|
| 73% 幻覺事故 → 零幻覺 SOP | [實踐捕手協定](concepts/實踐捕手協定.md) — 失敗事件的記錄格式 |
| seminar-helper 9 階段工作流 | [模式索引](patterns/模式索引.md) — 9 階段也是 ailab 已驗證模式 |

### 與 cross-domain 的關係（共用模式 ↔ 個人實踐）

→ [cross-domain/跨域索引](../cross-domain/跨域索引.md)

cross-domain 收的 4 個跨域模式（入口導覽頁、script_viewer、Commander+Executor、賣點命名），ailab 的 [模式索引](patterns/模式索引.md) 全部反向連結（不複製內容）。

### 與 jwood 的關係（多模態工作流 ↔ 工具實驗）

→ [jwood/木作索引](../jwood/木作索引.md)

Jwood 的 Series A/B/C/D 並行工作流是 ailab 的多模態實驗成果。

---

## 三條輸入線

| 來源 | 頻率 | 篩選規則 | 落點 |
|---|---|---|---|
| **既有專案文件整合** | 一次性 | 偏個人視角、非結晶方法論 | concepts / tools / log |
| **每個 session 對話** | **有事件就升格** | 「方法級突破」才升格（非工作日誌） | concepts / patterns |
| **每天的嘗試** | **有事件就升格** | 不入 wiki 直到事件成形 | inbox → experiments → patterns/tools |

> **無時間門檻**：依事件本身的成熟度判斷，不機械化用 30 天／3 個月閘門。
> 詳見 [三層萃取漏斗](concepts/三層萃取漏斗.md)。

---

## ⭐ 跨模型跨對話的記錄方法：實踐捕手協定

不管你在用 Claude Code、Codex CLI、ChatGPT、Gemini、還是任何未來的模型，都用同一份協定記錄事件：

→ **[實踐捕手協定](concepts/實踐捕手協定.md)** ⭐

對應工具：
- **`/ailab` Claude Code skill**：在 Claude Code 內自動套用協定（`~/.claude/skills/ailab/SKILL.md`）
- **協定文件本身**：模型無關，可以複製貼到任何 AI 對話讓它輸出標準格式
- **跨機跨模型部署** → **[跨機與跨模型部署](concepts/跨機與跨模型部署.md)** ⭐ 包含 Claude Code 多機 + Codex CLI + Gemini Gem + Web AI 完整部署矩陣
- **多機安裝** → [skill/INSTALL.md](skill/INSTALL.md)（Windows / Ubuntu / WSL2 / macOS 一次性安裝步驟）

---

## 當前工具棧速查

詳見 [工具棧索引](tools/工具棧索引.md)。

| 類別 | 主力 | 替代／實驗 |
|---|---|---|
| 主對話 IDE | **Claude Code (Opus 4.7 1M)** | Codex CLI（GPT-5.4） |
| 模型 | Opus 4.7 / Sonnet 4.6 / Haiku 4.5 | — |
| 持久記憶 | `.claude/projects/<proj>/memory/` auto-memory | OneDrive / wiki |
| Skill | `~/.claude/skills/<name>/SKILL.md` | `.claude/commands/` 斜線指令 |
| MCP | Gmail / Drive / Calendar / Canva / Gamma | — |
| 多模態 | Codex CLI + gpt-image-2（Jwood）| — |

---

## 當前實驗

→ [2026-Q2 實驗清單](experiments/2026-Q2實驗清單.md)

---

## 重大里程碑

| 時間 | 事件 | 連結 |
|---|---|---|
| 2026-04 | AGENTS v1.0 → v1.1（NCHU + Jwood + 双云三場景反推 12 元素） | [log](log/2026-04_AGENTS_v1.0→v1.1.md) |

---

## 相關連結

- 域首頁總覽 → [wiki 主索引](../wiki主索引.md)
- 寫作規範 → [CLAUDE.md](../../CLAUDE.md)
- 操作日誌 → [log.md](../log.md)
