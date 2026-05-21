type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-5 text-center">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}
