import { SectionCard } from "@/components/global/SectionCard";
import Link from "next/link";

export function LowStockCard() {
  return (
    <SectionCard>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--secondary)]">
            Low stock alert
          </p>
          <h2 className="mt-1 text-xl font-bold">Restock soon</h2>
        </div>
        <Link className="text-sm font-bold text-[var(--primary)]" href="/stock">
          View pantry
        </Link>
      </div>

      <div className="space-y-2">
        {[
          { name: "Milk", detail: "1 cup left" },
          { name: "Eggs", detail: "2 remaining" },
          { name: "Cumin", detail: "Low jar" }
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-[var(--card-soft)] px-3 py-3"
          >
            <span className="text-sm font-bold">{item.name}</span>
            <span className="text-xs font-semibold text-[var(--muted)]">{item.detail}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
