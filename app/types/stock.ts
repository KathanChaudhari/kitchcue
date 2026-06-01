// src/types/stock.ts

export type InventoryItem = {
    id: string;
    name: string;
    quantity: number | null;
    unit: string | null;
    category: string | null;
    storageLocation: string | null;
    expiryDate: string | null;
    purchaseDate: string | null;
    minimumQuantity: number | null;
    notes: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
  
  export type CreateInventoryItemInput = {
    name: string;
    quantity?: number;
    unit?: string;
    category?: string;
    storageLocation?: string;
    expiryDate?: string;
    purchaseDate?: string;
    minimumQuantity?: number;
    notes?: string;
    status?: string;
  };