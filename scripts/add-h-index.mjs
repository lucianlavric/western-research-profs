// One-off enrichment: fetch each professor's real h-index from OpenAlex
// (summary_stats.h_index) and write hIndex into data/professors.json.
// Matches the same Western-affiliation logic used by lib/scraper/openAlex.ts.
import { readFileSync, writeFileSync } from "node:fs";

const DATA = new URL("../data/professors.json", import.meta.url);
const API = "https://api.openalex.org";
const MAILTO = "western-research-profs@example.com";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function isWestern(author) {
  const patterns = ["western university", "university of western ontario"];
  for (const inst of author.last_known_institutions || []) {
    const name = (inst.display_name || "").toLowerCase();
    if (inst.country_code === "CA" && patterns.some((p) => name.includes(p))) return true;
  }
  return false;
}

async function fetchHIndex(name) {
  const q = encodeURIComponent(name);
  const url = `${API}/authors?filter=display_name.search:${q}&per_page=25&select=id,display_name,works_count,last_known_institutions,summary_stats&mailto=${MAILTO}`;
  // Retry on 429 (rate limit) with exponential backoff
  let res;
  for (let attempt = 0; attempt < 5; attempt++) {
    res = await fetch(url);
    if (res.status !== 429) break;
    await delay(1000 * 2 ** attempt);
  }
  if (!res.ok) {
    console.error(`  search failed ${res.status} for ${name}`);
    return undefined; // undefined = fetch error (retry later); null = genuine no-match
  }
  const data = await res.json();
  const match = (data.results || []).find((a) => isWestern(a) && a.works_count > 0);
  if (!match) return null;
  const h = match.summary_stats?.h_index;
  return typeof h === "number" ? h : null;
}

const json = JSON.parse(readFileSync(DATA, "utf8"));
const profs = json.professors;
let matched = 0;

for (let i = 0; i < profs.length; i++) {
  const p = profs[i];
  // Skip profs already enriched (allows re-running after rate-limit failures)
  if (typeof p.hIndex === "number") { matched++; continue; }
  await delay(1000);
  try {
    const h = await fetchHIndex(p.name);
    if (typeof h === "number") {
      p.hIndex = h;
      matched++;
    }
    console.log(`[${i + 1}/${profs.length}] ${p.name}: ${h === undefined ? "FETCH ERROR" : h ?? "no match"}`);
  } catch (e) {
    console.error(`  error for ${p.name}:`, e.message);
  }
  // Persist incrementally so progress survives interruption
  if (i % 25 === 0) writeFileSync(DATA, JSON.stringify(json, null, 2) + "\n");
}

writeFileSync(DATA, JSON.stringify(json, null, 2) + "\n");
console.log(`\nDone. Matched h-index for ${matched}/${profs.length} professors.`);
