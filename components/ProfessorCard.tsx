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
      <div className="soft-card p-5 h-full flex flex-col">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {professor.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#1a1a2e] group-hover:text-[#3b82f6] transition-colors truncate">
              {professor.name}
            </h3>
            <p className="text-sm text-[#64748b] truncate">{professor.title}</p>
            <p className="text-sm text-[#3b82f6] font-medium">
              {professor.department}
            </p>
            <p className="text-xs text-[#94a3b8]">
              {professor.university}
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
        <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-[#64748b] border-t border-[#e2e8f0]">
          <span className="flex items-center gap-1.5 pt-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium text-[#1a1a2e]">{pubCount}</span> publication{pubCount !== 1 ? "s" : ""}
          </span>
          {recentYear && (
            <span className="text-xs text-[#94a3b8] pt-3">
              Latest: {recentYear}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
