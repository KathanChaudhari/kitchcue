"use client";

import { InventoryItem } from "@/app/types/stock";
import { updateStockItem } from "@/lib/client/stock";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type StockItemEditDialogProps = {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
};

const defaultCategories = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Grains",
  "Spices",
  "Snacks",
  "Beverages",
  "Other"
];

const units = ["kg", "g", "litre", "ml", "pcs", "pack", "bottle", "box"];

function isDefaultCategory(category: string) {
  return defaultCategories.includes(category);
}

export function StockItemEditDialog({
  item,
  isOpen,
  onClose,
  onUpdated
}: StockItemEditDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [customCategory, setCustomCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [unit, setUnit] = useState("pcs");

  const [isShoppingList, setIsShoppingList] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const itemCategory = item.category?.trim() || "Other";

    setName(item.name);

    if (isDefaultCategory(itemCategory)) {
      setCategory(itemCategory);
      setCustomCategory("");
    } else {
      setCategory("Custom");
      setCustomCategory(itemCategory);
    }

    setQuantity(
      item.quantity !== null && item.quantity !== undefined
        ? String(item.quantity)
        : ""
    );

    setMinimumQuantity(
      item.minimumQuantity !== null && item.minimumQuantity !== undefined
        ? String(item.minimumQuantity)
        : ""
    );

    setUnit(item.unit || "pcs");
    setIsShoppingList(item.isShoppingList);
    setIsPurchased(item.isPurchased);
    setError("");
  }, [isOpen, item]);

  if (!isOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const finalCategory =
      category === "Custom" ? customCategory.trim() : category;

    if (!name.trim()) {
      setError("Item name is required.");
      return;
    }

    if (!finalCategory) {
      setError("Category is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await updateStockItem(item.id, {
        name: name.trim(),
        category: finalCategory,
        quantity: quantity.trim() ? Number(quantity) : null,
        minimumQuantity: minimumQuantity.trim()
          ? Number(minimumQuantity)
          : null,
        unit: unit || null,
        isShoppingList,
        isPurchased
      });

      onUpdated?.();
      onClose();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to update item"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close edit stock form"
        onClick={onClose}
        disabled={isSaving}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl sm:p-5">
        <div className="mb-5 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--foreground)]">
              Edit stock item
            </h2>

            <p className="mt-1 text-xs font-medium leading-5 text-[var(--muted)]">
              Update item details in your kitchen inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit stock form"
            className="grid size-9 shrink-0 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--card-soft)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-[var(--muted)]">
              Item name
            </span>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder=""
              disabled={isSaving}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <div
            className={`grid gap-3 ${
              category === "Custom" ? "sm:grid-cols-2" : ""
            }`}
          >
            <label className="space-y-1.5">
              <span className="text-xs font-bold text-[var(--muted)]">
                Category
              </span>

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);

                  if (event.target.value !== "Custom") {
                    setCustomCategory("");
                  }
                }}
                disabled={isSaving}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {defaultCategories.map((categoryOption) => (
                  <option key={categoryOption} value={categoryOption}>
                    {categoryOption}
                  </option>
                ))}

                <option value="Custom">Add new category</option>
              </select>
            </label>

            {category === "Custom" ? (
              <label className="space-y-1.5">
                <span className="text-xs font-bold text-[var(--muted)]">
                  New category
                </span>

                <input
                  value={customCategory}
                  onChange={(event) =>
                    setCustomCategory(event.target.value)
                  }
                  placeholder="Frozen Food"
                  disabled={isSaving}
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="min-w-0 space-y-1.5">
              <span className="text-xs font-bold text-[var(--muted)]">
                Quantity
              </span>

              <input
                type="number"
                min="0"
                step="any"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder=""
                disabled={isSaving}
                className="h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-xs font-bold text-[var(--muted)]">
                Unit
              </span>

              <select
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                disabled={isSaving}
                className="h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {units.map((unitOption) => (
                  <option key={unitOption} value={unitOption}>
                    {unitOption}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-[var(--muted)]">
              Minimum quantity
            </span>

            <input
              type="number"
              min="0"
              step="any"
              value={minimumQuantity}
              onChange={(event) =>
                setMinimumQuantity(event.target.value)
              }
              placeholder="Alert me when stock reaches this level"
              disabled={isSaving}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]/50 focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          {error ? (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="h-10 rounded-xl px-4 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--card-soft)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="h-10 rounded-xl bg-[var(--primary)] px-5 text-sm font-extrabold text-[var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}