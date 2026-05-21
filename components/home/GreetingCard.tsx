export function GreetingCard() {
  return (
    <section className="grid overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-sm md:grid-cols-[1.3fr_0.7fr]">
      <div className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
          Today in your kitchen
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Good morning chef</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          Kitchen is on, low on milk and dinner is planned for tonight.
        </p>
      </div>

      <div
        className="min-h-48 bg-cover bg-center md:min-h-full"
        aria-label="Warm kitchen counter with fresh ingredients"
        role="img"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80')"
        }}
      />
    </section>
  );
}
