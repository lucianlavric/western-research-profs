import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 border-b border-[#222]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-4">
            Browse
          </p>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Universities
          </h1>
          <p className="text-lg text-[#888] max-w-xl">
            Select a university to explore their faculty, departments, and research areas.
          </p>
        </div>
      </section>

      {/* University Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 stagger-children">
            {universities.map((uni) => {
              const uniProfessors = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfessors.map((p) => p.department))];
              const uniPubs = uniProfessors.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="group block p-6 md:p-8 bg-[#111] border border-[#222] hover:border-[#333] transition-all card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                        <span className="text-[#ff6b35] text-2xl font-light">
                          {uni.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-light text-[#fafafa] group-hover:text-[#ff6b35] transition-colors">
                          {uni}
                        </h2>
                        <p className="text-sm text-[#666] mt-1">
                          {uniDepts.length} Departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="text-center">
                        <div className="text-2xl font-light text-[#fafafa]">
                          {uniProfessors.length}
                        </div>
                        <div className="text-xs text-[#666] uppercase tracking-wider">Professors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-[#fafafa]">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-xs text-[#666] uppercase tracking-wider">Publications</div>
                      </div>
                      <div className="hidden md:block">
                        <svg
                          className="w-5 h-5 text-[#666] group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-24 border border-[#222] bg-[#111]">
              <p className="text-[#666] mb-4">No universities found. Run the scraper to populate data.</p>
              <code className="text-sm text-[#ff6b35] bg-[#1a1a1a] px-4 py-2 border border-[#333]">
                npm run scrape
              </code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
