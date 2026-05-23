---
title: AI 撰寫嚴謹科學論文 — 三層查核與 J博 skill（簡報大綱 25 張）
domain: education
updated: 2026-05-23
parent: README.md
---

# Slides Outline — 25 張投影片

> 餵 huashu-design 產 .pptx。每張 3-5 個 bullet。

---

## Slide 1：封面

- AI 撰寫嚴謹科學論文
- 三層查核與 J博 skill
- 2026-05-23 · Jacky × Claude
- 副標：「之前 reviewer 沒抓到 ≠ OK」

## Slide 2：為什麼要做這場

- 2026-05-22~23 跨日 TJFS 投稿衝刺實證
- 「形式 91% 完成度」三輪查核後真實只有 65%
- 11 處致命錯，差點直接 desk reject
- 這場把實戰整理成可重複套用方法論

## Slide 3：核心問題

- Jacky 問：「我要怎麼確定你（AI）的內容是真實的？」
- 答：你「沒辦法」百分之百確定 — 這是 AI 寫作的本質限制
- 但可以靠**三層查核 + 5 大幻覺清單 + 整合修補 + 驗收**逼近真實

## Slide 4：AI 寫作的本質風險

- statistical language model 偏向「合理性」優先於「真實性」
- 真實風險：書目細節錯、轉述漂移、論點混淆、author 編造
- Reviewer 一翻 PDF 即抓 → directly 質疑作者誠信
- 這不是訓練不足，是 statistical 本性

## Slide 5：5 大典型幻覺概覽

- ① N 篇記憶高估（90 → 真實 57）
- ② 檔名擴散幻覺（Sasaki 級）
- ③ 數字搬家幻覺（Qiu 級）
- ④ 整串作者錯（Krause / Jiang / Chen 全錯）
- ⑤ Initial 錯（Lin D ≠ E 等）

## Slide 6：幻覺 ① N 篇記憶高估

- 症狀：印象 90 篇文獻、實際 57 條
- 機制：人對「努力量」記憶 > 實際交付量
- 抓法：Python 數三方真相（主稿 / Excel / PDF 資料夾）
- 教訓：不問人、不問 AI、自己跑 grep

## Slide 7：幻覺 ② 檔名擴散（Sasaki 級）

- 症狀：ref 條目題目 ≠ DOI 對應論文
- 機制：資料夾兩份 PDF（一正確一錯誤檔名）
- 抓法：階 3 audit + pdftotext 抽第一頁
- 案例：Sasaki and Abe 2025，R1 修正只比 DOI 沒比題目，幻覺保留 5 輪

## Slide 8：幻覺 ③ 數字搬家（Qiu 級）

- 症狀：數字真實存在 PDF，但被搬到錯誤論點
- 例：Qiu 91.3/94.70/91.9 真實是視辨識/DBH/H，主稿寫成 GPP/AGB/NPP
- 比「數字錯」更危險：reviewer 第一眼 PASS、翻 PDF 才發現
- 抓法：階 2 PDF 段落 + 表格 + 論點三重 verify

## Slide 9：幻覺 ④ 整串作者錯

- 症狀：ref list 全部作者錯
- 例：Krause #45「S./T.G.M./J.-P./K.」真實「P./B./A./M./M./P./L.P.」
- 機制：LLM 憑想像生成「合理感」co-author
- 抓法：Crossref API 全欄位比對作者陣列

## Slide 10：幻覺 ⑤ Initial 錯

- 症狀：Lin E ≠ D、Pan T-Y ≠ H-L、Li X ≠ H
- 機制：常見姓 + 多重 initial 組合 LLM 容易猜錯
- 抓法：Read PDF full name + Crossref initial 雙重
- 中文姓作者特別易踩

## Slide 11：完整 SOP — 4 階段

- 階段 1：三層查核（並行 3 agent，4-6 小時）
- 階段 2：整合修補（**單一** agent，2-3 小時）
- 階段 3：驗收（輕量 agent，30-60 分鐘）
- 階段 4：重生交付（python-docx，10 分鐘）

## Slide 12：階段 1 — 三層查核

- Agent A：Crossref 全篇 ref（每條 API 比 7 欄位）
- Agent B：PDF 引用句逐筆比對（深讀 24 條）
- Agent C：檔名 vs 真實題目 audit（防 Sasaki 級）
- 三 agent **並行**啟動，獨立報告

## Slide 13：階段 2 — 整合修補

- **不可並行！** 修補會動同個檔案
- 一個 agent 一次處理所有 P0+P1
- 紅線：不新增 ref、不動 anchor、不重生 docx
- 找第 N+1 處新致命錯 → 只記錄不修

## Slide 14：階段 3 — 輕量驗收

- 只驗剛修過的部分（不重跑全篇浪費 token）
- Crossref 重跑被修的 N 條
- 核心 anchor + 紅線全 PASS
- 副作用 spot check（沒新引入錯誤）

## Slide 15：階段 4 — 重生交付

- python-docx 規格嚴格（A4 / 3cm / Times New Roman + 細明體 12pt / double-spaced）
- Table → real Word table（不是文字）
- Figure caption 純 text
- 新檔名保留軌跡，**不覆蓋舊版**

## Slide 16：工具棧

- Crossref API（免費、無 key）
- Read PDF（Claude Code 內建）
- Python + requests / openpyxl / python-docx
- Edge TTS（可選，音檔校對）
- `/jbo` skill（整合一鍵觸發）

## Slide 17：`/jbo` skill 4 個 mode

- `/jbo sanity` — 5-10 anchor 快查
- `/jbo full <主稿>` — 完整三輪查核
- `/jbo fix` — 整合修補
- `/jbo verify` — 輕量驗收

## Slide 18：J博主動觸發規則

- 累積 ≥ 5 新 ref → 主動建議
- 寫作 ≥ 3 小時 → 主動建議
- 投稿衝刺最後 7 天 → 主動提醒
- 作者說「真實嗎」「對嗎」「查一下」 → 必觸發

## Slide 19：採坑 #1 — DOI 對 ≠ ref 對

- R1 只比 DOI 不比 title
- Sasaki 幻覺漏抓 5 輪
- 解法：Crossref 必比 7 欄位

## Slide 20：採坑 #2-3 — 並行修補 / 任務蔓延

- 修補不可並行（merge conflict）
- 「順手修第 N+1 處」會破壞清單契約
- 解法：brief 寫死「只記錄不修」

## Slide 21：採坑 #4-5 — 出版社 403 / PDF 假檔

- MDPI/Wiley Cloudflare 擋 WebFetch
- 本機 PDF 可能是 HTML 偽裝
- 解法：建 fallback 鏈、跑 PDF 完整性 audit

## Slide 22：採坑 #6-7 — 年份爭議 / docx 覆蓋

- print year vs OnlineFirst 年份必須統一
- docx 重生用新檔名，**不覆蓋**
- 軌跡保留供 reviewer 追溯

## Slide 23：採坑 #8 — workflow 失憶

- 高價值 SOP 沒結晶 → 跨對話失憶
- 解法：跑完即 `/internal-training` + `/jbo` skill + memory
- 投資建立 = 後續所有專案受惠

## Slide 24：實戰成果（2026-05-22~23）

- 三輪 audit 抓 11 處致命錯
- 五輪精修共修 23 處 P0 + 8 處 P1
- 投稿準備度 50% → 80%
- 寫作完成度 65% → 95%

## Slide 25：總結 — 三個帶走

- **AI 學術寫作必跑三層查核**（不是更好 prompt 能解）
- **修補不可並行**、**修完必驗收**、**docx 不覆蓋舊版**
- **裝 `/jbo` skill**，下次任何學術寫作 → 一鍵觸發

備註：
- 25 張投影片約 35-40 分鐘
- 適合內訓 + 學術 AI 使用者
- 後續可餵 huashu-design 產 .pptx
