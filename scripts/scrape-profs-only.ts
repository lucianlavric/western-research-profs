import { scrapeAllDepartments } from "../lib/scraper/western";
import { ProfessorData } from "../lib/types";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting quick scrape (professors only, no publications)...\n");

  // Scrape Western faculty pages
  console.log("=== Scraping Western University ===\n");
  const professors = await scrapeAllDepartments();
  console.log(`\nTotal professors found: ${professors.length}\n`);

  // Generate output
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
