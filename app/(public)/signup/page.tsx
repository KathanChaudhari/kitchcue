import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-[360px] space-y-3 sm:max-w-sm">
          <SignupForm />
          <SocialAuthButtons />
        </div>
      </main>
    </div>
  );
}