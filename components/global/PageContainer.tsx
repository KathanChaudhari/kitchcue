"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DesktopHeader } from "@/components/global/DesktopHeader";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  headerTitle?: string;
  searchPlaceholder?: string;
  size?: "narrow" | "wide";
};

const sizeClass = {
  narrow: "max-w-md",
  wide: "max-w-6xl"
};

const routeHeader = [
  {
    path: "/assistant",
    title: "Assistant",
    searchPlaceholder: "Search chats and prompts",
    size: "wide" as const
  },
  {
    path: "/stock/add-stock",
    title: "Add Stock",
    searchPlaceholder: "Search pantry items",
    size: "wide" as const
  },
  {
    path: "/stock",
    title: "Stocks",
    searchPlaceholder: "Search pantry items",
    size: "wide" as const
  },
  {
    path: "/profile",
    title: "Profile",
    searchPlaceholder: "Search settings",
    size: "wide" as const
  },
  {
    path: "/onboarding",
    title: "Onboarding",
    searchPlaceholder: "Search setup",
    size: "narrow" as const
  },
  {
    path: "/home",
    title: "Dashboard",
    searchPlaceholder: "Search pantry, meals, notes",
    size: "wide" as const
  }
];

export function PageContainer({
  children,
  className = "",
  headerTitle,
  searchPlaceholder,
  size
}: PageContainerProps) {
  const pathname = usePathname();
  const currentRoute = routeHeader.find((route) => pathname.startsWith(route.path));
  const resolvedTitle = headerTitle ?? currentRoute?.title ?? "Dashboard";
  const resolvedSearchPlaceholder =
    searchPlaceholder ??
    currentRoute?.searchPlaceholder ??
    "Search kitchen, recipes, stock";
  const resolvedSize = size ?? currentRoute?.size ?? "wide";

  return (
    <main
      className={`h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] lg:pl-64 ${className}`}
    >
      <div className={`mx-auto flex h-full w-full flex-col px-5 lg:px-8 ${sizeClass[resolvedSize]}`}>
        <div className="shrink-0 border-b border-[var(--border)] bg-[var(--background)]">
          <DesktopHeader
            title={resolvedTitle}
            searchPlaceholder={resolvedSearchPlaceholder}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </main>
  );
}
