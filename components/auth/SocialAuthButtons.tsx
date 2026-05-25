export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-bold text-[var(--foreground)] shadow-sm transition hover:bg-[var(--card-soft)] active:scale-[0.98]"
        type="button"
      >
        Google
      </button>

      <button
        className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-bold text-[var(--foreground)] shadow-sm transition hover:bg-[var(--card-soft)] active:scale-[0.98]"
        type="button"
      >
        Apple
      </button>
    </div>
  );
}