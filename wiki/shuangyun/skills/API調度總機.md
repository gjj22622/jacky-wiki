---
title: shuangyun-api-gateway｜API 調度總機
domain: shuangyun
updated: 2026-04-29
---

# shuangyun-api-gateway｜API 調度總機

> **層級**：Infra（基礎設施）
> **三段式名稱**：`sy.infra.api-gateway`
> **狀態**：✅ 已建（v1.0 / 2026-03-23）
> 來源：`06_Skills/shuangyun-api-gateway.skill`

---

## 一句話定位

> 所有 Skill 之間溝通的中央路由器（調度總機）。

## 角色

接收指令 → 解析請求 → 判斷讀／寫 → 路由到對的 Skill → 收集結果 → 品管（寫才需要）→ 回傳標準格式 JSON。

## 包含檔案

```
shuangyun-api-gateway/
├── SKILL.md                          # 主 Prompt（觸發條件、執行流程、錯誤碼、自然語言轉換範例）
├── references/
│   ├── routing-table.md              # 完整路由表（9 GET + 8 POST）
│   └── json-schemas.md               # 6 種 JSON Schema
└── scripts/
    └── validate_request.py           # CLI 驗證工具（驗證請求是否符合路由表）
```

## 6 種 JSON Schema

`Request` ／ `Success` ／ `Error` ／ `Log` ／ `Chain Handoff` ／ `QA Review`

## 8 種錯誤碼

| 錯誤碼 | 觸發場景 |
|---|---|
| `INVALID_ACTION` | 動作不在路由表 |
| `INSUFFICIENT_DATA` | 缺必填欄位 |
| `METHOD_MISMATCH` | GET/POST 用錯 |
| `SKILL_NOT_FOUND` | 路由的目標 Skill 不存在 |
| `SKILL_EXECUTION_FAILED` | 下游 Skill 執行失敗 |
| `QA_REJECTED` | 品管未通過 |
| `PERMISSION_DENIED` | 權限不足 |
| `CHAIN_INTERRUPTED` | 鏈式呼叫中斷 |

## 完整路由表

> 9 GET（讀路由）+ 8 POST（寫路由 / 含執行鏈）詳見 [AGENTS方法論落地.md §4.6](../concepts/AGENTS方法論落地.md)。

## 讀／寫分離原則

- **GET（讀）**：不產生新內容、不需品管、可大量快取
- **POST（寫）**：必須品管、記錄日誌、關鍵節點人確認

## Agent System Prompt → API 版的轉換原則

每個被路由的 Agent 需要做 4 個調整：

1. **強制 JSON 輸出** — 所有回覆必須是合法 JSON
2. **移除互動邏輯** — 不能問問題，缺欄位標記 `missing`
3. **加入錯誤處理** — 回傳結構化錯誤碼
4. **讀寫權限宣告** — Prompt 開頭聲明本 Agent 的讀／寫權限

## 部署位置

第一階段（人觸發 + 自動串）由 Skill 形式承載；第二階段搬到 n8n。

## 相關連結

- 完整路由表 → [AGENTS方法論落地.md §4.6](../concepts/AGENTS方法論落地.md)
- API 互控架構（四層設計） → [AGENTS方法論落地.md §4](../concepts/AGENTS方法論落地.md)
- Week 5 課程設計（v1 已棄用，v3 不直接帶夥伴看 API） → [Week 5](../courses/Week5通.md)
