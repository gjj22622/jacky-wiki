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

// ── per-key 速率限制（滑動視窗，零依賴）──────────────────────
// 防單一成員大量下單把倉庫掃出來。預設每把 key 每分鐘 30 張訂單。
const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN ?? 30);
const RATE_WINDOW_MS = 60_000;
const rateHits = new Map<string, number[]>();   // api_key → 近一分鐘的請求時間戳(ms)
function rateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const arr = (rateHits.get(key) ?? []).filter((t) => t > cutoff);
  arr.push(now);
  rateHits.set(key, arr);
  return arr.length > RATE_LIMIT_PER_MIN;
}

type Member = { id: string; name?: string; tier: string; topics: string[]; api_key: string };
// 成員表來源：MEMBERS_JSON_B64（base64，雲端設環境變數最穩，免引號/逗號轉義）
//   → MEMBERS_JSON（純 JSON 字串）→ members.json（本機檔案）
function loadMembers(): Member[] {
  const b64 = process.env.MEMBERS_JSON_B64;
  if (b64) {
    try { return (JSON.parse(Buffer.from(b64, "base64").toString("utf8")).members ?? []) as Member[]; }
    catch { console.error("✗ MEMBERS_JSON_B64 解碼或解析失敗"); process.exit(1); }
  }
  const inline = process.env.MEMBERS_JSON;
  if (inline) {
    try { return (JSON.parse(inline).members ?? []) as Member[]; }
    catch { console.error("✗ MEMBERS_JSON 不是合法 JSON"); process.exit(1); }
  }
  const p = join(HERE, "members.json");
  if (!existsSync(p)) { console.error("✗ 找不到 members.json（也未設 MEMBERS_JSON）"); process.exit(1); }
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
  // ⚠ 每張訂單開一個「用完即丟」的新對話串，再對它提問。
  // 原因：AnythingLLM 的預設對話串會累積最近 N 則歷史；若所有訂單共用預設串，
  //   過去的「倉庫中無此資訊」拒答會被當成對話歷史餵回模型，使後續正常問句也被拖著一起拒答
  //   （實測 6/21 全綠、數日後因歷史污染自我惡化成全部 fulfilled:false）。
  //   每張訂單獨立新串 → 無歷史可污染，訂單天生無狀態（本來就一問一答）。
  let threadSlug: string | null = null;
  try {
    try {
      const tr = await fetch(`${BRAIN_BASE}/api/v1/workspace/${slug}/thread/new`, {
        method: "POST",
        headers: { Authorization: `Bearer ${BRAIN_KEY}`, "Content-Type": "application/json" },
        body: "{}",
      });
      if (tr.ok) threadSlug = ((await tr.json()) as any)?.thread?.slug ?? null;
    } catch { /* 開串失敗就退回預設串，不阻斷查詢 */ }

    const chatUrl = threadSlug
      ? `${BRAIN_BASE}/api/v1/workspace/${slug}/thread/${threadSlug}/chat`
      : `${BRAIN_BASE}/api/v1/workspace/${slug}/chat`;
    const r = await fetch(chatUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${BRAIN_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: `${PACKAGE_INSTRUCTION}${question}`, mode: "query" }),
    });
    if (!r.ok) return null;                      // workspace 不存在/錯誤 → 視為 0 命中
    const j: any = await r.json();
    let text = (j?.textResponse ?? "").trim();
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();  // 剝除模型推理塊
    if (!text) return null;
    // 模型依指令在內容不足時回「倉庫中無此資訊」；統一視為 0 命中（負向測試乾淨）
    if (/無此資訊|沒有相關(資訊|內容)|no relevant information/i.test(text)) return null;
    return text;                                 // 只取合成答案，丟棄 j.sources（不外露原文）
  } catch {
    return null;                                 // 倉庫連不上 → 0 命中，不崩潰
  } finally {
    // 清掉用完的對話串（fire-and-forget，不等結果、不阻斷回應；避免 thread 無限累積）
    if (threadSlug) {
      fetch(`${BRAIN_BASE}/api/v1/workspace/${slug}/thread/${threadSlug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${BRAIN_KEY}` },
      }).catch(() => {});
    }
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
  if (req.method === "GET" && req.url === "/health") return send(res, 200, { ok: true, build: "freshthread-v2" });
  if (req.method !== "POST" || req.url !== "/order") return send(res, 404, { error: "not_found" });

  const member = authMember(req.headers["x-api-key"] as string | undefined);
  if (!member) return send(res, 401, { error: "unauthorized" });

  // 速率限制：超量直接擋，並審計（防大量訂單掃庫）
  if (rateLimited(member.api_key)) {
    audit({ member: member.id, tier: member.tier, rate_limited: true });
    res.setHeader("Retry-After", "60");
    return send(res, 429, { error: "rate_limited", message: `每分鐘最多 ${RATE_LIMIT_PER_MIN} 張訂單，請稍後再試。` });
  }

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
