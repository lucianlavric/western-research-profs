"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Professor } from "@/lib/types";
import { getDepartmentIcon } from "@/lib/department-icons";
import ResearchTags from "./ResearchTags";

interface ProfessorPreviewProps {
  professor: Professor;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfessorPreview({
  professor,
  isOpen,
  onClose,
}: ProfessorPreviewProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalCitations = professor.publications.reduce(
    (acc, pub) => acc + (pub.citationCount || 0),
    0
  );

  const color = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"][professor.name.charCodeAt(0) % 4];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1a1a1a]/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-[#fffef5] border-t-4 border-l-4 border-[#1a1a1a] max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        style={{
          boxShadow: '6px -6px 0 #1a1a1a'
        }}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-[#fffef5] pt-3 pb-2 px-4 border-b-2 border-[#1a1a1a]">
          <div className="w-8 h-1 bg-[#1a1a1a] mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <h2 id="preview-title" className="font-bold text-[#1a1a1a]">
              Profile
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-[#1a1a1a] font-bold hover:bg-[#ffd93d]"
              aria-label="Close preview"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Profile header */}
          <div className="flex items-start gap-3">
            <div
              className="w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center shrink-0"
              style={{ backgroundColor: color }}
            >
              <span className="text-[#1a1a1a] font-bold text-lg">
                {professor.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#1a1a1a]">{professor.name}</h3>
              <p className="text-xs text-[#666] flex items-center gap-1">
                <span className="text-sm">{getDepartmentIcon(professor.department)}</span>
                {professor.department}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border-2 border-[#1a1a1a] bg-[#fffef5] p-3 text-center">
              <div className="text-lg font-bold text-[#1a1a1a] tabular-nums">
                {professor.publications.length}
              </div>
              <div className="text-xs text-[#666] font-bold">Publications</div>
            </div>
            <div className="border-2 border-[#1a1a1a] bg-[#fffef5] p-3 text-center">
              <div className="text-lg font-bold text-[#1a1a1a] tabular-nums">
                {totalCitations}
              </div>
              <div className="text-xs text-[#666] font-bold">Citations</div>
            </div>
            <div className="border-2 border-[#1a1a1a] bg-[#fffef5] p-3 text-center">
              <div className="text-lg font-bold text-[#1a1a1a] tabular-nums">
                {professor.researchAreas.length}
              </div>
              <div className="text-xs text-[#666] font-bold">Areas</div>
            </div>
          </div>

          {/* Research areas */}
          {professor.researchAreas.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Research Areas</h4>
              <ResearchTags tags={professor.researchAreas} limit={5} small />
            </div>
          )}

          {/* Research Summary (condensed) */}
          {professor.researchSummary && (
            <div className="border-2 border-[#1a1a1a] bg-[#fffef5] p-3">
              <h4 className="text-xs font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">
                Research Focus
              </h4>
              <p className="text-xs text-[#666] line-clamp-3">{professor.researchSummary}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {professor.email && (
              <a
                href={`mailto:${professor.email}`}
                className="flex-1 px-3 py-2 bg-[#ff5c5c] text-white font-bold text-xs border-2 border-[#1a1a1a] hover:-translate-x-px hover:-translate-y-px"
                style={{
                  boxShadow: '2px 2px 0 #1a1a1a'
                }}
              >
                Email
              </a>
            )}
            <Link
              href={`/professors/${professor.id}`}
              onClick={onClose}
              className="flex-1 px-3 py-2 bg-[#ffd93d] text-[#1a1a1a] font-bold text-xs border-2 border-[#1a1a1a] hover:-translate-x-px hover:-translate-y-px"
              style={{
                boxShadow: '2px 2px 0 #1a1a1a'
              }}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
