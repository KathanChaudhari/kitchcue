import { Profile } from "@/app/types/profile";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
    profile.gender || null,
    profile.liveIn || null
  ]
    .filter(Boolean)
    .join(" · ");

  const cookingSkill = preferences?.cookingSkill || null;

  const householdSize = preferences?.householdSize
    ? `Cooks for ${preferences.householdSize} ${
        preferences.householdSize === 1 ? "person" : "people"
      }`
    : null;

  return (
    <Link
      href="/profile/general"
      aria-label="Open general profile"
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <section className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--card),color-mix(in_srgb,var(--primary)_10%,var(--card)))] p-3.5 shadow-sm transition group-hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))] group-hover:shadow-md group-active:scale-[0.99] sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-lg font-bold text-[var(--primary-soft)] sm:h-16 sm:w-16 sm:text-xl">
            {profile.image ? (
              // eslint-disable-next-line @next/next/no-img-element
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

          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary)_18%,var(--card))] text-[var(--primary-soft)] transition group-hover:translate-x-0.5 group-hover:bg-[color-mix(in_srgb,var(--primary)_28%,var(--card))] sm:h-10 sm:w-10">
            <ChevronRight size={18} />
          </div>
        </div>
      </section>
    </Link>
  );
}