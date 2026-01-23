import { scrapeAllDepartments } from "../lib/scraper/western";
import { getPublicationsForProfessor } from "../lib/scraper/openAlex";
import { ProfessorData } from "../lib/types";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting scrape...\n");

  // Step 1: Scrape Western faculty pages
  console.log("=== Phase 1: Scraping Western University ===\n");
  const professors = await scrapeAllDepartments();
  console.log(`\nTotal professors found: ${professors.length}\n`);

  // Step 2: Enrich with OpenAlex publications (100k requests/day limit)
  console.log("=== Phase 2: Fetching Publications from OpenAlex ===\n");

  let enrichedCount = 0;
  for (let i = 0; i < professors.length; i++) {
    const prof = professors[i];
    console.log(`[${i + 1}/${professors.length}] ${prof.name}...`);

    const publications = await getPublicationsForProfessor(prof.name);
    prof.publications = publications;

    if (publications.length > 0) {
      console.log(`  Found ${publications.length} publications`);
      enrichedCount++;
    } else {
      console.log(`  No publications found`);
    }
  }

  console.log(`\nEnriched ${enrichedCount}/${professors.length} professors with publications\n`);

  // Step 3: Generate output
  const departments = [...new Set(professors.map((p) => p.department))].sort();

  const data: ProfessorData = {
    professors,
    lastScraped: new Date().toISOString(),
    departments,
  };

  const outputPath = path.join(process.cwd(), "data", "professors.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`=== Done! ===`);
  console.log(`Output written to: ${outputPath}`);
  console.log(`Total professors: ${professors.length}`);
  console.log(`Departments: ${departments.join(", ")}`);
}

main().catch(console.error);
