import { InventoryList } from "@/components/stock/InventoryList";
import { StockAddDock } from "@/components/stock/StockAddDock";
import { Search, SlidersHorizontal } from "lucide-react";

export default function StockPage() {
  return (
    <>
      <div className="hidden border-b border-[var(--border)] bg-[var(--background)] lg:block">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-end px-10 xl:px-14">
          <label className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />

            <input
              type="search"
              placeholder="Search inventory..."
              className="h-10 w-full rounded-full border border-[var(--border)] bg-[var(--card)] pl-11 pr-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
            />
          </label>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-5 lg:px-10 lg:pb-8 lg:pt-8 xl:px-14">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] lg:text-[28px]">
              Current Stocks
            </h1>

            <p className="mt-1 text-sm font-medium text-[var(--muted)]">
              Manage your pantry and fresh ingredients.
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--card)]"
          >
            <SlidersHorizontal className="size-4" />
            Filter
          </button>
        </div>

        <InventoryList />
      </main>

      <StockAddDock />
    </>
  );
}
