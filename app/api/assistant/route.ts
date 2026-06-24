import { getCurrentUser } from "@/lib/server/auth";
import { created, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { chatSessionCreateSchema } from "@/lib/validation/chat";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return ok(sessions);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, chatSessionCreateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser();

    const session = await prisma.chatSession.create({
      data: {
        userId: user.id,
        title: data.title?.trim() || "New chat",
      },
    });

    return created(session);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
