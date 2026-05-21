"use client";

import { useState } from "react";
import { InventoryItemCard } from "@/components/stock/InventoryItemCard";

const sections = [
  {
    title: "Daily essentials",
    items: [
      { name: "Milk", category: "Food", amount: "250 ml left", level: 18 },
      { name: "Rice", category: "Food", amount: "2 kg", level: 80 },
      { name: "Dish soap", category: "Cleaning", amount: "Half bottle", level: 46 }
    ]
  },
  {
    title: "Food & ingredients",
    items: [
      { name: "Turmeric", category: "Masala", amount: "Small jar", level: 28 },
      { name: "Wheat flour", category: "Food", amount: "1.5 kg", level: 65 },
      { name: "Cooking oil", category: "Food", amount: "700 ml", level: 50 }
    ]
  },
  {
    title: "Utensils",
    items: [
      { name: "Spoons", category: "Cutlery", amount: "12 pcs", level: 100 },
      { name: "Steel plates", category: "Cutlery", amount: "6 pcs", level: 100 }
    ]
  },
  {
    title: "Other kitchen items",
    items: [
      { name: "Foil paper", category: "Storage", amount: "1 roll", level: 40 },
      { name: "Garbage bags", category: "Cleaning", amount: "8 left", level: 35 }
    ]
  }
];

export function InventoryList() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () =>
      sections.reduce((acc, section) => {
        acc[section.title] = true;
        return acc;
      }, {} as Record<string, boolean>)
  );

  function toggleSection(title: string) {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  }

  return (
    <section className="h-[calc(100vh-9rem)] space-y-4 overflow-y-auto pr-1 pb-24 lg:pb-2">
      {sections.map((section) => {
        const isOpen = openSections[section.title];

        return (
          <div
            key={section.title}
            className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="sticky top-0 z-[1] flex w-full items-center justify-between bg-[color-mix(in_srgb,var(--card)_92%,transparent)] px-4 py-3 text-left backdrop-blur"
            >
              <div>
                <h2 className="text-sm font-bold text-[var(--foreground)]">
                  {section.title}
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {section.items.length} items
                </p>
              </div>

              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--card-soft)] text-sm font-bold text-[var(--muted)]">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div className="max-h-80 space-y-3 overflow-y-auto px-3 pb-3">
                {section.items.map((item) => (
                  <InventoryItemCard key={item.name} {...item} />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
