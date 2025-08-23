import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function GET(request: Request) {
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

    // Get all contact submissions
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// Mark contact as resolved
export async function PATCH(request: Request) {
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

    const body = await request.json();
    const { contactId, resolved } = body;

    if (!contactId) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      );
    }

    // Update contact resolved status
    const updatedContact = await prisma.contact.update({
      where: {
        id: parseInt(contactId),
      },
      data: {
        resolved: resolved ?? true,
      },
    });

    return NextResponse.json(
      { message: "Contact updated successfully", contact: updatedContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
