import { SectionCard } from "@/components/global/SectionCard";
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
    <SectionCard>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">

          <h2 className="text-xl font-bold text-[var(--primary)]">
            Shpping List
          </h2>
        </div>

        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
          5 Items
        </span>
      </div>

      <div className="space-y-3">
        {shoppingItems.map((item) => (
          <label
          key={item}
          className="flex items-center gap-3 text-sm font-semibold"
        >
          <div className="relative">
            <input
              type="checkbox"
              className="
                peer
                h-5 w-5
                appearance-none
                rounded-md
                border border-[var(--border)]
                bg-transparent
                checked:border-[var(--primary)]
                checked:bg-[var(--primary)]
              "
            />
        
            <svg
              className="
                pointer-events-none
                absolute left-1 top-1 hidden h-3 w-3
                text-[var(--ink)]
                peer-checked:block
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        
          <span>{item}</span>
        </label>
        ))}
      </div>

      <button className="mt-24 w-full rounded-xl border border-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)]/10">
        Go to blinkit
      </button>
    </SectionCard>
  );
}