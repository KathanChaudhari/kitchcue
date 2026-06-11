import Link from "next/link";
import { Menu } from "lucide-react";

export function LandingHeader() {
  return (
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
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Features
          </Link>

          <Link
            href="#roadmap"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Roadmap
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

        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex size-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--primary)] sm:hidden"
        >
          <Menu size={16} />
        </button>
      </nav>
    </header>
  );
}