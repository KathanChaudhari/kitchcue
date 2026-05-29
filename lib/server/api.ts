import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 400, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      error: {
        message,
        details
      }
    },
    { status }
  );
}

export async function parseJson<T>(request: Request, schema: ZodSchema<T>) {
  try {
    const body = await request.json();

    return {
      data: schema.parse(body),
      error: null
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: null,
        error: fail("Invalid request body", 422, error.flatten())
      };
    }

    return {
      data: null,
      error: fail("Request body must be valid JSON", 400)
    };
  }
}

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof ApiError) {
    return fail(error.message, error.status, error.details);
  }

  return fail("Something went wrong", 500);
}