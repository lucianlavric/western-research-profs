"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-purple-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-900 font-bold text-lg md:text-xl">W</span>
            </div>
            <div>
              <h1 className="font-bold text-base md:text-lg leading-tight">Western Research Profs</h1>
              <p className="text-purple-200 text-xs hidden sm:block">Find your research supervisor</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/professors"
              className="text-purple-100 hover:text-white transition-colors text-sm font-medium"
            >
              Browse Professors
            </Link>
            <Link
              href="/about"
              className="text-purple-100 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-purple-700 flex flex-col gap-3">
            <Link
              href="/professors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-100 hover:text-white transition-colors font-medium py-2"
            >
              Browse Professors
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-100 hover:text-white transition-colors font-medium py-2"
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
