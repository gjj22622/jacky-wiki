---
title: 双云 Skills 總覽
domain: shuangyun
updated: 2026-04-29
---

# 双云 Skills 總覽

> 双云域的 Skill 集合。本頁是索引；每個獨立頁聚焦該 Skill 的角色、觸發條件、執行流程概要、邊界。
> 來源：`06_Skills/`（22 個 Skill）+ `11_AGENTS_知識體系/agents-methodology.skill`（已在 [AGENTS知識體系.md](../concepts/AGENTS知識體系.md) 整理）

---

## 三段式命名規範

```
{domain}.{layer}.{verb-output}
  ↑          ↑         ↑
  哪個業務    什麼角色    做什麼事
```

例：`sy.hand.scoring-report`、`sy.brain.decide`、`sy.infra.api-gateway`

> 完整命名範例與三層架構詳解見 [Week 4 §模組 7.5](../courses/Week4串.md)。

---

## 三層架構（依賴方向：Brain → Hand → Infra，不可反向）

### 🧠 Brain 層 — 動腦（判斷、決策、調度下游）

| Skill | 用途 | 頁面 |
|---|---|---|
| shuangyun-jacky-agent | 双云營運決策分身（Jacky 的營運長分身） | [Jacky分身Agent.md](Jacky分身Agent.md) |
| brand-beauty / ecommerce / food template | 客戶腦範本 | [品牌模板.md](品牌模板.md) |

### ✋ Hand 層 — 動手（執行任務、產出文件）

#### 5 助教 Agent（Week 4 課程基礎建設）

| Skill | 用途 | 頁面 |
|---|---|---|
| shuangyun-scoring-agent | 流程分群與完整度評分 | [評分Agent.md](評分Agent.md) |
| shuangyun-completion-coach | 拆解表補完引導 | [補完教練.md](補完教練.md) |
| shuangyun-config-converter | 設定檔轉換（流程 → Agent） | [設定檔轉換.md](設定檔轉換.md) |
| shuangyun-wisdom-merger | 集體智慧合併 | [集體智慧合併.md](集體智慧合併.md) |
| shuangyun-progress-tracker | 每日進度追蹤 | [進度追蹤.md](進度追蹤.md) |

#### 課程方法論

| Skill | 用途 | 頁面 |
|---|---|---|
| personalized-cruelty-test | Week 3 個人化殘酷測試生成 | [個人化殘酷測試.md](個人化殘酷測試.md) |

#### 業務 SOP

| Skill | 用途 | 頁面 |
|---|---|---|
| jie-an-liu-cheng | Sophia 接案流程 SOP v3.1（10 階段） | [客戶導入.md](客戶導入.md) |

#### 自動發佈／設定

| Skill | 用途 | 頁面 |
|---|---|---|
| fb-auto-publish / ig-auto-publish / reels-auto-create / line-channel-setup-agent | 社群自動發佈 + LINE 頻道設定 | [自動化流程.md](自動化流程.md) |

### 🔧 Infra 層 — 基礎設施（被其他 Skill 共用）

| Skill | 用途 | 頁面 |
|---|---|---|
| shuangyun-api-gateway | API 調度總機（讀／寫分離、9 GET + 8 POST） | [API調度總機.md](API調度總機.md) |

---

## Skill OS（8 顆核心 Skill 子系統）

| Skill | 角色 | 層 |
|---|---|---|
| shuangyun-brand-ops-agent | 品牌端唯一前台入口 | Hand |
| shuangyun-master-content-orchestrator | 中央工作流協調器 | Hand |
| shuangyun-brand-pack-builder | 品牌包建構 | Builder |
| shuangyun-content-reviewer | 內容品質審查（pass / needs_revision / reject） | Hand |
| shuangyun-trace-logger | 稽核日誌（保留證據鏈） | Infra |
| shuangyun-task-skill-builder | 任務 Skill 建構 | Builder |
| shuangyun-review-rule-builder | 審查規則生成 | Builder |
| shuangyun-workflow-mapper | 工作流視覺化 | Builder |

→ [SkillOS系統.md](SkillOS系統.md)（含串接流程圖、4 種使用情境）

---

## 跨域 Skill（不放 shuangyun，但會被双云議題引用）

> 這些 Skill 不在双云域，但常與双云議題互動。記錄位置以便交叉參考。

| Skill | 域 | 用途 |
|---|---|---|
| jackybraincommander | jacky | 總指揮（所有對話第一站，路由到下游 Skill） |
| jackybraincontrol | jacky | 產出品質驗收（CFALSA 六維度） |
| jacky-question-master | jacky | 蘇格拉底式審問 |
| tbsa-jacky-agent | tbsa | TBSA 策略決策分身 |
| tbsa-sostac-planner | tbsa | SOSTAC 完整企劃助理（內含 20+ 分析工具） |

> **觸發區分原則**（避免衝突）
> - 「双云營運／夥伴／分潤／品牌客戶」→ `shuangyun-jacky-agent`
> - 「TBSA 證照／人才培育／企劃方法論教學」→ `tbsa-jacky-agent`
> - 「問問題／審問提案／找盲點」→ `jacky-question-master`

---

## 相關連結

- 方法論定義（六字訣 / 三級認證） → [AGENTS知識體系.md](../concepts/AGENTS知識體系.md)
- 双云專案落地狀態 → [AGENTS方法論落地.md](../concepts/AGENTS方法論落地.md)
- AI 行銷部模型 → [AI行銷部定義.md](../concepts/AI行銷部定義.md)
- Skill 管理系統實機展示 → [Week 4 §模組 7.5](../courses/Week4串.md)
