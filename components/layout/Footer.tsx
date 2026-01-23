import { getLastScrapedDate } from "@/lib/data";

export default function Footer() {
  let lastUpdated: string;
  try {
    const date = getLastScrapedDate();
    lastUpdated = date ? new Date(date).toLocaleDateString() : "Not available";
  } catch {
    lastUpdated = "Not available";
  }

  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>
            <p>
              Data last updated: <span className="font-medium">{lastUpdated}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Publications sourced from Semantic Scholar
            </p>
          </div>

          <div className="text-center md:text-right">
            <p>
              Not affiliated with Western University
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Made for students, by students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
