import type {
    AiStockResponse
  } from "@/app/types/stock";
  import { gemini } from "@/lib/server/ai/gemini";
  import {
    aiStockResponseSchema
  } from "@/lib/validation/stock-ai";
  import { Type } from "@google/genai";
  
  type InterpretStockMessageParams = {
    message: string;
    conversation?: string[];
  };
  
  export async function interpretStockMessage({
    message,
    conversation = []
  }: InterpretStockMessageParams): Promise<AiStockResponse> {
    const normalizedMessage = message.trim();
  
    if (!normalizedMessage) {
      throw new Error("Stock message is required.");
    }
  
    const conversationText =
      conversation.length > 0
        ? conversation.join("\n")
        : "No previous conversation.";
  
    const response =
      await gemini.models.generateContent({
        model:
          process.env.GEMINI_STOCK_MODEL ??
          process.env.GEMINI_CHAT_MODEL ??
          "gemini-2.5-flash",
  
        contents: `
  You are KitchCue's conversational kitchen-stock assistant.
  
  Your job is to understand what groceries the user bought and either:
  
  1. Return action "add" when the information is clear enough to save.
  2. Return action "ask" when important information is missing or genuinely ambiguous.
  
  Previous conversation:
  ${conversationText}
  
  Latest user message:
  ${JSON.stringify(normalizedMessage)}
  
  Allowed categories:
  - Vegetables
  - Fruits
  - Dairy
  - Grains
  - Spices
  - Snacks
  - Beverages
  - Other
  
  Allowed units:
  - kg
  - g
  - litre
  - ml
  - pcs
  - pack
  - bottle
  - box
  
  Rules:
  - Use general food knowledge to classify ingredients.
  - Cheese, milk, butter, paneer, cream, and yogurt belong to Dairy.
  - Mango, apple, banana, orange, and similar produce belong to Fruits.
  - Tomato, onion, potato, spinach, and similar produce belong to Vegetables.
  - Rice, wheat, flour, oats, and similar foods belong to Grains.
  - Correct obvious spelling mistakes.
  - Use clean singular item names.
  - "3 pcs of cheese" means Cheese, quantity 3, unit pcs, category Dairy.
  - "2 mangoes" means Mango, quantity 2, unit pcs, category Fruits.
  - "2 packs of 500 ml milk" means Milk, quantity 1000, unit ml, category Dairy.
  - If the item, quantity, and unit are clear, use action "add".
  - If quantity or unit is missing and cannot safely be inferred, use action "ask".
  - Ask only one short clarification question at a time.
  - Never invent unusual quantities.
  - Do not add anything when action is "ask".
  - When action is "add", include a brief confirmation message.
  `,
  
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
  
          responseSchema: {
            type: Type.OBJECT,
  
            properties: {
              action: {
                type: Type.STRING,
                enum: ["add", "ask"]
              },
  
              message: {
                type: Type.STRING,
                description:
                  "A short confirmation or clarification question"
              },
  
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
  
                  properties: {
                    name: {
                      type: Type.STRING
                    },
  
                    quantity: {
                      type: Type.NUMBER
                    },
  
                    unit: {
                      type: Type.STRING,
                      enum: [
                        "kg",
                        "g",
                        "litre",
                        "ml",
                        "pcs",
                        "pack",
                        "bottle",
                        "box"
                      ]
                    },
  
                    category: {
                      type: Type.STRING,
                      enum: [
                        "Vegetables",
                        "Fruits",
                        "Dairy",
                        "Grains",
                        "Spices",
                        "Snacks",
                        "Beverages",
                        "Other"
                      ]
                    }
                  },
  
                  required: [
                    "name",
                    "quantity",
                    "unit",
                    "category"
                  ]
                }
              }
            },
  
            required: [
              "action",
              "message",
              "items"
            ]
          }
        }
      });
  
    const responseText = response.text?.trim();
  
    if (!responseText) {
      throw new Error(
        "Gemini returned an empty stock response."
      );
    }
  
    let parsedResponse: unknown;
  
    try {
      parsedResponse = JSON.parse(responseText);
    } catch {
      throw new Error(
        "Gemini returned invalid stock JSON."
      );
    }
  
    const validation =
      aiStockResponseSchema.safeParse(
        parsedResponse
      );
  
    if (!validation.success) {
      console.error(
        "Invalid AI stock response:",
        validation.error.flatten()
      );
  
      throw new Error(
        "Gemini returned an unsupported stock response."
      );
    }
  
    return validation.data;
  }