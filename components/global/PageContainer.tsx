import type { ReactNode } from "react";
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

export function PageContainer({
  children,
  className = "",
  headerTitle = "Dashboard",
  searchPlaceholder = "Search kitchen, recipes, stock",
  size = "wide"
}: PageContainerProps) {
  return (
    <main
      className={`h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] lg:pl-64 ${className}`}
    >
      <div className={`mx-auto flex h-full w-full flex-col px-5 lg:px-8 ${sizeClass[size]}`}>
        <div className="shrink-0 border-b border-[var(--border)] bg-[var(--background)]">
          <DesktopHeader
            title={headerTitle}
            searchPlaceholder={searchPlaceholder}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </main>
  );
}