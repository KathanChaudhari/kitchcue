import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/api";
import { interpretStockMessage } from "@/lib/server/ai/interpret-stock-message";
import { addOrUpdateStockItem } from "@/lib/server/stock/add-or-update-stock-item";
import { mapStockItemWithLevel } from "@/lib/server/stock";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const conversation = Array.isArray(body.conversation)
      ? body.conversation.filter(
          (entry: unknown): entry is string =>
            typeof entry === "string"
        )
      : [];

    if (!message) {
      return Response.json(
        {
          success: false,
          message: "Please enter what you bought."
        },
        {
          status: 400
        }
      );
    }

    const aiResponse = await interpretStockMessage({
      message,
      conversation
    });

    if (aiResponse.action === "ask") {
      return ok({
        ...aiResponse,
        createdItems: []
      });
    }

    const createdItems = [];

    for (const item of aiResponse.items) {
      const savedItem = await addOrUpdateStockItem({
        userId: user.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category
      });

      createdItems.push(
        mapStockItemWithLevel(savedItem)
      );
    }

    return ok({
      ...aiResponse,
      createdItems
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}