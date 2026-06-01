// src/components/profile/preferences/CustomChipInput.tsx

import { KeyboardEvent, useState } from "react";
import { Search } from "lucide-react";

type CustomChipInputProps = {
  placeholder: string;
  isEditing: boolean;
  selected: string[];
  onChange: (items: string[]) => void;
};

export function CustomChipInput({
  placeholder,
  isEditing,
  selected,
  onChange
}: CustomChipInputProps) {
  const [value, setValue] = useState("");

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    if (!selected.includes(trimmedValue)) {
      onChange([...selected, trimmedValue]);
    }

    setValue("");
  }

  return (
    <div
      className={`mt-2.5 flex h-9 items-center gap-2 rounded-lg border px-2.5 transition ${
        isEditing
          ? "border-[var(--border)] bg-[var(--card)] focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_16%,transparent)]"
          : "border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))]"
      }`}
    >
      <Search
        size={14}
        className={
          isEditing ? "text-[var(--muted)]" : "text-[var(--muted)] opacity-45"
        }
      />

      <input
        value={value}
        disabled={!isEditing}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className={`h-full w-full bg-transparent text-xs font-semibold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] ${
          isEditing ? "" : "cursor-default opacity-70"
        }`}
      />
    </div>
  );
}