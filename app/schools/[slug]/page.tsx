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
    <div className="min-h-screen tf-paper bg-[#f5e6d3]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2013] border-b-4 border-[#4a3728]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-20">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#a89a82]">
              <li>
                <Link href="/" className="hover:text-[#cf6a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] rounded">Home</Link>
              </li>
              <li className="text-[#4a3728]">/</li>
              <li>
                <Link href="/schools" className="hover:text-[#cf6a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] rounded">Schools</Link>
              </li>
              <li className="text-[#4a3728]">/</li>
              <li className="text-[#f5e6d3] font-medium">{university}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#b8383b] border-3 border-[#4a3728] shadow-[4px_4px_0_#1a1209] flex items-center justify-center">
                <span className="tf-heading text-4xl md:text-5xl text-white">
                  {university.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="tf-heading text-3xl md:text-5xl text-[#f5e6d3] mb-1">
                  {university}
                </h1>
                <p className="text-[#a89a82] uppercase text-sm tracking-wide">
                  {departments.length} Departments · {professors.length} Professors
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-10">
              <div className="text-center">
                <div className="tf-heading text-3xl md:text-4xl text-[#cf6a32]" style={{ textShadow: '2px 2px 0 #4a3728' }}>
                  {professors.length}
                </div>
                <div className="text-xs text-[#a89a82] uppercase tracking-wide">Professors</div>
              </div>
              <div className="text-center">
                <div className="tf-heading text-3xl md:text-4xl text-[#cf6a32]" style={{ textShadow: '2px 2px 0 #4a3728' }}>
                  {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
                </div>
                <div className="text-xs text-[#a89a82] uppercase tracking-wide">Publications</div>
              </div>
              <div className="text-center">
                <div className="tf-heading text-3xl md:text-4xl text-[#cf6a32]" style={{ textShadow: '2px 2px 0 #4a3728' }}>
                  {professors.length > 0 ? Math.round(totalPubs / professors.length) : 0}
                </div>
                <div className="text-xs text-[#a89a82] uppercase tracking-wide">Avg/Prof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-block bg-[#b8383b] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 border-2 border-[#4a3728]">
              Browse By
            </div>
            <h2 className="tf-heading text-3xl md:text-4xl text-[#2d2013]">
              Departments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const deptProfs = professors.filter((p) => p.department === dept);
              const deptPubs = deptProfs.reduce((acc, p) => acc + p.publications.length, 0);

              return (
                <Link
                  key={dept}
                  href={`/professors?university=${encodeURIComponent(university)}&dept=${encodeURIComponent(dept)}`}
                  className="tf-card group p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8383b] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#2d2013] group-hover:text-[#b8383b] transition-colors truncate uppercase tracking-wide text-sm">
                        {dept}
                      </h3>
                      <p className="text-sm text-[#4a3728] mt-1">
                        {deptProfs.length} professors · {deptPubs} pubs
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-[#cf6a32] border-2 border-[#4a3728] flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-[#b8383b] transition-colors">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
      <section className="py-12 md:py-20 bg-[#e8d5b7] border-t-4 border-[#4a3728]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-block bg-[#cf6a32] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 border-2 border-[#4a3728]">
                Featured
              </div>
              <h2 className="tf-heading text-3xl md:text-4xl text-[#2d2013]">
                Top Researchers
              </h2>
            </div>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="text-sm font-bold text-[#4a3728] hover:text-[#b8383b] transition-colors hidden md:inline-flex items-center gap-1 uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8383b] rounded"
            >
              View All Professors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topProfessors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#b8383b] text-white text-lg font-bold uppercase tracking-wide border-3 border-[#4a3728] shadow-[3px_3px_0_#4a3728] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#4a3728] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-offset-2"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              View All Professors
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
