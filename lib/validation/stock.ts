import { z } from "zod";

const optionalDate = z
  .string()
  .datetime()
  .nullable()
  .optional()
  .transform((value) => (value ? new Date(value) : value));

export const stockItemCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  minimumQuantity: z.number().nullable().optional(),
  expiryDate: z.coerce.date().nullable().optional(),
});

export const stockItemUpdateSchema = stockItemCreateSchema.partial().extend({
  isShoppingList: z.boolean().optional(),
  isPurchased: z.boolean().optional(),
});
