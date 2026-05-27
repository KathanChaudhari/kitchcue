"use client";

import { SlidersHorizontal, SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

export function ChatInput() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) return;

    console.log("Message:", message);

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl"
    >
      <button
        type="button"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card-soft)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
        aria-label="Assistant settings"
      >
        <SlidersHorizontal size={18} />
      </button>

      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="h-10 min-w-0 flex-1 rounded-xl bg-[var(--surface)] px-3 text-sm font-medium text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        placeholder="Ask KitchCue..."
      />

      <button
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--primary)] text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
        type="submit"
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <SendHorizontal size={18} />
      </button>
    </form>
  );
}