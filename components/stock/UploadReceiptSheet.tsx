import { SectionCard } from "@/components/global/SectionCard";

export function UploadReceiptSheet() {
  return (
    <SectionCard title="Upload receipt or image">
      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-5 text-center">
        <p className="text-sm font-bold">Receipt scan placeholder</p>
        <p className="mt-2 text-sm text-[var(--muted)]">Later this will analyze photos and add items automatically.</p>
      </div>
    </SectionCard>
  );
}
