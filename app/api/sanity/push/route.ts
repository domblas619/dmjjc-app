import { NextResponse } from "next/server";
import { sendPushToAll } from "@/lib/push/send";
import type { PushPayload } from "@/lib/push/types";

export const runtime = "nodejs";

const urgentEventTypes = new Set(["Closure", "Holiday", "Special Schedule"]);
const urgentStatusTypes = new Set(["Closed", "Modified Schedule", "Event Day", "Holiday Closure"]);

function getAuthSecret(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) return authorization.slice("Bearer ".length);
  return request.headers.get("x-push-secret");
}

function toPushPayload(document: Record<string, unknown>): PushPayload | null {
  const type = document._type;
  const sendPushAlert = document.sendPushAlert === true;

  if (type === "siteStatus" && (sendPushAlert || urgentStatusTypes.has(String(document.statusType)))) {
    return {
      title: String(document.title || "Academy Status Update"),
      body: String(document.message || "Check the latest academy status before heading to class."),
      url: "/",
      tag: "site-status"
    };
  }

  if (type === "event" && (sendPushAlert || urgentEventTypes.has(String(document.eventType)))) {
    return {
      title: String(document.title || "Important Date"),
      body: String(document.description || "Check the latest event or closure details."),
      url: "/events",
      tag: `event-${String(document.eventType).toLowerCase().replace(/\s+/g, "-")}`
    };
  }

  if (type === "announcement" && (sendPushAlert || document.isPinned || document.category === "Closure")) {
    return {
      title: String(document.title || "Academy Update"),
      body: String(document.body || "There is a new important academy update."),
      url: "/updates",
      tag: `announcement-${String(document.category || "general").toLowerCase().replace(/\s+/g, "-")}`
    };
  }

  return null;
}

export async function POST(request: Request) {
  const secret = process.env.PUSH_WEBHOOK_SECRET;
  if (!secret || getAuthSecret(request) !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const document = await request.json().catch(() => null);

  if (!document || typeof document !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid Sanity webhook payload." }, { status: 400 });
  }

  const payload = toPushPayload(document as Record<string, unknown>);

  if (!payload) {
    return NextResponse.json({ ok: true, skipped: true, reason: "Document is not urgent." });
  }

  const result = await sendPushToAll(payload);
  return NextResponse.json({ ok: true, ...result });
}
