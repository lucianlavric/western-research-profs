import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="max-w-3xl">
            <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-4">
              For Undergraduate Researchers
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Find your next
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                research mentor
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mb-10">
              Browse professors, explore their publications, and discover the
              right supervisor for your research journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#schools"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
              >
                Explore Schools
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 md:gap-16 max-w-2xl">
            <div>
              <div className="text-3xl md:text-5xl font-bold text-gray-900 tabular-nums">
                {universities.length}
              </div>
              <div className="text-sm md:text-base text-gray-500 mt-1">
                {universities.length === 1 ? "University" : "Universities"}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-gray-900 tabular-nums">
                {professors.length}
              </div>
              <div className="text-sm md:text-base text-gray-500 mt-1">Professors</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-gray-900 tabular-nums">
                {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
              </div>
              <div className="text-sm md:text-base text-gray-500 mt-1">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="py-20 md:py-32 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-2">
                Browse
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Select a University
              </h2>
            </div>
          </div>

          <div className="grid gap-6">
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
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {uni}
                        </h3>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No data yet</h3>
              <p className="text-gray-500 mb-4">Run the scraper to populate university data</p>
              <code className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-mono">npm run scrape</code>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
              <div key={item.step} className="relative">
                <div className="text-6xl md:text-7xl font-bold text-gray-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find your mentor?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Start exploring professors and take the first step towards your research career.
          </p>
          <Link
            href="#schools"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
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
