import { ChevronRight, Minus, Plus, UserRound } from "lucide-react";
import Link from "next/link";

const profileItems = [
  { label: "Age", value: "25" },
  { label: "Gender", value: "Male" },
  { label: "Lives in", value: "Ahmedabad, India" },
  { label: "From", value: "Gujarat, India" },

];

const cookingSkills = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function GeneralProfileSection() {
  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <UserRound size={17} className="text-[var(--primary-soft)]" />
          <h3 className="text-sm font-bold text-[var(--primary-soft)]">
            General Profile
          </h3>
        </div>

        <Link
  href="/profile/general"
  className="flex items-center gap-1 text-xs font-semibold text-[var(--secondary)]"
>
  Full profile
  <ChevronRight size={14} />
</Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {profileItems.map((item) => (
          <div key={item.label}>
            <p className="mb-1 text-xs font-medium text-[var(--muted)]">
              {item.label}
            </p>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--foreground)]">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[var(--muted)]">
          How many people do you cook for?
        </p>

        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)]">
            <Minus size={16} />
          </button>

          <div className="flex h-9 min-w-14 items-center justify-center rounded-xl bg-[var(--surface)] px-4 text-sm font-bold">
            2
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)]">
            <Plus size={16} />
          </button>

          <span className="text-sm text-[var(--muted)]">people</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-[var(--muted)]">
            Cooking skill
          </p>
          <span className="rounded-lg bg-[color-mix(in_srgb,var(--primary)_35%,var(--card))] px-2 py-1 text-xs font-bold text-[var(--primary-soft)]">
            Intermediate
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cookingSkills.map((skill) => {
            const isActive = skill === "Intermediate";

            return (
              <button
                key={skill}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_28%,var(--card))] text-[var(--primary-soft)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}