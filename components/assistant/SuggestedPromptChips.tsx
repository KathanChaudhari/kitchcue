import { Heart, ShoppingCart, Utensils } from "lucide-react";

const prompts = [
  {
    label: "Cook with eggs?",
    icon: Utensils
  },
  {
    label: "Add milk",
    icon: ShoppingCart
  },
  {
    label: "Healthy dinner",
    icon: Heart
  }
];

export function SuggestedPromptChips() {
  return (
    <div className="mb-2 flex w-full gap-1.5 overflow-x-auto pb-1">
      {prompts.map((prompt) => {
        const Icon = prompt.icon;

        return (
          <button
            key={prompt.label}
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            <Icon size={13} />
            {prompt.label}
          </button>
        );
      })}
    </div>
  );
}