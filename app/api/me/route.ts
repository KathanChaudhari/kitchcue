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

        age: true,
        gender: true,
        liveIn: true,
        from: true,

        createdAt: true,
        updatedAt: true,

        preferences: true,
        notificationSettings: true,
      },
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

        age: true,
        gender: true,
        liveIn: true,
        from: true,

        createdAt: true,
        updatedAt: true,

        preferences: true,
        notificationSettings: true,
      },
    });

    return ok(updatedUser);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser();

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return ok({
      message: "Your account has been deleted.",
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
