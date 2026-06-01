"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { InventoryItemCard } from "@/components/stock/InventoryItemCard";
import { InventoryItem } from "@/app/types/stock";

type InventoryListProps = {
  items: InventoryItem[];
  onItemUpdated?: () => void;
  onItemDeleted?: () => void;
};

const fallbackCategory = "Other";

function getItemLevel(item: InventoryItem) {
  if (
    item.quantity === null ||
    item.quantity === undefined ||
    item.minimumQuantity === null ||
    item.minimumQuantity === undefined ||
    item.minimumQuantity <= 0
  ) {
    return 70;
  }

  const level = (item.quantity / item.minimumQuantity) * 100;

  return Math.min(Math.round(level), 100);
}

export function InventoryList({
  items,
  onItemUpdated,
  onItemDeleted
}: InventoryListProps) {
  const sections = useMemo(() => {
    const groupedItems = items.reduce<Record<string, InventoryItem[]>>(
      (acc, item) => {
        const category = item.category || fallbackCategory;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(item);

        return acc;
      },
      {}
    );

    return Object.entries(groupedItems).map(([title, sectionItems]) => ({
      title,
      items: sectionItems
    }));
  }, [items]);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  function toggleSection(title: string) {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !(prev[title] ?? true)
    }));
  }

  if (items.length === 0) {
    return (
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="text-sm font-extrabold text-[var(--foreground)]">
          No stock items found
        </h2>

        <p className="mt-1 text-sm font-medium text-[var(--muted)]">
          Add your first kitchen item using the add button.
        </p>
      </section>
    );
  }

  return (
    <section className="grid items-start gap-3 lg:grid-cols-2">
      {sections.map((section) => {
        const isOpen = openSections[section.title] ?? true;

        const lowItems = section.items.filter((item) => {
          if (
            item.quantity === null ||
            item.quantity === undefined ||
            item.minimumQuantity === null ||
            item.minimumQuantity === undefined
          ) {
            return false;
          }

          return item.quantity <= item.minimumQuantity;
        }).length;

        return (
          <div
            key={section.title}
           className="relative self-start overflow-visible rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
       <button
  type="button"
  onClick={() => toggleSection(section.title)}
  className={`flex w-full items-center justify-between gap-4 px-3.5 py-2.5 text-left transition hover:bg-[var(--card-soft)] sm:px-4 ${
    isOpen ? "rounded-t-xl" : "rounded-xl"
  }`}
>
              <div>
                <h2 className="text-[15px] font-extrabold text-[var(--foreground)] sm:text-base">
                  {section.title}
                </h2>

                <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
                  {section.items.length} items
                  {lowItems > 0 ? ` · ${lowItems} low` : " · All good"}
                </p>
              </div>

              <ChevronDown
                className={`size-4 shrink-0 text-[var(--muted)] transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen ? (
         <div className="relative overflow-visible border-t border-[var(--border)] px-3 py-3">
  <div className="relative flex flex-wrap gap-2 overflow-visible">
                  {section.items.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      item={item}
                      level={getItemLevel(item)}
                      onItemUpdated={onItemUpdated}
                      onItemDeleted={onItemDeleted}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}