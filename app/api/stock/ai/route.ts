import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/api";
import { interpretStockMessage } from "@/lib/server/ai/interpret-stock-message";
import { prisma } from "@/lib/server/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const conversation =
      Array.isArray(body.conversation)
        ? body.conversation.filter(
            (entry: any): entry is string =>
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

    const createdItems = await prisma.$transaction(
      aiResponse.items.map((item) =>
        prisma.inventoryItem.create({
          data: {
            userId: user.id,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            category: item.category
          }
        })
      )
    );

    return ok({
      ...aiResponse,
      createdItems
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}