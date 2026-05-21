import Link from "next/link";
import { SectionCard } from "@/components/global/SectionCard";

const methods = ["Chat", "Audio", "Photo"];

export function AddItemSheet() {
  return (
    <SectionCard title="Add stock item">
      <p className="mb-4 text-sm text-[var(--muted)]">Choose how you want to add kitchen stock.</p>
      <div className="grid grid-cols-3 gap-2">
        {methods.map((method) => (
          <button key={method} className="rounded-xl bg-[var(--card-soft)] px-3 py-4 text-sm font-bold text-[var(--muted)]" type="button">
            {method}
          </button>
        ))}
      </div>
      <Link className="mt-4 block rounded-xl bg-[var(--primary)] px-4 py-3 text-center text-sm font-bold text-[var(--ink)]" href="/stock">
        Add demo item
      </Link>
    </SectionCard>
  );
}
