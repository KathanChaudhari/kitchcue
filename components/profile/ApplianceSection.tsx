import { AirVent, ChefHat, Microwave, Plus, Utensils } from "lucide-react";

type ApplianceSectionProps = {
  appliances: string[];
};

function getApplianceIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("microwave")) return Microwave;
  if (normalizedName.includes("air")) return AirVent;
  if (normalizedName.includes("pressure")) return ChefHat;

  return Utensils;
}

export function ApplianceSection({ appliances }: ApplianceSectionProps) {
  const hasAppliances = appliances.length > 0;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <h3 className="text-sm font-bold text-[var(--primary-soft)]">
          Appliances
        </h3>

        <button className="text-[11px] font-semibold text-[var(--secondary)] transition hover:opacity-80 sm:text-xs">
          Manage
        </button>
      </div>

      {hasAppliances ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {appliances.map((appliance) => {
            const Icon = getApplianceIcon(appliance);

            return (
              <button
                key={appliance}
                className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2 py-3 text-center text-[12px] font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm"
              >
                <Icon
                  size={20}
                  className="text-[var(--primary-soft)] sm:size-[22px]"
                />

                <span className="leading-tight">{appliance}</span>
              </button>
            );
          })}

          <button className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] bg-transparent px-2 py-3 text-center text-[12px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm">
            <Plus size={20} className="sm:size-[22px]" />
            <span className="leading-tight">Add more</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            No appliances added yet
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Add appliances so KitchCue can suggest recipes you can actually make.
          </p>

          <button className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-3 text-xs font-bold text-[var(--ink)] transition active:scale-95">
            <Plus size={15} />
            Add appliances
          </button>
        </div>
      )}
    </section>
  );
}