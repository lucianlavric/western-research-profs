import { Professor, ProfessorData } from "./types";
import professorsData from "@/data/professors.json";

const data = professorsData as ProfessorData;

export function getAllProfessors(university?: string): Professor[] {
  if (university) {
    return data.professors.filter((prof) => prof.university === university);
  }
  return data.professors;
}

export function getProfessorById(id: string): Professor | undefined {
  return data.professors.find((prof) => prof.id === id);
}

export function getProfessorsByDepartment(department: string, university?: string): Professor[] {
  return data.professors.filter((prof) =>
    prof.department === department &&
    (!university || prof.university === university)
  );
}

export function getProfessorsByUniversity(university: string): Professor[] {
  return data.professors.filter((prof) => prof.university === university);
}

export function searchProfessors(query: string, university?: string): Professor[] {
  const lowerQuery = query.toLowerCase();
  return data.professors.filter(
    (prof) =>
      (!university || prof.university === university) &&
      (prof.name.toLowerCase().includes(lowerQuery) ||
      prof.department.toLowerCase().includes(lowerQuery) ||
      prof.university.toLowerCase().includes(lowerQuery) ||
      prof.researchAreas.some((area) => area.toLowerCase().includes(lowerQuery)))
  );
}

export function getAllDepartments(university?: string): string[] {
  if (university) {
    const depts = new Set(
      data.professors
        .filter((prof) => prof.university === university)
        .map((prof) => prof.department)
    );
    return Array.from(depts).sort();
  }
  return data.departments;
}

export function getAllUniversities(): string[] {
  return data.universities || ["Western University"];
}

export function getAllResearchAreas(): { area: string; count: number }[] {
  const areaMap = new Map<string, number>();

  data.professors.forEach((prof) => {
    prof.researchAreas.forEach((area) => {
      const normalized = area.trim();
      if (normalized) {
        areaMap.set(normalized, (areaMap.get(normalized) || 0) + 1);
      }
    });
  });

  return Array.from(areaMap.entries())
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count);
}

export function getLastScrapedDate(): string {
  return data.lastScraped;
}

export function getRelatedProfessors(professor: Professor, limit: number = 4): Professor[] {
  const otherProfessors = data.professors.filter((p) => p.id !== professor.id);

  // Score each professor by relevance
  const scored = otherProfessors.map((p) => {
    let score = 0;

    // Same department = high relevance
    if (p.department === professor.department) {
      score += 10;
    }

    // Overlapping research areas
    const sharedAreas = p.researchAreas.filter((area) =>
      professor.researchAreas.some(
        (profArea) => profArea.toLowerCase() === area.toLowerCase()
      )
    );
    score += sharedAreas.length * 5;

    return { professor: p, score };
  });

  // Sort by score descending, then by publication count
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.professor.publications.length - a.professor.publications.length;
    })
    .slice(0, limit)
    .map((s) => s.professor);
}
