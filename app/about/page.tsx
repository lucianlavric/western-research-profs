export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-18">
          <span className="section-label">Company</span>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] mb-3">
            About ResearchProfs
          </h1>
          <p className="text-base md:text-lg text-[#64748b] max-w-xl">
            Helping students connect with research mentors across universities.
          </p>
        </div>
      </section>

      <div className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6">
            {/* Mission */}
            <div className="soft-card p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                Our Mission
              </h2>
              <p className="text-[#64748b] leading-relaxed">
                ResearchProfs helps undergraduate and graduate students discover
                research opportunities. We aggregate professor information and
                recent publications to make it easier for students to find
                potential research supervisors whose work aligns with their
                interests.
              </p>
            </div>

            {/* How It Works */}
            <div className="soft-card p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                How It Works
              </h2>
              <div className="text-[#64748b] leading-relaxed space-y-3">
                <p>
                  We collect publicly available information from university
                  faculty pages and supplement it with publication data from
                  OpenAlex, a free academic search engine.
                </p>
                <p>
                  Our database is updated periodically to ensure you have access
                  to recent publications and accurate contact information.
                </p>
              </div>
            </div>

            {/* Data Sources */}
            <div className="soft-card p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                Data Sources
              </h2>
              <ul className="space-y-3">
                {[
                  { label: "Professor profiles", desc: "University faculty directory pages" },
                  { label: "Publications", desc: "OpenAlex API" },
                  { label: "Research areas", desc: "Extracted from faculty profiles when available" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">{item.label}:</span>{" "}
                      <span className="text-[#64748b]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="soft-card p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                Tips for Contacting Professors
              </h2>
              <ol className="space-y-3">
                {[
                  "Read their recent publications to understand their current research focus",
                  "Write a personalized email explaining why their research interests you",
                  "Mention specific papers or projects that caught your attention",
                  "Briefly describe your background and what you hope to learn",
                  "Be respectful of their time and follow up politely if needed",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#eff6ff] text-[#3b82f6] text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-[#64748b] pt-0.5">{tip}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Disclaimer */}
            <div className="soft-card p-6 md:p-8 bg-[#fafafa]">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                Disclaimer
              </h2>
              <p className="text-[#64748b] leading-relaxed">
                This is an independent project and is not affiliated with or
                endorsed by any university. All information is collected from
                publicly available sources. If you notice any inaccuracies or
                would like your information removed, please contact us.
              </p>
            </div>

            {/* Open Source */}
            <div className="soft-card p-6 md:p-8 bg-gradient-to-br from-[#eff6ff] to-white border-[#dbeafe]">
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                Open Source
              </h2>
              <p className="text-[#64748b] leading-relaxed">
                This project is open source. Want to contribute or report an
                issue? Check out our GitHub repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
