import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the current user from Stack Auth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is already registered
    const registeredUser = await prisma.registeredUsers.findFirst({
      where: {
        id: user.id,
      },
      include: {
        payments: true,
      },
    });

    if (registeredUser) {
      return NextResponse.json({
        registered: true,
        user: registeredUser,
        isEmailVerified: user.primaryEmailVerified,
        paymentVerified: registeredUser.payments[0]?.payment_verified || false,
      });
    } else {
      return NextResponse.json({
        registered: false,
      });
    }
  } catch (error) {
    console.error("Check registration error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
