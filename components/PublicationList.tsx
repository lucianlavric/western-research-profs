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
    <div className="space-y-4">
      {publications.map((pub, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {pub.url ? (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 hover:text-purple-600 transition line-clamp-2"
                >
                  {pub.title}
                </a>
              ) : (
                <h4 className="font-medium text-gray-900 line-clamp-2">
                  {pub.title}
                </h4>
              )}

              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="font-medium text-purple-600">{pub.year}</span>
                {pub.venue && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="truncate">{pub.venue}</span>
                  </>
                )}
              </div>
            </div>

            {pub.citationCount !== undefined && pub.citationCount > 0 && (
              <div className="flex-shrink-0 text-center">
                <div className="text-lg font-bold text-gray-700">
                  {pub.citationCount}
                </div>
                <div className="text-xs text-gray-400">citations</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
