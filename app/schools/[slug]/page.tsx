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

  // Get top professors by publication count
  const topProfessors = [...professors]
    .sort((a, b) => b.publications.length - a.publications.length)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 border-b border-[#222]">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#666]">
              <li>
                <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/schools" className="hover:text-[#ff6b35] transition-colors">Schools</Link>
              </li>
              <li>/</li>
              <li className="text-[#fafafa]">{university}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                <span className="text-[#ff6b35] text-3xl md:text-4xl font-light">
                  {university.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-[#fafafa]">
                  {university}
                </h1>
                <p className="text-[#666] mt-1">
                  {departments.length} Departments
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              <div className="text-center">
                <div className="text-3xl font-light text-[#fafafa]">
                  {professors.length}
                </div>
                <div className="text-xs text-[#666] uppercase tracking-wider">Professors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-[#fafafa]">
                  {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
                </div>
                <div className="text-xs text-[#666] uppercase tracking-wider">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-[#fafafa]">
                  {professors.length > 0 ? Math.round(totalPubs / professors.length) : 0}
                </div>
                <div className="text-xs text-[#666] uppercase tracking-wider">Avg/Prof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-3">
              Browse By
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
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
                  className="group p-5 bg-[#111] border border-[#222] hover:border-[#333] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#fafafa] group-hover:text-[#ff6b35] transition-colors">
                        {dept}
                      </h3>
                      <p className="text-xs text-[#666] mt-2">
                        {deptProfs.length} professors &middot; {deptPubs} publications
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#444] group-hover:text-[#ff6b35] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3"
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
      <section className="py-16 md:py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#ff6b35] text-sm tracking-widest uppercase mb-3">
                Featured
              </p>
              <h2 className="text-2xl md:text-3xl font-light">
                Top Researchers
              </h2>
            </div>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="hidden md:inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#ff6b35] transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {topProfessors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ff6b35] text-[#0a0a0a] font-medium hover:bg-[#ff8555] transition-colors"
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
