import { SectionCard } from "@/components/global/SectionCard";

export function CookingPreferenceSection() {
  return (
    <SectionCard title="Cooking preferences">
      <div className="flex flex-wrap gap-2">
        {["Quick meals", "Low spice", "Budget friendly"].map((item) => (
          <span key={item} className="rounded-full bg-[#e9f0d6] px-3 py-2 text-xs font-bold text-[#3f4a24]">
            {item}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}
