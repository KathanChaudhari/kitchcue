import { z } from "zod";

export const chatSessionCreateSchema = z.object({
  title: z.string().trim().min(1).optional(),
});

export const chatMessageCreateSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().trim().min(1),
});
