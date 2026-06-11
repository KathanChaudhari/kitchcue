import Link from "next/link";

export function LandingCtaSection() {
  return (
    <section
      id="about"
      className="px-4 py-16 text-center lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--primary)] lg:text-xs">
          Start Cooking Smarter
        </p>

        <h2 className="mx-auto mt-2 max-w-sm text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--foreground)] lg:max-w-none lg:text-5xl">
          Ready to simplify your kitchen?
        </h2>

        <p className="mx-auto mt-5 max-w-sm text-xs leading-5 text-[var(--muted)] lg:max-w-2xl lg:text-base lg:leading-7">
          Track your pantry, discover meal ideas, and make everyday cooking
          easier with KitchCue.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-xl bg-[var(--primary)] px-8 text-xs font-bold text-[var(--ink)] shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_25%,transparent)] transition hover:opacity-90 sm:w-auto lg:text-sm"
          >
            Get Started for Free
          </Link>

          <Link
            href="/login"
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 text-xs font-bold text-[var(--foreground)] transition hover:border-[color-mix(in_srgb,var(--primary)_40%,var(--border))] hover:bg-[var(--card-soft)] sm:w-auto lg:text-sm"
          >
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}