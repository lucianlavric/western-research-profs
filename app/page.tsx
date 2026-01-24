import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ProfessorCardInteractive from "@/components/ProfessorCardInteractive";
import { getAllProfessors, getAllDepartments } from "@/lib/data";

export default function HomePage() {
  let professors: ReturnType<typeof getAllProfessors> = [];
  let departments: string[] = [];

  try {
    professors = getAllProfessors();
    departments = getAllDepartments();
  } catch {
    // Data not loaded yet
  }

  // Get featured professors (random selection for now)
  const featuredProfs = professors.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-10 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-700/50 rounded-full text-sm text-purple-100 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            For prospective graduate students
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Find Your Research Supervisor
          </h1>
          <p className="text-purple-200 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Explore {professors.length || "400+"}  professors across {departments.length || 8} departments at Western University.
            Browse their publications, research areas, and find the right mentor for your graduate studies.
          </p>

          <Suspense fallback={<div className="h-14" />}>
            <SearchBar large className="max-w-2xl mx-auto" professors={professors} />
          </Suspense>

          {/* Mobile CTA Button */}
          <div className="mt-4 md:hidden">
            <Link
              href="/professors"
              className="inline-flex items-center justify-center w-full max-w-2xl mx-auto px-6 py-3.5 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Browse All {professors.length} Professors
            </Link>
          </div>

          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-2">
            {departments.slice(0, 4).map((dept) => (
              <Link
                key={dept}
                href={`/professors?dept=${encodeURIComponent(dept)}`}
                className="px-4 py-2.5 md:px-3 md:py-1.5 bg-purple-700/50 hover:bg-purple-700 rounded-full text-sm transition-colors min-h-[44px] md:min-h-0 flex items-center"
              >
                {dept}
              </Link>
            ))}
            {departments.length > 4 && (
              <Link
                href="/professors"
                className="px-4 py-2.5 md:px-3 md:py-1.5 bg-purple-700/50 hover:bg-purple-700 rounded-full text-sm transition-colors min-h-[44px] md:min-h-0 flex items-center"
              >
                +{departments.length - 4} more
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 md:py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
            <div className="bg-white p-3 md:p-4 rounded-lg md:bg-transparent">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 tabular-nums">
                {professors.length || "100+"}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Professors</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg md:bg-transparent">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 tabular-nums">
                {departments.length || 8}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Departments</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg md:bg-transparent">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 tabular-nums">
                {professors.reduce((acc, p) => acc + p.publications.length, 0) ||
                  "500+"}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Publications</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg md:bg-transparent">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 tabular-nums">1</div>
              <div className="text-xs md:text-sm text-gray-600">Faculty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professors */}
      {featuredProfs.length > 0 && (
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Featured Professors
              </h2>
              <Link
                href="/professors"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredProfs.map((prof) => (
                <ProfessorCardInteractive key={prof.id} professor={prof} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Department */}
      {departments.length > 0 && (
        <section className="py-8 md:py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Browse by Department
              </h2>
              <Link
                href="/research-areas"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                View research areas &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => {
                const deptProfessors = professors.filter((p) => p.department === dept);
                const totalPubs = deptProfessors.reduce((acc, p) => acc + p.publications.length, 0);
                return (
                  <Link
                    key={dept}
                    href={`/professors?dept=${encodeURIComponent(dept)}`}
                    className="group bg-white rounded-lg border border-gray-200 p-4 md:p-5 hover:shadow-lg hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {dept}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {deptProfessors.length} professor{deptProfessors.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                      <span>{totalPubs} publications</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {professors.length === 0 && (
        <section className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Data Yet
            </h2>
            <p className="text-gray-600 mb-4">
              Run the scraper to populate professor data.
            </p>
            <code className="bg-gray-100 px-4 py-2 rounded text-sm">
              npm run scrape
            </code>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            How to Find a Research Supervisor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-purple-600 font-bold text-base md:text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Browse Professors
              </h3>
              <p className="text-sm text-gray-600">
                Search by name, department, or research area to find professors
                whose work interests you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-purple-600 font-bold text-base md:text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Review Publications
              </h3>
              <p className="text-sm text-gray-600">
                Check recent publications to understand their current research
                focus and activity level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-purple-600 font-bold text-base md:text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reach Out</h3>
              <p className="text-sm text-gray-600">
                Use the contact information to send a thoughtful email
                expressing your interest in their research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips for Reaching Out */}
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tips for Contacting Professors</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Read 2-3 of their recent papers before reaching out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Explain specifically why their research interests you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Attach your CV and a brief statement of research interests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keep your initial email concise (under 300 words)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
