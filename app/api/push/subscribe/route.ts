import { NextResponse } from "next/server";
import { getPushSubscriptionCount, hasPushStorage, removePushSubscription, savePushSubscription } from "@/lib/push/store";
import type { StoredPushSubscription } from "@/lib/push/types";

export const runtime = "nodejs";

function isValidSubscription(value: unknown): value is StoredPushSubscription {
  if (!value || typeof value !== "object") return false;
  const subscription = value as StoredPushSubscription;
  return Boolean(
    subscription.endpoint &&
      subscription.keys?.p256dh &&
      subscription.keys?.auth
  );
}

export async function POST(request: Request) {
  if (!hasPushStorage) {
    return NextResponse.json(
      { ok: false, message: "Push storage is not configured. Add Upstash Redis environment variables." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const subscription = body?.subscription;

  if (!isValidSubscription(subscription)) {
    return NextResponse.json({ ok: false, message: "Invalid push subscription." }, { status: 400 });
  }

  await savePushSubscription(subscription);
  const count = await getPushSubscriptionCount();

  return NextResponse.json({ ok: true, count });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const endpoint = body?.endpoint;

  if (typeof endpoint !== "string" || !endpoint) {
    return NextResponse.json({ ok: false, message: "Missing subscription endpoint." }, { status: 400 });
  }

  await removePushSubscription(endpoint);
  return NextResponse.json({ ok: true });
}
