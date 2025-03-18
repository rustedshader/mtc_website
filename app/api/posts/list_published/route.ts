import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
