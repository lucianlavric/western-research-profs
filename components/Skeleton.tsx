export function CardSkeleton() {
  return (
    <div className="neu-card p-4 md:p-5 h-full animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-200 border-2 border-[#1a1a1a]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="pt-2 border-t-2 border-[#1a1a1a]">
        <div className="h-5 bg-gray-200 rounded w-12" />
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="w-full h-12 bg-gray-200 border-2 border-[#1a1a1a] animate-pulse" />
  );
}

export function FilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-8 w-20 bg-gray-200 border-2 border-[#1a1a1a] animate-pulse" />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 md:gap-7">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
