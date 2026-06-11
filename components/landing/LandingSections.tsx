import { WaitlistSection } from "./waitlist/WaitlistSection";
import { FeaturesSection } from "./features/FeaturesSection";
import { MinimalistSection } from "./minimalist/MinimalistSection";
import { RoadmapSection } from "./roadmap/RoadmapSection";

export function LandingSections() {
  return (
    <>
      <FeaturesSection />
      <MinimalistSection />
      <RoadmapSection />
      <WaitlistSection />
    </>
  );
}