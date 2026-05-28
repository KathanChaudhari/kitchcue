import { PreferencesForm } from "@/components/profile/PreferencesForm";

export default function PreferencesPage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--card)] lg:bg-[var(--background)]">
      <div className="mx-auto w-full max-w-4xl pb-28 lg:bg-transparent lg:px-5 lg:pb-8 lg:pt-6">
        <PreferencesForm />
      </div>
    </div>
  );
}