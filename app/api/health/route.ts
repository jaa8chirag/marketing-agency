import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Plug this into an uptime monitor (UptimeRobot, Better Uptime, Vercel's
// own monitoring, etc.) pointed at /api/health — it actually round-trips to
// Postgres, so it catches "the app is up but the database connection is
// broken" (e.g. a rotated Neon password, a hit connection limit), which a
// check against "/" alone would miss since most pages would still 500
// gracefully-ish rather than reveal the real cause.
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", db: "unreachable", message: err instanceof Error ? err.message : "unknown error" },
      { status: 503 }
    );
  }
}
