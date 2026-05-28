import { z } from "zod";

const optionalDate = z
  .string()
  .datetime()
  .nullable()
  .optional()
  .transform((value) => (value ? new Date(value) : value));

export const stockItemCreateSchema = z.object({
  name: z.string().trim().min(1),
  quantity: z.coerce.number().nonnegative().nullable().optional(),
  unit: z.string().trim().nullable().optional(),
  category: z.string().trim().nullable().optional(),
  storageLocation: z.string().trim().nullable().optional(),
  expiryDate: optionalDate,
  purchaseDate: optionalDate,
  minimumQuantity: z.coerce.number().nonnegative().nullable().optional(),
  notes: z.string().trim().nullable().optional(),
  status: z.string().trim().nullable().optional()
});

export const stockItemUpdateSchema = stockItemCreateSchema.partial();
