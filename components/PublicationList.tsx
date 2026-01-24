import { Publication } from "@/lib/types";

interface PublicationListProps {
  publications: Publication[];
}

export default function PublicationList({ publications }: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p>No recent publications found</p>
        <p className="text-sm text-gray-400 mt-1">
          Try checking their official profile for more information
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {publications.map((pub, index) => (
        <div
          key={index}
          className="neu-card p-3 relative hover:-translate-y-1 hover:shadow-[5px_6px_0_var(--shadow),_9px_11px_13px_rgba(0,0,0,0.1)] transition-all"
        >
          {/* Corner accent */}
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#1a1a1a]" />
          
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {pub.url ? (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-[#1a1a1a] hover:text-[#ff5c5c] line-clamp-2"
                >
                  {pub.title}
                </a>
              ) : (
                <h4 className="font-bold text-sm text-[#1a1a1a] line-clamp-2">
                  {pub.title}
                </h4>
              )}

              <div className="flex items-center gap-2 mt-1.5 text-xs text-[#666]">
                <span className="font-bold text-[#1a1a1a]">{pub.year}</span>
                {pub.venue && (
                  <>
                    <span className="text-[#1a1a1a]">•</span>
                    <span className="truncate">{pub.venue}</span>
                  </>
                )}
              </div>
            </div>

            {pub.citationCount !== undefined && pub.citationCount > 0 && (
              <div className="flex-shrink-0 text-center">
                <div className="text-base font-bold text-[#1a1a1a] tabular-nums">
                  {pub.citationCount}
                </div>
                <div className="text-xs text-[#666]">citations</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
