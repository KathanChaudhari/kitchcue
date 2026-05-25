import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { MobileHeader } from "@/components/global/MobileHeader";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* <MobileHeader title="Create account" eyebrow="Start your smart kitchen" /> */}

      <main className="flex flex-1 items-center justify-center px-4 pb-20 pt-4">
        <div className="w-full max-w-sm space-y-3">
          <SignupForm />
          <SocialAuthButtons />
        </div>
      </main>
    </div>
  );
}