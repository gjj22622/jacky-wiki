# Jacky Wiki — CLAUDE.md

## Wiki Schema

### 擁有者
鐘基啟（Jacky）— gjj22622@gmail.com

### 核心框架
SOSTAC + AI First

### 知識域（優先順序）
| 域代碼 | 名稱 | 類型 | 優先級 |
|--------|------|------|--------|
| shuangyun | 双云行銷 | 事業（客戶服務） | ⭐ 優先域 |
| jwood | Jwood 基的木藝 | 事業（Jacky 自有品牌） | ⭐ 優先域 |
| tbsa | TBSA 協會 | 社會職務 | 次要 |
| nchu | 中興大學博士研究 | 學術 | 次要 |
| yinian | 一念清涼 | 個人修行 | 次要 |
| laodehao | 老的好回憶錄 | 社會專案 | 次要 |

### 目錄結構
```
wiki/
  index.md              # 總覽與導航
  cross-domain/         # 跨域素材（模板、公用框架）
  shuangyun/
    index.md            # 双云行銷域首頁
    cases/              # 客戶案例
  jwood/
    index.md            # Jwood 品牌總覽
    ai-workflow.md      # AI 圖片生成工作流（Codex CLI + gpt-image-2）
    yt-video-sop.md     # YouTube 影片生產 SOP
    ig-post-sop.md      # IG Post 每日生產 SOP
  tbsa/
    index.md
  nchu/
    index.md
  yinian/
    index.md
  laodehao/
    index.md
inbox/                  # 未分類輸入，待整理
raw/                    # 原始素材存檔
```

### 頁面規範
- 語言：繁體中文
- 每頁頂部必須有 YAML frontmatter（title、domain、updated）
- 隱私邊界：個人隱私、家人細節不放入 wiki

### AI 協作規範
- 不問，直接做；需確認的事項一次集中提問
- 新頁面依 SOSTAC 框架組織內容
- commit 格式：`feat(wiki): 描述` + Co-Authored-By
