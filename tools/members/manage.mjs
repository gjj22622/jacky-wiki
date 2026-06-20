/**
 * manage.mjs — AI 大腦成員與金鑰治理 CLI（零依賴，Node 24）
 *
 * 本機 members.json = 成員名冊真相來源（gitignored）；本工具編輯它並同步到 Zeabur 的
 * MEMBERS_JSON_B64 環境變數（base64，避免 CLI 引號/逗號轉義坑），再觸發 fulfillment 重新部署。
 *
 * 用法：
 *   node manage.mjs list
 *   node manage.mjs add <id> <L1|L2|L3> <topic1,topic2,...> ["顯示名"]
 *   node manage.mjs rotate <id>          # 換新 key（舊 key 立即失效）
 *   node manage.mjs revoke <id>          # 移除成員
 *   node manage.mjs sync                 # 算 base64 + 推 Zeabur + redeploy
 *   node manage.mjs b64                   # 只印 base64（手動貼）
 *
 * 規範：金鑰只在 add/rotate 當下印出一次，請立刻存進金庫；members.json 永不進 git。
 */
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROSTER = resolve(HERE, "..", "..", "services", "fulfillment", "members.json");
const AUDIT = join(HERE, "members-audit.log");
const VALID_TIERS = ["L1", "L2", "L3"];
const VALID_TOPICS = ["cross-domain", "education", "shuangyun"];

// Zeabur 目標（與金庫一致）
const SERVICE_ID = "6a371cf546477d60388419fe";
const ENV_ID = "6a371b3379260dbd87843439";

function load() {
  if (!existsSync(ROSTER)) return { members: [] };
  return JSON.parse(readFileSync(ROSTER, "utf8"));
}
function save(data) { writeFileSync(ROSTER, JSON.stringify(data, null, 2) + "\n", "utf8"); }
function audit(action, detail) {
  appendFileSync(AUDIT, JSON.stringify({ action, ...detail, at: new Date().toISOString() }) + "\n", "utf8");
}
function genKey() { return "jaibrain_" + randomBytes(24).toString("hex"); }
function mask(k) { return k.slice(0, 12) + "…" + k.slice(-4); }
function b64() {
  return Buffer.from(JSON.stringify(load()), "utf8").toString("base64");
}

const [cmd, ...args] = process.argv.slice(2);
const data = load();

switch (cmd) {
  case "list": {
    console.log(`成員名冊（${data.members.length} 位）— 來源 ${ROSTER}`);
    for (const m of data.members)
      console.log(`  ${m.id.padEnd(14)} ${m.tier}  [${(m.topics || []).join(",")}]  ${mask(m.api_key)}  ${m.name ?? ""}`);
    break;
  }
  case "add": {
    const [id, tier, topicsCsv, name] = args;
    if (!id || !tier || !topicsCsv) { console.error("用法：add <id> <L1|L2|L3> <topic1,topic2> [\"名\"]"); process.exit(1); }
    if (!VALID_TIERS.includes(tier)) { console.error(`tier 必須是 ${VALID_TIERS.join("/")}`); process.exit(1); }
    const topics = topicsCsv.split(",").map((s) => s.trim());
    const bad = topics.filter((t) => !VALID_TOPICS.includes(t));
    if (bad.length) { console.error(`未知主題：${bad.join(",")}（合法：${VALID_TOPICS.join("/")}）`); process.exit(1); }
    if (data.members.some((m) => m.id === id)) { console.error(`成員 ${id} 已存在`); process.exit(1); }
    const api_key = genKey();
    data.members.push({ id, name: name ?? id, tier, topics, api_key });
    save(data);
    audit("add", { id, tier, topics });
    console.log(`✅ 已新增 ${id}（${tier}, ${topics.join(",")}）`);
    console.log(`🔑 api_key（只顯示這一次，立刻存金庫）：\n   ${api_key}`);
    console.log(`\n下一步：node manage.mjs sync  把名冊推上線`);
    break;
  }
  case "rotate": {
    const [id] = args;
    const m = data.members.find((x) => x.id === id);
    if (!m) { console.error(`找不到 ${id}`); process.exit(1); }
    const api_key = genKey();
    m.api_key = api_key;
    save(data);
    audit("rotate", { id });
    console.log(`✅ ${id} 已換新 key（舊 key sync 後立即失效）`);
    console.log(`🔑 新 api_key：\n   ${api_key}`);
    console.log(`\n下一步：node manage.mjs sync`);
    break;
  }
  case "revoke": {
    const [id] = args;
    const before = data.members.length;
    data.members = data.members.filter((x) => x.id !== id);
    if (data.members.length === before) { console.error(`找不到 ${id}`); process.exit(1); }
    save(data);
    audit("revoke", { id });
    console.log(`✅ 已移除 ${id}；sync 後其 key 立即失效`);
    console.log(`\n下一步：node manage.mjs sync`);
    break;
  }
  case "b64": {
    console.log(b64());
    break;
  }
  case "sync": {
    const value = b64();
    console.log("推送 MEMBERS_JSON_B64 到 Zeabur…");
    execFileSync("npx", ["zeabur@latest", "variable", "update", "--id", SERVICE_ID, "--env-id", ENV_ID, "-y", "-i=false", "-k", `MEMBERS_JSON_B64=${value}`], { stdio: "inherit", shell: true });
    console.log("重新部署 fulfillment…");
    execFileSync("npx", ["zeabur@latest", "deploy", "--service-id", SERVICE_ID, "--environment-id", ENV_ID, "-i=false"], { stdio: "inherit", shell: true });
    audit("sync", { count: data.members.length });
    console.log(`✅ 已同步 ${data.members.length} 位成員上線`);
    break;
  }
  default:
    console.log("用法：list | add <id> <tier> <topics> [名] | rotate <id> | revoke <id> | sync | b64");
}
