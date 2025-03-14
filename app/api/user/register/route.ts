import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    // Parse the request as form data to handle file uploads
    const formData = await request.formData();

    // Extract fields from form data
    const student_name = formData.get("student_name") as string;
    const student_course = formData.get("student_course") as string;
    const student_course_year = formData.get("student_course_year") as string;
    const student_sap_id = formData.get("student_sap_id") as string;
    const student_email = formData.get("email") as string;
    const payment_refrence_number = formData.get(
      "payment_refrence_number"
    ) as string;
    const payment_screenshot = formData.get("payment_screenshot");

    console.log(
      student_name,
      student_course,
      student_course_year,
      student_sap_id,
      student_email,
      student_email,
      payment_screenshot
    );

    // Validate required fields and ensure payment_screenshot is a File
    if (
      !student_name ||
      !student_sap_id ||
      !payment_screenshot ||
      !(payment_screenshot instanceof File)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Generate mtc_id and userId
    const last_id = await prisma.registeredUsers.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const mtc_id = `MTCM${String((last_id?.id || 0) + 1).padStart(4, "0")}`;
    const userId = (last_id?.id || 0) + 1;

    console.log(
      student_name,
      student_course,
      student_course_year,
      student_sap_id,
      mtc_id
    );

    // Create the user in the database
    const user = await prisma.registeredUsers.create({
      data: {
        id: userId,
        student_name: student_name,
        university_sap_id: BigInt(student_sap_id),
        university_course: student_course,
        university_course_year: student_course_year,
        mtc_id: mtc_id,
        university_email: student_email,
        is_verified: false,
      },
    });

    // Upload the image to Supabase storage
    const filePath = `screenshots/${mtc_id}_${payment_screenshot.name}`;
    const { error: uploadError } = await supabase.storage
      .from("payment_screenshots")
      .upload(filePath, payment_screenshot);
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Create the payment record, including the screenshot URL
    await prisma.payments.create({
      data: {
        id: userId,
        mtc_id: mtc_id,
        student_name: student_name,
        university_email: student_email,
        university_sap_id: BigInt(student_sap_id),
        payment_refrence_number: payment_refrence_number,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        registered: true,
        user: {
          id: user.id,
          mtc_id: user.mtc_id,
          student_name: user.student_name,
        },
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
