---
title: Codex CLI（GPT-5.4 跨檔重構 / 第二意見）
domain: ailab
updated: 2026-05-02
---

# Codex CLI

> **定位**：跟 Claude Code 互補，不是取代。**主場景**：跨檔結構性重構、第二意見診斷。

---

## 為什麼納入工具棧

學習過程：[學習方法](../concepts/學習方法.md) 三階段

| Phase | 結論 |
|---|---|
| Phase 1（48h 上手）| 跑 3 個跨檔重構 demo，比 Claude Sonnet 4.6 漏改少 |
| Phase 2（2 週分流）| 雙跑後確認「跨檔結構重構 → Codex」 |
| Phase 3（決策）| **Niche**——保留特定場景，不取代主對話 |

---

## 主要使用方式

### 方式 1：Claude Code Plugin

**位置**：`codex:rescue` subagent

**何時呼叫**：
- 主對話卡住（試了 2-3 次解不了）
- 想要跨模型第二意見
- 跨檔結構性任務（Codex 比 Claude 穩）

**呼叫範例**：在主對話中喊「丟給 Codex 試試看」或「我想要第二意見」。

### 方式 2：Codex CLI 直接命令列

**安裝**：見 OpenAI 官方
**設定**：`~/.codex/`
**指令**：`codex run "<task>"`

---

## 適合 Codex 的任務（從實踐反推）

| 任務類型 | Codex 表現 | Claude 表現 |
|---|---|---|
| **跨檔結構性重構**（5+ 檔）| ✅ 一次到位 | 🟡 容易漏改 import/path |
| **大規模 rename** | ✅ 完整 | 🟡 完整但慢 |
| **API 重構**（介面變更）| ✅ 穩 | 🟡 偶有遺漏 |
| **單檔 logic** | 🟢 OK | ✅ 略佳 |
| **長 context 對話** | ❌（沒 1M）| ✅ Opus 4.7 |
| **方法論寫作** | 🟡 OK | ✅ 略佳（Opus）|
| **多模態圖像生成** | ✅ 配 gpt-image-2 | ❌（無圖生成）|

> **規則**：「想清楚 + 對話」用 Claude；「做乾淨 + 跨檔」用 Codex。
> 詳見 [Commander+Executor 模式](../../cross-domain/Commander+Executor單人多Agent模式.md)。

---

## 跟 Claude Code 整合（Plugin 方式）

`codex` plugin 提供的能力：

| 工具 | 用途 |
|---|---|
| `codex:rescue` subagent | 主對話卡住時的救援 |
| `codex:setup` skill | 檢查 Codex CLI 是否就緒 |
| `codex:gpt-5-4-prompting` skill | GPT-5.4 prompt 內部指南 |
| `codex:codex-result-handling` skill | Codex 結果如何呈現給用戶 |
| `codex:codex-cli-runtime` skill | runtime 合約 |

**用法**：在主對話需要時自然呼叫，Claude Code 會自動找到對應 skill。

---

## 限制

| 限制 | 說明 | 解 |
|---|---|---|
| 沒 1M context | 不適合超長 wiki ingest | 用 Claude Opus 1M |
| 沒持久 memory | 跨對話得重新解釋 | 用 Claude Code auto-memory |
| 沒 MCP 生態 | 不能直接整合 Drive / Gmail | 走 Claude Code |
| 沒 Skills | 沒有 `jacky-wiki` 等可重用方法論 | 主場景留 Claude Code |

---

## 使用心得

### Codex 比 Claude 穩的場景特徵
- 結構性、規格清楚（不是創意性）
- 多檔同時動（5+ 檔）
- 介面 / 型別變更（compiler 能驗證的）
- 重複性高（rename、import path 修正）

### Codex 比 Claude 弱的場景特徵
- 需要對話、討論、釐清需求
- 創意性（文案、命名、敘事）
- 需要長 context 的決策（wiki 結構規劃）
- 需要 memory（個人偏好、歷史脈絡）

---

## 模型對比的記錄方式

每次發現新的「Codex vs Claude 差異」事件，用 [實踐捕手協定 type=模型對比](../concepts/實踐捕手協定.md) 記錄。

範例：

```
event: Codex CLI gpt-5.4 比 Claude Sonnet 4.6 更會處理跨檔重構
type: 模型對比
maturity: 已驗證
```

→ 累積 ≥ 3 次同類事件 → 升格 [模型選擇心法](模型選擇心法.md) 規則。

---

## 相關連結

- 域首頁 → [AI實踐索引](../AI實踐索引.md)
- Claude Code（互補）→ [claude-code](claude-code.md)
- 模型分流 → [模型選擇心法](模型選擇心法.md)
- Commander+Executor 模式 → [cross-domain](../../cross-domain/Commander+Executor單人多Agent模式.md)
