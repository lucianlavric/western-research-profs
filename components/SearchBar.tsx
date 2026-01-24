"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  large?: boolean;
}

export default function SearchBar({
  placeholder = "Search by name, department, or research area…",
  className = "",
  large = false,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.push(`/professors?${params.toString()}`);
    },
    [query, router, searchParams]
  );

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative">
        <input
          type="search"
          name="q"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
            large ? "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg pr-14 md:pr-24" : "px-4 py-3 pr-12 md:pr-20"
          }`}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors ${
            large ? "p-2.5 md:px-6 md:py-2" : "p-2 md:px-4 md:py-1.5 text-sm"
          }`}
        >
          <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
