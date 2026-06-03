"use client";

import Link from "next/link";
import { CheckCircle2, Pencil, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { HomeLowStockItem } from "@/app/types/home";

type LowStockCardProps = {
  items: HomeLowStockItem[];
  onAddToShoppingList?: (itemId: string) => Promise<void> | void;
  onUpdateQuantity?: (itemId: string, quantity: number) => Promise<void> | void;
};

function getItemDetail(item: HomeLowStockItem) {
  if (item.quantity === null || item.quantity === undefined) {
    return "Quantity not set";
  }

  return `${item.quantity} ${item.unit || ""} left`.trim();
}

export function LowStockCard({
  items,
  onAddToShoppingList,
  onUpdateQuantity
}: LowStockCardProps) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [quantityValue, setQuantityValue] = useState("");
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  function openQuantityEditor(item: HomeLowStockItem) {
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

  async function handleAddToList(itemId: string) {
    try {
      setLoadingItemId(itemId);
      await onAddToShoppingList?.(itemId);
    } finally {
      setLoadingItemId(null);
    }
  }

  async function handleSaveQuantity(itemId: string) {
    const nextQuantity = Number(quantityValue);

    if (Number.isNaN(nextQuantity) || nextQuantity < 0) return;

    try {
      setLoadingItemId(itemId);
      await onUpdateQuantity?.(itemId, nextQuantity);
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
            Kitchen Watch
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--foreground)] lg:text-lg">
            Stock Alerts
          </h2>
        </div>

        <Link
          className="text-sm font-bold text-[var(--primary)] transition hover:opacity-80 lg:text-xs"
          href="/stock"
        >
          View Pantry
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 text-sm font-medium text-[var(--muted)]">
          No stock alerts right now. Your pantry looks good.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {items.map((item) => {
            const level = item.stockLevel ?? 0;
            const isEditing = editingItemId === item.id;
            const isLoading = loadingItemId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-4 transition hover:border-[var(--primary)]/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[var(--muted)]">
                      {level <= 10 ? "Low Stock" : "Running Low"}
                    </p>

                    <span className="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)]">
                      {level}%
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold text-[var(--foreground)] lg:text-sm">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                        {getItemDetail(item)}
                      </p>
                    </div>

                    {!isEditing ? (
                      <div className="flex shrink-0 items-center gap-1.5">
                        {item.isShoppingList ? (
                          <span
                            className="grid h-8 w-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary)_22%,var(--card))] text-[var(--primary-soft)]"
                            title="Added to shopping list"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddToList(item.id)}
                            disabled={isLoading}
                            title="Add to shopping list"
                            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 disabled:opacity-50"
                          >
                            <ShoppingBasket className="h-4 w-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openQuantityEditor(item)}
                          disabled={isLoading}
                          title="Update stock quantity"
                          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary)] transition hover:border-[var(--secondary)] hover:bg-[var(--secondary)]/10 disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)]"
                      style={{ width: `${Math.max(level, 8)}%` }}
                    />
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Update quantity after refill
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={quantityValue}
                        onChange={(event) =>
                          setQuantityValue(event.target.value)
                        }
                        className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        placeholder="New quantity"
                      />

                      <button
                        type="button"
                        onClick={() => handleSaveQuantity(item.id)}
                        disabled={isLoading}
                        className="rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={closeQuantityEditor}
                        disabled={isLoading}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:text-[var(--foreground)] disabled:opacity-50"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}