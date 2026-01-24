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
      const maxIndex = suggestions.length - 1;
      setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
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
          className={`w-full border-2 border-[#1a1a1a] focus:ring-0 focus:border-[#1a1a1a] transition-colors bg-[#fffef5] text-[#1a1a1a] placeholder-[#666] ${
            large ? "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg pr-14 md:pr-24" : "px-4 py-3 pr-12 md:pr-20"
          }`}
          role="combobox"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="search-suggestions"
          aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          style={{
            boxShadow: "3px 3px 0 #1a1a1a"
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff5c5c] hover:translate-y-[calc(-50%-1px)] hover:-translate-x-px text-white font-bold border border-[#1a1a1a] transition-colors ${
            large ? "p-2.5 md:px-6 md:py-2" : "p-2 md:px-4 md:py-1.5 text-sm"
          }`}
          style={{
            boxShadow: "2px 2px 0 #1a1a1a"
          }}
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
            className="absolute z-50 w-full mt-1 bg-[#fffef5] border-2 border-[#1a1a1a] max-h-80 overflow-y-auto"
            style={{
              boxShadow: "3px 3px 0 #1a1a1a"
            }}
          >
            {suggestions.map((prof, index) => (
              <li
                key={prof.id}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={`border-b border-[#1a1a1a] ${index === selectedIndex ? "bg-[#ffd93d]" : ""}`}
              >
                <Link
                  href={`/professors/${prof.id}`}
                  onClick={() => setShowSuggestions(false)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#ffd93d] transition-colors`}
                >
                  <div
                    className="shrink-0 w-8 h-8 text-white font-bold border border-[#1a1a1a] flex items-center justify-center"
                    style={{
                      backgroundColor: ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"][prof.name.charCodeAt(0) % 4],
                      color: "#1a1a1a"
                    }}
                  >
                    {prof.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#1a1a1a] truncate">{prof.name}</p>
                    <p className="text-xs text-[#666] truncate">{prof.department}</p>
                  </div>
                  <div className="shrink-0 text-xs text-[#666] font-bold">
                    {prof.publications.length}
                  </div>
                </Link>
              </li>
            ))}
            <li className="border-t-2 border-[#1a1a1a]">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm text-[#1a1a1a] font-bold hover:bg-[#ffd93d] text-left transition-colors"
              >
                View all for &quot;{query}&quot;
              </button>
            </li>
          </ul>
        )}
      </div>
    </form>
  );
}
