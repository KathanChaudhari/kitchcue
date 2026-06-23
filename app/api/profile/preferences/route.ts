import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { preferencesUpdateSchema } from "@/lib/validation/profile";

const defaultPreferences = {
  healthGoals: [],
  allergies: [],
  medicalConditions: [],
  likedIngredients: [],
  cuisinePreferences: [],
  dislikedIngredients: [],
  texturePreferences: [],
  cookingStyles: [],
  appliances: [],
};

export async function GET() {
  try {
    const user = await getCurrentUser();

    const preferences = await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        ...defaultPreferences,
      },
    });

    return ok(preferences);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function PATCH(request: Request) {
  const { data, error } = await parseJson(request, preferencesUpdateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser();

    const preferences = await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: data,
      create: {
        userId: user.id,
        ...defaultPreferences,
        ...data,
      },
    });

    return ok(preferences);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
