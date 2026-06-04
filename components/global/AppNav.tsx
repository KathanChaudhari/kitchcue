"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
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

function getActiveNav(pathname: string): NavKey {
  if (pathname.startsWith("/assistant")) return "assistant";
  if (pathname.startsWith("/stock")) return "stock";
  if (pathname.startsWith("/profile")) return "profile";

  return "home";
}

export function AppNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const active = getActiveNav(pathname);

  function handleLogout() {
    signOut({
      callbackUrl: "/login"
    });
  }

  return (
    <nav
      className={`
        fixed z-10 border-[var(--border)] bg-[var(--card)]/95 backdrop-blur transition-all duration-300

        inset-x-0 bottom-0 mx-auto max-w-md border-t px-3 pb-3 pt-2

        lg:sticky lg:top-0 lg:inset-x-auto lg:bottom-auto lg:mx-0 lg:h-screen
        lg:max-w-none lg:shrink-0
        lg:border-r lg:border-t-0 lg:px-4 lg:py-6

        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}
    >
      <div className="flex h-full flex-col">
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
            className="grid h-10 w-10 place-items-center rounded-2xl border border-transparent bg-[var(--card-soft)] text-sm font-bold text-[var(--muted)] transition hover:border-[var(--primary-muted)] hover:text-[var(--foreground)]"
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
                      ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-sm"
                      : "text-[var(--muted)] hover:bg-[#2f3b31] hover:text-[var(--foreground)] [html.light_&]:hover:bg-[var(--card-soft)]"
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

        <div className="mt-auto hidden border-t border-[var(--border)] pt-4 lg:block">
  <button
    type="button"
    onClick={handleLogout}
    title={isCollapsed ? "Logout" : undefined}
    className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl text-xs font-bold text-[var(--muted)] transition hover:bg-[#2f3b31] hover:text-[var(--foreground)] [html.light_&]:hover:bg-[var(--card-soft)] [html.light_&]:hover:text-[var(--foreground)] active:scale-[0.98]
      ${isCollapsed ? "px-0" : "px-4"}
    `}
  >
    <span className="text-lg leading-none" aria-hidden="true">
      ⎋
    </span>

    <span className={isCollapsed ? "hidden" : ""}>Logout</span>
  </button>
</div>
      </div>
    </nav>
  );
}