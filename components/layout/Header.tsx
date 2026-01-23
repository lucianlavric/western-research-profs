"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-purple-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-900 font-bold text-xl">W</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Western Research Profs</h1>
              <p className="text-purple-200 text-xs">Find your research supervisor</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/professors"
              className="text-purple-100 hover:text-white transition text-sm font-medium"
            >
              Browse Professors
            </Link>
            <Link
              href="/about"
              className="text-purple-100 hover:text-white transition text-sm font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
