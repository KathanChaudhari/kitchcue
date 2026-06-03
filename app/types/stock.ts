export type InventoryItem = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  minimumQuantity: number | null;
  expiryDate: string | null;

  isShoppingList: boolean;
  isPurchased: boolean;

  stockLevel: number | null;
  isLowStock: boolean;

  createdAt: string;
  updatedAt: string;
};

export type CreateInventoryItemInput = {
  name: string;
  quantity?: number | null;
  unit?: string | null;
  category?: string | null;
  minimumQuantity?: number | null;
  expiryDate?: string | null;
};

export type UpdateInventoryItemInput = Partial<CreateInventoryItemInput> & {
  isShoppingList?: boolean;
  isPurchased?: boolean;
};