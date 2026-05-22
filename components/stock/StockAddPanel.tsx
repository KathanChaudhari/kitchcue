"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { StockAddInput } from "@/components/stock/StockAddInput";

type AddMode = "text" | "audio" | "picture";

type StockAddPanelProps = {
  mode: AddMode;
  message: string;
  selectedImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  onMessageChange: (value: string) => void;
  onClose: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const titleByMode = {
  text: "Add by text",
  audio: "Add by voice",
  picture: "Add by picture"
};

const helperByMode = {
  text: "Tell me what you want to add. Example: “Add 1 kg tomatoes, 2 milk packets, and 12 eggs.”",
  audio:
    "Speak your stock update. Example: “I bought potatoes, milk, curd and bananas.”",
  picture:
    "Upload a receipt, grocery photo, or pantry image. I’ll check what items can be added."
};

export function StockAddPanel({
  mode,
  message,
  selectedImage,
  fileInputRef,
  cameraInputRef,
  onMessageChange,
  onClose,
  onImageChange
}: StockAddPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-md overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--tertiary)_45%,var(--border))] bg-[var(--surface-muted)] shadow-2xl lg:bottom-6 lg:right-8"
    >
      <div className="border-b border-[color-mix(in_srgb,var(--tertiary)_45%,var(--border))] bg-[color-mix(in_srgb,var(--tertiary)_32%,var(--card))] px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-[var(--foreground)]">
              {titleByMode[mode]}
            </h2>

            <p className="mt-0.5 text-xs font-semibold text-[color-mix(in_srgb,var(--foreground)_72%,var(--muted))]">
              KitchCue will help you add stock faster.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[color-mix(in_srgb,var(--tertiary)_28%,var(--border))] bg-[color-mix(in_srgb,var(--tertiary)_14%,var(--card-soft))] text-[var(--foreground)] transition hover:border-[color-mix(in_srgb,var(--tertiary)_45%,var(--border))] hover:bg-[color-mix(in_srgb,var(--tertiary)_24%,var(--card-soft))]"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] p-3">
          <p className="text-sm font-medium leading-relaxed text-[var(--foreground)]">
            {helperByMode[mode]}
          </p>
        </div>

        <StockAddInput
          mode={mode}
          message={message}
          selectedImage={selectedImage}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
          onMessageChange={onMessageChange}
          onImageChange={onImageChange}
        />
      </div>
    </div>
  );
}