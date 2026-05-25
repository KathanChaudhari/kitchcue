import Link from "next/link";
import { LandingHero } from "./LandingHero";
import { LandingSections } from "./LandingSections";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
          <Link
            href="/"
            className="text-sm font-extrabold tracking-tight text-[var(--foreground)]"
          >
            KitchCue
          </Link>

          <div className="hidden items-center gap-8 text-xs font-medium md:flex">
            <Link
              href="#features"
              className="border-b-2 border-[var(--primary)] pb-1 text-[var(--foreground)]"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-xs font-medium text-[var(--foreground)] transition hover:text-[var(--primary)] sm:block"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-[var(--ink)] transition hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <LandingHero />
      <LandingSections />
      <LandingFooter />
    </main>
  );
}