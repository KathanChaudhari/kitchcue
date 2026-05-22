// app/(dashboard)/layout.tsx

import type { ReactNode } from "react";
import { AppNav } from "@/components/global/AppNav";
import { PageContainer } from "@/components/global/PageContainer";

export default function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] lg:flex">
      <AppNav />

      <div className="min-w-0 flex-1">
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}