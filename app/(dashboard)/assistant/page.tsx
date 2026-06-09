"use client";

import { useCallback, useEffect, useState } from "react";
import { AssistantChatMessage, AssistantChatSession } from "@/app/types/assistant";
import { AssistantChatHeader } from "@/components/assistant/AssistantChatHeader";
import { ChatInput } from "@/components/assistant/ChatInput";
import { ChatThread } from "@/components/assistant/ChatThread";
import { SuggestedPromptChips } from "@/components/assistant/SuggestedPromptChips";
import {
  createAssistantSession,
  deleteAssistantSession,
  getAssistantMessages,
  getAssistantSessions,
  renameAssistantSession
} from "@/lib/client/assistant";

export default function AssistantPage() {
  const [chats, setChats] = useState<AssistantChatSession[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<AssistantChatMessage[]>([]);

  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isMutatingChat, setIsMutatingChat] = useState(false);
  const [error, setError] = useState("");

  const loadChats = useCallback(async () => {
    try {
      setError("");
      setIsLoadingChats(true);

      const sessions = await getAssistantSessions();

      setChats(sessions);

      setSelectedChatId((currentId) => {
        const currentChatStillExists = sessions.some(
          (session) => session.id === currentId
        );

        if (currentId && currentChatStillExists) {
          return currentId;
        }

        return sessions[0]?.id ?? null;
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load chats."
      );
    } finally {
      setIsLoadingChats(false);
    }
  }, []);

  const loadMessages = useCallback(async (sessionId: string) => {
    try {
      setError("");
      setIsLoadingMessages(true);

      const sessionMessages = await getAssistantMessages(sessionId);

      setMessages(sessionMessages);
    } catch (err) {
      setMessages([]);
      setError(
        err instanceof Error ? err.message : "Unable to load messages."
      );
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    void loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      return;
    }

    void loadMessages(selectedChatId);
  }, [selectedChatId, loadMessages]);

  async function handleCreateChat() {
    try {
      setError("");
      setIsMutatingChat(true);
  
      const title = getNextChatTitle(chats);
      const newChat = await createAssistantSession(title);
  
      setChats((currentChats) => [newChat, ...currentChats]);
      setSelectedChatId(newChat.id);
      setMessages([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create chat."
      );
    } finally {
      setIsMutatingChat(false);
    }
  }

  async function handleRenameChat(
    sessionId: string,
    title: string
  ) {
    try {
      setError("");
      setIsMutatingChat(true);

      const updatedChat = await renameAssistantSession(
        sessionId,
        title
      );

      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === sessionId
            ? {
                ...chat,
                ...updatedChat,
                title: updatedChat.title || title
              }
            : chat
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to rename chat."
      );
    } finally {
      setIsMutatingChat(false);
    }
  }

  async function handleDeleteChat(sessionId: string) {
    try {
      setError("");
      setIsMutatingChat(true);

      await deleteAssistantSession(sessionId);

      const remainingChats = chats.filter(
        (chat) => chat.id !== sessionId
      );

      setChats(remainingChats);
      setMessages([]);

      if (selectedChatId === sessionId) {
        setSelectedChatId(remainingChats[0]?.id ?? null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete chat."
      );
    } finally {
      setIsMutatingChat(false);
    }
  }

  function handleSelectChat(sessionId: string) {
    if (sessionId === selectedChatId) return;

    setMessages([]);
    setSelectedChatId(sessionId);
  }

  async function handleMessageSent() {
    if (!selectedChatId) return;

    await loadMessages(selectedChatId);

    // Move the active conversation to the top.
    setChats((currentChats) => {
      const activeChat = currentChats.find(
        (chat) => chat.id === selectedChatId
      );

      if (!activeChat) return currentChats;

      return [
        activeChat,
        ...currentChats.filter(
          (chat) => chat.id !== selectedChatId
        )
      ];
    });
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--background)] px-3 sm:px-4 lg:px-6">
      <AssistantChatHeader
        chats={chats}
        selectedChatId={selectedChatId}
        isLoading={isLoadingChats}
        isMutating={isMutatingChat}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      {error ? (
        <div className="mt-2 rounded-xl border border-[#d58a72]/30 bg-[#d58a72]/10 px-3 py-2 text-xs font-semibold text-[#d58a72]">
          {error}
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto pb-3 scrollbar-hide">
        <ChatThread
          messages={messages}
          isLoading={isLoadingMessages}
          hasSelectedChat={Boolean(selectedChatId)}
        />
      </div>

      <div className="shrink-0 bg-[var(--background)] pb-24 pt-2 sm:pb-4 lg:pb-4">
        <div className="hidden sm:block">
          <SuggestedPromptChips />
        </div>

        <ChatInput
          sessionId={selectedChatId}
          onMessageSent={handleMessageSent}
        />
      </div>
    </section>
  );
}

function getNextChatTitle(chats: AssistantChatSession[]) {
  const existingNumbers = new Set<number>();

  chats.forEach((chat) => {
    const match = chat.title.trim().match(/^New chat(?:\s+(\d+))?$/i);

    if (!match) return;

    const number = match[1] ? Number(match[1]) : 1;

    if (Number.isFinite(number)) {
      existingNumbers.add(number);
    }
  });

  let nextNumber = 1;

  while (existingNumbers.has(nextNumber)) {
    nextNumber += 1;
  }

  return `New chat ${nextNumber}`;
}