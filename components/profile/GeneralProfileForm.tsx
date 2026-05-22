"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Minus,
  Plus,
  Save,
  UserRound
} from "lucide-react";
import { useState } from "react";

const cookingSkills = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function GeneralProfileForm() {
  const [peopleCount, setPeopleCount] = useState(2);
  const [cookingSkill, setCookingSkill] = useState("Intermediate");

  return (
    <section className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <UserRound size={18} className="text-[var(--primary-soft)]" />
          <div>
            <h2 className="text-base font-bold text-[var(--primary-soft)]">
              Personal details
            </h2>
            <p className="text-xs text-[var(--muted)]">
              Used to personalize recipes and meal suggestions.
            </p>
          </div>
        </div>

        <Link
          href="/profile"
          className="hidden items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:flex"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input
              defaultValue="Jane Doe"
              className="profile-input"
              placeholder="Enter your name"
            />
          </Field>

          <Field label="Age">
            <input
              defaultValue="28"
              type="number"
              className="profile-input"
              placeholder="Your age"
            />
          </Field>

          <Field label="Gender">
            <div className="relative">
              <select defaultValue="Female" className="profile-input appearance-none">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </div>
          </Field>

          <Field label="Where do you live?">
            <input
              defaultValue="Ahmedabad, India"
              className="profile-input"
              placeholder="Current city"
            />
          </Field>

          <Field label="Where are you from?">
            <input
              defaultValue="Gujarat, India"
              className="profile-input"
              placeholder="Cultural origin"
            />
          </Field>

          <Field label="Primary cooking role">
            <div className="relative">
              <select defaultValue="Home cook" className="profile-input appearance-none">
                <option>Home cook</option>
                <option>Student</option>
                <option>Parent</option>
                <option>Professional</option>
                <option>Beginner cook</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </div>
          </Field>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="mb-3 text-sm font-bold text-[var(--foreground)]">
            Household size
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPeopleCount((value) => Math.max(1, value - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
            >
              <Minus size={16} />
            </button>

            <div className="flex h-10 min-w-16 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-bold text-[var(--foreground)]">
              {peopleCount}
            </div>

            <button
              type="button"
              onClick={() => setPeopleCount((value) => value + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
            >
              <Plus size={16} />
            </button>

            <span className="text-sm text-[var(--muted)]">people</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                Cooking skill
              </p>
              <p className="text-xs text-[var(--muted)]">
                This helps KitchCue suggest recipes at the right difficulty.
              </p>
            </div>

            <span className="rounded-lg bg-[color-mix(in_srgb,var(--primary)_32%,var(--card))] px-2 py-1 text-xs font-bold text-[var(--primary-soft)]">
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
                  onClick={() => setCookingSkill(skill)}
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                    isActive
                      ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_26%,var(--card))] text-[var(--primary-soft)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Height">
            <div className="flex gap-2">
              <input
                defaultValue="170"
                type="number"
                className="profile-input"
                placeholder="Height"
              />
              <span className="flex h-11 items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--muted)]">
                cm
              </span>
            </div>
          </Field>

          <Field label="Weight">
            <div className="flex gap-2">
              <input
                defaultValue="65"
                type="number"
                className="profile-input"
                placeholder="Weight"
              />
              <span className="flex h-11 items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--muted)]">
                kg
              </span>
            </div>
          </Field>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:justify-between">
          <Link
            href="/profile"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--surface)]"
          >
            <ArrowLeft size={16} />
            Cancel
          </Link>

          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-[var(--ink)] transition hover:opacity-90">
            <Save size={16} />
            Save profile
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}