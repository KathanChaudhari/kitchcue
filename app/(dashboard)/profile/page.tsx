import { MobileHeader } from "@/components/global/MobileHeader";
import { PreferenceSummarySection } from "@/components/profile/PreferenceSummarySection";
import { ApplianceSection } from "@/components/profile/ApplianceSection";
import { NotificationSection } from "@/components/profile/NotificationSection";
import { DeleteAccountSection } from "@/components/profile/DeleteAccountSection";
import { ProfileHeroCard } from "@/components/profile/ProfileHeroCard";
import { GeneralProfileSection } from "@/components/profile/GeneralProfileSection";

export default function ProfilePage() {
  return (
    <>

      <div className="mx-auto mt-10 w-full max-w-5xl space-y-4 pb-24 lg:pb-8">
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-[var(--primary-soft)]">
            Profile & Settings
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage your kitchen identity, preferences, and reminders.
          </p>
        </div>

        <ProfileHeroCard />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
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