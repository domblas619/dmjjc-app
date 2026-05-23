import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { sanityCacheTags } from "@/lib/sanity/queries";

export const runtime = "nodejs";

const documentPaths = {
  announcement: ["/", "/updates"],
  event: ["/", "/events"],
  video: ["/videos"],
  siteStatus: ["/"]
} as const;

const documentTags = {
  announcement: [sanityCacheTags.announcements],
  event: [sanityCacheTags.events],
  video: [sanityCacheTags.videos],
  siteStatus: []
} as const;

type RevalidateDocumentType = keyof typeof documentPaths;

function getAuthSecret(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) return authorization.slice("Bearer ".length);
  return request.headers.get("x-revalidate-secret");
}

function getDocumentType(value: unknown): RevalidateDocumentType | "all" {
  if (value === "announcement" || value === "event" || value === "video" || value === "siteStatus") return value;
  return "all";
}

function uniqueValues<T>(values: T[]) {
  return Array.from(new Set(values));
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || getAuthSecret(request) !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const documentType = getDocumentType(body?._type || body?.type);

  const paths =
    documentType === "all"
      ? uniqueValues(Object.values(documentPaths).flat())
      : [...documentPaths[documentType]];

  const tags =
    documentType === "all"
      ? uniqueValues(Object.values(documentTags).flat())
      : [...documentTags[documentType]];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    documentType,
    revalidated: {
      paths,
      tags
    }
  });
}
