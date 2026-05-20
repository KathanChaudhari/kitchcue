type SearchBarProps = {
  placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">{placeholder}</span>
      <input
        className="h-12 w-full rounded-2xl border border-[#eadfce] bg-white px-4 text-sm outline-none focus:border-[#606c38]"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
