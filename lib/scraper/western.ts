import * as cheerio from "cheerio";
import { Professor } from "../types";

interface RawProfessor {
  name: string;
  title: string;
  department: string;
  email: string;
  profileUrl: string;
  imageUrl?: string;
  researchAreas: string[];
  labName?: string;
  labUrl?: string;
  bio?: string;
}

// Updated department URLs
const DEPARTMENT_URLS: Record<string, string> = {
  "Computer Science": "https://www.csd.uwo.ca/people/faculty/index.html",
  "Biology": "https://www.uwo.ca/biology/people/faculty.html",
  "Mathematics": "https://www.math.uwo.ca/people/faculty.html",
  "Statistical & Actuarial Sciences": "https://www.uwo.ca/stats/people/faculty.html",
  "Physics & Astronomy": "https://physics.uwo.ca/people/faculty.html",
  "Chemistry": "https://www.uwo.ca/chem/people/faculty/index.html",
};

function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

function cleanName(name: string): string {
  return name
    .replace(/\s+/g, " ")
    .replace(/^(Dr\.?|Prof\.?)\s*/i, "")
    .replace(/\s*(Chair|Director|Head|Graduate|Undergraduate).*$/i, "")
    .trim();
}

function isValidProfessorName(name: string): boolean {
  if (!name || name.length < 4 || name.length > 50) return false;

  // Filter out common non-name patterns
  const invalidPatterns = [
    /^(faculty|staff|people|directory|contact|home|about|research|teaching)/i,
    /^(in memoriam|external link|webpage|cross.?appointed|adjunct|part.?time)/i,
    /^(full.?time|emeritus|sessional|lecturer|achievements)/i,
    /^(areas?\s+of\s+interest|interests?|lipid|food|biosynthesis|chemical|ecology|metabolism|systems)/i,
    /^www\./i,
    /^http/i,
    /\.html$/i,
    /^[A-Z]{2,}$/, // All caps acronyms
    /^\d+\)/, // Starts with number and parenthesis like "1)" or "2)"
    /^\d+\./, // Starts with number and period like "1." or "2."
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(name)) return false;
  }

  // Should contain at least two words (first and last name)
  const words = name.split(/\s+/);
  if (words.length < 2) return false;

  // First word should start with a capital letter (typical for names)
  // and not be a number
  if (!/^[A-Z]/.test(words[0])) return false;

  // Each word should start with a capital letter (typical for names)
  const hasProperCase = words.every(
    (word) => /^[A-Z]/.test(word) || word.length <= 2
  );

  return hasProperCase;
}

// Computer Science specific scraper
async function scrapeComputerScience(url: string): Promise<RawProfessor[]> {
  const html = await fetchPage(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const professors: RawProfessor[] = [];

  // CS page uses h2 tags for professor names
  $("h2").each((_, element) => {
    const $h2 = $(element);
    const name = cleanName($h2.text());

    if (!isValidProfessorName(name)) return;

    // Get the surrounding content for email and title
    const $container = $h2.parent();
    const containerText = $container.text();

    // Extract email
    const emailMatch = containerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/);
    const email = emailMatch ? emailMatch[1] : "";

    // Extract title from text
    let title = "Professor";
    if (/assistant\s+professor/i.test(containerText)) {
      title = "Assistant Professor";
    } else if (/associate\s+professor/i.test(containerText)) {
      title = "Associate Professor";
    } else if (/lecturer/i.test(containerText)) {
      title = "Lecturer";
    }

    // Extract research areas
    const researchMatch = containerText.match(/research[:\s]+([^.]+)/i);
    const researchAreas = researchMatch
      ? researchMatch[1]
          .split(/[,;]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2 && s.length < 60)
          .slice(0, 5)
      : [];

    // Get image
    const $img = $container.find("img").first();
    const imageUrl = $img.attr("src");

    // Get profile link
    const $link = $container.find('a[href*="biography"], a[href*="people"]').first();
    const profileUrl = $link.attr("href") || url;

    professors.push({
      name,
      title,
      department: "Computer Science",
      email,
      profileUrl: profileUrl.startsWith("http") ? profileUrl : new URL(profileUrl, url).href,
      imageUrl: imageUrl ? new URL(imageUrl, url).href : undefined,
      researchAreas,
    });
  });

  return professors;
}

// Biology specific scraper
async function scrapeBiology(url: string): Promise<RawProfessor[]> {
  const html = await fetchPage(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const professors: RawProfessor[] = [];

  // Biology page uses anchor-based navigation with strong tags
  // Look for professor sections marked by anchor IDs
  $('a[id]').each((_, element) => {
    const $anchor = $(element);
    const id = $anchor.attr("id") || "";

    // Skip non-professor anchors
    if (!id || id.length < 2 || /^(top|nav|menu)/i.test(id)) return;

    // Find the strong tag with the name near this anchor
    const $container = $anchor.parent();
    const $strong = $container.find("strong").first();

    if (!$strong.length) return;

    const name = cleanName($strong.text());
    if (!isValidProfessorName(name)) return;

    const containerText = $container.text();

    // Extract email
    const $emailLink = $container.find('a[href^="mailto:"]').first();
    const email = $emailLink.attr("href")?.replace("mailto:", "") || "";

    // Determine title
    let title = "Professor";
    if (/assistant\s+professor/i.test(containerText)) {
      title = "Assistant Professor";
    } else if (/associate\s+professor/i.test(containerText)) {
      title = "Associate Professor";
    }

    professors.push({
      name,
      title,
      department: "Biology",
      email,
      profileUrl: `${url}#${id}`,
      researchAreas: [],
    });
  });

  // Also try parsing strong tags directly if anchor approach didn't work well
  if (professors.length < 5) {
    $("strong").each((_, element) => {
      const $strong = $(element);
      const text = $strong.text().trim();

      // Check if this looks like a professor name
      if (!isValidProfessorName(text)) return;

      const name = cleanName(text);

      // Avoid duplicates
      if (professors.some((p) => p.name === name)) return;

      const $container = $strong.closest("p, div, li");
      const containerText = $container.text();

      const $emailLink = $container.find('a[href^="mailto:"]').first();
      const email = $emailLink.attr("href")?.replace("mailto:", "") || "";

      let title = "Professor";
      if (/assistant\s+professor/i.test(containerText)) {
        title = "Assistant Professor";
      } else if (/associate\s+professor/i.test(containerText)) {
        title = "Associate Professor";
      }

      professors.push({
        name,
        title,
        department: "Biology",
        email,
        profileUrl: url,
        researchAreas: [],
      });
    });
  }

  return professors;
}

// Generic scraper for other departments
async function scrapeGenericFacultyPage(
  department: string,
  url: string
): Promise<RawProfessor[]> {
  const html = await fetchPage(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const professors: RawProfessor[] = [];
  const seenNames = new Set<string>();

  // Try multiple approaches

  // Approach 1: Look for headings (h2, h3, h4) that might be names
  $("h2, h3, h4").each((_, element) => {
    const $heading = $(element);
    const text = $heading.text().trim();
    const name = cleanName(text);

    if (!isValidProfessorName(name)) return;
    if (seenNames.has(name.toLowerCase())) return;
    seenNames.add(name.toLowerCase());

    const $container = $heading.parent();
    const containerText = $container.text();

    const emailMatch = containerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/);
    const email = emailMatch ? emailMatch[1] : "";

    let title = "Professor";
    if (/assistant\s+professor/i.test(containerText)) {
      title = "Assistant Professor";
    } else if (/associate\s+professor/i.test(containerText)) {
      title = "Associate Professor";
    } else if (/lecturer/i.test(containerText)) {
      title = "Lecturer";
    }

    const $img = $container.find("img").first();
    const imageUrl = $img.attr("src");

    professors.push({
      name,
      title,
      department,
      email,
      profileUrl: url,
      imageUrl: imageUrl ? new URL(imageUrl, url).href : undefined,
      researchAreas: [],
    });
  });

  // Approach 2: Look for strong tags that might be names
  if (professors.length < 3) {
    $("strong, b").each((_, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      const name = cleanName(text);

      if (!isValidProfessorName(name)) return;
      if (seenNames.has(name.toLowerCase())) return;
      seenNames.add(name.toLowerCase());

      const $container = $el.closest("p, div, li, tr");
      const containerText = $container.text();

      const $emailLink = $container.find('a[href^="mailto:"]').first();
      const email = $emailLink.attr("href")?.replace("mailto:", "") || "";

      let title = "Professor";
      if (/assistant/i.test(containerText)) {
        title = "Assistant Professor";
      } else if (/associate/i.test(containerText)) {
        title = "Associate Professor";
      }

      professors.push({
        name,
        title,
        department,
        email,
        profileUrl: url,
        researchAreas: [],
      });
    });
  }

  return professors;
}

async function scrapeDepartmentPage(
  department: string,
  url: string
): Promise<RawProfessor[]> {
  console.log(`  Using ${department} scraper...`);

  switch (department) {
    case "Computer Science":
      return scrapeComputerScience(url);
    case "Biology":
      return scrapeBiology(url);
    default:
      return scrapeGenericFacultyPage(department, url);
  }
}

export async function scrapeAllDepartments(): Promise<Professor[]> {
  const allProfessors: Professor[] = [];

  for (const [department, url] of Object.entries(DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeDepartmentPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        email: rawProf.email,
        profileUrl: rawProf.profileUrl,
        imageUrl: rawProf.imageUrl,
        researchAreas: rawProf.researchAreas,
        labName: rawProf.labName,
        labUrl: rawProf.labUrl,
        bio: rawProf.bio,
        publications: [],
        lastUpdated: new Date().toISOString(),
      });
    }

    // Delay between departments
    await new Promise((r) => setTimeout(r, 1000));
  }

  return allProfessors;
}

export async function scrapeDepartment(department: string): Promise<Professor[]> {
  const url = DEPARTMENT_URLS[department];
  if (!url) {
    console.error(`Unknown department: ${department}`);
    return [];
  }

  const rawProfs = await scrapeDepartmentPage(department, url);

  return rawProfs.map((rawProf) => ({
    id: generateId(rawProf.name),
    name: rawProf.name,
    title: rawProf.title,
    department: rawProf.department,
    email: rawProf.email,
    profileUrl: rawProf.profileUrl,
    imageUrl: rawProf.imageUrl,
    researchAreas: rawProf.researchAreas,
    labName: rawProf.labName,
    labUrl: rawProf.labUrl,
    bio: rawProf.bio,
    publications: [],
    lastUpdated: new Date().toISOString(),
  }));
}
