import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const helperDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(helperDir, "..", "..");
const startedAt = new Date();

function parseDotenv(text) {
  const result = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

async function loadEnv() {
  const candidates = [
    path.join(process.cwd(), ".env"),
    path.join(helperDir, ".env"),
    path.join(repoRoot, ".env")
  ];

  for (const file of candidates) {
    if (!existsSync(file)) continue;
    const env = parseDotenv(await readFile(file, "utf8"));
    for (const [key, value] of Object.entries(env)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN. Copy .env.example to .env and set your bot token.");
  }

  const allowedChatIds = new Set(
    (process.env.TELEGRAM_ALLOWED_CHAT_IDS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );

  return {
    token,
    allowedChatIds,
    stateFile: process.env.TELEGRAM_STATE_FILE || path.join(helperDir, "data", "state.json"),
    commandsLog: path.join(helperDir, "data", "commands.log")
  };
}

async function loadState(config) {
  if (!existsSync(config.stateFile)) {
    return { chats: [], lastUpdateId: 0 };
  }
  return JSON.parse(await readFile(config.stateFile, "utf8"));
}

async function saveState(config, state) {
  await mkdir(path.dirname(config.stateFile), { recursive: true });
  await writeFile(config.stateFile, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

async function telegram(config, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${config.token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Telegram ${method} failed: ${data.description || response.statusText}`);
  }
  return data.result;
}

async function sendMessage(config, chatId, text) {
  return telegram(config, "sendMessage", {
    chat_id: chatId,
    text,
    disable_web_page_preview: true
  });
}

function isAllowed(config, chatId) {
  return config.allowedChatIds.size === 0 || config.allowedChatIds.has(String(chatId));
}

async function getGitSummary() {
  try {
    const branch = await execFileAsync("git", ["branch", "--show-current"], { cwd: repoRoot });
    const status = await execFileAsync("git", ["status", "--short"], { cwd: repoRoot });
    const dirtyCount = status.stdout.split(/\r?\n/).filter(Boolean).length;
    return `branch: ${branch.stdout.trim() || "(detached)"}\nchanges: ${dirtyCount}`;
  } catch (error) {
    return `git: unavailable (${error.message})`;
  }
}

async function readTodo() {
  const file = path.join(repoRoot, "todolist.md");
  if (!existsSync(file)) return "目前 repo 根目錄沒有 todolist.md。";
  const text = await readFile(file, "utf8");
  return text.trim().slice(0, 3500) || "todolist.md 是空的。";
}

async function appendCommand(config, message) {
  await mkdir(path.dirname(config.commandsLog), { recursive: true });
  const from = message.from?.username ? `@${message.from.username}` : message.from?.first_name || "unknown";
  const line = JSON.stringify({
    at: new Date().toISOString(),
    chat_id: message.chat.id,
    from,
    text: message.text
  });
  await appendFile(config.commandsLog, `${line}\n`, "utf8");
}

async function handleMessage(config, state, message) {
  if (!message.text) return;

  const chatId = message.chat.id;
  if (!isAllowed(config, chatId)) {
    await sendMessage(config, chatId, `這個 chat id (${chatId}) 不在允許清單內。`);
    return;
  }

  if (!state.chats.includes(chatId)) {
    state.chats.push(chatId);
    await saveState(config, state);
  }

  const text = message.text.trim();
  if (text === "/start") {
    await sendMessage(config, chatId, [
      "Jacky Telegram Helper 已連線。",
      `你的 chat id: ${chatId}`,
      "可用指令：/status、/todo、/do、/help"
    ].join("\n"));
    return;
  }

  if (text === "/help") {
    await sendMessage(config, chatId, [
      "/status 查看 bot 與 repo 狀態",
      "/todo 讀取 repo 根目錄 todolist.md",
      "/do <命令> 把命令寫進本機 commands.log",
      "CLI 推播：node tools/telegram-helper/src/bot.mjs notify \"進度文字\""
    ].join("\n"));
    return;
  }

  if (text === "/status") {
    const uptimeSeconds = Math.round((Date.now() - startedAt.getTime()) / 1000);
    await sendMessage(config, chatId, [
      "Telegram Helper 狀態",
      `uptime: ${uptimeSeconds}s`,
      `repo: ${repoRoot}`,
      await getGitSummary()
    ].join("\n"));
    return;
  }

  if (text === "/todo") {
    await sendMessage(config, chatId, await readTodo());
    return;
  }

  if (text.startsWith("/do")) {
    const command = text.replace(/^\/do(@\w+)?\s*/i, "").trim();
    if (!command) {
      await sendMessage(config, chatId, "請用 `/do 你要交辦的事`。");
      return;
    }
    await appendCommand(config, message);
    await sendMessage(config, chatId, `收到，已寫入 command inbox。\n\n${command}`);
    return;
  }

  await sendMessage(config, chatId, "我收到訊息了。要交辦請用 /do，查看指令請用 /help。");
}

async function notify(config, text) {
  const state = await loadState(config);
  if (!state.chats.length) {
    throw new Error("No registered chats yet. Start the bot and send /start from Telegram first.");
  }
  for (const chatId of state.chats) {
    if (isAllowed(config, chatId)) {
      await sendMessage(config, chatId, text);
    }
  }
}

async function poll(config) {
  const state = await loadState(config);
  console.log("Telegram helper is running. Send /start to the bot.");

  while (true) {
    try {
      const updates = await telegram(config, "getUpdates", {
        offset: state.lastUpdateId ? state.lastUpdateId + 1 : undefined,
        timeout: 30,
        allowed_updates: ["message"]
      });

      for (const update of updates) {
        state.lastUpdateId = update.update_id;
        if (update.message) {
          await handleMessage(config, state, update.message);
        }
      }
      await saveState(config, state);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

await loadEnv();
const config = getConfig();
const [command, ...args] = process.argv.slice(2);

if (command === "notify") {
  const text = args.join(" ").trim();
  if (!text) throw new Error('Usage: node src/bot.mjs notify "message"');
  await notify(config, text);
} else if (command === "notify-b64") {
  const encoded = args.join("").trim();
  if (!encoded) throw new Error("Usage: node src/bot.mjs notify-b64 <utf8-base64-message>");
  await notify(config, Buffer.from(encoded, "base64").toString("utf8"));
} else {
  await poll(config);
}
