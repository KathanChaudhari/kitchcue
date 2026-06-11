import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingHero } from "./LandingHero";
import { LandingSections } from "./LandingSections";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingHeader />

      <LandingHero />
      <LandingSections />
      <LandingFooter />
    </main>
  );
}