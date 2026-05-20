import { SectionCard } from "@/components/global/SectionCard";

export function NotificationSection() {
  return (
    <SectionCard title="Notifications">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#7a6b58]">Low stock reminders</p>
        <span className="rounded-full bg-[#606c38] px-3 py-1 text-xs font-bold text-white">On</span>
      </div>
    </SectionCard>
  );
}
