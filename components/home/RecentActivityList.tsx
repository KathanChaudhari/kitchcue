import { SectionCard } from "@/components/global/SectionCard";

export function RecentActivityList() {
  return (
    <SectionCard title="Recent activity">
      <div className="space-y-3">
        {["Added rice to pantry", "Dinner plan saved", "Milk marked low"].map((activity) => (
          <p key={activity} className="rounded-xl bg-[var(--card-soft)] px-3 py-3 text-sm font-semibold">
            {activity}
          </p>
        ))}
      </div>
    </SectionCard>
  );
}
