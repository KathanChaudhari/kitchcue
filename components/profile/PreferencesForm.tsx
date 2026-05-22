"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChefHat,
  HeartPulse,
  Leaf,
  Save,
  Search,
  Sparkles,
  Utensils
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

const allergyOptions = [
  "Peanuts",
  "Milk",
  "Eggs",
  "Wheat",
  "Gluten"
];

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

const textureOptions = [
  "Crispy",
  "Soft",
  "Creamy",
  "Crunchy",
  "Juicy",
];

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

export function PreferencesForm() {
  const [selectedHealthGoals, setSelectedHealthGoals] = useState([
    "Maintain weight",
    "Eat healthy"
  ]);

  const [selectedAllergies, setSelectedAllergies] = useState(["Peanuts"]);
  const [selectedConditions, setSelectedConditions] = useState(["Diabetes"]);
  const [selectedLikes, setSelectedLikes] = useState(["Paneer", "Garlic", "Rice"]);
  const [selectedDislikes, setSelectedDislikes] = useState(["Eggplant"]);
  const [selectedTextures, setSelectedTextures] = useState(["Crispy"]);
  const [selectedCuisines, setSelectedCuisines] = useState(["Indian", "Japanese"]);
  const [selectedDietary, setSelectedDietary] = useState(["Vegetarian"]);
  const [selectedCookingStyles, setSelectedCookingStyles] = useState([
    "Quick meals",
    "Healthy meals"
  ]);

  const [spiceLevel, setSpiceLevel] = useState(3);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--primary-soft)]" />
          <div>
            <h2 className="text-sm font-bold text-[var(--primary-soft)]">
              Preference setup
            </h2>
            <p className="text-[11px] text-[var(--muted)]">
              Improve meal ideas, shopping suggestions, and reminders.
            </p>
          </div>
        </div>

        <Link
          href="/profile"
          className="hidden items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:flex"
        >
          <ArrowLeft size={13} />
          Back
        </Link>
      </div>

      <div className="space-y-3">
        <PreferenceCard
          icon={HeartPulse}
          title="Health goals"
          description="Choose what your meals should support."
        >
          <ChipGrid
            options={healthGoals}
            selected={selectedHealthGoals}
            onChange={setSelectedHealthGoals}
          />
        </PreferenceCard>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Leaf}
            title="Allergies"
            description="Avoid these ingredients in suggestions."
          >
            <ChipGrid
              options={allergyOptions}
              selected={selectedAllergies}
              onChange={setSelectedAllergies}
            />

            <CustomInput placeholder="Add allergy" />
          </PreferenceCard>

          <PreferenceCard
            icon={HeartPulse}
            title="Medical conditions"
            description="Used carefully for safer suggestions."
          >
            <ChipGrid
              options={conditionOptions}
              selected={selectedConditions}
              onChange={setSelectedConditions}
            />

            <CustomInput placeholder="Add condition" />
          </PreferenceCard>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Utensils}
            title="Foods you like"
            description="Foods you want to see more often."
          >
            <ChipGrid
              options={likedFoods}
              selected={selectedLikes}
              onChange={setSelectedLikes}
            />

            <CustomInput placeholder="Add liked food" />
          </PreferenceCard>

          <PreferenceCard
            icon={Utensils}
            title="Foods you don’t like"
            description="Foods KitchCue should avoid."
          >
            <ChipGrid
              options={dislikedFoods}
              selected={selectedDislikes}
              onChange={setSelectedDislikes}
            />

            <CustomInput placeholder="Add disliked food" />
          </PreferenceCard>
        </div>

        <PreferenceCard
          icon={ChefHat}
          title="Spice level"
          description="Choose your comfort level."
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
                onClick={() => setSpiceLevel(level)}
                className={`h-9 rounded-lg border text-xs font-bold transition ${
                  level <= spiceLevel
                    ? "border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_62%,var(--card))] text-[var(--ink)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
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
          >
            <ChipGrid
              options={textureOptions}
              selected={selectedTextures}
              onChange={setSelectedTextures}
            />
          </PreferenceCard>

          <PreferenceCard
            icon={Utensils}
            title="Cuisines"
            description="Food cultures you enjoy."
          >
            <ChipGrid
              options={cuisineOptions}
              selected={selectedCuisines}
              onChange={setSelectedCuisines}
            />
          </PreferenceCard>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <PreferenceCard
            icon={Leaf}
            title="Dietary style"
            description="Your diet type or restrictions."
          >
            <ChipGrid
              options={dietaryOptions}
              selected={selectedDietary}
              onChange={setSelectedDietary}
            />
          </PreferenceCard>

          <PreferenceCard
            icon={ChefHat}
            title="Cooking style"
            description="How you prefer to cook."
          >
            <ChipGrid
              options={cookingStyles}
              selected={selectedCookingStyles}
              onChange={setSelectedCookingStyles}
            />
          </PreferenceCard>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-[var(--border)] pt-4 sm:flex-row sm:justify-between">
          <Link
            href="/profile"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3.5 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)]"
          >
            <ArrowLeft size={15} />
            Cancel
          </Link>

          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-xs font-bold text-[var(--ink)] transition hover:opacity-90">
            <Save size={15} />
            Save preferences
          </button>
        </div>
      </div>
    </section>
  );
}

function PreferenceCard({
  icon: Icon,
  title,
  description,
  children
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="mb-3 flex items-start gap-2.5">
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

      {children}
    </div>
  );
}

function ChipGrid({
  options,
  selected,
  onChange
}: {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
}) {
  function toggleOption(option: string) {
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
            onClick={() => toggleOption(option)}
            className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
              isActive
                ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function CustomInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="mt-2.5 flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5">
      <Search size={14} className="text-[var(--muted)]" />
      <input
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-xs font-semibold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
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