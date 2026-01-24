import { scrapeAllDepartments } from "../lib/scraper/western";
import { getPublicationsForProfessor } from "../lib/scraper/openAlex";
import { ProfessorData, Professor } from "../lib/types";
import * as fs from "fs";
import * as path from "path";

// =============================================================================
// AI RESEARCH SUMMARY GENERATION (uncomment when you have ANTHROPIC_API_KEY)
// =============================================================================
// To enable:
// 1. Add ANTHROPIC_API_KEY to .env.local
// 2. Uncomment the code below and in Phase 3
// =============================================================================

// import Anthropic from "@anthropic-ai/sdk";
// const anthropic = new Anthropic();

// // Load existing data to preserve summaries (incremental updates)
// function loadExistingData(): Map<string, { researchSummary?: string; talkingPoints?: string[] }> {
//   const outputPath = path.join(process.cwd(), "data", "professors.json");
//   const existing = new Map<string, { researchSummary?: string; talkingPoints?: string[] }>();
//
//   try {
//     if (fs.existsSync(outputPath)) {
//       const data = JSON.parse(fs.readFileSync(outputPath, "utf-8")) as ProfessorData;
//       for (const prof of data.professors) {
//         if (prof.researchSummary) {
//           existing.set(prof.id, {
//             researchSummary: prof.researchSummary,
//             talkingPoints: prof.talkingPoints,
//           });
//         }
//       }
//     }
//   } catch {
//     // Ignore errors, will regenerate all summaries
//   }
//
//   return existing;
// }

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// // Batch process multiple professors in one API call for efficiency
// async function generateResearchSummariesBatch(
//   professors: Professor[]
// ): Promise<Map<string, { researchSummary: string; talkingPoints: string[] }>> {
//   const results = new Map<string, { researchSummary: string; talkingPoints: string[] }>();
//
//   if (professors.length === 0) return results;
//
//   // Build batch prompt
//   const professorEntries = professors.map((prof, idx) => {
//     const recentPubs = [...prof.publications]
//       .sort((a, b) => b.year - a.year)
//       .slice(0, 5);
//     const pubTitles = recentPubs.map((p) => `"${p.title}" (${p.year})`).join("; ");
//
//     return `[${idx + 1}] ${prof.name} (${prof.department})${prof.researchAreas.length > 0 ? ` - Areas: ${prof.researchAreas.slice(0, 3).join(", ")}` : ""}
// Publications: ${pubTitles}`;
//   }).join("\n\n");
//
//   try {
//     const message = await anthropic.messages.create({
//       model: "claude-3-5-haiku-latest",
//       max_tokens: 300 * professors.length, // ~300 tokens per professor
//       messages: [
//         {
//           role: "user",
//           content: `Generate research summaries for undergraduate students wanting to reach out to these professors.
//
// ${professorEntries}
//
// For EACH professor, provide a JSON object with:
// - "summary": 2-3 sentence research focus (student-friendly)
// - "talkingPoints": exactly 4 short questions/topics for outreach
//
// Respond with a JSON array in order:
// [{"summary": "...", "talkingPoints": ["...", "...", "...", "..."]}, ...]`,
//         },
//       ],
//     });
//
//     const content = message.content[0];
//     if (content.type !== "text") return results;
//
//     // Parse JSON array response
//     const parsed = JSON.parse(content.text);
//     if (Array.isArray(parsed)) {
//       parsed.forEach((item, idx) => {
//         if (idx < professors.length && item.summary && item.talkingPoints) {
//           results.set(professors[idx].id, {
//             researchSummary: item.summary,
//             talkingPoints: item.talkingPoints,
//           });
//         }
//       });
//     }
//   } catch (error) {
//     console.error(`  Batch error: ${error}`);
//   }
//
//   return results;
// }

// Keep Professor type used for type checking
void (null as unknown as Professor);

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

  // ===========================================================================
  // PHASE 3: AI RESEARCH SUMMARIES (uncomment when you have ANTHROPIC_API_KEY)
  // ===========================================================================
  // console.log("=== Phase 3: Generating AI Research Summaries ===\n");
  //
  // // Load existing summaries to avoid regenerating (saves API costs)
  // const existingSummaries = loadExistingData();
  // console.log(`Found ${existingSummaries.size} existing summaries to preserve\n`);
  //
  // // Filter professors who need summaries
  // const needsSummary: Professor[] = [];
  // let preservedCount = 0;
  //
  // for (const prof of professors) {
  //   // Skip if not enough publications
  //   if (prof.publications.length < 2) {
  //     continue;
  //   }
  //
  //   // Reuse existing summary if available
  //   const existing = existingSummaries.get(prof.id);
  //   if (existing) {
  //     prof.researchSummary = existing.researchSummary;
  //     prof.talkingPoints = existing.talkingPoints;
  //     preservedCount++;
  //   } else {
  //     needsSummary.push(prof);
  //   }
  // }
  //
  // console.log(`Preserved ${preservedCount} existing summaries`);
  // console.log(`Need to generate ${needsSummary.length} new summaries\n`);
  //
  // // Process in batches of 5 for efficiency (fewer API calls)
  // const BATCH_SIZE = 5;
  // let generatedCount = 0;
  //
  // for (let i = 0; i < needsSummary.length; i += BATCH_SIZE) {
  //   const batch = needsSummary.slice(i, i + BATCH_SIZE);
  //   console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(needsSummary.length / BATCH_SIZE)} (${batch.map(p => p.name).join(", ")})...`);
  //
  //   const results = await generateResearchSummariesBatch(batch);
  //
  //   for (const prof of batch) {
  //     const result = results.get(prof.id);
  //     if (result) {
  //       prof.researchSummary = result.researchSummary;
  //       prof.talkingPoints = result.talkingPoints;
  //       generatedCount++;
  //     }
  //   }
  //
  //   console.log(`  Generated ${results.size}/${batch.length} summaries`);
  //
  //   // Rate limiting between batches
  //   if (i + BATCH_SIZE < needsSummary.length) {
  //     await sleep(500);
  //   }
  // }
  //
  // const totalWithSummaries = preservedCount + generatedCount;
  // console.log(`\nTotal summaries: ${totalWithSummaries} (${preservedCount} preserved, ${generatedCount} new)\n`);
  // console.log(`API calls made: ${Math.ceil(needsSummary.length / BATCH_SIZE)} (batched)\n`);
  // ===========================================================================

  // Step 3: Generate output
  const departments = [...new Set(professors.map((p) => p.department))].sort();

  const universities = [...new Set(professors.map((p) => p.university))].sort();

  const data: ProfessorData = {
    professors,
    lastScraped: new Date().toISOString(),
    departments,
    universities,
  };

  const outputPath = path.join(process.cwd(), "data", "professors.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`=== Done! ===`);
  console.log(`Output written to: ${outputPath}`);
  console.log(`Total professors: ${professors.length}`);
  console.log(`Departments: ${departments.join(", ")}`);
}

main().catch(console.error);
