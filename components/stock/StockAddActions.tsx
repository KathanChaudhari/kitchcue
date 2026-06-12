"use client";

import { Camera, Mic, Plus, Type, X } from "lucide-react";

type AddMode = "text" | "audio" | "picture";

type StockAddActionsProps = {
  isOpen: boolean;
  onToggle: () => void;
  onOpenMode: (mode: AddMode) => void;
  disabledModes?: AddMode[];
};

export function StockAddActions({
  isOpen,
  onToggle,
  onOpenMode,
  disabledModes = []
}: StockAddActionsProps) {
  function isDisabled(mode: AddMode) {
    return disabledModes.includes(mode);
  }

  return (
    <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-2 sm:right-5 lg:bottom-6 lg:right-8">
      {isOpen ? (
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            title="Picture input coming soon"
            aria-label="Picture input coming soon"
            disabled={isDisabled("picture")}
            onClick={() => onOpenMode("picture")}
            className="grid size-11 place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
          >
            <Camera className="size-4" />
          </button>

          <button
            type="button"
            title="Audio input coming soon"
            aria-label="Audio input coming soon"
            disabled={isDisabled("audio")}
            onClick={() => onOpenMode("audio")}
            className="grid size-11 place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
          >
            <Mic className="size-4" />
          </button>

          <button
            type="button"
            title="Add with text"
            aria-label="Add with text"
            disabled={isDisabled("text")}
            onClick={() => onOpenMode("text")}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
          >
            <Type className="size-4" />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onToggle}
        className="grid size-14 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-xl transition active:scale-95"
        aria-label={isOpen ? "Close stock actions" : "Add stock item"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Plus className="size-6" />}
      </button>
    </div>
  );
}