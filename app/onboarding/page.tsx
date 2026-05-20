import Link from "next/link";
import { MobileHeader } from "@/components/global/MobileHeader";
import { PageContainer } from "@/components/global/PageContainer";
import { SectionCard } from "@/components/global/SectionCard";

const steps = ["Household size", "Food preferences", "Kitchen essentials"];

export default function OnboardingPage() {
  return (
    <PageContainer size="narrow"  className="min-h-screen flex flex-col justify-center">
      <MobileHeader title="Set up KitchCue" eyebrow="Onboarding" />
      <div className="space-y-4 pb-8">
        {steps.map((step, index) => (
          <SectionCard key={step}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#606c38] text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="font-bold">{step}</h2>
                <p className="text-sm text-[#7a6b58]">Quick setup placeholder for MVP.</p>
              </div>
            </div>
          </SectionCard>
        ))}
        <Link className="block rounded-xl bg-[#20201d] px-4 py-3 text-center text-sm font-bold text-white" href="/home">
          Finish setup
        </Link>
      </div>
    </PageContainer>
  );
}
