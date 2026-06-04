"use client";

import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Pencil,
  ShoppingBasket,
  X
} from "lucide-react";
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
    <section className="min-w-0 rounded-[1.75rem] bg-[var(--card)] p-4 shadow-sm lg:rounded-2xl lg:border lg:border-[var(--border)] lg:p-5">
      <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Kitchen Watch
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--foreground)] lg:text-lg">
            Stock Alerts
          </h2>

          <p className="mt-1 text-xs font-medium text-[var(--muted)] lg:hidden">
            Items that need refill soon
          </p>
        </div>

        <Link
          className="shrink-0 rounded-full bg-[color-mix(in_srgb,var(--primary)_18%,var(--card-soft))] px-3 py-2 text-xs font-bold text-[var(--primary-soft)] transition hover:opacity-80 lg:bg-transparent lg:px-0 lg:py-0 lg:text-[var(--primary)]"
          href="/stock"
        >
          View Pantry
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[var(--card-soft)] p-4 text-sm font-medium text-[var(--muted)] lg:border lg:border-[var(--border)]">
          No stock alerts right now. Your pantry looks good.
        </div>
      ) : (
        <div className="max-h-[520px] space-y-3 overflow-y-auto overflow-x-hidden scrollbar-hide lg:max-h-none lg:space-y-3 lg:overflow-visible">
          {items.map((item) => {
            const level = item.stockLevel ?? 0;
            const isEditing = editingItemId === item.id;
            const isLoading = loadingItemId === item.id;

            return (
              <div
                key={item.id}
                className="min-w-0 overflow-hidden rounded-2xl bg-[var(--card-soft)] p-4 transition hover:bg-[color-mix(in_srgb,var(--card-soft)_86%,var(--primary)_14%)] lg:border lg:border-[var(--border)] lg:hover:border-[var(--primary)]/60"
              >
                <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
                  <span className="shrink-0 rounded-full bg-[color-mix(in_srgb,var(--secondary)_18%,var(--card))] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--secondary)]">
                    {level <= 10 ? "Low Stock" : "Running Low"}
                  </span>

                  <span className="shrink-0 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-extrabold text-[var(--primary-soft)]">
                    {level}%
                  </span>
                </div>

                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-extrabold text-[var(--foreground)] lg:text-sm">
                      {item.name}
                    </h3>

                    <p className="mt-1 truncate text-sm font-medium text-[var(--muted)] lg:text-xs">
                      {getItemDetail(item)}
                    </p>
                  </div>

                  {!isEditing ? (
                    <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
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

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[var(--surface-muted)] lg:mt-3 lg:h-2">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{ width: `${Math.max(level, 8)}%` }}
                  />
                </div>

                {!isEditing ? (
                  <div className="mt-4 grid min-w-0 grid-cols-2 gap-2 lg:hidden">
                    {item.isShoppingList ? (
                      <div className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[color-mix(in_srgb,var(--primary)_22%,var(--card))] px-3 py-2.5 text-xs font-bold text-[var(--primary-soft)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className="truncate">Added</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToList(item.id)}
                        disabled={isLoading}
                        className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[color-mix(in_srgb,var(--primary)_18%,var(--card))] px-3 py-2.5 text-xs font-bold text-[var(--primary-soft)] transition active:scale-[0.98] disabled:opacity-50"
                      >
                        <ShoppingBasket className="h-4 w-4 shrink-0" />
                        <span className="truncate">Add list</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => openQuantityEditor(item)}
                      disabled={isLoading}
                      className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[color-mix(in_srgb,var(--secondary)_18%,var(--card))] px-3 py-2.5 text-xs font-bold text-[var(--secondary)] transition active:scale-[0.98] disabled:opacity-50"
                    >
                      <Pencil className="h-4 w-4 shrink-0" />
                      <span className="truncate">Refilled</span>
                    </button>
                  </div>
                ) : null}

                {isEditing ? (
                  <div className="mt-3 flex w-full min-w-0 items-center justify-end gap-1.5 overflow-hidden">
                    <input
                      type="number"
                      min="0"
                      max="99999"
                      value={quantityValue}
                      onChange={(event) =>
                        setQuantityValue(event.target.value.slice(0, 5))
                      }
                      className="h-8 w-20 shrink-0 rounded-md border border-[var(--border)] bg-[var(--card)] px-1.5 text-center text-xs font-bold text-[var(--foreground)] outline-none focus:border-[var(--primary)] lg:h-7"
                      placeholder="Qty"
                    />

                    <button
                      type="button"
                      onClick={() => handleSaveQuantity(item.id)}
                      disabled={isLoading}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--primary)] text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50 lg:h-7 lg:w-7"
                      aria-label="Save quantity"
                      title="Save quantity"
                    >
                      <Check className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={closeQuantityEditor}
                      disabled={isLoading}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)] disabled:opacity-50 lg:h-7 lg:w-7"
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
    </section>
  );
}