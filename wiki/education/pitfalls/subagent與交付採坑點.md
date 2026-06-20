---
title: Subagent 並行與交付 — 採坑點
domain: education
updated: 2026-06-18
audience: 內部團隊 / AI 實踐者
prerequisite: 用過 Claude Code subagent、headless chrome 出 PDF
duration: 8 分鐘
tags: subagent, parallel, pitfalls, html-to-pdf, headless-chrome, gog, drive, brand-voice
source_chat: 2026-06-18 用並行 subagent 設計四學院視覺 + 交付 PDF + 上傳 Drive
---

# Subagent 並行與交付 — 採坑點

> 反面教材。並行 fan-out 與「HTML→PDF→上雲」交付過程中實際踩到的雷。配對 [Subagent 並行 fan-out 交付 SOP](../playbooks/subagent並行fan-out交付SOP.md)。

## 1. Subagent socket 斷線 → 回 0 token，產物缺一塊
一則訊息派 4 個 agent，1 個 `subagent_tokens: 0`（socket 斷線），那一塊**根本沒產出**。若沒檢查就往下走，交付物默默少一份。
→ **fan-out 後必逐一確認每個產出檔存在且非空**；死的**只補跑那一個**（別重跑全部、別假設全成功）。

## 2. 深色底不是安全選擇 → 對外提案被打槍
第一版做成深色底炫技頁，被嫌「視覺太差」。
→ **對外提案預設淺底 + 走品牌視覺系統**。深色頁留給內部工具/儀表板，不要拿去當門面。

## 3. gog drive mkdir 沒回 ID → 誤判失敗 → 建了兩個重複資料夾
`gog drive mkdir ... -p` 的輸出沒被脆弱的文字解析抓到 ID，誤以為失敗 → fallback 又建一次 → 出現**兩個同名資料夾**。
→ 建夾後**先 `ls` 確認、用 JSON/穩定欄位抓 ID**，別靠 `grep` 猜；發現重複立刻 `gog drive rm <id>`（trash）掉多的。

## 4. headless chrome 印 PDF：淺底背景色會掉
預設列印不印背景色，淺底頁的色塊/院色全變白。
→ 印前注入 `@media print{*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`。

## 5. JS 切換式單頁 → 直接印只出第一頁
deck/tab 用 `display:none` 只顯示當前頁，print 只抓得到第一頁。
→ 印前注入 `.view{display:block!important}` + `section+section{page-break-before:always}` 把全部攤開、每段分頁。

## 6. Read 工具看不了 PDF（缺 poppler）
本機沒 `pdftoppm/pdftotext` → Read 工具無法渲染 PDF 驗收。
→ 改 `chrome --headless --screenshot` 截 PNG 驗版面；文字抽取用 `pypdf`。

## 7. 合併 PDF 沒有 pdfunite/pdftk/gs
常見合併工具都不在 → 卡住。
→ 用 **`pypdf`**（`PdfWriter().add_page`）合併，多半已隨環境安裝。

## 8. 品牌禁句：下了禁令 subagent 還是會犯
prompt 明令「禁『不是X是Y』反轉句」，回收後仍在某標題出現「…，員工不是。」。
→ **回收後一定 `grep` 複檢禁句**，不能信任 prompt 一次到位；抓到直接改。

## 相關
- SOP：[Subagent 並行 fan-out 交付 SOP](../playbooks/subagent並行fan-out交付SOP.md)
- 反幻覺類採坑：[Gmail 量寄與跨客戶洩漏掃描採坑點](gmail量寄與跨客戶洩漏掃描-採坑點.md)
