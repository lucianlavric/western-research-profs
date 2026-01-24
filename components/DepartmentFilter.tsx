"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface DepartmentFilterProps {
  departments: string[];
  className?: string;
}

export default function DepartmentFilter({
  departments,
  className = "",
}: DepartmentFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDept = searchParams.get("dept") || "";

  const handleFilter = (dept: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (dept) {
      params.set("dept", dept);
    } else {
      params.delete("dept");
    }
    router.push(`/professors?${params.toString()}`);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group" aria-label="Filter by department">
      <button
        onClick={() => handleFilter("")}
        aria-pressed={!currentDept}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !currentDept
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {departments.map((dept) => (
        <button
          key={dept}
          onClick={() => handleFilter(dept)}
          aria-pressed={currentDept === dept}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            currentDept === dept
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {dept}
        </button>
      ))}
    </div>
  );
}
