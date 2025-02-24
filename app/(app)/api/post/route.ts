import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const supabase = createClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(
    {
      data: posts,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const { title, content, jwt } = await request.json();
  const {
    data: { user },
  } = await (await supabase).auth.getUser(jwt);

  if (user === null) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
    },
  });

  return NextResponse.json(
    {
      data: post,
    },
    {
      status: 201,
    }
  );
}
