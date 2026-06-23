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

export const stockCategories = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Grains",
  "Spices",
  "Snacks",
  "Beverages",
  "Other",
] as const;

export const stockUnits = [
  "kg",
  "g",
  "litre",
  "ml",
  "pcs",
  "pack",
  "bottle",
  "box",
] as const;

export type StockCategory = (typeof stockCategories)[number];

export type StockUnit = (typeof stockUnits)[number];

export type AiStockItem = {
  name: string;
  quantity: number;
  unit: StockUnit;
  category: StockCategory;
};

export type AiStockResponse = {
  action: "add" | "ask";
  message: string;
  items: AiStockItem[];
};
