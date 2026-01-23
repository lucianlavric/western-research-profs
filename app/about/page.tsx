export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About Western Research Profs
        </h1>

        <div className="prose prose-purple max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Western Research Profs helps undergraduate and graduate students at
              Western University discover research opportunities. We aggregate
              professor information and recent publications to make it easier for
              students to find potential research supervisors whose work aligns
              with their interests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How It Works
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                We collect publicly available information from Western
                University&apos;s faculty pages and supplement it with publication
                data from Semantic Scholar, a free academic search engine.
              </p>
              <p>
                Our database is updated periodically to ensure you have access to
                recent publications and accurate contact information.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Data Sources
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Professor profiles:</strong> Western University faculty
                directory pages
              </li>
              <li>
                <strong>Publications:</strong> Semantic Scholar API
              </li>
              <li>
                <strong>Research areas:</strong> Extracted from faculty profiles
                when available
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Tips for Contacting Professors
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>
                Read their recent publications to understand their current
                research focus
              </li>
              <li>
                Write a personalized email explaining why their research interests
                you
              </li>
              <li>Mention specific papers or projects that caught your attention</li>
              <li>Briefly describe your background and what you hope to learn</li>
              <li>Be respectful of their time and follow up politely if needed</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This is an independent project and is not affiliated with or
              endorsed by Western University. All information is collected from
              publicly available sources. If you notice any inaccuracies or would
              like your information removed, please contact us.
            </p>
          </section>

          <section className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Open Source
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This project is open source. Want to contribute or report an issue?
              Check out our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
