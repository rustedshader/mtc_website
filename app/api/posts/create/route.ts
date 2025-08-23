import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function POST(request: Request) {
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

    const data = await request.json();
    const { title, content, description, image, date, location, type } = data;

    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Format the date to ISO string if it exists
    const formattedDate = date ? new Date(date).toISOString() : null;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        description,
        image,
        date: formattedDate,
        location,
        type,
        slug,
        published: false,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
