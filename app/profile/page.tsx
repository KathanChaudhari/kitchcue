import { AppNav } from "@/components/global/AppNav";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";
import { ApplianceSection } from "@/components/profile/ApplianceSection";
import { CookingPreferenceSection } from "@/components/profile/CookingPreferenceSection";
import { FoodPreferenceSection } from "@/components/profile/FoodPreferenceSection";
import { HouseholdMembersSection } from "@/components/profile/HouseholdMembersSection";
import { NotificationSection } from "@/components/profile/NotificationSection";
import { UsageSection } from "@/components/profile/UsageSection";
import { UserInfoCard } from "@/components/profile/UserInfoCard";

export default function ProfilePage() {
  return (
    <>
      <AppNav active="profile" />

      <PageContainer>
        <MobileHeader title="Profile" eyebrow="Personalization" />

        <div className="pb-24 lg:pb-8">
          <div className="mb-6 rounded-[2rem] bg-[#20201d] p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4b76a]">
              Your kitchen profile
            </p>
            <h1 className="mt-2 text-2xl font-bold">
              Make KitchCue understand your home better
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Add your cooking style, appliances, food preferences, and reminders so suggestions feel more personal.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[22rem_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <UserInfoCard />
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
      </PageContainer>
    </>
  );
}
