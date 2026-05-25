import { ChevronRight, UserRound } from "lucide-react";
import Link from "next/link";

const profileItems = [
  { label: "Age", value: "25" },
  { label: "Gender", value: "Male" },
  { label: "Lives in", value: "Ahmedabad, India" },
  { label: "From", value: "Gujarat, India" },
  { label: "Cooking for", value: "2 people" },
  { label: "Cooking skill", value: "Intermediate" }
];

export function GeneralProfileSection() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-[var(--primary-soft)]" />
          <h3 className="text-sm font-bold text-[var(--primary-soft)]">
            General Profile
          </h3>
        </div>

        <Link
          href="/profile/general"
          className="flex items-center gap-1 text-xs font-semibold text-[var(--secondary)] transition hover:opacity-80"
        >
          Full profile
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {profileItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <p className="text-[11px] font-medium text-[var(--muted)]">
              {item.label}
            </p>
            <p className="mt-1 text-[13px] font-bold text-[var(--foreground)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* <div className="mt-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_25%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_8%,var(--card))] p-3">
        <p className="text-[11px] font-medium text-[var(--muted)]">
          Profile completeness
        </p>

        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <div className="h-full w-[70%] rounded-full bg-[var(--primary)]" />
          </div>

          <span className="text-[11px] font-bold text-[var(--primary-soft)]">
            70%
          </span>
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">
          Add height, weight, and health context from the full profile page.
        </p>
      </div> */}
    </section>
  );
}