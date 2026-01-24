"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fffef5] border-b-3 border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ffd93d] border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0_#1a1a1a]">
              <Image src="/logo.svg" alt="" width={20} height={20} />
            </div>
            <span className="font-bold text-[#1a1a1a] hidden sm:block">ResearchProfs</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/schools", label: "Schools" },
              { href: "/research-areas", label: "Topics" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-[#1a1a1a] text-sm font-medium hover:bg-[#ffd93d] border-2 border-transparent hover:border-[#1a1a1a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 border-2 border-[#1a1a1a] bg-white flex items-center justify-center shadow-[2px_2px_0_#1a1a1a]"
          >
            {mobileMenuOpen ? "×" : "≡"}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t-2 border-[#1a1a1a] flex flex-col gap-1">
            {[
              { href: "/schools", label: "Schools" },
              { href: "/research-areas", label: "Topics" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-[#1a1a1a] font-medium border-2 border-[#1a1a1a] bg-white shadow-[2px_2px_0_#1a1a1a]"
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
