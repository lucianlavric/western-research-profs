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
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-lg w-fit">
              <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-semibold text-gray-900">ResearchProfs</span>
            </Link>
            <p className="text-sm text-gray-500">
              Helping students find their research mentors.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Browse</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/schools" className="text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="/research-areas" className="text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md">
                  Research Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Data</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>Last updated: {lastUpdated}</li>
              <li>Publications via OpenAlex</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>Independent project — not affiliated with any university</p>
          <p>Made for students, by students</p>
        </div>
      </div>
    </footer>
  );
}
