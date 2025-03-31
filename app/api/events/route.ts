import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchEventsWithRetry(retries = MAX_RETRIES): Promise<any> {
  try {
    const events = await prisma.post.findMany({
      where: {
        published: true,
        type: "event",
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        date: true,
        slug: true,
      },
    });
    return events;
  } catch (error) {
    if (retries > 0) {
      console.log(
        `Database connection failed. Retrying... (${retries} attempts left)`
      );
      await delay(RETRY_DELAY);
      return fetchEventsWithRetry(retries - 1);
    }
    throw error;
  }
}

export async function GET() {
  try {
    const events = await fetchEventsWithRetry();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events after retries:", error);
    return NextResponse.json(
      { error: "Failed to fetch events. Please try again later." },
      { status: 503 }
    );
  }
}
