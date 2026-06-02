// src/components/profile/general/HouseholdSizeControl.tsx

import { Minus, Plus } from "lucide-react";

type HouseholdSizeControlProps = {
  isEditing: boolean;
  peopleCount: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function HouseholdSizeControl({
  isEditing,
  peopleCount,
  onDecrease,
  onIncrease
}: HouseholdSizeControlProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[13px] font-bold text-[var(--foreground)]">
          Household size
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          disabled={!isEditing}
          onClick={onDecrease}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
            isEditing
              ? "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] active:scale-95"
              : "cursor-default border-[var(--border)] text-[var(--muted)] opacity-45"
          }`}
        >
          <Minus size={15} />
        </button>

        <div className="flex h-9 min-w-14 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))] px-3 text-sm font-bold text-[var(--foreground)]">
          {peopleCount}
        </div>

        <button
          type="button"
          disabled={!isEditing}
          onClick={onIncrease}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
            isEditing
              ? "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] active:scale-95"
              : "cursor-default border-[var(--border)] text-[var(--muted)] opacity-45"
          }`}
        >
          <Plus size={15} />
        </button>

        <span className="text-xs text-[var(--muted)]">people</span>
      </div>
    </div>
  );
}