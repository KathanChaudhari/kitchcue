"use client";

import { SlidersHorizontal, SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

export function ChatInput() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) return;

    // Later, call your API here:
    // await fetch("/api/assistant", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message }),
    // });

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg"
    >
      <button
        type="button"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--card-soft)] hover:text-[var(--foreground)]"
        aria-label="Assistant settings"
      >
        <SlidersHorizontal size={17} />
      </button>

      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="h-9 flex-1 bg-transparent text-[13px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        placeholder="Ask KitchCue anything..."
      />

      <button
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--primary-soft)] text-[var(--ink)] transition hover:opacity-90"
        type="submit"
        aria-label="Send message"
      >
        <SendHorizontal size={17} />
      </button>
    </form>
  );
}