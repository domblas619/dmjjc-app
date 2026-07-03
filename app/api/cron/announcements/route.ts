import { NextResponse } from "next/server";
import { sendDueAnnouncementAlerts } from "@/lib/reminders/announcement-publishing";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(await sendDueAnnouncementAlerts());
}
