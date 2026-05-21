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
    <div className="border-b border-[var(--border)] py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-[var(--foreground)]">
              {name}
            </h2>

            {isLow ? (
              <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--secondary)]">
                Low
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-xs text-[var(--muted)]">
            {category} · {amount}
          </p>
        </div>

        <button
          className="shrink-0 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          type="button"
        >
          Empty
        </button>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full ${
            isLow ? "bg-[var(--secondary)]" : "bg-[var(--primary)]"
          }`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
