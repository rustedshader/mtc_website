import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const not_verified_payment_users = await prisma.payments.findMany({
      where: {
        payment_verified: false,
      },
    });

    return NextResponse.json(not_verified_payment_users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
