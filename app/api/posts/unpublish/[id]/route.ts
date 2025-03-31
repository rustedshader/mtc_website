import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        published: false,
      },
    });

    return NextResponse.json(
      {
        message: "Post unpublished successfully",
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to unpublish post. Please try again later.",
      },
      { status: 500 }
    );
  }
}
