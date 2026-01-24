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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 border-b border-[#222]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-4">
            Explore
          </p>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Research Areas
          </h1>
          <p className="text-lg text-[#888] max-w-xl">
            Explore {researchAreas.length} research areas across all professors.
            Click any area to find professors working in that field.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Quick jump */}
          <div className="mb-12 flex flex-wrap gap-2">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-9 h-9 flex items-center justify-center bg-[#111] border border-[#222] hover:border-[#ff6b35] hover:text-[#ff6b35] text-[#888] text-sm transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Research areas by letter */}
          <div className="space-y-12">
            {sortedLetters.map((letter) => (
              <section key={letter} id={`section-${letter}`}>
                <h2 className="text-2xl font-light text-[#fafafa] mb-6 pb-3 border-b border-[#222]">
                  {letter}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {grouped[letter].map(({ area, count }) => (
                    <Link
                      key={area}
                      href={`/professors?q=${encodeURIComponent(area)}`}
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] hover:border-[#333] transition-colors"
                    >
                      <span className="text-sm text-[#ccc] group-hover:text-[#ff6b35] transition-colors">
                        {area}
                      </span>
                      <span className="text-xs text-[#555] bg-[#1a1a1a] px-2 py-0.5">
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
            <div className="text-center py-24 border border-[#222] bg-[#111]">
              <p className="text-[#666] mb-4">No research areas found. Run the scraper to populate data.</p>
              <code className="text-sm text-[#ff6b35] bg-[#1a1a1a] px-4 py-2 border border-[#333]">
                npm run scrape
              </code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
