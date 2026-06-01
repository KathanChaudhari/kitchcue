// src/components/profile/general/styles.ts

const inputBaseClass =
  "h-10 w-full rounded-lg border px-3 text-[13px] font-semibold outline-none transition";

export function getInputClass(isEditing: boolean) {
  return `${inputBaseClass} ${
    isEditing
      ? "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_16%,transparent)]"
      : "cursor-default border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))] text-[var(--foreground)] opacity-100"
  }`;
}