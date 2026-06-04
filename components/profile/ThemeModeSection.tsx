"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

export function ThemeModeSection() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("kitchcue-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }, []);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    window.localStorage.setItem("kitchcue-theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  }

  const isLight = theme === "light";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface)] text-[var(--primary-soft)]">
            {isLight ? <Sun size={18} /> : <Moon size={18} />}
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--primary-soft)]">
              Theme
            </h3>

            <p className="text-xs text-[var(--muted)]">
              {isLight ? "Light mode" : "Dark mode"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          aria-pressed={isLight}
          className={`relative h-8 w-14 rounded-full border border-[var(--border)] transition ${
            isLight ? "bg-[var(--primary)]" : "bg-[var(--surface)]"
          }`}
        >
          <span
            className={`absolute top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm transition ${
              isLight ? "left-7" : "left-1"
            }`}
          >
            {isLight ? <Sun size={13} /> : <Moon size={13} />}
          </span>
        </button>
      </div>
    </section>
  );
}