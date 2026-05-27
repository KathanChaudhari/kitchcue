"use client";

import { Camera, Mic, Send, Upload } from "lucide-react";

type AddMode = "text" | "audio" | "picture";

type StockAddInputProps = {
  mode: AddMode;
  message: string;
  selectedImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  onMessageChange: (value: string) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function StockAddInput({
  mode,
  message,
  selectedImage,
  fileInputRef,
  cameraInputRef,
  onMessageChange,
  onImageChange
}: StockAddInputProps) {
  return (
    <>
      {mode === "picture" ? (
        <div className="space-y-3">
          {selectedImage ? (
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
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
              onClick={() => cameraInputRef.current?.click()}
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-4 text-sm font-extrabold text-[var(--foreground)] transition hover:bg-[var(--card)]"
            >
              <Camera className="size-4" />
              Camera
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] px-4 text-sm font-extrabold text-[var(--foreground)] transition hover:bg-[var(--card)]"
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
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-soft)] text-sm font-extrabold text-[var(--foreground)] transition hover:bg-[var(--card)]"
          >
            <Mic className="size-4" />
            Start recording
          </button>

          <p className="mt-3 text-center text-xs font-medium text-[var(--muted)]">
            Recording logic can be connected later.
          </p>
        </div>
      ) : null}

      {mode === "text" || mode === "picture" ? (
        <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-2">
          <textarea
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            rows={2}
            placeholder={
              mode === "text"
                ? "Write items here..."
                : "Add extra note about this image..."
            }
            className="min-h-12 flex-1 resize-none rounded-xl bg-transparent px-2 py-2 text-sm font-medium text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />

          <button
            type="button"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-[var(--border)] bg-[var(--card-soft)] text-[var(--foreground)] transition hover:bg-[var(--card)]"
          >
            <Send className="size-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}