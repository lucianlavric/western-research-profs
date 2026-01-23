import { Publication } from "../types";

const API_BASE = "https://api.openalex.org";
const POLITE_EMAIL = "western-research-profs@example.com"; // Add to polite pool

interface OpenAlexAuthor {
  id: string;
  display_name: string;
  works_count: number;
  last_known_institutions?: Array<{
    display_name: string;
    country_code: string;
  }>;
  affiliations?: Array<{
    institution: {
      display_name: string;
      country_code?: string;
    };
  }>;
}

interface OpenAlexWork {
  id: string;
  title: string;
  publication_year: number;
  primary_location?: {
    source?: {
      display_name: string;
    };
  };
  cited_by_count: number;
  doi?: string;
}

interface OpenAlexResponse<T> {
  results: T[];
  meta: {
    count: number;
  };
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isWesternAffiliated(author: OpenAlexAuthor): boolean {
  const westernPatterns = [
    "western university",
    "university of western ontario",
  ];

  // STRICT: Only check last_known_institutions (current affiliation)
  // Don't use affiliations list as it includes anyone who ever co-authored
  const lastInst = author.last_known_institutions || [];

  for (const inst of lastInst) {
    const name = inst.display_name?.toLowerCase() || "";
    // Must be in Canada and match Western exactly
    if (
      inst.country_code === "CA" &&
      westernPatterns.some((p) => name.includes(p))
    ) {
      return true;
    }
  }

  // If no last_known_institutions, this author's affiliation is unknown
  // Return false to avoid false positives
  return false;
}

export async function searchAuthor(
  name: string
): Promise<OpenAlexAuthor | null> {
  try {
    // Search for author - include institution fields
    const searchName = encodeURIComponent(name);
    const url = `${API_BASE}/authors?filter=display_name.search:${searchName}&per_page=25&select=id,display_name,works_count,last_known_institutions,affiliations&mailto=${POLITE_EMAIL}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`  OpenAlex author search failed: ${response.status}`);
      return null;
    }

    const data: OpenAlexResponse<OpenAlexAuthor> = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    // ONLY return authors confirmed at Western University (Canada)
    // Do NOT fall back to other authors with same name
    const westernAuthor = data.results.find(
      (author) => isWesternAffiliated(author) && author.works_count > 0
    );

    if (westernAuthor) {
      return westernAuthor;
    }

    // No Western-affiliated author found - return null instead of wrong person
    return null;
  } catch (error) {
    console.error(`  Error searching for author:`, error);
    return null;
  }
}

export async function getAuthorWorks(
  authorId: string,
  limit: number = 5
): Promise<Publication[]> {
  try {
    // Get recent works sorted by publication date
    const url = `${API_BASE}/works?filter=author.id:${authorId}&sort=publication_year:desc&per_page=${limit}&mailto=${POLITE_EMAIL}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`  OpenAlex works fetch failed: ${response.status}`);
      return [];
    }

    const data: OpenAlexResponse<OpenAlexWork> = await response.json();

    if (!data.results) {
      return [];
    }

    return data.results
      .filter((work) => work.title && work.publication_year)
      .map((work) => ({
        title: work.title,
        year: work.publication_year,
        venue: work.primary_location?.source?.display_name || undefined,
        url: work.doi
          ? `https://doi.org/${work.doi.replace("https://doi.org/", "")}`
          : undefined,
        citationCount: work.cited_by_count || 0,
      }));
  } catch (error) {
    console.error(`  Error fetching works:`, error);
    return [];
  }
}

export async function getPublicationsForProfessor(
  name: string
): Promise<Publication[]> {
  // OpenAlex has generous rate limits (100k/day) but still be polite
  await delay(200);

  const author = await searchAuthor(name);
  if (!author) {
    return [];
  }

  await delay(200);
  return getAuthorWorks(author.id);
}
