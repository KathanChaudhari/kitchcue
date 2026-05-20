import { InventoryItemCard } from "@/components/stock/InventoryItemCard";

const items = [
  { name: "Milk", category: "Food", amount: "250 ml left", level: 18 },
  { name: "Rice", category: "Food", amount: "2 kg", level: 80 },
  { name: "Turmeric", category: "Masala", amount: "Small jar", level: 28 },
  { name: "Spoons", category: "Cutlery", amount: "12 pcs", level: 100 },
  { name: "Dish soap", category: "Cleaning", amount: "Half bottle", level: 46 }
];

export function InventoryList() {
  return (
    <section className="space-y-3">
      {items.map((item) => (
        <InventoryItemCard key={item.name} {...item} />
      ))}
    </section>
  );
}
