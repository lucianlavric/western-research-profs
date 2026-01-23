import { Professor, ProfessorData } from "./types";
import professorsData from "@/data/professors.json";

const data = professorsData as ProfessorData;

export function getAllProfessors(): Professor[] {
  return data.professors;
}

export function getProfessorById(id: string): Professor | undefined {
  return data.professors.find((prof) => prof.id === id);
}

export function getProfessorsByDepartment(department: string): Professor[] {
  return data.professors.filter((prof) => prof.department === department);
}

export function searchProfessors(query: string): Professor[] {
  const lowerQuery = query.toLowerCase();
  return data.professors.filter(
    (prof) =>
      prof.name.toLowerCase().includes(lowerQuery) ||
      prof.department.toLowerCase().includes(lowerQuery) ||
      prof.researchAreas.some((area) => area.toLowerCase().includes(lowerQuery))
  );
}

export function getAllDepartments(): string[] {
  return data.departments;
}

export function getLastScrapedDate(): string {
  return data.lastScraped;
}
