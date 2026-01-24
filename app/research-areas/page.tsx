import Link from "next/link";
import { getAllResearchAreas } from "@/lib/data";

export default function ResearchAreasPage() {
  const researchAreas = getAllResearchAreas();

  // Group by first letter
  const grouped = researchAreas.reduce(
    (acc, { area, count }) => {
      const letter = area.charAt(0).toUpperCase();
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push({ area, count });
      return acc;
    },
    {} as Record<string, { area: string; count: number }[]>
  );

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-18">
          <span className="section-label">Explore</span>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] mb-3">
            Research Areas
          </h1>
          <p className="text-base md:text-lg text-[#64748b] max-w-xl">
            Explore {researchAreas.length} research areas across all professors.
            Click any area to find professors working in that field.
          </p>
        </div>
      </section>

      <div className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          {/* Quick jump */}
          <div className="mb-8 flex flex-wrap gap-2">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-9 h-9 flex items-center justify-center bg-white border border-[#e2e8f0] hover:border-[#3b82f6] hover:bg-[#eff6ff] text-[#64748b] hover:text-[#3b82f6] font-medium rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Research areas by letter */}
          <div className="space-y-8">
            {sortedLetters.map((letter) => (
              <section key={letter} id={`section-${letter}`} className="soft-card p-6">
                <h2 className="text-lg font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-[#e2e8f0]">
                  {letter}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {grouped[letter].map(({ area, count }) => (
                    <Link
                      key={area}
                      href={`/professors?q=${encodeURIComponent(area)}`}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#fafafa] border border-[#e2e8f0] rounded-full hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                    >
                      <span className="text-sm text-[#1a1a2e] group-hover:text-[#3b82f6]">
                        {area}
                      </span>
                      <span className="text-xs text-[#94a3b8] bg-white px-2 py-0.5 rounded-full group-hover:bg-[#dbeafe] group-hover:text-[#3b82f6]">
                        {count}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Empty state */}
          {researchAreas.length === 0 && (
            <div className="soft-card text-center py-16">
              <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#64748b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                No research areas found
              </h2>
              <p className="text-[#64748b]">
                Run the scraper to populate professor data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
