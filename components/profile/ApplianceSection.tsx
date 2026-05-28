import { AirVent, ChefHat, Microwave, Plus } from "lucide-react";

const appliances = [
  { name: "Microwave", icon: Microwave },
  { name: "Air fryer", icon: AirVent },
  { name: "Pressure cooker", icon: ChefHat }
];

export function ApplianceSection() {
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

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {appliances.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2 py-3 text-center text-[12px] font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm"
            >
              <Icon size={20} className="text-[var(--primary-soft)] sm:size-[22px]" />
              <span className="leading-tight">{item.name}</span>
            </button>
          );
        })}

        <button className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] bg-transparent px-2 py-3 text-center text-[12px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm">
          <Plus size={20} className="sm:size-[22px]" />
          <span className="leading-tight">Add more</span>
        </button>
      </div>
    </section>
  );
}