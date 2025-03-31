import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { title, content, description, image, date, location, type } = data;

    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Format the date to ISO string if it exists
    const formattedDate = date ? new Date(date).toISOString() : null;

    const post = await prisma.post.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        content,
        description,
        image,
        date: formattedDate,
        location,
        type,
        slug,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
