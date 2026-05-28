import { getCurrentUser } from "@/lib/server/auth";
import { created, handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { chatSessionCreateSchema } from "@/lib/validation/chat";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);

    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: user.id
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc"
          },
          take: 1
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
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
    const user = await getCurrentUser(request);

    const session = await prisma.chatSession.create({
      data: {
        userId: user.id,
        title: data.title?.trim() || "New chat"
      }
    });

    return created(session);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}