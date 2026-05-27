import Link from "next/link";
import { Menu } from "lucide-react";
import { LandingHero } from "./LandingHero";
import { LandingSections } from "./LandingSections";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:h-16 lg:px-6">
          <Link
            href="/"
            className="text-xs font-extrabold tracking-tight text-[var(--foreground)] lg:text-sm"
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

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/login"
              className="text-xs font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
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

          <button className="flex size-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--primary)] sm:hidden">
            <Menu size={16} />
          </button>
        </nav>
      </header>

      <LandingHero />
      <LandingSections />
      <LandingFooter />
    </main>
  );
}