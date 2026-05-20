type FilterChipsProps = {
  options: string[];
  active: string;
};

export function FilterChips({ options, active }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => (
        <button
          key={option}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
            option === active ? "bg-[#20201d] text-white" : "bg-white text-[#7a6b58]"
          }`}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
