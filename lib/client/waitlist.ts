export type JoinWaitlistResponse = {
  success: boolean;
  message: string;
};

export async function joinWaitlist(
  email: string,
): Promise<JoinWaitlistResponse> {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = (await response.json()) as JoinWaitlistResponse;

  if (!response.ok) {
    throw new Error(data.message || "Unable to join the waitlist.");
  }

  return data;
}
