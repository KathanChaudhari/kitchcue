import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "wide";
};

const sizeClass = {
  narrow: "max-w-md",
  wide: "max-w-6xl"
};

export function PageContainer({
  children,
  className = "",
  size = "wide"
}: PageContainerProps) {
  return (
    <main
      className={`min-h-screen bg-[#fffaf4] text-[#20201d] lg:pl-64 ${className}`}
    >
      <div
        className={`mx-auto w-full px-5 lg:px-8 ${sizeClass[size]}`}
      >
        {children}
      </div>
    </main>
  );
}