// src/components/profile/general/GeneralProfileHeader.tsx

import Link from "next/link";
import { ArrowLeft, Pencil, UserRound, X } from "lucide-react";

type GeneralProfileHeaderProps = {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

export function GeneralProfileHeader({
  isEditing,
  onEdit,
  onCancel
}: GeneralProfileHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
      <div className="flex min-w-0 items-start gap-2">
        <Link
          href="/profile"
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 sm:hidden"
          aria-label="Back to profile"
        >
          <ArrowLeft size={15} />
        </Link>

        <UserRound
          size={16}
          className="mt-1 hidden shrink-0 text-[var(--primary-soft)] sm:block"
        />

        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[var(--primary-soft)]">
            Personal details
          </h2>

          <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted)]">
            Used to personalize recipes and meal suggestions.
          </p>
        </div>
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