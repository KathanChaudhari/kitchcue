import { Profile } from "@/app/types/profile";

type ProfileHeroCardProps = {
  profile: Profile;
};

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  const preferences = profile.preferences;

  const initials =
    profile.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "K";

      const personalInfo = [
        profile.age ? `${profile.age}` : null,
        profile.gender || null
      ]
        .filter(Boolean)
        .join(" · ");
      
      const cookingSkill = preferences?.cookingSkill || null;
      
      const householdSize = preferences?.householdSize
        ? `Cooks for ${preferences.householdSize}`
        : null;

  const subtitleParts = [profile.liveIn || null, profile.email].filter(Boolean);

  const subtitle = subtitleParts.join(" · ");

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--card),color-mix(in_srgb,var(--primary)_10%,var(--card)))] p-3.5 shadow-sm sm:p-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-lg font-bold text-[var(--primary-soft)] sm:h-16 sm:w-16 sm:text-xl">
          {profile.image ? (
            <img
              src={profile.image}
              alt={profile.name || "Profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-bold text-[var(--foreground)] sm:text-lg">
            {profile.name || "KitchCue User"}
          </h2>

          <p className="mt-0.5 truncate text-xs text-[var(--muted)] sm:mt-1 sm:text-sm">
            {subtitle}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
  {personalInfo ? (
    <span className="rounded-lg bg-[color-mix(in_srgb,var(--tertiary)_24%,var(--card))] px-2.5 py-1 text-[10px] font-semibold text-[var(--foreground)] sm:rounded-full sm:px-3 sm:text-xs">
      {personalInfo}
    </span>
  ) : null}

  {cookingSkill ? (
    <span className="rounded-lg bg-[color-mix(in_srgb,var(--primary)_28%,var(--card))] px-2.5 py-1 text-[10px] font-semibold text-[var(--primary-soft)] sm:rounded-full sm:px-3 sm:text-xs">
      {cookingSkill}
    </span>
  ) : null}

  {householdSize ? (
    <span className="rounded-lg bg-[color-mix(in_srgb,var(--secondary)_30%,var(--card))] px-2.5 py-1 text-[10px] font-semibold text-[var(--foreground)] sm:rounded-full sm:px-3 sm:text-xs">
      {householdSize}
    </span>
  ) : null}
</div>
        </div>
      </div>
    </section>
  );
}