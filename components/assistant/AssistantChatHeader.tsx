"use client";

import {
  Check,
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
  const [isChatDropdownOpen, setIsChatDropdownOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameTitle, setRenameTitle] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const chatDropdownRef = useRef<HTMLDivElement | null>(null);
  const renameInputRef = useRef<HTMLInputElement | null>(null);

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) ?? null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedNode = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(clickedNode)
      ) {
        setIsMenuOpen(false);
      }

      if (
        chatDropdownRef.current &&
        !chatDropdownRef.current.contains(clickedNode)
      ) {
        setIsChatDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setIsChatDropdownOpen(false);
  }

  function cancelRename() {
    setRenameTitle("");
    setIsRenaming(false);
  }

  async function submitRename() {
    const cleanTitle = renameTitle.trim();

    if (!selectedChat || !cleanTitle || isMutating) return;

    await onRenameChat(selectedChat.id, cleanTitle);

    setIsRenaming(false);
    setRenameTitle("");
  }

  async function handleCreateChat() {
    if (isMutating) return;

    setIsMenuOpen(false);
    setIsChatDropdownOpen(false);

    await onCreateChat();
  }

  function handleSelectChat(sessionId: string) {
    setIsChatDropdownOpen(false);

    if (sessionId === selectedChatId) return;

    onSelectChat(sessionId);
  }

  async function handleDeleteChat() {
    if (!selectedChat || isMutating) return;

    const shouldDelete = window.confirm(
      `Delete "${selectedChat.title}"? This will also delete its messages.`
    );

    if (!shouldDelete) return;

    setIsMenuOpen(false);
    setIsChatDropdownOpen(false);

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
                maxLength={80}
                className="h-9 min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-bold text-[var(--foreground)] outline-none focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Chat title"
              />

              <button
                type="button"
                onClick={() => void submitRename()}
                disabled={!renameTitle.trim() || isMutating}
                className="grid h-9 min-w-[52px] place-items-center rounded-lg bg-[var(--primary)] px-3 text-xs font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isMutating ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>

              <button
                type="button"
                onClick={cancelRename}
                disabled={isMutating}
                className="h-9 rounded-lg px-2 text-xs font-bold text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex h-9 items-center gap-2 text-sm font-bold text-[var(--muted)]">
              <LoaderCircle size={16} className="animate-spin" />
              Loading chats
            </div>
          ) : chats.length > 0 && selectedChat ? (
            <div
              ref={chatDropdownRef}
              className="relative inline-block max-w-full"
            >
              <button
                type="button"
                onClick={() => {
                  setIsChatDropdownOpen((value) => !value);
                  setIsMenuOpen(false);
                }}
                disabled={isMutating}
                className="flex h-9 max-w-[250px] items-center gap-1.5 rounded-lg text-left text-base font-extrabold text-[var(--foreground)] outline-none transition hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-sm"
                aria-label="Select chat"
                aria-expanded={isChatDropdownOpen}
              >
                <span className="min-w-0 truncate">
                  {selectedChat.title}
                </span>

                <ChevronDown
                  size={15}
                  className={`shrink-0 text-[var(--muted)] transition-transform ${
                    isChatDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isChatDropdownOpen ? (
                <div className="absolute left-0 top-full z-40 mt-1.5 w-64 max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() => void handleCreateChat()}
                    disabled={isMutating}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={15} />
                    New chat
                  </button>

                  <div className="my-1 border-t border-[var(--border)]" />

                  <div className="max-h-64 overflow-y-auto">
                    {chats.map((chat) => {
                      const isSelected = chat.id === selectedChatId;

                      return (
                        <button
                          key={chat.id}
                          type="button"
                          onClick={() => handleSelectChat(chat.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            isSelected
                              ? "bg-[var(--card-soft)] font-bold text-[var(--foreground)]"
                              : "font-semibold text-[var(--muted)] hover:bg-[var(--card-soft)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          <span className="min-w-0 truncate">
                            {chat.title}
                          </span>

                          {isSelected ? (
                            <Check
                              size={15}
                              className="shrink-0 text-[var(--primary)]"
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void handleCreateChat()}
              disabled={isMutating}
              className="flex h-9 items-center gap-2 rounded-lg text-base font-extrabold text-[var(--foreground)] transition hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isMutating ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}

              Create first chat
            </button>
          )}
        </div>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((value) => !value);
              setIsChatDropdownOpen(false);
            }}
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
            <div className="absolute right-0 top-full z-40 mt-1.5 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => void handleCreateChat()}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--card-soft)]"
              >
                <Plus size={14} />
                New chat
              </button>

              <button
                type="button"
                onClick={openRenameInput}
                disabled={!selectedChat}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Pencil size={14} />
                Rename chat
              </button>

              <button
                type="button"
                onClick={() => void handleDeleteChat()}
                disabled={!selectedChat}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[#d58a72] transition hover:bg-[var(--card-soft)] disabled:cursor-not-allowed disabled:opacity-40"
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