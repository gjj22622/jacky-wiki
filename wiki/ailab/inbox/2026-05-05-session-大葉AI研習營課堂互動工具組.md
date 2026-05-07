---
session_date: 2026-05-05
session_topic: 為大葉AI研習營製作三支課堂互動HTML工具組（課程導覽 + Gem設計工坊）
model: claude-sonnet-4.6
context: 大葉大學AI教師研習營（202605）
duration: ~3h（跨兩段對話）
type: session-summary
tags: html-tools, gem-workshop, pptx-scan, python-pptx, localStorage, course-portal, agents-method
---

## 最終做法（What Worked）

**工具架構：純 HTML 單檔、無後端、無框架**
- 所有 JS/CSS 內嵌，老師直接本地開啟 .html 使用，零部署門檻
- localStorage 做輕量狀態持久化（步驟進度、作業勾選）
- URL hash (`#day1`, `#bridge`, `#day2`) 做分頁路由

**先掃 PPTX 再做模板（關鍵順序）**
- 用 `python-pptx` 寫 `_scan_gem_slides.py`，關鍵字過濾 + 前 120 字截取
- 確認 PPTX 實際框架後才設計 Gem 模板內容，不依賴文字稿
- 腳本可快速重跑，確認假設

**課程導覽三大機制**
- 計時器：`setInterval` + 最後 60 秒變色 + Web Notification + 視覺 border-flash
- 40h 橋：硬碼倒數到 `2026-05-08T09:00:00+08:00`
- 步驟追蹤：4 步圓圈可點擊 + localStorage 記憶 + 文字提示同步更新

**Gem 設計工坊七區塊 = PPTX P.90 的框架**
- Role / Mission / User / Workflow / Input / Output / Guard
- 必填：Role / Mission / Input / Output（四個）
- SVG 圓環 completeness ring 即時顯示填寫進度

**AGENTS 方法論視覺條**
- 位置：header 與 tab nav 之間（常駐顯示，不隨 tab 切換消失）
- A(拆)/G(建)/E(修)/N(串) = 紫藍漸層亮色；T(管)/S(交) = 虛線灰淡（暑假進階課鉤子）
- footer 三個 badge：本場範圍 / 兩圈結構 / 暑假鉤子

---

## 繞路紀錄（Detours）

- **先用逐字稿做 Gem 模板** → 發現逐字稿（v2 規劃版）從未被實作進最終 PPTX（Final 是德明 Master 改造版）→ 廢棄逐字稿版，改掃 PPTX → 七區塊名稱與模板內容全部重寫
- **Persona 8 欄位第一版用逐字稿版**（基本資料/動機/痛點/目標/行為/環境/抗拒/證明）→ PPTX P.58 是完全不同的另一套（基本背景/人口統計/身份標籤/目標/碰到什麼挑戰/你能提供什麼/最常見的疑慮/真實的引言）→ 改
- **③ 區塊改名 User 後，goStep2() 的自動預填邏輯未同步** → 「課程+學生背景的拼接字串」改為「教師情境的簡短描述」

---

## 錯誤與失敗（What Failed）

- **關鍵假設錯：逐字稿 ≅ 最終 PPTX** → Day1_主講簡報_文字稿_v1.md 是 4/30 後規劃的重新設計方案，最終 PPTX 是德明 8 小時 Master 直接改造，兩份根本不同結構
- **第一版七區塊全錯**（角色定位/任務目標/背景知識/輸出格式/思考流程/限制條件/互動方式 ≠ PPTX 教的框架 Role/Mission/User/Workflow/Input/Output/Guard），等到用戶問「你有跟我的簡報實作對齊嗎？」才發現 → 補救成本高

---

## 升格候選

- ⭐ **「製作課堂工具前先掃原始教材」模式** → 升 `ailab/patterns/課堂工具開發流程.md`（已驗證，本次靠這個救回）
- **純 HTML 單檔工具組架構** → 升 `ailab/tools/課堂互動工具設計.md`（已驗證，下次複製用）
- **「逐字稿未必等於最終版」警示** → 在相關教學工作流 SOP 加一條查驗步驟（已驗證）
- localStorage 輕量狀態管理 → 留 inbox，累積 2-3 個案例再升

---

## 待延伸（Next）

- 三支工具上架：DataRoom 資料夾 → QR Code + Google Drive 連結（5/5 截止）
- 上課後（5/6、5/8）收集老師使用回饋：哪支工具最有用？Gem設計工坊的 Role→Guard 框架是否清楚？
- 若老師反映方法論條太密 → mobile 版改為可折疊
- 三色殘酷測試沙盒（`三色殘酷測試沙盒_v1.html`）狀態待確認是否需要更新
