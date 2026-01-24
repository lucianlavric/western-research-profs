import Link from "next/link";
import Image from "next/image";
import { getLastScrapedDate } from "@/lib/data";

export default function Footer() {
  let lastUpdated: string;
  try {
    const date = getLastScrapedDate();
    lastUpdated = date
      ? new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(date))
      : "Not available";
  } catch {
    lastUpdated = "Not available";
  }

  return (
    <footer className="bg-[#2d2013] border-t-4 border-[#4a3728]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d2013] rounded">
              <Image
                src="/logo.svg"
                alt="ResearchProfs"
                width={40}
                height={40}
                className="border-2 border-[#4a3728] shadow-[2px_2px_0_#1a1209] rounded-lg"
              />
              <span className="font-bold text-[#f5e6d3] text-xl uppercase tracking-wide" style={{ fontFamily: 'Teko, sans-serif' }}>
                ResearchProfs
              </span>
            </Link>
            <p className="text-sm text-[#a89a82]">
              Helping students find their research mentors.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-[#f5e6d3] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Teko, sans-serif', fontSize: '1.1rem' }}>
              Browse
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/schools" className="text-[#a89a82] hover:text-[#cf6a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] rounded">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="/research-areas" className="text-[#a89a82] hover:text-[#cf6a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] rounded">
                  Research Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[#f5e6d3] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Teko, sans-serif', fontSize: '1.1rem' }}>
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-[#a89a82] hover:text-[#cf6a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] rounded">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="font-bold text-[#f5e6d3] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Teko, sans-serif', fontSize: '1.1rem' }}>
              Data
            </h4>
            <ul className="space-y-3 text-sm text-[#a89a82]">
              <li>Last updated: {lastUpdated}</li>
              <li>Publications via OpenAlex</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-[#4a3728] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a89a82]">
          <p>Independent project — not affiliated with any university</p>
          <p>Made for students, by students</p>
        </div>
      </div>
    </footer>
  );
}
