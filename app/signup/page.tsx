import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";

export default function SignupPage() {
  return (
    <PageContainer
    size="narrow"
    className="min-h-screen flex flex-col justify-center"
  >
    <MobileHeader
      title="Create account"
      eyebrow="Start your smart kitchen"
    />
  
    <div className="space-y-4 pb-8">
      <SignupForm />
      <SocialAuthButtons />
    </div>
  </PageContainer>
  );
}
