import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  scroll?: boolean;
};

export function PageContainer({
  children,
  className = "",
  contentClassName = "",
  scroll = true
}: PageContainerProps) {
  return (
    <main
      className={`h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] ${className}`}
    >
      <div
        className={
          scroll
            ? `h-full overflow-y-auto scrollbar-hide ${contentClassName}`
            : `h-full ${contentClassName}`
        }
      >
        {children}
      </div>
    </main>
  );
}