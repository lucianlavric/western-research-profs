import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

// University logo mapping
const universityLogos: Record<string, string> = {
  "Western University": "/universities/western.svg",
};

function getUniversityLogo(name: string): string | null {
  return universityLogos[name] || null;
}

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen tf-paper bg-[#f5e6d3]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2013] border-b-4 border-[#4a3728]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="inline-block bg-[#cf6a32] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border-2 border-[#4a3728]">
            Browse
          </div>
          <h1 className="tf-heading text-4xl md:text-6xl text-[#f5e6d3] mb-4">
            Universities
          </h1>
          <p className="text-lg text-[#e8d5b7] max-w-2xl">
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

              const logo = getUniversityLogo(uni);

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="tf-card group relative p-6 md:p-8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8383b] focus-visible:ring-offset-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      {logo ? (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-3 border-[#4a3728] shadow-[3px_3px_0_#4a3728] flex items-center justify-center flex-shrink-0 p-2">
                          <Image
                            src={logo}
                            alt={`${uni} logo`}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#b8383b] border-3 border-[#4a3728] shadow-[3px_3px_0_#4a3728] flex items-center justify-center flex-shrink-0">
                          <span className="tf-heading text-3xl md:text-4xl text-white">
                            {uni.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h2 className="tf-heading text-2xl md:text-3xl text-[#2d2013] group-hover:text-[#b8383b] transition-colors">
                          {uni}
                        </h2>
                        <p className="text-[#4a3728] mt-1 uppercase text-sm tracking-wide">
                          {uniDepts.length} Departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:gap-10">
                      <div className="text-center">
                        <div className="tf-heading text-3xl md:text-4xl text-[#2d2013]">
                          {uniProfessors.length}
                        </div>
                        <div className="text-xs text-[#4a3728] uppercase tracking-wide">Professors</div>
                      </div>
                      <div className="text-center">
                        <div className="tf-heading text-3xl md:text-4xl text-[#2d2013]">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-xs text-[#4a3728] uppercase tracking-wide">Publications</div>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-12 h-12 bg-[#cf6a32] border-2 border-[#4a3728] shadow-[2px_2px_0_#4a3728] group-hover:bg-[#b8383b] transition-colors">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {universities.length === 0 && (
            <div className="tf-card text-center py-16">
              <div className="w-20 h-20 bg-[#e8d5b7] border-3 border-[#4a3728] flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#4a3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="tf-heading text-2xl text-[#2d2013] mb-2">No Universities Yet</h3>
              <p className="text-[#4a3728] mb-4">Run the scraper to populate data</p>
              <code className="bg-[#2d2013] text-[#e8d5b7] px-4 py-2 text-sm font-mono border-2 border-[#4a3728]">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
