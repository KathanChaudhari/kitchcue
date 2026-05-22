import { SectionCard } from "@/components/global/SectionCard";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

const items = [
  {
    name: " Milk",
    detail: "half packet left",
    level: 5
  },
  {
    name: "veggies",
    detail: "2 remaining",
    level: 12
  },
  {
    name: "Olive Oil",
    detail: "20% left",
    level: 20
  }
];

export function LowStockCard() {
  return (
    <SectionCard>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--secondary)]">
            Low stock alert
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[var(--primary)]">
            Restock soon
          </h2>
        </div>

        <Link
          className="text-sm font-bold text-[var(--secondary)] transition hover:opacity-80"
          href="/stock"
        >
          View pantry →
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4"
          >
            <div className="flex items-center gap-4">
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate text-sm font-bold">
                    {item.name}
                  </h3>

                  <span className="text-xs font-semibold text-[var(--secondary)]">
                    {item.detail}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{
                      width: `${item.level}%`
                    }}
                  />
                </div>
              </div>

              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--primary)]">
                <ShoppingBasket className="h-4 w-4 text-[var(--muted)]" /> 
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}