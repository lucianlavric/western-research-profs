import { notFound } from "next/navigation";
import Link from "next/link";
import { getProfessorById, getAllProfessors } from "@/lib/data";
import ResearchTags from "@/components/ResearchTags";
import PublicationList from "@/components/PublicationList";

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

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/professors"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 text-sm"
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
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar - always use letter */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-4xl">
                  {professor.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {professor.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1">{professor.title}</p>
              <p className="text-purple-600 font-medium mb-4">
                {professor.department}
              </p>

              {/* Contact */}
              <div className="flex flex-wrap gap-4">
                {professor.email && (
                  <a
                    href={`mailto:${professor.email}`}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition"
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
                    className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition"
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
                    className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition"
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {professor.publications.length}
            </div>
            <div className="text-sm text-gray-600">Publications</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {totalCitations}
            </div>
            <div className="text-sm text-gray-600">Citations</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {professor.publications.length > 0
                ? Math.max(...professor.publications.map((p) => p.year))
                : "-"}
            </div>
            <div className="text-sm text-gray-600">Latest Paper</div>
          </div>
        </div>

        {/* Research Areas */}
        {professor.researchAreas.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Research Areas
            </h2>
            <ResearchTags tags={professor.researchAreas} />
          </div>
        )}

        {/* Bio */}
        {professor.bio && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{professor.bio}</p>
          </div>
        )}

        {/* Publications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Publications
          </h2>
          <PublicationList publications={professor.publications} />
        </div>

        {/* Last Updated */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Last updated: {new Date(professor.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
