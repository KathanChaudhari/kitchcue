// src/components/profile/preferences/PreferenceCard.tsx

import { ReactNode } from "react";

type PreferenceCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  isEditing: boolean;
  children: ReactNode;
};

export function PreferenceCard({
  icon: Icon,
  title,
  description,
  isEditing,
  children
}: PreferenceCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,var(--card))] text-[var(--primary-soft)]">
            <Icon size={15} />
          </div>

          <div>
            <h3 className="text-[13px] font-bold text-[var(--foreground)]">
              {title}
            </h3>

            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted)]">
              {description}
            </p>
          </div>
        </div>

        {!isEditing && (
          <span className="shrink-0 text-[10px] font-medium text-[var(--muted)] opacity-70">
            Edit to change
          </span>
        )}
      </div>

      {children}
    </div>
  );
}