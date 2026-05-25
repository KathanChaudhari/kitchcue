import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { MobileHeader } from "@/components/global/MobileHeader";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* <MobileHeader title="Login" eyebrow="Welcome back" /> */}

      <main className="flex flex-1 items-center justify-center px-4 pb-20 pt-4">
        <div className="w-full max-w-sm space-y-3">
          <LoginForm />
          <SocialAuthButtons />
        </div>
      </main>
    </div>
  );
}