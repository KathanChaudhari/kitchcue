import Link from "next/link";
import { AddItemSheet } from "@/components/stock/AddItemSheet";
import { UploadReceiptSheet } from "@/components/stock/UploadReceiptSheet";

export default function AddStockItemPage() {
  return (
    <>
      <div className="flex items-center justify-between pb-4 pt-5">
        <h1 className="text-2xl font-bold">Add item</h1>
        <Link className="rounded-full bg-[var(--card)] px-4 py-2 text-sm font-bold shadow-sm" href="/stock">
          Close
        </Link>
      </div>
      <div className="grid gap-4 pb-8 lg:grid-cols-2">
        <AddItemSheet />
        <UploadReceiptSheet />
      </div>
    </>
  );
}
