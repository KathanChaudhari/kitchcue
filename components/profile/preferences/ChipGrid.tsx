// src/components/profile/preferences/ChipGrid.tsx

"use client";

import { Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type ChipGridProps = {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
  isEditing: boolean;
  singleSelect?: boolean;
  placeholder?: string;
};

export function ChipGrid({
  options,
  selected,
  onChange,
  isEditing,
  singleSelect = false,
  placeholder = "Search or add your preference"
}: ChipGridProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredOptions = useMemo(() => {
    if (!isEditing) return [];

    return options
      .filter((option) => !selected.includes(option))
      .filter((option) =>
        option.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 8);
  }, [isEditing, normalizedQuery, options, selected]);

  function addItem(item: string) {
    const value = item.trim();

    if (!isEditing || !value) return;

    const alreadyExists = selected.some(
      (selectedItem) => selectedItem.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setQuery("");
      return;
    }

    if (singleSelect) {
      onChange([value]);
    } else {
      onChange([...selected, value]);
    }

    setQuery("");
  }

  function removeItem(item: string) {
    if (!isEditing) return;

    onChange(selected.filter((selectedItem) => selectedItem !== item));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (filteredOptions.length > 0 && normalizedQuery) {
      addItem(filteredOptions[0]);
      return;
    }

    addItem(query);
  }

  if (!isEditing && selected.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] px-2.5 py-2 text-[11px] font-medium text-[var(--muted)]">
        Not set
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_18%,var(--card))] px-2.5 py-1 text-[10px] font-semibold text-[var(--primary-soft)]"
            >
              {item}

              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="rounded-full text-[var(--primary-soft)] opacity-70 transition hover:opacity-100"
                  aria-label={`Remove ${item}`}
                >
                  <X size={11} />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {isEditing && (
        <>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-2.5 py-2 focus-within:border-[var(--primary)]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_58%,transparent)]"
            />

            <button
              type="button"
              onClick={() => addItem(query)}
              disabled={!query.trim()}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Add preference"
            >
              <Plus size={14} />
            </button>
          </div>

          {filteredOptions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => addItem(option)}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}