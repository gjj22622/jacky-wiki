---
title: Jacky Wiki 啟動日完整進度報告
domain: root
updated: 2026-04-29
---

# Jacky Wiki 啟動日完整進度報告
**日期**：2026-04-29｜**作者**：鐘基啟（Jacky）× Claude

---

## 🎯 今天做了什麼

從零開始，在一天內完成個人 LLM Wiki 的完整建置。

---

## 📐 系統架構

```
G2 mini（Ubuntu）~/jacky-wiki   ← 主力編輯端（Claude Code）
        ↕ git push / pull
GitHub（私有）jacky-wiki         ← 同步橋梁
        ↕ git pull
筆電（WSL2 Ubuntu）~/jacky-wiki  ← 第二工作端（Claude Code）
筆電（Windows）C:\Users\gjj22\jacky-wiki ← PowerShell 查閱端
```

---

## 🗺️ 知識域設計

透過 AI 訪談（4 輪 11 個問題）問出大腦地圖，產出客製化 CLAUDE.md Schema。

| 域 | 說明 | 狀態 |
|----|------|------|
| ⭐ shuangyun | 双云行銷 AI 轉型 | **27 頁，充實** |
| tbsa | TBSA 協會、AI 教師研習 | 0 頁，待建 |
| nchu | 中興大學博士研究 | 0 頁，待建 |
| yinian | 一念清涼專案 | 0 頁，待建 |
| laodehao | 老的好回憶錄 | 0 頁，待建 |
| cross-domain | 跨域洞察 | 2 頁，起步 |

---

## 📊 今日成果統計

| 項目 | 數量 |
|------|------|
| 總頁面數 | **31 個 .md** |
| Git commits | 4 次 |
| 處理的 OneDrive 資料夾 | 4 個 |
| 萃取的隱性知識 SOP | 1 個（找賣點，Step 1-2） |
| 跨域洞察頁 | 1 個（賣點命名理論） |
| 涵蓋的 Skill | 22 個 |

---

## 🏗️ Wiki 完整結構

```
wiki/  (31 個 .md)
├── index.md                    ← 總覽
├── log.md                      ← 操作日誌
├── cross-domain/               (2 頁)
│   ├── index.md
│   └── sellpoint-naming-theory.md  ← 賣點命名理論
└── shuangyun/                  (27 頁)
    ├── index.md
    ├── concepts/               (5 頁)
    │   ├── agents-knowledge-system.md   ← AGENTS® 方法論全書
    │   ├── agents-certification.md      ← L1/L2/L3 認證手冊
    │   ├── agents-methodology.md        ← 双云專案落地狀態
    │   ├── ai-marketing-team.md         ← AI 行銷部定義
    │   └── lesson-prep-workflow.md      ← AI 備課 7 階段流程
    ├── courses/                (5 頁)
    │   ├── index.md
    │   ├── week2.md ~ week5.md ← 拆建修串通
    ├── skills/                 (13 頁，涵蓋 22 個 Skill)
    │   ├── index.md
    │   ├── api-gateway.md
    │   ├── scoring-agent.md
    │   ├── completion-coach.md
    │   └── ... (9 個獨立頁 + 3 個集成頁)
    ├── cases/                  (2 頁)
    │   ├── lian-restaurant.md       ← 濂-直火割烹（浮誇感）
    │   └── shenguang-construction.md ← 晟光建設（狂）
    └── sop/                    (1 頁)
        └── finding-sellpoint.md     ← 找賣點 SOP（Step 1-2）
```

---

## 💡 今日最重要的洞察

從濂餐廳和晟光建設兩個案例萃取出的**賣點命名三原則**：

1. **極度精簡**（一個詞）
2. **帶情緒強度**（誇張、偏執、視覺衝擊）
3. **通過翻轉測試**（第一眼像負面詞，競品不敢用）

**黃金法則**：「猶豫感本身就是找到賣點的信號。」

這個洞察已升級為跨域理論，同時適用於双云客戶操作和 TBSA 教學評分框架。

---

## ⏳ 待處理清單

### shuangyun 域（還剩）
- [ ] 04_助教Agent設定檔（5 個助教）
- [ ] 07_殘酷測試素材（方法論層）
- [ ] 08_Agent工廠API互控落地手冊
- [ ] 13_客戶Agents_20260421（母親節品牌貼文）

### 其他域
- [ ] tbsa 域：TBSA開課流程自動化、建立TBSA商務企劃口說知識體系
- [ ] nchu 域：論文、研究筆記
- [ ] yinian 域：佛學寓意故事
- [ ] laodehao 域：Facebook 回憶錄

### 系統建置
- [ ] 安裝 Obsidian 查看知識關聯圖
- [ ] 設定 Cowork Wiki 查詢 Skill（Wiki 頁面夠多後）
- [ ] 考慮發布成內部網頁（供团隊查詢）

---

## 🔧 工作準則（從今日 ingest 提煉）

1. **程式碼不進 Wiki**：只摘設計理念，不搬 .ts/.py 等原始碼
2. **去重優先**：同一方法論只存一份，其他頁面用連結指向
3. **版本選最新**：多版本並存時採 v3，舊版標記「歷史參考」
4. **命名衝突要分流**：加頂部註記說明各頁面定位差異
5. **每次 ingest 後更新 index.md**：保持導航準確
6. **跨域洞察主動建立**：發現跨域規律立即到 cross-domain/ 建頁

---

*進度報告版本：v1.0 | 2026-04-29*
