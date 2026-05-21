import { NextResponse } from "next/server";
import { sendPushToAll } from "@/lib/push/send";
import type { PushPayload } from "@/lib/push/types";

export const runtime = "nodejs";

function getAuthSecret(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) return authorization.slice("Bearer ".length);
  return request.headers.get("x-push-secret");
}

function isValidPayload(value: unknown): value is PushPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as PushPayload;
  return Boolean(payload.title && payload.body);
}

export async function POST(request: Request) {
  const secret = process.env.PUSH_WEBHOOK_SECRET;
  if (!secret || getAuthSecret(request) !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);

  if (!isValidPayload(payload)) {
    return NextResponse.json({ ok: false, message: "Missing title or body." }, { status: 400 });
  }

  const result = await sendPushToAll({
    title: payload.title,
    body: payload.body,
    url: payload.url || "/",
    tag: payload.tag
  });

  return NextResponse.json({ ok: true, ...result });
}
