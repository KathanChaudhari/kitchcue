import type { WorkflowFeature } from "./data";

type FeatureCardProps = WorkflowFeature;

const toneClasses = {
  primary:
    "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]",
  secondary:
    "bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)] text-[var(--secondary)]",
  tertiary:
    "bg-[color-mix(in_srgb,var(--tertiary)_12%,transparent)] text-[var(--tertiary)]"
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  tone
}: FeatureCardProps) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))] lg:p-7">
      <div
        className={`mb-5 flex size-11 items-center justify-center rounded-lg lg:size-12 ${toneClasses[tone]}`}
      >
        <Icon size={20} />
      </div>

      <h3 className="text-sm font-bold text-[var(--foreground)] lg:text-base">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-5 text-[var(--foreground)]/85 lg:text-sm lg:leading-6">
        {description}
      </p>
    </article>
  );
}