"use client";

import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState
} from "react";

import { InventoryItem } from "@/app/types/stock";
import { InventoryItemCard } from "@/components/stock/InventoryItemCard";

type InventoryListProps = {
  items: InventoryItem[];
  onItemUpdated?: () => void;
  onItemDeleted?: () => void;
};

const fallbackCategory = "Other";

const inventorySectionsStorageKey =
  "kitchcue-inventory-open-sections";

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

  const level =
    (item.quantity / item.minimumQuantity) * 100;

  return Math.min(Math.round(level), 100);
}

export function InventoryList({
  items,
  onItemUpdated,
  onItemDeleted
}: InventoryListProps) {
  const sections = useMemo(() => {
    const groupedItems = items.reduce<
      Record<string, InventoryItem[]>
    >((accumulator, item) => {
      const category =
        item.category || fallbackCategory;

      if (!accumulator[category]) {
        accumulator[category] = [];
      }

      accumulator[category].push(item);

      return accumulator;
    }, {});

    return Object.entries(groupedItems).map(
      ([title, sectionItems]) => ({
        title,
        items: sectionItems
      })
    );
  }, [items]);

  const [openSections, setOpenSections] = useState<
    Record<string, boolean>
  >({});

  const [
    hasLoadedSectionState,
    setHasLoadedSectionState
  ] = useState(false);

  useEffect(() => {
    try {
      const storedValue =
        window.localStorage.getItem(
          inventorySectionsStorageKey
        );

      if (storedValue) {
        const parsedValue: unknown =
          JSON.parse(storedValue);

        if (
          parsedValue &&
          typeof parsedValue === "object" &&
          !Array.isArray(parsedValue)
        ) {
          setOpenSections(
            parsedValue as Record<string, boolean>
          );
        }
      }
    } catch (storageError) {
      console.error(
        "Failed to load inventory section state:",
        storageError
      );
    } finally {
      setHasLoadedSectionState(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedSectionState) {
      return;
    }

    try {
      window.localStorage.setItem(
        inventorySectionsStorageKey,
        JSON.stringify(openSections)
      );
    } catch (storageError) {
      console.error(
        "Failed to save inventory section state:",
        storageError
      );
    }
  }, [openSections, hasLoadedSectionState]);

  function toggleSection(title: string) {
    setOpenSections((previous) => ({
      ...previous,
      [title]: !(previous[title] ?? true)
    }));
  }

  if (items.length === 0) {
    return (
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="text-sm font-extrabold text-[var(--foreground)]">
          No stock items found
        </h2>

        <p className="mt-1 text-sm font-medium text-[var(--muted)]">
          Add your first kitchen item using the add
          button.
        </p>
      </section>
    );
  }

  return (
    <section className="grid items-start gap-3 lg:grid-cols-2">
      {sections.map((section) => {
        const isOpen =
          openSections[section.title] ?? true;

        const lowItems = section.items.filter(
          (item) => {
            if (
              item.quantity === null ||
              item.quantity === undefined ||
              item.minimumQuantity === null ||
              item.minimumQuantity === undefined
            ) {
              return false;
            }

            return (
              item.quantity <= item.minimumQuantity
            );
          }
        ).length;

        return (
          <div
            key={section.title}
            className="relative self-start overflow-visible rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <button
              type="button"
              onClick={() =>
                toggleSection(section.title)
              }
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-4 px-3.5 py-2.5 text-left transition hover:bg-[var(--card-soft)] sm:px-4 ${
                isOpen
                  ? "rounded-t-xl"
                  : "rounded-xl"
              }`}
            >
              <div>
                <h2 className="text-[15px] font-extrabold text-[var(--foreground)] sm:text-base">
                  {section.title}
                </h2>

                <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
                  {section.items.length}{" "}
                  {section.items.length === 1
                    ? "item"
                    : "items"}
                  {lowItems > 0
                    ? ` · ${lowItems} low`
                    : " · All good"}
                </p>
              </div>

              <ChevronDown
                aria-hidden="true"
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