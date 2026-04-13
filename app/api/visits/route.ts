import { NextResponse } from "next/server";

// Simple in-memory counter as fallback (resets on cold start)
// In production, connect Upstash Redis via UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
let inMemoryTotal = 5821;
let inMemoryToday = 47;
let lastDate = new Date().toDateString();

export async function GET() {
  try {
    // Reset today counter if new day
    const today = new Date().toDateString();
    if (today !== lastDate) {
      lastDate = today;
      inMemoryToday = 0;
    }

    inMemoryTotal += 1;
    inMemoryToday += 1;

    return NextResponse.json(
      { today: inMemoryToday, total: inMemoryTotal },
      {
        headers: {
          "Cache-Control": "no-store, no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch {
    return NextResponse.json({ today: 0, total: 0 });
  }
}
