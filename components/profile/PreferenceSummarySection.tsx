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
      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
        active
          ? "bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
          : "bg-[var(--surface)] text-[var(--muted)]"
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
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <p className="mb-2 text-[11px] font-bold text-[var(--muted)]">
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
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <HeartPulse size={16} className="text-[var(--primary-soft)]" />
          <h3 className="text-sm font-bold text-[var(--primary-soft)]">
            Preferences
          </h3>
        </div>

        <Link
          href="/profile/preferences"
          className="flex items-center gap-1 text-xs font-semibold text-[var(--secondary)] transition hover:opacity-80"
        >
          Advanced
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-bold text-[var(--muted)]">
              Spice level
            </p>
            <span className="text-[11px] font-semibold text-[var(--secondary)]">
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

        <div className="grid gap-2.5 sm:grid-cols-2">
          {summaryItems.map((group) => (
            <PreferenceGroup
              key={group.title}
              title={group.title}
              items={group.items}
              active={group.active}
            />
          ))}
        </div>

        <div className="rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_8%,var(--card))] p-3">
          <p className="text-[11px] font-medium text-[var(--muted)]">
            Cooking style
          </p>
          <p className="mt-1 text-[13px] font-bold text-[var(--foreground)]">
            Quick meals · Healthy · Indian / Japanese
          </p>
        </div>
      </div>
    </section>
  );
}