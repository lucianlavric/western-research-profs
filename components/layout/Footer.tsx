import Link from "next/link";
import { getLastScrapedDate } from "@/lib/data";

export default function Footer() {
  let lastUpdated: string;
  try {
    const date = getLastScrapedDate();
    lastUpdated = date
      ? new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(date))
      : "—";
  } catch {
    lastUpdated = "—";
  }

  return (
    <footer className="bg-[#1a1a1a] border-t-3 border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-white">ResearchProfs</Link>
            <p className="text-xs text-gray-500 mt-1">Find your research mentor</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ffd93d] text-xs uppercase tracking-wide mb-2">Browse</h4>
            <div className="flex flex-col gap-1 text-sm">
              <Link href="/schools" className="text-gray-400 hover:text-white">Schools</Link>
              <Link href="/research-areas" className="text-gray-400 hover:text-white">Topics</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#6bcb77] text-xs uppercase tracking-wide mb-2">Info</h4>
            <div className="flex flex-col gap-1 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#ff5c5c] text-xs uppercase tracking-wide mb-2">Data</h4>
            <p className="text-xs text-gray-500">Updated: {lastUpdated}</p>
            <p className="text-xs text-gray-500">via OpenAlex</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-600 flex justify-between">
          <span>Independent project</span>
          <span>Made for students</span>
        </div>
      </div>
    </footer>
  );
}
