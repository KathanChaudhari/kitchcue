import { Check } from "lucide-react";
import type { RoadmapStatus } from "./types";

type RoadmapCheckProps = {
  status: RoadmapStatus;
};

export function RoadmapCheck({ status }: RoadmapCheckProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <div
      aria-hidden="true"
      className="relative mt-1 h-5 w-5 shrink-0"
    >
      <span
        className={`absolute inset-0 rounded-[3px] border-l-2 border-t-2 border-b-2 ${
          isCompleted
            ? "border-[var(--primary)]"
            : isInProgress
              ? "border-[var(--secondary)]"
              : "border-[var(--border)]"
        }`}
      />

      <span
        className={`absolute bottom-0 right-0 h-[55%] w-0.5 ${
          isCompleted
            ? "bg-[var(--primary)]"
            : isInProgress
              ? "bg-[var(--secondary)]"
              : "bg-[var(--border)]"
        }`}
      />

      {isCompleted && (
        <Check
          size={32}
          strokeWidth={3}
          className="absolute -left-0.5 -top-2 text-[var(--primary)]"
        />
      )}

      {isInProgress && (
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--secondary)]" />
      )}
    </div>
  );
}