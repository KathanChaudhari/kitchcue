import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { mapStockItemWithLevel } from "@/lib/server/stock";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const [profile, inventoryItems, notifications, chatSessions] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }),

        prisma.inventoryItem.findMany({
          where: {
            userId: user.id
          },
          orderBy: {
            updatedAt: "desc"
          },
          take: 50
        }),

        prisma.notification.findMany({
          where: {
            userId: user.id
          },
          orderBy: {
            createdAt: "desc"
          },
          take: 5
        }),

        prisma.chatSession.findMany({
          where: {
            userId: user.id
          },
          orderBy: {
            updatedAt: "desc"
          },
          take: 5
        })
      ]);

    const stockItems = inventoryItems.map(mapStockItemWithLevel);

    const lowStockItems = stockItems
      .filter((item) => item.isLowStock)
      .slice(0, 5);

    const shoppingItems = stockItems
      .filter((item) => item.isShoppingList)
      .map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        isShoppingList: item.isShoppingList,
        isPurchased: item.isPurchased,
        reason: item.isLowStock ? "Added from stock alerts" : "Added manually"
      }));

    const inventoryActivities = stockItems.slice(0, 5).map((item) => ({
      id: `inventory-${item.id}`,
      title: `${item.name} updated`,
      description: item.category
        ? `Inventory item in ${item.category}`
        : "Inventory item updated",
      type: "inventory",
      createdAt: item.updatedAt
    }));

    const notificationActivities = notifications.map((notification) => ({
      id: `notification-${notification.id}`,
      title: notification.title,
      description: notification.message,
      type: notification.type || "notification",
      createdAt: notification.createdAt
    }));

    const chatActivities = chatSessions.map((session) => ({
      id: `chat-${session.id}`,
      title: session.title || "New chat",
      description: "Assistant conversation updated",
      type: "assistant",
      createdAt: session.updatedAt
    }));

    const recentActivity = [
      ...inventoryActivities,
      ...notificationActivities,
      ...chatActivities
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 6);

    return ok({
      user: profile,

      summary: {
        totalInventoryItems: stockItems.length,
        lowStockCount: stockItems.filter((item) => item.isLowStock).length,
        unreadNotificationCount: notifications.filter(
          (notification) => !notification.isRead
        ).length
      },

      lowStockItems,
      shoppingItems,
      recentActivity,
      notes: []
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}