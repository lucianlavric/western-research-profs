import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";

const universityLogos: Record<string, string> = {
  "Western University": "/universities/western.png",
};

function getUniversityLogo(name: string): string | null {
  return universityLogos[name] || null;
}

export default function SchoolsPage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();

  return (
    <div className="min-h-screen bg-[#fffef5]">
      <section className="border-b-3 border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <span className="section-label">Browse</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-3">Universities</h1>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-3">
            {universities.map((uni) => {
              const uniProfs = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfs.map((p) => p.department))];
              const uniPubs = uniProfs.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              const logo = getUniversityLogo(uni);

              return (
                <Link key={uni} href={`/schools/${slug}`} className="group neu-card p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <div className="w-12 h-12 bg-white border-2 border-[#1a1a1a] flex items-center justify-center p-1.5">
                        <Image src={logo} alt={uni} width={40} height={40} className="object-contain" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#ff9f43] border-2 border-[#1a1a1a] flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{uni.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h2 className="font-bold text-[#1a1a1a] group-hover:text-[#ff5c5c]">{uni}</h2>
                      <p className="text-xs text-[#666]">{uniDepts.length} depts · {uniProfs.length} profs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-lg font-bold text-[#6bcb77]">{uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}</div>
                      <div className="text-[10px] text-[#666] uppercase">Pubs</div>
                    </div>
                    <div className="w-8 h-8 bg-[#ffd93d] border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0_#1a1a1a] group-hover:shadow-[3px_3px_0_#1a1a1a] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]">
                      →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-10 border-3 border-[#1a1a1a] bg-white shadow-[4px_4px_0_#1a1a1a]">
              <p className="font-bold text-[#1a1a1a] mb-2">No data yet</p>
              <code className="bg-[#1a1a1a] text-white px-3 py-1 text-sm">npm run scrape</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
