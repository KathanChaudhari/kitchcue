import {
  Heart,
  ShoppingCart,
  Utensils
} from "lucide-react";

type SuggestedPromptChipsProps = {
  disabled?: boolean;
  onPromptSelect: (prompt: string) => void;
};

const prompts = [
  {
    label: "Cook with eggs?",
    prompt:
      "What can I cook with eggs and the ingredients currently in my kitchen?",
    icon: Utensils
  },
  {
    label: "Add milk",
    prompt: "Add milk to my shopping list.",
    icon: ShoppingCart
  },
  {
    label: "Healthy dinner",
    prompt:
      "Suggest a healthy dinner using ingredients from my kitchen stock.",
    icon: Heart
  }
];

export function SuggestedPromptChips({
  disabled = false,
  onPromptSelect
}: SuggestedPromptChipsProps) {
  return (
    <div className="mb-2 flex w-full gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
      {prompts.map((prompt) => {
        const Icon = prompt.icon;

        return (
          <button
            key={prompt.label}
            type="button"
            disabled={disabled}
            onClick={() => {
              onPromptSelect(prompt.prompt);
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon size={13} />
            {prompt.label}
          </button>
        );
      })}
    </div>
  );
}