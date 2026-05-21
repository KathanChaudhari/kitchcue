export function ChatInput() {
  return (
    <form className="fixed inset-x-0 bottom-20 z-10 mx-auto flex max-w-md gap-2 bg-[var(--background)] px-5 py-3 lg:static lg:max-w-none lg:bg-transparent lg:px-0 lg:py-0">
      <input
        className="h-12 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
        placeholder="Ask what to cook..."
      />
      <button className="h-12 rounded-2xl bg-[var(--primary)] px-4 text-sm font-bold text-[var(--ink)]" type="button">
        Send
      </button>
    </form>
  );
}
