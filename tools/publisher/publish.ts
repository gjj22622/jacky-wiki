/**
 * publish.ts — 入庫扇出 publisher（Phase 0 最小版，可擴充）
 *
 * 流程：選頁(visibility+min_tier 閘門 + 路徑硬排除) → 清洗(剝 frontmatter/改寫連結/去敏)
 *       → 依 min_tier 累積扇出到 AnythingLLM 的 ${topic}-${tier} workspace → 冪等 upsert/下架
 *
 * 規範：零 npm 依賴；Node 24 原生跑 TS（type stripping）。
 * 用法：node publish.ts [--dry-run]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── 路徑錨點 ──────────────────────────────────────────────
const HERE = dirname(fileURLToPath(import.meta.url));      // tools/publisher
const REPO_ROOT = resolve(HERE, "..", "..");               // repo 根
const WIKI_ROOT = join(REPO_ROOT, "wiki");

// 路徑硬排除（相對 wiki/）：否決一切 frontmatter
// shuangyun/cases/ = 客戶真實案例，永不入庫（物理防線，凌駕去敏 backstop）
const WIKI_HARD_EXCLUDE = ["jlife/", "ailab/inbox/", "ailab/experiments/", "shuangyun/cases/"];
// repo 層硬排除（相對 repo 根）
const REPO_HARD_EXCLUDE = ["inbox/", "raw/"];

const TIER_ORDER = ["L1", "L2", "L3"];
const DRY_RUN = process.argv.includes("--dry-run");

// ── 設定 ─────────────────────────────────────────────────
type Config = {
  anythingLLM: { baseUrl: string; apiKeyEnv: string };
  visibilityWhitelist: string[];
  tiers: string[];
  activeTiers: string[];
  topics: string[];
};
function loadConfig(): Config {
  const p = join(HERE, "config.json");
  if (!existsSync(p)) {
    console.error("✗ 找不到 config.json，請複製 config.example.json 並填值。");
    process.exit(1);
  }
  return JSON.parse(readFileSync(p, "utf8"));
}

// ── frontmatter 解析（手寫小 parser，格式統一不需依賴）─────────
type Parsed = { fm: Record<string, string>; body: string };
function parseFrontmatter(text: string): Parsed {
  const t = text.replace(/^﻿/, "");
  if (!t.startsWith("---")) return { fm: {}, body: t };
  const end = t.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: t };
  const raw = t.slice(t.indexOf("\n") + 1, end);
  const after = t.slice(end + 4).replace(/^\r?\n/, "");
  const fm: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return { fm, body: after };
}

// ── 選頁 ─────────────────────────────────────────────────
type Page = {
  abs: string;
  sourceId: string;     // repo 相對路徑（POSIX）
  title: string;
  domain: string;
  minTier: string;
  body: string;
};
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}
function toPosixRel(abs: string): string {
  return relative(REPO_ROOT, abs).split("\\").join("/");
}
function isHardExcluded(sourceId: string): boolean {
  const wikiRel = sourceId.startsWith("wiki/") ? sourceId.slice(5) : null;
  if (wikiRel && WIKI_HARD_EXCLUDE.some((x) => wikiRel.startsWith(x))) return true;
  if (REPO_HARD_EXCLUDE.some((x) => sourceId.startsWith(x))) return true;
  return false;
}
function selectPages(cfg: Config, report: string[]): Page[] {
  const pages: Page[] = [];
  for (const abs of walk(WIKI_ROOT)) {
    const sourceId = toPosixRel(abs);
    const { fm, body } = parseFrontmatter(readFileSync(abs, "utf8"));
    const vis = fm["visibility"] ?? "";
    if (!cfg.visibilityWhitelist.includes(vis)) continue;                 // 預設拒絕
    if (!cfg.topics.includes(fm["domain"] ?? "")) continue;              // 主題閘
    if (isHardExcluded(sourceId)) {                                       // 路徑硬排除否決
      report.push(`⚠ 硬排除否決（誤標 visibility）：${sourceId}`);
      continue;
    }
    let minTier = TIER_ORDER.includes(fm["min_tier"] ?? "") ? fm["min_tier"] : "L3"; // 預設最深
    // AGENTS® IP 安全網：含此標記的頁一律鎖 L3（凌駕 frontmatter，核心方法論只進最深師傅級）
    if (body.includes("AGENTS®") && minTier !== "L3") {
      report.push(`🔒 AGENTS® 安全網：${sourceId} min_tier ${minTier}→L3`);
      minTier = "L3";
    }
    pages.push({
      abs,
      sourceId,
      title: fm["title"] ?? sourceId,
      domain: fm["domain"],
      minTier,
      body,
    });
  }
  return pages;
}

// ── 連結改寫（防斷鏈 / 防私密標題洩漏）────────────────────────
// PUBLISHED：以「解析後的目標 repo 相對路徑」為 key，值為標題
function buildPublishedMap(pages: Page[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const p of pages) m.set(p.sourceId, p.title);
  return m;
}
function resolveLinkTarget(fromAbs: string, url: string): string | null {
  // 只處理內部 .md（含相對 / wiki 絕對）；http(s)/錨點交給呼叫端
  let u = url.split("#")[0].trim();
  if (!u || u.endsWith("/")) return null;
  if (!u.endsWith(".md")) return null;
  const abs = u.startsWith("wiki/")
    ? join(REPO_ROOT, u)
    : resolve(dirname(fromAbs), u);
  return toPosixRel(abs);
}
function rewriteLinks(page: Page, published: Map<string, string>, report: string[]): string {
  let text = page.body;
  // markdown 連結 [text](url)
  text = text.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (full, label, url) => {
    const trimmed = String(url).trim();
    if (/^https?:\/\//i.test(trimmed)) return full;                 // 外部公開連結保留
    const target = resolveLinkTarget(page.abs, trimmed);
    if (target && published.has(target)) return `[${label}]`;        // 已發布 → 純文字
    report.push(`  剝除連結（未發布/斷鏈）@${page.sourceId} → ${trimmed}`);
    return "";                                                       // 連文字一起剝除（防標題洩漏）
  });
  // Obsidian wikilink [[target|alias]] / [[target]]
  text = text.replace(/\[\[([^\]]+)\]\]/g, (full, inner) => {
    const [t, alias] = String(inner).split("|");
    const base = t.replace(/\.md$/, "").split("/").pop() ?? t;
    // 是否能對到已發布頁（用檔名比對，最小版）
    for (const [sid, title] of published) {
      const fileName = sid.split("/").pop()?.replace(/\.md$/, "");
      if (fileName === base) return alias ?? title;
    }
    report.push(`  剝除 wikilink（未發布）@${page.sourceId} → ${full}`);
    return "";
  });
  return text;
}

// ── 去敏（fail-closed）──────────────────────────────────────
function loadDenylist(): string[] {
  const p = join(HERE, "denylist.txt");
  if (!existsSync(p)) return [];
  return readFileSync(p, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}
function sanitize(text: string, denylist: string[]): string[] {
  const hits: string[] = [];
  if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text)) hits.push("疑似 email");
  for (const name of denylist) if (text.includes(name)) hits.push(`denylist:${name}`);
  // AGENTS® 不再整頁擋（內部大腦核心 IP）；改由 selectPages 鎖 min_tier=L3 控管
  return hits;
}

// ── 內容組裝（剝 frontmatter，標題開頭）──────────────────────
function assemble(page: Page, rewritten: string): string {
  const bodyHasH1 = /^\s*#\s/.test(rewritten);
  const head = bodyHasH1 ? "" : `# ${page.title}\n\n`;
  return `${head}${rewritten}`.trim() + "\n";
}
function hashOf(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

// ── 扇出目標 workspace ──────────────────────────────────────
function slug(topic: string, tier: string): string {
  return `${topic}-${tier}`.toLowerCase();
}
function targetWorkspaces(page: Page, cfg: Config): string[] {
  const minIdx = TIER_ORDER.indexOf(page.minTier);
  return cfg.activeTiers
    .filter((t) => TIER_ORDER.indexOf(t) >= minIdx)   // 累積：>= min_tier
    .map((t) => slug(page.domain, t));
}

// ── AnythingLLM client（global fetch，零依賴）─────────────────
class Brain {
  base: string;
  key: string;
  constructor(base: string, key: string) { this.base = base; this.key = key; }
  private h() {
    return { Authorization: `Bearer ${this.key}`, "Content-Type": "application/json" };
  }
  async listWorkspaceSlugs(): Promise<Set<string>> {
    const r = await fetch(`${this.base}/api/v1/workspaces`, { headers: this.h() });
    if (!r.ok) throw new Error(`列 workspaces 失敗 ${r.status}`);
    const j: any = await r.json();
    return new Set((j.workspaces ?? []).map((w: any) => String(w.slug)));
  }
  async ensureWorkspace(name: string): Promise<void> {
    const r = await fetch(`${this.base}/api/v1/workspace/new`, {
      method: "POST", headers: this.h(), body: JSON.stringify({ name }),
    });
    if (!r.ok && r.status !== 200) throw new Error(`建 workspace ${name} 失敗 ${r.status}`);
  }
  // 上傳純文字並嵌入指定 workspace（一次到位），回傳 document location
  async upload(text: string, title: string, workspaces: string[]): Promise<string> {
    const r = await fetch(`${this.base}/api/v1/document/raw-text`, {
      method: "POST", headers: this.h(),
      body: JSON.stringify({
        textContent: text,
        addToWorkspaces: workspaces.join(","),
        metadata: { title, source: "jacky-wiki-publisher" },
      }),
    });
    if (!r.ok) throw new Error(`上傳 ${title} 失敗 ${r.status} ${await r.text()}`);
    const j: any = await r.json();
    const loc = j?.documents?.[0]?.location;
    if (!loc) throw new Error(`上傳 ${title} 無回傳 location`);
    return loc;
  }
  async removeFromWorkspace(slug: string, location: string): Promise<void> {
    await fetch(`${this.base}/api/v1/workspace/${slug}/update-embeddings`, {
      method: "POST", headers: this.h(), body: JSON.stringify({ adds: [], deletes: [location] }),
    });
  }
  async deleteDocument(location: string): Promise<void> {
    await fetch(`${this.base}/api/v1/system/remove-documents`, {
      method: "DELETE", headers: this.h(), body: JSON.stringify({ names: [location] }),
    }).catch(() => {});
  }
}

// ── manifest（冪等狀態）─────────────────────────────────────
type Manifest = Record<string, { hash: string; location: string; workspaces: string[] }>;
function loadManifest(): Manifest {
  const p = join(HERE, "manifest.json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
}
function saveManifest(m: Manifest): void {
  writeFileSync(join(HERE, "manifest.json"), JSON.stringify(m, null, 2), "utf8");
}

// ── 主流程 ───────────────────────────────────────────────
async function main() {
  const cfg = loadConfig();
  const report: string[] = [`# 發布報告（${DRY_RUN ? "DRY-RUN" : "LIVE"}）`, ""];
  const denylist = loadDenylist();

  const pages = selectPages(cfg, report);
  const published = buildPublishedMap(pages);
  report.push(`納入候選：${pages.length} 頁（主題=${cfg.topics.join(",")}，白名單=${cfg.visibilityWhitelist.join(",")}）`, "");

  // 清洗 + 去敏
  type Prepared = Page & { content: string; hash: string; targets: string[] };
  const prepared: Prepared[] = [];
  for (const page of pages) {
    const rewritten = rewriteLinks(page, published, report);
    const content = assemble(page, rewritten);
    const hits = sanitize(content, denylist);
    if (hits.length) {
      report.push(`🛑 去敏命中，整頁退出：${page.sourceId} → ${hits.join("; ")}`);
      continue;
    }
    const targets = targetWorkspaces(page, cfg);
    prepared.push({ ...page, content, hash: hashOf(content), targets });
  }

  const manifest = loadManifest();
  const keptIds = new Set(prepared.map((p) => p.sourceId));

  if (DRY_RUN) {
    for (const p of prepared) report.push(`= ${p.sourceId} → [${p.targets.join(", ")}]`);
    for (const sid of Object.keys(manifest)) if (!keptIds.has(sid)) report.push(`↩ 將下架：${sid}`);
    writeFileSync(join(HERE, "report.md"), report.join("\n") + "\n", "utf8");
    console.log(report.join("\n"));
    return;
  }

  const key = process.env[cfg.anythingLLM.apiKeyEnv];
  if (!key) { console.error(`✗ 環境變數 ${cfg.anythingLLM.apiKeyEnv} 未設`); process.exit(1); }
  const brain = new Brain(cfg.anythingLLM.baseUrl, key);

  // 確保 workspace 存在
  const existing = await brain.listWorkspaceSlugs();
  const needed = new Set(prepared.flatMap((p) => p.targets));
  for (const wsSlug of needed) {
    if (!existing.has(wsSlug)) { await brain.ensureWorkspace(wsSlug); report.push(`＋建 workspace：${wsSlug}`); }
  }

  // upsert
  for (const p of prepared) {
    const prev = manifest[p.sourceId];
    if (prev && prev.hash === p.hash && sameSet(prev.workspaces, p.targets)) {
      report.push(`· 不變略過：${p.sourceId}`);
      continue;
    }
    if (prev) { // 變更 → 先撤舊
      for (const ws of prev.workspaces) await brain.removeFromWorkspace(ws, prev.location);
      await brain.deleteDocument(prev.location);
    }
    const loc = await brain.upload(p.content, p.title, p.targets);
    manifest[p.sourceId] = { hash: p.hash, location: loc, workspaces: p.targets };
    report.push(`${prev ? "↻ 更新" : "＋新增"}：${p.sourceId} → [${p.targets.join(", ")}]`);
  }

  // 下架（本次不再納入但上次有）
  for (const sid of Object.keys(manifest)) {
    if (keptIds.has(sid)) continue;
    const old = manifest[sid];
    for (const ws of old.workspaces) await brain.removeFromWorkspace(ws, old.location);
    await brain.deleteDocument(old.location);
    delete manifest[sid];
    report.push(`↩ 已下架（撤回）：${sid}`);
  }

  saveManifest(manifest);
  writeFileSync(join(HERE, "report.md"), report.join("\n") + "\n", "utf8");
  console.log(report.join("\n"));
}
function sameSet(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((x) => b.includes(x));
}

main().catch((e) => { console.error(e); process.exit(1); });
