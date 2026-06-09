export type AssistantChatSession = {
    id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  export type AssistantChatMessage = {
    id: string;
    sessionId: string;
    role: "USER" | "ASSISTANT" | "user" | "assistant";
    content: string;
    createdAt?: string;
  };