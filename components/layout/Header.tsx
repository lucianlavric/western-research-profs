"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-lg">
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">ResearchProfs</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/schools"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md px-1 -mx-1"
            >
              Schools
            </Link>
            <Link
              href="/research-areas"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md px-1 -mx-1"
            >
              Research Areas
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded-md px-1 -mx-1"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-1">
            <Link
              href="/schools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium py-3 px-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-inset"
            >
              Schools
            </Link>
            <Link
              href="/research-areas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium py-3 px-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-inset"
            >
              Research Areas
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium py-3 px-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-inset"
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
