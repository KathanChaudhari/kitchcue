import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { stockItemUpdateSchema } from "@/lib/validation/stock";
import {
  mapStockItemWithLevel,
  normalizeStockItemName,
} from "@/lib/server/stock";
import { normalizeUnit } from "@/lib/server/stock/quantity-conversion";

type Params = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
  const { itemId } = await params;

  const { data, error } = await parseJson(request, stockItemUpdateSchema);

  if (error) return error;

  try {
    const user = await getCurrentUser();

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: itemId,
        userId: user.id,
      },
    });

    if (!existingItem) {
      return Response.json(
        {
          message: "Stock item not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * If the item is being renamed, prevent it from
     * becoming a duplicate of another inventory item.
     */
    if (data.name !== undefined) {
      const normalizedName = normalizeStockItemName(data.name);

      const conflictingItem = await prisma.inventoryItem.findFirst({
        where: {
          userId: user.id,
          normalizedName,
          id: {
            not: existingItem.id,
          },
        },
      });

      if (conflictingItem) {
        return Response.json(
          {
            message:
              `An inventory item named ` +
              `"${conflictingItem.name}" already exists.`,
          },
          {
            status: 409,
          },
        );
      }
    }

    const updatedItem = await prisma.inventoryItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        ...data,

        ...(data.name !== undefined
          ? {
              name: data.name.trim(),
              normalizedName: normalizeStockItemName(data.name),
            }
          : {}),

        ...(data.unit !== undefined
          ? {
              unit: data.unit ? normalizeUnit(data.unit) : null,
            }
          : {}),
      },
    });

    return ok(mapStockItemWithLevel(updatedItem));
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { itemId } = await params;

  try {
    const user = await getCurrentUser();

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: itemId,
        userId: user.id,
      },
    });

    if (!existingItem) {
      return Response.json(
        {
          message: "Stock item not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.inventoryItem.delete({
      where: {
        id: existingItem.id,
      },
    });

    return ok({
      success: true,
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
