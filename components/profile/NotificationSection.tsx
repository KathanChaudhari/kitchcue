"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

const defaultNotifications = [
  {
    id: "expiry",
    title: "Expiry reminders",
    description: "Remind me before ingredients expire.",
    enabled: true
  },
  {
    id: "low-stock",
    title: "Low stock alerts",
    description: "Notify me when pantry items are running low.",
    enabled: true
  },
  {
    id: "meal-suggestions",
    title: "Meal suggestions",
    description: "Send helpful ideas based on my current stock.",
    enabled: false
  }
];

export function NotificationSection() {
  const [notifications, setNotifications] = useState(defaultNotifications);

  function toggleNotification(id: string) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-[var(--border)] pb-3">
        <Bell size={16} className="text-[var(--primary-soft)]" />
        <h3 className="text-sm font-bold text-[var(--primary-soft)]">
          Notifications
        </h3>
      </div>

      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <div>
              <p className="text-[13px] font-bold text-[var(--foreground)]">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                {item.description}
              </p>
            </div>

            <button
  type="button"
  onClick={() => toggleNotification(item.id)}
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