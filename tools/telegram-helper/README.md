# Jacky Telegram Helper

一個很小的 Telegram 小幫手：

- 用 CLI 主動推進度到 Telegram
- 用 Telegram 收命令，先寫進本機 inbox，不直接執行 shell
- 支援 `/status`、`/todo`、`/do`、`/help`

## 1. 設定 token

```powershell
Copy-Item .env.example .env
notepad .env
```

把 `.env` 裡的 `TELEGRAM_BOT_TOKEN` 換成 BotFather 給你的 token。

`.env` 已被 repo 的 `**/.env` 規則忽略，不會進 git。

## 2. 啟動 bot

```powershell
npm start
```

然後到 Telegram 對 bot 傳：

```text
/start
```

第一次 `/start` 後，它會記住你的 chat id。若你要鎖定只能自己使用，把它回覆的 chat id 填到 `.env`：

```text
TELEGRAM_ALLOWED_CHAT_IDS=你的_chat_id
```

## 3. 推送進度

在 `tools/telegram-helper` 目錄下：

```powershell
npm run notify -- "這是一則進度更新"
```

也可以從 repo 根目錄直接跑：

```powershell
node tools/telegram-helper/src/bot.mjs notify "這是一則進度更新"
```

若你是透過會吃掉中文編碼的自動化環境推送，可改用 UTF-8 base64：

```powershell
$msg = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("這是一則進度更新"))
node tools/telegram-helper/src/bot.mjs notify-b64 $msg
```

## 4. Telegram 指令

```text
/help
/status
/todo
/do 幫我明天整理 AI School L6 課程
```

`/do` 會寫入 `tools/telegram-helper/data/commands.log`，方便你或 agent 後續處理。

## 安全提醒

這個版本刻意不支援 Telegram 遠端直接執行 shell。若之後需要，我們可以加「白名單命令」版本，例如只允許 `git status`、`npm test`、`notify` 這類低風險指令。
