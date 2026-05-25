"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Minus,
  Pencil,
  Plus,
  Save,
  X,
  UserRound
} from "lucide-react";
import { useState } from "react";

const cookingSkills = ["Beginner", "Intermediate", "Advanced", "Expert"];

const initialProfile = {
  fullName: "Jane Doe",
  age: "28",
  gender: "Female",
  liveIn: "Ahmedabad, India",
  from: "Gujarat, India",
  role: "Home cook",
  height: "170",
  weight: "65"
};

const inputBaseClass =
  "h-10 w-full rounded-lg border px-3 text-[13px] font-semibold outline-none transition";

function getInputClass(isEditing: boolean) {
  return `${inputBaseClass} ${
    isEditing
      ? "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_16%,transparent)]"
      : "cursor-default border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))] text-[var(--foreground)] opacity-100"
  }`;
}

export function GeneralProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [peopleCount, setPeopleCount] = useState(2);
  const [cookingSkill, setCookingSkill] = useState("Intermediate");

  function updateProfile(field: keyof typeof profile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleCancel() {
    setProfile(initialProfile);
    setPeopleCount(2);
    setCookingSkill("Intermediate");
    setIsEditing(false);
  }

  function handleSave() {
    // later: call backend API here
    setIsEditing(false);
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-[var(--primary-soft)]" />

          <div>
            <h2 className="text-sm font-bold text-[var(--primary-soft)]">
              Personal details
            </h2>
            <p className="text-[11px] text-[var(--muted)]">
              Used to personalize recipes and meal suggestions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 active:scale-95"
            >
              <Pencil size={14} />
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)] active:scale-95"
            >
              <X size={14} />
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
            Click <span className="font-bold text-[var(--primary-soft)]">Edit</span> to update your profile details.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name" isEditing={isEditing}>
            <input
              value={profile.fullName}
              disabled={!isEditing}
              onChange={(event) => updateProfile("fullName", event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Enter your name"
            />
          </Field>

          <Field label="Age" isEditing={isEditing}>
            <input
              value={profile.age}
              disabled={!isEditing}
              onChange={(event) => updateProfile("age", event.target.value)}
              type="number"
              className={getInputClass(isEditing)}
              placeholder="Your age"
            />
          </Field>

          <Field label="Gender" isEditing={isEditing}>
            <div className="relative">
              <select
                value={profile.gender}
                disabled={!isEditing}
                onChange={(event) => updateProfile("gender", event.target.value)}
                className={`${getInputClass(isEditing)} appearance-none pr-9`}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>

              <ChevronDown
                size={15}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition ${
                  isEditing
                    ? "text-[var(--muted)] opacity-100"
                    : "text-[var(--muted)] opacity-40"
                }`}
              />
            </div>
          </Field>

          <Field label="Where do you live?" isEditing={isEditing}>
            <input
              value={profile.liveIn}
              disabled={!isEditing}
              onChange={(event) => updateProfile("liveIn", event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Current city"
            />
          </Field>

          <Field label="Where are you from?" isEditing={isEditing}>
            <input
              value={profile.from}
              disabled={!isEditing}
              onChange={(event) => updateProfile("from", event.target.value)}
              className={getInputClass(isEditing)}
              placeholder="Cultural origin"
            />
          </Field>

          <Field label="Primary cooking role" isEditing={isEditing}>
            <div className="relative">
              <select
                value={profile.role}
                disabled={!isEditing}
                onChange={(event) => updateProfile("role", event.target.value)}
                className={`${getInputClass(isEditing)} appearance-none pr-9`}
              >
                <option>Home cook</option>
                <option>Student</option>
                <option>Parent</option>
                <option>Professional</option>
                <option>Beginner cook</option>
              </select>

              <ChevronDown
                size={15}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition ${
                  isEditing
                    ? "text-[var(--muted)] opacity-100"
                    : "text-[var(--muted)] opacity-40"
                }`}
              />
            </div>
          </Field>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-bold text-[var(--foreground)]">
              Household size
            </p>

           
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={!isEditing}
              onClick={() => setPeopleCount((value) => Math.max(1, value - 1))}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                isEditing
                  ? "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] active:scale-95"
                  : "cursor-default border-[var(--border)] text-[var(--muted)] opacity-45"
              }`}
            >
              <Minus size={15} />
            </button>

            <div className="flex h-9 min-w-14 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--border)_88%,var(--primary))] bg-[color-mix(in_srgb,var(--surface)_72%,var(--card))] px-3 text-sm font-bold text-[var(--foreground)]">
              {peopleCount}
            </div>

            <button
              type="button"
              disabled={!isEditing}
              onClick={() => setPeopleCount((value) => value + 1)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                isEditing
                  ? "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] active:scale-95"
                  : "cursor-default border-[var(--border)] text-[var(--muted)] opacity-45"
              }`}
            >
              <Plus size={15} />
            </button>

            <span className="text-xs text-[var(--muted)]">people</span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-bold text-[var(--foreground)]">
                Cooking skill
              </p>
           
            </div>

            <span className="rounded-md bg-[color-mix(in_srgb,var(--primary)_30%,var(--card))] px-2 py-1 text-[11px] font-bold text-[var(--primary-soft)]">
              {cookingSkill}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {cookingSkills.map((skill) => {
              const isActive = cookingSkill === skill;

              return (
                <button
                  key={skill}
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setCookingSkill(skill)}
                  className={`rounded-lg border px-2.5 py-2 text-[11px] font-semibold transition ${
                    isActive
                      ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
                  } ${
                    isEditing
                      ? "hover:border-[var(--primary)] hover:text-[var(--foreground)] active:scale-95"
                      : "cursor-default"
                  } ${!isEditing && !isActive ? "opacity-45" : ""}`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Height" isEditing={isEditing}>
            <div className="flex gap-2">
              <input
                value={profile.height}
                disabled={!isEditing}
                onChange={(event) => updateProfile("height", event.target.value)}
                type="number"
                className={getInputClass(isEditing)}
                placeholder="Height"
              />

              <span className="flex h-10 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--muted)]">
                cm
              </span>
            </div>
          </Field>

          <Field label="Weight" isEditing={isEditing}>
            <div className="flex gap-2">
              <input
                value={profile.weight}
                disabled={!isEditing}
                onChange={(event) => updateProfile("weight", event.target.value)}
                type="number"
                className={getInputClass(isEditing)}
                placeholder="Weight"
              />

              <span className="flex h-10 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--muted)]">
                kg
              </span>
            </div>
          </Field>
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
              Save profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  isEditing,
  children
}: {
  label: string;
  isEditing: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-[var(--muted)]">
          {label}
        </span>

    
      </div>

      {children}
    </label>
  );
}