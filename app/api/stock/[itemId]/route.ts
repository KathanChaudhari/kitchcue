import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { stockItemUpdateSchema } from "@/lib/validation/stock";
import { mapStockItemWithLevel } from "@/lib/server/stock";

type Params = {
  params: {
    itemId: string;
  };
};

export async function PATCH(request: Request, { params }: Params) {
  const { data, error } = await parseJson(request, stockItemUpdateSchema);

  if (error) return error;

  try {
    const user = await getCurrentUser();

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: params.itemId,
        userId: user.id
      }
    });

    if (!existingItem) {
      return Response.json(
        { message: "Stock item not found" },
        { status: 404 }
      );
    }

    const updatedItem = await prisma.inventoryItem.update({
      where: {
        id: params.itemId
      },
      data
    });

    return ok(mapStockItemWithLevel(updatedItem));
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: params.itemId,
        userId: user.id
      }
    });

    if (!existingItem) {
      return Response.json(
        { message: "Stock item not found" },
        { status: 404 }
      );
    }

    await prisma.inventoryItem.delete({
      where: {
        id: params.itemId
      }
    });

    return ok({ success: true });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}