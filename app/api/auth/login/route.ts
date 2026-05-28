import { fail, handleApiError, ok, parseJson } from "@/lib/server/api";
import { verifyPassword } from "@/lib/server/password";
import { prisma } from "@/lib/server/prisma";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const { data, error } = await parseJson(request, loginSchema);
  if (error) return error;

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user?.passwordHash || !verifyPassword(data.password, user.passwordHash)) {
      return fail("Invalid email or password", 401);
    }

    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image
    });
  } catch (routeError) {
    return handleApiError(routeError);
  }
}
