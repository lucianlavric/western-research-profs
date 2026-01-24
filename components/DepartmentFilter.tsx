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
        className={`px-3 py-1.5 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${
          !currentDept
            ? "bg-[#ffd93d] text-[#1a1a1a]"
            : "bg-[#fffef5] text-[#1a1a1a] hover:bg-[#ffd93d]"
        }`}
        style={!currentDept ? { boxShadow: "2px 2px 0 #1a1a1a" } : {}}
      >
        All
      </button>
      {departments.map((dept) => (
        <button
          key={dept}
          onClick={() => handleFilter(dept)}
          aria-pressed={currentDept === dept}
          className={`px-3 py-1.5 text-sm font-bold border-2 border-[#1a1a1a] transition-colors ${
            currentDept === dept
              ? "bg-[#ffd93d] text-[#1a1a1a]"
              : "bg-[#fffef5] text-[#1a1a1a] hover:bg-[#ffd93d]"
          }`}
          style={currentDept === dept ? { boxShadow: "2px 2px 0 #1a1a1a" } : {}}
        >
          {dept}
        </button>
      ))}
    </div>
  );
}
