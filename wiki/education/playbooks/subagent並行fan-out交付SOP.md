---
title: Subagent 並行 fan-out 交付 SOP（含 HTML→PDF 管線）
domain: education
visibility: team
min_tier: L2
updated: 2026-06-18
audience: 內部團隊 / AI 實踐者
prerequisite: 會用 Claude Code 的 Agent（subagent）工具、基本 bash
duration: 15 分鐘
tags: subagent, parallel, fan-out, agent-tool, html-to-pdf, headless-chrome, pypdf, delivery, visual-verify
source_chat: 2026-06-18 用 4 個並行 subagent 各設計一個學院的視覺風格、再合成交付 PDF
---

# Subagent 並行 fan-out 交付 SOP

> 一次派 N 個子代理、各做一塊、各自寫檔，最快拿到「彼此獨立但風格一致」的批量產出。
> 適合：多風格設計、多主題研究、多檔案改寫、多份文件各自生成。
> 與 [多 Agent 並行學術精修 SOP](多agent並行學術精修SOP.md) 的差別：那份是「把**一篇**長文拆給多 agent 壓縮」；本份是「**N 件獨立產物**各派一個 agent 從零做」。

## 前置條件

- 任務可拆成 N 件（建議 2–8 件）**彼此獨立、不互相參照**的產物。
- 每件有清楚、可一次說完的「自足規格」。
- 想在**單一對話內**完成（不必動 work-queue / daemon）。

## 步驟

### 1. 先寫「統一世界觀框架」（最關鍵）
把所有產物共用的骨架先寫死：命名、配色、結構、語氣／品牌聲音、**禁句**、彼此關係。
> 產出能不能咬合，全看這份框架寫得多死。框架鬆 → N 份各走各的。

### 2. 一則訊息同時派 N 個 Agent（真並行）
在同一個回合裡開 N 個 Agent 工具呼叫（不要一個一個等）。每個 prompt =
- 共用框架（整段貼）
- 該塊的專屬規格
- **明確指示**：用 Write 工具把成品寫到 `<指定絕對路徑>`；**回傳只給「設計選擇摘要」5–8 行**。

### 3. 產物落檔、不回主 context
要求 agent 把大型產物（HTML／長文）直接寫檔，**不要回傳全文**。
> 這是 fan-out 能規模化的關鍵——主代理 context 不被 N 份大檔塞爆。

### 4. 跑「驗收三關卡」（fan-out 後必做，見下）

### 5. 組裝
主代理寫總覽／索引，或把多份 PDF 合併（見「HTML→PDF 管線」）。

## 驗收三關卡（並行的代價是要驗收）

| 關卡 | 做法 | 防什麼 |
|---|---|---|
| **死亡偵測** | 逐一確認每個產出檔**存在且非空**；agent 回 `subagent_tokens: 0` = 死了 | subagent socket 斷線→缺一塊，**只補跑死的那個**，別重跑全部 |
| **視覺驗收** | 產物是頁面就 `chrome --headless --screenshot` 截圖，親眼看過 | 版面跑掉、顏色錯、中文豆腐 |
| **禁句複檢** | 回收後 `grep` 掃禁句（如「不是X是Y」反轉句式） | prompt 下了禁令 agent 仍偶爾犯 |

## 配套：HTML → PDF 交付管線（無 poppler 環境）

fan-out 常產出多個 HTML，要合成可分享 PDF：

```bash
# 1) 注入列印 CSS 到暫存檔
#    淺底/顏色要印出來： @media print{*{-webkit-print-color-adjust:exact}@page{size:A4;margin:10mm}}
#    JS 切換式單頁要攤開： .view{display:block!important} + section+section{page-break-before:always}

# 2) headless chrome 印 PDF
google-chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=out.pdf --virtual-time-budget=4000 "file://$PWD/_p.html"

# 3) 多檔合併（無 pdfunite / gs 時，用 pypdf）
python3 - <<'PY'
import pypdf
w = pypdf.PdfWriter()
for f in ["a.pdf", "b.pdf", "c.pdf"]:
    for p in pypdf.PdfReader(f).pages:
        w.add_page(p)
w.write(open("merged.pdf", "wb"))
PY

# 快檢頁數： d.count(b'/Type /Page') - d.count(b'/Type /Pages')
```

## 異常分支

| 狀況 | 處理 |
|---|---|
| 某 agent 回 0 token / 報 socket error | 補跑該塊（同 prompt 再派一次），別動其他已成功的 |
| 產物彼此開始需要參照 | 不適用 fan-out，改 pipeline 或先做一份打樣再展開 |
| 規格還沒收斂 | 先主代理做一份打樣 → 確認 → 再 fan-out 其餘 |
| 超過 ~8 件且每件很重 | 改 work-queue daemon 版（見下方相關連結） |
| PDF 背景色掉 | 沒注入 `print-color-adjust:exact` |
| PDF 只印第一頁 | JS 切換頁沒注入「攤開」CSS |
| Read 工具看不了 PDF | 本機缺 poppler；改 chrome 截圖驗 |

## 驗收標準

- N 個產物檔全部存在、非空、截圖過。
- 風格/邏輯一致（框架有貫穿）。
- 禁句 grep 乾淨。
- （若要 PDF）合併檔頁數正確、顏色正常。

## 相關

- 同類但拆單篇：[多 Agent 並行學術精修 SOP](多agent並行學術精修SOP.md)
- 個人視角／原始脈絡：[ailab 模式索引](../../ailab/patterns/模式索引.md)
- 反面教材：[Subagent 與交付採坑點](../pitfalls/subagent與交付採坑點.md)
