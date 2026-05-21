import { SectionCard } from "@/components/global/SectionCard";

export function EssentialSuggestionCard() {
  return (
    <SectionCard title="Habit signal">
      <p className="text-sm leading-6 text-[var(--muted)]">
        KitchCue will learn repeat purchases and suggest essentials before they run out.
      </p>
    </SectionCard>
  );
}
