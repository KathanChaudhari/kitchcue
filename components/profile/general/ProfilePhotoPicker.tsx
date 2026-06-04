"use client";

import { ChevronRight, UserRound } from "lucide-react";

type ProfilePhotoPickerProps = {
  image: string;
  onOpen: () => void;
};

export function ProfilePhotoPicker({ image, onOpen }: ProfilePhotoPickerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-left transition hover:border-[var(--primary)]/60 hover:bg-[var(--card-soft)] active:scale-[0.99]"
    >
      <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--primary)_20%,var(--card))] text-[var(--primary-soft)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <UserRound size={28} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
          Profile photo
        </p>

        <p className="mt-1 truncate text-sm font-bold text-[var(--foreground)]">
          {image ? "Change profile photo" : "Add profile photo"}
        </p>

        <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
          Take a picture or upload from device
        </p>
      </div>

      <ChevronRight size={16} className="shrink-0 text-[var(--muted)]" />
    </button>
  );
}