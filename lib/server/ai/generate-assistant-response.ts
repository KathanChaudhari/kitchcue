import { gemini } from "./gemini";
import { type KitchenContext } from "./build-kitchen-context";
import { buildKitchenContextPrompt, KITCHCUE_SYSTEM_PROMPT } from "./prompts";

export type AssistantHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GenerateAssistantResponseInput = {
  message: string;
  kitchenContext: KitchenContext;
  recentMessages?: AssistantHistoryMessage[];
};

type AssistantChunkHandler = (chunk: string) => void | Promise<void>;

const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const MAX_RETRIES = 3;

function cleanRecentMessages(
  messages: AssistantHistoryMessage[],
): AssistantHistoryMessage[] {
  return messages
    .filter(
      (message) =>
        message.content.trim().length > 0 &&
        (message.role === "user" || message.role === "assistant"),
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function formatConversationHistory(messages: AssistantHistoryMessage[]) {
  if (messages.length === 0) {
    return "No previous conversation messages.";
  }

  return messages
    .map((message) => {
      const speaker = message.role === "user" ? "User" : "KitchCue";

      return `${speaker}: ${message.content}`;
    })
    .join("\n\n");
}

function buildContents({
  message,
  kitchenContext,
  recentMessages = [],
}: GenerateAssistantResponseInput) {
  const cleanedMessage = message.trim();

  if (!cleanedMessage) {
    throw new Error("Message is required");
  }

  const history = cleanRecentMessages(recentMessages);

  const kitchenContextPrompt = buildKitchenContextPrompt(kitchenContext);

  const conversationHistory = formatConversationHistory(history);

  return `
KITCHCUE APPLICATION CONTEXT

${kitchenContextPrompt}

RECENT CONVERSATION

${conversationHistory}

CURRENT USER MESSAGE

${cleanedMessage}
  `.trim();
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
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

function isRetryableError(error: unknown) {
  const status = getErrorStatus(error);

  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

function getRetryDelay(attempt: number) {
  return 500 * Math.pow(2, attempt);
}

/**
 * Normal, non-streaming generation.
 *
 * You can keep this function for any existing code that still needs
 * the complete response as one string.
 */
async function generateWithRetry(contents: string) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await gemini.models.generateContent({
        model: process.env.GEMINI_CHAT_MODEL ?? DEFAULT_MODEL,

        contents,

        config: {
          systemInstruction: KITCHCUE_SYSTEM_PROMPT,
          temperature: 0.4,
          maxOutputTokens: 5000,
        },
      });
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error) || attempt === MAX_RETRIES) {
        throw error;
      }

      const delayMilliseconds = getRetryDelay(attempt);

      console.warn(
        `Gemini request failed with status ${getErrorStatus(
          error,
        )}. Retrying attempt ${
          attempt + 1
        }/${MAX_RETRIES} after ${delayMilliseconds}ms.`,
      );

      await delay(delayMilliseconds);
    }
  }

  throw lastError;
}

/**
 * Starts a Gemini streaming request.
 *
 * Retries are only performed before the first text chunk is sent.
 * Once streaming has started, retrying could duplicate part of the
 * response in the UI.
 */
async function streamWithRetry(
  contents: string,
  onChunk: AssistantChunkHandler,
) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    let hasEmittedContent = false;

    try {
      const response = await gemini.models.generateContentStream({
        model: process.env.GEMINI_CHAT_MODEL ?? DEFAULT_MODEL,

        contents,

        config: {
          systemInstruction: KITCHCUE_SYSTEM_PROMPT,
          temperature: 0.4,
          maxOutputTokens: 5000,
        },
      });

      for await (const chunk of response) {
        const text = chunk.text ?? "";

        if (!text) continue;

        hasEmittedContent = true;

        await onChunk(text);
      }

      return;
    } catch (error) {
      lastError = error;

      /*
       * Never restart the Gemini request after part of the answer
       * has already reached the browser. Doing so could duplicate
       * content in the temporary assistant message.
       */
      if (hasEmittedContent) {
        throw error;
      }

      if (!isRetryableError(error) || attempt === MAX_RETRIES) {
        throw error;
      }

      const delayMilliseconds = getRetryDelay(attempt);

      console.warn(
        `Gemini stream failed with status ${getErrorStatus(
          error,
        )}. Retrying attempt ${
          attempt + 1
        }/${MAX_RETRIES} after ${delayMilliseconds}ms.`,
      );

      await delay(delayMilliseconds);
    }
  }

  throw lastError;
}

export async function streamAssistantResponse(
  input: GenerateAssistantResponseInput,
  onChunk: AssistantChunkHandler,
): Promise<void> {
  const contents = buildContents(input);

  let fullResponse = "";

  await streamWithRetry(contents, async (chunk) => {
    fullResponse += chunk;
    await onChunk(chunk);
  });

  if (!fullResponse.trim()) {
    throw new Error("The Gemini response did not contain any text");
  }
}

export async function generateAssistantResponse(
  input: GenerateAssistantResponseInput,
): Promise<string> {
  const contents = buildContents(input);

  const response = await generateWithRetry(contents);

  const assistantContent = response.text?.trim();

  if (!assistantContent) {
    throw new Error("The Gemini response did not contain any text");
  }

  return assistantContent;
}
