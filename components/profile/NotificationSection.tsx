"use client";

import { NotificationSetting } from "@/app/types/profile";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

type NotificationSectionProps = {
  settings: NotificationSetting[];
};

const fallbackNotifications = [
  {
    key: "expiry",
    title: "Expiry reminders",
    description: "Remind me before ingredients expire.",
    enabled: true
  },
  {
    key: "low-stock",
    title: "Low stock alerts",
    description: "Notify me when pantry items are running low.",
    enabled: true
  },
  {
    key: "meal-suggestions",
    title: "Meal suggestions",
    description: "Send helpful ideas based on my current stock.",
    enabled: false
  }
];

export function NotificationSection({ settings }: NotificationSectionProps) {
  const [notifications, setNotifications] = useState(fallbackNotifications);

  useEffect(() => {
    if (!settings.length) {
      setNotifications(fallbackNotifications);
      return;
    }

    setNotifications(
      settings.map((item) => ({
        key: item.key,
        title: item.title,
        description: item.description || "",
        enabled: item.enabled
      }))
    );
  }, [settings]);

  function toggleNotification(key: string) {
    setNotifications((current) =>
      current.map((item) =>
        item.key === key ? { ...item, enabled: !item.enabled } : item
      )
    );

    // Later we will call PATCH /api/me/notifications here
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-[var(--border)] pb-3">
        <Bell size={16} className="shrink-0 text-[var(--primary-soft)]" />

        <h3 className="text-sm font-bold text-[var(--primary-soft)]">
          Notifications
        </h3>
      </div>

      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3"
          >
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-[var(--foreground)] sm:text-[13px]">
                {item.title}
              </p>

              <p className="mt-0.5 max-w-[15rem] text-[10px] leading-relaxed text-[var(--muted)] sm:max-w-none sm:text-[11px]">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleNotification(item.key)}
              aria-pressed={item.enabled}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ease-out active:scale-95 ${
                item.enabled
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--surface-muted)]"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-[var(--foreground)] shadow-sm transition-transform duration-300 ease-out ${
                  item.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}