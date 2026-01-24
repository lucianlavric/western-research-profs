import Link from "next/link";
import { Professor } from "@/lib/types";
import ResearchTags from "./ResearchTags";

interface ProfessorCardProps {
  professor: Professor;
}

const colors = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

function getColor(name: string) {
  return colors[name.charCodeAt(0) % colors.length];
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  const pubCount = professor.publications.length;
  const color = getColor(professor.name);

  return (
    <Link href={`/professors/${professor.id}`} className="block group">
      <div className="neu-card p-3 h-full flex flex-col">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            <span className="text-[#1a1a1a] font-bold">{professor.name.charAt(0)}</span>
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

        <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-[#666] border-t-2 border-[#1a1a1a]">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-[#ffd93d] border border-[#1a1a1a] text-[10px] font-bold text-[#1a1a1a] mt-2">
            {pubCount}
          </span>
          <span className="mt-2">pubs</span>
        </div>
      </div>
    </Link>
  );
}
