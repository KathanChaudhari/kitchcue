import { DemoChatPreview } from "@/components/landing/DemoChatPreview";
import { FeatureHighlights } from "@/components/landing/FeatureHighlights";
import { HeroSection } from "@/components/landing/HeroSection";
import { PageContainer } from "@/components/global/PageContainer";

export default function Home() {
  return (
      <div className="grid gap-6 pb-10 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:py-10">
        <HeroSection />
        <div className="space-y-4 lg:flex lg:gap-4">
          <FeatureHighlights />
          <DemoChatPreview />
        </div>
      </div>
  );
}
