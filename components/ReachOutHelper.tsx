"use client";

import { useState } from "react";

interface ReachOutHelperProps {
  summary: string;
  talkingPoints?: string[];
  professorName: string;
}

export default function ReachOutHelper({
  summary,
  talkingPoints,
  professorName,
}: ReachOutHelperProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-4 md:p-6 mb-4 md:mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Help Me Reach Out
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              AI-powered tips for connecting with {professorName.split(" ")[0]}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Research Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Research Focus
            </h3>
            <p className="text-sm md:text-base text-gray-600 bg-white rounded-lg p-3 border border-purple-100">
              {summary}
            </p>
          </div>

          {/* Talking Points */}
          {talkingPoints && talkingPoints.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Suggested Talking Points
              </h3>
              <ul className="space-y-2">
                {talkingPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm md:text-base text-gray-600 bg-white rounded-lg p-3 border border-purple-100 group"
                  >
                    <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="flex-1">{point}</span>
                    <button
                      onClick={() => handleCopy(point, index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-purple-100 rounded text-gray-400 hover:text-purple-600"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 italic">
            Generated by AI based on publication titles. Always personalize your outreach.
          </p>
        </div>
      )}
    </div>
  );
}
