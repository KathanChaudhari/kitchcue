import Link from "next/link";
import { SectionCard } from "@/components/global/SectionCard";

const reminders = ["Buy milk tomorrow", "Use spinach before Friday", "Refill turmeric this week"];

export function ReminderCardList() {
  return (
    <SectionCard>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold">Reminders</h2>
        <Link className="text-sm font-bold text-[var(--primary)]" href="/home/reminders">See all</Link>
      </div>
      <div className="space-y-2">
        {reminders.map((reminder) => (
          <div key={reminder} className="rounded-xl bg-[var(--card-soft)] px-3 py-3 text-sm font-semibold text-[var(--muted)]">
            {reminder}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
