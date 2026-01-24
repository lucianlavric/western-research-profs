import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DepartmentFilter from "@/components/DepartmentFilter";
import ProfessorCardInteractive from "@/components/ProfessorCardInteractive";
import {
  getAllProfessors,
  getAllDepartments,
  getAllUniversities,
  searchProfessors,
  getProfessorsByDepartment,
} from "@/lib/data";

interface Props {
  searchParams: Promise<{ q?: string; dept?: string; university?: string }>;
}

export default async function ProfessorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const department = params.dept || "";
  const university = params.university || "";

  let professors = getAllProfessors();
  const departments = getAllDepartments();
  const universities = getAllUniversities();

  // Apply filters
  if (query) {
    professors = searchProfessors(query);
  }

  if (university) {
    professors = professors.filter((p) => p.university === university);
  }

  if (department) {
    professors = professors.filter((p) => p.department === department);
  }

  // Sort by name
  professors = professors.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="mb-2 md:mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1 md:mb-2">
            Browse Professors
          </h1>
          <p className="text-sm md:text-base text-[#1a1a1a]">
            {professors.length} professor{professors.length !== 1 ? "s" : ""}{" "}
            {query && `matching "${query}"`}
            {university && ` at ${university}`}
            {department && ` in ${department}`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3 md:space-y-4">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBar professors={getAllProfessors()} />
          </Suspense>

          <Suspense fallback={<div className="h-10" />}>
            <DepartmentFilter departments={departments} />
          </Suspense>
        </div>

        {/* Results */}
        {professors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 md:gap-7">
            {professors.map((prof, idx) => (
              <ProfessorCardInteractive key={prof.id} professor={prof} striped={idx % 2 === 1} />
            ))}
          </div>
        ) : (
          <div className="py-8">
            {/* Empty state header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-500"
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
                No results for &quot;{query || department}&quot;
              </h2>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any professors matching your search.
              </p>
              {(query || department) && (
                <Link
                  href="/professors"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </Link>
              )}
            </div>

            {/* Search suggestions */}
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                Try searching for:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {["machine learning", "biology", "chemistry", "physics", "neuroscience", "data science"].map((term) => (
                  <Link
                    key={term}
                    href={`/professors?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse by department */}
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                Or browse by department:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {departments.slice(0, 6).map((dept) => (
                  <Link
                    key={dept}
                    href={`/professors?dept=${encodeURIComponent(dept)}`}
                    className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-sm transition-colors"
                  >
                    {dept}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular professors fallback */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Popular Professors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {getAllProfessors()
                  .sort((a, b) => b.publications.length - a.publications.length)
                  .slice(0, 6)
                  .map((prof) => (
                    <ProfessorCardInteractive key={prof.id} professor={prof} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
