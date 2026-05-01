---
title: Auto-memory 系統（跨對話持久記憶）
domain: ailab
updated: 2026-05-02
---

# Auto-memory 系統

> Claude Code 的跨對話記憶系統。讓 Claude 在新對話中記得你是誰、偏好什麼、踩過什麼坑、項目當前狀態。
> 路徑：`.claude/projects/<project-hash>/memory/`

---

## 為什麼這是核心工具

**沒有 memory**：每次新對話都要重新解釋「我是 Jacky、我做双云、我在中興博士、我偏好 X 不偏好 Y」——浪費。
**有 memory**：每次新對話 Claude 自動讀完 6 份 memory，馬上知道脈絡。

---

## 結構

```
.claude/projects/<project-hash>/memory/
├── MEMORY.md                  # 索引（每行 1 個 memory pointer）
├── jacky-profile.md           # user 類型
├── methodology-ip.md          # project 類型
├── wiki-structure.md          # project 類型
├── feedback-narrative-precision.md  # feedback 類型
├── feedback-direct-action.md   # feedback 類型
├── feedback-wiki-stable-only.md     # feedback 類型
├── reference-onedrive-paths.md      # reference 類型
└── reference-agents-evolution-record.md  # reference 類型
```

---

## 4 種 memory 類型

| 類型 | 用途 | 例子 |
|---|---|---|
| `user` | 用戶身分、偏好、知識背景 | 「Jacky 是双云創辦人 + TBSA 理事長 + 中興博士」 |
| `feedback` | 過去用戶給的指導／糾正／確認 | 「不要說 Jacky × Claude 共創」、「不問直接做」、「wiki 只放穩定知識」 |
| `project` | 當前項目狀態、決策、deadline | 「博二、共指朱彥煒、第三次專討 2026-05-13」 |
| `reference` | 外部系統指引（哪裡查什麼） | 「OneDrive 路徑速查」、「AGENTS 演化檔在哪」 |

---

## MEMORY.md 索引格式

```markdown
- [標題](檔名.md) — 一行 hook（≤150 字）
```

> 只放 pointer，不放內容。內容在各 memory 個別 .md。

---

## 個別 memory 檔格式

```markdown
---
name: <memory 名稱>
description: <一行：用於下次決定相關性>
type: user | feedback | project | reference
---

<內容：feedback / project 類型用「規則 + Why + How to apply」三段；user / reference 自由>
```

---

## 何時 save memory

| 訊號 | 動作 |
|---|---|
| 用戶說「記住這個」「以後都這樣」 | 立刻 save |
| 用戶糾正你的做法 | save 為 feedback（含 Why）|
| 用戶確認非顯然的方法 | save 為 feedback（避免變過度謹慎）|
| 用戶提到項目狀態／決策／deadline | save 為 project |
| 用戶提到外部系統位置 | save 為 reference |

---

## 何時不 save

| 反例 | 為什麼不該 |
|---|---|
| 程式碼風格、檔案結構 | 讀 code 就知道 |
| Git history、誰改了什麼 | git log / git blame |
| Bug fix recipe | 在 commit message |
| 已在 CLAUDE.md 的東西 | 重複 |
| 流水帳：「在做 X 進度 50%」 | ephemeral，不是 memory |

---

## 個別 memory 的寫法

### feedback / project：三段式
```markdown
規則／事實本身

**Why**: 用戶為什麼這樣要求（過去事故、強烈偏好、特定脈絡）

**How to apply**: 什麼時候用、怎麼用
```

### user / reference：自由格式
列點、表格、流程圖都可以。

---

## 用 memory 的雷

| 雷 | 解 |
|---|---|
| 寫了 memory 但下次沒讀 | 一定要讀 MEMORY.md（不是 individual files）|
| memory 已過時 | 觀察到 fact 變了，立刻 update memory，不要用過時的 |
| memory 引用具體檔名/函數名 | 那是「當時存在」的快照，要 verify 才能信 |
| 重複 memory | 先讀 MEMORY.md 看有沒有既有，update 而不是新增 |
| memory 太長 | MEMORY.md 索引行 ≤ 150 字、超過 200 行會 truncate |

---

## Jacky 當前 memory 清單（2026-05-02）

| 檔名 | 類型 | 用途 |
|---|---|---|
| `jacky-profile.md` | user | 多重身分 + 20 年方法論三段身分 |
| `methodology-ip.md` | project | 三套方法論 IP 治理（SOSTAC/SPEAKS/AGENTS）|
| `wiki-structure.md` | project | jacky-wiki 結構 + 寫作規範 |
| `feedback-narrative-precision.md` | feedback | 反「Jacky × Claude 共創」「14 年弧線」措辭 |
| `feedback-direct-action.md` | feedback | 不問直接做 + 繁中 + 中文檔名 + commit 格式 |
| `feedback-wiki-stable-only.md` | feedback | wiki 只放穩定知識，草案進 OneDrive |
| `reference-onedrive-paths.md` | reference | OneDrive 主要素材資料夾位置 |
| `reference-agents-evolution-record.md` | reference | AGENTS v1.0→v1.1 演化歷程紀錄位置 |

→ 有新 feedback / project / reference 時，update 對應檔，不要新增重複的。

---

## 與其他「記憶」概念的對比

| 概念 | 範圍 | 持久性 | 例子 |
|---|---|---|---|
| **Auto-memory** | 跨對話、Claude Code 內 | 高 | `.claude/projects/<proj>/memory/` |
| Conversation context | 單一對話內 | 對話結束就沒 | 當前對話 |
| Plan / Task | 單一對話的 in-progress | 對話結束就沒 | TaskCreate/TaskUpdate |
| **Wiki** | 跨對話、跨機、跨工具 | 最高 | `jacky-wiki repo` |
| **OneDrive 素材** | 跨機 | 高 | OneDrive |
| Git history | 永久 | 永久 | git log |

> **rule of thumb**：
> - 結晶知識 → wiki
> - 個人脈絡／偏好 → memory
> - 草案／素材 → OneDrive
> - 進行中工作 → Plan / Task / 對話

---

## 與 ailab 的關係

memory 是「**現在這對話需要你知道**」的快取；
ailab 是「**所有對話累積後結晶**」的長期庫。

兩者互補：
- 進入新對話：讀 MEMORY.md
- 對話中產生新 ailab 事件：寫 inbox（不直接寫 memory）
- 事件升格成穩定 fact：可 update memory（如 reference 類型）

---

## 相關連結

- 域首頁 → [AI實踐索引](../AI實踐索引.md)
- Claude Code → [claude-code](claude-code.md)
- 升格機制 → [三層萃取漏斗](../concepts/三層萃取漏斗.md)
