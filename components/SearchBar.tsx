"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Professor } from "@/lib/types";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  large?: boolean;
  professors?: Professor[];
}

export default function SearchBar({
  placeholder = "Search by name, department, or research area…",
  className = "",
  large = false,
  professors = [],
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<Professor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter professors based on query
  useEffect(() => {
    if (query.trim().length < 2 || professors.length === 0) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = professors
      .filter(
        (prof) =>
          prof.name.toLowerCase().includes(lowerQuery) ||
          prof.department.toLowerCase().includes(lowerQuery) ||
          prof.researchAreas.some((area) => area.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5);

    setSuggestions(matches);
    setSelectedIndex(-1);
  }, [query, professors]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setShowSuggestions(false);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      setShowSuggestions(false);
      router.push(`/professors/${suggestions[selectedIndex].id}`);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative" ref={wrapperRef}>
        <input
          type="search"
          name="q"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
            large ? "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg pr-14 md:pr-24" : "px-4 py-3 pr-12 md:pr-20"
          }`}
          role="combobox"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="search-suggestions"
          aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
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

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            id="search-suggestions"
            role="listbox"
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            {suggestions.map((prof, index) => (
              <li
                key={prof.id}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <Link
                  href={`/professors/${prof.id}`}
                  onClick={() => setShowSuggestions(false)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                    index === selectedIndex ? "bg-purple-50" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {prof.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{prof.name}</p>
                    <p className="text-sm text-gray-500 truncate">{prof.department}</p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400">
                    {prof.publications.length} pubs
                  </div>
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 text-left transition-colors"
              >
                View all results for &quot;{query}&quot;
              </button>
            </li>
          </ul>
        )}
      </div>
    </form>
  );
}
