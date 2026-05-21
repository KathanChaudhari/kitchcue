const prompts = ["Use spinach", "Quick dinner", "Low budget"];

export function SuggestedPromptChips() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {prompts.map((prompt) => (
        <button key={prompt} className="shrink-0 rounded-full bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted)]" type="button">
          {prompt}
        </button>
      ))}
    </div>
  );
}
