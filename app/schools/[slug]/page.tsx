import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProfessors, getAllUniversities } from "@/lib/data";
import ProfessorCard from "@/components/ProfessorCard";

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

  const topProfessors = [...professors]
    .sort((a, b) => b.publications.length - a.publications.length)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#666]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/schools" className="hover:text-white transition-colors">Schools</Link>
              </li>
              <li>/</li>
              <li className="text-white">{university}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 border border-[#333] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-medium text-[#888]">
                  {university.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-white mb-1">
                  {university}
                </h1>
                <p className="text-[#666] text-sm">
                  {departments.length} departments
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-right">
                <div className="text-xl font-medium text-white tabular-nums">{professors.length}</div>
                <div className="text-xs text-[#666]">professors</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-white tabular-nums">
                  {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
                </div>
                <div className="text-xs text-[#666]">publications</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-white tabular-nums">
                  {professors.length > 0 ? Math.round(totalPubs / professors.length) : 0}
                </div>
                <div className="text-xs text-[#666]">avg/prof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 md:py-16 border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Browse by</p>
            <h2 className="text-xl font-medium text-white">Departments</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222]">
            {departments.map((dept) => {
              const deptProfs = professors.filter((p) => p.department === dept);
              const deptPubs = deptProfs.reduce((acc, p) => acc + p.publications.length, 0);

              return (
                <Link
                  key={dept}
                  href={`/professors?university=${encodeURIComponent(university)}&dept=${encodeURIComponent(dept)}`}
                  className="group bg-black p-5 hover:bg-[#0a0a0a] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium group-hover:opacity-70 transition-opacity truncate">
                        {dept}
                      </h3>
                      <p className="text-[#666] text-xs mt-1">
                        {deptProfs.length} professors
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#444] group-hover:text-[#666] transition-colors flex-shrink-0 ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Professors */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#666] text-xs uppercase tracking-wider mb-3">Featured</p>
              <h2 className="text-xl font-medium text-white">Top researchers</h2>
            </div>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="text-sm text-[#666] hover:text-white transition-colors hidden md:inline-flex items-center gap-2"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222]">
            {topProfessors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-[#333] text-[#888] text-sm hover:text-white hover:border-[#444] transition-colors"
            >
              View all professors
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
