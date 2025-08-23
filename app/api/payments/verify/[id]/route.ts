import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const currentUser = await stackServerApp.getUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminUserData = await prisma.registeredUsers.findUnique({
      where: { id: currentUser.id },
    });

    if (!adminUserData || adminUserData.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Find the payment by ID (params.id should be the payment ID)
    const payment = await prisma.payments.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        user: true,
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

    // Update the payment verification status
    const updatedPayment = await prisma.payments.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        payment_verified: true,
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
