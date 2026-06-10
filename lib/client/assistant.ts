import {
    AssistantChatMessage,
    AssistantChatSession
  } from "@/app/types/assistant";
  
  type ApiEnvelope<T> = {
    data?: T;
    message?: string;
    error?: string;
  };
  
  async function parseResponse<T>(response: Response): Promise<T> {
    const result = (await response.json()) as ApiEnvelope<T> | T;
  
    if (!response.ok) {
      const envelope = result as ApiEnvelope<T>;
  
      throw new Error(
        envelope.error ||
          envelope.message ||
          "Something went wrong while processing the request."
      );
    }
  
    if (
      typeof result === "object" &&
      result !== null &&
      "data" in result &&
      (result as ApiEnvelope<T>).data !== undefined
    ) {
      return (result as ApiEnvelope<T>).data as T;
    }
  
    return result as T;
  }
  
  export async function getAssistantSessions() {
    const response = await fetch("/api/assistant", {
      method: "GET",
      cache: "no-store"
    });
  
    return parseResponse<AssistantChatSession[]>(response);
  }
  
  export async function createAssistantSession(title = "New chat") {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
  
    return parseResponse<AssistantChatSession>(response);
  }
  
  export async function renameAssistantSession(
    sessionId: string,
    title: string
  ) {
    const response = await fetch(`/api/assistant/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
  
    return parseResponse<AssistantChatSession>(response);
  }
  
  export async function deleteAssistantSession(sessionId: string) {
    const response = await fetch(`/api/assistant/${sessionId}`, {
      method: "DELETE"
    });
  
    return parseResponse<{ success?: boolean }>(response);
  }
  
  export async function getAssistantMessages(sessionId: string) {
    const response = await fetch(
      `/api/assistant/${sessionId}/messages`,
      {
        method: "GET",
        cache: "no-store"
      }
    );
  
    return parseResponse<AssistantChatMessage[]>(response);
  }
  
  export async function createAssistantMessage(
    sessionId: string,
    content: string
  ) {
    const response = await fetch(
      `/api/assistant/${sessionId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      }
    );
  
    return parseResponse<AssistantChatMessage | AssistantChatMessage[]>(
      response
    );
  }

  type StreamChunkHandler = (chunk: string) => void;

export async function streamAssistantMessage(
  sessionId: string,
  content: string,
  onChunk: StreamChunkHandler
) {
  const response = await fetch(
    `/api/assistant/${sessionId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content
      })
    }
  );

  if (!response.ok) {
    const errorPayload = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorPayload?.error?.message ||
        errorPayload?.message ||
        "Unable to send message."
    );
  }

  if (!response.body) {
    throw new Error(
      "The server did not return a readable response stream."
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, {
        stream: true
      });

      if (chunk) {
        onChunk(chunk);
      }
    }

    const finalChunk = decoder.decode();

    if (finalChunk) {
      onChunk(finalChunk);
    }
  } finally {
    reader.releaseLock();
  }
}