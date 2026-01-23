import { Publication } from "../types";

const API_BASE = "https://api.semanticscholar.org/graph/v1";

// Rate limit: 100 requests per 5 minutes = 1 request every 3 seconds
const REQUEST_DELAY_MS = 3500;

interface SemanticScholarAuthor {
  authorId: string;
  name: string;
  affiliations?: string[];
  papers?: SemanticScholarPaper[];
}

interface SemanticScholarPaper {
  paperId: string;
  title: string;
  year: number;
  venue?: string;
  citationCount?: number;
  url?: string;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  retries: number = 3
): Promise<Response | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        // Rate limited - wait longer and retry
        const waitTime = Math.pow(2, attempt + 1) * 5000; // 10s, 20s, 40s
        console.log(`  Rate limited, waiting ${waitTime / 1000}s...`);
        await delay(waitTime);
        continue;
      }

      return response;
    } catch (error) {
      console.error(`  Fetch attempt ${attempt + 1} failed:`, error);
      if (attempt < retries - 1) {
        await delay(2000);
      }
    }
  }

  return null;
}

export async function searchAuthor(
  name: string
): Promise<SemanticScholarAuthor | null> {
  try {
    const query = encodeURIComponent(`${name} Western University`);
    const response = await fetchWithRetry(
      `${API_BASE}/author/search?query=${query}&limit=5`
    );

    if (!response || !response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    // Try to find the author affiliated with Western
    const westernAuthor = data.data.find(
      (author: SemanticScholarAuthor) =>
        author.affiliations?.some(
          (aff) =>
            aff.toLowerCase().includes("western") ||
            aff.toLowerCase().includes("uwo") ||
            aff.toLowerCase().includes("ontario")
        )
    );

    return westernAuthor || data.data[0];
  } catch (error) {
    console.error(`  Error searching for author:`, error);
    return null;
  }
}

export async function getAuthorPapers(
  authorId: string,
  limit: number = 5
): Promise<Publication[]> {
  try {
    const fields = "title,year,venue,citationCount,url";
    const response = await fetchWithRetry(
      `${API_BASE}/author/${authorId}/papers?fields=${fields}&limit=${limit}`
    );

    if (!response || !response.ok) {
      return [];
    }

    const data = await response.json();

    if (!data.data) {
      return [];
    }

    return data.data
      .filter((paper: SemanticScholarPaper) => paper.title && paper.year)
      .map((paper: SemanticScholarPaper) => ({
        title: paper.title,
        year: paper.year,
        venue: paper.venue || undefined,
        url: paper.url || undefined,
        citationCount: paper.citationCount || 0,
      }))
      .sort((a: Publication, b: Publication) => b.year - a.year)
      .slice(0, limit);
  } catch (error) {
    console.error(`  Error fetching papers:`, error);
    return [];
  }
}

export async function getPublicationsForProfessor(
  name: string
): Promise<Publication[]> {
  // Respect rate limits
  await delay(REQUEST_DELAY_MS);

  const author = await searchAuthor(name);
  if (!author) {
    return [];
  }

  await delay(REQUEST_DELAY_MS);
  return getAuthorPapers(author.authorId);
}
