import Link from "next/link";
import { SectionCard } from "@/components/global/SectionCard";

const methods = ["Chat", "Audio", "Photo"];

export function AddItemSheet() {
  return (
    <SectionCard title="Add stock item">
      <p className="mb-4 text-sm text-[#7a6b58]">Choose how you want to add kitchen stock.</p>
      <div className="grid grid-cols-3 gap-2">
        {methods.map((method) => (
          <button key={method} className="rounded-xl bg-[#f7efe4] px-3 py-4 text-sm font-bold text-[#6b5c49]" type="button">
            {method}
          </button>
        ))}
      </div>
      <Link className="mt-4 block rounded-xl bg-[#20201d] px-4 py-3 text-center text-sm font-bold text-white" href="/stock">
        Add demo item
      </Link>
    </SectionCard>
  );
}
