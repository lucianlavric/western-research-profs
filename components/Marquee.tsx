"use client";

import { useEffect, useRef, useState } from "react";

const topics = [
  "Machine Learning",
  "Neuroscience",
  "Quantum Computing",
  "Biochemistry",
  "Data Science",
  "Robotics",
  "Climate Science",
  "Genetics",
];

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="border-b-3 border-[#1a1a1a] bg-[#1a1a1a] py-2 overflow-hidden">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{
          animation: isPaused ? "none" : "marquee 30s linear infinite",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mr-8 flex-shrink-0">
            {topics.map((topic) => (
              <span key={`${i}-${topic}`} className="text-white text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ffd93d]" />
                {topic}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
