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
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Research Areas
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Explore {researchAreas.length} research areas across all professors.
            Click any area to find professors working in that field.
          </p>
        </div>

        {/* Quick jump */}
        <div className="mb-6 flex flex-wrap gap-1.5 md:gap-2">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#section-${letter}`}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded text-sm transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Research areas by letter */}
        <div className="space-y-6 md:space-y-8">
          {sortedLetters.map((letter) => (
            <section key={letter} id={`section-${letter}`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="flex flex-wrap gap-2">
                {grouped[letter].map(({ area, count }) => (
                  <Link
                    key={area}
                    href={`/professors?q=${encodeURIComponent(area)}`}
                    className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-purple-700">
                      {area}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded group-hover:bg-purple-100 group-hover:text-purple-600">
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
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No research areas found
            </h2>
            <p className="text-gray-600">
              Run the scraper to populate professor data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
