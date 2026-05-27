type InventoryItemCardProps = {
  name: string;
  amount: string;
  level: number;
};

export function InventoryItemCard({
  name,
  amount,
  level
}: InventoryItemCardProps) {
  const isLow = level < 35;

  return (
    <article className="w-full rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-4 py-3 transition hover:border-[var(--primary)] sm:w-fit sm:min-w-[180px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-extrabold text-[var(--foreground)] sm:whitespace-nowrap">
            {name}
          </h3>

          <p className="mt-1 truncate text-xs font-medium text-[var(--muted)] sm:whitespace-nowrap">
            {amount}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
            isLow
              ? "bg-[color-mix(in_srgb,var(--secondary)_35%,transparent)] text-[var(--secondary)]"
              : "bg-[color-mix(in_srgb,var(--primary)_35%,transparent)] text-[var(--primary)]"
          }`}
        >
          {isLow ? "Low" : "Good"}
        </span>
      </div>
    </article>
  );
}