"use client";

import { useState } from "react";
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

  const amount =
    item.quantity !== null && item.quantity !== undefined
      ? `${item.quantity}${item.unit ? ` ${item.unit}` : ""}`
      : "Quantity not set";

  return (
    <>
      <article className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 sm:w-[calc(50%-0.25rem)] xl:w-[calc(33.333%-0.35rem)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-extrabold text-[var(--foreground)]">
              {item.name}
            </h3>

            <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
              {amount}
            </p>

            {item.storageLocation ? (
              <p className="mt-0.5 truncate text-[11px] font-medium text-[var(--muted)]">
                {item.storageLocation}
              </p>
            ) : null}
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
            style={{ width: `${level}%` }}
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