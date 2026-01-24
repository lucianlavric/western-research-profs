"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#2d2013] border-b-4 border-[#4a3728]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d2013] rounded">
            <div className="w-10 h-10 bg-[#b8383b] border-2 border-[#4a3728] shadow-[2px_2px_0_#1a1209] flex items-center justify-center">
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Teko, sans-serif' }}>R</span>
            </div>
            <span className="font-bold text-[#f5e6d3] text-xl hidden sm:block uppercase tracking-wide" style={{ fontFamily: 'Teko, sans-serif' }}>
              ResearchProfs
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/schools", label: "Schools" },
              { href: "/research-areas", label: "Research Areas" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[#e8d5b7] hover:text-white hover:bg-[#4a3728] transition-colors text-sm font-bold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-inset"
                style={{ fontFamily: 'Teko, sans-serif', fontSize: '1.1rem' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#e8d5b7] hover:text-white hover:bg-[#4a3728] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-inset"
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
          <nav className="md:hidden py-2 border-t-2 border-[#4a3728] flex flex-col">
            {[
              { href: "/schools", label: "Schools" },
              { href: "/research-areas", label: "Research Areas" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-[#e8d5b7] hover:text-white hover:bg-[#4a3728] transition-colors font-bold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf6a32] focus-visible:ring-inset"
                style={{ fontFamily: 'Teko, sans-serif', fontSize: '1.1rem' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
