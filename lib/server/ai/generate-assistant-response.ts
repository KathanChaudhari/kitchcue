import { gemini } from "./gemini";
import { type KitchenContext } from "./build-kitchen-context";
import {
  buildKitchenContextPrompt,
  KITCHCUE_SYSTEM_PROMPT
} from "./prompts";

export type AssistantHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type GenerateAssistantResponseInput = {
  message: string;
  kitchenContext: KitchenContext;
  recentMessages?: AssistantHistoryMessage[];
};

const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const MAX_RETRIES = 3;

function cleanRecentMessages(
  messages: AssistantHistoryMessage[]
): AssistantHistoryMessage[] {
  return messages
    .filter(
      (message) =>
        message.content.trim().length > 0 &&
        (message.role === "user" ||
          message.role === "assistant")
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim()
    }));
}

function formatConversationHistory(
  messages: AssistantHistoryMessage[]
) {
  if (messages.length === 0) {
    return "No previous conversation messages.";
  }

  return messages
    .map((message) => {
      const speaker =
        message.role === "user" ? "User" : "KitchCue";

      return `${speaker}: ${message.content}`;
    })
    .join("\n\n");
}

function delay(milliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
}

function getErrorStatus(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return error.status;
  }

  return null;
}

async function generateWithRetry(
  contents: string
) {
  let lastError: unknown;

  for (
    let attempt = 0;
    attempt <= MAX_RETRIES;
    attempt += 1
  ) {
    try {
      return await gemini.models.generateContent({
        model:
          process.env.GEMINI_CHAT_MODEL ??
          DEFAULT_MODEL,

        contents,

        config: {
          systemInstruction: KITCHCUE_SYSTEM_PROMPT,
          temperature: 0.4,
          maxOutputTokens: 1200
        }
      });
    } catch (error) {
      lastError = error;

      const status = getErrorStatus(error);
      const isRetryable =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      if (!isRetryable || attempt === MAX_RETRIES) {
        throw error;
      }

      const delayMilliseconds =
        500 * Math.pow(2, attempt);

      console.warn(
        `Gemini request failed with status ${status}. Retrying attempt ${
          attempt + 1
        }/${MAX_RETRIES} after ${delayMilliseconds}ms.`
      );

      await delay(delayMilliseconds);
    }
  }

  throw lastError;
}

export async function generateAssistantResponse({
  message,
  kitchenContext,
  recentMessages = []
}: GenerateAssistantResponseInput): Promise<string> {
  const cleanedMessage = message.trim();

  if (!cleanedMessage) {
    throw new Error("Message is required");
  }

  const history = cleanRecentMessages(recentMessages);

  const kitchenContextPrompt =
    buildKitchenContextPrompt(kitchenContext);

  const conversationHistory =
    formatConversationHistory(history);

  const contents = `
KITCHCUE APPLICATION CONTEXT

${kitchenContextPrompt}

RECENT CONVERSATION

${conversationHistory}

CURRENT USER MESSAGE

${cleanedMessage}
  `.trim();

  const response = await generateWithRetry(contents);

  const assistantContent = response.text?.trim();

  if (!assistantContent) {
    throw new Error(
      "The Gemini response did not contain any text"
    );
  }

  return assistantContent;
}