import { getCurrentUser } from "@/lib/server/auth";
import { handleApiError, ok, parseJson } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";
import { notificationSettingsUpdateSchema } from "@/lib/validation/profile";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);

    const settings = await prisma.notificationSetting.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" }
    });

    return ok(settings);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}

export async function PATCH(request: Request) {
  const { data, error } = await parseJson(request, notificationSettingsUpdateSchema);
  if (error) return error;

  try {
    const user = await getCurrentUser(request);

    const settings = await prisma.$transaction(
      data.settings.map((setting) =>
        prisma.notificationSetting.upsert({
          where: {
            userId_key: {
              userId: user.id,
              key: setting.key
            }
          },
          update: {
            title: setting.title,
            description: setting.description,
            enabled: setting.enabled
          },
          create: {
            userId: user.id,
            key: setting.key,
            title: setting.title ?? setting.key,
            description: setting.description,
            enabled: setting.enabled
          }
        })
      )
    );

    return ok(settings);
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
