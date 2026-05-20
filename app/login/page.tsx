import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";

export default function LoginPage() {
  return (
    <PageContainer size="narrow">
      <MobileHeader title="Login" eyebrow="Welcome back" />
      <div className="space-y-4 pb-8">
        <LoginForm />
        <SocialAuthButtons />
      </div>
    </PageContainer>
  );
}
