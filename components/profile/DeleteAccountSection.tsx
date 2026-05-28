import { Trash2 } from "lucide-react";

export function DeleteAccountSection() {
  return (
    <section className="border-t border-[var(--border)] pt-4 sm:pt-5">
      <div className="rounded-2xl border border-[color-mix(in_srgb,var(--secondary)_35%,var(--border))] bg-[color-mix(in_srgb,var(--secondary)_6%,var(--card))] p-3.5 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-4">
        <div>
          <p className="text-[13px] font-bold text-[var(--foreground)]">
            Delete account
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
            Permanently remove your profile, preferences, inventory, and saved kitchen data.
          </p>
        </div>

        <button className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[color-mix(in_srgb,var(--secondary)_65%,var(--border))] px-3.5 text-xs font-bold text-[var(--secondary)] transition hover:bg-[color-mix(in_srgb,var(--secondary)_12%,var(--card))] active:scale-95 sm:mt-0 sm:w-auto">
          <Trash2 size={15} />
          Delete account
        </button>
      </div>
    </section>
  );
}