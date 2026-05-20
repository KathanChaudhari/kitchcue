import { SectionCard } from "@/components/global/SectionCard";

export function LowStockCard() {
  return (
    <SectionCard title="Need to buy">
      <div className="grid grid-cols-2 gap-2">
        {["Milk", "Eggs", "Dish soap", "Cumin"].map((item) => (
          <div key={item} className="rounded-xl bg-[#f7efe4] px-3 py-3 text-sm font-bold text-[#6b5c49]">
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
