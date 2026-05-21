"use client";

import Link from "next/link";
import { useState } from "react";

type NavKey = "home" | "assistant" | "stock" | "profile";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  key: NavKey;
};

const navItems: NavItem[] = [
  { href: "/home", label: "Dashboard", icon: "⌂", key: "home" },
  { href: "/assistant", label: "Assistant", icon: "✦", key: "assistant" },
  { href: "/stock", label: "Stocks", icon: "▦", key: "stock" },
  { href: "/profile", label: "Profile", icon: "◌", key: "profile" }
];

type AppNavProps = {
  active: NavKey;
};

export function AppNav({ active }: AppNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`
        fixed z-10 border-[var(--border)] bg-[#1f2020] backdrop-blur transition-all duration-300

        inset-x-0 bottom-0 mx-auto max-w-md border-t px-3 pb-3 pt-2

        lg:inset-x-auto lg:left-0 lg:top-0 lg:h-screen
        lg:border-r lg:border-t-0 lg:px-4 lg:py-6
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}
    >
      <div
        className={`hidden items-center pb-6 lg:flex ${
          isCollapsed ? "justify-center" : "justify-between px-3"
        }`}
      >
        {!isCollapsed && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
              smart way
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--foreground)]">
              KitchCue
            </h2>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--card-soft)] text-sm font-bold text-[var(--muted)] transition hover:border hover:border-[var(--primary)]"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "☰" : "‹"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 lg:flex lg:flex-col">
        {navItems.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold transition
                lg:h-12 lg:flex-row
                ${
                  isCollapsed
                    ? "lg:justify-center lg:px-0"
                    : "lg:justify-start lg:px-4"
                }
                ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--ink)]"
                    : "text-[#b7b7b7] hover:bg-[#2f3b31]"
                }
              `}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {item.icon}
              </span>

              <span className={isCollapsed ? "lg:hidden" : ""}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
