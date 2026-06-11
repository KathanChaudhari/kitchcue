import { Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative flex min-h-[660px] items-end overflow-hidden px-4 pb-14 pt-24 sm:min-h-[760px] sm:items-center sm:pb-0 lg:min-h-screen lg:px-6">
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-center"
        style={{
          backgroundImage: "url('/images/kitchcue-hero.png')"
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,20,20,0.42)_0%,rgba(18,20,20,0.72)_42%,rgba(18,20,20,1)_100%)] sm:bg-[linear-gradient(90deg,rgba(11,13,12,0.96)_0%,rgba(11,13,12,0.82)_35%,rgba(11,13,12,0.58)_65%,rgba(11,13,12,0.74)_100%)]" />
      <div className="absolute inset-0 hidden sm:block sm:bg-[linear-gradient(180deg,rgba(11,13,12,0.25)_0%,rgba(11,13,12,0.05)_45%,rgba(11,13,12,1)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-md space-y-5 sm:max-w-2xl sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--primary)_13%,transparent)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)] sm:text-xs sm:normal-case sm:tracking-normal">
            <Sparkles size={12} />
            AI FOR KITCHEN
          </div>

          <h1 className="max-w-[420px] text-[34px] font-black leading-[0.98] tracking-[-0.06em] text-white sm:max-w-[680px] sm:text-6xl lg:text-7xl">

  <span className="text-[var(--primary)]">WHAT TO COOK?</span> 
</h1>

<p className="max-w-[340px] text-xs leading-5 text-white/90 sm:max-w-xl sm:text-base sm:leading-6">
  What we are trying to do is simple yet most time consuming task of everyday, when you get asked what should I cook? or you ask yourselft what should I eat and spent next 30 minutes searching that, we are here to minimise that.
</p>

          <div className="grid gap-3 pt-2 sm:flex sm:flex-wrap">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-6 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 sm:w-auto sm:text-sm"
            >
              Get Started
            </Link>

            <Link
  href="#features"
  className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)] sm:w-auto sm:text-sm"
>
  Explore Features
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}