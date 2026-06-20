---
title: 簡報大綱 — 用 Claude Code 把文獻知識庫變成會自我更新的公開內容產品
domain: education
visibility: team
min_tier: L2
updated: 2026-06-01
audience: 內部團隊（含 AI 實踐新手）
duration: 25 分鐘
tags: 簡報大綱, AI, 多Agent, 零幻覺, 確定性管線
---

# 簡報大綱（約 22 張）

## Slide 1 — 標題
- 用 Claude Code 把文獻知識庫變成會自我更新的公開內容產品
- 一段對話：5 篇卡片 → 上線的 72 篇全文 + 每日自動新聞網站
- 重點不是做網站，是怎麼指揮 AI 做完大專案又不出幻覺

## Slide 2 — 成果一覽
- forest-lit.zeabur.app 已上線
- 72 篇全文文獻 + 跨產業分類 + 科技報 + 每日即時動態
- 與臺北市公有林 FDT 展示站雙站互連

## Slide 3 — 五個學習目標
- /goal + plan mode 近全自動
- 多 Agent 並行 + 書目逐字抓首頁
- 全文規則 = 資料體檢
- 即時內容用確定性程式、不經 LLM
- 工程慣例（互連／自動部署／不加依賴）

## Slide 4 — 心法一句話
- 先鎖方向（plan）、再放手（goal）
- 能並行就並行
- 能確定性就別用 LLM

## Slide 5 — 步驟 1：plan mode 先把計畫寫死
- 大專案直接叫 AI 做會亂發揮 / 做一半停下問
- plan mode 寫「鎖定決策、步驟、鐵則、驗收」
- 計畫裡明列「已鎖定決策（不要重問）」

## Slide 6 — 步驟 1：再用 /goal 放手
- /goal 起始指令 = 目標 + 計畫檔路徑 + 鎖定決策 + 步驟 + 鐵則
- AI 自走，只在真正屬於你的決策點停下來問
- 一條指令跑完多階段

## Slide 7 — 步驟 2：多 Agent 並行批次
- 每批 ~10 個 sub-agent，一個只做一篇
- 並行把 8 批做完只花數輪
- 主程式循序寫回 CSV（避免並行寫檔競態）

## Slide 8 — 步驟 2：書目逐字抓 PDF 首頁
- pdftotext 從本機真實 PDF 抽全文
- 標題/全部作者/期刊/年/卷期頁/DOI 一律逐字抄首頁
- 絕不憑檔名或記憶猜作者 → 根除作者幻覺
- read_depth = FULL_TEXT_CHECKED，數字附章節、引用附頁碼

## Slide 9 — 步驟 3：全文規則是資料體檢
- 堅持讀全文不只是品質，會逼出隱藏錯誤
- 三類問題：重複 / 壞檔 / 既有幻覺

## Slide 10 — 三類問題實例
- 重複：編號檔其實是既有 Xu/Zhang/Mo
- 壞檔：Cloudflare 攔截頁、ScienceDirect HTML 殼、403 假頁、抓錯論文
- 既有幻覺：Sasaki 標題掛錯、TianX 投影片數字錯

## Slide 11 — 步驟 4：即時內容的關鍵判斷
- 新聞／全球動態最不能讓 LLM 生成
- LLM 會編造假新聞、把舊的當新的
- 正解：確定性程式只抓真實來源

## Slide 12 — 步驟 4：抓哪些來源
- Crossref / arXiv / OpenAlex（新文獻）
- Google News RSS（新聞）
- data.gov.tw（政府開放資料）
- 全部免費無金鑰、純 Python 標準庫

## Slide 13 — 步驟 4：零幻覺三道保險
- 全程無模型，每則只存來源逐字欄位、點標題外連原始出處
- _seen.json 去重 + 日期窗 → 只收從沒見過且近期的
- 原子關鍵字命中（非 LLM 判斷）做相關性

## Slide 14 — 步驟 4：排程自動化
- GitHub Actions 雲端 cron 每日跑
- 抓取 → commit data/news → push → Zeabur 自動部署
- 不用開電腦；LLM 只在寫程式時用一次

## Slide 15 — 步驟 5：工程慣例
- 雙站互連（各 repo／各服務／同專案／互外連）
- Zeabur git-deploy，前台零 npm 依賴
- JSON 單一事實來源、dev 開發 / main 上線

## Slide 16 — 採坑點 1
- plan mode × goal Stop hook 互鎖（要執行 vs 禁執行）
- 解法：給明確出口（直接做／貼新 goal）或 ExitPlanMode

## Slide 17 — 採坑點 2
- 下載的 PDF 是假的（攔截頁／HTML 殼）
- 先驗 %PDF 檔頭，壞檔不產卡、列到校重抓

## Slide 18 — 採坑點 3
- 編號檔 ≠ 新論文，常與作者檔同篇
- 處理前用 DOI/標題去重

## Slide 19 — 採坑點 4-5
- arXiv 429 限流 → 3 秒間隔 + 退避重試 + 優雅略過
- Windows cp950 印外文崩潰 → stdout reconfigure utf-8

## Slide 20 — 採坑點 6-7
- 相關性閘：整句比對幾乎不中 → 改原子詞命中任一
- 既有幻覺只有讀全文才現形 → 定期全文體檢

## Slide 21 — 採坑點 8-9
- here-string 在 Bash 工具混入 @ → commit 改用 -F 訊息檔
- 大量 agent 觸發 session 額度 → 分批 commit + _ingest_plan.md 續跑依據

## Slide 22 — 快速回顧
- 先鎖方向、再放手、能並行就並行、能確定性就別用 LLM
- 入庫用多 Agent + 書目逐字抓首頁根除幻覺
- 新聞用確定性抓取 + 去重 + 雲端 cron 每天長真內容
- AI 把系統建好一次，之後系統自己跑
