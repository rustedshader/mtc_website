import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title");

    // Get content from request body instead of headers
    const body = await request.json();
    const mdContent = body.mdContent;

    if (!title || !mdContent) {
      return NextResponse.json(
        {
          error: "Missing title or content",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.post.create({
      data: {
        title: title,
        content: mdContent,
        published: false,
      },
    });

    return NextResponse.json(
      {
        data: "Post created",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to create post",
      },
      {
        status: 500,
      }
    );
  }
}
