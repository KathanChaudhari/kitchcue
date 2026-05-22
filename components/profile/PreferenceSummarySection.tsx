import { ChevronRight, HeartPulse } from "lucide-react";
import Link from "next/link";

const healthGoals = [
  "Lose weight",
  "Gain muscle",
  "Eat healthy"
];

const allergies = ["Peanuts", "Shellfish"];
const conditions = ["Diabetes"];
const likes = ["Garlic", "Paneer", "Rice"];
const dislikes = ["Eggplant", "Blue cheese"];
const textures = ["Crispy", "Soft", "Creamy"];
const cuisines = ["Indian", "Japanese"];
const dietary = ["Vegetarian", "High protein"];
const cookingStyle = ["Quick meals", "Healthy"];

function Chip({ children, active = false }: { children: string; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-[color-mix(in_srgb,var(--primary)_30%,var(--card))] text-[var(--primary-soft)]"
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
    <div>
      <p className="mb-2 text-xs font-bold text-[var(--muted)]">{title}</p>
      <div className="flex flex-wrap gap-2">
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
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <HeartPulse size={17} className="text-[var(--primary-soft)]" />
          <h3 className="text-sm font-bold text-[var(--primary-soft)]">
            Preferences
          </h3>
        </div>

        <Link
  href="/profile/preferences"
  className="flex items-center gap-1 text-xs font-semibold text-[var(--secondary)]"
>
  Advanced
  <ChevronRight size={14} />
</Link>
      </div>

      <div className="space-y-5">
        <PreferenceGroup title="Health goals" items={healthGoals} active />

        <div className="grid gap-4 sm:grid-cols-2">
          <PreferenceGroup title="Allergies" items={allergies} />
          <PreferenceGroup title="Conditions" items={conditions} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-[var(--muted)]">Spice level</p>
            <span className="text-xs font-semibold text-[var(--secondary)]">
              3 / 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-8 rounded-lg ${
                  level <= 3
                    ? "bg-[color-mix(in_srgb,var(--secondary)_70%,var(--card))]"
                    : "bg-[var(--surface)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PreferenceGroup title="Likes" items={likes} active />
          <PreferenceGroup title="Dislikes" items={dislikes} />
         
          <PreferenceGroup title="Cuisines" items={cuisines} />
          <PreferenceGroup title="Dietary" items={dietary} />
        </div>
      </div>
    </section>
  );
}