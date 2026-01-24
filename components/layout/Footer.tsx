import Link from "next/link";
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
    <footer className="border-t border-[#222] bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-[#fafafa] font-medium text-lg tracking-tight hover:text-[#ff6b35] transition-colors"
            >
              ResearchProfs
            </Link>
            <p className="mt-4 text-sm text-[#666] leading-relaxed">
              Helping students find their research mentors.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs text-[#666] uppercase tracking-wider mb-4">
              Browse
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/schools" className="text-[#888] hover:text-[#ff6b35] transition-colors">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="/research-areas" className="text-[#888] hover:text-[#ff6b35] transition-colors">
                  Research Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs text-[#666] uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-[#888] hover:text-[#ff6b35] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="text-xs text-[#666] uppercase tracking-wider mb-4">
              Data
            </h4>
            <ul className="space-y-3 text-sm text-[#666]">
              <li>Updated: {lastUpdated}</li>
              <li>Via OpenAlex</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#555]">
          <p>Independent project — not affiliated with any university</p>
          <p>Made for students, by students</p>
        </div>
      </div>
    </footer>
  );
}
