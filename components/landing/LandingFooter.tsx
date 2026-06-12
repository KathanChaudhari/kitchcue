import Link from "next/link";

const footerLinks = [
  {
    label: "Features",
    href: "#features"
  },
  {
    label: "Roadmap",
    href: "#roadmap"
  },
  {
    label: "Join the Waitlist",
    href: "#waitlist"
  }
];

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_94%,black)] px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-7 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <Link
              href="/"
              className="text-sm font-black tracking-tight text-[var(--foreground)]"
            >
              KitchCue
            </Link>

            <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-[var(--muted)] lg:mx-0">
  Decide what to cook, track your kitchen, and plan everyday meals with your
  AI assistant.
</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium lg:justify-end"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--muted)] transition hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-[11px] text-[var(--muted)] lg:text-left">
          <p>© 2026 KitchCue. Built for everyday kitchens.</p>
        </div>
      </div>
    </footer>
  );
}