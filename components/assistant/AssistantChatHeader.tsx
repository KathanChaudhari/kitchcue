"use client";

import { ChevronDown, MoreVertical, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const chats = ["Weekend Meal Prep", "Dinner ideas", "Weekly grocery", "Breakfast plan"];

export function AssistantChatHeader() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)] py-2">
      <div className="flex items-center justify-between gap-3">
        <label className="relative">
          <select
            value={selectedChat}
            onChange={(event) => setSelectedChat(event.target.value)}
            className="h-9 appearance-none rounded-lg bg-transparent pr-7 text-base font-extrabold text-[var(--foreground)] outline-none"
          >
            {chats.map((chat) => (
              <option key={chat} value={chat}>
                {chat}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />
        </label>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            aria-label="Chat options"
          >
            <MoreVertical size={18} />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-9 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card-soft)]"
              >
                <Plus size={14} />
                New chat
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card-soft)]"
              >
                <Pencil size={14} />
                Edit chat
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold text-[#d58a72] hover:bg-[var(--card-soft)]"
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