import { PlayCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden pt-16 lg:min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/kitchcue-hero.png')"
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,12,0.96)_0%,rgba(11,13,12,0.82)_35%,rgba(11,13,12,0.58)_65%,rgba(11,13,12,0.74)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,13,12,0.25)_0%,rgba(11,13,12,0.05)_45%,rgba(11,13,12,1)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--primary)_13%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--primary)]">
            <Sparkles size={13} />
            Next-Gen Culinary Intelligence
          </div>

          <h1 className="max-w-[680px] text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Master Your Kitchen with{" "}
            <span className="text-[var(--primary)]">Intelligence.</span>
          </h1>

          <p className="max-w-xl text-sm leading-6 text-[var(--foreground)]/90 sm:text-base">
            Precision inventory tracking, AI-powered meal planning, and
            culinary expertise at your fingertips. Transform how you cook, shop,
            and eat.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/signup"
              className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:opacity-90"
            >
              Get Started Free
            </Link>

            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--outline)] px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:bg-white/5">
              <PlayCircle size={17} />
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}