"use client";

import { Loader2, Plus, Search, X } from "lucide-react";

type ApplianceEditPopupProps = {
  draftAppliances: string[];
  query: string;
  filteredSuggestions: string[];
  error: string;
  isSaving: boolean;
  onQueryChange: (value: string) => void;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function ApplianceEditPopup({
  draftAppliances,
  query,
  filteredSuggestions,
  error,
  isSaving,
  onQueryChange,
  onAdd,
  onRemove,
  onClose,
  onSave
}: ApplianceEditPopupProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (filteredSuggestions.length > 0 && query.trim()) {
      onAdd(filteredSuggestions[0]);
      return;
    }

    onAdd(query);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-3 pb-3 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] p-4">
          <h3 className="text-base font-bold text-[var(--primary-soft)]">
            Edit appliances
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="Close appliance popup"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4 scrollbar-hide">
          <div className="space-y-2.5">
            {draftAppliances.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {draftAppliances.map((appliance) => (
                  <span
                    key={appliance}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_18%,var(--card))] px-2.5 py-1 text-[10px] font-semibold text-[var(--primary-soft)]"
                  >
                    {appliance}

                    <button
                      type="button"
                      onClick={() => onRemove(appliance)}
                      className="rounded-full text-[var(--primary-soft)] opacity-70 transition hover:opacity-100"
                      aria-label={`Remove ${appliance}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-[11px] font-medium text-[var(--muted)]">
                Not set
              </p>
            )}

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 transition focus-within:border-[var(--primary)]">
              <Search
                size={14}
                className="shrink-0 text-[var(--muted)] opacity-70"
              />

              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or add appliance"
                className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_srgb,var(--muted)_58%,transparent)]"
              />

              <button
                type="button"
                onClick={() => onAdd(query)}
                disabled={!query.trim()}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Add appliance"
              >
                <Plus size={14} />
              </button>
            </div>

            {filteredSuggestions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {filteredSuggestions.map((appliance) => (
                  <button
                    key={appliance}
                    type="button"
                    onClick={() => onAdd(appliance)}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                  >
                    {appliance}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-xl border border-[var(--secondary)]/40 bg-[var(--secondary)]/10 p-3 text-xs font-medium text-[var(--secondary)]">
              {error}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="h-10 rounded-xl border border-[var(--border)] px-4 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 text-xs font-bold text-[var(--ink)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? <Loader2 size={15} className="animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}