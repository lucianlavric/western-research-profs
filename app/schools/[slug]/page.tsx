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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.06),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md">Home</Link>
              </li>
              <li className="text-gray-300">/</li>
              <li>
                <Link href="/schools" className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md">Schools</Link>
              </li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-900 font-medium">{university}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-purple-600">
                  {university.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {university}
                </h1>
                <p className="text-gray-500">
                  {departments.length} departments · {professors.length} professors
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{professors.length}</div>
                <div className="text-sm text-gray-500">Professors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs}
                </div>
                <div className="text-sm text-gray-500">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {professors.length > 0 ? Math.round(totalPubs / professors.length) : 0}
                </div>
                <div className="text-sm text-gray-500">Avg/Prof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-2">
                Browse by
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Departments
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const deptProfs = professors.filter((p) => p.department === dept);
              const deptPubs = deptProfs.reduce((acc, p) => acc + p.publications.length, 0);

              return (
                <Link
                  key={dept}
                  href={`/professors?university=${encodeURIComponent(university)}&dept=${encodeURIComponent(dept)}`}
                  className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                        {dept}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {deptProfs.length} professors · {deptPubs} pubs
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors flex-shrink-0 ml-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Professors */}
      <section className="py-12 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-purple-600 font-medium tracking-wide uppercase text-sm mb-2">
                Featured
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top Researchers
              </h2>
            </div>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden md:inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md"
            >
              View all professors
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
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
            >
              View all professors
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
