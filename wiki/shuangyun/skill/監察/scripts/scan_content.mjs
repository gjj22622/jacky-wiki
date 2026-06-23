// scan_content.mjs <repo> — 唯讀掃描：內容準確/過舊(a) + 邏輯前後不一(b)
// 用法：node scan_content.mjs "C:\...\Cladude Code 新手教學"
// 只讀檔、只印 JSON 摘要，不改任何東西。
import fs from "node:fs";
import path from "node:path";

const REPO = process.argv[2] || process.env.SHUANGYUN_SCHOOL_REPO;
const out = { repo: REPO, findings: [], facts: {}, ok: true };
const add = (sev, dim, msg, evidence) => out.findings.push({ sev, dim, msg, evidence });

function readSafe(p) { try { return fs.readFileSync(p, "utf8"); } catch { return null; } }
function existsDir(p) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }

if (!REPO || !existsDir(REPO)) {
  console.log(JSON.stringify({ error: "repo 路徑找不到", repo: REPO }, null, 2));
  process.exit(0);
}

// --- 母源資料夾解析（底線 vs 空格）---
const parent = path.resolve(REPO, "..");
const variants = ["双云AI_School", "双云AI School"].map(n => path.join(parent, n, "01_影片課程"));
const master = variants.find(existsDir);
if (!master) {
  add("🔴", "a", "內容母源 01_影片課程 找不到（底線/空格都試過）", variants);
} else {
  const buildSrc = path.join(parent, "双云AI School", "01_影片課程"); // build 腳本寫死
  if (master !== buildSrc && !existsDir(buildSrc)) {
    add("🟡", "b", "母源命名漂移：實際是底線版，但 build-course-json.js:13 寫死空格版『双云AI School』", { master, buildExpects: buildSrc });
  }
}

// --- 母源資料夾數 ---
let folderCount = null;
if (master) {
  const dirs = fs.readdirSync(master, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^L\d-\d{2}_/.test(d.name)).map(d => d.name);
  folderCount = dirs.length;
  out.facts.masterFolders = folderCount;
}

// --- course.json ---
const courseRaw = readSafe(path.join(REPO, "course.json"));
let course = null;
if (!courseRaw) add("🟡", "a", "course.json 讀不到", path.join(REPO, "course.json"));
else {
  try { course = JSON.parse(courseRaw); } catch { add("🔴", "b", "course.json 不是合法 JSON"); }
}
if (course) {
  out.facts.courseTotalLessons = course.totalLessons;
  out.facts.courseTotalDuration = course.totalDuration;
  // 逐課 slug 命名一致性
  const bad = [];
  for (const lv of course.levels || [])
    for (const ls of lv.lessons || [])
      if (!/^L\d-\d{2}_/.test(ls.slug || "")) bad.push(ls.slug || ls.id);
  if (bad.length) add("🔴", "b", `course.json 有 slug 不符 L#-## 命名`, bad);
  // 母源數 vs course.json
  if (folderCount != null && course.totalLessons !== folderCount)
    add("🔴", "b", `course.json totalLessons(${course.totalLessons}) ≠ 母源資料夾數(${folderCount})`, { course: course.totalLessons, master: folderCount });
  // course.json 是否比母源舊
  if (master) {
    try {
      const cjMtime = fs.statSync(path.join(REPO, "course.json")).mtimeMs;
      const newest = Math.max(...fs.readdirSync(master, { withFileTypes: true })
        .filter(d => d.isDirectory()).map(d => fs.statSync(path.join(master, d.name)).mtimeMs));
      if (newest > cjMtime) add("🟡", "a", "母源資料夾比 course.json 新 → course.json 可能過舊，需重跑 build-course-json.js", { courseMtime: new Date(cjMtime).toISOString(), masterNewest: new Date(newest).toISOString() });
    } catch {}
  }
}

// --- index.html 文案數字 ---
const html = readSafe(path.join(REPO, "public", "index.html"));
if (!html) add("🔴", "a", "public/index.html 讀不到");
else {
  // 影片數宣稱
  const vids = [...html.matchAll(/(\d+)\s*支影片/g)].map(m => +m[1]);
  out.facts.htmlVideoClaims = vids;
  if (course && vids.length && vids.some(v => v !== course.totalLessons))
    add("🔴", "b", `index.html「N 支影片」(${[...new Set(vids)]}) 與 course.json totalLessons(${course.totalLessons}) 不一致`, vids);
  // skill 數宣稱
  const skills = [...html.matchAll(/(\d+)\s*支(?:個人)?\s*skill/gi)].map(m => +m[1]);
  out.facts.htmlSkillClaims = skills;
  if (skills.length) add("🟡", "a", `index.html 宣稱 skill 數 ${[...new Set(skills)]} — 請對 jos/skills/skill總索引 或 ~/.claude/skills 實數`, skills);
  // 過期日期：抓 M/D 或 M月D日，對今天
  const now = new Date(); const yr = now.getFullYear();
  const dates = [...html.matchAll(/(\d{1,2})[\/月](\d{1,2})/g)].map(m => ({ raw: m[0], mo: +m[1], d: +m[2] }))
    .filter(x => x.mo >= 1 && x.mo <= 12 && x.d >= 1 && x.d <= 31);
  const past = dates.filter(x => new Date(yr, x.mo - 1, x.d) < new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  if (past.length) add("🟡", "a", `index.html 有疑似已過期日期（對今天 ${now.toISOString().slice(0,10)}）`, [...new Set(past.map(x=>x.raw))]);
  out.facts.htmlDates = [...new Set(dates.map(x=>x.raw))];
}

// --- zone 對稱（index.html data-zone ↔ app.js roleZones/zonePaths）---
const appjs = readSafe(path.join(REPO, "public", "app.js"));
if (html && appjs) {
  const htmlZones = new Set([...html.matchAll(/data-zone="([^"]+)"/g)].map(m => m[1]));
  const rzBlock = (appjs.match(/const roleZones\s*=\s*\{([\s\S]*?)\};/) || [])[1] || "";
  const roleZoneNames = new Set([...rzBlock.matchAll(/"?([a-z-]+)"?\s*:\s*\[([^\]]*)\]/g)].flatMap(m => [...m[2].matchAll(/"([^"]+)"/g)].map(z => z[1])));
  const zpBlock = (appjs.match(/const zonePaths\s*=\s*\{([\s\S]*?)\};/) || [])[1] || "";
  const pathZones = new Set([...zpBlock.matchAll(/"?([a-z-]+)"?\s*:/g)].map(m => m[1]));
  out.facts.htmlZones = [...htmlZones]; out.facts.roleZones = [...roleZoneNames]; out.facts.zonePaths = [...pathZones];
  for (const z of htmlZones) {
    if (!roleZoneNames.has(z)) add("🟡", "b", `zone「${z}」有 data-zone 但不在任何 roleZones`, z);
    if (!pathZones.has(z)) add("🟡", "b", `zone「${z}」有 data-zone 但不在 zonePaths`, z);
  }
  for (const z of roleZoneNames) if (!htmlZones.has(z)) add("🔴", "b", `roleZones 含「${z}」但 index.html 無對應 data-zone section`, z);
}

out.ok = !out.findings.some(f => f.sev === "🔴");
console.log(JSON.stringify(out, null, 2));
