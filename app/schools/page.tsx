import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Browse</p>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
            Universities
          </h1>
          <p className="text-[#888] max-w-xl">
            Select a university to explore their faculty, departments, and research areas.
          </p>
        </div>
      </section>

      {/* University List */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-px">
            {universities.map((uni) => {
              const uniProfessors = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfessors.map((p) => p.department))];
              const uniPubs = uniProfessors.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="group block border border-[#222] hover:border-[#333] transition-colors"
                >
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 border border-[#333] flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-medium text-[#888]">
                          {uni.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-white font-medium text-lg group-hover:opacity-70 transition-opacity">
                          {uni}
                        </h2>
                        <p className="text-[#666] text-sm">
                          {uniDepts.length} departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="hidden sm:block text-right">
                        <div className="text-white tabular-nums">{uniProfessors.length}</div>
                        <div className="text-[#666] text-xs">professors</div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <div className="text-white tabular-nums">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-[#666] text-xs">publications</div>
                      </div>
                      <svg
                        className="w-5 h-5 text-[#666] group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {universities.length === 0 && (
            <div className="border border-[#222] p-16 text-center">
              <p className="text-[#666] mb-4">No universities yet</p>
              <code className="text-xs text-[#888] bg-[#111] px-3 py-2 border border-[#222]">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
