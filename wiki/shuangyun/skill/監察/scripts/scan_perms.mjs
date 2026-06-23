// scan_perms.mjs <repo> — 唯讀掃描：權限設定正確(e)
// 讀 data/admin-config.json 比對 baseline；對 app.js roleZones 做層級檢查。只讀、只印。
import fs from "node:fs";
import path from "node:path";

const REPO = process.argv[2] || process.env.SHUANGYUN_SCHOOL_REPO;
const out = { repo: REPO, findings: [], ok: true };
const add = (sev, msg, evidence) => out.findings.push({ sev, dim: "e", msg, evidence });
const read = p => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };

if (!REPO) { console.log(JSON.stringify({ error: "需要 repo 路徑" })); process.exit(0); }

const ALL7 = ["tokens:manage","roles:manage","knowledge:view","knowledge:manage","content:view","content:practice","reports:view"];
const BASELINE = {
  admin: ALL7,
  mentor: ["knowledge:view","content:view","content:practice","reports:view"],
  "full-access": ["knowledge:view","content:view","content:practice","reports:view"],
  "core-member": ["knowledge:view","content:view","content:practice","reports:view"],
  "tbsa-seed-teacher": ["knowledge:view","content:view","content:practice"],
  newcomer: ["knowledge:view","content:view","content:practice"],
};
const ELEVATED = ["tokens:manage","roles:manage","knowledge:manage"];
const eq = (a,b) => a.length===b.length && [...a].sort().join() === [...b].sort().join();

const cfgRaw = read(path.join(REPO, "data", "admin-config.json"));
if (!cfgRaw) {
  add("🟡", "讀不到 data/admin-config.json（可能本機沒同步線上設定）→ 此維標『未驗證』，請用 ADMIN_SECRET 打 GET /api/admin/config 比對");
  console.log(JSON.stringify(out, null, 2)); process.exit(0);
}
let cfg; try { cfg = JSON.parse(cfgRaw); } catch { add("🔴","admin-config.json 非合法 JSON"); console.log(JSON.stringify(out,null,2)); process.exit(0); }

const roles = cfg.roles || [];
const byId = Object.fromEntries(roles.map(r => [r.id, r]));

// 1) 6 個 system role 齊全
for (const id of Object.keys(BASELINE)) {
  const r = byId[id];
  if (!r) { add("🔴", `缺少基準角色：${id}`); continue; }
  if (!r.isSystem) add("🟡", `角色 ${id} 應為 isSystem:true（系統角色不可刪）`, r.isSystem);
  if (!eq(r.permissions || [], BASELINE[id]))
    add("🔴", `角色 ${id} 權限與 baseline 不符`, { now: r.permissions, expect: BASELINE[id] });
}
// 2) 低權角色不得有升級權限
for (const id of ["newcomer","tbsa-seed-teacher","core-member","full-access","mentor"]) {
  const r = byId[id]; if (!r) continue;
  const bad = (r.permissions||[]).filter(p => ELEVATED.includes(p));
  if (bad.length) add("🔴", `低權角色 ${id} 含升級權限`, bad);
}
// 3) 非預期的新角色（人工確認）
for (const r of roles) if (!BASELINE[r.id]) add("🟡", `偵測到非基準角色 ${r.id}（請人工確認是否刻意新增）`, r.permissions);

// 4) app.js roleZones 層級檢查
const appjs = read(path.join(REPO, "public", "app.js"));
if (appjs) {
  const rzBlock = (appjs.match(/const roleZones\s*=\s*\{([\s\S]*?)\};/) || [])[1] || "";
  const rz = {};
  for (const m of rzBlock.matchAll(/"?([a-z-]+)"?\s*:\s*\[([^\]]*)\]/g))
    rz[m[1]] = [...m[2].matchAll(/"([^"]+)"/g)].map(z => z[1]);
  out.roleZones = rz;
  if (rz.newcomer?.includes("core")) add("🔴", "roleZones: newcomer 不該能進 core 區", rz.newcomer);
  if (rz.newcomer?.includes("tbsa")) add("🟡", "roleZones: newcomer 含 tbsa（確認是否刻意）", rz.newcomer);
  if (rz["tbsa-seed-teacher"]?.includes("core")) add("🔴", "roleZones: tbsa-seed-teacher 不該進 core 區", rz["tbsa-seed-teacher"]);
}

out.ok = !out.findings.some(f => f.sev === "🔴");
console.log(JSON.stringify(out, null, 2));
