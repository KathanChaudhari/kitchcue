import { SectionCard } from "@/components/global/SectionCard";
import { ChefHat } from "lucide-react";

const activities = [
  {
    time: "Yesterday, 7:30 PM",
    title: "Cooked Lemon Herb Salmon",
    description: "Deducted salmon, lemons, and dill from inventory."
  },
  {
    time: "Yesterday, 5:10 PM",
    title: "Added Fresh Vegetables",
    description: "Tomatoes, spinach, and coriander added to pantry."
  }
];

export function RecentActivityList() {
  return (
    <SectionCard>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--primary)]">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--surface-muted)]">
                <ChefHat className="h-5 w-5 text-[var(--primary)]" />
              </div>

              <div className="mt-2 h-full w-px bg-[var(--border)]" />
            </div>

            <div className="flex-1 pb-5">
              <p className="mb-3 text-xs font-medium text-[var(--muted)]">
                {activity.time}
              </p>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4">
                <h3 className="text-md font-bold">
                  {activity.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {activity.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}