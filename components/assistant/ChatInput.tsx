"use client";

import { LoaderCircle, SendHorizontal } from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  useCallback
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
  const sendMessage = useCallback(async () => {
    const trimmedMessage = value.trim();

    if (!trimmedMessage || !sessionId || isSending) {
      return;
    }

    onValueChange("");

    try {
      await onSendMessage(trimmedMessage);
    } catch (error) {
      console.error("Failed to send message:", error);

      // Restore the message if sending fails.
      onValueChange(trimmedMessage);
    }
  }, [
    value,
    sessionId,
    isSending,
    onValueChange,
    onSendMessage
  ]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    await sendMessage();
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
      void sendMessage();
    }
  }

  const isDisabled =
    !sessionId ||
    isSending ||
    !value.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 flex w-full items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg"
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
        className="max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
      />

      <button
        type="button"
        disabled={isDisabled}
        aria-label="Send message"
        onClick={() => {
          void sendMessage();
        }}
        className="relative z-20 grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-lg bg-[var(--primary)] text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSending ? (
          <LoaderCircle
            size={17}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          <SendHorizontal
            size={17}
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}