import { apiFetch } from "@/lib/client/api";
import {
  Profile,
  ProfileUpdateInput,
  UserPreference
} from "@/app/types/profile";

export function getProfile() {
  return apiFetch<Profile>("/api/me");
}

export function updateProfile(data: ProfileUpdateInput) {
  return apiFetch<Profile>("/api/me", {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

export type PreferencesUpdateInput = Partial<{
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
}>;

export function getPreferences() {
  return apiFetch<UserPreference>("/api/profile/preferences");
}

export function updatePreferences(data: PreferencesUpdateInput) {
  return apiFetch<UserPreference>("/api/profile/preferences", {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}