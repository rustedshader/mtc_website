import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Construct the proper Supabase URL
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/storage/v1/object/public/images/events/${filename}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error getting image URL:", error);
    return NextResponse.json(
      { error: "Failed to get image URL" },
      { status: 500 }
    );
  }
}
