import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DepartmentFilter from "@/components/DepartmentFilter";
import SortSelector from "@/components/SortSelector";
import ProfessorCardInteractive from "@/components/ProfessorCardInteractive";
import Pagination from "@/components/Pagination";
import { GridSkeleton, SearchSkeleton, FilterSkeleton } from "@/components/Skeleton";
import {
  getAllProfessors,
  getAllDepartments,
  searchProfessors,
} from "@/lib/data";

const PROFESSORS_PER_PAGE = 24;

interface Props {
  searchParams: Promise<{ q?: string; dept?: string; university?: string; sort?: string; page?: string }>;
}

export default async function ProfessorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const department = params.dept || "";
  const university = params.university || "";
  const sort = params.sort || "name";
  const page = Math.max(1, parseInt(params.page || "1", 10));

  let professors = getAllProfessors();
  const departments = getAllDepartments();

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

  // Apply sorting
  switch (sort) {
    case "name":
      professors = professors.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      professors = professors.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "pubs":
      professors = professors.sort((a, b) => b.publications.length - a.publications.length);
      break;
    case "pubs-asc":
      professors = professors.sort((a, b) => a.publications.length - b.publications.length);
      break;
    case "recent":
      professors = professors.sort((a, b) => {
        const aYear = a.publications.length > 0 ? Math.max(...a.publications.map((p) => p.year)) : 0;
        const bYear = b.publications.length > 0 ? Math.max(...b.publications.map((p) => p.year)) : 0;
        return bYear - aYear;
      });
      break;
    default:
      professors = professors.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const totalProfessors = professors.length;
  const totalPages = Math.ceil(totalProfessors / PROFESSORS_PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const startIndex = (currentPage - 1) * PROFESSORS_PER_PAGE;
  const paginatedProfessors = professors.slice(startIndex, startIndex + PROFESSORS_PER_PAGE);

  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="mb-2 md:mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1 md:mb-2">
            Browse Professors
          </h1>
          <p className="text-sm md:text-base text-[#1a1a1a]">
            {totalProfessors.toLocaleString()} professor{totalProfessors !== 1 ? "s" : ""}{" "}
            {query && `matching "${query}"`}
            {university && ` at ${university}`}
            {department && ` in ${department}`}
            {totalPages > 1 && (
              <span className="text-[#666]">
                {" "}&middot; Page {currentPage} of {totalPages}
              </span>
            )}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <Suspense fallback={<SearchSkeleton />}>
            <SearchBar professors={getAllProfessors()} />
          </Suspense>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <Suspense fallback={<FilterSkeleton />}>
              <DepartmentFilter departments={departments} />
            </Suspense>

            <Suspense fallback={<div className="h-8 w-32 bg-gray-200 animate-pulse" />}>
              <SortSelector />
            </Suspense>
          </div>
        </div>

        {/* Results */}
        {totalProfessors > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 md:gap-7">
              {paginatedProfessors.map((prof) => (
                <ProfessorCardInteractive key={prof.id} professor={prof} />
              ))}
            </div>

            {/* Pagination */}
            <Suspense fallback={null}>
              <Pagination currentPage={currentPage} totalPages={totalPages} className="mt-8" />
            </Suspense>
          </>
        ) : (
          <div className="py-8">
            {/* Empty state header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#ffd93d] border-3 border-[#1a1a1a] flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0_#1a1a1a]">
                <svg
                  className="w-8 h-8 text-[#1a1a1a]"
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
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                No results for &quot;{query || department}&quot;
              </h2>
              <p className="text-[#666] mb-4">
                We couldn&apos;t find any professors matching your search.
              </p>
              {(query || department) && (
                <Link
                  href="/professors"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5c5c] text-white font-bold border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] hover:-translate-y-0.5 transition-transform"
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
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-3 text-center uppercase tracking-wide">
                Try searching for:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {["machine learning", "biology", "chemistry", "physics", "neuroscience", "data science"].map((term) => (
                  <Link
                    key={term}
                    href={`/professors?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold hover:bg-[#ffd93d] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular professors fallback */}
            <div className="border-t-3 border-[#1a1a1a] pt-8">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 text-center">
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
