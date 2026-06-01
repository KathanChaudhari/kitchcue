"use client";

import { useCallback, useEffect, useState } from "react";
import { Profile, ProfileUpdateInput } from "@/app/types/profile";
import { getProfile, updateProfile } from "@/lib/client/profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getProfile();
      setProfile(data);
    } catch (profileError) {
      setError(
        profileError instanceof Error
          ? profileError.message
          : "Failed to load profile"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function saveProfile(data: ProfileUpdateInput) {
    try {
      setIsSaving(true);
      setError("");

      const updatedProfile = await updateProfile(data);
      setProfile(updatedProfile);

      return updatedProfile;
    } catch (profileError) {
      setError(
        profileError instanceof Error
          ? profileError.message
          : "Failed to update profile"
      );

      throw profileError;
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    isLoading,
    isSaving,
    error,
    reloadProfile: loadProfile,
    saveProfile
  };
}