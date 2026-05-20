import { SectionCard } from "@/components/global/SectionCard";

export function UploadReceiptSheet() {
  return (
    <SectionCard title="Upload receipt or image">
      <div className="rounded-2xl border border-dashed border-[#dacbb8] bg-[#fffaf4] p-5 text-center">
        <p className="text-sm font-bold">Receipt scan placeholder</p>
        <p className="mt-2 text-sm text-[#7a6b58]">Later this will analyze photos and add items automatically.</p>
      </div>
    </SectionCard>
  );
}
