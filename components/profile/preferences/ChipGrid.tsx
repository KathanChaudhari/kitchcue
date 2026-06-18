
type ChipGridProps = {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
  isEditing: boolean;
  singleSelect?: boolean;
};

export function ChipGrid({
  options,
  selected,
  onChange,
  isEditing,
  singleSelect = false
}: ChipGridProps) {
  const visibleOptions = isEditing ? options : selected;

  function toggleOption(option: string) {
    if (!isEditing) return;

    if (singleSelect) {
      onChange(selected.includes(option) ? [] : [option]);
      return;
    }

    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }

    onChange([...selected, option]);
  }

  if (!isEditing && selected.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] px-2.5 py-2 text-[11px] font-medium text-[var(--muted)]">
        Not set
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleOptions.map((option) => {
        const isActive = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            disabled={!isEditing}
            onClick={() => toggleOption(option)}
            className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
              isActive
                ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
            } ${
              isEditing
                ? "hover:border-[var(--primary)] hover:text-[var(--foreground)] active:scale-95"
                : "cursor-default"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}