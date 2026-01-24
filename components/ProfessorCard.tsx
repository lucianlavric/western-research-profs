import Link from "next/link";
import { Professor } from "@/lib/types";
import ResearchTags from "./ResearchTags";

interface ProfessorCardProps {
  professor: Professor;
}

const universityColors: Record<string, string> = {
  "Western University": "#6f42c1",
};

function getUniversityColor(university: string) {
  return universityColors[university] || "#ffd93d";
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  const pubCount = professor.publications.length;
  const avatarColor = "#ffd93d";
  const rotation = 0;
  const uniColor = getUniversityColor(professor.university);

  return (
    <Link href={`/professors/${professor.id}`} className="block group">
      <div 
          className="neu-card p-4 md:p-5 h-full flex flex-col relative"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent opacity-20" />
        
        <div className="flex items-start gap-3 mb-2">
          <div
            className="w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center shrink-0 relative"
              style={{ backgroundColor: avatarColor }}
          >
            <span className="text-[#1a1a1a] font-bold">{professor.name.charAt(0)}</span>
            {/* Small accent corner */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#1a1a1a] border border-[#1a1a1a]" />
          </div>
          <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#ff5c5c] truncate">
                {professor.name}
              </h3>
              <p className="text-xs text-[#1a1a1a] font-semibold truncate">{professor.department}</p>
            </div>
            <div
              className="inline-flex items-center gap-2 px-2 py-0.5 border-2 border-[#1a1a1a] text-[10px] font-bold uppercase tracking-wide shrink-0"
              style={{ backgroundColor: uniColor }}
            >
              <span className="inline-block w-2 h-2 bg-[#1a1a1a]" />
              {professor.university}
            </div>
          </div>
        </div>

        {professor.researchAreas.length > 0 && (
          <div className="mb-2 grow space-y-1">
            <div className="inline-flex items-center px-1.5 py-0.5 border border-[#1a1a1a] text-[10px] font-bold uppercase bg-[#ffd93d]">
              Interests
            </div>
            <ResearchTags tags={professor.researchAreas} limit={3} small />
          </div>
        )}

        <div className="pt-2 flex items-center gap-2 text-xs text-[#666] border-t-2 border-[#1a1a1a]">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-[#ffd93d] border border-[#1a1a1a] text-[10px] font-bold text-[#1a1a1a] mt-2">
            {pubCount}
          </span>
          <span className="mt-2">pubs</span>
        </div>
      </div>
    </Link>
  );
}
