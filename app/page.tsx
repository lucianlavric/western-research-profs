import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();
  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-end">
            <div className="md:col-span-8">
              <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-6">
                For Researchers
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                Find your next
                <br />
                <span className="text-[#ff6b35]">research mentor</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-[#888] max-w-xl leading-relaxed">
                Browse professors, explore their publications, and discover the
                right supervisor for your research journey.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#schools"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#ff6b35] text-[#0a0a0a] font-medium hover:bg-[#ff8555] transition-colors"
                >
                  Explore Schools
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#333] text-[#fafafa] hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Stats - Asymmetric positioning */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {[
                { value: universities.length, label: universities.length === 1 ? "University" : "Universities" },
                { value: professors.length, label: "Professors" },
                { value: totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs, label: "Publications" },
              ].map((stat, i) => (
                <div key={stat.label} className={`${i === 1 ? 'md:ml-8' : ''}`}>
                  <div className="text-4xl md:text-5xl font-light text-[#fafafa] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#666] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-[#222]" />
      </div>

      {/* Schools Section */}
      <section id="schools" className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-4">
              Browse
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              Select a University
            </h2>
          </div>

          <div className="space-y-4 stagger-children">
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
                      <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                        <span className="text-[#ff6b35] text-xl font-light">
                          {uni.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-light text-[#fafafa] group-hover:text-[#ff6b35] transition-colors">
                          {uni}
                        </h3>
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

      {/* How it works */}
      <section className="py-24 md:py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-4">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-light">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
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
                desc: "Use our AI-powered tips to craft the perfect introduction email.",
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="text-6xl font-light text-[#222] group-hover:text-[#333] transition-colors mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-[#fafafa] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#888] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Ready to find your mentor?
          </h2>
          <p className="text-lg text-[#888] mb-10 max-w-xl mx-auto">
            Start exploring professors and take the first step towards your research career.
          </p>
          <Link
            href="#schools"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#ff6b35] text-[#0a0a0a] font-medium hover:bg-[#ff8555] transition-colors"
          >
            Get Started
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
