import { ChefHat, PackageCheck, Sparkles } from "lucide-react";

const minimalistFeatures = [
  {
    icon: ChefHat,
    label: "Simple cooking"
  },
  {
    icon: PackageCheck,
    label: "Easy tracking"
  },
  {
    icon: Sparkles,
    label: "Useful suggestions"
  }
];

export function MinimalistSection() {
  return (
    <section className="px-4 py-10 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 text-center shadow-xl lg:max-w-xl lg:p-10">
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            {minimalistFeatures.map(({ icon: Icon, label }) => (
              <div
                key={label}
                title={label}
                className="flex size-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)] lg:size-12"
              >
                <Icon size={21} aria-hidden="true" />
              </div>
            ))}
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--primary)] lg:text-xs">
  Simple by Design
</p>

<h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-[var(--foreground)] lg:text-3xl">
  Everything you need, without the kitchen clutter.
</h2>

<p className="mx-auto mt-3 max-w-md text-xs leading-5 text-[var(--muted)] lg:text-sm lg:leading-6">
  A clean, distraction-free space to manage your ingredients, plan meals,
  and decide what to cook.
</p>
        </div>
      </div>
    </section>
  );
}