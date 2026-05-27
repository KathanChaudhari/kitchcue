"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { InventoryItemCard } from "@/components/stock/InventoryItemCard";

const sections = [
  {
    title: "Vegetables",
    items: [
      { name: "Tomatoes", amount: "6 pcs", level: 70 },
      { name: "Potatoes", amount: "1.5 kg", level: 80 },
      { name: "Onions", amount: "800 g", level: 55 },
      { name: "Green Chili", amount: "Few left", level: 22 }
    ]
  },
  {
    title: "Dairy & Eggs",
    items: [
      { name: "Whole Milk", amount: "250 ml left", level: 18 },
      { name: "Curd", amount: "1 bowl", level: 45 },
      { name: "Paneer", amount: "200 g", level: 60 },
      { name: "Large Eggs", amount: "10 ct", level: 90 }
    ]
  },
  {
    title: "Fruits",
    items: [
      { name: "Banana", amount: "5 pcs", level: 65 },
      { name: "Apple", amount: "3 pcs", level: 45 },
      { name: "Orange", amount: "2 pcs", level: 30 }
    ]
  },
  {
    title: "Grains & Staples",
    items: [
      { name: "Rice", amount: "2 kg", level: 80 },
      { name: "Wheat Flour", amount: "1.5 kg", level: 65 },
      { name: "Poha", amount: "500 g", level: 50 },
      { name: "Besan", amount: "Small pack", level: 28 }
    ]
  },
  {
    title: "Masala & Spices",
    items: [
      { name: "Turmeric", amount: "Small jar", level: 28 },
      { name: "Red Chili Powder", amount: "Half jar", level: 45 },
      { name: "Garam Masala", amount: "1 pack", level: 70 },
      { name: "Salt", amount: "900 g", level: 85 }
    ]
  },
  {
    title: "Cleaning & Utility",
    items: [
      { name: "Dish Soap", amount: "Half bottle", level: 46 },
      { name: "Garbage Bags", amount: "8 left", level: 35 },
      { name: "Foil Paper", amount: "1 roll", level: 40 }
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
    <section className="grid items-start gap-3 lg:grid-cols-2">
      {sections.map((section) => {
        const isOpen = openSections[section.title];
        const lowItems = section.items.filter((item) => item.level < 35).length;
  
        return (
          <div
            key={section.title}
            className="self-start overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="flex w-full items-center justify-between gap-4 px-3.5 py-2.5 text-left transition hover:bg-[var(--card-soft)] sm:px-4"
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
              <div className="border-t border-[var(--border)] px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <InventoryItemCard key={item.name} {...item} />
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