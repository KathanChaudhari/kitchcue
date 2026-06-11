import { RoadmapCheck } from "./RoadmapCheck";
import type { RoadmapItem, RoadmapStatus } from "./types";

type RoadmapCardProps = {
  item: RoadmapItem;
};

const statusLabels: Record<RoadmapStatus, string> = {
  completed: "Ready",
  "in-progress": "In Progress",
  planned: "Planned"
};

const statusClasses: Record<RoadmapStatus, string> = {
  completed: "text-[var(--primary)]",
  "in-progress": "text-[var(--secondary)]",
  planned: "text-[var(--muted)]"
};

export function RoadmapCard({ item }: RoadmapCardProps) {
  return (
    <article className="group py-3">
      <div className="flex items-start gap-4">
        <RoadmapCheck status={item.status} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-sm font-bold text-[var(--foreground)] transition group-hover:text-[var(--primary)] lg:text-base">
              {item.title}
            </h3>

            <span
              className={`text-[9px] font-black uppercase tracking-[0.16em] ${statusClasses[item.status]}`}
            >
              {statusLabels[item.status]}
            </span>
          </div>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-[var(--muted)] lg:text-sm lg:leading-6">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}