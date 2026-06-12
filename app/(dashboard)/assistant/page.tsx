"use client";

import { useCallback, useEffect, useState } from "react";

import {
  AssistantChatMessage,
  AssistantChatSession
} from "@/app/types/assistant";

import { AssistantChatHeader } from "@/components/assistant/AssistantChatHeader";
import { ChatInput } from "@/components/assistant/ChatInput";
import { ChatThread } from "@/components/assistant/ChatThread";
import { SuggestedPromptChips } from "@/components/assistant/SuggestedPromptChips";

import {
  createAssistantSession,
  deleteAssistantSession,
  getAssistantMessages,
  getAssistantSessions,
  renameAssistantSession,
  streamAssistantMessage
} from "@/lib/client/assistant";

export default function AssistantPage() {
  const [chats, setChats] = useState<AssistantChatSession[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<AssistantChatMessage[]>([]);
  const [draftMessage, setDraftMessage] = useState("");

  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isMutatingChat, setIsMutatingChat] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [error, setError] = useState("");

  const loadChats = useCallback(async () => {
    try {
      setError("");
      setIsLoadingChats(true);

      const sessions = await getAssistantSessions();

      // Automatically create the first chat when none exist.
      if (sessions.length === 0) {
        const firstChat = await createAssistantSession("New chat 1");

        setChats([firstChat]);
        setSelectedChatId(firstChat.id);
        setMessages([]);

        return;
      }

      setChats(sessions);

      setSelectedChatId((currentId) => {
        const currentChatStillExists = sessions.some(
          (session) => session.id === currentId
        );

        if (currentId && currentChatStillExists) {
          return currentId;
        }

        return sessions[0].id;
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load chats."
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
        err instanceof Error
          ? err.message
          : "Unable to load messages."
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
    if (isMutatingChat) return;

    try {
      setError("");
      setIsMutatingChat(true);

      const title = getNextChatTitle(chats);
      const newChat = await createAssistantSession(title);

      setChats((currentChats) => [newChat, ...currentChats]);
      setSelectedChatId(newChat.id);
      setMessages([]);
      setDraftMessage("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create chat."
      );
    } finally {
      setIsMutatingChat(false);
    }
  }

  async function handleRenameChat(
    sessionId: string,
    title: string
  ) {
    if (isMutatingChat) return;

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
        err instanceof Error
          ? err.message
          : "Unable to rename chat."
      );

      throw err;
    } finally {
      setIsMutatingChat(false);
    }
  }

  async function handleDeleteChat(sessionId: string) {
    if (isMutatingChat) return;

    try {
      setError("");
      setIsMutatingChat(true);

      await deleteAssistantSession(sessionId);

      const remainingChats = chats.filter(
        (chat) => chat.id !== sessionId
      );

      setMessages([]);
      setDraftMessage("");

      /*
       * If the deleted chat was the final chat,
       * immediately create a replacement.
       */
      if (remainingChats.length === 0) {
        const replacementChat = await createAssistantSession(
          "New chat 1"
        );

        setChats([replacementChat]);
        setSelectedChatId(replacementChat.id);

        return;
      }

      setChats(remainingChats);

      if (selectedChatId === sessionId) {
        setSelectedChatId(remainingChats[0].id);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete chat."
      );
    } finally {
      setIsMutatingChat(false);
    }
  }

  function handleSelectChat(sessionId: string) {
    if (
      sessionId === selectedChatId ||
      isSendingMessage ||
      isMutatingChat
    ) {
      return;
    }

    setMessages([]);
    setDraftMessage("");
    setSelectedChatId(sessionId);
  }

  async function handleSendMessage(content: string) {
    if (!selectedChatId || !content.trim() || isSendingMessage) {
      return;
    }

    const sessionId = selectedChatId;
    const trimmedContent = content.trim();

    const temporaryUserId =
      `temporary-user-${crypto.randomUUID()}`;

    const temporaryAssistantId =
      `temporary-assistant-${crypto.randomUUID()}`;

    const temporaryUserMessage: AssistantChatMessage = {
      id: temporaryUserId,
      sessionId,
      role: "USER",
      content: trimmedContent,
      createdAt: new Date().toISOString()
    };

    const temporaryAssistantMessage: AssistantChatMessage = {
      id: temporaryAssistantId,
      sessionId,
      role: "ASSISTANT",
      content: "",
      createdAt: new Date().toISOString()
    };

    try {
      setError("");
      setIsSendingMessage(true);

      setMessages((currentMessages) => [
        ...currentMessages,
        temporaryUserMessage,
        temporaryAssistantMessage
      ]);

      await streamAssistantMessage(
        sessionId,
        trimmedContent,
        (chunk) => {
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === temporaryAssistantId
                ? {
                    ...message,
                    content: message.content + chunk
                  }
                : message
            )
          );
        }
      );

      const persistedMessages =
        await getAssistantMessages(sessionId);

      /*
       * Only update the thread if the user is still viewing
       * the session that sent the message.
       */
      setSelectedChatId((currentSelectedId) => {
        if (currentSelectedId === sessionId) {
          setMessages(persistedMessages);
        }

        return currentSelectedId;
      });

      setChats((currentChats) => {
        const activeChat = currentChats.find(
          (chat) => chat.id === sessionId
        );

        if (!activeChat) return currentChats;

        return [
          activeChat,
          ...currentChats.filter(
            (chat) => chat.id !== sessionId
          )
        ];
      });
    } catch (err) {
      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message.id !== temporaryAssistantId
        )
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send message."
      );
    } finally {
      setIsSendingMessage(false);
    }
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
          isStreaming={isSendingMessage}
          hasSelectedChat={Boolean(selectedChatId)}
        />
      </div>

      <div className="shrink-0 bg-[var(--background)] pb-24 pt-2 sm:pb-4 lg:pb-4">
        <div className="hidden sm:block">
          <SuggestedPromptChips
            disabled={!selectedChatId || isSendingMessage}
            onPromptSelect={setDraftMessage}
          />
        </div>

        <ChatInput
          sessionId={selectedChatId}
          value={draftMessage}
          isSending={isSendingMessage}
          onValueChange={setDraftMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </section>
  );
}

function getNextChatTitle(chats: AssistantChatSession[]) {
  const existingNumbers = new Set<number>();

  chats.forEach((chat) => {
    const match = chat.title
      .trim()
      .match(/^New chat(?:\s+(\d+))?$/i);

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