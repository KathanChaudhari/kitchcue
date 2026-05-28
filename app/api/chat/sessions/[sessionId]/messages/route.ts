import { getCurrentUser } from "@/lib/server/auth";
import { created, fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { chatMessageCreateSchema } from "@/lib/validation/chat";

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
  const { data, error } = await parseJson(request, chatMessageCreateSchema);
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

    const message = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: data.role,
        content: data.content
      }
    });

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        updatedAt: new Date()
      }
    });

    return created(message);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
