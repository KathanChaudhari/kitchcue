import { getCurrentUser } from "@/lib/server/auth";
import { created, fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { z } from "zod";

const chatUserMessageCreateSchema = z.object({
  content: z.string().min(1)
});

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser(request);
    const { sessionId } = await context.params;

    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: user.id
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });

    if (!session) return fail("Chat session not found", 404);

    return ok(session.messages);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { data, error } = await parseJson(request, chatUserMessageCreateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser(request);
    const { sessionId } = await context.params;

    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: user.id
      }
    });

    if (!session) return fail("Chat session not found", 404);

    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "user",
        content: data.content.trim()
      }
    });

    // Later, replace this with actual OpenAI response.
    const assistantReply =
      "This is a placeholder AI response. Later I will answer using your kitchen stock, preferences, and cooking needs.";

    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "assistant",
        content: assistantReply
      }
    });

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        updatedAt: new Date()
      }
    });

    return created({
      userMessage,
      assistantMessage
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}