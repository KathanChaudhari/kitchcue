
import { getCurrentUser } from "@/lib/server/auth";
import { created, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { stockItemCreateSchema } from "@/lib/validation/stock";

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
                mode: "insensitive"
              }
            }
          : {}),

        ...(category
          ? {
              category: {
                equals: category,
                mode: "insensitive"
              }
            }
          : {}),

        ...(lowOnly
          ? {
              minimumQuantity: {
                not: null
              },
              quantity: {
                not: null
              }
            }
          : {})
      },
      orderBy: [{ category: "asc" }, { name: "asc" }]
    });

    const filteredItems = lowOnly
      ? items.filter(
          (item) =>
            item.quantity !== null &&
            item.minimumQuantity !== null &&
            item.quantity <= item.minimumQuantity
        )
      : items;

    return ok(filteredItems);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, stockItemCreateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser();

    const item = await prisma.inventoryItem.create({
      data: {
        ...data,
        userId: user.id
      }
    });

    return created(item);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}