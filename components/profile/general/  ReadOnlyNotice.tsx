// src/components/profile/general/ReadOnlyNotice.tsx

export function ReadOnlyNotice() {
    return (
      <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--primary)_24%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_7%,var(--card))] px-3 py-2">
        <p className="text-[11px] font-medium text-[var(--muted)]">
          Click{" "}
          <span className="font-bold text-[var(--primary-soft)]">Edit</span> to
          update your profile details.
        </p>
      </div>
    );
  }