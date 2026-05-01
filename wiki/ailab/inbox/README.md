---
title: ailab inbox
domain: ailab
updated: 2026-05-02
---

# ailab inbox

> 未升格的 AI 實踐事件暫存區。每個事件一份檔案：`<YYYY-MM-DD>-<event-slug>.md`。
> 格式：[實踐捕手協定 v1.0](../concepts/實踐捕手協定.md)。
> 升格規則：[三層萃取漏斗](../concepts/三層萃取漏斗.md)。

---

## 規則

- **進入低門檻**：值得記就丟，不問成熟度
- **不入門檻**：純情緒、純工作日誌、無關 AI 實踐的事
- **檔名**：`<YYYY-MM-DD>-<event-slug>.md`（slug 用英文短或中文都可）
- **不 commit 個別事件**：累積後跟 wiki 其他變更打包

---

## 升格

依事件成熟度，不依時間：

| maturity | 落點 |
|---|---|
| 想法 / 實驗中 | 留 inbox（或移 experiments/）|
| 已驗證 + 重複出現 | 升 patterns/ 或 tools/（連結到 cross-domain）|
| 已穩定 + 改變方法論 | 升 concepts/ 或 log/（重大里程碑）|

升格後在原 inbox 檔末尾標 `[已升格 → ailab/<目的>]`。

---

## 觸發方式

- Claude Code 內：`/ailab capture <一句話>`
- 其他 AI 對話：複製 [實踐捕手協定](../concepts/實踐捕手協定.md) prompt 給 AI 輸出後貼到 OneDrive/ailab-inbox/，再 `/ailab sync`
- 手機極簡：寫進 OneDrive/ailab-inbox/raw.md，再 `/ailab sync`

---

## 不要

- 不要把家人細節、客戶機密、未發表研究寫進來（隱私邊界）
- 不要重複事件（先 grep inbox 看有無同主題）
- 不要無限累積——超過 50 個沒處理就 `/ailab promote` 一輪
