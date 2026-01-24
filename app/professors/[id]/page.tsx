import { notFound } from "next/navigation";
import Link from "next/link";
import { getProfessorById, getAllProfessors, getRelatedProfessors } from "@/lib/data";
import { getDepartmentIcon } from "@/lib/department-icons";
import ResearchTags from "@/components/ResearchTags";
import PublicationList from "@/components/PublicationList";
import ProfessorCardInteractive from "@/components/ProfessorCardInteractive";
import ReachOutHelper from "@/components/ReachOutHelper";

interface Props {
  params: Promise<{ id: string }>;
}

const accentPalette = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

const universityColors: Record<string, string> = {
  "Western University": "#6f42c1",
};

function getAccent(name: string) {
  return accentPalette[name.charCodeAt(0) % accentPalette.length];
}

function getUniversityColor(university: string) {
  return universityColors[university] || "#ffd93d";
}

export async function generateStaticParams() {
  const professors = getAllProfessors();
  return professors.map((prof) => ({ id: prof.id }));
}

export default async function ProfessorPage({ params }: Props) {
  const { id } = await params;
  const professor = getProfessorById(id);

  if (!professor) {
    notFound();
  }

  const totalCitations = professor.publications.reduce(
    (acc, pub) => acc + (pub.citationCount || 0),
    0
  );

  const relatedProfessors = getRelatedProfessors(professor, 4);

  const accent = getAccent(professor.name);
  const universityColor = getUniversityColor(professor.university);

  return (
    <div className="py-6 md:py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-5 md:space-y-6">
        <Link
          href="/professors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] hover:text-[#ff5c5c]"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center border-2 border-[#1a1a1a] bg-[#ffd93d] leading-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          Back to all professors
        </Link>

        <div className="neu-card p-4 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent opacity-30" />
          <div className="flex flex-col md:flex-row gap-5 md:gap-6">
            <div className="shrink-0 flex justify-center md:justify-start">
              <div
                className="w-24 h-24 md:w-32 md:h-32 border-[3px] border-[#1a1a1a] flex items-center justify-center relative"
                style={{ backgroundColor: accent }}
              >
                <span className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                  {professor.name.charAt(0)}
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1a1a1a] border border-[#1a1a1a]" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div
                className="inline-flex items-center gap-2 px-2 py-1 border-2 border-[#1a1a1a] text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: universityColor }}
              >
                {professor.university}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight">
                {professor.name}
              </h1>
              <p className="text-base md:text-lg text-[#1a1a1a] font-semibold">
                {professor.title}
              </p>
              <div className="inline-flex items-center gap-2 px-2 py-1 border-2 border-[#1a1a1a] bg-white font-semibold text-sm">
                <span className="text-base">{getDepartmentIcon(professor.department)}</span>
                {professor.department}
              </div>

              {professor.researchAreas.length > 0 && (
                <div className="pt-1">
                  <ResearchTags tags={professor.researchAreas} limit={5} featured />
                </div>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 pt-1">
                {professor.email && (
                  <a
                    href={`mailto:${professor.email}`}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] text-xs md:text-sm font-semibold hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="text-[#ff5c5c] font-bold">Email</span>
                    {professor.email}
                  </a>
                )}

                {professor.profileUrl && (
                  <a
                    href={professor.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#ffd93d] border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] text-xs md:text-sm font-semibold hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="font-bold">Visit</span>
                    Official Profile
                  </a>
                )}

                {professor.labUrl && (
                  <a
                    href={professor.labUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#6bcb77] border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] text-xs md:text-sm font-semibold hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="font-bold">Lab</span>
                    {professor.labName || "Website"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            {
              label: "Publications",
              value: professor.publications.length,
              hint: "Count",
            },
            {
              label: "Citations",
              value: totalCitations,
              hint: "Total",
            },
            {
              label: "Latest Paper",
              value:
                professor.publications.length > 0
                  ? Math.max(...professor.publications.map((p) => p.year))
                  : "-",
              hint: "Year",
            },
          ].map((item) => (
            <div key={item.label} className="neu-card p-2 md:p-4 text-center relative">
              <div className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-[#1a1a1a]" />
              <div className="text-xl md:text-3xl font-black text-[#1a1a1a] tabular-nums leading-none">
                {item.value}
              </div>
              <div className="text-[10px] md:text-sm text-[#1a1a1a] font-semibold mt-1 md:mt-2 uppercase tracking-wide">
                {item.label}
              </div>
              <div className="text-[9px] md:text-[11px] text-[#666] mt-0.5 md:mt-1">{item.hint}</div>
            </div>
          ))}
        </div>

        {professor.researchSummary && (
          <ReachOutHelper
            summary={professor.researchSummary}
            talkingPoints={professor.talkingPoints}
            professorName={professor.name}
          />
        )}

        {professor.bio && (
          <div className="neu-card p-4 md:p-6">
            <div className="section-label mb-3">About</div>
            <p className="text-sm md:text-base text-[#1a1a1a] whitespace-pre-wrap leading-relaxed">
              {professor.bio}
            </p>
          </div>
        )}

        <div className="neu-card p-4 md:p-6">
          <div className="section-label mb-3">Recent Publications</div>
          <PublicationList publications={professor.publications} />
        </div>

        {relatedProfessors.length > 0 && (
          <div className="mt-4 md:mt-6">
            <div className="section-label mb-3">Related Professors</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {relatedProfessors.map((prof) => (
                <ProfessorCardInteractive key={prof.id} professor={prof} />
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs md:text-sm text-[#666]">
          Last updated: {" "}
          {new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(professor.lastUpdated))}
        </p>
      </div>
    </div>
  );
}
