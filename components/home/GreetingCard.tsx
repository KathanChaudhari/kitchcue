export function GreetingCard() {
  return (
    <section className="grid overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm md:grid-cols-[1.3fr_0.7fr]">
      <div className="flex flex-col justify-center p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--secondary)]">
          Today in your kitchen
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[var(--primary)] sm:text-3xl">
          Good morning, chef
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--foreground)]">
          Your kitchen is looking organized. You have 3 items running low and a planned dinner for tonight.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button className="cursor-pointer rounded-full bg-[var(--primary)] px-5 py-2 text-xs font-semibold text-[var(--ink)] transition hover:opacity-90">
            Start Cooking
          </button>

          <button className="cursor-pointer rounded-full border border-[var(--primary)] px-5 py-2 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)]/10">
            View Meal Plan
          </button>
        </div>
      </div>

      <div className="p-5 pt-0 md:p-6 md:pl-0">
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