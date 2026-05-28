import { prisma } from "@/lib/server/prisma";

const demoUserEmail = process.env.KITCHCUE_DEMO_USER_EMAIL ?? "demo@kitchcue.local";

export async function getCurrentUser(request: Request) {
  const requestedUserId = request.headers.get("x-user-id");

  if (requestedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: requestedUserId }
    });

    if (user) return user;
  }

  return prisma.user.upsert({
    where: { email: demoUserEmail },
    update: {},
    create: {
      email: demoUserEmail,
      name: "KitchCue Demo",
      age: 28,
      gender: "Female",
      liveIn: "Ahmedabad, India",
      from: "Gujarat, India",
      role: "Home cook",
      heightCm: 170,
      weightKg: 65,
      householdSize: 2,
      preferences: {
        create: {
          healthGoals: ["Maintain weight", "Eat healthy"],
          allergies: ["Peanuts"],
          medicalConditions: ["Diabetes"],
          likedIngredients: ["Paneer", "Garlic", "Rice"],
          dislikedIngredients: ["Eggplant"],
          texturePreferences: ["Crispy"],
          cuisinePreferences: ["Indian", "Japanese"],
          dietType: "Vegetarian",
          cookingStyles: ["Quick meals", "Healthy meals"],
          cookingSkill: "Intermediate",
          appliances: ["Microwave", "Air fryer", "Pressure cooker"],
          householdSize: 2,
          spiceLevel: 3
        }
      },
      notificationSettings: {
        createMany: {
          data: [
            {
              key: "expiry",
              title: "Expiry reminders",
              description: "Remind me before ingredients expire.",
              enabled: true
            },
            {
              key: "low-stock",
              title: "Low stock alerts",
              description: "Notify me when pantry items are running low.",
              enabled: true
            },
            {
              key: "meal-suggestions",
              title: "Meal suggestions",
              description: "Send helpful ideas based on my current stock.",
              enabled: false
            }
          ]
        }
      }
    }
  });
}
