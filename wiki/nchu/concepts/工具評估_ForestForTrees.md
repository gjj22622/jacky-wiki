---
title: 工具評估 — ForestForTrees（FDT 資料層/模型層候選組件）
domain: nchu
updated: 2026-06-19
maintained_by: AI Co-Researcher（評估任務）
---

# 工具評估｜ForestForTrees

> **這是給博論 AI Co-Researcher 的一個評估任務**，不是已讀文獻摘要。
> 黃老師建議試用的 R 套件 **ForestForTrees**，能從遙測補回「冠層下被遮蔽的小樹」、輸出完整林分大小分布並帶不確定性。
> 任務：評估它是否、以及如何納入台灣森林數位孿生（FDT）系統的**資料層／模型層**。
>
> 定位：FDT 系統建置（博論主線，軸 A）的候選組件研究。**不屬於** Ecological Informatics review 投稿（該稿凍結 63 篇，本任務產物一律不回寫 EI 稿）。

---

## 1. 工具事實（可追溯，勿超出此處與原始來源）

- **Repo**：https://github.com/ForestScaling/ForestForTrees （R，MIT）
- **方法論文**：Eichenwald et al. 2025, *Global Ecology and Biogeography*（doi:10.1111/geb.70085）
- **套件論文**：Eichenwald et al., *Methods in Ecology and Evolution*（doi:10.1111/2041-210x.70309，open access）
- **做什麼**：遙測冠層分割只看得到大樹；本套件用**截斷 Pareto + Stan/MCMC** 反推 10–50 cm 完整樹徑分布（含被遮蔽小樹）。
- **輸入**：一串估計樹徑（DBH 向量）+ 站點級 LAI。感測器/分割法不挑（LiDAR、RGB、DeepForest、watershed 皆可）。
- **核心輸出**：α（Pareto 形狀參數）、N_tot（校正遮蔽後總株數），**皆帶後驗不確定性**。
- **驗證**：跨 23 個 NEON 站（亞熱帶→高山），α 的 R²=0.54、N_tot 的 R²=0.61，無系統偏差。
- **自帶資料**：`harv_data_sample`（Harvard Forest）、`neon_data`、`alpha_priors`（FIA 訓練 RF 先驗）、`Leaf_area_index`（MODIS）。
- **依賴坑**：後端 Stan，Windows 首次安裝要 Rtools 編譯，約 20–40 分鐘。

---

## 2. 為什麼這是 FDT 該做的

FDT 資料層／模型層有一個真實缺口：**遙測對冠層下層不可見 → 小徑木系統性低估 → 連帶 AGB/碳與生物多樣性估計偏誤**。ForestForTrees 正面解此缺口，且示範三件 FDT 想要的特質：① 不確定性傳遞（α→N_tot 後驗一路帶下去）；② 方法工具化／可重現（研究級貝氏→人人可跑 pipeline）；③ 跨 biome 無系統偏差（可遷移性正面證據）。

⚠️ **概念界線（務必守）**：它估的是**結構（大小分布、株數），不是 AGB/碳**。整合時結構是 AGB 的**上游輸入**，不是替代品；接到碳需另接 allometry／生物量模型，並明示該步假設與不確定性。**不可張冠李戴當「碳估算工具」**。

---

## 3. 請 AI 做的事（目標導向，可自主排序）

- **T1 重現與摸底**：自帶 Harvard/NEON 範例跑通 pipeline，理解 `potential_break → truncate_filter → fit_alpha_model → estimate_total_trees → map_grid_estimates`，弄清「觀測窗/斷點」假設（哪個 DBH 以下視為遮蔽）。
- **T2 台灣適配性（核心）**：盤點能餵的台灣資料（NFI/第四次調查樣區 DBH、UAV-LiDAR/航照分割→DBH、MODIS 或在地通量塔 LAI），明列有什麼/缺什麼/誰補；評估關鍵假設在台灣是否成立（截斷 Pareto、單站 LAI 代表性、α 先驗原以 FIA 訓練是否需重訓）；預估 R² 在中央山脈高異質林會掉到哪、為什麼。
- **T3 FDT 整合設計**：定位五層落點（推測資料層補完結構 + 模型層結構推估組件），畫與既有 allometry／ML／多源融合／SIF 組件的資料流；設計「結構→AGB/碳」接法與不確定性下游傳遞；評估能否與在地校準框架（GEDI×MGWR 精神，見 [Lin 2025]）共用驗證設計。
- **T4 風險清單（誠實）**：結構≠碳、R² 中等、Stan 重依賴、跨亞熱帶外推未驗證、先驗來源（FIA）不適台灣、單站 LAI 假設等，逐條列影響與緩解。
- **T5 產出**：評估備忘（值得整合／有條件整合／暫不整合 + 證據）；若值得，附最小可行 PoC 計畫（哪塊台灣 pilot、跑什麼、怎麼驗證）；登錄進 [文獻追蹤總導覽](../文獻追蹤總導覽.md) 與本頁更新結論。

---

## 4. 紅線與原則（與既有系統一致）

1. **零幻覺／可追溯**（對齊 [零幻覺與文獻查證 SOP](零幻覺與文獻查證SOP.md)）：數字、函式名、α/N_tot 定義回得到 repo/論文/實跑；不確定標「待查」。
2. **台北系統 IP 零曝光**：本任務不涉、不寫任何台北自有系統實作細節。
3. **結構≠碳，不可張冠李戴**（見 §2）。
4. **範疇隔離**：屬 FDT 系統建置（博論）；產物不回寫 EI 投稿稿。
5. **策略分岔列選項給 Jacky 決**：整合與否、PoC 範圍、資料取捨等大方向研究後列選項+誠實可行性，Jacky 拍板；執行層級才自主推進。
6. **不在管控機硬卡 Stan**：難裝先給清單與替代路徑，試 1–2 次不成就交回。

---

## 5. 本機素材

`C:\Users\gjj22\Desktop\中興大學生科所\工具試玩_ForestForTrees\`
- `try_forestfortrees.R` — 試玩腳本（載入自帶資料 → 單樣區 α/N_tot → 畫圖 → 進階柵格製圖）
- `README_試玩說明.md` — 懶人包
- `指令_給FDT專案AI_ForestForTrees評估整合.md` — 原始指令全文

---

## 6. 相關
- [博士論文總導覽](../博士論文總導覽.md)（軸 A：FDT）
- [文獻追蹤總導覽](../文獻追蹤總導覽.md)
- [下一步候選池](../log/下一步候選池.md)
- [AI Co-Researcher 工作流](AI_Co-Researcher工作流.md)

---

*v1 ｜ 2026-06-19 ｜ Jacky × Claude 擬定。如工具事實或系統結構有變，更新本檔版本日期。*
