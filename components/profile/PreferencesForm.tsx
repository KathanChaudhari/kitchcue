"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChefHat,
  HeartPulse,
  Leaf,
  Pencil,
  Save,
  Search,
  Sparkles,
  Utensils,
  X
} from "lucide-react";
import { useState } from "react";

const healthGoals = [
  "Lose weight",
  "Maintain weight",
  "Gain muscle",
  "Reduce sugar",
  "Eat healthy",
  "High protein"
];

const allergyOptions = ["Peanuts", "Milk", "Eggs", "Wheat", "Gluten"];

const conditionOptions = [
  "Diabetes",
  "High blood pressure",
  "Kidney condition",
  "Thyroid",
  "Acidity"
];

const likedFoods = [
  "Paneer",
  "Rice",
  "Dal",
  "Chicken",
  "Eggs",
  "Garlic",
  "Cheese",
  "Mushrooms"
];

const dislikedFoods = [
  "Eggplant",
  "Bitter gourd",
  "Seafood",
  "Okra",
  "Blue cheese",
  "Coconut"
];

const textureOptions = ["Crispy", "Soft", "Creamy", "Crunchy", "Juicy"];

const cuisineOptions = [
  "Indian",
  "Japanese",
  "Chinese",
  "Mexican",
  "American",
  "Italian",
  "Mediterranean"
];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Eggetarian",
  "Non-vegetarian",
  "Keto",
  "High protein",
  "Jain"
];

const cookingStyles = [
  "Quick meals",
  "Healthy meals",
  "Creative cooking",
  "Meal prep",
  "Party / occasion",
  "Looks aesthetic"
];

const initialPreferences = {
  healthGoals: ["Maintain weight", "Eat healthy"],
  allergies: ["Peanuts"],
  conditions: ["Diabetes"],
  likes: ["Paneer", "Garlic", "Rice"],
  dislikes: ["Eggplant"],
  textures: ["Crispy"],
  cuisines: ["Indian", "Japanese"],
  dietary: ["Vegetarian"],
  cookingStyles: ["Quick meals", "Healthy meals"],
  spiceLevel: 3
};

export function PreferencesForm() {
  const [isEditing, setIsEditing] = useState(false);

  const [selectedHealthGoals, setSelectedHealthGoals] = useState(
    initialPreferences.healthGoals
  );
  const [selectedAllergies, setSelectedAllergies] = useState(
    initialPreferences.allergies
  );
  const [selectedConditions, setSelectedConditions] = useState(
    initialPreferences.conditions
  );
  const [selectedLikes, setSelectedLikes] = useState(initialPreferences.likes);
  const [selectedDislikes, setSelectedDislikes] = useState(
    initialPreferences.dislikes
  );
  const [selectedTextures, setSelectedTextures] = useState(
    initialPreferences.textures
  );
  const [selectedCuisines, setSelectedCuisines] = useState(
    initialPreferences.cuisines
  );
  const [selectedDietary, setSelectedDietary] = useState(
    initialPreferences.dietary
  );
  const [selectedCookingStyles, setSelectedCookingStyles] = useState(
    initialPreferences.cookingStyles
  );

  const [spiceLevel, setSpiceLevel] = useState(initialPreferences.spiceLevel);

  function handleCancel() {
    setSelectedHealthGoals(initialPreferences.healthGoals);
    setSelectedAllergies(initialPreferences.allergies);
    setSelectedConditions(initialPreferences.conditions);
    setSelectedLikes(initialPreferences.likes);
    setSelectedDislikes(initialPreferences.dislikes);
    setSelectedTextures(initialPreferences.textures);
    setSelectedCuisines(initialPreferences.cuisines);
    setSelectedDietary(initialPreferences.dietary);
    setSelectedCookingStyles(initialPreferences.cookingStyles);
    setSpiceLevel(initialPreferences.spiceLevel);
    setIsEditing(false);
  }

  function handleSave() {
    // later: call backend API here
    setIsEditing(false);
  }

  return (
    <section className="min-h-[calc(100dvh-7rem)] bg-[var(--card)] p-3.5 shadow-sm sm:p-4 lg:min-h-0 lg:rounded-2xl lg:border lg:border-[var(--border)]">
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
  <div className="flex min-w-0 items-start gap-2">
    <Link
      href="/profile"
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 sm:hidden"
      aria-label="Back to profile"
    >
      <ArrowLeft size={15} />
    </Link>

    <Sparkles
      size={16}
      className="mt-1 hidden shrink-0 text-[var(--primary-soft)] sm:block"
    />

    <div className="min-w-0">
      <h2 className="text-sm font-bold text-[var(--primary-soft)]">
        Preference setup
      </h2>
      <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted)]">
        Improve meal ideas, shopping suggestions, and reminders.
      </p>
    </div>
  </div>

  <div className="flex shrink-0 items-center gap-2">
    {!isEditing ? (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-2.5 text-[11px] font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95 sm:h-9 sm:px-3 sm:text-xs"
      >
        <Pencil size={13} />
        Edit
      </button>
    ) : (
      <button
        type="button"
        onClick={handleCancel}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 text-[11px] font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95 sm:h-9 sm:px-3 sm:text-xs"
      >
        <X size={13} />
        Cancel
      </button>
    )}

    <Link
      href="/profile"
      className="hidden h-9 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:flex"
    >
      <ArrowLeft size={14} />
      Back
    </Link>
  </div>
</div>

      {!isEditing && (
        <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--primary)_24%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_7%,var(--card))] px-3 py-2">
          <p className="text-[11px] font-medium text-[var(--muted)]">
            Click{" "}
            <span className="font-bold text-[var(--primary-soft)]">Edit</span>{" "}
            to update your food and cooking preferences.
          </p>
        </div>
      )}

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

            <CustomInput placeholder="Add allergy" isEditing={isEditing} />
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

            <CustomInput placeholder="Add condition" isEditing={isEditing} />
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

            <CustomInput placeholder="Add liked food" isEditing={isEditing} />
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

            <CustomInput placeholder="Add disliked food" isEditing={isEditing} />
          </PreferenceCard>
        </div>

        <PreferenceCard
          icon={ChefHat}
          title="Spice level"
          description="Choose your comfort level."
          isEditing={isEditing}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-bold text-[var(--foreground)]">
                Level {spiceLevel} / 5
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                {getSpiceDescription(spiceLevel)}
              </p>
            </div>

            <span className="rounded-md bg-[color-mix(in_srgb,var(--secondary)_30%,var(--card))] px-2 py-1 text-[11px] font-bold text-[var(--secondary)]">
              {getSpiceLabel(spiceLevel)}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                disabled={!isEditing}
                onClick={() => setSpiceLevel(level)}
                className={`h-9 rounded-lg border text-xs font-bold transition ${
                  level <= spiceLevel
                    ? "border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_62%,var(--card))] text-[var(--ink)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
                } ${
                  isEditing
                    ? "hover:border-[var(--secondary)] hover:text-[var(--foreground)] active:scale-95"
                    : "cursor-default"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
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
          <div className="flex flex-col-reverse gap-2.5 border-t border-[var(--border)] pt-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3.5 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95"
            >
              <X size={15} />
              Cancel changes
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95"
            >
              <Save size={15} />
              Save preferences
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PreferenceCard({
  icon: Icon,
  title,
  description,
  isEditing,
  children
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  isEditing: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,var(--card))] text-[var(--primary-soft)]">
            <Icon size={15} />
          </div>

          <div>
            <h3 className="text-[13px] font-bold text-[var(--foreground)]">
              {title}
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted)]">
              {description}
            </p>
          </div>
        </div>

        {!isEditing && (
          <span className="shrink-0 text-[10px] font-medium text-[var(--muted)] opacity-70">
            Edit to change
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

function ChipGrid({
  options,
  selected,
  onChange,
  isEditing
}: {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
  isEditing: boolean;
}) {
  function toggleOption(option: string) {
    if (!isEditing) return;

    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }

    onChange([...selected, option]);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            disabled={!isEditing}
            onClick={() => toggleOption(option)}
            className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
              isActive
                ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
            } ${
              isEditing
                ? "hover:border-[var(--primary)] hover:text-[var(--foreground)] active:scale-95"
                : "cursor-default"
            } ${!isEditing && !isActive ? "opacity-45" : ""}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function CustomInput({
  placeholder,
  isEditing
}: {
  placeholder: string;
  isEditing: boolean;
}) {
  return (
    <div
      className={`mt-2.5 flex h-9 items-center gap-2 rounded-lg border px-2.5 transition ${
        isEditing
          ? "border-[var(--border)] bg-[var(--card)] focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_16%,transparent)]"
          : "border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))]"
      }`}
    >
      <Search
        size={14}
        className={isEditing ? "text-[var(--muted)]" : "text-[var(--muted)] opacity-45"}
      />

      <input
        disabled={!isEditing}
        placeholder={placeholder}
        className={`h-full w-full bg-transparent text-xs font-semibold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] ${
          isEditing ? "" : "cursor-default opacity-70"
        }`}
      />
    </div>
  );
}

function getSpiceLabel(level: number) {
  if (level === 1) return "Mild";
  if (level === 2) return "Light";
  if (level === 3) return "Medium";
  if (level === 4) return "Hot";
  return "Very hot";
}

function getSpiceDescription(level: number) {
  if (level === 1) return "Almost no heat.";
  if (level === 2) return "A little warmth.";
  if (level === 3) return "Balanced home-style spice.";
  if (level === 4) return "Strong but enjoyable heat.";
  return "Very spicy and bold.";
}