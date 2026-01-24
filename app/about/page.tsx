export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 border-b border-[#222]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            ResearchProfs
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              Our Mission
            </h2>
            <p className="text-[#888] leading-relaxed">
              ResearchProfs helps undergraduate and graduate students discover research
              opportunities. We aggregate professor information and recent publications
              to make it easier for students to find potential research supervisors
              whose work aligns with their interests.
            </p>
          </div>

          <div className="h-px bg-[#222]" />

          <div>
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              How It Works
            </h2>
            <div className="text-[#888] leading-relaxed space-y-4">
              <p>
                We collect publicly available information from university faculty
                pages and supplement it with publication data from OpenAlex, a free
                academic search engine.
              </p>
              <p>
                Our database is updated periodically to ensure you have access to
                recent publications and accurate contact information.
              </p>
            </div>
          </div>

          <div className="h-px bg-[#222]" />

          <div>
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              Data Sources
            </h2>
            <ul className="text-[#888] space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#ff6b35]">&mdash;</span>
                <span><strong className="text-[#ccc]">Professor profiles:</strong> University faculty directory pages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff6b35]">&mdash;</span>
                <span><strong className="text-[#ccc]">Publications:</strong> OpenAlex API</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff6b35]">&mdash;</span>
                <span><strong className="text-[#ccc]">Research areas:</strong> Extracted from faculty profiles</span>
              </li>
            </ul>
          </div>

          <div className="h-px bg-[#222]" />

          <div>
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              Tips for Contacting Professors
            </h2>
            <ol className="text-[#888] space-y-3 list-decimal list-inside">
              <li>Read their recent publications to understand their current research focus</li>
              <li>Write a personalized email explaining why their research interests you</li>
              <li>Mention specific papers or projects that caught your attention</li>
              <li>Briefly describe your background and what you hope to learn</li>
              <li>Be respectful of their time and follow up politely if needed</li>
            </ol>
          </div>

          <div className="h-px bg-[#222]" />

          <div>
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              Disclaimer
            </h2>
            <p className="text-[#888] leading-relaxed">
              This is an independent project and is not affiliated with or endorsed
              by any university. All information is collected from publicly available
              sources. If you notice any inaccuracies or would like your information
              removed, please contact us.
            </p>
          </div>

          <div className="p-8 bg-[#111] border border-[#222]">
            <h2 className="text-xl font-medium text-[#fafafa] mb-4">
              Open Source
            </h2>
            <p className="text-[#888] leading-relaxed">
              This project is open source. Want to contribute or report an issue?
              Check out our GitHub repository.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
