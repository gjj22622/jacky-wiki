/**
 * tag-tiers.mjs — 給 education/shuangyun 頁批次補 visibility: team + min_tier
 * 規則：按內容類型分層（L1 入門 / L2 實作 / L3 核心）；客戶機密頁排除不標。
 * AGENTS® 安全網由 publisher 處理（含此標記者自動鎖 L3），這裡不用管。
 * 用法：node tag-tiers.mjs [--write]   不帶 --write = dry-run 只印不改檔
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WIKI = resolve(HERE, "..", "..", "wiki");
const WRITE = process.argv.includes("--write");

// 客戶機密／純內部營運頁：不入大腦（不標 visibility）
const EXCLUDE = new Set([
  "education/pitfalls/gmail量寄與跨客戶洩漏掃描-採坑點.md",
  "education/playbooks/演講後跟進信-人工審核分批寄送SOP.md",
  "education/workshops/2026-06-19-airun營運風險監察/README.md",
  "education/workshops/2026-06-19-airun營運風險監察/slides-outline.md",
  "education/workshops/2026-06-19-airun營運風險監察/團隊與客戶分享文案.md",
  "education/workshops/2026-06-15-演講到業務開發全鏈/內部分享文案.md",
]);

// L1 入門／概覽（其餘預設 L2；L3 見下）
const L1 = new Set([
  "education/教育訓練索引.md",
  "education/README.md",
  "shuangyun/双云索引.md",
  "shuangyun/concepts/AI行銷部定義.md",
  "shuangyun/courses/課程總覽.md",
  "shuangyun/skills/双云技能索引.md",
]);
// L3 核心 IP／深度
const L3 = new Set([
  "shuangyun/concepts/AGENTS知識體系.md",
  "shuangyun/concepts/AGENTS方法論落地.md",
  "shuangyun/concepts/AGENTS認證手冊.md",
  "shuangyun/concepts/多品牌獨立應用架構.md",
]);

function tierOf(rel) {
  if (L1.has(rel)) return "L1";
  if (L3.has(rel)) return "L3";
  // workshop 概覽 README = L1（公開講過）；其餘 workshop 內容 = L2
  if (/^education\/workshops\/[^/]+\/README\.md$/.test(rel)) return "L1";
  return "L2"; // playbooks / pitfalls / slides / courses Week / skills / sop / concepts 其餘
}

import { readdirSync, statSync } from "node:fs";
function walk(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (n.endsWith(".md")) out.push(p);
  }
  return out;
}

const rows = [];
for (const domain of ["education", "shuangyun"]) {
  for (const abs of walk(join(WIKI, domain))) {
    const rel = abs.slice(WIKI.length + 1).split("\\").join("/");
    if (rel.startsWith("shuangyun/cases/")) { rows.push([rel, "—", "硬排除(cases)"]); continue; }
    if (EXCLUDE.has(rel)) { rows.push([rel, "—", "排除(客戶機密)"]); continue; }
    const text = readFileSync(abs, "utf8");
    if (/\nvisibility:\s*team/.test(text) || /^visibility:\s*team/m.test(text)) {
      rows.push([rel, "已標", "skip"]); continue;
    }
    const tier = tierOf(rel);
    const m = text.match(/^(---\r?\n[\s\S]*?\ndomain:[^\n]*\n)/);
    if (!m) { rows.push([rel, tier, "⚠ 無 domain frontmatter，跳過"]); continue; }
    const inject = `visibility: team\nmin_tier: ${tier}\n`;
    const next = text.replace(m[1], m[1] + inject);
    if (WRITE) writeFileSync(abs, next, "utf8");
    rows.push([rel, tier, WRITE ? "已寫入" : "將寫入"]);
  }
}

const tally = {};
for (const [, t] of rows) tally[t] = (tally[t] ?? 0) + 1;
for (const [rel, tier, note] of rows) console.log(`[${tier}] ${rel}  (${note})`);
console.log("\n=== 統計 ===");
for (const k of Object.keys(tally).sort()) console.log(`  ${k}: ${tally[k]}`);
console.log(WRITE ? "\n✅ 已寫入" : "\n（dry-run，未改檔；加 --write 才寫）");
