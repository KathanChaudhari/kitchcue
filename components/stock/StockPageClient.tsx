"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { InventoryItem } from "@/app/types/stock";
import { InventoryList } from "@/components/stock/InventoryList";
import { ManualStockAddPanel } from "@/components/stock/ManualStockAddPanel";
import { StockAddDock } from "@/components/stock/StockAddDock";
import { getStockItems } from "@/lib/client/stock";

export function StockPageClient() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [lowOnly, setLowOnly] = useState(false);
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getStockItems({
        q: search,
        low: lowOnly
      });

      setItems(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load stock items."
      );
    } finally {
      setIsLoading(false);
    }
  }, [search, lowOnly]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadItems();
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadItems]);

  const totalItems = useMemo(() => items.length, [items]);

  function toggleManualAddPanel() {
    setIsManualAddOpen((current) => !current);
  }

  function closeManualAddPanel() {
    setIsManualAddOpen(false);
  }

  async function handleItemCreated() {
    setIsManualAddOpen(false);
    await loadItems();
  }

  return (
    <>
      <div className="hidden border-b border-[var(--border)] bg-[var(--background)] lg:block">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-end px-10 xl:px-14">
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search inventory</span>

            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search inventory..."
              className="h-10 w-full rounded-full border border-[var(--border)] bg-[var(--card)] pl-11 pr-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
            />
          </label>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-4 sm:px-5 lg:px-10 lg:pb-8 lg:pt-8 xl:px-14">
        <div className="mb-4 space-y-4 lg:mb-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] lg:text-[28px]">
                Current Stocks
              </h1>

              <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your
                kitchen stock.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleManualAddPanel}
              aria-expanded={isManualAddOpen}
              aria-controls="manual-stock-add-panel"
              className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[var(--primary)] px-3 text-sm font-extrabold text-[var(--ink)] transition hover:opacity-90 active:scale-[0.98] sm:px-4"
            >
              <Plus
                aria-hidden="true"
                className={`size-4 transition ${
                  isManualAddOpen ? "rotate-45" : ""
                }`}
              />

              <span className="hidden sm:inline">
                {isManualAddOpen ? "Close" : "Add stock"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative min-w-0 flex-1 lg:hidden">
              <span className="sr-only">Search inventory</span>

              <Search
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search inventory..."
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
              />
            </label>

            <button
              type="button"
              onClick={() => setLowOnly((current) => !current)}
              aria-pressed={lowOnly}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-bold transition active:scale-[0.98] sm:px-4 ${
                lowOnly
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--ink)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--card-soft)]"
              }`}
            >
              <SlidersHorizontal
                aria-hidden="true"
                className="size-4"
              />

              <span className="hidden sm:inline">
                {lowOnly ? "Low stock only" : "Low stock"}
              </span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-[var(--card)] p-4 text-sm font-medium text-[var(--muted)]">
            Loading stock items...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[var(--secondary)]/30 bg-[var(--card)] p-4 text-sm font-medium text-[var(--secondary)]">
            {error}
          </div>
        ) : (
          <InventoryList
            items={items}
            onItemUpdated={loadItems}
            onItemDeleted={loadItems}
          />
        )}
      </main>

      <div id="manual-stock-add-panel">
        <ManualStockAddPanel
          isOpen={isManualAddOpen}
          onClose={closeManualAddPanel}
          onItemCreated={handleItemCreated}
        />
      </div>

      <StockAddDock onItemCreated={loadItems} />
    </>
  );
}