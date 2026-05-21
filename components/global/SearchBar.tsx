type SearchBarProps = {
  placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">{placeholder}</span>
      <input
        className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
