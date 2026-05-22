import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Expiry reminders",
    description: "Remind me before ingredients expire.",
    enabled: true
  },
  {
    title: "Low stock alerts",
    description: "Notify me when pantry items are running low.",
    enabled: true
  },
  {
    title: "Meal suggestions",
    description: "Send helpful ideas based on my current stock.",
    enabled: false
  }
];

export function NotificationSection() {
  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-3">
        <Bell size={17} className="text-[var(--primary-soft)]" />
        <h3 className="text-sm font-bold text-[var(--primary-soft)]">
          Notifications
        </h3>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {item.description}
              </p>
            </div>

            <button
              className={`relative h-7 w-12 rounded-full transition ${
                item.enabled
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--surface-muted)]"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-[var(--foreground)] transition ${
                  item.enabled ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}