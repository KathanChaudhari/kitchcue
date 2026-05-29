import { created, fail, handleApiError, parseJson } from "@/lib/server/api";
import { hashPassword } from "@/lib/server/password";
import { prisma } from "@/lib/server/prisma";
import { signupSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, signupSchema);
  if (error) return error;

  try {
    const email = data.email.toLowerCase().trim();
    const name = data.name.trim();

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return fail("An account already exists with this email", 409);
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
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
        },
        notificationSettings: {
          create: [
            {
              key: "expiry_reminders",
              title: "Expiry reminders",
              description: "Notify me when food items are close to expiry",
              enabled: true
            },
            {
              key: "low_stock",
              title: "Low stock alerts",
              description: "Notify me when pantry items are running low",
              enabled: true
            }
          ]
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