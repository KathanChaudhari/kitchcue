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
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <UserRound size={16} className="shrink-0 text-[var(--primary-soft)]" />
          <h3 className="truncate text-sm font-bold text-[var(--primary-soft)]">
            General Profile
          </h3>
        </div>

        <Link
          href="/profile/general"
          className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[var(--secondary)] transition hover:opacity-80 sm:text-xs"
        >
          Full profile
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {profileItems.map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3"
          >
            <p className="truncate text-[10px] font-medium text-[var(--muted)] sm:text-[11px]">
              {item.label}
            </p>
            <p className="mt-1 truncate text-[12px] font-bold text-[var(--foreground)] sm:text-[13px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}