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
          className={`inline-block bg-purple-50 text-purple-700 rounded-full font-medium ${
            small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
          }`}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={`inline-block bg-gray-100 text-gray-500 rounded-full ${
            small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
          }`}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
