"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortSelectorProps {
  className?: string;
}

const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "pubs", label: "Publications ↓" },
  { value: "pubs-asc", label: "Publications ↑" },
  { value: "recent", label: "Recently Active" },
];

export default function SortSelector({ className = "" }: SortSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "name";

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort && sort !== "name") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    router.push(`/professors?${params.toString()}`);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="sort" className="text-xs font-bold text-[#666] uppercase tracking-wide">
        Sort:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="px-3 py-1.5 text-sm font-bold border-2 border-[#1a1a1a] bg-white text-[#1a1a1a] cursor-pointer hover:bg-[#ffd93d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
        style={{ boxShadow: "2px 2px 0 #1a1a1a" }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
