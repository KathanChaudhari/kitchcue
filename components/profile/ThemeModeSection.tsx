"use client";

import { useEffect, useState } from "react";
import { SectionCard } from "@/components/global/SectionCard";

type ThemeMode = "dark" | "light";

export function ThemeModeSection() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("kitchcue-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }, []);

  function updateTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme);
    window.localStorage.setItem("kitchcue-theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }

  return (
    <SectionCard title="Main settings">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Theme mode</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Choose how KitchCue looks across the app.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[var(--card-soft)] p-1">
          {(["dark", "light"] as ThemeMode[]).map((mode) => {
            const isActive = theme === mode;

            return (
              <button
                key={mode}
                className={`h-11 rounded-xl text-sm font-bold capitalize transition ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--ink)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
                type="button"
                onClick={() => updateTheme(mode)}
              >
                {mode}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="h-9 rounded-xl bg-[var(--primary)]" title="Primary #87a28a" />
          <span className="h-9 rounded-xl bg-[var(--secondary)]" title="Secondary #b38b6d" />
          <span className="h-9 rounded-xl bg-[var(--tertiary)]" title="Tertiary #82c4c5" />
        </div>
      </div>
    </SectionCard>
  );
}
