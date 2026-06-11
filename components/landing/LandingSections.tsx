import { LandingCtaSection } from "./cta/LandingCtaSection";
import { FeaturesSection } from "./features/FeaturesSection";
import { MinimalistSection } from "./minimalist/MinimalistSection";
import { RoadmapSection } from "./roadmap/RoadmapSection";

export function LandingSections() {
  return (
    <>
      <FeaturesSection />
      <MinimalistSection />
      <RoadmapSection />
      <LandingCtaSection />
    </>
  );
}