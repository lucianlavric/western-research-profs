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
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5 hover:shadow-lg hover:border-purple-300 transition-shadow h-full flex flex-col">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Avatar - always use letter */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 font-bold text-lg md:text-xl">
              {professor.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-purple-600 transition-colors truncate">
              {professor.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">{professor.title}</p>
            <p className="text-xs md:text-sm text-purple-600 font-medium">
              {professor.department}
            </p>
          </div>
        </div>

        {/* Research Areas */}
        {professor.researchAreas.length > 0 && (
          <div className="mt-3 md:mt-4">
            <ResearchTags tags={professor.researchAreas} limit={3} small />
          </div>
        )}

        {/* Publications indicator */}
        <div className="mt-auto pt-3 md:pt-4 flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {pubCount} publication{pubCount !== 1 ? "s" : ""}
          </span>
          {recentYear && (
            <span className="text-xs text-gray-400">
              Latest: {recentYear}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
