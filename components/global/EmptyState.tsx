type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#dacbb8] bg-[#fffaf4] p-5 text-center">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm text-[#7a6b58]">{description}</p>
    </div>
  );
}
