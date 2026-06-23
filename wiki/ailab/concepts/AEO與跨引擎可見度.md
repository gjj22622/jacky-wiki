---
title: AEO 與跨引擎可見度（AEO = SEO 基本盤 + 跨引擎）
domain: ailab
updated: 2026-06-23
---

# AEO 與跨引擎可見度 ⭐

> 一句話定調：**AEO ≠ 反 SEO。AEO = SEO 基本盤 + 跨引擎可見度**（多了 Google 以外的 ChatGPT/Perplexity/Claude）。

## 核心觀念

- **Google 官方立場（2026）**：「good SEO is good GEO」——AI 功能蓋在既有排名系統上，不需另一套 AEO 方法論。並明示：**別做 llms.txt（對 Google Search 無用）、別人工 chunk、別信第三方 SEO 工具指標**，要用真實商業結果＋Search Console AI 報表衡量。
- **我的取捨**：內容哲學跟 Google **完全同向**（獨特第一手、E-E-A-T、對人好＝對 AI 好）。分歧只在**技術清單的權重**：
  - **llms.txt**：Google 不認、主流引擎也未官方承諾消費 → 從「P1 必做」降成「非 Google 引擎、低信心、加分項」。
  - **FAQPage**：Google 2023 已砍一般站 FAQ rich result → 去掉「最高 ROI 4.2×」吹捧，價值改回「機器可理解的問答結構本身」。
  - **答案先行**：好（真把問題答好）；但**禁止為了被機器抽取而人工 chunk／堆同義句**（Google 列為 bot-optimization）。一句檢核：**把 schema 拿掉，這段對人還站得住嗎？**
- **我們的價值在哪**：**跨引擎**——Google 只代表它自己那台引擎；我們的 SOV 掃描跨 ChatGPT/Perplexity/Claude，量「AI 推不推薦你」，這是 Search Console 給不了的。但**別拿 Google 不認的招（llms.txt/FAQ 版面紅利）當主賣點**。

## 指標紀律
- **北極星＝真實商業結果（lead/詢問/成交）> 一切指標**。
- `first_pick_rate`（AI 首推率/SOV）只作**方向訊號**，不是成績單——它正是 Google 提醒「別當 KPI」的第三方工具指標，且實測**單輪 ±6pp 雜訊**（見 [[指標雜訊底先測]]）。

## 連結與出處
- 來源：Google「AI search era brand authority strategy」(business.google.com/think) + 我方 aeo-scorer/工作說明書比對（2026-06-23）
- 實作：AIRUN `aeo-scorer.js`（已對齊：llms.txt P1→P3、FAQPage 去 4.2×）、`strategy/aeo-content-agent-工作說明書.md`（北極星改商業結果）
- 同血脈：[[指標雜訊底先測]]、[[自我進化規則loop]]（規則會變→自動跟進校準）
