import { getCurrentUser } from "@/lib/server/auth";
import { created, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { stockItemCreateSchema } from "@/lib/validation/stock";
import { isLowStockItem, mapStockItemWithLevel } from "@/lib/server/stock";
import { addOrUpdateStockItem } from "@/lib/server/stock/add-or-update-stock-item";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const lowOnly = searchParams.get("low") === "true";

    const items = await prisma.inventoryItem.findMany({
      where: {
        userId: user.id,

        ...(query
          ? {
              name: {
                contains: query,
                mode: "insensitive",
              },
            }
          : {}),

        ...(category
          ? {
              category: {
                equals: category,
                mode: "insensitive",
              },
            }
          : {}),

        ...(lowOnly
          ? {
              minimumQuantity: {
                not: null,
              },
              quantity: {
                not: null,
              },
            }
          : {}),
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    const filteredItems = lowOnly
      ? items.filter((item) => isLowStockItem(item))
      : items;

    return ok(filteredItems.map(mapStockItemWithLevel));
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, stockItemCreateSchema);

  if (error) return error;

  try {
    const user = await getCurrentUser();

    const item = await addOrUpdateStockItem({
      userId: user.id,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      category: data.category,
      minimumQuantity: data.minimumQuantity,
      expiryDate: data.expiryDate,
    });

    return created(mapStockItemWithLevel(item));
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
