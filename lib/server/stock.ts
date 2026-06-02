import { InventoryItem } from "@prisma/client";

export function getStockLevel(item: Pick<InventoryItem, "quantity" | "minimumQuantity">) {
  if (
    item.quantity === null ||
    item.quantity === undefined ||
    item.minimumQuantity === null ||
    item.minimumQuantity === undefined ||
    item.minimumQuantity <= 0
  ) {
    return null;
  }

  return Math.min(Math.round((item.quantity / item.minimumQuantity) * 100), 100);
}

export function isLowStockItem(
  item: Pick<InventoryItem, "quantity" | "minimumQuantity">
) {
  if (
    item.quantity === null ||
    item.quantity === undefined ||
    item.minimumQuantity === null ||
    item.minimumQuantity === undefined ||
    item.minimumQuantity <= 0
  ) {
    return false;
  }

  return item.quantity <= item.minimumQuantity;
}

export function mapStockItemWithLevel(item: InventoryItem) {
  return {
    ...item,
    stockLevel: getStockLevel(item),
    isLowStock: isLowStockItem(item)
  };
}