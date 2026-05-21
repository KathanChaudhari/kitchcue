import { SectionCard } from "@/components/global/SectionCard";

export function NotificationSection() {
  return (
    <SectionCard title="Notifications">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--muted)]">Low stock reminders</p>
        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-[var(--ink)]">On</span>
      </div>
    </SectionCard>
  );
}
