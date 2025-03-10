import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("username");

    // Get content from request body instead of headers
    const body = await request.json();
    const payment_screenshot = body.payment_screenshot;

    if (!title || !payment_screenshot) {
      return NextResponse.json(
        {
          error: "Missing title or content",
        },
        {
          status: 400,
        }
      );
    }

    // await prisma.post.create({
    //     data: {
    //         title: title,
    //         content: mdContent,
    //         published: false,
    //     },
    // });

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
