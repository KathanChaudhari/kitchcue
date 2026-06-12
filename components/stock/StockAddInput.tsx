"use client";

import {
  Camera,
  Loader2,
  Mic,
  Send,
  Sparkles,
  Upload
} from "lucide-react";
import type {
  KeyboardEvent,
  RefObject
} from "react";

type AddMode = "text" | "audio" | "picture";

type StockAddInputProps = {
  mode: AddMode;
  message: string;
  selectedImage: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  cameraInputRef: RefObject<HTMLInputElement | null>;
  onMessageChange: (value: string) => void;
  onImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  assistantMessage?: string;
  error?: string;
};

export function StockAddInput({
  mode,
  message,
  selectedImage,
  fileInputRef,
  cameraInputRef,
  onMessageChange,
  onImageChange,
  onSubmit,
  isSubmitting = false,
  assistantMessage = "",
  error = ""
}: StockAddInputProps) {
  const canSubmit =
    mode === "picture"
      ? Boolean(selectedImage || message.trim())
      : Boolean(message.trim());

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (canSubmit && !isSubmitting) {
        onSubmit();
      }
    }
  }

  return (
    <>
      {mode === "picture" ? (
        <div className="space-y-3">
          {selectedImage ? (
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected stock upload"
                className="max-h-44 w-full object-cover sm:max-h-52"
              />
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                cameraInputRef.current?.click()
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-4 text-sm font-extrabold text-[var(--foreground)]"
            >
              <Camera className="size-4" />
              Camera
            </button>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-4 text-sm font-extrabold text-[var(--foreground)]"
            >
              <Upload className="size-4" />
              Upload
            </button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onImageChange}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </div>
      ) : null}

      {mode === "audio" ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3">
          <button
            type="button"
            disabled
            className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] text-sm font-extrabold text-[var(--muted)] opacity-50"
          >
            <Mic className="size-4" />
            Audio coming soon
          </button>
        </div>
      ) : null}

      {mode === "text" || mode === "picture" ? (
        <div className="space-y-2">
          {/* Gemini response */}
          {assistantMessage ? (
            <div className="flex items-start gap-2 rounded-xl border border-[var(--primary)]/25 bg-[color-mix(in_srgb,var(--primary)_8%,var(--card))] p-3">
              <Sparkles
                className="mt-0.5 size-4 shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />

              <p className="text-xs leading-5 text-[var(--foreground)]">
                {assistantMessage}
              </p>
            </div>
          ) : null}

          <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-2 transition focus-within:border-[var(--primary)]">
            <textarea
              value={message}
              onChange={(event) =>
                onMessageChange(event.target.value)
              }
              onKeyDown={handleKeyDown}
              rows={2}
              disabled={isSubmitting}
              placeholder={
                assistantMessage
                  ? "Reply here..."
                  : "Try: I bought 3 pieces of cheese and 2 mangoes"
              }
              className="min-h-14 min-w-0 flex-1 resize-none rounded-xl bg-transparent px-2 py-2 text-base font-medium text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            />

            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit || isSubmitting}
              aria-label={
                isSubmitting
                  ? "Understanding stock items"
                  : "Send to stock assistant"
              }
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-[var(--primary)] text-[var(--ink)] transition hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Send
                  className="size-4"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {isSubmitting ? (
            <p className="flex items-center gap-1.5 px-1 text-xs font-medium text-[var(--muted)]">
              <Sparkles
                className="size-3.5 text-[var(--primary)]"
                aria-hidden="true"
              />
              Understanding your stock update...
            </p>
          ) : (
            <p className="px-1 text-[11px] leading-4 text-[var(--muted)]">
              Write naturally. KitchCue will add clear
              items or ask for missing information.
            </p>
          )}

          {error ? (
            <p
              role="alert"
              className="px-1 text-xs font-medium text-[var(--secondary)]"
            >
              {error}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}