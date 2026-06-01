// src/components/profile/general/PreferenceSaveNotice.tsx

export function PreferenceSaveNotice() {
    return (
      <div className="rounded-xl border border-[color-mix(in_srgb,var(--secondary)_28%,var(--border))] bg-[color-mix(in_srgb,var(--secondary)_7%,var(--card))] px-3 py-2">
        <p className="text-[11px] leading-relaxed text-[var(--muted)]">
          Household size and cooking skill come from preferences. The UI is ready,
          but saving these values needs the preferences API connection.
        </p>
      </div>
    );
  }