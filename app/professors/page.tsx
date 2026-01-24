import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import DepartmentFilter from "@/components/DepartmentFilter";
import ProfessorCard from "@/components/ProfessorCard";
import {
  getAllProfessors,
  getAllDepartments,
  searchProfessors,
  getProfessorsByDepartment,
} from "@/lib/data";

interface Props {
  searchParams: Promise<{ q?: string; dept?: string }>;
}

export default async function ProfessorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const department = params.dept || "";

  let professors = getAllProfessors();
  const departments = getAllDepartments();

  // Apply filters
  if (query) {
    professors = searchProfessors(query);
  }

  if (department) {
    professors = professors.filter((p) => p.department === department);
  }

  // Sort by name
  professors = professors.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-5 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            Browse Professors
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {professors.length} professor{professors.length !== 1 ? "s" : ""}{" "}
            {query && `matching "${query}"`}
            {department && ` in ${department}`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-5 md:mb-8 space-y-3 md:space-y-4">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBar />
          </Suspense>

          <Suspense fallback={<div className="h-10" />}>
            <DepartmentFilter departments={departments} />
          </Suspense>
        </div>

        {/* Results */}
        {professors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {professors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No professors found
            </h2>
            <p className="text-gray-600">
              {query || department
                ? "Try adjusting your search or filters"
                : "Run the scraper to populate professor data"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
