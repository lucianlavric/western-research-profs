import { notFound } from "next/navigation";
import Link from "next/link";
import { getProfessorById, getAllProfessors, getRelatedProfessors } from "@/lib/data";
import ResearchTags from "@/components/ResearchTags";
import PublicationList from "@/components/PublicationList";
import ProfessorCard from "@/components/ProfessorCard";
import ReachOutHelper from "@/components/ReachOutHelper";

interface Props {
  params: Promise<{ id: string }>;
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

  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/professors"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 md:mb-6 text-sm"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all professors
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Avatar - always use letter */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-3xl md:text-4xl">
                  {professor.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
                {professor.name}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-1">{professor.title}</p>
              <p className="text-purple-600 font-medium">
                {professor.department}
              </p>
              <p className="text-gray-500 text-sm mb-3 md:mb-4">
                {professor.university}
              </p>

              {/* Contact */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {professor.email && (
                  <a
                    href={`mailto:${professor.email}`}
                    className="inline-flex items-center text-xs md:text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {professor.email}
                  </a>
                )}

                {professor.profileUrl && (
                  <a
                    href={professor.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs md:text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Official Profile
                  </a>
                )}

                {professor.labUrl && (
                  <a
                    href={professor.labUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs md:text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    {professor.labName || "Lab Website"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600 tabular-nums">
              {professor.publications.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Publications</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600 tabular-nums">
              {totalCitations}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Citations</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600 tabular-nums">
              {professor.publications.length > 0
                ? Math.max(...professor.publications.map((p) => p.year))
                : "-"}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Latest Paper</div>
          </div>
        </div>

        {/* Help Me Reach Out */}
        {professor.researchSummary && (
          <ReachOutHelper
            summary={professor.researchSummary}
            talkingPoints={professor.talkingPoints}
            professorName={professor.name}
          />
        )}

        {/* Research Areas */}
        {professor.researchAreas.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
              Research Areas
            </h2>
            <ResearchTags tags={professor.researchAreas} />
          </div>
        )}

        {/* Bio */}
        {professor.bio && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">About</h2>
            <p className="text-sm md:text-base text-gray-600 whitespace-pre-wrap">{professor.bio}</p>
          </div>
        )}

        {/* Publications */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
            Recent Publications
          </h2>
          <PublicationList publications={professor.publications} />
        </div>

        {/* Related Professors */}
        {relatedProfessors.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
              Related Professors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProfessors.map((prof) => (
                <ProfessorCard key={prof.id} professor={prof} />
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <p className="text-center text-xs md:text-sm text-gray-400 mt-4 md:mt-6">
          Last updated:{" "}
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
