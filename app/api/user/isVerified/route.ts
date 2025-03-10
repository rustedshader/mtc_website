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
    const user = await prisma.registeredUsers.findMany({
      where: {
        Collage_Mail: {
          equals: userEmail.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    if (user.length > 0) {
      const serializedUser = JSON.parse(
        JSON.stringify(user[0], (_, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
      return NextResponse.json(
        {
          verified: true,
          user: serializedUser,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        verified: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
