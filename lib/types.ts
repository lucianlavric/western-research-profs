export interface Publication {
  title: string;
  year: number;
  venue?: string;
  url?: string;
  citationCount?: number;
}

export interface Professor {
  id: string;
  name: string;
  title: string;
  department: string;
  university: string;            // University/school name
  email: string;
  profileUrl: string;
  imageUrl?: string;
  researchAreas: string[];
  labName?: string;
  labUrl?: string;
  bio?: string;
  publications: Publication[];
  lastUpdated: string;
  researchSummary?: string;      // AI-generated research summary
  talkingPoints?: string[];      // Suggested questions/topics for outreach
}

export interface ProfessorData {
  professors: Professor[];
  lastScraped: string;
  departments: string[];
  universities: string[];        // List of universities in the data
}
