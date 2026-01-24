import Link from "next/link";
import Image from "next/image";
import { getAllProfessors, getAllUniversities } from "@/lib/data";
import Marquee from "@/components/Marquee";

const universityLogos: Record<string, string> = {
  "Western University": "/universities/western.png",
};

function getUniversityLogo(name: string): string | null {
  return universityLogos[name] || null;
}

export default function HomePage() {
  const professors = getAllProfessors();
  const universities = getAllUniversities();
  const totalPubs = professors.reduce((acc, p) => acc + p.publications.length, 0);

  return (
    <div className="min-h-screen bg-[#fffef5]">
      {/* Hero - asymmetric, visual-heavy */}
      <section className="border-b-3 border-[#1a1a1a] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-center py-10 lg:py-14">
            {/* Left - Text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
                Find your
                <br />
                <span className="inline-block bg-[#ffd93d] border-2 border-[#1a1a1a] px-2 -rotate-1">research</span>
                <br />
                mentor
              </h1>
              <p className="text-[#666] mt-4 max-w-md text-base">
                Browse {professors.length}+ professors across {universities.length} {universities.length === 1 ? 'university' : 'universities'}.
              </p>
              <div className="flex gap-3 mt-6">
                <Link
                  href="#schools"
                  className="neu-button px-5 py-2.5 text-[#1a1a1a] text-sm font-bold"
                >
                  Explore →
                </Link>
              </div>
            </div>

            {/* Right - Visual grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-3">
                {/* Decorative cards showing sample data */}
                <div className="col-span-2 bg-[#ff5c5c] border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                  <div className="text-white text-3xl font-bold">{totalPubs > 1000 ? `${(totalPubs / 1000).toFixed(0)}k+` : totalPubs}</div>
                  <div className="text-white/80 text-xs uppercase tracking-wide">Publications</div>
                </div>
                <div className="bg-[#ffd93d] border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                  <div className="text-[#1a1a1a] text-3xl font-bold">{professors.length}</div>
                  <div className="text-[#1a1a1a]/70 text-xs uppercase tracking-wide">Profs</div>
                </div>
                <div className="bg-[#6bcb77] border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                  <div className="text-[#1a1a1a] text-xl font-bold">AI</div>
                  <div className="text-[#1a1a1a]/70 text-[10px] uppercase">Research</div>
                </div>
                <div className="bg-white border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                  <div className="text-[#1a1a1a] text-xl font-bold">BIO</div>
                  <div className="text-[#666] text-[10px] uppercase">Research</div>
                </div>
                <div className="bg-[#ff9f43] border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                  <div className="text-white text-xl font-bold">CS</div>
                  <div className="text-white/80 text-[10px] uppercase">Research</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Schools */}
      <section id="schools" className="py-10 bg-white border-b-3 border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Universities</h2>
            <Link href="/schools" className="text-sm font-medium text-[#666] hover:text-[#1a1a1a]">
              View all →
            </Link>
          </div>

          <div className="grid gap-3">
            {universities.map((uni) => {
              const uniProfessors = professors.filter((p) => p.university === uni);
              const uniDepts = [...new Set(uniProfessors.map((p) => p.department))];
              const uniPubs = uniProfessors.reduce((acc, p) => acc + p.publications.length, 0);
              const slug = uni.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              const logo = getUniversityLogo(uni);

              return (
                <Link
                  key={uni}
                  href={`/schools/${slug}`}
                  className="group neu-card p-4 flex items-center justify-between gap-4"
                >
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
                      <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#ff5c5c]">{uni}</h3>
                      <p className="text-xs text-[#666]">{uniDepts.length} depts · {uniProfessors.length} profs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-lg font-bold text-[#6bcb77]">{uniPubs > 1000 ? `${(uniPubs / 1000).toFixed(1)}k` : uniPubs}</div>
                      <div className="text-[10px] text-[#666] uppercase">Pubs</div>
                    </div>
                    <div className="w-8 h-8 bg-[#ffd93d] border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0_#1a1a1a] group-hover:shadow-[3px_3px_0_#1a1a1a] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]">
                      <span className="text-[#1a1a1a]">→</span>
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

      {/* How it works - compact */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { num: "01", title: "Pick a school", color: "#ff5c5c" },
              { num: "02", title: "Browse profs", color: "#ffd93d" },
              { num: "03", title: "Reach out", color: "#6bcb77" },
            ].map((item) => (
              <div key={item.num} className="border-3 border-[#1a1a1a] p-4 bg-white shadow-[4px_4px_0_#1a1a1a]">
                <div className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.num}</div>
                <div className="font-bold text-[#1a1a1a]">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-[#ff5c5c] border-t-3 border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start?</h2>
          <Link
            href="#schools"
            className="inline-block px-6 py-3 bg-[#ffd93d] text-[#1a1a1a] font-bold border-3 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] hover:shadow-[6px_6px_0_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] uppercase text-sm"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  );
}
