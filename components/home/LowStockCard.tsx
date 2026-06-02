import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { HomeLowStockItem } from "@/app/types/home";

type LowStockCardProps = {
  items: HomeLowStockItem[];
};

function getItemDetail(item: HomeLowStockItem) {
  if (item.quantity === null || item.quantity === undefined) {
    return "Quantity not set";
  }

  return `${item.quantity} ${item.unit || ""} left`.trim();
}

export function LowStockCard({ items }: LowStockCardProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm lg:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Kitchen Watch
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--foreground)] lg:text-lg">
            Stock Alerts
          </h2>
        </div>

        <Link
          className="text-sm font-bold text-[var(--primary)] transition hover:opacity-80 lg:text-xs"
          href="/stock"
        >
          View Pantry
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 text-sm font-medium text-[var(--muted)]">
          No stock alerts right now. Your pantry looks good.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {items.map((item) => {
            const level = item.stockLevel ?? 0;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 transition hover:border-[var(--primary)]/60"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[var(--muted)]">
                        {level <= 10 ? "Low Stock" : "Running Low"}
                      </p>

                      <span className="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)]">
                        {level}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-base font-bold text-[var(--foreground)] lg:text-sm">
                        {item.name}
                      </h3>

                      <span className="hidden text-xs font-semibold text-[var(--secondary)] lg:block">
                        {getItemDetail(item)}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-[var(--muted)] lg:hidden">
                      {getItemDetail(item)}
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                      <div
                        className="h-full rounded-full bg-[var(--primary)]"
                        style={{ width: `${Math.max(level, 8)}%` }}
                      />
                    </div>
                  </div>

                  <button className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--primary)] lg:flex">
                    <ShoppingBasket className="h-4 w-4 text-[var(--muted)]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}