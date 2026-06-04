"use client";

import { UserRound } from "lucide-react";
import { PointerEvent, WheelEvent, useRef } from "react";

type DragState = {
  startX: number;
  startY: number;
  startPositionX: number;
  startPositionY: number;
};

type ProfilePhotoCropperProps = {
  image: string;
  positionX: number;
  positionY: number;
  zoom: number;
  isDisabled?: boolean;
  onPositionChange: (position: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ProfilePhotoCropper({
  image,
  positionX,
  positionY,
  zoom,
  isDisabled = false,
  onPositionChange,
  onZoomChange
}: ProfilePhotoCropperProps) {
  const dragStateRef = useRef<DragState | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!image || isDisabled) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startPositionX: positionX,
      startPositionY: positionY
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragStateRef.current || !image || isDisabled) return;

    const dragState = dragStateRef.current;
    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    const sensitivity = 0.35 / zoom;

    onPositionChange({
      x: clamp(dragState.startPositionX - deltaX * sensitivity, 0, 100),
      y: clamp(dragState.startPositionY - deltaY * sensitivity, 0, 100)
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    dragStateRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (!image || isDisabled) return;

    event.preventDefault();

    const nextZoom =
      event.deltaY > 0
        ? clamp(zoom - 0.08, 1, 2.5)
        : clamp(zoom + 0.08, 1, 2.5);

    onZoomChange(Number(nextZoom.toFixed(2)));
  }

  return (
    <div className="rounded-3xl bg-[var(--surface)] p-4">
      <div className="mx-auto grid h-40 w-40 place-items-center rounded-3xl bg-[var(--card)] p-2">
        <div
          role="button"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          className="relative h-36 w-36 touch-none select-none overflow-hidden rounded-full bg-[var(--card)] ring-2 ring-[var(--primary)]/50"
          title="Drag to reposition"
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Selected profile"
              draggable={false}
              className="h-full w-full cursor-grab object-cover active:cursor-grabbing"
              style={{
                objectPosition: `${positionX}% ${positionY}%`,
                transform: `scale(${zoom})`
              }}
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <UserRound size={40} className="text-[var(--muted)]" />
            </div>
          )}
        </div>
      </div>

      {image ? (
        <>
          <p className="mt-2 text-center text-[11px] font-medium text-[var(--muted)]">
            Drag to adjust
          </p>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                Zoom
              </label>

              <span className="text-xs font-bold text-[var(--primary-soft)]">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(event) => onZoomChange(Number(event.target.value))}
              disabled={isDisabled}
              className="w-full accent-[var(--primary)] disabled:opacity-40"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}