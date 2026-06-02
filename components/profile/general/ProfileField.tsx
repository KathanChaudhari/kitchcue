// src/components/profile/general/ProfileField.tsx

import { ReactNode } from "react";

type ProfileFieldProps = {
  label: string;
  children: ReactNode;
};

export function ProfileField({ label, children }: ProfileFieldProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-[var(--muted)]">
          {label}
        </span>
      </div>

      {children}
    </label>
  );
}