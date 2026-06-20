/**
 * server.ts — 訂單履約 API（Phase 0 最小版）
 *
 * 受保護 AI 大腦的「唯一對外面」。成員只發訂單，永遠碰不到倉庫。
 * 流程：POST /order → api_key 認證(訂單傳導) → 取 member → 層級+主題雙閘選 workspace
 *       → 呼叫 AnythingLLM answer-only(query 模式) → 合成「知識+判斷邏輯」包裹(物流送達)
 *       → 訂單審計 → 回傳。
 *
 * 鐵則：無 list / browse / raw 端點；不回傳原文 sources；成員無 AnythingLLM 帳號。
 * 規範：零 npm 依賴；Node 24 原生跑 TS。
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 8080);
const BRAIN_BASE = process.env.ANYTHINGLLM_BASE_URL ?? "http://localhost:3001";
const BRAIN_KEY = process.env.ANYTHINGLLM_API_KEY ?? "";
const ORDERS_LOG = join(HERE, "orders.log");

const TIER_RANK: Record<string, number> = { L1: 1, L2: 2, L3: 3 };

type Member = { id: string; name?: string; tier: string; topics: string[]; api_key: string };
function loadMembers(): Member[] {
  const p = join(HERE, "members.json");
  if (!existsSync(p)) { console.error("✗ 找不到 members.json"); process.exit(1); }
  return (JSON.parse(readFileSync(p, "utf8")).members ?? []) as Member[];
}
const MEMBERS = loadMembers();
function authMember(key: string | undefined): Member | null {
  if (!key) return null;
  return MEMBERS.find((m) => m.api_key === key && m.api_key !== "REPLACE_WITH_RANDOM_SECRET") ?? null;
}

// 包裹格式指令：強制「對應知識 + 判斷邏輯」兩段（沿用 AGENTS 說明書第 5 區格式）
const PACKAGE_INSTRUCTION = [
  "你是 Jacky 知識大腦的履約助理。只能根據提供的內容回答；若內容不足，明說「倉庫中無此資訊」，不要自行編造、也不要透露其他主題或層級是否存在。",
  "用繁體中文，分兩段輸出：",
  "【對應知識】針對問題的重點答案。",
  "【判斷邏輯】用「如果 __ 則 __」條列決策規則；並說明「無法判斷時應回報人類」的界線。",
  "",
  "問題：",
].join("\n");

async function askWorkspace(slug: string, question: string): Promise<string | null> {
  try {
    const r = await fetch(`${BRAIN_BASE}/api/v1/workspace/${slug}/chat`, {
      method: "POST",
      headers: { Authorization: `Bearer ${BRAIN_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: `${PACKAGE_INSTRUCTION}${question}`, mode: "query" }),
    });
    if (!r.ok) return null;                      // workspace 不存在/錯誤 → 視為 0 命中
    const j: any = await r.json();
    const text = (j?.textResponse ?? "").trim();
    // query 模式無命中時 AnythingLLM 多半回空或「no relevant」；統一過濾
    if (!text) return null;
    return text;                                 // 只取合成答案，丟棄 j.sources（不外露原文）
  } catch {
    return null;                                 // 倉庫連不上 → 0 命中，不崩潰
  }
}

function audit(entry: Record<string, unknown>): void {
  try { appendFileSync(ORDERS_LOG, JSON.stringify({ ...entry, at: new Date().toISOString() }) + "\n", "utf8"); }
  catch { /* 審計失敗不阻斷回應，但會在 stderr 顯示 */ }
}

function send(res: ServerResponse, code: number, body: unknown): void {
  const s = JSON.stringify(body);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(s);
}
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let d = ""; req.on("data", (c) => (d += c)); req.on("end", () => resolve(d));
  });
}

const server = createServer(async (req, res) => {
  // 只開 POST /order，其餘一律 404（刻意不給瀏覽/枚舉能力）
  if (req.method === "GET" && req.url === "/health") return send(res, 200, { ok: true });
  if (req.method !== "POST" || req.url !== "/order") return send(res, 404, { error: "not_found" });

  const member = authMember(req.headers["x-api-key"] as string | undefined);
  if (!member) return send(res, 401, { error: "unauthorized" });

  let payload: any;
  try { payload = JSON.parse(await readBody(req) || "{}"); } catch { return send(res, 400, { error: "bad_json" }); }
  const question = String(payload.question ?? "").trim();
  if (!question) return send(res, 400, { error: "question_required" });

  // 層級 + 主題雙閘：每個白名單主題 → 該成員層級的 workspace
  const workspaces = member.topics.map((t) => `${t}-${member.tier}`.toLowerCase());

  const parts: string[] = [];
  const hitWorkspaces: string[] = [];
  for (const slug of workspaces) {
    const ans = await askWorkspace(slug, question);
    if (ans) { parts.push(ans); hitWorkspaces.push(slug); }
  }

  audit({
    member: member.id, tier: member.tier, topics: member.topics,
    question_preview: question.slice(0, 80),
    workspaces_queried: workspaces, workspaces_hit: hitWorkspaces,
  });

  if (parts.length === 0) {
    return send(res, 200, { ok: true, fulfilled: false, message: "倉庫中無此資訊（或不在你的授權範圍）。" });
  }
  // 物流送達：只回合成包裹，無 sources / 無原文 / 無文件清單
  send(res, 200, { ok: true, fulfilled: true, package: parts.join("\n\n---\n\n"), tier: member.tier });
});

server.listen(PORT, () => console.log(`訂單履約 API listening on :${PORT}（倉庫 ${BRAIN_BASE}）`));
