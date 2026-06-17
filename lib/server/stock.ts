import { InventoryItem } from "@prisma/client";

export function getStockLevel(
  item: Pick<InventoryItem, "quantity" | "minimumQuantity">
) {
  if (
    item.quantity === null ||
    item.quantity === undefined ||
    item.minimumQuantity === null ||
    item.minimumQuantity === undefined ||
    item.minimumQuantity <= 0
  ) {
    return null;
  }

  return Math.min(
    Math.round(
      (item.quantity / item.minimumQuantity) * 100
    ),
    100
  );
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

export function mapStockItemWithLevel(
  item: InventoryItem
) {
  const stockLevel = getStockLevel(item);
  const isLowStock = isLowStockItem(item);

  return {
    id: item.id,
    userId: item.userId,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category,
    minimumQuantity: item.minimumQuantity,
    expiryDate: item.expiryDate,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    isShoppingList: item.isShoppingList,
    isPurchased: item.isPurchased,

    stockLevel,
    isLowStock
  };
}

export function normalizeStockItemName(
  name: string
) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}