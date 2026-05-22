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
        <h2 className="text-xl font-bold text-[var(--primary)]">
          Notices
        </h2>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => {
          const Icon = notice.icon;

          return (
            <div
              key={notice.title}
              className={`
                rounded-2xl border p-4
                ${
                  notice.tone === "warning"
                    ? "border-[var(--secondary-container)] bg-[var(--surface-muted)]"
                    : "border-[var(--border)] bg-[var(--card-soft)]"
                }
              `}
            >
              <div className="flex gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    ${
                      notice.tone === "warning"
                        ? "bg-[var(--secondary-container)]"
                        : "bg-[var(--surface-high)]"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-5 w-5
                      ${
                        notice.tone === "warning"
                          ? "text-[var(--secondary)]"
                          : "text-[var(--primary)]"
                      }
                    `}
                  />
                </div>

                <div className="flex-1">
                  <h3
                    className={`
                      text-sm font-bold
                      ${
                        notice.tone === "warning"
                          ? "text-[var(--secondary)]"
                          : "text-[var(--primary)]"
                      }
                    `}
                  >
                    {notice.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
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