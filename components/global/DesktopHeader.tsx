import Link from "next/link";
import { Bell, Clock3, Search } from "lucide-react";

type DesktopHeaderProps = {
  title: string;
  searchPlaceholder: string;
};

export function DesktopHeader({
  title,
  searchPlaceholder
}: DesktopHeaderProps) {
  return (
    <header className="hidden items-center gap-4 py-5 lg:flex">
      <label className="relative max-w-4xl flex-1">
        <span className="sr-only">{searchPlaceholder}</span>

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        />

        <input
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] pl-11 pr-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
          placeholder={searchPlaceholder}
          type="search"
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition hover:border-[var(--primary)]"
          type="button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition hover:border-[var(--primary)]"
          type="button"
          aria-label="History"
          title="History"
        >
          <Clock3 size={18} />
        </button>

        <Link
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--ink)]"
          href="/profile"
          aria-label="Profile"
          title="Profile"
        >
          KC
        </Link>
      </div>
    </header>
  );
}