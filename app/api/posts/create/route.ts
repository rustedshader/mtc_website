import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        {
          error: "Missing required fields: title and content",
        },
        {
          status: 400,
        }
      );
    }

    // Validate title length
    if (title.length > 255) {
      return NextResponse.json(
        {
          error: "Title must be less than 255 characters",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content,
        published: false,
      },
    });

    return NextResponse.json(
      {
        data: post,
        message: "Post created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to create post. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}
