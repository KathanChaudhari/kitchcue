import { z } from "zod";

export const aiStockItemSchema = z.object({
  name: z.string().trim().min(1).max(100),

  quantity: z.number().positive(),

  unit: z.enum(["kg", "g", "litre", "ml", "pcs", "pack", "bottle", "box"]),

  category: z.enum([
    "Vegetables",
    "Fruits",
    "Dairy",
    "Grains",
    "Spices",
    "Snacks",
    "Beverages",
    "Other",
  ]),
});

export const aiStockResponseSchema = z
  .object({
    action: z.enum(["add", "ask"]),
    message: z.string().trim().min(1),
    items: z.array(aiStockItemSchema).max(30),
  })
  .superRefine((value, context) => {
    if (value.action === "add" && value.items.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["items"],
        message: "Items are required when action is add.",
      });
    }

    if (value.action === "ask" && value.items.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["items"],
        message: "Items must be empty when asking a question.",
      });
    }
  });
