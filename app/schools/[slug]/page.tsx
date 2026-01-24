import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";
import ProfessorCard from "@/components/ProfessorCard";

// University logo mapping
const universityLogos: Record<string, string> = {
  "Western University": "/universities/western.png",
};

function getUniversityLogo(name: string): string | null {
  return universityLogos[name] || null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  const universities = getAllUniversities();
  return universities.map((uni) => ({
    slug: slugify(uni),
  }));
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;
  const universities = getAllUniversities();
  const university = universities.find((uni) => slugify(uni) === slug);

  if (!university) {
    notFound();
  }

  const allProfessors = getAllProfessors();
  const professors = allProfessors.filter((p) => p.university === university);
  const departments = [...new Set(professors.map((p) => p.department))].sort();
  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  // Get top professors by publication count
  const topProfessors = [...professors]
    .sort((a, b) => b.publications.length - a.publications.length)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-12 md:pt-10 md:pb-14">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#64748b]">
              <li>
                <Link href="/" className="hover:text-[#3b82f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded">Home</Link>
              </li>
              <li className="text-[#cbd5e1]">/</li>
              <li>
                <Link href="/schools" className="hover:text-[#3b82f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded">Schools</Link>
              </li>
              <li className="text-[#cbd5e1]">/</li>
              <li className="text-[#1a1a2e] font-medium">{university}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {getUniversityLogo(university) ? (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#fafafa] rounded-xl border border-[#e2e8f0] flex items-center justify-center p-2">
                  <Image
                    src={getUniversityLogo(university)!}
                    alt={`${university} logo`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">
                    {university.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e]">
                  {university}
                </h1>
                <p className="text-[#64748b] text-sm mt-1">
                  {departments.length} Departments
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-semibold text-[#3b82f6]">
                  {professors.length}
                </div>
                <div className="text-xs text-[#64748b]">Professors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-semibold text-[#3b82f6]">
                  {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
                </div>
                <div className="text-xs text-[#64748b]">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-semibold text-[#3b82f6]">
                  {professors.length > 0 ? Math.round(totalPubs / professors.length) : 0}
                </div>
                <div className="text-xs text-[#64748b]">Avg/Prof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <span className="section-label">Browse By</span>
            <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a2e]">
              Departments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {departments.map((dept) => {
              const deptProfs = professors.filter((p) => p.department === dept);
              const deptPubs = deptProfs.reduce((acc, p) => acc + p.publications.length, 0);

              return (
                <Link
                  key={dept}
                  href={`/professors?university=${encodeURIComponent(university)}&dept=${encodeURIComponent(dept)}`}
                  className="soft-card group p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#1a1a2e] group-hover:text-[#3b82f6] transition-colors truncate text-sm">
                        {dept}
                      </h3>
                      <p className="text-xs text-[#64748b] mt-1">
                        {deptProfs.length} professors · {deptPubs} pubs
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-[#eff6ff] transition-colors">
                      <svg
                        className="w-4 h-4 text-[#64748b] group-hover:text-[#3b82f6] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Professors */}
      <section className="py-10 md:py-14 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="section-label">Featured</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a2e]">
                Top Researchers
              </h2>
            </div>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors hidden md:inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProfessors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="soft-button inline-flex items-center justify-center px-6 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
            >
              View All Professors
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
