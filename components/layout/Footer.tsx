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
    <footer className="bg-white border-t border-[#e2e8f0]">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 rounded-lg">
              <Image
                src="/logo.svg"
                alt="ResearchProfs"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-semibold text-[#1a1a2e]">
                ResearchProfs
              </span>
            </Link>
            <p className="text-sm text-[#64748b]">
              Helping students find their research mentors.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[#1a1a2e] mb-4 text-sm">
              Browse
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/schools" className="text-[#64748b] hover:text-[#3b82f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="/research-areas" className="text-[#64748b] hover:text-[#3b82f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded">
                  Research Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#1a1a2e] mb-4 text-sm">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#64748b] hover:text-[#3b82f6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="font-semibold text-[#1a1a2e] mb-4 text-sm">
              Data
            </h4>
            <ul className="space-y-2.5 text-sm text-[#64748b]">
              <li>Last updated: {lastUpdated}</li>
              <li>Publications via OpenAlex</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94a3b8]">
          <p>Independent project - not affiliated with any university</p>
          <p>Made for students, by students</p>
        </div>
      </div>
    </footer>
  );
}
