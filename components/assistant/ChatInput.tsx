"use client";

import {
  LoaderCircle,
  SendHorizontal
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent
} from "react";

type ChatInputProps = {
  sessionId: string | null;
  value: string;
  isSending?: boolean;
  onValueChange: (value: string) => void;
  onSendMessage: (message: string) => Promise<void>;
};

export function ChatInput({
  sessionId,
  value,
  isSending = false,
  onValueChange,
  onSendMessage
}: ChatInputProps) {
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedMessage = value.trim();

    if (
      !trimmedMessage ||
      !sessionId ||
      isSending
    ) {
      return;
    }

    // Clear the input immediately.
    onValueChange("");

    try {
      await onSendMessage(trimmedMessage);
    } catch {
      // Restore the message when sending fails unexpectedly.
      onValueChange(trimmedMessage);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg"
    >
      <textarea
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={
          sessionId
            ? "Ask KitchCue anything..."
            : "Create a chat to start messaging"
        }
        disabled={!sessionId || isSending}
        rows={1}
        className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={
          !sessionId ||
          isSending ||
          !value.trim()
        }
        aria-label="Send message"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSending ? (
          <LoaderCircle
            size={17}
            className="animate-spin"
          />
        ) : (
          <SendHorizontal size={17} />
        )}
      </button>
    </form>
  );
}