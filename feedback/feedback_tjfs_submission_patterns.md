---
name: tjfs-submission-patterns
description: Jacky TJFS 投稿真實慣例 — 三方共識 + 官方稿約對齊
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b68d2b56-fa80-4905-9f52-2fe11ece5acf
---

# Jacky TJFS 投稿真實慣例（三方共識 + 官方稿約對齊）

**建檔日期**：2026-05-24
**配套 skill**：`~/.claude/skills/journal-chinese-forestry/`（升級 v2.0）
**權威來源**：`skill/references/official/tjfs_official_guidelines_2025-06-19.md` + 3 份真實 published PDF 樣板

---

## Jacky 投稿常見 desk reject 風險（從 5/22-5/24 三輪查核經驗）

### 風險 1：字數搞錯

- ❌ 之前以為 14 印頁 / 25,200 字（Monograph 數字）
- ✅ Review article 正確：**15 印頁 / 21,750 中文字 / 7,500 英文 word**
- 來源：官方稿約 P1 §一-四 + P4 §I-4

### 風險 2：[in Chinese] tag 拼錯

- ❌ 之前寫 [in Chinese with English **summary**]
- ✅ 官方 + 三方統一：[in Chinese with English **abstract**]
- 來源：官方稿約 P5 §A、§E-(A) 範例

### 風險 3：ACKNOWLEDGMENTS 拼錯

- ❌ 容易寫成 ACKNOWLEDGEMENTS（有 E，英式）
- ✅ 官方稿約 + 三方主流：ACKNOWLEDGMENTS（**無 E**，美式）
- 例外：TJFS 39(1) 2024 Chen YJ 用了有 E 拼法 → 偏離主流，不模仿

### 風險 4：頁碼 dash 用錯

- ❌ 容易用 en-dash `–`（U+2013）
- ✅ 官方 + 三方：hyphen `-`（U+002D）+ 縮寫前段重複數字（543-49 不是 543-549）
- 來源：官方稿約 P2 §七-3-(1)、P5 §D

### 風險 5：References 章名用錯

- ❌ 容易寫 REFERENCES / BIBLIOGRAPHY / 參考文獻
- ✅ 官方 + 三方：**LITERATURE CITED** / **引用文獻**
- 來源：官方稿約 P1 §二-二

### 風險 6：CONCLUSIONS 用單數

- ❌ 容易寫 CONCLUSION（單數）
- ✅ 官方 + 三方主流：CONCLUSIONS（複數），可加 AND SUGGESTIONS
- 例外：TJFS 39(1) 2024 Chen YJ 用單數 → 偏離

### 風險 7：「Summary」「Key words」誤用

- ❌ 容易寫 Summary / Key words
- ✅ 官方稿約 + 三方：**Abstract** / **Keywords**

### 風險 8：連續行號未開啟

- ❌ Word 預設不開
- ✅ 官方稿約 P3 §參-一明文要求「**連續行號**」
- 開啟：版面配置 → 行號 → 連續

### 風險 9：段落格式不對

- ❌ 段落起頭 4 空格 / 段落間無空白行
- ✅ 官方稿約 P3 §參-一：**段落間留一空白行，起頭留 2 字元**

### 風險 10：圖表編號縮寫

- ❌ 用 Fig. 1（縮）
- ✅ 官方稿約 P3 §八-7：**Figure 1**（全寫，包含照片）
- 例外：APPENDIX 內可用 Fig. S1（業界慣例）

### 風險 11：學名後續未縮寫

- ❌ 後續都寫全名
- ✅ 官方稿約 P3 §參-五：首次完整 *Alpinia zerumbet* (Pers.) B.L.Burtt → 後續 *A. zerumbet*

### 風險 12：宣稱 SCI/SCIE 期刊

- ❌ TJFS 不在 SCIE（Clarivate coverage 1998-2021 已停止）
- ✅ 正確說法：「Scopus Q4 Forestry indexed」
- 來源：三方查核 2026-05-22

---

## TJFS 編輯部偏好（從三方比對 PDF 觀察）

### 偏好 1：英文投稿 + 中文長摘要格式

- 三方有兩篇（Chen 2026、Satoyama 2026）採此格式
- 中文長摘要 1,000-1,500 字 4 段：**背景 → 材料與方法 → 結果與討論 → 結論**
- 「背景」（不用「緒言」）— 對應稿約 P1 §一-三-2 明文

### 偏好 2：中文投稿時用「前言」不用「緒言」

- 稿約字面寫「緒言」，但實際 Chen 2025、Satoyama 2026 中文版都用「前言」
- 業界共識用「前言」取代「緒言」

### 偏好 3：結果與討論依文章類型分流

- 實驗類 → 分（RESULTS / DISCUSSION，結果 / 討論）
- Review/synthesis 類 → 合（RESULTS AND DISCUSSION，結果與討論）
- 中文長摘要 → 一律合

### 偏好 4：Review article 標籤門檻高，業界常以 Research paper 投 review 內容

- Satoyama 2026 即先例：內容是 review of 32 publications，但官方標籤為 Research paper
- Jacky 可選擇：深度夠 + 字數到 15 印頁 → Review article；想求穩 → Research paper

### 偏好 5：通訊作者格式無 `*`

- 三方統一：`Corresponding author: Name, Email: name@example.com`
- 不用 `*` 標註

### 偏好 6：DOI 完整 URL

- 一律 `https://doi.org/...`，不用 `doi:` 或 `DOI:`

### 偏好 7：6+ 作者列前 3 + et al.

- 4-6 作者全列；7+ 列前 3 + et al.
- et al. 小寫加 period

### 偏好 8：台灣相關性是隱性紅線

- TJFS 編委多來自 NTU、NCHU、NPUST、TFRI、林業署
- Review paper 至少 1 節討論台灣 + 引用 3 篇台灣同行 + 連結台灣政策 + 提及台灣樹種 + 提及台灣林區
- 5 軸評分至少 7/10 通過

---

## Review article 套版（J博Team 用）

### 中文稿首頁順序
1. 中文題目（≤ 30 字）
2. 作者（複姓複名用 "-" 連，多人用半形逗號）
3. 摘要（≤ 500 字）
4. 關鍵詞（≤ 5 個）
5. 作者單位地址（中英並列）
6. **Corresponding author: Name, Email:**
7. 接受審查與通過日期（中英並列）
8. Short running title（簡題）

### 中文稿次頁
- 英文題目（首字大寫，除 articles/conjunctions/prepositions）
- 作者英文（first name + surname，多人半形逗號）
- Abstract（≤ 500 words）
- Keywords（≤ 5 phrases）

### 中文稿正文章節
1. 前言（業界共識，不用「緒言」）
2. 材料與方法（Review 可用「文獻檢索方法」）
3. 結果（review 類可合「結果與討論」）
4. 討論
5. 結論（可加「及建議」）
6. 謝誌
7. 引用文獻（**不是「參考文獻」**）
8. 附錄（若有）

### 引用標準範例

**期刊文章 ≤ 6 作者**：
```
Deng SL, Hwong JL, Chang YH, Hsu JT. 2015. Feasibility of natural regeneration of
   Casuarina in Sihhu lowland coastal wind breaks. Q J Chin For 48(3):205-20.
   [in Chinese with English abstract].
```

**期刊文章 > 6 作者**：
```
Szemethy D, Mihalik B, Frank K, et al. 2021. Development of wild boar species-
   specific DNA markers for a potential quality control and traceability method in
   meat products. Food Anal Methods 14:18-27.
```

**有 DOI 的近年文獻**：
```
Buonocore L, Yates J, Valentini R. 2022. A proposal for a Forest Digital Twin
   Framework and its perspectives. Forests 13(4):498.
   https://doi.org/10.3390/f13040498.
```

---

## 三方比對共識總表

| 規則 | 共識 | 信心 | 來源 |
|---|---|---|---|
| References 章節名 | LITERATURE CITED / 引用文獻 | 高（3/3 一致）| 三方 + 官方 |
| 頁碼 dash | hyphen + 縮寫前段（543-49）| 高（3/3 一致）| 三方 + 官方 |
| 中文首章「緒言 vs 背景 vs 前言」 | 英文+長摘要→背景；中文稿→前言；稿約「緒言」實際無人用 | 中（兩派並存）| 三方 + 官方 |
| 結果+討論合分 | review 類合、實驗類分；中文長摘要一律合 | 高 | 三方 + 官方 |
| [in Chinese] tag | 有英摘→with English abstract；無→只 [in Chinese] | 高 | 三方 + 官方 |
| 致謝拼法 | ACKNOWLEDGMENTS（無 E）| 高 | 官方 + 三方主流 |
| 結論 | CONCLUSIONS（複數）+ 選加 AND SUGGESTIONS | 高 | 官方 + 三方主流 |
| 字數上限 | Review article 15 印頁 / 21,750 中文字 / 7,500 英文 word | 高 | 官方稿約明文 |
| 必備格式 | 連續行號、段落起頭 2 字元、段落間空白行、(一)/1./(1) 編號 | 高 | 官方稿約明文 |
| CSE 8th ed Name-Year | 引用版本 | 高 | 官方稿約明文 |
| 學名 | 首次斜體 + 命名者縮寫（如 *Alpinia zerumbet* (Pers.) B.L.Burtt） | 高 | 官方 + 三方 |
| 圖表附文末 | 另頁、不嵌入正文 | 高 | 官方稿約明文 |
| 三線表 | 只橫線無縱線 | 高 | 官方稿約明文 |
| 通訊作者 | 明文 `Corresponding author: Name, Email:` 無 * | 高 | 三方共識 |
| TJFS indexing | Scopus Q4，**不在 SCI/SCIE**（WoS coverage 1998-2021 已停止）；SJR 0.150；IF 0.10（Scopus impact score 非 JCR）| 高 | 三方查核 2026-05-22 |

---

## 重要 fact-check 清單（投稿前必跑）

- [ ] **字數**：≤ 21,750 中文字 / 7,500 英文 word（Review article）
- [ ] **章名 LITERATURE CITED** 不是 REFERENCES
- [ ] **章名 引用文獻** 不是「參考文獻」
- [ ] **ACKNOWLEDGMENTS 無 E** 不是 ACKNOWLEDGEMENTS
- [ ] **CONCLUSIONS 複數** 不是 CONCLUSION
- [ ] **Abstract / Keywords** 不是 Summary / Key words
- [ ] **[in Chinese with English abstract]** 不是 summary
- [ ] **hyphen `-` + 縮寫頁碼** 不是 en-dash 或全寫
- [ ] **DOI 完整 URL** `https://doi.org/...`
- [ ] **6+ 作者列前 3 + et al.**（小寫加 period）
- [ ] **連續行號**已開啟
- [ ] **段落起頭 2 字元** + 段落間空白行
- [ ] **編號 (一)/1./(1)** 三層
- [ ] **Figure 1 / Table 1 全寫**（不用 Fig.）
- [ ] **三線表**（只橫線無縱線）
- [ ] **圖表附文末**（不嵌入正文）
- [ ] **學名首次斜體 + 命名者縮寫**
- [ ] **SI 單位 + 西元紀年 + 阿拉伯數字**
- [ ] **同期刊 scope 三層查證**（Wei 2014、Sung 2022、Chen 2026 必引）
- [ ] **台灣相關性 5 軸 ≥ 7/10**

---

## 用法

- skill 觸發時自動載入 references/official/tjfs_official_guidelines_2025-06-19.md
- 此 feedback 補充「Jacky 個人投稿風險點」+ 「三方比對共識總表」
- 跨對話 / 跨機器（jacky-wiki 同步版）皆可用

---

*Source: J博Team 三方比對研究員報告 2026-05-24 + 官方稿約 2025-06 版 + Jacky 5/22-5/24 三輪查核經驗*
