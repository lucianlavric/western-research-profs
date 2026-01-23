import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ProfessorCard from "@/components/ProfessorCard";
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
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Research Supervisor
          </h1>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Discover professors at Western University&apos;s Faculty of Science.
            Browse research areas, recent publications, and find the perfect
            mentor for your research journey.
          </p>

          <Suspense fallback={<div className="h-14" />}>
            <SearchBar large className="max-w-2xl mx-auto" />
          </Suspense>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {departments.slice(0, 4).map((dept) => (
              <Link
                key={dept}
                href={`/professors?dept=${encodeURIComponent(dept)}`}
                className="px-3 py-1.5 bg-purple-700/50 hover:bg-purple-700 rounded-full text-sm transition"
              >
                {dept}
              </Link>
            ))}
            {departments.length > 4 && (
              <Link
                href="/professors"
                className="px-3 py-1.5 bg-purple-700/50 hover:bg-purple-700 rounded-full text-sm transition"
              >
                +{departments.length - 4} more
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {professors.length || "100+"}
              </div>
              <div className="text-sm text-gray-600">Professors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {departments.length || 8}
              </div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {professors.reduce((acc, p) => acc + p.publications.length, 0) ||
                  "500+"}
              </div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">1</div>
              <div className="text-sm text-gray-600">Faculty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professors */}
      {featuredProfs.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Professors
              </h2>
              <Link
                href="/professors"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfs.map((prof) => (
                <ProfessorCard key={prof.id} professor={prof} />
              ))}
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
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How to Find a Research Supervisor
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">1</span>
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">2</span>
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">3</span>
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
    </div>
  );
}
