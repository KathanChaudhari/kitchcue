"use client";

import { LoaderCircle, SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

type ChatInputProps = {
  sessionId: string | null;
  isSending?: boolean;
  onSendMessage: (message: string) => Promise<void>;
};

export function ChatInput({
  sessionId,
  isSending = false,
  onSendMessage
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || !sessionId || isSending) {
      return;
    }

    // Clear immediately, so the input feels responsive.
    setMessage("");

    try {
      await onSendMessage(trimmedMessage);
    } catch {
      // Restore the text if sending unexpectedly throws.
      setMessage(trimmedMessage);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg"
    >
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={
          sessionId
            ? "Ask KitchCue anything..."
            : "Create a chat to start messaging"
        }
        disabled={!sessionId || isSending}
        rows={1}
        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60"
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
      />

      <button
        type="submit"
        disabled={
          !sessionId ||
          isSending ||
          !message.trim()
        }
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        {isSending ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <SendHorizontal size={17} />
        )}
      </button>
    </form>
  );
}