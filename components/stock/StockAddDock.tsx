"use client";

import { useRef, useState } from "react";
import { StockAddActions } from "@/components/stock/StockAddActions";
import { StockAddPanel } from "@/components/stock/StockAddPanel";
import { addStockItemsWithAi } from "@/lib/client/stock";

type AddMode = "text" | "audio" | "picture" | null;

type StockAddDockProps = {
  onItemCreated?: () => void;
};

export function StockAddDock({
  onItemCreated
}: StockAddDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AddMode>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [assistantMessage, setAssistantMessage] =
    useState("");

  const [conversation, setConversation] = useState<
    string[]
  >([]);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const cameraInputRef =
    useRef<HTMLInputElement | null>(null);

  function openMode(nextMode: AddMode) {
    if (
      nextMode === "audio" ||
      nextMode === "picture"
    ) {
      return;
    }

    setMode(nextMode);
    setIsOpen(false);
  }

  function closePanel() {
    setMode(null);
    setMessage("");
    setSelectedImage(null);
    setAssistantMessage("");
    setConversation([]);
    setError("");
    setIsOpen(false);
  }

  function handleMessageChange(value: string) {
    setMessage(value);

    if (error) {
      setError("");
    }
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setMode("picture");
  }

  async function handleSubmit() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const result = await addStockItemsWithAi(
        trimmedMessage,
        conversation
      );

      const updatedConversation = [
        ...conversation,
        `User: ${trimmedMessage}`,
        `Assistant: ${result.message}`
      ];

      setConversation(updatedConversation);
      setAssistantMessage(result.message);
      setMessage("");

      if (result.action === "add") {
        /*
         * The API route has already saved the returned
         * items to Prisma at this point.
         */
        await onItemCreated?.();
      }

      /*
       * When action === "ask", keep the panel open.
       * The user can type an answer, and the conversation
       * history is sent back to Gemini.
       */
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to understand those stock items."
      );
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
          onMessageChange={handleMessageChange}
          onClose={closePanel}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          assistantMessage={assistantMessage}
          error={error}
        />
      ) : null}

      {!mode ? (
        <StockAddActions
          isOpen={isOpen}
          onToggle={() =>
            setIsOpen((previous) => !previous)
          }
          onOpenMode={openMode}
          disabledModes={["audio", "picture"]}
        />
      ) : null}
    </>
  );
}