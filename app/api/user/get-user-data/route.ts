import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { error: "userEmail is required" },
        { status: 400 }
      );
    }
    // Query the database for a user with the provided email (case-insensitive).
    const user = await prisma.registeredUsers.findFirst({
      where: {
        university_email: {
          equals: userEmail.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          verified: false,
          user: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        verified: user.is_verified,
        mtc_id: user.mtc_id,
        sap_id: user.university_sap_id
          ? user.university_sap_id.toString()
          : null,
        name: user.student_name,
        year: user.university_course_year,
        course: user.university_course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
