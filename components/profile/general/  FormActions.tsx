// src/components/profile/general/FormActions.tsx

import { Save, X } from "lucide-react";

type FormActionsProps = {
  isSaving: boolean;
  onCancel: () => void;
};

export function FormActions({ isSaving, onCancel }: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-2.5 border-t border-[var(--border)] pt-4 sm:flex-row sm:justify-between">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3.5 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 disabled:opacity-60"
      >
        <X size={15} />
        Cancel changes
      </button>

      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95 disabled:opacity-60"
      >
        <Save size={15} />
        {isSaving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}