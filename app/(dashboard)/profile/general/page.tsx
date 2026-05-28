import { GeneralProfileForm } from "@/components/profile/GeneralProfileForm";

export default function GeneralProfilePage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--card)] lg:bg-[var(--background)]">
      <div className="mx-auto w-full max-w-3xl pb-28 lg:bg-transparent lg:px-5 lg:pb-8 lg:pt-6">
        <GeneralProfileForm />
      </div>
    </div>
  );
}