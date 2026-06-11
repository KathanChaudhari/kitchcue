export type RoadmapStatus = "completed" | "in-progress" | "planned";

export type RoadmapItem = {
  title: string;
  description: string;
  status: RoadmapStatus;
};