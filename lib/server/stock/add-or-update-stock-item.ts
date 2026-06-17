import { prisma } from "@/lib/server/prisma";
import { normalizeStockItemName } from "@/lib/server/stock";
import {
  areUnitsCompatible,
  convertQuantity,
  normalizeUnit
} from "@/lib/server/stock/quantity-conversion";

type AddOrUpdateStockItemInput = {
  userId: string;
  name: string;
  quantity?: number | null;
  unit?: string | null;
  category?: string | null;
  minimumQuantity?: number | null;
  expiryDate?: Date | string | null;
};

export async function addOrUpdateStockItem(
  input: AddOrUpdateStockItemInput
) {
  const normalizedName =
    normalizeStockItemName(input.name);

  const incomingUnit = input.unit
    ? normalizeUnit(input.unit)
    : null;

  let existingItem =
    await prisma.inventoryItem.findFirst({
      where: {
        userId: input.userId,
        normalizedName
      }
    });

  // Support rows created before normalizedName existed.
  if (!existingItem) {
    const legacyItems =
      await prisma.inventoryItem.findMany({
        where: {
          userId: input.userId,
          normalizedName: null
        }
      });

    existingItem =
      legacyItems.find(
        (item) =>
          normalizeStockItemName(item.name) ===
          normalizedName
      ) ?? null;
  }

  if (!existingItem) {
    return prisma.inventoryItem.create({
      data: {
        userId: input.userId,
        name: input.name.trim(),
        normalizedName,
        quantity: input.quantity ?? null,
        unit: incomingUnit,
        category: input.category ?? null,
        minimumQuantity:
          input.minimumQuantity ?? null,
        expiryDate: input.expiryDate
          ? new Date(input.expiryDate)
          : null
      }
    });
  }

  const incomingQuantity = input.quantity;

  // Existing item does not yet have measurable stock.
  if (
    existingItem.quantity === null ||
    existingItem.unit === null
  ) {
    return prisma.inventoryItem.update({
      where: {
        id: existingItem.id
      },
      data: {
        normalizedName,
        quantity:
          incomingQuantity ??
          existingItem.quantity,
        unit:
          incomingUnit ?? existingItem.unit,
        category:
          input.category ??
          existingItem.category,
        minimumQuantity:
          input.minimumQuantity ??
          existingItem.minimumQuantity
      }
    });
  }

  if (
    incomingQuantity === null ||
    incomingQuantity === undefined ||
    incomingUnit === null
  ) {
    return prisma.inventoryItem.update({
      where: {
        id: existingItem.id
      },
      data: {
        normalizedName
      }
    });
  }

  if (
    !areUnitsCompatible(
      existingItem.unit,
      incomingUnit
    )
  ) {
    throw new Error(
      `${existingItem.name} already exists in ` +
        `${existingItem.unit}, but the new quantity ` +
        `uses ${incomingUnit}.`
    );
  }

  const quantityToAdd = convertQuantity(
    incomingQuantity,
    incomingUnit,
    existingItem.unit
  );

  const existingCategory =
    existingItem.category
      ?.trim()
      .toLowerCase();

  const incomingCategory =
    input.category
      ?.trim()
      .toLowerCase();

  const shouldUpdateCategory =
    (!existingCategory ||
      existingCategory === "other") &&
    Boolean(incomingCategory) &&
    incomingCategory !== "other";

  return prisma.inventoryItem.update({
    where: {
      id: existingItem.id
    },
    data: {
      normalizedName,
      quantity: {
        increment: quantityToAdd
      },
      ...(shouldUpdateCategory &&
      input.category
        ? {
            category: input.category
          }
        : {})
    }
  });
}