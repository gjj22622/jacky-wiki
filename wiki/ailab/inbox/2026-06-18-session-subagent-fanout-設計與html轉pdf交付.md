---
session_date: 2026-06-18
session_topic: 用並行 subagent fan-out 設計多風格視覺＋headless chrome HTML→PDF 交付管線
model: claude-opus-4.8
context: AIRUN AI 管理學院產品設計（四學院制 + 提案文件）
duration: 多輪跨日
type: session-summary
tags: subagent, parallel, fan-out, html-to-pdf, headless-chrome, pypdf, brand-voice, anti-hallucination, visual-verify
---

> 隱私邊界：本檔只記通用 AI 實踐技術；客戶名與機密一律不入 ailab。

## 最終做法（What Worked）

- **並行 subagent fan-out 設計法**：要做 N 件「彼此獨立但要風格一致」的產物（四學院各一頁、四設計師各一風格）時——
  1. **主代理先定統一世界觀框架**（四院晉升階梯、院色、院訓、品牌聲音、禁句），確保 N 份產出咬合。
  2. **一則訊息裡同時 spawn N 個 Agent**（真並行），每個 agent 只負責一塊，prompt 內嵌共用框架 + 該塊的專屬指令。
  3. **令 agent 直接用 Write 工具把成品寫到指定絕對路徑**，回傳只要「設計選擇摘要」——**HTML 全文不回主代理 context**（省大量 token）。
  4. **逐一截圖驗收**：`google-chrome --headless --screenshot` 每份產物都看過再交付。
- **HTML→PDF 交付管線（無 poppler 環境）**：
  - 渲染：`google-chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf --virtual-time-budget=4000 file://...`
  - 顏色不掉：先注入 `@media print{*{-webkit-print-color-adjust:exact}@page{size:A4;margin:10mm}}` 到暫存 `_p.html` 再印（深色塊/院色才會印出來）。
  - 切換式單頁（display:none 的 tab/slide）要全攤開：印前注入 `.view{display:block!important}` + `section+section{page-break-before:always}`。
  - 合併多 PDF：**無 pdfunite/gs 時用 `pypdf`**（`PdfWriter().add_page`）合併。
  - 頁數/大小快檢：`python3 -c "d=open(...).read(); print(d.count(b'/Type /Page')-d.count(b'/Type /Pages'))"`。
- **反幻覺身份查證**：查人物（導師身份）先掃本地→Drive→web，**鐵證（Drive 官方教材 + web 多源）才下結論，查不到就明說「沒找到、不編」**，並請使用者補關鍵識別碼。
- **品牌聲音強制**：subagent prompt 明令「禁『不是X是Y』反轉句」；回收後仍 `grep` 複檢，抓到一處違規（標題）直接改掉。

## 繞路紀錄（Detours）

- PDF 想用 Read 工具看 → 需 poppler（本機無 pdftoppm）→ 改 `chrome --screenshot` 截圖驗收。
- 合併 PDF 想用 `pdfunite`/`pdftk`/`gs` → 全無 → 發現 `pypdf` 已安裝，改用它合併。
- HTML deck 是 JS 切換 slide（只顯示 .on）→ 直接 print 只出第一頁 → 注入 print CSS 把全部 .view 攤開、每段 page-break。
- 淺底頁印 PDF 顏色掉 → 預設 print 不印背景色 → 注入 `print-color-adjust:exact`。

## 錯誤與失敗（What Failed）

- **subagent socket 斷線回 0 token**：一則訊息 spawn 4 個，1 個死掉（`subagent_tokens: 0`），產物缺一塊。教訓：fan-out 後**必檢查每個產出檔是否存在、是否 0 token，缺的補跑**，別假設全成功。
- **深色底視覺被打槍**：第一版交互式頁用深色底，被嫌「視覺太差」→ 學到對外提案**預設淺底 + 走品牌視覺系統**，深色不是安全選擇。
- **gog drive mkdir 重複建夾**：`mkdir -p` 沒成功解析回傳 ID → 誤判失敗 → fallback 又建一次 → 出現兩個同名資料夾。教訓：建夾後先 `ls` 確認、用 JSON 輸出抓 ID，別靠脆弱的文字解析；發現重複立刻 trash 多的。

## 升格候選

- ⭐ **並行 subagent fan-out 設計法** → 新增 `patterns/subagent並行fan-out設計法.md`（已動手），與 [[AI團隊三線並行開發模式]]（work-queue daemon 版）區隔並互連。
- ⭐ **HTML→PDF 交付管線（chrome+pypdf+print-CSS 注入）** → 收進該 pattern 的「配套交付工具」段（已動手）；日後若獨立成熟可拆 `tools/`。
- **subagent 死亡偵測補跑** → 併入上述 pattern 的「驗收關卡」。
- gog mkdir 重複夾雷 → 留 inbox 即可（單點操作雷，未到升 tools 門檻）。

## 待延伸（Next）

- subagent fan-out 自動「死亡偵測 + 自動補跑」封裝（目前手動檢查）。
- HTML→PDF 管線封裝成一個可重用腳本（接 file 清單 → 出合併 PDF）。
- 觀察 fan-out 在「彼此需參照」（非完全獨立）任務上的退化情形，補邊界。

---
[已升格 → education/playbooks/subagent並行fan-out交付SOP.md + education/pitfalls/subagent與交付採坑點.md（2026-06-18）。ailab/patterns/subagent並行fan-out設計法.md 瘦身為個人視角 stub。本 session 留 inbox 當原始脈絡。]
