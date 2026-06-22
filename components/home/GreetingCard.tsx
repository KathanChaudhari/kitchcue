import Link from "next/link";

type GreetingCardProps = {
  name?: string | null;
  totalItems?: number;
  lowStockCount?: number;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function GreetingCard({
  name,
  totalItems = 0,
  lowStockCount = 0
}: GreetingCardProps) {
  const displayName = name || "Chef";

  return (
    <section className="lg:grid lg:overflow-hidden lg:rounded-3xl lg:border lg:border-[var(--border)] lg:bg-[var(--card)] lg:shadow-sm lg:md:grid-cols-[1.3fr_0.7fr]">
      <div className="flex flex-col justify-center lg:p-6">
        <p className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--secondary)] lg:block">
          Today in your kitchen
        </p>

        <h2 className="text-2xl font-bold text-[var(--foreground)] lg:mt-2 lg:text-3xl">
          {getGreeting()}, {displayName}!
        </h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-[var(--foreground-soft)] lg:mt-2 lg:text-sm lg:leading-6">
          Your kitchen has {totalItems} pantry items
          {lowStockCount > 0
            ? ` and ${lowStockCount} item${lowStockCount === 1 ? "" : "s"} need attention.`
            : " and everything looks stocked."}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-5 lg:flex-row lg:gap-2.5">
          <Link
            href="/assistant"
            className="block rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 text-left text-base font-bold text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)] lg:rounded-full lg:bg-[var(--primary)] lg:px-5 lg:py-2 lg:text-xs lg:text-[var(--ink)]"
          >
            + New Recipe
          </Link>
        </div>
      </div>

      <div className="hidden p-6 pl-0 lg:block">
        <div
          className="h-full min-h-40 rounded-2xl bg-cover bg-center"
          aria-label="Warm kitchen counter with fresh ingredients"
          role="img"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80')"
          }}
        />
      </div>
    </section>
  );
}
