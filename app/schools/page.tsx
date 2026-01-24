import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.06),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24">
          <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-4">
            Browse
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Universities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Select a university to explore their faculty, departments, and research areas.
          </p>
        </div>
      </section>

      {/* University Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-5">
            {universities.map((uni) => {
              const uniProfessors = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfessors.map((p) => p.department))];
              const uniPubs = uniProfessors.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="group relative bg-gray-50 rounded-2xl p-8 md:p-10 hover:bg-gray-100 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                        <span className="text-2xl md:text-3xl font-bold text-purple-600">
                          {uni.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {uni}
                        </h2>
                        <p className="text-gray-500 mt-1">
                          {uniDepts.length} departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:gap-12">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">
                          {uniProfessors.length}
                        </div>
                        <div className="text-sm text-gray-500">Professors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-sm text-gray-500">Publications</div>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm group-hover:bg-purple-600 group-hover:shadow-md transition-all">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities yet</h3>
              <p className="text-gray-500 mb-4">Run the scraper to populate data</p>
              <code className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-mono">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
