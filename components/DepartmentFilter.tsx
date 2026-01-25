"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { groupDepartmentsByFaculty, FACULTY_COLORS, ALL_DEPARTMENTS_COLOR } from "@/lib/faculty-groups";

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
  const [expandedFaculty, setExpandedFaculty] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expandedFaculty]);

  const groupedDepts = groupDepartmentsByFaculty(departments);
  const faculties = Object.keys(groupedDepts);

  const handleFilter = (dept: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (dept) {
      params.set("dept", dept);
    } else {
      params.delete("dept");
    }
    router.push(`/professors?${params.toString()}`);
  };

  const toggleFaculty = (faculty: string) => {
    setExpandedFaculty(expandedFaculty === faculty ? null : faculty);
  };

  // Find which faculty contains the current department
  const currentFaculty = currentDept
    ? faculties.find((f) => groupedDepts[f].includes(currentDept))
    : null;

  return (
    <div className={`space-y-2 ${className}`} role="group" aria-label="Filter by department">
      {/* All button and Faculty pills */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        <button
          onClick={() => {
            handleFilter("");
            setExpandedFaculty(expandedFaculty === "all" ? null : "all");
          }}
          aria-pressed={expandedFaculty === "all"}
          className={`px-3 py-1.5 text-xs md:text-sm font-bold border-2 border-[#1a1a1a] transition-all cursor-pointer flex items-center gap-1.5 ${
            expandedFaculty === "all"
              ? "text-[#1a1a1a] shadow-[3px_4px_0_#1a1a1a]"
              : "text-[#1a1a1a]"
          }`}
          style={{
            backgroundColor: expandedFaculty === "all" ? ALL_DEPARTMENTS_COLOR : "white",
          }}
          onMouseEnter={(e) => {
            if (expandedFaculty !== "all") {
              e.currentTarget.style.backgroundColor = ALL_DEPARTMENTS_COLOR;
            }
          }}
          onMouseLeave={(e) => {
            if (expandedFaculty !== "all") {
              e.currentTarget.style.backgroundColor = "white";
            }
          }}
        >
          <span
            className="w-2 h-2 border border-[#1a1a1a]"
            style={{ backgroundColor: ALL_DEPARTMENTS_COLOR }}
          />
          All Departments
          <span className="text-[10px] opacity-70">({departments.length})</span>
          <svg
            className={`w-3 h-3 transition-transform ${expandedFaculty === "all" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {faculties.map((faculty) => {
          const isExpanded = expandedFaculty === faculty;
          const isActive = currentFaculty === faculty;
          const color = FACULTY_COLORS[faculty] || "#94a3b8";

          return (
            <button
              key={faculty}
              onClick={() => toggleFaculty(faculty)}
              className={`px-3 py-1.5 text-xs md:text-sm font-bold border-2 border-[#1a1a1a] transition-all cursor-pointer flex items-center gap-1.5 ${
                isExpanded || isActive
                  ? "text-[#1a1a1a] shadow-[3px_4px_0_#1a1a1a]"
                  : "text-[#1a1a1a]"
              }`}
              style={{
                backgroundColor: isExpanded || isActive ? color : "white",
              }}
              onMouseEnter={(e) => {
                if (!isExpanded && !isActive) {
                  e.currentTarget.style.backgroundColor = color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isExpanded && !isActive) {
                  e.currentTarget.style.backgroundColor = "white";
                }
              }}
            >
              <span
                className="w-2 h-2 border border-[#1a1a1a]"
                style={{ backgroundColor: color }}
              />
              {faculty}
              <span className="text-[10px] opacity-70">({groupedDepts[faculty].length})</span>
              <svg
                className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Expanded departments with animation */}
      <div
        className="transition-all duration-300 ease-out"
        style={{
          maxHeight: expandedFaculty ? contentHeight + 16 : 0,
          opacity: expandedFaculty ? 1 : 0,
          overflow: expandedFaculty ? "visible" : "hidden",
        }}
      >
        <div
          ref={contentRef}
          className="flex flex-wrap gap-1.5 pt-2 pb-2 border-t-2 border-[#1a1a1a]/20"
        >
          {expandedFaculty &&
            (expandedFaculty === "all" ? departments : groupedDepts[expandedFaculty]).map((dept, index) => (
              <button
                key={dept}
                onClick={() => handleFilter(dept)}
                aria-pressed={currentDept === dept}
                className={`px-2.5 py-1 text-xs font-bold border-2 border-[#1a1a1a] transition-all duration-200 cursor-pointer ${
                  currentDept === dept
                    ? "bg-[#ffd93d] text-[#1a1a1a] shadow-[2px_3px_0_#1a1a1a]"
                    : "bg-white text-[#1a1a1a] hover:bg-[#ffd93d]"
                }`}
                style={{
                  animationDelay: `${Math.min(index, 15) * 30}ms`,
                  animation: expandedFaculty ? "fadeSlideIn 0.25s ease-out forwards" : "none",
                  opacity: 0,
                }}
              >
                {dept}
              </button>
            ))}
        </div>
      </div>

      {/* Show current filter if set */}
      {currentDept && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-[#666]">Filtered by:</span>
          <span className="px-2 py-0.5 text-xs font-bold bg-[#ffd93d] border-2 border-[#1a1a1a]">
            {currentDept}
          </span>
          <button
            onClick={() => handleFilter("")}
            className="text-xs text-[#ff5c5c] hover:underline font-bold cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
