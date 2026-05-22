"use client";

import { useRef, useState } from "react";
import { StockAddActions } from "@/components/stock/StockAddActions";
import { StockAddPanel } from "@/components/stock/StockAddPanel";

type AddMode = "text" | "audio" | "picture" | null;

export function StockAddDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AddMode>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setMode("picture");
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