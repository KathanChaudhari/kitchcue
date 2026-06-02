export type HomeUser = {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
  
  export type HomeLowStockItem = {
    id: string;
    name: string;
    quantity: number | null;
    unit: string | null;
    category: string | null;
    minimumQuantity: number | null;
    expiryDate?: string | null;
    stockLevel: number | null;
    isLowStock: boolean;
  };
  
  export type HomeShoppingItem = {
    id: string;
    name: string;
    quantity: number | null;
    unit: string | null;
    category: string | null;
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