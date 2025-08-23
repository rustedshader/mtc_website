import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await prisma.registeredUsers.findUnique({
      where: { id: user.id },
    });

    if (!userData || userData.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.post.delete({
      where: {
        id: parseInt(id),
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
