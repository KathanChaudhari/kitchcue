"use client";

import { Check, CheckCircle2, Pencil, ShoppingBasket, X } from "lucide-react";
import { useMemo, useState } from "react";
import { HomeShoppingItem } from "@/app/types/home";

type ShoppingListCardProps = {
  items: HomeShoppingItem[];
  onRemoveFromShoppingList?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => Promise<void> | void;
};

export function ShoppingListCard({
  items,
  onRemoveFromShoppingList,
  onUpdateQuantity
}: ShoppingListCardProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [quantityValue, setQuantityValue] = useState("");
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const selectedCount = selectedIds.length;
  const allSelected = items.length > 0 && selectedCount === items.length;

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  function toggleItem(itemId: string) {
    setSelectedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(items.map((item) => item.id));
  }

  function openQuantityEditor(item: HomeShoppingItem) {
    setEditingItemId(item.id);
    setQuantityValue(
      item.quantity === null || item.quantity === undefined
        ? ""
        : String(item.quantity)
    );
  }

  function closeQuantityEditor() {
    setEditingItemId(null);
    setQuantityValue("");
  }

  async function handleSaveQuantity(itemId: string) {
    const nextQuantity = Number(quantityValue);

    if (Number.isNaN(nextQuantity) || nextQuantity < 0) return;

    try {
      setLoadingItemId(itemId);
      await onUpdateQuantity?.(itemId, nextQuantity);

      setSelectedIds((prev) => prev.filter((id) => id !== itemId));
      closeQuantityEditor();
    } finally {
      setLoadingItemId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm lg:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Shopping Queue
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--foreground)] lg:text-lg">
            Shopping List
          </h2>
        </div>

        <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-soft)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)]">
              <ShoppingBasket className="h-4 w-4 text-[var(--primary)]" />
            </div>

            <h3 className="text-sm font-extrabold text-[var(--foreground)]">
              {items.length} Queued
            </h3>
          </div>

          {selectedCount > 0 ? (
            <button
              type="button"
              onClick={toggleSelectAll}
              className="text-xs font-bold text-[var(--primary)] transition hover:opacity-80"
            >
              {allSelected ? "Clear" : "Select all"}
            </button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="px-4 py-5 text-sm font-medium text-[var(--muted)]">
            Nothing added to your shopping list yet.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {items.map((item) => {
              const isSelected = selectedIdSet.has(item.id);
              const isEditing = editingItemId === item.id;
              const isLoading = loadingItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="px-4 py-3 transition hover:bg-[var(--surface)]"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--ink)]"
                          : "border-[var(--border)] bg-transparent text-transparent hover:border-[var(--primary)]"
                      }`}
                      aria-label={`Select ${item.name}`}
                    >
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    <p
                      className={`min-w-0 flex-1 truncate text-sm font-bold ${
                        isSelected
                          ? "text-[var(--primary-soft)]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {item.name}
                    </p>

                    {isSelected ? (
  <button
    type="button"
    onClick={() => openQuantityEditor(item)}
    disabled={isLoading}
    className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-[var(--primary)] px-2 text-[10px] font-bold text-[var(--primary)] transition hover:bg-[var(--primary)]/10 disabled:opacity-50"
  >
    <Pencil className="h-3 w-3" />
    Add
  </button>
) : null}

                    {onRemoveFromShoppingList ? (
                      <button
                        type="button"
                        onClick={() => onRemoveFromShoppingList(item.id)}
                        disabled={isLoading}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--secondary)] hover:bg-[var(--secondary)]/10 hover:text-[var(--secondary)] disabled:opacity-50"
                        aria-label={`Remove ${item.name} from shopping list`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                  {isEditing ? (
  <div className="mt-2 flex items-center justify-end gap-1.5">
    <input
      type="number"
      min="0"
      max="99999"
      value={quantityValue}
      onChange={(event) => setQuantityValue(event.target.value.slice(0, 5))}
      className="h-7 w-20 rounded-md border border-[var(--border)] bg-[var(--card)] px-1.5 text-center text-xs font-bold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
      placeholder="Qty"
    />

    <button
      type="button"
      onClick={() => handleSaveQuantity(item.id)}
      disabled={isLoading}
      className="grid h-7 w-7 place-items-center rounded-md bg-[var(--primary)] text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
      aria-label="Save quantity"
      title="Save quantity"
    >
      <Check className="h-4 w-4" />
    </button>

    <button
      type="button"
      onClick={closeQuantityEditor}
      disabled={isLoading}
      className="grid h-7 w-7 place-items-center rounded-md text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:opacity-50"
      aria-label="Cancel"
      title="Cancel"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </div>
) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="button"
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
          allSelected
            ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--ink)]"
            : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
        }`}
      >
        {allSelected ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Added
          </>
        ) : (
          <>
            <ShoppingBasket className="h-4 w-4" />
            Go to Blinkit
          </>
        )}
      </button>
    </section>
  );
}