type InventoryItemCardProps = {
  name: string;
  category: string;
  amount: string;
  level: number;
};

export function InventoryItemCard({
  name,
  category,
  amount,
  level
}: InventoryItemCardProps) {
  const isLow = level < 35;

  return (
    <div className="border-b border-[#efe7da] py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-[#20201d]">
              {name}
            </h2>

            {isLow ? (
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#bc6c25]">
                Low
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-xs text-[#7a6b58]">
            {category} · {amount}
          </p>
        </div>

        <button
          className="shrink-0 text-xs font-medium text-[#6b5c49] transition hover:text-[#20201d]"
          type="button"
        >
          Empty
        </button>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full ${
            isLow ? "bg-[#bc6c25]" : "bg-[#606c38]"
          }`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}