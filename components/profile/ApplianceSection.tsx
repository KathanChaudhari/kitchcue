import { AirVent, ChefHat, Microwave, Plus } from "lucide-react";

const appliances = [
  { name: "Microwave", icon: Microwave },
  { name: "Air fryer", icon: AirVent },
  { name: "Pressure cooker", icon: ChefHat }
];

export function ApplianceSection() {
  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h3 className="text-sm font-bold text-[var(--primary-soft)]">
          Appliances
        </h3>

        <button className="text-xs font-semibold text-[var(--secondary)]">
          Manage
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {appliances.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              <Icon size={22} className="text-[var(--primary-soft)]" />
              {item.name}
            </button>
          );
        })}

        <button className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] bg-transparent text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]">
          <Plus size={22} />
          Add more
        </button>
      </div>
    </section>
  );
}