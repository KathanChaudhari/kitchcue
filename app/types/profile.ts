
export type UserPreference = {
    id: string;
    userId: string;
  
    healthGoals: string[];
    dietType: string | null;
    allergies: string[];
    medicalConditions: string[];
    likedIngredients: string[];
    cuisinePreferences: string[];
    dislikedIngredients: string[];
    texturePreferences: string[];
    cookingStyles: string[];
    cookingSkill: string | null;
    cookingTime: string | null;
    appliances: string[];
    householdSize: number | null;
    spiceLevel: number | null;
  
    createdAt: string;
    updatedAt: string;
  };
  
  export type NotificationSetting = {
    id: string;
    userId: string;
  
    key: string;
    title: string;
    description: string | null;
    enabled: boolean;
  
    createdAt: string;
    updatedAt: string;
  };
  
  export type Profile = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: string | null;
    image: string | null;
  
    age: number | null;
    gender: string | null;
    liveIn: string | null;
    from: string | null;
  
    preferences: UserPreference | null;
    notificationSettings: NotificationSetting[];
  
    createdAt: string;
    updatedAt: string;
  };
  
  export type ProfileUpdateInput = {
    name?: string | null;
    image?: string | null;
    age?: number | null;
    gender?: string | null;
    liveIn?: string | null;
    from?: string | null;
  };