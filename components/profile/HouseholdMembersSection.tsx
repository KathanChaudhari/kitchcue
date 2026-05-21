import { SectionCard } from "@/components/global/SectionCard";

export function HouseholdMembersSection() {
  return (
    <SectionCard title="Family and friends">
      <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold">
        {["You", "Partner", "Friend"].map((member) => (
          <div key={member} className="rounded-xl bg-[var(--card-soft)] px-2 py-3 text-[var(--muted)]">
            {member}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
