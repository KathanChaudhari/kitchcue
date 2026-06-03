"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, ShoppingBasket } from "lucide-react";
import { InventoryItem } from "@/app/types/stock";
import { StockItemActionMenu } from "@/components/stock/StockItemActionMenu";
import { StockItemEditDialog } from "@/components/stock/StockItemEditDialog";
import { StockItemDeleteDialog } from "@/components/stock/StockItemDeleteDialog";

type InventoryItemCardProps = {
  item: InventoryItem;
  level: number;
  onItemUpdated?: () => void;
  onItemDeleted?: () => void;
};

export function InventoryItemCard({
  item,
  level,
  onItemUpdated,
  onItemDeleted
}: InventoryItemCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const safeLevel = Math.min(Math.max(level, 0), 100);

  const amount =
    item.quantity !== null && item.quantity !== undefined
      ? `${item.quantity}${item.unit ? ` ${item.unit}` : ""}`
      : "Quantity not set";

  return (
    <>
      <article className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 sm:w-[calc(50%-0.25rem)] xl:w-[calc(33.333%-0.35rem)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-extrabold text-[var(--foreground)]">
                {item.name}
              </h3>

              {item.isLowStock ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_22%,var(--card))] px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)]">
                  <AlertTriangle className="h-3 w-3" />
                  Low
                </span>
              ) : null}
            </div>

            <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
              {amount}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.isShoppingList ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_22%,var(--card))] px-2 py-0.5 text-[10px] font-bold text-[var(--primary-soft)]">
                  <ShoppingBasket className="h-3 w-3" />
                  In List
                </span>
              ) : null}

              {item.isPurchased ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_22%,var(--card))] px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)]">
                  <CheckCircle2 className="h-3 w-3" />
                  Refilled
                </span>
              ) : null}
            </div>
          </div>

          <StockItemActionMenu
            itemName={item.name}
            onEdit={() => setIsEditOpen(true)}
            onDelete={() => setIsDeleteOpen(true)}
          />
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--card-soft)]">
          <div
            className="h-full rounded-full bg-[var(--primary)]"
            style={{ width: `${Math.max(safeLevel, 8)}%` }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px] font-semibold text-[var(--muted)]">
          <span>
            {item.minimumQuantity !== null && item.minimumQuantity !== undefined
              ? `Minimum: ${item.minimumQuantity}${item.unit ? ` ${item.unit}` : ""}`
              : "Minimum not set"}
          </span>

          <span>{safeLevel}%</span>
        </div>
      </article>

      <StockItemEditDialog
        item={item}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={onItemUpdated}
      />

      <StockItemDeleteDialog
        item={item}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDeleted={onItemDeleted}
      />
    </>
  );
}