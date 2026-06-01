import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { profileUpdateSchema } from "@/lib/validation/profile";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,

        preferences: true,
        notificationSettings: true
      }
    });

    return ok(profile);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function PATCH(request: Request) {
  const { data, error } = await parseJson(request, profileUpdateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,

        preferences: true,
        notificationSettings: true
      }
    });

    return ok(updatedUser);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}