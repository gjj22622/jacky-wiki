---
name: jacky-wiki
description: 查詢或更新鐘基啟（Jacky）的個人知識 wiki。觸發時機：使用者提到「双云行銷／Jwood／基的木藝／TBSA／中興博士／jlife／一念清涼」、SOSTAC／SPEAKS／AGENTS 三套方法論、或說「查 wiki」「我的 wiki 有沒有 X」「把這個寫進 wiki」「ingest」。也支援 /wiki 斜線指令。在非 jacky-wiki 資料夾下工作但需要查 Jacky 的事業/方法論/個人脈絡時必用。
trigger: /wiki
---

# /wiki — Jacky 全域知識 Wiki

讓 Claude 在**任何工作目錄**下，都能查詢／更新 `C:\Users\gjj22\jacky-wiki`。

## Wiki 位置（固定）

```
C:\Users\gjj22\jacky-wiki\
├── CLAUDE.md                 # 完整 schema、寫作規範、跨域規則
├── wiki/
│   ├── wiki主索引.md          # 5 域 + 1 跨域 + 1 待建總覽
│   ├── log.md                # ingest 決策日誌
│   ├── shuangyun/双云索引.md      # ⭐ 双云行銷（28 頁）
│   ├── jwood/木作索引.md          # ⭐ Jwood 木藝（9 頁）
│   ├── jlife/人生索引.md          # 鐘基啟人生回憶錄（9 頁）
│   ├── tbsa/TBSA索引.md           # 商務企劃協會（14 頁）
│   ├── nchu/中興博士索引.md        # 學術根基（3 頁）
│   ├── cross-domain/跨域索引.md    # 共用框架（2 頁）
│   └── yinian/                   # 一念清涼（待建）
├── inbox/                    # 未分類輸入
└── raw/                      # 原始素材存檔
```

## 使用方式

```
/wiki                        # 顯示主索引 + 各域頁面數
/wiki <domain>               # 進入某域索引（shuangyun/jwood/jlife/tbsa/nchu）
/wiki query "<問題>"          # 查詢 wiki，依域→索引→頁面逐層往下
/wiki add <檔案或敘述>         # ingest 新素材到對應域，遵守 CLAUDE.md 規範
/wiki link                   # 檢查前傳↔現況雙向連結是否完整
/wiki log                    # 顯示最近的 ingest 日誌
```

## 觸發後必做

1. **先讀 wiki 的 CLAUDE.md**（`C:\Users\gjj22\jacky-wiki\CLAUDE.md`）——所有 schema、域優先級、檔名規則、跨域寫作原則都在那裡，**不要憑記憶寫**。
2. **查詢類**先讀 `wiki/wiki主索引.md` 取得當前頁面數，再進對應域索引（中文檔名，例：`双云索引.md`）。
3. **更新類**遵守：
   - 繁體中文 + 中文檔名
   - YAML frontmatter（`title`、`domain`、`updated`）
   - 隱私邊界：jlife 只到結構層（章節主題、跨域連結），**不複製書稿全文**
   - 去重：方法論只存一份，其他頁面用連結指向
   - 雙向連結：前傳（jlife）↔ 現況（事業／學術域）必須互通
   - commit 格式：`feat(wiki): 描述` + Co-Authored-By
4. **每次 ingest 後**更新 `wiki主索引.md` 頁面數 + 在 `wiki/log.md` 記錄決策。

## 與其他工作目錄的關係

- 在**非 jacky-wiki 資料夾**下被觸發時：用絕對路徑 `C:\Users\gjj22\jacky-wiki\...` 操作，不要 cd 過去。
- 在**雙云／Jwood／TBSA 等專案資料夾**工作而需要引用 Jacky 的方法論時：先 `/wiki query` 取出對應頁面內容，再回到原工作目錄使用，**不要把 wiki 內容複製進其他專案**。
- 多機協作（G2 mini Ubuntu / WSL2 / Windows）：寫入前 `git pull --rebase origin main`。

## 不要做

- 不要重新發明 schema——一切以 `jacky-wiki/CLAUDE.md` 為準。
- 不要在 wiki 之外的位置建分身或快取。
- 不要把家人細節、書稿全文、隱私內容寫進 wiki。
- 不要跨域複製方法論全文，要用連結。
