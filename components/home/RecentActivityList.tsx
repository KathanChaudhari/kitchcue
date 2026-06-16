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
  return (
    <SectionCard>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Recent Activity
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 text-sm font-medium text-[var(--muted)]">
          No recent activity yet. Add pantry items or chat with your assistant
          to see updates here.
        </div>
      ) : (
        <div
          style={{ scrollbarGutter: "stable" }}
          className={`space-y-5 scrollbar-hide overflow-x-hidden pr-1 ${
            items.length > 2
              ? "max-h-[390px] overflow-y-auto"
              : "overflow-y-visible"
          }`}
        >
          {items.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const isLast = index === items.length - 1;

            return (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--surface-muted)]">
                    <Icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  {!isLast ? (
                    <div className="mt-2 h-full min-h-6 w-px bg-[var(--border)]" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 pb-5">
                  <p className="mb-3 text-xs font-medium text-[var(--muted)]">
                    {formatActivityTime(activity.createdAt)}
                  </p>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4">
                    <h3 className="text-md font-bold text-[var(--foreground)]">
                      {activity.title}
                    </h3>

                    <p className="mt-2 break-words text-sm leading-6 text-[var(--muted)]">
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