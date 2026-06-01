"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { InventoryItem } from "@/app/types/stock";
import { deleteStockItem } from "@/lib/client/stock";

type StockItemDeleteDialogProps = {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export function StockItemDeleteDialog({
  item,
  isOpen,
  onClose,
  onDeleted
}: StockItemDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteStockItem(item.id);

      onClose();
      onDeleted?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 px-4 pb-4 sm:items-center sm:pb-0">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--secondary)_16%,transparent)] text-[var(--secondary)]">
  <AlertTriangle className="size-4" />
</div>

            <div>
              <h2 className="text-base font-extrabold text-[var(--foreground)]">
                Delete stock item?
              </h2>

              <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm font-medium leading-relaxed text-[var(--muted)]">
            Are you sure you want to delete{" "}
            <span className="font-extrabold text-[var(--foreground)]">
              {item.name}
            </span>{" "}
            from your kitchen stock?
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-10 cursor-pointer rounded-xl border border-[var(--border)] px-4 text-sm font-extrabold text-[var(--foreground)] transition hover:bg-[var(--card)] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
  type="button"
  onClick={handleDelete}
  disabled={isDeleting}
  className="h-10 cursor-pointer rounded-xl bg-[color-mix(in_srgb,var(--secondary)_18%,transparent)] px-4 text-sm font-extrabold text-[var(--secondary)] transition hover:bg-[color-mix(in_srgb,var(--secondary)_26%,transparent)] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isDeleting ? "Deleting..." : "Delete item"}
</button>
        </div>
      </div>
    </div>
  );
}