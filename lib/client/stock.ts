// src/lib/client/stock.ts


import { CreateInventoryItemInput, InventoryItem } from "@/app/types/stock";
import { apiFetch } from "./api";

export async function getStockItems(params?: {
  q?: string;
  category?: string;
  low?: boolean;
}) {
  const searchParams = new URLSearchParams();

  if (params?.q) searchParams.set("q", params.q);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.low) searchParams.set("low", "true");

  const query = searchParams.toString();

  return apiFetch<InventoryItem[]>(
    query ? `/api/stock?${query}` : "/api/stock"
  );
}

export async function createStockItem(data: CreateInventoryItemInput) {
  return apiFetch<InventoryItem>("/api/stock", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function updateStockItem(
  itemId: string,
  data: Partial<CreateInventoryItemInput>
) {
  return apiFetch<InventoryItem>(`/api/stock/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

export async function deleteStockItem(itemId: string) {
  return apiFetch<{ success: boolean }>(`/api/stock/${itemId}`, {
    method: "DELETE"
  });
}