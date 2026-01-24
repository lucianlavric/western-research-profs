import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();
  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <p className="text-[#666] text-sm tracking-wide mb-6">
            For undergraduate researchers
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight tracking-tight mb-6">
            Find your next<br />
            research mentor
          </h1>

          <p className="text-[#888] text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Browse professors, explore their publications, and discover the
            right supervisor for your research journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#schools"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium hover:bg-[#e5e5e5] transition-colors"
            >
              Explore Schools
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#333] text-[#888] text-sm font-medium hover:text-white hover:border-[#444] transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-[#222]">
            {[
              { value: universities.length, label: universities.length === 1 ? "University" : "Universities" },
              { value: professors.length, label: "Professors" },
              { value: totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs, label: "Publications" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 md:py-12 text-center">
                <div className="text-2xl md:text-3xl font-medium text-white tabular-nums mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#666] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section id="schools" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Browse</p>
            <h2 className="text-2xl md:text-3xl font-medium text-white">
              Universities
            </h2>
          </div>

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
                      <div className="w-10 h-10 border border-[#333] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-[#888]">
                          {uni.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium group-hover:opacity-70 transition-opacity">
                          {uni}
                        </h3>
                        <p className="text-[#666] text-sm">
                          {uniDepts.length} departments
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden sm:block text-right">
                        <div className="text-white text-sm tabular-nums">{uniProfessors.length}</div>
                        <div className="text-[#666] text-xs">professors</div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <div className="text-white text-sm tabular-nums">
                          {uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}
                        </div>
                        <div className="text-[#666] text-xs">publications</div>
                      </div>
                      <svg
                        className="w-4 h-4 text-[#666] group-hover:text-white transition-colors"
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
            <div className="border border-[#222] p-12 text-center">
              <p className="text-[#666] mb-4">No data yet</p>
              <code className="text-xs text-[#888] bg-[#111] px-3 py-2 border border-[#222]">npm run scrape</code>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 border-t border-[#222]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Process</p>
            <h2 className="text-2xl md:text-3xl font-medium text-white">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#222]">
            {[
              {
                step: "01",
                title: "Choose a school",
                desc: "Select from our growing list of partner universities to explore their faculty.",
              },
              {
                step: "02",
                title: "Browse professors",
                desc: "Filter by department, research area, or search by name to find potential mentors.",
              },
              {
                step: "03",
                title: "Reach out",
                desc: "Use our AI-powered tips to craft the perfect introduction email.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-black p-8">
                <div className="text-[#444] text-xs font-mono mb-4">{item.step}</div>
                <h3 className="text-white font-medium mb-3">{item.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-[#222]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
            Ready to find your mentor?
          </h2>
          <p className="text-[#666] mb-8 max-w-md mx-auto">
            Start exploring professors and take the first step towards your research career.
          </p>
          <Link
            href="#schools"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black text-sm font-medium hover:bg-[#e5e5e5] transition-colors"
          >
            Get started
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
