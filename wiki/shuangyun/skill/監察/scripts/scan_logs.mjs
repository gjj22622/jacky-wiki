// scan_logs.mjs <repo> — 唯讀掃描：流量/點擊監控 + 越權偵測(f) 可做的部分 + 盲點
// 讀 data/{login_history,active_sessions,behavior_events,tokens}.json 找異常。只讀、只印。
import fs from "node:fs";
import path from "node:path";

const REPO = process.argv[2] || process.env.SHUANGYUN_SCHOOL_REPO;
const out = { repo: REPO, findings: [], blindspots: [], stats: {} };
const add = (sev, msg, evidence) => out.findings.push({ sev, dim: "f", msg, evidence });
const readJson = p => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; } };
const arr = x => Array.isArray(x) ? x : (x && Array.isArray(x.items) ? x.items : []);

if (!REPO) { console.log(JSON.stringify({ error: "需要 repo 路徑" })); process.exit(0); }
const D = p => path.join(REPO, "data", p);

// --- 靜態破口（固定提醒，引程式位置）---
const appjs = (() => { try { return fs.readFileSync(path.join(REPO,"public","app.js"),"utf8"); } catch { return ""; } })();
if (/section\.hidden\s*=\s*section\.dataset\.zone/.test(appjs))
  add("🔴", "zone gating 純前端 hidden 切換，整份 index.html 送給每個登入者 → 任何 token 可讀任何 zone 文字", "public/app.js (setActiveZone)");
const serverjs = (() => { try { return fs.readFileSync(path.join(REPO,"server.js"),"utf8"); } catch { return ""; } })();
if (serverjs && !/zone/i.test((serverjs.match(/handleVideo[\s\S]{0,800}/)||[""])[0]))
  add("🔴", "影片串流只檢查通用 content:view、無 per-zone 防護 → 知道檔名即可跨區抓片", "server.js handleVideo");
if (/operator:\s*["']admin["']|operator\s*=\s*["']admin["']/.test(serverjs))
  add("🟡", "recordAudit operator 寫死 'admin'，admin 後台改動無法歸戶到實際操作者", "tracking.js recordAudit");

// --- 日誌分析（現可做）---
const login = arr(readJson(D("login_history.json")));
const sessions = arr(readJson(D("active_sessions.json")));
const behavior = arr(readJson(D("behavior_events.json")));
const tokens = (() => { const t = readJson(D("tokens.json")); return Array.isArray(t) ? t : (t?.tokens || []); })();
out.stats = { login: login.length, sessions: sessions.length, behavior: behavior.length, tokens: tokens.length };

if (!login.length && !behavior.length) {
  add("🟡", "data/ 日誌為空或讀不到（可能剛部署或本機未同步）→ 日誌分析無資料，但靜態破口與盲點仍有效");
} else {
  // 撤銷/失效 token 仍成功登入
  const revoked = new Set(tokens.filter(t => t.revoked).map(t => t.id));
  const badLogin = login.filter(e => e.success && revoked.has(e.tokenId));
  if (badLogin.length) add("🔴", `撤銷 token 仍有成功登入紀錄 ${badLogin.length} 筆`, badLogin.slice(0,5));
  // rate-limit / 失敗暴衝
  const fails = login.filter(e => !e.success);
  if (fails.length) {
    const byIp = {}; for (const e of fails) byIp[e.ipHash||"?"] = (byIp[e.ipHash||"?"]||0)+1;
    const hot = Object.entries(byIp).filter(([,n]) => n >= 10);
    if (hot.length) add("🟡", "同 IP hash 大量登入失敗（疑似暴力嘗試）", hot.slice(0,5));
  }
  // 併發違規：同 token 多 session 超過 maxConcurrent
  const tById = Object.fromEntries(tokens.map(t => [t.id, t]));
  const cnt = {}; for (const s of sessions) cnt[s.tokenId] = (cnt[s.tokenId]||0)+1;
  for (const [tid, n] of Object.entries(cnt)) {
    const mc = tById[tid]?.maxConcurrent;
    if (mc != null && n > mc) add("🟡", `token ${tid} 併發 session ${n} > maxConcurrent ${mc}`, { tid, n, mc });
  }
  // 單 token 行為量異常（粗略：> 平均 5 倍）
  const byTok = {}; for (const e of behavior) byTok[e.tokenId] = (byTok[e.tokenId]||0)+1;
  const vals = Object.values(byTok); const avg = vals.reduce((a,b)=>a+b,0)/(vals.length||1);
  const noisy = Object.entries(byTok).filter(([,n]) => n > avg*5 && n > 50);
  if (noisy.length) add("🟡", "單 token 行為量遠高於平均（確認是否異常爬取）", noisy.slice(0,5));
}

// --- 盲點（明確標記、不修）---
out.blindspots.push("behavior_events 無 zone 欄位 → 無法偵測『無權 token 瀏覽無權頁面』。");
out.blindspots.push("zone 無伺服器端 per-zone 檢查 → 無 403 可記，越權瀏覽不留痕跡。");
out.blindspots.push("建議埋點（不自動套）：① server 端對受限 zone/影片加 role→zone 檢查並回 403；② recordBehavior 增 zone 欄位；③ 記錄 403 拒絕事件；④ recordAudit operator 改記實際 session.tokenId。");

console.log(JSON.stringify(out, null, 2));
