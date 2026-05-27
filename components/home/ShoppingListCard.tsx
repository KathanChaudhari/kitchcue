import { ShoppingBasket } from "lucide-react";

const shoppingItems = [
  "Avocados (3)",
  "Sourdough Bread",
  "Cherry Tomatoes",
  "Fresh Basil",
  "Garlic"
];

export function ShoppingListCard() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm lg:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Shopping Queue
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--foreground)] lg:text-lg">
            Shopping List
          </h2>
        </div>

        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
          5 Items
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-soft)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)]">
              <ShoppingBasket className="h-4 w-4 text-[var(--primary)]" />
            </div>

            <h3 className="text-sm font-extrabold text-[var(--foreground)]">
              5 Items Remaining
            </h3>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {shoppingItems.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-4 px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)]"
            >
              <div className="relative shrink-0">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 appearance-none rounded-md border border-[var(--border)] bg-transparent checked:border-[var(--primary)] checked:bg-[var(--primary)]"
                />

                <svg
                  className="pointer-events-none absolute left-1 top-1 hidden h-3 w-3 text-[var(--ink)] peer-checked:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="min-w-0 flex-1 truncate">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)]/10">
        <ShoppingBasket className="h-4 w-4" />
        Go to Blinkit
      </button>
    </section>
  );
}