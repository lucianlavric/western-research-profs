"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Professor } from "@/lib/types";
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        {/* Handle */}
        <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <h2 id="preview-title" className="font-semibold text-gray-900">
              Quick Preview
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Profile header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold text-2xl">
                {professor.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900">{professor.name}</h3>
              <p className="text-sm text-gray-600">{professor.title}</p>
              <p className="text-sm text-purple-600 font-medium">{professor.department}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600 tabular-nums">
                {professor.publications.length}
              </div>
              <div className="text-xs text-gray-500">Publications</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600 tabular-nums">
                {totalCitations}
              </div>
              <div className="text-xs text-gray-500">Citations</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600 tabular-nums">
                {professor.researchAreas.length}
              </div>
              <div className="text-xs text-gray-500">Areas</div>
            </div>
          </div>

          {/* Research areas */}
          {professor.researchAreas.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Research Areas</h4>
              <ResearchTags tags={professor.researchAreas} limit={5} small />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {professor.email && (
              <a
                href={`mailto:${professor.email}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            )}
            <Link
              href={`/professors/${professor.id}`}
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Full Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
