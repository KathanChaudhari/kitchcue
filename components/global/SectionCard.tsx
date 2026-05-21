import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm ${className}`}>
      {title ? <h2 className="mb-3 text-base font-bold">{title}</h2> : null}
      {children}
    </section>
  );
}
