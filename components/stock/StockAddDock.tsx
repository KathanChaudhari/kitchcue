"use client";

import { useRef, useState } from "react";
import { StockAddActions } from "@/components/stock/StockAddActions";
import { StockAddPanel } from "@/components/stock/StockAddPanel";
import { createStockItem } from "@/lib/client/stock";

type AddMode = "text" | "audio" | "picture" | null;

type StockAddDockProps = {
  onItemCreated?: () => void;
};

export function StockAddDock({ onItemCreated }: StockAddDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AddMode>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  function openMode(nextMode: AddMode) {
    setMode(nextMode);
    setIsOpen(false);
  }

  function closePanel() {
    setMode(null);
    setMessage("");
    setSelectedImage(null);
    setIsOpen(false);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setMode("picture");
  }

  async function handleSubmit() {
    if (!message.trim()) return;

    try {
      setIsSubmitting(true);

      await createStockItem({
        name: message.trim(),
        quantity: 1,
        unit: "unit",
        category: "Other"
      });

      closePanel();
      onItemCreated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {mode ? (
        <StockAddPanel
          mode={mode}
          message={message}
          selectedImage={selectedImage}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
          onMessageChange={setMessage}
          onClose={closePanel}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : null}

      {!mode ? (
        <StockAddActions
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
          onOpenMode={openMode}
        />
      ) : null}
    </>
  );
}