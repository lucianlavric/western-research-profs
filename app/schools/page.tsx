import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

// University logo mapping
const universityLogos: Record<string, string> = {
  "Western University": "/universities/western.png",
};

function getUniversityLogo(name: string): string | null {
  return universityLogos[name] || null;
}

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-18">
          <span className="section-label">Browse</span>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] mb-3">
            Universities
          </h1>
          <p className="text-base md:text-lg text-[#64748b] max-w-xl">
            Select a university to explore their faculty, departments, and research areas.
          </p>
        </div>
      </section>

      {/* University Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-4">
            {universities.map((uni) => {
              const uniProfessors = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfessors.map((p) => p.department))];
              const uniPubs = uniProfessors.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

              const logo = getUniversityLogo(uni);

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="soft-card group p-5 md:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      {logo ? (
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fafafa] rounded-xl border border-[#e2e8f0] flex items-center justify-center flex-shrink-0 p-2">
                          <Image
                            src={logo}
                            alt={`${uni} logo`}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-xl">
                            {uni.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold text-[#1a1a2e] group-hover:text-[#3b82f6] transition-colors">
                          {uni}
                        </h2>
                        <p className="text-sm text-[#64748b] mt-0.5">
                          {uniDepts.length} Departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:gap-10">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-[#1a1a2e]">
                          {uniProfessors.length}
                        </div>
                        <div className="text-xs text-[#64748b]">Professors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-[#1a1a2e]">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-xs text-[#64748b]">Publications</div>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#f1f5f9] group-hover:bg-[#eff6ff] transition-colors">
                        <svg
                          className="w-5 h-5 text-[#64748b] group-hover:text-[#3b82f6] transition-colors"
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
            <div className="soft-card text-center py-16">
              <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">No Universities Yet</h3>
              <p className="text-[#64748b] mb-4">Run the scraper to populate data</p>
              <code className="bg-[#f1f5f9] text-[#1a1a2e] px-4 py-2 text-sm rounded-lg font-mono">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
