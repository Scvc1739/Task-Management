function StatusFilter({ currentFilter, onChange }) {
  const filters = ["all", "todo", "in-progress", "done"];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-4 py-1 rounded-full text-sm capitalize transition
            ${
              currentFilter === filter
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;
