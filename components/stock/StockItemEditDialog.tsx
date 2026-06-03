"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { InventoryItem } from "@/app/types/stock";
import { updateStockItem } from "@/lib/client/stock";

type StockItemEditDialogProps = {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
};

export function StockItemEditDialog({
  item,
  isOpen,
  onClose,
  onUpdated
}: StockItemEditDialogProps) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(
    item.quantity !== null && item.quantity !== undefined
      ? String(item.quantity)
      : ""
  );
  const [unit, setUnit] = useState(item.unit || "");
  const [category, setCategory] = useState(item.category || "");
  const [minimumQuantity, setMinimumQuantity] = useState(
    item.minimumQuantity !== null && item.minimumQuantity !== undefined
      ? String(item.minimumQuantity)
      : ""
  );
  const [isShoppingList, setIsShoppingList] = useState(item.isShoppingList);
  const [isPurchased, setIsPurchased] = useState(item.isPurchased);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setName(item.name);
    setQuantity(
      item.quantity !== null && item.quantity !== undefined
        ? String(item.quantity)
        : ""
    );
    setUnit(item.unit || "");
    setCategory(item.category || "");
    setMinimumQuantity(
      item.minimumQuantity !== null && item.minimumQuantity !== undefined
        ? String(item.minimumQuantity)
        : ""
    );
    setIsShoppingList(item.isShoppingList);
    setIsPurchased(item.isPurchased);
  }, [isOpen, item]);

  if (!isOpen) return null;

  async function handleSave() {
    if (!name.trim()) return;

    try {
      setIsSaving(true);

      await updateStockItem(item.id, {
        name: name.trim(),
        quantity: quantity.trim() ? Number(quantity) : null,
        unit: unit.trim() || null,
        category: category.trim() || null,
        minimumQuantity: minimumQuantity.trim()
          ? Number(minimumQuantity)
          : null,
        isShoppingList,
        isPurchased
      });

      onClose();
      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 px-4 pb-4 sm:items-center sm:pb-0">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-4 py-3">
          <div>
            <h2 className="text-base font-extrabold text-[var(--foreground)]">
              Edit stock item
            </h2>

            <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
              Update item details and stock quantity.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <label className="block space-y-1">
            <span className="text-xs font-bold text-[var(--muted)]">
              Item name
            </span>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-bold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              placeholder="Tomatoes"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-xs font-bold text-[var(--muted)]">
                Quantity
              </span>

              <input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min="0"
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                placeholder="1"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-bold text-[var(--muted)]">
                Unit
              </span>

              <input
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                placeholder="kg"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-xs font-bold text-[var(--muted)]">
              Category
            </span>

            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              placeholder="Vegetables"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-bold text-[var(--muted)]">
              Low at
            </span>

            <input
              value={minimumQuantity}
              onChange={(event) => setMinimumQuantity(event.target.value)}
              type="number"
              min="0"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              placeholder="1"
            />
          </label>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-xs font-bold text-[var(--muted)]">
                In shopping list
              </span>

              <input
                type="checkbox"
                checked={isShoppingList}
                onChange={(event) => setIsShoppingList(event.target.checked)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-xs font-bold text-[var(--muted)]">
                Refilled
              </span>

              <input
                type="checkbox"
                checked={isPurchased}
                onChange={(event) => setIsPurchased(event.target.checked)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="h-10 cursor-pointer rounded-xl border border-[var(--border)] px-4 text-sm font-extrabold text-[var(--foreground)] transition hover:bg-[var(--card)] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="h-10 cursor-pointer rounded-xl bg-[var(--primary)] px-4 text-sm font-extrabold text-[var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}