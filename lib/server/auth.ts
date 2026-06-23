import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { ApiError } from "@/lib/server/api";
import { prisma } from "@/lib/server/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new ApiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    throw new ApiError("Unauthorized", 401);
  }

  return user;
}
