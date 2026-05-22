// app/(dashboard)/layout.tsx
import type { ReactNode } from "react";
import { AppNav } from "@/components/global/AppNav";
import { PageContainer } from "@/components/global/PageContainer";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppNav />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}