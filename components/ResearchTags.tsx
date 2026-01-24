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
          className={`inline-block bg-[#1a1a1a] text-[#888] border border-[#222] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`inline-block bg-[#111] text-[#555] border border-[#222] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
          }`}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
