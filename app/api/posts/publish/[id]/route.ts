import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: true,
      },
    });

    // Map the published property to is_published for frontend consistency
    const responsePost = {
      ...updatedPost,
      is_published: updatedPost.published,
    };

    return NextResponse.json(
      {
        message: "Post published successfully",
        post: responsePost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to publish post. Please try again later.",
      },
      { status: 500 }
    );
  }
}
