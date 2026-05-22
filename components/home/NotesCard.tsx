import { SectionCard } from "@/components/global/SectionCard";
import { AlertTriangle, Sparkles } from "lucide-react";

const notices = [
  {
    title: "Expiring Soon",
    description:
      "Spinach bag expires in 2 days. Suggested recipe: Spinach & Feta Stuffed Chicken.",
    icon: AlertTriangle,
    tone: "warning"
  },
  {
    title: "Chef Suggestion",
    description:
      "You have enough ingredients for creamy pesto pasta tonight.",
    icon: Sparkles,
    tone: "success"
  }
];

export function NotesCard() {
  return (
    <SectionCard>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--primary)]">
          Notices
        </h2>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => {
          const Icon = notice.icon;

          return (
            <div
              key={notice.title}
              className={`rounded-2xl border p-4 ${
                notice.tone === "warning"
                  ? "border-[#5a3d28] bg-[#2a1d16]"
                  : "border-[#314437] bg-[#1b2620]"
              }`}
            >
              <div className="flex gap-3">
                <Icon
                  className={`mt-0.5 h-5 w-5 ${
                    notice.tone === "warning"
                      ? "text-[#f0b27a]"
                      : "text-[var(--primary)]"
                  }`}
                />

                <div>
                  <h3
                    className={`text-base font-bold ${
                      notice.tone === "warning"
                        ? "text-[#f3c69a]"
                        : "text-[var(--primary)]"
                    }`}
                  >
                    {notice.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/80">
                    {notice.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}