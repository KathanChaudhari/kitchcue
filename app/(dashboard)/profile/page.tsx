"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { PreferenceSummarySection } from "@/components/profile/PreferenceSummarySection";
import { ApplianceSection } from "@/components/profile/ApplianceSection";
import { NotificationSection } from "@/components/profile/NotificationSection";
import { DeleteAccountSection } from "@/components/profile/DeleteAccountSection";
import { ProfileHeroCard } from "@/components/profile/ProfileHeroCard";
import { ThemeModeSection } from "@/components/profile/ThemeModeSection";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login"
    });
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-3 pb-28 pt-3 sm:px-4 lg:px-5 lg:pb-8 lg:pt-6">
        <div className="rounded-2xl bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto w-full max-w-5xl px-3 pb-28 pt-3 sm:px-4 lg:px-5 lg:pb-8 lg:pt-6">
        <div className="rounded-2xl bg-[var(--card)] p-4 text-sm text-red-300">
          {error || "Profile not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-3 px-3 pb-28 pt-3 sm:px-4 lg:space-y-4 lg:px-5 lg:pb-8 lg:pt-6">
      <div className="hidden lg:block">
        <h1 className="text-2xl font-bold text-[var(--primary-soft)]">
          Profile & Settings
        </h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Manage your kitchen identity, preferences, and reminders.
        </p>
      </div>

      <ProfileHeroCard profile={profile} />

      <ThemeModeSection />

      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
        <PreferenceSummarySection preferences={profile.preferences} />

        <ApplianceSection appliances={profile.preferences?.appliances || []} />
      </div>

      <NotificationSection settings={profile.notificationSettings} />

      <div className="lg:hidden">
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 text-xs font-bold text-[var(--muted)] transition hover:bg-[#2f3b31] hover:text-[var(--foreground)] active:scale-[0.98] [html.light_&]:hover:bg-[var(--card-soft)] [html.light_&]:hover:text-[var(--foreground)]"
        >
          <LogOut size={17} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>

      <DeleteAccountSection />
    </div>
  );
}