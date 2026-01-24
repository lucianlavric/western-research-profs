import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";
import ProfessorCard from "@/components/ProfessorCard";

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
  return universities.map((uni) => ({ slug: slugify(uni) }));
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;
  const universities = getAllUniversities();
  const university = universities.find((uni) => slugify(uni) === slug);

  if (!university) notFound();

  const allProfessors = getAllProfessors();
  const professors = allProfessors.filter((p) => p.university === university);
  const departments = [...new Set(professors.map((p) => p.department))].sort();
  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);
  const topProfessors = [...professors].sort((a, b) => b.publications.length - a.publications.length).slice(0, 6);
  const logo = getUniversityLogo(university);

  const colors = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

  return (
    <div className="min-h-screen bg-[#fffef5]">
      {/* Hero */}
      <section className="border-b-3 border-[#1a1a1a] bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <nav className="text-xs text-[#666] mb-4">
            <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
            {" / "}
            <Link href="/schools" className="hover:text-[#1a1a1a]">Schools</Link>
            {" / "}
            <span className="text-[#1a1a1a] font-medium">{university}</span>
          </nav>

          <div className="flex items-center gap-4">
            {logo ? (
              <div className="w-16 h-16 bg-white border-3 border-[#1a1a1a] flex items-center justify-center p-2 shadow-[4px_4px_0_#1a1a1a]">
                <Image src={logo} alt={university} width={48} height={48} className="object-contain" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-[#ff9f43] border-3 border-[#1a1a1a] flex items-center justify-center shadow-[4px_4px_0_#1a1a1a]">
                <span className="text-2xl font-bold text-white">{university.charAt(0)}</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{university}</h1>
              <p className="text-sm text-[#666]">{departments.length} depts · {professors.length} profs · {totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(1)}k` : totalPubs} pubs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {departments.map((dept, i) => {
              const deptProfs = professors.filter((p) => p.department === dept);
              return (
                <Link
                  key={dept}
                  href={`/professors?university=${encodeURIComponent(university)}&dept=${encodeURIComponent(dept)}`}
                  className="group neu-card p-2 flex items-center justify-between"
                >
                  <div className="min-w-0 flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 shrink-0 border border-[#1a1a1a]"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-[#1a1a1a] group-hover:text-[#ff5c5c] leading-tight">{dept}</h3>
                      <p className="text-[10px] text-[#666]">{deptProfs.length} profs</p>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 border-2 border-[#1a1a1a] flex items-center justify-center text-xs shrink-0 ml-2"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  >
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Professors */}
      <section className="py-8 bg-white border-t-3 border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1a1a1a]">Top Researchers</h2>
            <Link
              href={`/professors?university=${encodeURIComponent(university)}`}
              className="text-sm font-medium px-3 py-1 border-2 border-[#1a1a1a] bg-[#ffd93d] shadow-[2px_2px_0_#1a1a1a] hover:shadow-[3px_3px_0_#1a1a1a] hover:-translate-x-px hover:-translate-y-px"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 md:gap-7">
            {topProfessors.map((prof) => (
              <ProfessorCard key={prof.id} professor={prof} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
