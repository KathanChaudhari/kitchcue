"use client";

import { createAssistantMessage } from "@/lib/client/assistant";
import {
  LoaderCircle,
  SendHorizontal,
  SlidersHorizontal
} from "lucide-react";
import { FormEvent, useState } from "react";

type ChatInputProps = {
  sessionId: string | null;
  onMessageSent: () => Promise<void> | void;
};

export function ChatInput({
  sessionId,
  onMessageSent
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || !sessionId || isSending) return;

    try {
      setError("");
      setIsSending(true);

      await createAssistantMessage(sessionId, cleanMessage);

      setMessage("");
      await onMessageSent();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send message."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      {error ? (
        <p className="mb-2 text-xs font-semibold text-[#d58a72]">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg sm:gap-2"
      >
        <button
          type="button"
          disabled={!sessionId || isSending}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--card-soft)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
          aria-label="Assistant settings"
        >
          <SlidersHorizontal size={17} />
        </button>

        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={!sessionId || isSending}
          placeholder={
            sessionId
              ? "Ask your kitchen assistant..."
              : "Create a chat to start messaging"
          }
          className="h-9 min-w-0 flex-1 bg-transparent px-1 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!sessionId || !message.trim() || isSending}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
          aria-label="Send message"
        >
          {isSending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <SendHorizontal size={16} />
          )}
        </button>
      </form>
    </div>
  );
}