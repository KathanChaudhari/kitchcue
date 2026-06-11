import { FeatureCard } from "./FeatureCard";
import { workflowFeatures } from "./data";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-16 px-4 py-16 lg:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-xl lg:mb-12">
          <p className="text-xs font-bold text-[var(--primary)]">
            Smarter Kitchen
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl lg:text-4xl">
            Let&apos;s change how your kitchen works.
          </h2>

          <p className="mt-3 max-w-lg text-xs leading-5 text-[var(--muted)] lg:text-sm lg:leading-6">
            Plan meals, track your pantry, and get suggestions that match the
            way you cook.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {workflowFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}