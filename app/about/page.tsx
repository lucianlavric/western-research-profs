export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fffef5]">
      <section className="border-b-3 border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <span className="section-label">Info</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-3">About</h1>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="neu-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#ffd93d] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0 text-sm">⚡</div>
              <div>
                <h2 className="font-bold text-[#1a1a1a]">Mission</h2>
                <p className="text-sm text-[#666] mt-1">Help students find research mentors by aggregating professor info and publications.</p>
              </div>
            </div>
          </div>

          <div className="neu-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#6bcb77] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0 text-sm">⚙</div>
              <div>
                <h2 className="font-bold text-[#1a1a1a]">How it works</h2>
                <p className="text-sm text-[#666] mt-1">We scrape public faculty pages and enrich with publication data from OpenAlex.</p>
              </div>
            </div>
          </div>

          <div className="neu-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#ff9f43] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0 text-sm">📊</div>
              <div>
                <h2 className="font-bold text-[#1a1a1a]">Data sources</h2>
                <ul className="text-sm text-[#666] mt-1 space-y-0.5">
                  <li>• Profiles: University faculty pages</li>
                  <li>• Publications: OpenAlex API</li>
                  <li>• Research areas: Faculty profiles</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="neu-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#ff5c5c] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0 text-sm text-white">💡</div>
              <div>
                <h2 className="font-bold text-[#1a1a1a]">Tips for cold emails</h2>
                <ol className="text-sm text-[#666] mt-1 space-y-0.5 list-decimal list-inside">
                  <li>Read their recent papers</li>
                  <li>Mention specific work</li>
                  <li>Be brief about yourself</li>
                  <li>Follow up once if needed</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="border-3 border-[#1a1a1a] p-4 bg-[#1a1a1a] shadow-[4px_4px_0_#666]">
            <p className="text-xs text-gray-400">
              Independent project. Not affiliated with any university. Data from public sources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
