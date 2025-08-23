import { NextResponse } from "next/server";
// TODO: Fix Here to get Image Url from Neon Db not Supabase
export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Construct the proper Supabase URL
    const imageUrl = `/events/${filename}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error getting image URL:", error);
    return NextResponse.json(
      { error: "Failed to get image URL" },
      { status: 500 }
    );
  }
}
