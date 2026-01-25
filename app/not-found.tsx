import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* Floating 404 */}
        <div className="relative inline-block mb-8">
          <div className="animate-float">
            <div className="text-[120px] md:text-[180px] font-black text-[#1a1a1a] leading-none select-none">
              4
              <span className="inline-block animate-wiggle text-[#ff5c5c]">0</span>
              4
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#ffd93d] border-3 border-[#1a1a1a] rotate-12" />
          <div className="absolute -bottom-2 -right-6 w-6 h-6 bg-[#6bcb77] border-3 border-[#1a1a1a] -rotate-12" />
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-[#ff9f43] border-2 border-[#1a1a1a] rotate-45" />
        </div>

        {/* Message card */}
        <div className="neu-card p-6 md:p-8 mb-8 animate-pulse-shadow">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-[#666] mb-6 text-base md:text-lg">
            Looks like this page went on a research sabbatical and never came back.
            <br />
            Maybe it&apos;s busy writing a groundbreaking paper?
          </p>

          {/* Fun fact */}
          <div className="inline-block bg-[#ffd93d] border-2 border-[#1a1a1a] px-4 py-2 mb-6 -rotate-1">
            <span className="text-xs font-bold uppercase tracking-wide">Fun fact:</span>
            <p className="text-sm font-medium">
              The HTTP 404 error code was named after room 404 at CERN, where the World Wide Web was born.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#ffd93d] text-[#1a1a1a] font-bold border-3 border-[#1a1a1a] shadow-[4px_5px_0_#1a1a1a] hover:-translate-y-1 hover:shadow-[5px_6px_0_#1a1a1a] transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/professors"
            className="px-6 py-3 bg-[#ff5c5c] text-white font-bold border-3 border-[#1a1a1a] shadow-[4px_5px_0_#1a1a1a] hover:-translate-y-1 hover:shadow-[5px_6px_0_#1a1a1a] transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Professors
          </Link>
        </div>

        {/* Decorative bottom pattern */}
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 border-2 border-[#1a1a1a]"
              style={{
                backgroundColor: ["#ffd93d", "#ff5c5c", "#6bcb77", "#ff9f43", "#94a3b8"][i],
                transform: `rotate(${(i - 2) * 15}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
