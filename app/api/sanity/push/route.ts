import { NextResponse } from "next/server";
import { sendPushToAll } from "@/lib/push/send";
import { claimReminderSend } from "@/lib/push/store";
import { announcementReminderId } from "@/lib/reminders/announcement-publishing";
import { client, hasSanityConfig } from "@/lib/sanity/client";
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

async function getPublishedAnnouncement(document: Record<string, unknown>) {
  if (!hasSanityConfig || typeof document._id !== "string") return document;

  const announcement = await client.fetch<Record<string, unknown> | null>(
    `*[_type == "announcement" && _id == $id][0]{
      _type,
      _id,
      title,
      body,
      category,
      isPinned,
      sendPushAlert,
      publishedAt,
      scheduleForLater,
      scheduleDate,
      scheduleTime,
      scheduleTimeZone
    }`,
    { id: document._id },
    { cache: "no-store" }
  );

  return announcement ? { ...document, ...announcement } : document;
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

  const sanityDocument = document as Record<string, unknown>;

  if (sanityDocument._type === "announcement") {
    const announcementDocument = await getPublishedAnnouncement(sanityDocument);

    if (announcementDocument.scheduleForLater === true) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "Scheduled announcement alert deferred to the publishing scheduler."
      });
    }

    const payload = toPushPayload(announcementDocument);

    if (!payload) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Document is not urgent." });
    }

    const result = await sendPushToAll(payload);

    if (
      result.sent > 0 &&
      typeof announcementDocument._id === "string" &&
      typeof announcementDocument.publishedAt === "string"
    ) {
      await claimReminderSend(announcementReminderId(announcementDocument._id, new Date(announcementDocument.publishedAt)));
    }

    return NextResponse.json({ ok: true, ...result });
  }

  const payload = toPushPayload(sanityDocument);

  if (!payload) {
    return NextResponse.json({ ok: true, skipped: true, reason: "Document is not urgent." });
  }

  const result = await sendPushToAll(payload);
  return NextResponse.json({ ok: true, ...result });
}
