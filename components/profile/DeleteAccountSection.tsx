
import { Trash2 } from "lucide-react";

export function DeleteAccountSection() {
  return (
    <section className="flex justify-end border-t border-[var(--border)] pt-5">
      <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--secondary)_65%,var(--border))] px-4 text-sm font-bold text-[var(--secondary)] transition hover:bg-[color-mix(in_srgb,var(--secondary)_12%,var(--card))]">
        <Trash2 size={16} />
        Delete account
      </button>
    </section>
  );
}