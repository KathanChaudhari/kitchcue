import { buildKitchenContext } from "@/lib/server/ai/build-kitchen-context";
import {
  generateAssistantResponse,
  type AssistantHistoryMessage,
} from "@/lib/server/ai/generate-assistant-response";
import { getCurrentUser } from "@/lib/server/auth";
import { created, fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { z } from "zod";

const chatMessageCreateSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(4000, "Message is too long"),
});

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

type PreviousChatMessage = {
  role: string;
  content: string;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    const { sessionId } = await context.params;

    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!session) {
      return fail("Chat session not found", 404);
    }

    const messages = await prisma.chatMessage.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return ok(messages);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { data, error } = await parseJson(request, chatMessageCreateSchema);

  if (error) return error;

  try {
    const user = await getCurrentUser();
    const { sessionId } = await context.params;

    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!session) {
      return fail("Chat session not found", 404);
    }

    const previousMessages: PreviousChatMessage[] =
      await prisma.chatMessage.findMany({
        where: {
          sessionId,
          role: {
            in: ["user", "assistant"],
          },
        },
        select: {
          role: true,
          content: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 12,
      });

    const recentMessages: AssistantHistoryMessage[] = previousMessages
      .reverse()
      .map((message: PreviousChatMessage) => ({
        role: message.role as "user" | "assistant",
        content: message.content,
      }));

    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "user",
        content: data.content,
      },
    });

    const kitchenContext = await buildKitchenContext(user.id);

    let assistantReply: string;

    try {
      assistantReply = await generateAssistantResponse({
        message: data.content,
        kitchenContext,
        recentMessages,
      });
    } catch (aiError) {
      console.error("Gemini request failed:", aiError);

      assistantReply =
        "I couldn't generate an AI response right now. Please check the Gemini API key and quota, then try again.";
    }

    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "assistant",
        content: assistantReply,
      },
    });

    await prisma.chatSession.update({
      where: {
        id: sessionId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return created({
      userMessage,
      assistantMessage,
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
