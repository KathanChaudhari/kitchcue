import { SectionCard } from "@/components/global/SectionCard";

const shoppingItems = ["Milk", "Fresh coriander", "Dish soap", "Curd"];

export function ShoppingListCard() {
  return (
    <SectionCard title="Shopping list">
      <div className="space-y-2">
        {shoppingItems.map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 rounded-xl bg-[var(--card-soft)] px-3 py-3 text-sm font-semibold"
          >
            <input
              className="h-4 w-4 accent-[var(--primary)]"
              type="checkbox"
            />
            {item}
          </label>
        ))}
      </div>
    </SectionCard>
  );
}
