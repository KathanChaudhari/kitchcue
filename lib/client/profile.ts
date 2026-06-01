import { apiFetch } from "@/lib/client/api";
import { Profile, ProfileUpdateInput } from "@/app/types/profile";

export function getProfile() {
  return apiFetch<Profile>("/api/me");
}

export function updateProfile(data: ProfileUpdateInput) {
  return apiFetch<Profile>("/api/me", {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}