// src/components/profile/preferences/PreferencesHeader.tsx

import Link from "next/link";
import { ArrowLeft, Pencil, Sparkles, X } from "lucide-react";

type PreferencesHeaderProps = {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

export function PreferencesHeader({
  isEditing,
  onEdit,
  onCancel
}: PreferencesHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href="/profile"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 sm:hidden"
          aria-label="Back to profile"
        >
          <ArrowLeft size={15} />
        </Link>

        <Sparkles
          size={16}
          className="hidden shrink-0 text-[var(--primary-soft)] sm:block"
        />

        <h2 className="truncate text-sm font-bold text-[var(--primary-soft)] sm:text-base">
          Preference setup
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!isEditing ? (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-2.5 text-[11px] font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95 sm:h-9 sm:px-3 sm:text-xs"
          >
            <Pencil size={13} />
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 text-[11px] font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 sm:h-9 sm:px-3 sm:text-xs"
          >
            <X size={13} />
            Cancel
          </button>
        )}

        <Link
          href="/profile"
          className="hidden h-9 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:flex"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </div>
    </div>
  );
}