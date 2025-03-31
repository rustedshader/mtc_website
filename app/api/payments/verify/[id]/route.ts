import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
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

    // Update the payment verification status
    const updatedPayment = await prisma.payments.update({
      where: {
        id: user.id,
      },
      data: {
        payment_verified: true,
      },
    });

    // Also update the user's verification status
    await prisma.registeredUsers.update({
      where: {
        id: user.id,
      },
      data: {
        is_verified: true,
      },
    });

    return NextResponse.json(
      {
        message: "Payment verified successfully",
        payment: updatedPayment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to verify payment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
