import { Pencil } from "lucide-react";

export function ProfileHeroCard() {
  return (
    <section className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(135deg,var(--card),color-mix(in_srgb,var(--primary)_10%,var(--card)))] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-xl font-bold text-[var(--primary-soft)]">
            J
          </div>

          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">
              Jane Doe
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              28 · Ahmedabad, India
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_28%,var(--card))] px-3 py-1 text-xs font-semibold text-[var(--primary-soft)]">
                Intermediate cook
              </span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--secondary)_30%,var(--card))] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                Cooks for 2
              </span>
            </div>
          </div>
        </div>

        <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]">
          <Pencil size={15} />
          <span className="hidden sm:inline">Edit</span>
        </button>
      </div>
    </section>
  );
}