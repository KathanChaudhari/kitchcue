"use client";

import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ApplianceEditPopup } from "@/components/profile/appliances/ApplianceEditPopup";

type ApplianceSectionProps = {
  appliances: string[];
};

const suggestedAppliances = [
  "Gas Stove",
  "Induction",
  "Microwave",
  "Air Fryer",
  "Oven",
  "Mixer Grinder",
  "Pressure Cooker",
  "Rice Cooker",
  "Toaster",
  "Refrigerator"
];

function normalizeAppliance(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function ApplianceSection({ appliances }: ApplianceSectionProps) {
  const [savedAppliances, setSavedAppliances] = useState<string[]>(appliances);
  const [draftAppliances, setDraftAppliances] = useState<string[]>(appliances);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const hasAppliances = savedAppliances.length > 0;
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    setSavedAppliances(appliances);
    setDraftAppliances(appliances);
  }, [appliances]);

  const filteredSuggestions = useMemo(() => {
    return suggestedAppliances
      .filter(
        (item) =>
          !draftAppliances.some(
            (appliance) => appliance.toLowerCase() === item.toLowerCase()
          )
      )
      .filter((item) => item.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [draftAppliances, normalizedQuery]);

  function openPopup() {
    setDraftAppliances(savedAppliances);
    setQuery("");
    setError("");
    setIsOpen(true);
  }

  function closePopup() {
    if (isSaving) return;

    setIsOpen(false);
    setQuery("");
    setError("");
  }

  function addAppliance(value: string) {
    const appliance = normalizeAppliance(value);

    if (!appliance) return;

    const alreadyExists = draftAppliances.some(
      (item) => item.toLowerCase() === appliance.toLowerCase()
    );

    if (alreadyExists) {
      setQuery("");
      return;
    }

    setDraftAppliances((current) => [...current, appliance]);
    setQuery("");
  }

  function removeAppliance(value: string) {
    setDraftAppliances((current) =>
      current.filter((item) => item.toLowerCase() !== value.toLowerCase())
    );
  }

  async function handleSave() {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/profile/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appliances: draftAppliances
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Could not update appliances");
      }

      setSavedAppliances(draftAppliances);
      setIsOpen(false);
      setQuery("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Something went wrong while saving appliances"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <h3 className="text-sm font-bold text-[var(--primary-soft)]">
            Appliances
          </h3>

          <button
            type="button"
            onClick={openPopup}
            className="text-[11px] font-semibold text-[var(--secondary)] transition hover:opacity-80 sm:text-xs"
          >
            Manage
          </button>
        </div>
        {hasAppliances ? (
  <div className="max-h-[13.5rem] overflow-y-auto pr-1 scrollbar-hide sm:max-h-[11rem] lg:max-h-[16.5rem]">
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-2">
      {savedAppliances.map((appliance) => (
        <button
          type="button"
          key={appliance}
          onClick={openPopup}
          className="flex min-h-16 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-center text-[12px] font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_8%,var(--surface))] active:scale-[0.98] sm:min-h-20 sm:rounded-2xl sm:text-sm"
        >
          <span className="line-clamp-2 leading-tight">{appliance}</span>
        </button>
      ))}

      <button
        type="button"
        onClick={openPopup}
        className="flex min-h-16 items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] bg-transparent px-3 py-3 text-center text-[12px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)] active:scale-[0.98] sm:min-h-20 sm:rounded-2xl sm:text-sm"
      >
        <Plus size={16} />
        <span className="leading-tight">Add more</span>
      </button>
    </div>
  </div>
) : (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              No appliances added yet
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Add appliances so KitchCue can suggest recipes you can actually
              make.
            </p>

            <button
              type="button"
              onClick={openPopup}
              className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-3 text-xs font-bold text-[var(--ink)] transition active:scale-95"
            >
              <Plus size={15} />
              Add appliances
            </button>
          </div>
        )}
      </section>

      {isOpen ? (
        <ApplianceEditPopup
          draftAppliances={draftAppliances}
          query={query}
          filteredSuggestions={filteredSuggestions}
          error={error}
          isSaving={isSaving}
          onQueryChange={setQuery}
          onAdd={addAppliance}
          onRemove={removeAppliance}
          onClose={closePopup}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
}