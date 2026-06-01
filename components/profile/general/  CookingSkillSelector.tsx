// src/components/profile/general/CookingSkillSelector.tsx

import { cookingSkills } from "./constants";

type CookingSkillSelectorProps = {
  isEditing: boolean;
  cookingSkill: string;
  onChange: (value: string) => void;
};

export function CookingSkillSelector({
  isEditing,
  cookingSkill,
  onChange
}: CookingSkillSelectorProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[13px] font-bold text-[var(--foreground)]">
          Cooking skill
        </p>

        <span className="rounded-md bg-[color-mix(in_srgb,var(--primary)_30%,var(--card))] px-2 py-1 text-[11px] font-bold text-[var(--primary-soft)]">
          {cookingSkill}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cookingSkills.map((skill) => {
          const isActive = cookingSkill === skill;

          return (
            <button
              key={skill}
              type="button"
              disabled={!isEditing}
              onClick={() => onChange(skill)}
              className={`rounded-lg border px-2.5 py-2 text-[11px] font-semibold transition ${
                isActive
                  ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              } ${
                isEditing
                  ? "hover:border-[var(--primary)] hover:text-[var(--foreground)] active:scale-95"
                  : "cursor-default"
              } ${!isEditing && !isActive ? "opacity-45" : ""}`}
            >
              {skill}
            </button>
          );
        })}
      </div>
    </div>
  );
}