import Link from "next/link";
import { getAllResearchAreas } from "@/lib/data";

export default function ResearchAreasPage() {
  const researchAreas = getAllResearchAreas();

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
      {/* Header */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Explore</p>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
            Research Areas
          </h1>
          <p className="text-[#888] max-w-xl">
            Explore {researchAreas.length} research areas across all professors.
            Click any area to find professors working in that field.
          </p>
        </div>
      </section>

      {/* Quick jump */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-1">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white hover:bg-[#111] text-sm transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-12">
            {sortedLetters.map((letter) => (
              <div key={letter} id={`section-${letter}`}>
                <h2 className="text-sm font-medium text-[#666] mb-4 pb-2 border-b border-[#222]">
                  {letter}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {grouped[letter].map(({ area, count }) => (
                    <Link
                      key={area}
                      href={`/professors?q=${encodeURIComponent(area)}`}
                      className="group inline-flex items-center gap-2 px-3 py-2 border border-[#222] hover:border-[#333] transition-colors"
                    >
                      <span className="text-sm text-[#888] group-hover:text-white transition-colors">
                        {area}
                      </span>
                      <span className="text-xs text-[#444] tabular-nums">
                        {count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {researchAreas.length === 0 && (
            <div className="border border-[#222] p-16 text-center">
              <p className="text-[#666] mb-4">No research areas found</p>
              <code className="text-xs text-[#888] bg-[#111] px-3 py-2 border border-[#222]">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
