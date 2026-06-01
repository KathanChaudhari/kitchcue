import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional().nullable(),
  image: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .refine(
      (value) => !value || /^https?:\/\/.+/.test(value),
      "Image must be a valid URL"
    )
});

export const preferencesUpdateSchema = z.object({
  healthGoals: z.array(z.string().trim().min(1)).optional(),
  dietType: z.string().trim().nullable().optional(),
  allergies: z.array(z.string().trim().min(1)).optional(),
  medicalConditions: z.array(z.string().trim().min(1)).optional(),
  likedIngredients: z.array(z.string().trim().min(1)).optional(),
  cuisinePreferences: z.array(z.string().trim().min(1)).optional(),
  dislikedIngredients: z.array(z.string().trim().min(1)).optional(),
  texturePreferences: z.array(z.string().trim().min(1)).optional(),
  cookingStyles: z.array(z.string().trim().min(1)).optional(),
  cookingSkill: z.string().trim().nullable().optional(),
  cookingTime: z.string().trim().nullable().optional(),
  appliances: z.array(z.string().trim().min(1)).optional(),
  householdSize: z.coerce.number().int().positive().nullable().optional(),
  spiceLevel: z.coerce.number().int().min(1).max(5).nullable().optional()
});

export const notificationSettingsUpdateSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string().trim().min(1),
      title: z.string().trim().min(1).optional(),
      description: z.string().trim().nullable().optional(),
      enabled: z.boolean()
    })
  )
});