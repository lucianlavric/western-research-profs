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

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] tf-paper">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2013]">
        {/* Diagonal stripes background */}
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

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-block bg-[#cf6a32] text-white px-4 py-1 text-sm font-bold uppercase tracking-wider mb-6 border-2 border-[#4a3728] shadow-[2px_2px_0_#4a3728]">
              For Undergraduate Researchers
            </div>

            <h1 className="tf-heading text-5xl md:text-7xl lg:text-8xl text-[#f5e6d3] leading-[0.9] mb-6">
              Find Your Next
              <br />
              <span className="text-[#b8383b]" style={{ textShadow: '4px 4px 0 #8f2b2d' }}>
                Research Mentor
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#e8d5b7] leading-relaxed max-w-2xl mb-10">
              Browse professors, explore their publications, and discover the
              right supervisor for your research journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#schools"
                className="tf-button inline-flex items-center justify-center px-8 py-4 text-white text-xl rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d2013]"
              >
                Explore Schools
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#e8d5b7] text-[#2d2013] text-xl font-bold uppercase tracking-wide border-3 border-[#4a3728] shadow-[3px_3px_0_#4a3728] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#4a3728] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d2013]"
                style={{ fontFamily: 'Teko, sans-serif' }}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl">
            {[
              { value: universities.length, label: universities.length === 1 ? "University" : "Universities" },
              { value: professors.length, label: "Professors" },
              { value: totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs, label: "Publications" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="tf-heading text-4xl md:text-6xl text-[#cf6a32] tabular-nums"
                  style={{ textShadow: '2px 2px 0 #4a3728' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[#e8d5b7] uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="py-16 md:py-24 bg-[#f5e6d3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block bg-[#b8383b] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 border-2 border-[#4a3728]">
              Browse
            </div>
            <h2 className="tf-heading text-4xl md:text-5xl text-[#2d2013]">
              Select a University
            </h2>
          </div>

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
                      {/* University Logo or Initial Badge */}
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
                        <h3 className="tf-heading text-2xl md:text-3xl text-[#2d2013] group-hover:text-[#b8383b] transition-colors">
                          {uni}
                        </h3>
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
              <h3 className="tf-heading text-2xl text-[#2d2013] mb-2">No Data Yet</h3>
              <p className="text-[#4a3728] mb-4">Run the scraper to populate university data</p>
              <code className="bg-[#2d2013] text-[#e8d5b7] px-4 py-2 text-sm font-mono border-2 border-[#4a3728]">npm run scrape</code>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-[#e8d5b7] border-t-4 border-[#4a3728]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#cf6a32] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 border-2 border-[#4a3728]">
              Simple Process
            </div>
            <h2 className="tf-heading text-4xl md:text-5xl text-[#2d2013]">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
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
              <div key={item.step} className="tf-card p-6 text-center">
                <div
                  className="tf-heading text-6xl md:text-7xl text-[#b8383b] mb-2"
                  style={{ textShadow: '3px 3px 0 #d4c4a8' }}
                >
                  {item.step}
                </div>
                <h3 className="tf-heading text-2xl text-[#2d2013] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#4a3728] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#b8383b] relative overflow-hidden">
        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 20px
            )`
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2
            className="tf-heading text-4xl md:text-6xl text-white mb-4"
            style={{ textShadow: '3px 3px 0 #8f2b2d' }}
          >
            Ready to Find Your Mentor?
          </h2>
          <p className="text-[#f5e6d3] text-lg mb-8 max-w-2xl mx-auto">
            Start exploring professors and take the first step towards your research career.
          </p>
          <Link
            href="#schools"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#f5e6d3] text-[#2d2013] text-2xl font-bold uppercase tracking-wide border-4 border-[#2d2013] shadow-[4px_4px_0_#2d2013] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2d2013] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e6d3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#b8383b]"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            Get Started
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
