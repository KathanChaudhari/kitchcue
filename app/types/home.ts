import { InventoryItem } from "@/app/types/stock";

export type HomeUser = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
};

export type HomeLowStockItem = Pick<
  InventoryItem,
  | "id"
  | "name"
  | "quantity"
  | "unit"
  | "category"
  | "minimumQuantity"
  | "expiryDate"
  | "stockLevel"
  | "isLowStock"
  | "isShoppingList"
  | "isPurchased"
>;

export type HomeShoppingItem = Pick<
  InventoryItem,
  | "id"
  | "name"
  | "quantity"
  | "unit"
  | "category"
  | "isShoppingList"
  | "isPurchased"
> & {
  reason: string;
};

export type HomeActivityItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt: string;
};

export type HomeNoteItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type HomeDashboardData = {
  user: HomeUser | null;

  summary: {
    totalInventoryItems: number;
    lowStockCount: number;
    unreadNotificationCount: number;
  };

  lowStockItems: HomeLowStockItem[];
  shoppingItems: HomeShoppingItem[];
  recentActivity: HomeActivityItem[];
  notes: HomeNoteItem[];
};