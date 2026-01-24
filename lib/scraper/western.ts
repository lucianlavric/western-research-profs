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

// Science Faculty department URLs
const SCIENCE_DEPARTMENT_URLS: Record<string, string> = {
  "Computer Science": "https://www.csd.uwo.ca/people/faculty/index.html",
  "Biology": "https://www.uwo.ca/biology/people/faculty.html",
  "Mathematics": "https://www.math.uwo.ca/people/faculty.html",
  "Statistical & Actuarial Sciences": "https://www.uwo.ca/stats/people/faculty.html",
  "Physics & Astronomy": "https://physics.uwo.ca/people/faculty/index.html",
  "Chemistry": "https://www.uwo.ca/chem/people/faculty/index.html",
};

// Schulich Medicine & Dentistry department URLs
const SCHULICH_DEPARTMENT_URLS: Record<string, string[]> = {
  // Basic Medical Sciences
  "Physiology & Pharmacology": [
    "https://www.schulich.uwo.ca/physpharm/people/faculty/core%20faculty.html",
  ],
  "Biochemistry": [
    "https://www.schulich.uwo.ca/biochem/people/faculty_primary.html",
  ],
  "Anatomy & Cell Biology": [
    "https://www.schulich.uwo.ca/anatomy/people/faculty.html",
  ],
  "Microbiology & Immunology": [
    "https://www.schulich.uwo.ca/microbiologyandimmunology/people/faculty-index.html",
  ],
  "Epidemiology & Biostatistics": [
    "https://www.schulich.uwo.ca/epibio/people/faculty/core_faculty/index.html",
  ],
  "Pathology & Laboratory Medicine": [
    "https://www.schulich.uwo.ca/pathol/people/faculty/index.html",
  ],
  "Medical Biophysics": [
    "https://www.schulich.uwo.ca/biophysics/people/faculty/Core%20Faculty.html",
  ],
  // Clinical Departments
  "Dentistry": [
    "https://www.schulich.uwo.ca/dentistry/about-us/people/faculty/index.html",
  ],
  "Family Medicine": [
    "https://www.schulich.uwo.ca/familymedicine/people/ft_faculty/index.html",
  ],
  "Oncology": [
    "https://www.schulich.uwo.ca/oncology/people/Faculty.html",
  ],
  "Ophthalmology": [
    "https://www.schulich.uwo.ca/ophthalmology/people/faculty/index.html",
  ],
  "Paediatrics": [
    "https://www.schulich.uwo.ca/paediatrics/about_us/people/faculty/index.html",
  ],
  "Psychiatry": [
    "https://www.schulich.uwo.ca/psychiatry/people/faculty.html",
  ],
  "Surgery": [
    "https://www.schulich.uwo.ca/surgery/people/faculty/index.html",
  ],
};

// Engineering Faculty department URLs
const ENGINEERING_DEPARTMENT_URLS: Record<string, string> = {
  "Electrical & Computer Engineering": "https://www.eng.uwo.ca/electrical/people/faculty.html",
  "Mechanical & Materials Engineering": "https://www.eng.uwo.ca/mechanical/people/faculty.html",
  "Chemical & Biochemical Engineering": "https://www.eng.uwo.ca/chemical/people/faculty.html",
  "Civil & Environmental Engineering": "https://www.eng.uwo.ca/civil/people/faculty.html",
};

// Social Science Faculty department URLs
const SOCIAL_SCIENCE_DEPARTMENT_URLS: Record<string, string> = {
  "Psychology": "https://psychology.uwo.ca/people/faculty/fulltime.html",
  "Political Science": "https://politicalscience.uwo.ca/people/faculty/full-time_faculty/index.html",
  "History": "https://history.uwo.ca/people/faculty/full_time_faculty.html",
  "Anthropology": "https://anthropology.uwo.ca/people/fulltime_faculty.html",
  "Sociology": "https://sociology.uwo.ca/people/faculty/full-time-faculty.html",
  "Geography & Environment": "https://geoenvironment.uwo.ca/people/full-time-faculty/index.html",
};

// Arts & Humanities Faculty department URLs
const ARTS_HUMANITIES_DEPARTMENT_URLS: Record<string, string> = {
  "English & Writing Studies": "https://www.uwo.ca/english/people/fulltime.html",
  "Philosophy": "https://www.uwo.ca/philosophy/people/fulltime.html",
  "French Studies": "https://www.uwo.ca/french/people/faculty/index.html",
};

// Health Sciences Faculty department URLs
const HEALTH_SCIENCES_DEPARTMENT_URLS: Record<string, string> = {
  "Kinesiology": "https://www.uwo.ca/fhs/kin/about/faculty/index.html",
  "Nursing": "https://www.uwo.ca/fhs/nursing/about/faculty/index.html",
};

// Other Faculties URLs
const OTHER_FACULTY_URLS: Record<string, string> = {
  "Law": "https://law.uwo.ca/about_us/faculty/index.html",
  "Education": "https://www.edu.uwo.ca/faculty-profiles/index.html",
  "Music": "https://music.uwo.ca/about/faculty-staff-listings.html",
  "Information & Media Studies": "https://www.fims.uwo.ca/people/faculty_full_time.html",
  "Ivey Business School": "https://www.ivey.uwo.ca/faculty/directory/",
};

// Combined department URLs for backwards compatibility
const DEPARTMENT_URLS: Record<string, string> = {
  ...SCIENCE_DEPARTMENT_URLS,
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
  let cleaned = name
    .replace(/\s+/g, " ")
    .replace(/^(Dr\.?|Prof\.?)\s*/i, "")
    .replace(/\s*(Chair|Director|Head|Graduate|Undergraduate).*$/i, "")
    // Remove credentials in parentheses like "(PhD)", "(MD, MPH)", etc.
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim();

  // Convert "Last, First" or "Last, First Middle" format to "First [Middle] Last"
  // Handles various name patterns including hyphenated names and accented characters
  const lastFirstMatch = cleaned.match(/^([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+(?:\s+[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)?),\s*([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+(?:\s+[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ.\s'-]*)?)$/);
  if (lastFirstMatch) {
    cleaned = `${lastFirstMatch[2].trim()} ${lastFirstMatch[1].trim()}`;
  }

  return cleaned;
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
    // Additional filters for non-professor entries
    /department/i,
    /tutors?$/i,
    /course\s+information/i,
    /terms\s+of\s+use/i,
    /privacy\s+policy/i,
    /accessibility/i,
    /copyright/i,
    /all\s+rights/i,
    /^back\s+to/i,
    /^view\s+all/i,
    /^see\s+all/i,
    /^more\s+info/i,
    /^read\s+more/i,
    /^learn\s+more/i,
    /^click\s+here/i,
    /^(office|room|building|phone|fax|email)\s*(:|address)/i,
    /^graduate\s+students?/i,
    /^undergraduate/i,
    /^postdoc/i,
    /^(research|lab)\s+(assistant|associate|technician|coordinator)/i,
    /^administrative/i,
    /^support\s+staff/i,
    /^technical\s+staff/i,
    /(committee|council|board)$/i,
    /^(news|events|announcements)/i,
    /^(current|former|past)\s+(students?|members?)/i,
    /^alumni/i,
    /^\d{4}/, // Starts with a year
    /\d{4}$/, // Ends with a year
    /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    /^page\s+\d/i,
    /^section/i,
    /^chapter/i,
    /^appendix/i,
    /^\(.*\)$/, // Entirely in parentheses
    /^[\[\(]/, // Starts with bracket
    /[\]\)]$/, // Ends with bracket
    // Navigation and UI elements
    /^(skip\s+to|jump\s+to|go\s+to)/i,
    /^(main\s+content|navigation|menu|sidebar|footer|header)/i,
    /^(search|filter|sort|show|hide|toggle|expand|collapse)/i,
    /^(submit|cancel|save|delete|edit|update|create|add|remove)/i,
    /^(login|logout|sign\s+(in|out|up)|register)/i,
    /^(next|previous|prev|first|last)\s*(page)?$/i,
    // Schulich-specific patterns
    /^core\s+faculty$/i,
    /^primary\s+faculty$/i,
    /^cross[- ]?appointed/i,
    /^affiliated/i,
    /^joint\s+appointment/i,
    /^honorary/i,
    /^visiting/i,
    /^clinical\s+faculty$/i,
    /^basic\s+science/i,
    // Common non-name headings
    /^(overview|introduction|summary|description|details)/i,
    /^(programs?|courses?|curriculum|degrees?)/i,
    /^(admissions?|apply|applications?)/i,
    /^(funding|scholarships?|awards?|grants?)/i,
    /^(facilities|equipment|resources)/i,
    /^(partnerships?|collaborations?|industry)/i,
    /^(publications?|papers?|articles?)/i,
    /^(contact\s+us|get\s+in\s+touch)/i,
    /^(our\s+team|meet\s+the|the\s+team)/i,
    /^(welcome|greetings)/i,
    // Single common words that aren't names
    /^(information|location|address|directions)$/i,
    /^(calendar|schedule|timetable)$/i,
    /^(index|list|table|directory)$/i,
    /^(photo|image|gallery|video)s?$/i,
    /^(download|upload|file|document)s?$/i,
    /^(link|url|website|web\s+page)s?$/i,
    // Numbers and special characters
    /^\d+$/, // Just numbers
    /^[^a-zA-Z]+$/, // No letters at all
    /[@#$%^&*+={}|\\/<>]/,  // Special characters not in names
    // University page-specific patterns
    /^future\s+students?/i,
    /^current\s+students?/i,
    /^prospective\s+(students?|scholars?)/i,
    /^incoming\s+(students?|scholars?)/i,
    /career\s+(development|services?|opportunities)/i,
    /^living\s+in/i,
    /^competitive\s+edge/i,
    /^appointment\s+summary/i,
    /^own\s+your\s+future/i,
    /^positions?\s+available/i,
    /^our\s+history/i,
    /^related\s+links?/i,
    /^academic\s+counselling/i,
    /^(doctor|master)\s+of/i,
    /^(bachelor|diploma)\s+of/i,
    /^important\s+resources/i,
    /^recent\s+publications/i,
    /^core[- ]?facilities/i,
    /administrative\s+staff/i,
    /^student\s+finances/i,
    /^financial\s+support/i,
    /^areas?\s+of\s+research/i,
    /^monthly\s+newsletter/i,
    /^seminar\s+series/i,
    /^body\s+bequeathal/i,
    /^outreach\s+programs?/i,
    /room\s+booking/i,
    /gives\s+back/i,
    /^work\s+study/i,
    /^job\s+opportunities/i,
    /^room\s+reservations?/i,
    /^year\s+\d/i,
    /research\s+project$/i,
    /^virtual\s+theses/i,
    /^methodology\s+clinics/i,
    /^strategic\s+goals/i,
    /photo\s+galleries/i,
    /^named\s+seminars/i,
    /research\s+day$/i,
    /^emeriti\s+faculty/i,
    /^campus\s+maps?/i,
    /^(laboratory|lab)\s+training/i,
    /^residency\s+programs?/i,
    /^prospective\s+residents?/i,
    /^advanced\s+training/i,
    /^pathology\s+core/i,
    /lecture\s+series$/i,
    /^cme\s+events?/i,
    /^employment\s+opportunities/i,
    /^western\s+pathology/i,
    /newsletter$/i,
    /merchandise$/i,
    /assistant$/i,
    // More specific invalid entries
    /^current\s+scholars$/i,
    /^bmsc\s+counselling$/i,
    /^r\.?g\.?e\.?\s+murray$/i,
    /counselling$/i,
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(name)) return false;
  }

  // Note: "Last, First" format names are now converted by cleanName() to "First Last"
  // So we no longer reject them here

  // Should contain at least two words (first and last name)
  const words = name.split(/\s+/);
  if (words.length < 2) return false;

  // Reject if too many words (likely not a name)
  if (words.length > 6) return false;

  // First word should start with a capital letter (typical for names)
  // and not be a number
  if (!/^[A-Z]/.test(words[0])) return false;

  // Reject if any word is too long (likely not a name)
  if (words.some((word) => word.length > 20)) return false;

  // Each word should start with a capital letter (typical for names)
  const hasProperCase = words.every(
    (word) => /^[A-Z]/.test(word) || word.length <= 2 || /^(van|von|de|del|der|la|le|di|da|dos|du)$/i.test(word)
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

// Schulich Medicine scraper
async function scrapeSchulichDepartment(
  department: string,
  urls: string[]
): Promise<RawProfessor[]> {
  const professors: RawProfessor[] = [];
  const seenNames = new Set<string>();

  for (const url of urls) {
    const html = await fetchPage(url);
    if (!html) continue;

    const $ = cheerio.load(html);

    // Schulich pages use h2 or h3 for faculty names depending on the department
    $("h2, h3").each((_, element) => {
      const $heading = $(element);
      const text = $heading.text().trim();
      const name = cleanName(text);

      if (!isValidProfessorName(name)) return;
      if (seenNames.has(name.toLowerCase())) return;
      seenNames.add(name.toLowerCase());

      // Get the container - could be parent or sibling elements
      const $container = $heading.parent();
      const containerText = $container.text();

      // Extract email
      const $emailLink = $container.find('a[href^="mailto:"]').first();
      let email = $emailLink.attr("href")?.replace("mailto:", "") || "";

      // Also try regex if no mailto link
      if (!email) {
        const emailMatch = containerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/);
        email = emailMatch ? emailMatch[1] : "";
      }

      // Determine title
      let title = "Professor";
      if (/assistant\s+professor/i.test(containerText)) {
        title = "Assistant Professor";
      } else if (/associate\s+professor/i.test(containerText)) {
        title = "Associate Professor";
      }

      // Get biography link
      const $bioLink = $container.find('a[href*="biography"], a[href*=".html"]').first();
      let profileUrl = $bioLink.attr("href") || url;
      if (profileUrl && !profileUrl.startsWith("http")) {
        profileUrl = new URL(profileUrl, url).href;
      }

      professors.push({
        name,
        title,
        department,
        email,
        profileUrl,
        researchAreas: [],
      });
    });

    // Also try looking for links that contain faculty names (some pages structure differently)
    if (professors.length < 3) {
      $('a[href*=".html"]').each((_, element) => {
        const $a = $(element);
        const text = $a.text().trim();
        const name = cleanName(text);

        if (!isValidProfessorName(name)) return;
        if (seenNames.has(name.toLowerCase())) return;
        seenNames.add(name.toLowerCase());

        let profileUrl = $a.attr("href") || url;
        if (profileUrl && !profileUrl.startsWith("http")) {
          profileUrl = new URL(profileUrl, url).href;
        }

        professors.push({
          name,
          title: "Professor",
          department,
          email: "",
          profileUrl,
          researchAreas: [],
        });
      });
    }
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

  // Scrape Science Faculty departments
  console.log("=== Scraping Science Faculty ===");
  for (const [department, url] of Object.entries(SCIENCE_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeDepartmentPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

  // Scrape Schulich Medicine departments
  console.log("\n=== Scraping Schulich Medicine & Dentistry ===");
  for (const [department, urls] of Object.entries(SCHULICH_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeSchulichDepartment(department, urls);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

  // Scrape Engineering Faculty departments
  console.log("\n=== Scraping Engineering Faculty ===");
  for (const [department, url] of Object.entries(ENGINEERING_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeGenericFacultyPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

    await new Promise((r) => setTimeout(r, 1000));
  }

  // Scrape Social Science Faculty departments
  console.log("\n=== Scraping Social Science Faculty ===");
  for (const [department, url] of Object.entries(SOCIAL_SCIENCE_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeGenericFacultyPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

    await new Promise((r) => setTimeout(r, 1000));
  }

  // Scrape Arts & Humanities Faculty departments
  console.log("\n=== Scraping Arts & Humanities Faculty ===");
  for (const [department, url] of Object.entries(ARTS_HUMANITIES_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeGenericFacultyPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

    await new Promise((r) => setTimeout(r, 1000));
  }

  // Scrape Health Sciences Faculty departments
  console.log("\n=== Scraping Health Sciences Faculty ===");
  for (const [department, url] of Object.entries(HEALTH_SCIENCES_DEPARTMENT_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeGenericFacultyPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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

    await new Promise((r) => setTimeout(r, 1000));
  }

  // Scrape Other Faculties (Law, Education, Music, FIMS, Ivey)
  console.log("\n=== Scraping Other Faculties ===");
  for (const [department, url] of Object.entries(OTHER_FACULTY_URLS)) {
    console.log(`Scraping ${department}...`);

    const rawProfs = await scrapeGenericFacultyPage(department, url);
    console.log(`  Found ${rawProfs.length} professors`);

    for (const rawProf of rawProfs) {
      allProfessors.push({
        id: generateId(rawProf.name),
        name: rawProf.name,
        title: rawProf.title,
        department: rawProf.department,
        university: "Western University",
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
    university: "Western University",
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
