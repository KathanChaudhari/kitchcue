import { SectionCard } from "@/components/global/SectionCard";

export function NotesCard() {
  return (
    <SectionCard title="Notes">
      <div className="space-y-3">
        <p className="rounded-xl bg-[var(--card-soft)] px-3 py-3 text-sm font-semibold">
          Try a lighter dinner with the spinach tonight.
        </p>
        <p className="rounded-xl bg-[var(--card-soft)] px-3 py-3 text-sm font-semibold">
          Prep breakfast batter before sleep.
        </p>
      </div>
    </SectionCard>
  );
}
