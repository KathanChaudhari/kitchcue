import { openai } from "./openai";
import { KitchenContext } from "./build-kitchen-context";
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

const DEFAULT_MODEL = "gpt-5.4-mini";

function cleanRecentMessages(
  messages: AssistantHistoryMessage[]
) {
  return messages
    .filter((message) => {
      return (
        message.content.trim().length > 0 &&
        (message.role === "user" ||
          message.role === "assistant")
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim()
    }));
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

  const response = await openai.responses.create({
    model:
      process.env.OPENAI_CHAT_MODEL ?? DEFAULT_MODEL,

    instructions: KITCHCUE_SYSTEM_PROMPT,

    input: [
      {
        role: "developer",
        content: kitchenContextPrompt
      },
      ...history,
      {
        role: "user",
        content: cleanedMessage
      }
    ],

    max_output_tokens: 1200
  });

  const assistantContent = response.output_text?.trim();

  if (!assistantContent) {
    throw new Error(
      "The AI response did not contain any text"
    );
  }

  return assistantContent;
}