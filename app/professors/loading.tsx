import { GridSkeleton, SearchSkeleton, FilterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Header skeleton */}
        <div className="mb-2 md:mb-4">
          <div className="h-8 w-48 bg-gray-200 animate-pulse mb-2" />
          <div className="h-4 w-32 bg-gray-200 animate-pulse" />
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <SearchSkeleton />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <FilterSkeleton />
            <div className="h-8 w-32 bg-gray-200 animate-pulse border-2 border-[#1a1a1a]" />
          </div>
        </div>

        {/* Results grid */}
        <GridSkeleton count={8} />
      </div>
    </div>
  );
}
