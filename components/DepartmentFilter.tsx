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
    <div className={`flex flex-wrap gap-1.5 md:gap-2 ${className}`} role="group" aria-label="Filter by department">
      <button
        onClick={() => handleFilter("")}
        aria-pressed={!currentDept}
        className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-bold border-2 border-[#1a1a1a] transition-colors relative ${
          !currentDept
            ? "bg-[#ffd93d] text-[#1a1a1a]"
            : "bg-[#fffef5] text-[#1a1a1a] hover:bg-[#ffd93d]"
        }`}
        style={!currentDept ? { boxShadow: "3px 4px 0 #1a1a1a", transform: "skewY(-1deg)" } : { transform: "skewY(-1deg)" }}
      >
        <span className="relative z-10">All</span>
        {!currentDept && <span className="absolute inset-0 border-2 border-[#1a1a1a] opacity-10 translate-x-0.5 translate-y-0.5 pointer-events-none" />}
      </button>
      {departments.map((dept, idx) => (
        <button
          key={dept}
          onClick={() => handleFilter(dept)}
          aria-pressed={currentDept === dept}
          className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-bold border-2 border-[#1a1a1a] transition-colors relative ${
            currentDept === dept
              ? "bg-[#ffd93d] text-[#1a1a1a]"
              : "bg-[#fffef5] text-[#1a1a1a] hover:bg-[#ffd93d]"
          }`}
          style={currentDept === dept ? { boxShadow: "3px 4px 0 #1a1a1a", transform: `skewY(-1deg) rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)` } : { transform: `skewY(-1deg) rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)` }}
        >
          <span className="relative z-10">{dept}</span>
          {currentDept === dept && <span className="absolute inset-0 border-2 border-[#1a1a1a] opacity-10 translate-x-0.5 translate-y-0.5 pointer-events-none" />}
        </button>
      ))}
    </div>
  );
}
