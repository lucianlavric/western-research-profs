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
          className={`inline-block bg-[#eff6ff] text-[#3b82f6] font-medium rounded-full transition-colors ${
            small ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`inline-block bg-[#f1f5f9] text-[#64748b] rounded-full ${
            small ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
          }`}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
