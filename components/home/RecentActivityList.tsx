import { useState } from "react";
import { HomeActivityItem } from "@/app/types/home";
import { SectionCard } from "@/components/global/SectionCard";
import {
  Bell,
  ChefHat,
  MessageCircle,
  PackageCheck,
  ShoppingBasket
} from "lucide-react";

type RecentActivityListProps = {
  items: HomeActivityItem[];
};

function formatActivityTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

function getActivityIcon(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("inventory")) return PackageCheck;
  if (normalizedType.includes("stock")) return ShoppingBasket;
  if (normalizedType.includes("assistant")) return MessageCircle;
  if (normalizedType.includes("notification")) return Bell;

  return ChefHat;
}

export function RecentActivityList({ items }: RecentActivityListProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, 2);
  const hasMoreItems = items.length > 2;

  return (
    <SectionCard>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Recent Activity
        </h2>

        {hasMoreItems ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs font-bold text-[var(--primary)] transition hover:opacity-80"
          >
            {showAll ? "Show less" : "View more"}
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 text-sm font-medium text-[var(--muted)]">
          No recent activity yet. Add pantry items or chat with your assistant
          to see updates here.
        </div>
      ) : (
        <div className="space-y-5">
          {visibleItems.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const isLast = index === visibleItems.length - 1;

            return (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--surface-muted)]">
                    <Icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  {!isLast && (
                    <div className="mt-2 h-full w-px bg-[var(--border)]" />
                  )}
                </div>

                <div className="flex-1 pb-5">
                  <p className="mb-3 text-xs font-medium text-[var(--muted)]">
                    {formatActivityTime(activity.createdAt)}
                  </p>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4">
                    <h3 className="text-md font-bold text-[var(--foreground)]">
                      {activity.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}