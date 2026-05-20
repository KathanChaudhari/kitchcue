type InventoryItemCardProps = {
  name: string;
  category: string;
  amount: string;
  level: number;
};

export function InventoryItemCard({ name, category, amount, level }: InventoryItemCardProps) {
  const isLow = level < 35;

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold">{name}</h2>
          <p className="mt-1 text-sm text-[#7a6b58]">{category} · {amount}</p>
        </div>
        <button className="rounded-full bg-[#f7efe4] px-3 py-1 text-xs font-bold text-[#6b5c49]" type="button">
          Empty
        </button>
      </div>
      <div className="mt-4 h-3 rounded-full bg-[#f0eadf]">
        <div
          className={`h-3 rounded-full ${isLow ? "bg-[#bc6c25]" : "bg-[#606c38]"}`}
          style={{ width: `${level}%` }}
        />
      </div>
    </article>
  );
}
