interface ResearchTagsProps {
  tags: string[];
  limit?: number;
  small?: boolean;
}

export default function ResearchTags({
  tags,
  limit,
  small = false,
}: ResearchTagsProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remaining = limit && tags.length > limit ? tags.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayTags.map((tag) => (
        <span
          key={tag}
          className={`inline-block bg-[#e8d5b7] text-[#4a3728] font-bold uppercase tracking-wide border border-[#d4c4a8] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`inline-block bg-[#d4c4a8] text-[#4a3728] border border-[#c4b4a0] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
