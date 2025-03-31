import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(
      {
        message: "Post deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete post. Please try again later.",
      },
      { status: 500 }
    );
  }
}
