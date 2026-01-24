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
          className={`inline-block border border-[#333] text-[#888] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`inline-block border border-[#222] text-[#666] ${
            small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
          }`}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}
