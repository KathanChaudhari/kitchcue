import { ChevronRight, HeartPulse } from "lucide-react";
import Link from "next/link";

const summaryItems = [
  {
    title: "Health goals",
    items: ["Lose weight", "Gain muscle", "Eat healthy"],
    active: true
  },
  {
    title: "Avoid",
    items: ["Peanuts", "Shellfish", "Diabetes"]
  },
  {
    title: "Likes",
    items: ["Garlic", "Paneer", "Rice"],
    active: true
  },
  {
    title: "Diet",
    items: ["Vegetarian", "High protein"]
  }
];

function Chip({
  children,
  active = false
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <span
      className={`max-w-full truncate rounded-lg px-2 py-1 text-[10px] font-semibold sm:px-2.5 sm:text-[11px] ${
        active
          ? "bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
          : "bg-[var(--card)] text-[var(--muted)]"
      }`}
    >
      {children}
    </span>
  );
}

function PreferenceGroup({
  title,
  items,
  active = false
}: {
  title: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3">
      <p className="mb-2 text-[10px] font-bold text-[var(--muted)] sm:text-[11px]">
        {title}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Chip key={item} active={active}>
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function PreferenceSummarySection() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <HeartPulse size={16} className="shrink-0 text-[var(--primary-soft)]" />
          <h3 className="truncate text-sm font-bold text-[var(--primary-soft)]">
            Preferences
          </h3>
        </div>

        <Link
          href="/profile/preferences"
          className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[var(--secondary)] transition hover:opacity-80 sm:text-xs"
        >
          Advanced
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold text-[var(--muted)] sm:text-[11px]">
              Spice level
            </p>
            <span className="shrink-0 text-[10px] font-semibold text-[var(--secondary)] sm:text-[11px]">
              Medium · 3 / 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-2 rounded-full ${
                  level <= 3
                    ? "bg-[var(--secondary)]"
                    : "bg-[var(--surface)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 xs:grid-cols-2 sm:grid-cols-2">
          {summaryItems.map((group) => (
            <PreferenceGroup
              key={group.title}
              title={group.title}
              items={group.items}
              active={group.active}
            />
          ))}
        </div>

        <div className="rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_8%,var(--card))] p-2.5 sm:p-3">
          <p className="text-[10px] font-medium text-[var(--muted)] sm:text-[11px]">
            Cooking style
          </p>
          <p className="mt-1 text-[12px] font-bold text-[var(--foreground)] sm:text-[13px]">
            Quick meals · Healthy · Indian / Japanese
          </p>
        </div>
      </div>
    </section>
  );
}