import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { error: "userEmail is required" },
        { status: 400 }
      );
    }
    // Query the database for a user with the provided email (case-insensitive).
    const user = await prisma.registeredUsers.findFirst({
      where: {
        university_email: {
          equals: userEmail.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    if (user?.is_verified) {
      return NextResponse.json(
        {
          verified: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          verified: false,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
