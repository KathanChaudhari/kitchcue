export function GreetingCard() {
  return (
    <section className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-sm md:grid-cols-[1.3fr_0.7fr]">
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
          Today in your kitchen
        </p>

        <h2 className="mt-3 text-3xl font-bold text-[var(--primary)] sm:text-4xl">
          Good morning, chef
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)] sm:text-base">
          Your kitchen is looking organized. You have 3 items running
          low and a planned dinner for tonight.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 ">
          <button className="rounded-full cursor-grab bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:opacity-90">
            Start Cooking
          </button>

          <button className="rounded-full cursor-pointer border border-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)]/10">
            View Meal Plan
          </button>
        </div>
      </div>

      <div className="p-6 pt-0 md:p-8 md:pl-0">
        <div
          className="h-full min-h-52 rounded-2xl bg-cover bg-center"
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