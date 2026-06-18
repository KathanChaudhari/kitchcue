// src/components/profile/PreferencesForm.tsx

"use client";

import { FormEvent, useEffect, useState } from "react";
import { ChefHat, HeartPulse, Leaf, Sparkles, Utensils } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import {
  allergyOptions,
  conditionOptions,
  cookingStyles,
  cuisineOptions,
  dietaryOptions,
  dislikedFoods,
  healthGoals,
  likedFoods,
  textureOptions
} from "@/components/profile/preferences/  constants";
import { PreferencesHeader } from "@/components/profile/preferences/PreferencesHeader";
import { PreferencesNotice } from "@/components/profile/preferences/PreferencesNotice";
import { PreferenceCard } from "@/components/profile/preferences/PreferenceCard";
import { ChipGrid } from "@/components/profile/preferences/ChipGrid";
import { CustomChipInput } from "@/components/profile/preferences/CustomChipInput";
import { SpiceLevelSelector } from "@/components/profile/preferences/SpiceLevelSelector";
import { PreferenceFormActions } from "@/components/profile/preferences/PreferenceFormActions";

export function PreferencesForm() {
  const { profile, isLoading, isSaving, error, savePreferences } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [selectedHealthGoals, setSelectedHealthGoals] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
  const [selectedDislikes, setSelectedDislikes] = useState<string[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCookingStyles, setSelectedCookingStyles] = useState<string[]>(
    []
  );

  const [spiceLevel, setSpiceLevel] = useState(3);

  useEffect(() => {
    if (!profile) return;

    const preferences = profile.preferences;

    setSelectedHealthGoals(preferences?.healthGoals || []);
    setSelectedAllergies(preferences?.allergies || []);
    setSelectedConditions(preferences?.medicalConditions || []);
    setSelectedLikes(preferences?.likedIngredients || []);
    setSelectedDislikes(preferences?.dislikedIngredients || []);
    setSelectedTextures(preferences?.texturePreferences || []);
    setSelectedCuisines(preferences?.cuisinePreferences || []);
    setSelectedDietary(preferences?.dietType ? [preferences.dietType] : []);
    setSelectedCookingStyles(preferences?.cookingStyles || []);
    setSpiceLevel(preferences?.spiceLevel || 3);
  }, [profile]);

  function resetForm() {
    if (!profile) return;

    const preferences = profile.preferences;

    setSelectedHealthGoals(preferences?.healthGoals || []);
    setSelectedAllergies(preferences?.allergies || []);
    setSelectedConditions(preferences?.medicalConditions || []);
    setSelectedLikes(preferences?.likedIngredients || []);
    setSelectedDislikes(preferences?.dislikedIngredients || []);
    setSelectedTextures(preferences?.texturePreferences || []);
    setSelectedCuisines(preferences?.cuisinePreferences || []);
    setSelectedDietary(preferences?.dietType ? [preferences.dietType] : []);
    setSelectedCookingStyles(preferences?.cookingStyles || []);
    setSpiceLevel(preferences?.spiceLevel || 3);
  }

  function handleCancel() {
    resetForm();
    setIsEditing(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await savePreferences({
      healthGoals: selectedHealthGoals,
      allergies: selectedAllergies,
      medicalConditions: selectedConditions,
      likedIngredients: selectedLikes,
      dislikedIngredients: selectedDislikes,
      texturePreferences: selectedTextures,
      cuisinePreferences: selectedCuisines,
      dietType: selectedDietary[0] || null,
      cookingStyles: selectedCookingStyles,
      spiceLevel
    });

    setIsEditing(false);
  }

  if (isLoading) {
    return (
      <section className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]">
        <p className="text-sm text-[var(--muted)]">Loading preferences...</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]">
        <p className="text-sm text-red-300">
          {error || "Profile not found"}
        </p>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]"
    >
      <PreferencesHeader
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onCancel={handleCancel}
      />

      {!isEditing && <PreferencesNotice />}

      {error ? (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
          <p className="text-[11px] font-medium text-red-300">{error}</p>
        </div>
      ) : null}

      <div className="space-y-3">
        <PreferenceCard
          icon={HeartPulse}
          title="Health goals"
          description="Choose what your meals should support."
          isEditing={isEditing}
        >
          <ChipGrid
            options={healthGoals}
            selected={selectedHealthGoals}
            onChange={setSelectedHealthGoals}
            isEditing={isEditing}
          />
        </PreferenceCard>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Leaf}
            title="Allergies"
            description="Avoid these ingredients in suggestions."
            isEditing={isEditing}
          >
            <ChipGrid
              options={allergyOptions}
              selected={selectedAllergies}
              onChange={setSelectedAllergies}
              isEditing={isEditing}
            />

         
          </PreferenceCard>

          <PreferenceCard
            icon={HeartPulse}
            title="Medical conditions"
            description="Used carefully for safer suggestions."
            isEditing={isEditing}
          >
            <ChipGrid
              options={conditionOptions}
              selected={selectedConditions}
              onChange={setSelectedConditions}
              isEditing={isEditing}
            />

          </PreferenceCard>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Utensils}
            title="Foods you like"
            description="Foods you want to see more often."
            isEditing={isEditing}
          >
            <ChipGrid
              options={likedFoods}
              selected={selectedLikes}
              onChange={setSelectedLikes}
              isEditing={isEditing}
            />

          
          </PreferenceCard>

          <PreferenceCard
            icon={Utensils}
            title="Foods you don’t like"
            description="Foods KitchCue should avoid."
            isEditing={isEditing}
          >
            <ChipGrid
              options={dislikedFoods}
              selected={selectedDislikes}
              onChange={setSelectedDislikes}
              isEditing={isEditing}
            />

           
          </PreferenceCard>
        </div>

        <PreferenceCard
          icon={ChefHat}
          title="Spice level"
          description="Choose your comfort level."
          isEditing={isEditing}
        >
          <SpiceLevelSelector
            spiceLevel={spiceLevel}
            isEditing={isEditing}
            onChange={setSpiceLevel}
          />
        </PreferenceCard>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Sparkles}
            title="Texture"
            description="Textures you enjoy in food."
            isEditing={isEditing}
          >
            <ChipGrid
              options={textureOptions}
              selected={selectedTextures}
              onChange={setSelectedTextures}
              isEditing={isEditing}
            />
          </PreferenceCard>

          <PreferenceCard
            icon={Utensils}
            title="Cuisines"
            description="Food cultures you enjoy."
            isEditing={isEditing}
          >
            <ChipGrid
              options={cuisineOptions}
              selected={selectedCuisines}
              onChange={setSelectedCuisines}
              isEditing={isEditing}
            />
          </PreferenceCard>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Leaf}
            title="Dietary style"
            description="Your diet type or restrictions."
            isEditing={isEditing}
          >
            <ChipGrid
              options={dietaryOptions}
              selected={selectedDietary}
              onChange={setSelectedDietary}
              isEditing={isEditing}
              singleSelect
            />
          </PreferenceCard>

          <PreferenceCard
            icon={ChefHat}
            title="Cooking style"
            description="How you prefer to cook."
            isEditing={isEditing}
          >
            <ChipGrid
              options={cookingStyles}
              selected={selectedCookingStyles}
              onChange={setSelectedCookingStyles}
              isEditing={isEditing}
            />
          </PreferenceCard>
        </div>

        {isEditing && (
          <PreferenceFormActions
            isSaving={isSaving}
            onCancel={handleCancel}
          />
        )}
      </div>
    </form>
  );
}