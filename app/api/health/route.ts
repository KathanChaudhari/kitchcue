import { ok } from "@/lib/server/api";

export async function GET() {
  return ok({
    status: "ok",
    service: "kitchcue-api",
    timestamp: new Date().toISOString(),
  });
}
