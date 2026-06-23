import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    await prisma.waitlistEntry.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for joining the waitlist! We’ll let you know when early access is ready.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Waitlist signup failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
