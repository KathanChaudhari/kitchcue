"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StockItemActionMenuProps = {
  itemName: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function StockItemActionMenu({
  itemName,
  onEdit,
  onDelete
}: StockItemActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEdit() {
    setIsOpen(false);
    onEdit();
  }

  function handleDelete() {
    setIsOpen(false);
    onDelete();
  }

  return (
    <div ref={menuRef} className="relative z-40 shrink-0 overflow-visible">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid size-8 cursor-pointer place-items-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)]"
        aria-label={`Open actions for ${itemName}`}
      >
        <MoreVertical className="size-4" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-9 z-[100] w-40 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-1 shadow-2xl">
         <button
  type="button"
  onClick={handleEdit}
  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-[var(--foreground)] transition hover:bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] hover:text-[var(--primary-soft)]"
>
  <Pencil className="size-3.5 text-[var(--primary)]" />
  Edit
</button>

          <button
  type="button"
  onClick={handleDelete}
  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-[var(--secondary)] transition hover:bg-[color-mix(in_srgb,var(--secondary)_14%,transparent)]"
>
  <Trash2 className="size-3.5" />
  Delete
</button>
        </div>
      ) : null}
    </div>
  );
}