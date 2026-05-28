import { PreferenceSummarySection } from "@/components/profile/PreferenceSummarySection";
import { ApplianceSection } from "@/components/profile/ApplianceSection";
import { NotificationSection } from "@/components/profile/NotificationSection";
import { DeleteAccountSection } from "@/components/profile/DeleteAccountSection";
import { ProfileHeroCard } from "@/components/profile/ProfileHeroCard";
import { GeneralProfileSection } from "@/components/profile/GeneralProfileSection";
import { MobileHeader } from "@/components/global/MobileHeader";

export default function ProfilePage() {
  return (
    <>
      {/* <MobileHeader title="Profile" eyebrow="Personalization" /> */}

      <div className="mx-auto w-full max-w-5xl space-y-3 px-3 pb-28 pt-3 sm:px-4 lg:space-y-4 lg:px-5 lg:pb-8 lg:pt-6">
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-[var(--primary-soft)]">
            Profile & Settings
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage your kitchen identity, preferences, and reminders.
          </p>
        </div>

        <ProfileHeroCard />

        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
          <GeneralProfileSection />
          <PreferenceSummarySection />
        </div>

        <ApplianceSection />

        <NotificationSection />

        <DeleteAccountSection />
      </div>
    </>
  );
}