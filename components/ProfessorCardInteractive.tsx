"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Professor } from "@/lib/types";
import ResearchTags from "./ResearchTags";

// Dynamic import - only loads when preview is opened (bundle-dynamic-imports)
const ProfessorPreview = dynamic(() => import("./ProfessorPreview"), {
  ssr: false,
});

interface ProfessorCardInteractiveProps {
  professor: Professor;
  striped?: boolean;
}

const colors = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

function getColor(name: string) {
  return colors[name.charCodeAt(0) % colors.length];
}

export default function ProfessorCardInteractive({ professor, striped = false }: ProfessorCardInteractiveProps) {
  const [showPreview, setShowPreview] = useState(false);

  // Use loop instead of Math.max(...spread) for O(n) performance (js-min-max-loop)
  const recentYear = (() => {
    const pubs = professor.publications;
    if (pubs.length === 0) return null;
    let max = pubs[0].year;
    for (let i = 1; i < pubs.length; i++) {
      if (pubs[i].year > max) max = pubs[i].year;
    }
    return max;
  })();

  const pubCount = professor.publications.length;
  const color = getColor(professor.name);

  return (
    <>
      <Link href={`/professors/${professor.id}`} className="block group">
        <div 
          className="neu-card p-4 md:p-5 h-full flex flex-col relative"
          style={{ backgroundColor: striped ? "#fff8e6" : undefined }}
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent opacity-20" />
          
          <div className="flex items-start gap-3 mb-2">
            <div
              className="w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center flex-shrink-0 relative"
              style={{ backgroundColor: color }}
            >
              <span className="text-[#1a1a1a] font-bold">{professor.name.charAt(0)}</span>
              {/* Small accent corner */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#1a1a1a] border border-[#1a1a1a]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#ff5c5c] truncate">
                {professor.name}
              </h3>
              <p className="text-xs text-[#666] truncate">{professor.department}</p>
            </div>
          </div>

          {professor.researchAreas.length > 0 && (
            <div className="mb-2 flex-grow">
              <ResearchTags tags={professor.researchAreas} limit={3} small />
            </div>
          )}

          <div className="pt-2 flex items-center gap-2 text-xs text-[#666] border-t-2 border-[#1a1a1a]">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-[#ffd93d] border border-[#1a1a1a] text-[10px] font-bold text-[#1a1a1a] mt-2">
              {pubCount}
            </span>
            <span className="mt-2">pubs</span>
            {recentYear && (
              <span className="ml-auto text-xs text-[#666]">{recentYear}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Preview drawer */}
      <ProfessorPreview
        professor={professor}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}
