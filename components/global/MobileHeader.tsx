import Link from "next/link";

type MobileHeaderProps = {
  title: string;
  eyebrow?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function MobileHeader({
  title,
  eyebrow,
  actionHref,
  actionLabel = "+"
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4 pt-5">
      <div>
        {eyebrow ? <p className="text-sm font-medium text-[var(--muted)]">{eyebrow}</p> : null}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {actionHref ? (
        <Link
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--primary)] text-lg font-bold text-[var(--ink)] shadow-sm"
          href={actionHref}
          aria-label={actionLabel}
        >
          {actionLabel}
        </Link>
      ) : null}
    </header>
  );
}
