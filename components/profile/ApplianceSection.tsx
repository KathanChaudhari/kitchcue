"use client";

import {
  AirVent,
  ChefHat,
  Loader2,
  Microwave,
  Plus,
  Trash2,
  Utensils,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

function getApplianceIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("microwave")) return Microwave;
  if (normalizedName.includes("air")) return AirVent;
  if (normalizedName.includes("pressure")) return ChefHat;

  return Utensils;
}

function normalizeAppliance(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function ApplianceSection({ appliances }: ApplianceSectionProps) {
  const [savedAppliances, setSavedAppliances] = useState<string[]>(appliances);
  const [draftAppliances, setDraftAppliances] = useState<string[]>(appliances);
  const [customAppliance, setCustomAppliance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const hasAppliances = savedAppliances.length > 0;

  useEffect(() => {
    setSavedAppliances(appliances);
    setDraftAppliances(appliances);
  }, [appliances]);

  const remainingSuggestions = useMemo(() => {
    return suggestedAppliances.filter(
      (item) =>
        !draftAppliances.some(
          (appliance) => appliance.toLowerCase() === item.toLowerCase()
        )
    );
  }, [draftAppliances]);

  function openPopup() {
    setDraftAppliances(savedAppliances);
    setCustomAppliance("");
    setError("");
    setIsOpen(true);
  }

  function closePopup() {
    if (isSaving) return;

    setIsOpen(false);
    setCustomAppliance("");
    setError("");
  }

  function addAppliance(value: string) {
    const appliance = normalizeAppliance(value);

    if (!appliance) return;

    const alreadyExists = draftAppliances.some(
      (item) => item.toLowerCase() === appliance.toLowerCase()
    );

    if (alreadyExists) {
      setCustomAppliance("");
      return;
    }

    setDraftAppliances((current) => [...current, appliance]);
    setCustomAppliance("");
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
      setCustomAppliance("");
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
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {savedAppliances.map((appliance) => {
              const Icon = getApplianceIcon(appliance);

              return (
                <button
                  type="button"
                  key={appliance}
                  onClick={openPopup}
                  className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2 py-3 text-center text-[12px] font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm"
                >
                  <Icon
                    size={20}
                    className="text-[var(--primary-soft)] sm:size-[22px]"
                  />

                  <span className="leading-tight">{appliance}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={openPopup}
              className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] bg-transparent px-2 py-3 text-center text-[12px] font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)] sm:min-h-24 sm:gap-2 sm:rounded-2xl sm:text-sm"
            >
              <Plus size={20} className="sm:size-[22px]" />
              <span className="leading-tight">Add more</span>
            </button>
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-3 pb-3 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-4">
              <div>
                <h3 className="text-base font-bold text-[var(--primary-soft)]">
                  Manage appliances
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                  Select the appliances available in your kitchen. This helps
                  KitchCue suggest practical meals.
                </p>
              </div>

              <button
                type="button"
                onClick={closePopup}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4 scrollbar-hide">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Your appliances
                </p>

                {draftAppliances.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {draftAppliances.map((appliance) => {
                      const Icon = getApplianceIcon(appliance);

                      return (
                        <div
                          key={appliance}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"
                        >
                          <Icon
                            size={14}
                            className="text-[var(--primary-soft)]"
                          />

                          <span>{appliance}</span>

                          <button
                            type="button"
                            onClick={() => removeAppliance(appliance)}
                            className="ml-1 text-[var(--muted)] transition hover:text-[var(--secondary)]"
                            aria-label={`Remove ${appliance}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center">
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      No appliances selected
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Add one from suggestions or type your own.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Quick add
                </p>

                <div className="flex flex-wrap gap-2">
                  {remainingSuggestions.map((appliance) => (
                    <button
                      key={appliance}
                      type="button"
                      onClick={() => addAppliance(appliance)}
                      className="rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                    >
                      + {appliance}
                    </button>
                  ))}

                  {remainingSuggestions.length === 0 ? (
                    <p className="text-xs text-[var(--muted)]">
                      All suggested appliances are already added.
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Custom appliance
                </p>

                <div className="flex gap-2">
                  <input
                    value={customAppliance}
                    onChange={(event) =>
                      setCustomAppliance(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addAppliance(customAppliance);
                      }
                    }}
                    placeholder="Example: Sandwich maker"
                    className="h-10 min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                  />

                  <button
                    type="button"
                    onClick={() => addAppliance(customAppliance)}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] px-3 text-xs font-bold text-[var(--ink)] transition active:scale-95"
                  >
                    <Plus size={15} />
                    Add
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-[var(--secondary)]/40 bg-[var(--secondary)]/10 p-3 text-xs font-medium text-[var(--secondary)]">
                  {error}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] p-4">
              <button
                type="button"
                onClick={closePopup}
                disabled={isSaving}
                className="h-10 rounded-xl border border-[var(--border)] px-4 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 text-xs font-bold text-[var(--ink)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? <Loader2 size={15} className="animate-spin" /> : null}
                {isSaving ? "Saving..." : "Save appliances"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}