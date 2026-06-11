import { Bot, ClipboardList, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FeatureTone = "primary" | "secondary" | "tertiary";

export type WorkflowFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: FeatureTone;
};

export const workflowFeatures: WorkflowFeature[] = [
  {
    title: "Kitchen AI Assistant",
    description:
      "Cook with the ingredients you already have and plan meals around your preferences.",
    icon: Bot,
    tone: "primary"
  },
  {
    title: "Smart Pantry Tracking",
    description:
      "Track what you have, what is running low, and what you need to buy.",
    icon: ClipboardList,
    tone: "secondary"
  },
  {
    title: "Made for Your Taste",
    description:
      "Get meal ideas shaped around your taste, routine, location, and cooking style.",
    icon: HeartPulse,
    tone: "tertiary"
  }
];