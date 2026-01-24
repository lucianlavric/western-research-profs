import Link from "next/link";
import { getAllResearchAreas } from "@/lib/data";

const colors = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

export default function ResearchAreasPage() {
  const researchAreas = getAllResearchAreas();

  const grouped = researchAreas.reduce((acc, { area, count }) => {
    const letter = area.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push({ area, count });
    return acc;
  }, {} as Record<string, { area: string; count: number }[]>);

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-[#fffef5]">
      <section className="border-b-3 border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <span className="section-label">Explore</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-3">Research Topics</h1>
          <p className="text-sm text-[#666] mt-1">{researchAreas.length} topics across all professors</p>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Jump nav */}
          <div className="mb-6 flex flex-wrap gap-1">
            {sortedLetters.map((letter, i) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-7 h-7 flex items-center justify-center border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold text-xs shadow-[2px_2px_0_#1a1a1a] hover:shadow-[3px_3px_0_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Topics by letter */}
          <div className="space-y-6">
            {sortedLetters.map((letter, letterIndex) => (
              <section key={letter} id={`section-${letter}`}>
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 flex items-center gap-2 border-b-2 border-[#1a1a1a] pb-2">
                  <span
                    className="w-6 h-6 flex items-center justify-center border-2 border-[#1a1a1a] text-xs font-bold"
                    style={{ backgroundColor: colors[letterIndex % colors.length] }}
                  >
                    {letter}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {grouped[letter].map(({ area, count }, i) => (
                    <Link
                      key={area}
                      href={`/professors?q=${encodeURIComponent(area)}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-2 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a] hover:shadow-[3px_3px_0_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] text-sm"
                    >
                      <span className="text-[#1a1a1a]">{area}</span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 border border-[#1a1a1a]"
                        style={{ backgroundColor: colors[(letterIndex + i) % colors.length] }}
                      >
                        {count}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {researchAreas.length === 0 && (
            <div className="text-center py-10 border-3 border-[#1a1a1a] bg-white shadow-[4px_4px_0_#1a1a1a]">
              <p className="font-bold text-[#1a1a1a] mb-2">No data yet</p>
              <code className="bg-[#1a1a1a] text-white px-3 py-1 text-sm">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
