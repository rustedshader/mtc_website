import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First find the user by MTC ID to get their user ID
    const user = await prisma.registeredUsers.findFirst({
      where: {
        mtc_id: params.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Then find the payment using the user's ID
    const payment = await prisma.payments.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch payment details. Please try again later.",
      },
      { status: 500 }
    );
  }
}
