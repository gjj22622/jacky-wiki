#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const DEFAULT_BASE_URL = "https://jacky-aibrain.zeabur.app";

function env(name, fallback = "") {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

async function askJackyWiki(question) {
  const baseUrl = normalizeBaseUrl(env("JACKY_AI_BRAIN_URL", DEFAULT_BASE_URL));
  const apiKey = env("JACKY_AI_BRAIN_KEY");

  if (!apiKey) {
    throw new Error("Missing JACKY_AI_BRAIN_KEY. Set the member API key in the MCP server environment.");
  }

  const response = await fetch(`${baseUrl}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ question }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Jacky AI Brain returned non-JSON response with HTTP ${response.status}.`);
  }

  if (!response.ok) {
    throw new Error(`Jacky AI Brain request failed: HTTP ${response.status} ${data.error ?? ""}`.trim());
  }

  return data;
}

function formatAnswer(data) {
  if (data.fulfilled) {
    return [
      `fulfilled: true`,
      data.tier ? `tier: ${data.tier}` : null,
      "",
      data.package ?? "",
    ].filter((part) => part !== null).join("\n");
  }

  return [
    "fulfilled: false",
    "",
    data.message || "知識庫沒有命中，需要轉人工或補資料。",
  ].join("\n");
}

async function runSelfTest() {
  const question = process.argv.slice(3).join(" ").trim()
    || "請說明双云 AI Agent 課程拆建修串管交六步框架分別在教什麼。";
  const data = await askJackyWiki(question);
  process.stdout.write(`${formatAnswer(data)}\n`);
}

async function runServer() {
  const server = new McpServer({
    name: "jacky-ai-brain",
    version: "0.1.0",
  });

  server.tool(
    "ask_jacky_wiki",
    "查詢 Jacky AI Brain / Jacky wiki。適合双云、AI Agent 課程、SOSTAC、TBSA、Jacky 內部知識等問題。若 fulfilled=false，代表知識庫沒有命中，應轉人工或補資料。",
    {
      question: z.string().min(1).describe("要查詢 Jacky AI Brain 的問題。"),
    },
    async ({ question }) => {
      try {
        const data = await askJackyWiki(question);
        return {
          content: [
            {
              type: "text",
              text: formatAnswer(data),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: error instanceof Error ? error.message : String(error),
            },
          ],
        };
      }
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (process.argv.includes("--self-test")) {
  runSelfTest().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
} else {
  runServer().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
}
