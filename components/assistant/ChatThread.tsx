"use client";

import { AssistantChatMessage } from "@/app/types/assistant";
import {
  Bot,
  LoaderCircle,
  MessageCircle
} from "lucide-react";

type ChatThreadProps = {
  messages: AssistantChatMessage[];
  isLoading?: boolean;
  isStreaming?: boolean;
  hasSelectedChat: boolean;
};

export function ChatThread({
  messages,
  isLoading = false,
  isStreaming = false,
  hasSelectedChat
}: ChatThreadProps) {
  /*
   * Show the full loading state only while initially loading
   * or switching to a conversation that has no local messages.
   */
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
          Loading messages
        </div>
      </div>
    );
  }

  if (!hasSelectedChat) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 text-center">
        <div>
          <MessageCircle
            size={28}
            className="mx-auto mb-3 text-[var(--primary)]"
          />

          <h2 className="text-base font-bold text-[var(--foreground)]">
            Start a new conversation
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Create a chat to ask about meals, groceries, or your
            kitchen stock.
          </p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 text-center">
        <div>
          <Bot
            size={30}
            className="mx-auto mb-3 text-[var(--primary)]"
          />

          <h2 className="text-base font-bold text-[var(--foreground)]">
            How can I help with your kitchen?
          </h2>

          <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
            Ask for meal ideas, recipes, grocery suggestions, or ways
            to use your available stock.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {messages.map((message, index) => {
        const isUser =
          message.role.toLowerCase() === "user";

        const isAssistant = !isUser;

        /*
         * The temporary assistant message is appended last with empty
         * content. Show typing dots until the first streamed chunk arrives.
         */
        const isTypingMessage =
          isStreaming &&
          isAssistant &&
          message.content.length === 0 &&
          index === messages.length - 1;

        return (
          <div
            key={message.id}
            className={`flex ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
                isUser
                  ? "rounded-br-md bg-[var(--primary)] text-white"
                  : "rounded-bl-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
              }`}
            >
              {isTypingMessage ? (
                <TypingIndicator />
              ) : (
                message.content
              )}
            </div>
          </div>
        );
      })}

      {isLoading ? (
        <div className="flex justify-center py-1">
          <LoaderCircle
            size={16}
            className="animate-spin text-[var(--muted)]"
          />
        </div>
      ) : null}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div
      className="flex h-6 items-center gap-1"
      aria-label="KitchCue is responding"
    >
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)]" />
    </div>
  );
}