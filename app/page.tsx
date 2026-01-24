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

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#fafafa] to-white">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="soft-pill mb-6">
              For Undergraduate Researchers
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a2e] leading-tight tracking-tight mb-6">
              Find Your Next
              <br />
              <span className="text-[#3b82f6]">
                Research Mentor
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#64748b] leading-relaxed max-w-xl mb-10">
              Browse professors, explore their publications, and discover the
              right supervisor for your research journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#schools"
                className="soft-button inline-flex items-center justify-center px-6 py-3.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
              >
                Explore Schools
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="soft-button-secondary inline-flex items-center justify-center px-6 py-3.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-20 flex flex-wrap gap-12 md:gap-16">
            {[
              { value: universities.length, label: universities.length === 1 ? "University" : "Universities" },
              { value: professors.length, label: "Professors" },
              { value: totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs, label: "Publications" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-[#64748b] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <span className="section-label">Browse</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e]">
              Select a University
            </h2>
          </div>

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
                      {/* University Logo or Initial */}
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
                        <h3 className="text-lg md:text-xl font-semibold text-[#1a1a2e] group-hover:text-[#3b82f6] transition-colors">
                          {uni}
                        </h3>
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
              <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">No Data Yet</h3>
              <p className="text-[#64748b] mb-4">Run the scraper to populate university data</p>
              <code className="bg-[#f1f5f9] text-[#1a1a2e] px-4 py-2 text-sm rounded-lg font-mono">npm run scrape</code>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label">Simple Process</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e]">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Choose a School",
                desc: "Select from our growing list of partner universities to explore their faculty.",
              },
              {
                step: "02",
                title: "Browse Professors",
                desc: "Filter by department, research area, or search by name to find potential mentors.",
              },
              {
                step: "03",
                title: "Reach Out",
                desc: "Use our AI-powered tips to craft the perfect introduction email. (Coming soon!)",
              },
            ].map((item) => (
              <div key={item.step} className="soft-card p-6 text-center">
                <div className="text-4xl font-semibold text-[#3b82f6] mb-3 opacity-60">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#3b82f6] to-[#2563eb]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
            Ready to Find Your Mentor?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Start exploring professors and take the first step towards your research career.
          </p>
          <Link
            href="#schools"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3b82f6] font-semibold rounded-xl hover:bg-blue-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b82f6]"
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
