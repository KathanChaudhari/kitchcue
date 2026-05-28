import { getCurrentUser } from "@/lib/server/auth";
import { fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { z } from "zod";

const chatSessionUpdateSchema = z.object({
  title: z.string().min(1).max(80)
});

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { data, error } = await parseJson(request, chatSessionUpdateSchema);
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

    const updatedSession = await prisma.chatSession.update({
      where: {
        id: sessionId
      },
      data: {
        title: data.title.trim(),
        updatedAt: new Date()
      }
    });

    return ok(updatedSession);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
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

    await prisma.chatSession.delete({
      where: {
        id: sessionId
      }
    });

    return ok({
      deleted: true,
      id: sessionId
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}