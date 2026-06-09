"use client";

import {
  ChevronDown,
  LoaderCircle,
  MoreVertical,
  Pencil,
  Plus,
  Trash2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AssistantChatSession } from "@/app/types/assistant";

type AssistantChatHeaderProps = {
  chats: AssistantChatSession[];
  selectedChatId: string | null;
  isLoading?: boolean;
  isMutating?: boolean;
  onSelectChat: (sessionId: string) => void;
  onCreateChat: () => Promise<void>;
  onRenameChat: (sessionId: string, title: string) => Promise<void>;
  onDeleteChat: (sessionId: string) => Promise<void>;
};

export function AssistantChatHeader({
  chats,
  selectedChatId,
  isLoading = false,
  isMutating = false,
  onSelectChat,
  onCreateChat,
  onRenameChat,
  onDeleteChat
}: AssistantChatHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameTitle, setRenameTitle] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const renameInputRef = useRef<HTMLInputElement | null>(null);

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) ?? null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isRenaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [isRenaming]);

  function openRenameInput() {
    if (!selectedChat) return;

    setRenameTitle(selectedChat.title);
    setIsRenaming(true);
    setIsMenuOpen(false);
  }

  function cancelRename() {
    setRenameTitle("");
    setIsRenaming(false);
  }

  async function submitRename() {
    const cleanTitle = renameTitle.trim();

    if (!selectedChat || !cleanTitle) return;

    await onRenameChat(selectedChat.id, cleanTitle);
    setIsRenaming(false);
    setRenameTitle("");
  }

  async function handleCreateChat() {
    setIsMenuOpen(false);
    await onCreateChat();
  }

  async function handleDeleteChat() {
    if (!selectedChat) return;

    const shouldDelete = window.confirm(
      `Delete "${selectedChat.title}"? This will also delete its messages.`
    );

    if (!shouldDelete) return;

    setIsMenuOpen(false);
    await onDeleteChat(selectedChat.id);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)] py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          {isRenaming ? (
            <div className="flex max-w-sm items-center gap-2">
              <input
                ref={renameInputRef}
                value={renameTitle}
                onChange={(event) => setRenameTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void submitRename();
                  }

                  if (event.key === "Escape") {
                    cancelRename();
                  }
                }}
                disabled={isMutating}
                className="h-9 min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-bold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                placeholder="Chat title"
              />

              <button
                type="button"
                onClick={() => void submitRename()}
                disabled={!renameTitle.trim() || isMutating}
                className="h-9 rounded-lg bg-[var(--primary)] px-3 text-xs font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </button>

              <button
                type="button"
                onClick={cancelRename}
                disabled={isMutating}
                className="h-9 rounded-lg px-2 text-xs font-bold text-[var(--muted)] transition hover:bg-[var(--card)]"
              >
                Cancel
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex h-9 items-center gap-2 text-sm font-bold text-[var(--muted)]">
              <LoaderCircle size={16} className="animate-spin" />
              Loading chats
            </div>
          ) : chats.length > 0 && selectedChatId ? (
            <label className="relative inline-block max-w-full">
              <select
                value={selectedChatId}
                onChange={(event) => onSelectChat(event.target.value)}
                className="h-9 max-w-[250px] appearance-none truncate rounded-lg bg-transparent pr-7 text-base font-extrabold text-[var(--foreground)] outline-none sm:max-w-sm"
              >
                {chats.map((chat) => (
                  <option key={chat.id} value={chat.id}>
                    {chat.title}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </label>
          ) : (
            <p className="text-base font-extrabold text-[var(--foreground)]">
              Kitchen assistant
            </p>
          )}
        </div>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            disabled={isLoading || isMutating || isRenaming}
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Chat options"
            aria-expanded={isMenuOpen}
          >
            {isMutating ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <MoreVertical size={18} />
            )}
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => void handleCreateChat()}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card-soft)]"
              >
                <Plus size={14} />
                New chat
              </button>

              <button
                type="button"
                onClick={openRenameInput}
                disabled={!selectedChat}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Pencil size={14} />
                Rename chat
              </button>

              <button
                type="button"
                onClick={() => void handleDeleteChat()}
                disabled={!selectedChat}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[#d58a72] hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={14} />
                Delete chat
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}