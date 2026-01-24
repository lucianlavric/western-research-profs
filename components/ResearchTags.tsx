interface ResearchTagsProps {
  tags: string[];
  limit?: number;
  small?: boolean;
}

const colors = ["#ffd93d", "#6bcb77", "#ff9f43", "#ff5c5c"];

export default function ResearchTags({ tags, limit, small = false }: ResearchTagsProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remaining = limit && tags.length > limit ? tags.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-1">
      {displayTags.map((tag, i) => (
        <span
          key={tag}
          style={{ backgroundColor: colors[i % colors.length] }}
          className={`inline-block border-2 border-[#1a1a1a] font-semibold text-[#1a1a1a] ${
            small ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-xs"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className={`inline-block bg-white border-2 border-[#1a1a1a] font-semibold text-[#1a1a1a] ${
          small ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-xs"
        }`}>
          +{remaining}
        </span>
      )}
    </div>
  );
}
