import { prisma } from "@/lib/server/prisma";
// Change the import above if your Prisma client uses another path.

export type KitchenInventoryItem = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  minimumQuantity: number | null;
  expiryDate: string | null;
  isLowStock: boolean;
};

export type KitchenShoppingListItem = {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  isPurchased: boolean;
};

export type KitchenContext = {
  user: {
    name: string | null;
  };

  preferences: {
    healthGoals: string[];
    dietType: string | null;
    allergies: string[];
    medicalConditions: string[];
    likedIngredients: string[];
    dislikedIngredients: string[];
    cuisinePreferences: string[];
    texturePreferences: string[];
    cookingStyles: string[];
    cookingSkill: string | null;
    cookingTime: string | null;
    appliances: string[];
    householdSize: number | null;
    spiceLevel: number | null;
  };

  inventory: KitchenInventoryItem[];
  shoppingList: KitchenShoppingListItem[];
};

function isItemLowStock(
  quantity: number | null,
  minimumQuantity: number | null,
) {
  if (quantity === null || minimumQuantity === null) {
    return false;
  }

  return quantity <= minimumQuantity;
}

function formatExpiryDate(expiryDate: Date | null) {
  if (!expiryDate) {
    return null;
  }

  return expiryDate.toISOString().split("T")[0];
}

export async function buildKitchenContext(
  userId: string,
): Promise<KitchenContext> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,

      preferences: {
        select: {
          healthGoals: true,
          dietType: true,
          allergies: true,
          medicalConditions: true,
          likedIngredients: true,
          dislikedIngredients: true,
          cuisinePreferences: true,
          texturePreferences: true,
          cookingStyles: true,
          cookingSkill: true,
          cookingTime: true,
          appliances: true,
          householdSize: true,
          spiceLevel: true,
        },
      },

      inventoryItems: {
        select: {
          id: true,
          name: true,
          quantity: true,
          unit: true,
          category: true,
          minimumQuantity: true,
          expiryDate: true,
          isShoppingList: true,
          isPurchased: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const inventory = user.inventoryItems
    .filter((item) => !item.isShoppingList)
    .map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
      minimumQuantity: item.minimumQuantity,
      expiryDate: formatExpiryDate(item.expiryDate),
      isLowStock: isItemLowStock(item.quantity, item.minimumQuantity),
    }));

  const shoppingList = user.inventoryItems
    .filter((item) => item.isShoppingList)
    .map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
      isPurchased: item.isPurchased,
    }));

  return {
    user: {
      name: user.name,
    },

    preferences: {
      healthGoals: user.preferences?.healthGoals ?? [],
      dietType: user.preferences?.dietType ?? null,
      allergies: user.preferences?.allergies ?? [],
      medicalConditions: user.preferences?.medicalConditions ?? [],
      likedIngredients: user.preferences?.likedIngredients ?? [],
      dislikedIngredients: user.preferences?.dislikedIngredients ?? [],
      cuisinePreferences: user.preferences?.cuisinePreferences ?? [],
      texturePreferences: user.preferences?.texturePreferences ?? [],
      cookingStyles: user.preferences?.cookingStyles ?? [],
      cookingSkill: user.preferences?.cookingSkill ?? null,
      cookingTime: user.preferences?.cookingTime ?? null,
      appliances: user.preferences?.appliances ?? [],
      householdSize: user.preferences?.householdSize ?? null,
      spiceLevel: user.preferences?.spiceLevel ?? null,
    },

    inventory,
    shoppingList,
  };
}
