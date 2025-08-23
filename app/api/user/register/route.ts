import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get the current user from Stack Auth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const student_name = formData.get("student_name") as string;
    const email = formData.get("email") as string;
    const student_sap_id = formData.get("student_sap_id") as string;
    const student_course = formData.get("student_course") as string;
    const student_course_year = formData.get("student_course_year") as string;
    const payment_screenshot_url = formData.get(
      "payment_screenshot_url"
    ) as string;
    const payment_refrence_number = formData.get(
      "payment_refrence_number"
    ) as string;

    // Validate required fields
    if (
      !student_name ||
      !email ||
      !student_sap_id ||
      !student_course ||
      !student_course_year ||
      !payment_screenshot_url ||
      !payment_refrence_number
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user is already registered
    const existingUser = await prisma.registeredUsers.findFirst({
      where: {
        id: user.id,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    // Create registered user entry
    const registeredUser = await prisma.registeredUsers.create({
      data: {
        id: user.id,
        name: student_name,
        university_email: email,
        university_sap_id: student_sap_id,
        university_course: student_course,
        university_course_year: student_course_year,
        role: "USER",
      },
    });

    // Create payment record
    await prisma.payments.create({
      data: {
        user_id: user.id,
        payment_refrence_number: payment_refrence_number,
        payment_screenshot_url: payment_screenshot_url,
        payment_verified: false,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: registeredUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
