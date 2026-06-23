import { HomeDashboardData } from "@/app/types/home";

function unwrapApiResponse<T>(payload: unknown): T {
  const response = payload as { data?: T };

  if (response && typeof response === "object" && "data" in response) {
    return response.data as T;
  }

  return payload as T;
}

export async function getHomeDashboard(): Promise<HomeDashboardData> {
  const response = await fetch("/api/home", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to load dashboard");
  }

  return unwrapApiResponse<HomeDashboardData>(payload);
}
