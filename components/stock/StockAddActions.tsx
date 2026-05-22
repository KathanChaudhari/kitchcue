"use client";

import { Camera, Mic, Plus, Type, X } from "lucide-react";

type AddMode = "text" | "audio" | "picture" | null;

type StockAddActionsProps = {
  isOpen: boolean;
  onToggle: () => void;
  onOpenMode: (mode: AddMode) => void;
};

export function StockAddActions({
  isOpen,
  onToggle,
  onOpenMode
}: StockAddActionsProps) {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 lg:right-8">
      {isOpen ? (
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            title="Take picture"
            aria-label="Take picture"
            onClick={() => onOpenMode("picture")}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105"
          >
            <Camera className="size-4" />
          </button>

          <button
            type="button"
            title="Audio"
            aria-label="Audio"
            onClick={() => onOpenMode("audio")}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105"
          >
            <Mic className="size-4" />
          </button>

          <button
            type="button"
            title="Text"
            aria-label="Text"
            onClick={() => onOpenMode("text")}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-lg transition hover:scale-105"
          >
            <Type className="size-4" />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onToggle}
        className="grid size-14 cursor-pointer place-items-center rounded-full bg-[var(--primary)] text-[var(--ink)] shadow-xl transition active:scale-95"
        aria-label="Add stock item"
      >
        {isOpen ? <X className="size-5" /> : <Plus className="size-6" />}
      </button>
    </div>
  );
}