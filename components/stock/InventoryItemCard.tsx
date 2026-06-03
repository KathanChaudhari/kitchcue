"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
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
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              title={item.name}
              className="max-w-[11rem] truncate text-sm font-extrabold text-[var(--foreground)] sm:max-w-[13rem]"
            >
              {item.name}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <p className="min-w-0 truncate text-xs font-medium text-[var(--muted)]">
                {amount}
              </p>

              {item.isLowStock ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_18%,var(--card))] px-1.5 py-0.5 text-[9px] font-bold text-[var(--secondary)]">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  Low
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

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--card-soft)]">
          <div
            className="h-full rounded-full bg-[var(--primary)]"
            style={{ width: `${Math.max(safeLevel, 8)}%` }}
          />
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