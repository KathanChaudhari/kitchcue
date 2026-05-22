import { MobileHeader } from "@/components/global/MobileHeader";
import { ApplianceSection } from "@/components/profile/ApplianceSection";
import { CookingPreferenceSection } from "@/components/profile/CookingPreferenceSection";
import { FoodPreferenceSection } from "@/components/profile/FoodPreferenceSection";
import { HouseholdMembersSection } from "@/components/profile/HouseholdMembersSection";
import { NotificationSection } from "@/components/profile/NotificationSection";
import { ThemeModeSection } from "@/components/profile/ThemeModeSection";
import { UsageSection } from "@/components/profile/UsageSection";
import { UserInfoCard } from "@/components/profile/UserInfoCard";

export default function ProfilePage() {
  return (
    <>
      <MobileHeader title="Profile" eyebrow="Personalization" />

      <div className="pb-24 lg:pb-8">
        <div className="mb-6 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
            Your kitchen profile
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            Make KitchCue understand your home better
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Add your cooking style, appliances, food preferences, and reminders so suggestions feel more personal.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[22rem_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <UserInfoCard />
            <ThemeModeSection />
            <HouseholdMembersSection />
          </aside>

          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <CookingPreferenceSection />
              <ApplianceSection />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FoodPreferenceSection />
              <NotificationSection />
            </div>

            <UsageSection />
          </section>
        </div>
      </div>
    </>
  );
}
