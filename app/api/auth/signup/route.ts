import { created, fail, handleApiError, parseJson } from "@/lib/server/api";
import { hashPassword } from "@/lib/server/password";
import { prisma } from "@/lib/server/prisma";
import { signupSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, signupSchema);
  if (error) return error;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return fail("An account already exists with this email", 409);
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashPassword(data.password),
        preferences: {
          create: {
            healthGoals: [],
            allergies: [],
            medicalConditions: [],
            likedIngredients: [],
            cuisinePreferences: [],
            dislikedIngredients: [],
            texturePreferences: [],
            cookingStyles: [],
            appliances: []
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true
      }
    });

    return created(user);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
