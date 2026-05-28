import { getCurrentUser } from "@/lib/server/auth";
import { fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { stockItemUpdateSchema } from "@/lib/validation/stock";

type RouteContext = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser(request);
    const { itemId } = await context.params;

    const item = await prisma.inventoryItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    });

    if (!item) return fail("Stock item not found", 404);

    return ok(item);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { data, error } = await parseJson(request, stockItemUpdateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser(request);
    const { itemId } = await context.params;

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    });

    if (!existingItem) return fail("Stock item not found", 404);

    const item = await prisma.inventoryItem.update({
      where: { id: itemId },
      data
    });

    return ok(item);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser(request);
    const { itemId } = await context.params;

    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id: itemId,
        userId: user.id
      }
    });

    if (!existingItem) return fail("Stock item not found", 404);

    await prisma.inventoryItem.delete({
      where: { id: itemId }
    });

    return ok({ id: itemId });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
