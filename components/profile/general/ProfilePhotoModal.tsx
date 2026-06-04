"use client";

import { Camera, Check, ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  cropImageToSquare,
  readFileAsDataUrl
} from "./profileImageUtils";
import { ProfilePhotoCropper } from "./ProfilePhotoCropper";

type ProfilePhotoModalProps = {
  initialImage: string;
  onClose: () => void;
  onSave: (image: string) => void;
};

export function ProfilePhotoModal({
  initialImage,
  onClose,
  onSave
}: ProfilePhotoModalProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState("");
  const [isPreparingImage, setIsPreparingImage] = useState(false);

  function closeModal() {
    if (isPreparingImage) return;
    onClose();
  }

  async function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    try {
      setIsPreparingImage(true);

      const imageDataUrl = await readFileAsDataUrl(file);

      setSelectedImage(imageDataUrl);
      setPositionX(50);
      setPositionY(50);
      setZoom(1);
      setImageError("");
    } catch {
      setImageError("Could not read this image. Please try another one.");
    } finally {
      setIsPreparingImage(false);
    }
  }

  async function handleSaveSelectedImage() {
    if (!selectedImage) return;

    try {
      setIsPreparingImage(true);
      setImageError("");

      const croppedImage = await cropImageToSquare(
        selectedImage,
        positionX,
        positionY,
        zoom
      );

      onSave(croppedImage);
      onClose();
    } catch {
      setImageError("Could not prepare this image. Please try again.");
    } finally {
      setIsPreparingImage(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60 px-3 pb-3 sm:items-center sm:justify-center sm:p-4">
      <div className="w-full rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl sm:max-w-sm sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[var(--foreground)]">
              Profile photo
            </h3>

            <p className="mt-1 text-xs font-medium text-[var(--muted)]">
              Upload and adjust your round photo.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={isPreparingImage}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:opacity-50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={isPreparingImage}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_18%,var(--card-soft))] px-3 py-3 text-xs font-bold text-[var(--primary-soft)] transition active:scale-[0.98] disabled:opacity-50"
          >
            <Camera size={16} />
            Take picture
          </button>

          <button
            type="button"
            onClick={() => uploadInputRef.current?.click()}
            disabled={isPreparingImage}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[color-mix(in_srgb,var(--secondary)_18%,var(--card-soft))] px-3 py-3 text-xs font-bold text-[var(--secondary)] transition active:scale-[0.98] disabled:opacity-50"
          >
            <ImagePlus size={16} />
            Upload
          </button>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleImageSelect}
        />

        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        <ProfilePhotoCropper
          image={selectedImage}
          positionX={positionX}
          positionY={positionY}
          zoom={zoom}
          isDisabled={isPreparingImage}
          onPositionChange={(position) => {
            setPositionX(position.x);
            setPositionY(position.y);
          }}
          onZoomChange={setZoom}
        />

        {imageError ? (
          <p className="mt-3 rounded-2xl bg-[color-mix(in_srgb,var(--secondary)_16%,var(--card))] px-3 py-2 text-xs font-semibold text-[var(--secondary)]">
            {imageError}
          </p>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={closeModal}
            disabled={isPreparingImage}
            className="rounded-2xl border border-[var(--border)] px-4 py-3 text-xs font-bold text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveSelectedImage}
            disabled={!selectedImage || isPreparingImage}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-4 py-3 text-xs font-bold text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
          >
            <Check size={16} />
            {isPreparingImage ? "Preparing..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}