import Link from "next/link";
import { Professor } from "@/lib/types";
import ResearchTags from "./ResearchTags";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  const recentYear = professor.publications.length > 0
    ? Math.max(...professor.publications.map((p) => p.year))
    : null;

  const pubCount = professor.publications.length;

  return (
    <Link href={`/professors/${professor.id}`} className="block group">
      <div className="p-5 h-full flex flex-col bg-[#111] border border-[#222] hover:border-[#333] transition-all card-hover">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-[#1a1a1a] border border-[#333] flex items-center justify-center flex-shrink-0">
            <span className="text-[#ff6b35] text-sm font-medium">
              {professor.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-[#fafafa] group-hover:text-[#ff6b35] transition-colors truncate">
              {professor.name}
            </h3>
            <p className="text-xs text-[#666] mt-0.5">{professor.title}</p>
            <p className="text-xs text-[#888] mt-1">
              {professor.department}
            </p>
          </div>
        </div>

        {/* Research Areas */}
        {professor.researchAreas.length > 0 && (
          <div className="mt-4">
            <ResearchTags tags={professor.researchAreas} limit={3} small />
          </div>
        )}

        {/* Publications indicator */}
        <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-[#666] border-t border-[#222]">
          <span className="flex items-center gap-1.5 pt-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{pubCount} publication{pubCount !== 1 ? "s" : ""}</span>
          </span>
          {recentYear && (
            <span className="text-[#555] pt-3">
              Latest: {recentYear}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
