"use client";

import { AssistantChatMessage } from "@/app/types/assistant";
import { Bot, LoaderCircle, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
          <LoaderCircle size={18} className="animate-spin" />
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
            Create a chat to ask about meals, groceries, or your kitchen stock.
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
            Ask for meal ideas, recipes, grocery suggestions, or ways to use
            your available stock.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {messages.map((message, index) => {
        const isUser = message.role.toLowerCase() === "user";
        const isAssistant = !isUser;

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
              className={`max-w-[85%] overflow-hidden rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
                isUser
                  ? "whitespace-pre-wrap rounded-br-md bg-[var(--primary)] text-[var(--on-primary)]"
                  : "rounded-bl-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
              }`}
            >
              {isTypingMessage ? (
                <TypingIndicator />
              ) : isUser ? (
                message.content
              ) : (
                <AssistantMarkdown content={message.content} />
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

type AssistantMarkdownProps = {
  content: string;
};

function AssistantMarkdown({ content }: AssistantMarkdownProps) {
  return (
    <div className="min-w-0 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 last:mb-0">{children}</p>
          ),

          strong: ({ children }) => (
            <strong className="font-extrabold text-[var(--foreground)]">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-[var(--foreground-soft)]">
              {children}
            </em>
          ),

          h1: ({ children }) => (
            <h1 className="mb-3 mt-5 text-xl font-extrabold text-[var(--foreground)] first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-5 text-lg font-extrabold text-[var(--foreground)] first:mt-0">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-bold text-[var(--foreground)] first:mt-0">
              {children}
            </h3>
          ),

          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1 marker:text-[var(--primary)]">
              {children}
            </li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--primary-soft)] underline decoration-[var(--primary)] underline-offset-2 transition hover:opacity-80"
            >
              {children}
            </a>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-[var(--primary)] bg-[var(--card-soft)] py-2 pl-4 pr-3 italic text-[var(--foreground-soft)]">
              {children}
            </blockquote>
          ),

          hr: () => (
            <hr className="my-4 border-0 border-t border-[var(--border)]" />
          ),

          code: ({ children, className }) => {
            const isCodeBlock = Boolean(className);

            if (isCodeBlock) {
              return (
                <code className="block min-w-max font-mono text-xs text-[var(--foreground-soft)]">
                  {children}
                </code>
              );
            }

            return (
              <code className="rounded-md bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs text-[var(--primary-soft)]">
                {children}
              </code>
            );
          },

          pre: ({ children }) => (
            <pre className="my-3 max-w-full overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
              {children}
            </pre>
          ),

          table: ({ children }) => (
            <div className="my-3 max-w-full overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[420px] border-collapse text-left text-xs">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-[var(--surface-muted)]">{children}</thead>
          ),

          th: ({ children }) => (
            <th className="border-b border-r border-[var(--border)] px-3 py-2 font-bold text-[var(--foreground)] last:border-r-0">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border-b border-r border-[var(--border)] px-3 py-2 text-[var(--foreground-soft)] last:border-r-0">
              {children}
            </td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
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